export default defineNuxtRouteMiddleware(async (to, from) => {
  // Verify token with server
  try {
    // We don't manually set the Cookie header here because:
    // 1. On client: Browser automatically sends cookies (including httpOnly ones)
    // 2. On server: useFetch should forward cookies if configured, or we might need to handle it.
    // But for now, let's rely on the browser's behavior for the client-side navigation which is where the user is stuck.
    
    const { data, error } = await useFetch('/api/auth/me');
    
    if (error.value || !data.value) {
      return navigateTo('/admin/login');
    }
  } catch (err) {
    return navigateTo('/admin/login');
  }
});
