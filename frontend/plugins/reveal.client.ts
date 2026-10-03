// Reveals [data-reveal] elements as they scroll into view by setting data-in (an
// attribute Vue doesn't render, so hydration and re-renders leave it alone). Hiding them
// is opt-in through html.js-reveal (set by an inline script in nuxt.config head), so the
// content never depends on this file running.
export default defineNuxtPlugin((nuxtApp) => {
  const root = document.documentElement
  if (!root.classList.contains('js-reveal')) return
  ;(window as any).__reveal = true

  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue
      (e.target as HTMLElement).dataset.in = ''
      io.unobserve(e.target)
    }
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 })

  const scan = () => document.querySelectorAll('[data-reveal]:not([data-in])').forEach(el => io.observe(el))
  onNuxtReady(scan)
  nuxtApp.hook('page:finish', () => requestAnimationFrame(scan))
})
