import { useD1 } from '~/server/utils/d1';

interface ArticleRow {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image: string;
  published: number;
  published_at: string | null;
  author: string;
  views: number;
  created_at: string;
  updated_at: string;
}

export default defineEventHandler(async (event) => {
  // Prevent caching of this endpoint to ensure drafts don't leak to public
  setResponseHeader(event, 'Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  setResponseHeader(event, 'Pragma', 'no-cache');
  setResponseHeader(event, 'Expires', '0');

  const db = useD1(event);
  const query = getQuery(event);
  const token = getCookie(event, 'auth_token');
  const isAdmin = !!token;

  // Pagination
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;
  const offset = (page - 1) * limit;

  try {
    // Build query based on admin status
    const whereClause = isAdmin ? '' : 'WHERE published = 1';

    // Get articles
    const articlesResult = await db
      .prepare(`SELECT id, title, slug, excerpt, cover_image, published, published_at, author, views, created_at, updated_at FROM articles ${whereClause} ORDER BY created_at DESC LIMIT ? OFFSET ?`)
      .bind(limit, offset)
      .all<ArticleRow>();

    // Get total count
    const countResult = await db
      .prepare(`SELECT COUNT(*) as count FROM articles ${whereClause}`)
      .first<{ count: number }>();

    const total = countResult?.count || 0;

    // Transform to match expected format
    const articles = (articlesResult.results || []).map(row => ({
      id: row.id,
      _id: row.id.toString(),
      title: row.title,
      slug: row.slug,
      excerpt: row.excerpt,
      coverImage: row.cover_image,
      published: row.published === 1,
      publishedAt: row.published_at,
      author: row.author,
      views: row.views,
      createdAt: row.created_at,
      updatedAt: row.updated_at
    }));

    return {
      articles,
      total,
      page,
      totalPages: Math.ceil(total / limit)
    };
  } catch (error: any) {
    console.error('Error fetching articles:', error);
    return {
      articles: [],
      total: 0,
      page: 1,
      totalPages: 0
    };
  }
});
