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

    await connectToDatabase();
    const body = await readBody(event);

    try {
        const article = await Article.create(body);
        return article;
    } catch (error: any) {
        throw createError({
            statusCode: 400,
            statusMessage: error.message || 'Failed to create article',
        });
    }
});
