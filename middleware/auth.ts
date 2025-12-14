export default defineNuxtRouteMiddleware(async (to, from) => {
    // Simple check - in real app verify token with backend
    const token = useCookie('auth_token');

    if (!token.value && to.path.startsWith('/admin/editor')) {
        return navigateTo('/admin/login');
    }
});
