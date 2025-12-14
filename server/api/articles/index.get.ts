import { Article } from '~/server/models/Article';
import mongoose from 'mongoose';

export default defineEventHandler(async (event) => {
    // If DB is not connected, return empty list to prevent crash/timeout
    if (mongoose.connection.readyState !== 1) {
        return {
            articles: [],
            total: 0,
            page: 1,
            totalPages: 0
        };
    }

    const query = getQuery(event);
    const isAdmin = getCookie(event, 'auth_token') === 'admin-session-token';

    const filter = isAdmin ? {} : { published: true };

    // Pagination
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    const skip = (page - 1) * limit;

    const articles = await Article.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .select('-content'); // Exclude heavy content for list view

    const total = await Article.countDocuments(filter);

    return {
        articles,
        total,
        page,
        totalPages: Math.ceil(total / limit)
    };
});
