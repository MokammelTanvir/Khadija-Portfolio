<script setup lang="ts">
const { services } = useSite()
// remembers which service was clicked so the contact form can pre-select it
const selectedService = useState<string>('selectedService', () => '')
</script>

<template>
  <section id="services" class="section bg-surface-2/50">
    <div class="container-x">
      <SectionHeading :eyebrow="services.eyebrow" :title="services.title" :subtitle="services.subtitle" />

      <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <article
          v-for="(s, i) in services.items"
          :key="s.title"
          v-reveal="(i % 3) * 90"
          class="card card-hover relative flex flex-col p-6"
          :class="s.featured ? 'ring-1 ring-primary/40' : ''"
        >
          <span v-if="s.featured" class="absolute right-5 top-5 rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-brand">Popular</span>
          <span class="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-primary to-accent text-white shadow-glow">
            <AppIcon :name="s.icon" :size="22" />
          </span>
          <h3 class="mt-5 text-lg font-bold leading-snug">{{ s.title }}</h3>
          <p class="mt-2 text-sm leading-relaxed text-muted">{{ s.description }}</p>

          <ul class="mt-5 space-y-2 text-sm">
            <li v-for="p in s.points" :key="p" class="flex items-start gap-2.5">
              <AppIcon name="check" :size="16" class="mt-0.5 shrink-0 text-emerald-500" />
              <span>{{ p }}</span>
            </li>
          </ul>

          <div class="mt-auto flex items-center justify-between pt-6">
            <span class="text-sm font-bold">{{ s.price }}</span>
            <a href="#contact" class="inline-flex items-center gap-1.5 text-sm font-semibold text-brand transition hover:gap-2.5" @click="selectedService = s.title">
              Get a quote <AppIcon name="arrow-right" :size="16" />
            </a>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
