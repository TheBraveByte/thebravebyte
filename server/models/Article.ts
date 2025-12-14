import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    content: {
        type: String,
        required: true,
    },
    excerpt: {
        type: String,
        trim: true,
    },
    image: {
        type: String,
        trim: true,
    },
    status: {
        type: String,
        enum: ['draft', 'published'],
        default: 'draft',
    },
    tags: [{
        type: String,
        trim: true,
    }],
    views: {
        type: Number,
        default: 0,
    },
}, {
    timestamps: true,
});

export const Article = mongoose.models.Article || mongoose.model('Article', articleSchema);
