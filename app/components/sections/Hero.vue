<script setup lang="ts">
const { site, links } = useSite()
</script>

<template>
  <section id="home" class="relative overflow-hidden pb-16 pt-28 sm:pb-24 sm:pt-36 lg:pt-40">
    <!-- decorative background -->
    <div class="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
      <div class="bg-grid absolute inset-0 opacity-70" />
      <div class="absolute -left-24 top-10 h-72 w-72 rounded-full bg-primary/25 blur-[100px]" />
      <div class="absolute -right-16 top-40 h-72 w-72 rounded-full bg-accent/20 blur-[100px]" />
    </div>

    <div class="container-x grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
      <!-- text -->
      <div class="animate-fade-up lg:col-span-7">
        <span v-if="site.availability.show" class="inline-flex items-center gap-2.5 rounded-full border border-line bg-surface px-3.5 py-1.5 text-xs font-semibold shadow-soft">
          <span class="h-2 w-2 rounded-full bg-emerald-500 animate-pulse-dot" />
          {{ site.availability.text }}
        </span>

        <p class="mt-6 text-base font-semibold text-muted sm:text-lg">
          Hi, I'm <span class="text-fg">{{ site.name }}</span> — {{ site.role }}
        </p>

        <h1 class="mt-3 text-[2.1rem] font-extrabold leading-[1.08] sm:text-5xl lg:text-[3.4rem]">
          {{ site.headline }}
          <span class="text-gradient">{{ site.headlineHighlight }}</span>
        </h1>

        <p class="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">{{ site.tagline }}</p>

        <div class="mt-8 flex flex-col gap-3 sm:flex-row">
          <a :href="site.cta.primary.href" class="btn btn-primary !min-h-[52px] px-7 text-base">
            {{ site.cta.primary.label }} <AppIcon name="arrow-right" :size="18" />
          </a>
          <a :href="site.cta.secondary.href" class="btn btn-ghost !min-h-[52px] px-7 text-base">{{ site.cta.secondary.label }}</a>
          <a v-if="site.cta.resume.show" :href="site.cta.resume.href" download class="btn btn-ghost !min-h-[52px] px-5 text-base sm:hidden xl:inline-flex">
            <AppIcon name="download" :size="18" /> {{ site.cta.resume.label }}
          </a>
        </div>

        <div class="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
          <ul class="flex flex-wrap gap-2" aria-label="Specialties">
            <li v-for="t in site.heroTags" :key="t" class="chip">{{ t }}</li>
          </ul>
        </div>

        <div class="mt-8 flex items-center gap-3 text-sm text-muted">
          <a :href="links.tel" class="inline-flex items-center gap-2 font-medium text-fg transition hover:text-primary">
            <AppIcon name="phone" :size="16" /> {{ site.contact.phone }}
          </a>
          <span class="h-1 w-1 rounded-full bg-line" />
          <span class="inline-flex items-center gap-2"><AppIcon name="pin" :size="16" /> {{ site.contact.city }}</span>
        </div>
      </div>

      <!-- profile -->
      <div class="relative mx-auto w-full max-w-[340px] lg:col-span-5 lg:max-w-[400px]">
        <div class="absolute -inset-3 rotate-3 rounded-[2.2rem] bg-gradient-to-br from-primary/40 via-accent/30 to-transparent blur-sm" aria-hidden="true" />
        <div class="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-line bg-surface-2 shadow-soft">
          <img
            :src="site.profile.image"
            :alt="site.profile.alt"
            width="640"
            height="800"
            fetchpriority="high"
            decoding="async"
            class="h-full w-full object-cover"
          >
        </div>

        <div v-if="site.heroChips[0]" class="glass absolute -left-3 top-8 flex animate-float items-center gap-3 rounded-2xl border border-line p-3 shadow-soft sm:-left-8">
          <span class="grid h-10 w-10 place-items-center rounded-xl bg-primary/15 text-brand"><AppIcon :name="site.heroChips[0].icon" :size="20" /></span>
          <span class="leading-tight">
            <span class="block font-display text-lg font-extrabold">{{ site.heroChips[0].value }}</span>
            <span class="block text-xs text-muted">{{ site.heroChips[0].label }}</span>
          </span>
        </div>

        <div v-if="site.heroChips[1]" class="glass absolute -right-3 bottom-10 flex animate-float-slow items-center gap-3 rounded-2xl border border-line p-3 shadow-soft sm:-right-8">
          <span class="grid h-10 w-10 place-items-center rounded-xl bg-accent/15 text-accent"><AppIcon :name="site.heroChips[1].icon" :size="20" /></span>
          <span class="leading-tight">
            <span class="block font-display text-lg font-extrabold">{{ site.heroChips[1].value }}</span>
            <span class="block text-xs text-muted">{{ site.heroChips[1].label }}</span>
          </span>
        </div>
      </div>
    </div>
  </section>
</template>
