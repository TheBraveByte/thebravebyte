import jwt from 'jsonwebtoken';
import { User } from '../../models/User';

export default defineEventHandler(async (event) => {
  const { email, password } = await readBody(event);

  if (!email || !password) {
    throw createError({
      statusCode: 400,
      message: 'Email and password are required'
    });
  }

  const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

  try {
    // Find admin user in database
    const user = await User.findOne({ email: email.toLowerCase(), role: 'admin' });
    
    if (!user) {
      throw createError({
        statusCode: 401,
        message: 'Invalid credentials'
      });
    }

    // Compare password with hashed password in database
    const isValidPassword = await user.comparePassword(password);
    
    if (!isValidPassword) {
      throw createError({
        statusCode: 401,
        message: 'Invalid credentials'
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { email: user.email, role: user.role, userId: user._id },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

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
      token,
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
