import { Article } from '~/server/models/Article';

export default defineEventHandler(async (event) => {
    const slug = getRouterParam(event, 'slug');
    const isAdmin = getCookie(event, 'auth_token') === 'admin-session-token';

    const article = await Article.findOne({ slug });

    if (!article) {
        throw createError({ statusCode: 404, statusMessage: 'Article not found' });
    }

    if (!article.published && !isAdmin) {
        throw createError({ statusCode: 404, statusMessage: 'Article not found' });
    }

    return article;
});
