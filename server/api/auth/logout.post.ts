export default defineEventHandler(async (event) => {
  // Clear the auth cookie
  setCookie(event, 'auth_token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 0,
    path: '/'
  });

  return { success: true };
});
