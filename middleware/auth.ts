export default defineNuxtRouteMiddleware(async (to, from) => {
    // Verify token with backend (works for httpOnly cookies on client too)
    if (to.path.startsWith('/admin/editor')) {
        try {
            await $fetch('/api/auth/me');
        } catch (e) {
            return navigateTo('/admin/login');
        }
    }
});
