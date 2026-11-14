<script setup lang="ts">
const { projects } = useSite()
const active = ref('All')

const list = computed(() =>
  active.value === 'All' ? projects.items : projects.items.filter((p) => p.category === active.value)
)

const initials = (s: string) => s.split(/\s+/).map((w) => w[0]).slice(0, 2).join('').toUpperCase()
</script>

<template>
  <section id="projects" class="section bg-surface-2/50">
    <div class="container-x">
      <SectionHeading :eyebrow="projects.eyebrow" :title="projects.title" :subtitle="projects.subtitle" />

      <div v-reveal class="-mx-5 mb-10 flex gap-2 overflow-x-auto px-5 pb-2 sm:mx-0 sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0" role="tablist" aria-label="Filter projects">
        <button
          v-for="c in projects.categories"
          :key="c"
          type="button"
          role="tab"
          :aria-selected="active === c"
          class="shrink-0 rounded-full border px-4 py-2.5 text-sm font-semibold transition"
          :class="active === c ? 'border-primary bg-primary text-white shadow-glow' : 'border-line bg-surface text-muted hover:border-primary/50 hover:text-fg'"
          @click="active = c"
        >{{ c }}</button>
      </div>

      <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <article v-for="p in list" :key="p.title" class="card card-hover group flex animate-fade-up flex-col overflow-hidden">
          <!-- cover: real image if provided, otherwise a generated gradient -->
          <div class="relative aspect-[16/10] overflow-hidden">
            <img v-if="p.image" :src="p.image" :alt="p.title" loading="lazy" width="640" height="400" class="h-full w-full object-cover transition duration-500 group-hover:scale-105">
            <div v-else class="grid h-full w-full place-items-center" :style="{ background: `linear-gradient(135deg, ${p.color[0]}, ${p.color[1]})` }">
              <span class="font-display text-5xl font-extrabold text-white/90 drop-shadow">{{ initials(p.client) }}</span>
              <div class="absolute inset-0 opacity-30" style="background-image: radial-gradient(circle at 20% 20%, #fff 0, transparent 40%), radial-gradient(circle at 85% 80%, #fff 0, transparent 35%)" />
            </div>
            <span class="absolute left-4 top-4 rounded-full bg-black/55 px-3 py-1 text-xs font-semibold text-white backdrop-blur">{{ p.category }}</span>
          </div>

          <div class="flex flex-1 flex-col p-6">
            <p class="text-xs font-semibold uppercase tracking-wider text-muted">{{ p.client }}</p>
            <h3 class="mt-1 text-xl font-bold">{{ p.title }}</h3>
            <p class="mt-2 text-sm leading-relaxed text-muted">{{ p.summary }}</p>

            <dl class="mt-5 grid grid-cols-3 gap-2 rounded-xl bg-surface-2 p-3 text-center">
              <div v-for="m in p.metrics" :key="m.label">
                <dt class="text-[11px] text-muted">{{ m.label }}</dt>
                <dd class="font-display text-base font-extrabold text-brand sm:text-lg">{{ m.value }}</dd>
              </div>
            </dl>

            <div class="mt-4 flex flex-wrap gap-1.5">
              <span v-for="t in p.tools" :key="t" class="chip !py-1">{{ t }}</span>
            </div>

            <a v-if="p.link" :href="p.link" target="_blank" rel="noopener noreferrer" class="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
              View case study <AppIcon name="arrow-up-right" :size="16" />
            </a>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
