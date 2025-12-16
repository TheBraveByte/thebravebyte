export default defineEventHandler(async (event) => {
  const token = getCookie(event, 'auth_token');

  if (!token) {
    throw createError({
      statusCode: 401,
      message: 'Not authenticated'
    });
  }

  try {
    // Decode the base64 token
    const decoded = JSON.parse(atob(token));

    // Check if token is expired
    if (decoded.exp && decoded.exp < Date.now()) {
      throw createError({
        statusCode: 401,
        message: 'Token expired'
      });
    }

    return {
      email: decoded.email,
      role: decoded.role
    };
  } catch (error: any) {
    if (error.statusCode) throw error;
    
    throw createError({
      statusCode: 401,
      message: 'Invalid token'
    });
  }
});
