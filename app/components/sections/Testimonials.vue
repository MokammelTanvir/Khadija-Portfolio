<script setup lang="ts">
// Dependency-free slider: native CSS scroll-snap (swipe on mobile) + arrows, dots and optional autoplay.
const { testimonials } = useSite()
const items = testimonials.items
const autoplayMs = (testimonials as { autoplayMs?: number }).autoplayMs ?? 6000

const track = ref<HTMLElement | null>(null)
const index = ref(0)
const perView = ref(1)
const ready = ref(false)
let step = 0
let paused = false
let timer: ReturnType<typeof setInterval> | null = null

const pages = computed(() => Math.max(1, items.length - perView.value + 1))
const initials = (s: string) => s.split(/\s+/).map((w) => w[0]).slice(0, 2).join('').toUpperCase()

function measure() {
  const el = track.value
  if (!el || el.children.length < 2) return
  const a = el.children[0] as HTMLElement
  const b = el.children[1] as HTMLElement
  step = b.offsetLeft - a.offsetLeft
  perView.value = Math.max(1, Math.round((el.clientWidth + (step - a.offsetWidth)) / step))
  index.value = Math.min(index.value, pages.value - 1)
}

function goTo(i: number) {
  const el = track.value
  if (!el) return
  const n = (i + pages.value) % pages.value // wraps around at both ends
  el.scrollTo({ left: n * step, behavior: 'smooth' })
  index.value = n
}
const next = () => goTo(index.value + 1)
// manual navigation also restarts the autoplay countdown so it never fights the user
const userGo = (i: number) => { goTo(i); restartAutoplay() }
const userNext = () => userGo(index.value + 1)
const userPrev = () => userGo(index.value - 1)

let raf = 0
function onScroll() {
  cancelAnimationFrame(raf)
  raf = requestAnimationFrame(() => {
    const el = track.value
    if (!el || !step) return
    index.value = Math.min(pages.value - 1, Math.round(el.scrollLeft / step))
  })
}

function restartAutoplay() {
  if (timer) clearInterval(timer)
  startAutoplay()
}

function startAutoplay() {
  if (!autoplayMs || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  timer = setInterval(() => { if (!paused && !document.hidden) next() }, autoplayMs)
}

onMounted(() => {
  measure()
  ready.value = true
  window.addEventListener('resize', measure, { passive: true })
  startAutoplay()
})
onBeforeUnmount(() => {
  window.removeEventListener('resize', measure)
  if (timer) clearInterval(timer)
})
</script>

<template>
  <section id="testimonials" class="section bg-surface-2/50">
    <div class="container-x">
      <SectionHeading :eyebrow="testimonials.eyebrow" :title="testimonials.title" />

      <div
        v-reveal
        role="region"
        aria-roledescription="carousel"
        aria-label="Client testimonials"
        @mouseenter="paused = true"
        @mouseleave="paused = false"
        @focusin="paused = true"
        @focusout="paused = false"
        @touchstart.passive="paused = true"
        @touchend.passive="paused = false"
      >
        <div
          ref="track"
          class="no-scrollbar -my-4 flex snap-x snap-mandatory gap-6 overflow-x-auto py-4"
          tabindex="0"
          @scroll.passive="onScroll"
          @keydown.left.prevent="userPrev"
          @keydown.right.prevent="userNext"
        >
          <figure
            v-for="(t, i) in items"
            :key="t.name"
            role="group"
            aria-roledescription="slide"
            :aria-label="`${i + 1} of ${items.length}`"
            class="card card-hover flex shrink-0 basis-full snap-start flex-col p-6 sm:p-7 md:basis-[calc((100%-1.5rem)/2)] lg:basis-[calc((100%-3rem)/3)]"
          >
            <AppIcon name="quote" :size="28" class="text-primary/40" />
            <div class="mt-3 flex gap-0.5 text-amber-400" :aria-label="`${t.rating} out of 5 stars`">
              <AppIcon v-for="n in t.rating" :key="n" name="star" :size="16" filled />
            </div>
            <blockquote class="mt-4 flex-1 text-[15px] leading-relaxed">“{{ t.quote }}”</blockquote>
            <figcaption class="mt-6 flex items-center gap-3 border-t border-line pt-5">
              <span class="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gradient-to-br from-primary to-accent text-sm font-bold text-white">{{ initials(t.name) }}</span>
              <span class="leading-tight">
                <span class="block text-sm font-bold">{{ t.name }}</span>
                <span class="block text-xs text-muted">{{ t.role }}</span>
              </span>
            </figcaption>
          </figure>
        </div>

        <!-- controls (only when there is more than one page) -->
        <div v-if="!ready || pages > 1" class="mt-8 flex items-center justify-center gap-4">
          <button type="button" class="grid h-11 w-11 place-items-center rounded-full border border-line bg-surface transition hover:border-primary/50 hover:bg-surface-2 active:scale-95" aria-label="Previous testimonial" @click="userPrev">
            <AppIcon name="arrow-right" :size="18" class="rotate-180" />
          </button>

          <div class="flex items-center gap-2" role="tablist" aria-label="Choose testimonial">
            <button
              v-for="n in (ready ? pages : 0)"
              :key="n"
              type="button"
              role="tab"
              :aria-selected="index === n - 1"
              :aria-label="`Go to testimonial ${n}`"
              class="h-2.5 rounded-full transition-all duration-300"
              :class="index === n - 1 ? 'w-7 bg-primary' : 'w-2.5 bg-line hover:bg-muted'"
              @click="userGo(n - 1)"
            />
          </div>

          <button type="button" class="grid h-11 w-11 place-items-center rounded-full border border-line bg-surface transition hover:border-primary/50 hover:bg-surface-2 active:scale-95" aria-label="Next testimonial" @click="userNext">
            <AppIcon name="arrow-right" :size="18" />
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
