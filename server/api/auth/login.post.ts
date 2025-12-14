import jwt from 'jsonwebtoken';
import { User } from '~~/server/models/User';

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const { email, password } = body;

    if (!email || !password) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Email and password are required',
        });
    }

    await connectToDatabase();

    const user = await User.findOne({ email });
    if (!user) {
        throw createError({
            statusCode: 401,
            statusMessage: 'Invalid credentials',
        });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        throw createError({
            statusCode: 401,
            statusMessage: 'Invalid credentials',
        });
    }

    const config = useRuntimeConfig();
    const token = jwt.sign({ userId: user._id, role: user.role }, config.authSecret, {
        expiresIn: '7d',
    });

    setCookie(event, 'auth_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/',
    });

    return {
        user: {
            email: user.email,
            role: user.role,
        },
    };
});
