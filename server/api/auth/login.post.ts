export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const config = useRuntimeConfig();

    // Simple admin check for now - can be expanded to DB users later
    if (body.password === config.authSecret) {
        // Set a cookie for the session
        setCookie(event, 'auth_token', 'admin-session-token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24 * 7, // 1 week
            path: '/'
        });
        return { success: true };
    }

    throw createError({
        statusCode: 401,
        statusMessage: 'Unauthorized'
    });
});
