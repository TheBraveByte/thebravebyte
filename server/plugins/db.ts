import mongoose from 'mongoose';

export default defineNitroPlugin(async (_nitroApp) => {
    const config = useRuntimeConfig();

    if (!config.mongodbUri) {
        console.warn('MONGODB_URI is not set in runtime config!');
        return;
    }

    try {
        await mongoose.connect(config.mongodbUri);
        console.log('Connected to MongoDB');
    } catch (e) {
        console.error('Error connecting to MongoDB:', e);
    }
});
