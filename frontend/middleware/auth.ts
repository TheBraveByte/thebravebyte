export default defineNuxtRouteMiddleware(async (to, from) => {
  // Verify token with server
  try {
    const token = useCookie('auth_token');
    if (!token.value) {
      return navigateTo('/admin/login');
    }

    const { data, error } = await useFetch('/api/auth/me', {
      headers: {
        Authorization: `Bearer ${token.value}`
      }
    });
    
    if (error.value || !data.value) {
      return navigateTo('/admin/login');
    }
  } catch (err) {
    return navigateTo('/admin/login');
  }
});
