import jwt from 'jsonwebtoken';
import { User } from '~~/server/models/User';

export default defineEventHandler(async (event) => {
    const token = getCookie(event, 'auth_token');

    if (!token) {
        throw createError({
            statusCode: 401,
            statusMessage: 'Not authenticated',
        });
    }

    const config = useRuntimeConfig();

    try {
        const decoded = jwt.verify(token, config.authSecret) as { userId: string };
        await connectToDatabase();

        const user = await User.findById(decoded.userId).select('-password');
        if (!user) {
            throw createError({
                statusCode: 401,
                statusMessage: 'User not found',
            });
        }

        return {
            user: {
                email: user.email,
                role: user.role,
            },
        };
    } catch (error) {
        throw createError({
            statusCode: 401,
            statusMessage: 'Invalid token',
        });
    }
});
