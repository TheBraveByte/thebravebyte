// Scroll reveals. [data-reveal] elements start hidden (only when html.js-reveal is set by
// the inline head script) and get data-in when they scroll into view. data-in is an
// attribute Vue doesn't render, so hydration and re-renders leave it alone.
//
// The entrance plays on the first page of a visit only. After a client-side navigation,
// anything already on screen shows at once (data-instant skips the transition), so moving
// between pages, and back, is immediate; content further down still reveals on scroll.
export default defineNuxtPlugin((nuxtApp) => {
  const root = document.documentElement
  if (!root.classList.contains('js-reveal')) return
  ;(window as any).__reveal = true

  let navigated = false
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue
      ;(e.target as HTMLElement).dataset.in = ''
      io.unobserve(e.target)
    }
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 })

  const inView = (el: Element) => {
    const r = el.getBoundingClientRect()
    return r.top < innerHeight && r.bottom > 0
  }
  const track = (el: HTMLElement) => {
    if (el.hasAttribute('data-in')) return
    if (navigated && inView(el)) {
      el.dataset.instant = ''
      el.dataset.in = ''
      return
    }
    io.observe(el)
  }
  const scan = (node: ParentNode) => {
    if (node instanceof HTMLElement && node.hasAttribute('data-reveal')) track(node)
    node.querySelectorAll?.<HTMLElement>('[data-reveal]').forEach(track)
  }

  // Catch every [data-reveal] element as it is added, whatever rendered it.
  const mo = new MutationObserver((records) => {
    for (const r of records) r.addedNodes.forEach(n => n.nodeType === 1 && scan(n as Element))
  })

  onNuxtReady(() => {
    scan(document)
    mo.observe(document.body, { childList: true, subtree: true })
  })
  nuxtApp.hook('page:start', () => {
    if (!navigated) {
      navigated = true
      root.classList.add('is-nav')
    }
  })
  // Scroll restoration on back/forward can land after the new page renders.
  nuxtApp.hook('page:finish', () => requestAnimationFrame(() => scan(document)))
})
