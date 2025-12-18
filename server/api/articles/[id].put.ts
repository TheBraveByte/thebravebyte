import { useD1, toSQLiteDate } from '~/server/utils/d1';

export default defineEventHandler(async (event) => {
  const token = getCookie(event, 'auth_token');
  if (!token) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' });
  }

  const id = getRouterParam(event, 'id');
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'ID is required' });
  }

  const db = useD1(event);
  const body = await readBody(event);
  const now = toSQLiteDate();

  // Build dynamic update query
  const updates: string[] = [];
  const values: any[] = [];

  if (body.title !== undefined) {
    updates.push('title = ?');
    values.push(body.title);
  }
  if (body.slug !== undefined) {
    if (!body.slug.trim()) {
      throw createError({ statusCode: 400, statusMessage: 'Slug cannot be empty' });
    }
    updates.push('slug = ?');
    values.push(body.slug);
  }
  if (body.excerpt !== undefined) {
    updates.push('excerpt = ?');
    values.push(body.excerpt);
  }
  if (body.content !== undefined) {
    updates.push('content = ?');
    const contentStr = typeof body.content === 'string' ? body.content : JSON.stringify(body.content);
    values.push(contentStr);
  }
  if (body.coverImage !== undefined) {
    updates.push('cover_image = ?');
    values.push(body.coverImage);
  }
  if (body.published !== undefined) {
    updates.push('published = ?');
    values.push(body.published ? 1 : 0);

    // Set published_at when publishing
    if (body.published) {
      updates.push('published_at = ?');
      values.push(now);
    }
  }
  if (body.author !== undefined) {
    updates.push('author = ?');
    values.push(body.author);
  }

  updates.push('updated_at = ?');
  values.push(now);

  // Add id for WHERE clause
  values.push(parseInt(id));

  try {
    await db
      .prepare(`UPDATE articles SET ${updates.join(', ')} WHERE id = ?`)
      .bind(...values)
      .run();

    // Fetch updated article
    const article = await db
      .prepare('SELECT * FROM articles WHERE id = ?')
      .bind(parseInt(id))
      .first();

    if (!article) {
      throw createError({ statusCode: 404, statusMessage: 'Article not found' });
    }

    // Parse content if it's JSON
    let content = (article as any).content;
    try {
      content = JSON.parse(content);
    } catch {
      // Keep as string if not valid JSON
    }

    return {
      id: (article as any).id,
      _id: (article as any).id.toString(),
      title: (article as any).title,
      slug: (article as any).slug,
      excerpt: (article as any).excerpt,
      content,
      coverImage: (article as any).cover_image,
      published: (article as any).published === 1,
      publishedAt: (article as any).published_at,
      author: (article as any).author,
      views: (article as any).views,
      createdAt: (article as any).created_at,
      updatedAt: (article as any).updated_at
    };
  } catch (e: any) {
    if (e.statusCode) throw e;
    console.error('Error updating article:', e);
    throw createError({
      statusCode: 400,
      statusMessage: e.message || 'Failed to update article'
    });
  }
});
