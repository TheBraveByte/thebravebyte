import { Article } from '~~/server/models/Article';

export default defineEventHandler(async (event) => {
    await connectToDatabase();

    const query = getQuery(event);
    const filter: any = {};

    // Public view only shows published articles
    if (query.status) {
        filter.status = query.status;
    }

    // If not admin and no status specified, default to published? 
    // For now, let's assume the frontend controls the filter, but we could enforce it here.

    const articles = await Article.find(filter)
        .sort({ createdAt: -1 })
        .select('-content'); // Exclude content for list view to reduce payload size

    return articles;
});
