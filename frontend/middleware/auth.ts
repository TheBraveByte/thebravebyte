export default defineNuxtRouteMiddleware(async (to, from) => {
  const token = useCookie("auth_token");
  if (!token.value) {
    return navigateTo("/admin/login");
  }

  try {
    await apiFetch("/auth/me", {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    });

    return;
  } catch (error) {
    token.value = null;
    return navigateTo("/admin/login");
  }
});
