import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    excerpt: {
        type: String,
        required: true
    },
    content: {
        type: Object, // Tiptap JSON content
        required: true
    },
    coverImage: {
        type: String,
        default: ''
    },
    published: {
        type: Boolean,
        default: false
    },
    publishedAt: {
        type: Date
    },
    author: {
        type: String,
        default: 'Yusuf Akinleye'
    }
}, {
    timestamps: true
});

export const Article = mongoose.models.Article || mongoose.model('Article', articleSchema);
