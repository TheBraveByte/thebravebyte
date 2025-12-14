import { Article } from '~/server/models/Article';

export default defineEventHandler(async (event) => {
    const token = getCookie(event, 'auth_token');
    if (token !== 'admin-session-token') {
        throw createError({ statusCode: 401, statusMessage: 'Unauthorized' });
    }

    const id = getRouterParam(event, 'id');
    const body = await readBody(event);

    try {
        const article = await Article.findByIdAndUpdate(id, body, { new: true });
        return article;
    } catch (e: any) {
        throw createError({
            statusCode: 400,
            statusMessage: e.message
        });
    }
});
