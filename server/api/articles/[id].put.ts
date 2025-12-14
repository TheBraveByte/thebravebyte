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
    const body = await readBody(event);

    await connectToDatabase();

    const article = await Article.findByIdAndUpdate(id, body, { new: true, runValidators: true });

    if (!article) {
        throw createError({
            statusCode: 404,
            statusMessage: 'Article not found',
        });
    }

    return article;
});
