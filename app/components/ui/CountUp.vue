<script setup lang="ts">
// Counts up once when scrolled into view. Final value is in the static HTML (SEO / no-JS friendly).
const props = withDefaults(defineProps<{ value: number; prefix?: string; suffix?: string; decimals?: number }>(), {
  prefix: '', suffix: '', decimals: 0
})

const el = ref<HTMLElement | null>(null)
const fmt = (n: number) => props.prefix + n.toFixed(props.decimals) + props.suffix
const text = ref(fmt(props.value))

onMounted(() => {
  if (!el.value || !('IntersectionObserver' in window)) return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  const r = el.value.getBoundingClientRect()
  const run = () => {
    const start = performance.now()
    const dur = 1400
    const tick = (now: number) => {
      const p = Math.min((now - start) / dur, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      text.value = fmt(props.value * eased)
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }
  if (r.top < window.innerHeight && r.bottom > 0) return run()
  text.value = fmt(0)
  const io = new IntersectionObserver((es) => {
    if (es[0]?.isIntersecting) { io.disconnect(); run() }
  }, { threshold: 0.4 })
  io.observe(el.value)
})
</script>

<template>
  <span ref="el" class="tabular-nums">{{ text }}</span>
</template>
