import jwt from 'jsonwebtoken';

export default defineEventHandler(async (event) => {
  const token = getCookie(event, 'auth_token');

  if (!token) {
    throw createError({
      statusCode: 401,
      message: 'Not authenticated'
    });
  }

  try {
    const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
    const decoded = jwt.verify(token, JWT_SECRET) as any;

    return {
      email: decoded.email,
      role: decoded.role
    };
  } catch (error) {
    throw createError({
      statusCode: 401,
      message: 'Invalid token'
    });
  }
});
