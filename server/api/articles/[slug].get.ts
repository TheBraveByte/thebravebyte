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
  const slug = getRouterParam(event, 'slug');
  const token = getCookie(event, 'auth_token');
  const isAdmin = !!token;

  if (!slug) {
    throw createError({ statusCode: 400, statusMessage: 'Slug is required' });
  }

  const db = useD1(event);

  try {
    const article = await db
      .prepare('SELECT * FROM articles WHERE slug = ?')
      .bind(slug)
      .first<ArticleRow>();

    if (!article) {
      throw createError({ statusCode: 404, statusMessage: 'Article not found' });
    }

    // Hide unpublished articles from non-admins
    if (article.published !== 1 && !isAdmin) {
      throw createError({ statusCode: 404, statusMessage: 'Article not found' });
    }

    // Increment views for public views
    if (!isAdmin) {
      await db
        .prepare('UPDATE articles SET views = views + 1 WHERE id = ?')
        .bind(article.id)
        .run();
    }

    // Parse content if it's JSON
    let content = article.content;
    try {
      content = JSON.parse(article.content);
    } catch {
      // Keep as string if not valid JSON
    }

    return {
      id: article.id,
      _id: article.id.toString(),
      title: article.title,
      slug: article.slug,
      excerpt: article.excerpt,
      content,
      coverImage: article.cover_image,
      published: article.published === 1,
      publishedAt: article.published_at,
      author: article.author,
      views: article.views + (isAdmin ? 0 : 1),
      createdAt: article.created_at,
      updatedAt: article.updated_at
    };
  } catch (error: any) {
    if (error.statusCode) throw error;
    console.error('Error fetching article:', error);
    throw createError({ statusCode: 500, statusMessage: 'Failed to fetch article' });
  }
});
