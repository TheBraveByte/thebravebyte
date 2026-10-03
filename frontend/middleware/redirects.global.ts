// Old URLs from the previous site. The static export drops _redirects, so they are
// redirected here instead, in the app itself.
export default defineNuxtRouteMiddleware((to) => {
  if (to.path === '/blog') return navigateTo('/writing', { redirectCode: 301 })
  if (to.path.startsWith('/article/')) return navigateTo(`/writing/${to.path.slice('/article/'.length)}`, { redirectCode: 301 })
  if (to.path === '/cv') return navigateTo('/about', { redirectCode: 301 })
  if (to.path === '/process') return navigateTo('/work', { redirectCode: 301 })
})
