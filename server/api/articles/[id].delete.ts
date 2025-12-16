import { useD1 } from '~/server/utils/d1';

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

  try {
    // Check if article exists
    const article = await db
      .prepare('SELECT id FROM articles WHERE id = ?')
      .bind(parseInt(id))
      .first();

    if (!article) {
      throw createError({ statusCode: 404, statusMessage: 'Article not found' });
    }

    // Delete article
    await db
      .prepare('DELETE FROM articles WHERE id = ?')
      .bind(parseInt(id))
      .run();

    return { success: true };
  } catch (e: any) {
    if (e.statusCode) throw e;
    console.error('Error deleting article:', e);
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to delete article'
    });
  }
});
