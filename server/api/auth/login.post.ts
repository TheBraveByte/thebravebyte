import jwt from 'jsonwebtoken';

export default defineEventHandler(async (event) => {
  const { email, password } = await readBody(event);

  // Get credentials from environment
  const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@thebravebyte.com';
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';
  const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

  // Validate credentials
  // Allow password-only login for admin convenience
  if (password !== ADMIN_PASSWORD) {
    throw createError({
      statusCode: 401,
      message: 'Invalid credentials'
    });
  }

  // Use the admin email for the session
  const userEmail = email || ADMIN_EMAIL;

  // Generate JWT token
  const token = jwt.sign(
    { email: userEmail, role: 'admin' },
    JWT_SECRET,
    { expiresIn: '7d' }
  );

  // Set cookie
  setCookie(event, 'auth_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/'
  });

  return {
    success: true,
    token,
    user: { email, role: 'admin' }
  };
});
