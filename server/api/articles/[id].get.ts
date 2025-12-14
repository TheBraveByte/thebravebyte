import { Article } from '~~/server/models/Article';

export default defineEventHandler(async (event) => {
    const id = event.context.params?.id;
    await connectToDatabase();

    let article;

    // Check if id is a valid ObjectId, otherwise treat as slug
    if (id && id.match(/^[0-9a-fA-F]{24}$/)) {
        article = await Article.findById(id);
    } else {
        article = await Article.findOne({ slug: id });

        // Increment views if found by slug (public view)
        if (article) {
            article.views += 1;
            await article.save();
        }
    }

    if (!article) {
        throw createError({
            statusCode: 404,
            statusMessage: 'Article not found',
        });
    }

    return article;
});
