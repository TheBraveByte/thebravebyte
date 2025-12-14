import { Article } from '~~/server/models/Article';
import jwt from 'jsonwebtoken';

export default defineEventHandler(async (event) => {
    // Auth Check
    const token = getCookie(event, 'auth_token');
    if (!token) {
        throw createError({ statusCode: 401, statusMessage: 'Unauthorized' });
    }

    const config = useRuntimeConfig();
    try {
        jwt.verify(token, config.authSecret);
    } catch (e) {
        throw createError({ statusCode: 401, statusMessage: 'Invalid token' });
    }

    const id = event.context.params?.id;

    await connectToDatabase();

    const article = await Article.findByIdAndDelete(id);

    if (!article) {
        throw createError({
            statusCode: 404,
            statusMessage: 'Article not found',
        });
    }

    return { success: true };
});
