import { useD1, toSQLiteDate } from '~/server/utils/d1';

export default defineEventHandler(async (event) => {
  const token = getCookie(event, 'auth_token');
  if (!token) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' });
  }

  const db = useD1(event);
  const body = await readBody(event);

  // Generate slug from title if not provided
  if (!body.slug && body.title) {
    body.slug = body.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  }

  // Validate required fields
  if (!body.title || !body.slug || !body.excerpt || !body.content) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Title, slug, excerpt, and content are required'
    });
  }

  const now = toSQLiteDate();
  const contentStr = typeof body.content === 'string' ? body.content : JSON.stringify(body.content);

  try {
    const result = await db
      .prepare(`
        INSERT INTO articles (title, slug, excerpt, content, cover_image, published, published_at, author, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `)
      .bind(
        body.title,
        body.slug,
        body.excerpt,
        contentStr,
        body.coverImage || '',
        body.published ? 1 : 0,
        body.published ? now : null,
        body.author || 'Yusuf Akinleye',
        now,
        now
      )
      .run();

    const articleId = result.meta?.last_row_id;

    return {
      id: articleId,
      _id: articleId?.toString(),
      title: body.title,
      slug: body.slug,
      excerpt: body.excerpt,
      content: body.content,
      coverImage: body.coverImage || '',
      published: body.published || false,
      publishedAt: body.published ? now : null,
      author: body.author || 'Yusuf Akinleye',
      createdAt: now,
      updatedAt: now
    };
  } catch (e: any) {
    console.error('Error creating article:', e);
    throw createError({
      statusCode: 400,
      statusMessage: e.message || 'Failed to create article'
    });
  }
});
