// Tiny scroll-reveal directive:  <div v-reveal> or <div v-reveal="120">  (value = delay in ms)
// Content is visible in the static HTML; only elements that start below the fold get hidden, then revealed.
export default defineNuxtPlugin((nuxtApp) => {
  let io: IntersectionObserver | null = null

  nuxtApp.vueApp.directive('reveal', {
    mounted(el: HTMLElement, binding) {
      if (!('IntersectionObserver' in window)) return
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

      const rect = el.getBoundingClientRect()
      if (rect.top < window.innerHeight * 0.92) return // already in view → leave as is

      if (!io) {
        io = new IntersectionObserver(
          (entries) => {
            for (const e of entries) {
              if (!e.isIntersecting) continue
              const t = e.target as HTMLElement
              t.classList.remove('reveal-hidden')
              t.classList.add('reveal-in')
              io!.unobserve(t)
            }
          },
          { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
        )
      }
      if (binding.value) el.style.transitionDelay = `${binding.value}ms`
      el.classList.add('reveal-hidden')
      io.observe(el)
    },
    getSSRProps: () => ({})
  })
})
