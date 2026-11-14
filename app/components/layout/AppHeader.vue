<script setup lang="ts">
const { site, links } = useSite()

const open = ref(false)
const scrolled = ref(false)
const active = ref('')
const closeBtn = ref<HTMLButtonElement | null>(null)
const menuBtn = ref<HTMLButtonElement | null>(null)

const navItems = computed(() =>
  site.nav.filter((n) => {
    const key = n.href.replace('#', '') as keyof typeof site.sections
    return site.sections[key] !== false
  })
)

function close() { open.value = false }

watch(open, async (v) => {
  if (!import.meta.client) return
  document.documentElement.style.overflow = v ? 'hidden' : ''
  if (v) { await nextTick(); closeBtn.value?.focus() } else { menuBtn.value?.focus({ preventScroll: true }) }
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
  // leaving mobile width with the drawer open → close it
  window.matchMedia('(min-width: 1024px)').addEventListener('change', (e) => { if (e.matches) close() })
})
</script>

<template>
  <div>
    <header
      class="fixed inset-x-0 top-0 z-50 transition-all duration-300"
      :class="scrolled ? 'glass border-b border-line shadow-soft' : 'border-b border-transparent'"
    >
      <div class="container-x flex h-16 items-center justify-between sm:h-[72px]">
        <a href="#home" class="font-display text-xl font-extrabold tracking-tight">
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
            ref="menuBtn"
            type="button"
            class="grid h-11 w-11 place-items-center rounded-xl border border-line bg-surface lg:hidden"
            :aria-expanded="open"
            aria-controls="mobile-menu"
            aria-label="Open menu"
            @click="open = true"
          >
            <AppIcon name="menu" :size="20" />
          </button>
        </div>
      </div>
    </header>

    <!-- Mobile drawer: lives outside <header> so the header's backdrop-filter can't break `fixed` positioning -->
    <div class="lg:hidden">
      <Transition
        enter-active-class="transition-opacity duration-300 ease-out"
        enter-from-class="opacity-0"
        leave-active-class="transition-opacity duration-200 ease-in"
        leave-to-class="opacity-0"
      >
        <div v-if="open" class="fixed inset-0 z-[55] bg-black/55 backdrop-blur-sm" aria-hidden="true" @click="close" />
      </Transition>

      <!-- slides in from the left edge → right -->
      <Transition
        enter-active-class="transition-transform duration-300 ease-out"
        enter-from-class="-translate-x-full"
        leave-active-class="transition-transform duration-200 ease-in"
        leave-to-class="-translate-x-full"
      >
        <aside
          v-if="open"
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          class="fixed bottom-0 left-0 top-0 z-[60] flex w-[84%] max-w-sm flex-col overflow-y-auto border-r border-line bg-surface p-5 shadow-2xl"
        >
          <div class="flex items-center justify-between">
            <a href="#home" class="font-display text-xl font-extrabold tracking-tight" @click="close">
              <span class="text-gradient">{{ site.brand }}</span>
            </a>
            <button
              ref="closeBtn"
              type="button"
              class="grid h-11 w-11 place-items-center rounded-xl border border-line bg-bg"
              aria-label="Close menu"
              @click="close"
            >
              <AppIcon name="x" :size="20" />
            </button>
          </div>

          <nav class="mt-8 flex flex-col gap-1" aria-label="Mobile">
            <a
              v-for="n in navItems"
              :key="n.href"
              :href="n.href"
              class="flex items-center justify-between rounded-xl px-4 py-3.5 font-display text-xl font-bold transition hover:bg-surface-2"
              :class="active === n.href ? 'bg-primary/10 text-brand' : 'text-fg'"
              @click="close"
            >
              {{ n.label }}
              <AppIcon name="arrow-right" :size="18" class="opacity-50" />
            </a>
          </nav>

          <div class="mt-auto space-y-5 pt-8">
            <a :href="site.cta.primary.href" class="btn btn-primary w-full !min-h-[52px] text-base" @click="close">
              {{ site.cta.primary.label }} <AppIcon name="arrow-right" :size="18" />
            </a>

            <ul class="space-y-3 border-t border-line pt-5 text-sm">
              <li><a :href="links.tel" class="flex items-center gap-3 font-medium"><AppIcon name="phone" :size="17" class="text-brand" /> {{ site.contact.phone }}</a></li>
              <li><a :href="links.mail" class="flex items-center gap-3 font-medium"><AppIcon name="mail" :size="17" class="text-brand" /> {{ site.contact.email }}</a></li>
            </ul>

            <div class="flex gap-2.5">
              <a
                v-for="s in site.social"
                :key="s.label"
                :href="s.url"
                target="_blank"
                rel="noopener noreferrer"
                :aria-label="s.label"
                class="grid h-11 w-11 place-items-center rounded-xl border border-line text-muted transition hover:border-primary/50 hover:text-fg"
              ><AppIcon :name="s.icon" :size="18" /></a>
            </div>
          </div>
        </aside>
      </Transition>
    </div>
  </div>
</template>
