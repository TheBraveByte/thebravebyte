import { useD1 } from '~/server/utils/d1';
import bcrypt from 'bcryptjs';

interface UserRow {
  id: number;
  email: string;
  password: string;
  role: string;
  created_at: string;
  updated_at: string;
}

export default defineEventHandler(async (event) => {
  const { email, password } = await readBody(event);

  if (!email || !password) {
    throw createError({
      statusCode: 400,
      message: 'Email and password are required'
    });
  }

  const db = useD1(event);
  const config = useRuntimeConfig();
  const JWT_SECRET = config.jwtSecret || 'your-secret-key-change-in-production';

  try {
    // Find admin user in database
    const user = await db
      .prepare('SELECT * FROM users WHERE email = ? AND role = ?')
      .bind(email.toLowerCase(), 'admin')
      .first<UserRow>();
    
    if (!user) {
      throw createError({
        statusCode: 401,
        message: 'Invalid credentials'
      });
    }

    // Compare password with hashed password in database
    const isValidPassword = await bcrypt.compare(password, user.password);
    
    if (!isValidPassword) {
      throw createError({
        statusCode: 401,
        message: 'Invalid credentials'
      });
    }

    // Generate simple token (JWT requires crypto which may not be fully available in Workers)
    // Using a simple base64 encoded token with expiry
    const tokenPayload = {
      userId: user.id,
      email: user.email,
      role: user.role,
      exp: Date.now() + (7 * 24 * 60 * 60 * 1000) // 7 days
    };
    const token = btoa(JSON.stringify(tokenPayload));

    // Set cookie
    setCookie(event, 'auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/'
    });

    return {
      success: true,
      user: { email: user.email, role: user.role }
    };
  } catch (error: any) {
    // Re-throw if it's already a handled error
    if (error.statusCode) {
      throw error;
    }
    
    console.error('Login error:', error);
    throw createError({
      statusCode: 500,
      message: 'Authentication failed'
    });
  }
});
