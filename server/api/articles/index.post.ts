import { Article } from '~/server/models/Article';

export default defineEventHandler(async (event) => {
    const token = getCookie(event, 'auth_token');
    if (token !== 'admin-session-token') {
        throw createError({ statusCode: 401, statusMessage: 'Unauthorized' });
    }

    const body = await readBody(event);

    // Generate slug from title if not provided
    if (!body.slug && body.title) {
        body.slug = body.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)+/g, '');
    }

    try {
        const article = await Article.create(body);
        return article;
    } catch (e: any) {
        throw createError({
            statusCode: 400,
            statusMessage: e.message
        });
    }
});
