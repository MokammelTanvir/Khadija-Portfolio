<script setup lang="ts">
const { site } = useSite()

const open = ref(false)
const scrolled = ref(false)
const active = ref('')

const navItems = computed(() =>
  site.nav.filter((n) => {
    const key = n.href.replace('#', '') as keyof typeof site.sections
    return site.sections[key] !== false
  })
)

function close() { open.value = false }

watch(open, (v) => {
  if (import.meta.client) document.documentElement.style.overflow = v ? 'hidden' : ''
})

onMounted(() => {
  const onScroll = () => { scrolled.value = window.scrollY > 12 }
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })

  // highlight the nav link of the section currently in view
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) active.value = '#' + e.target.id }),
      { rootMargin: '-45% 0px -50% 0px' }
    )
    navItems.value.forEach((n) => { const s = document.querySelector(n.href); if (s) io.observe(s) })
  }
  window.addEventListener('keydown', (e) => { if (e.key === 'Escape') close() })
})
</script>

<template>
  <header
    class="fixed inset-x-0 top-0 z-50 transition-all duration-300"
    :class="scrolled ? 'glass border-b border-line shadow-soft' : 'border-b border-transparent'"
  >
    <div class="container-x flex h-16 items-center justify-between sm:h-[72px]">
      <a href="#home" class="font-display text-xl font-extrabold tracking-tight" @click="close">
        <span class="text-gradient">{{ site.brand }}</span>
      </a>

      <nav class="hidden items-center gap-1 lg:flex" aria-label="Primary">
        <a
          v-for="n in navItems"
          :key="n.href"
          :href="n.href"
          class="rounded-lg px-3.5 py-2 text-sm font-medium transition hover:bg-surface-2 hover:text-fg"
          :class="active === n.href ? 'text-fg' : 'text-muted'"
        >{{ n.label }}</a>
      </nav>

      <div class="flex items-center gap-2.5">
        <ThemeToggle />
        <a :href="site.cta.primary.href" class="btn btn-primary hidden sm:inline-flex">{{ site.cta.headerLabel }}</a>
        <button
          type="button"
          class="grid h-11 w-11 place-items-center rounded-xl border border-line bg-surface lg:hidden"
          :aria-expanded="open"
          aria-controls="mobile-menu"
          aria-label="Open menu"
          @click="open = !open"
        >
          <AppIcon :name="open ? 'x' : 'menu'" :size="20" />
        </button>
      </div>
    </div>

    <!-- Mobile drawer -->
    <Transition
      enter-active-class="transition duration-200"
      enter-from-class="opacity-0 -translate-y-2"
      leave-active-class="transition duration-150"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div v-if="open" id="mobile-menu" class="lg:hidden">
        <div class="fixed inset-x-0 top-16 bottom-0 bg-bg/95 backdrop-blur-xl sm:top-[72px]">
          <nav class="container-x flex flex-col gap-1 pt-6" aria-label="Mobile">
            <a
              v-for="n in navItems"
              :key="n.href"
              :href="n.href"
              class="rounded-xl px-4 py-4 font-display text-2xl font-bold transition hover:bg-surface-2"
              :class="active === n.href ? 'text-brand' : 'text-fg'"
              @click="close"
            >{{ n.label }}</a>
            <a :href="site.cta.primary.href" class="btn btn-primary mt-6 !min-h-[52px] text-base" @click="close">
              {{ site.cta.primary.label }} <AppIcon name="arrow-right" :size="18" />
            </a>
          </nav>
        </div>
      </div>
    </Transition>
  </header>
</template>
