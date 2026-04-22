export default defineNuxtPlugin((nuxtApp) => {
  if (typeof IntersectionObserver === 'undefined') return

  const reveal = (el: Element) => ((el as HTMLElement).dataset.revealed = 'true')

  const setup = () => {
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    const targets = document.querySelectorAll('[data-reveal]:not([data-revealed])')
    if (reduce) {
      targets.forEach(reveal)
      return
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          reveal(e.target)
          io.unobserve(e.target)
        }
      })
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 })
    targets.forEach((el) => io.observe(el))
  }

  nuxtApp.hook('page:finish', () => requestAnimationFrame(setup))
  nuxtApp.hook('app:mounted', () => requestAnimationFrame(setup))
})
