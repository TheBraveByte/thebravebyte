import mongoose from 'mongoose';

export const connectToDatabase = async () => {
    if (mongoose.connection.readyState >= 1) {
        return;
    }

    const config = useRuntimeConfig();

    if (!config.mongodbUri) {
        throw new Error('MONGODB_URI is not defined in runtime config');
    }

    try {
        await mongoose.connect(config.mongodbUri);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        throw error;
    }
};
