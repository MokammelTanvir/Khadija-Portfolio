<script setup lang="ts">
const { experience } = useSite()
</script>

<template>
  <section id="experience" class="section bg-surface-2/50">
    <div class="container-x">
      <SectionHeading :eyebrow="experience.eyebrow" :title="experience.title" />

      <ol class="relative mx-auto max-w-3xl border-l-2 border-line pl-7 sm:pl-10">
        <li v-for="(e, i) in experience.items" :key="e.role + e.period" v-reveal="i * 60" class="relative pb-10 last:pb-0">
          <span class="absolute -left-[2.15rem] top-1.5 grid h-5 w-5 place-items-center rounded-full border-4 border-bg bg-primary sm:-left-[3.15rem] sm:h-6 sm:w-6" aria-hidden="true" />
          <div class="card p-5 sm:p-7">
            <div class="flex flex-wrap items-start justify-between gap-2">
              <div>
                <h3 class="text-lg font-bold sm:text-xl">{{ e.role }}</h3>
                <p class="mt-0.5 text-sm font-semibold text-brand">{{ e.company }}</p>
              </div>
              <span class="chip">{{ e.period }}</span>
            </div>
            <p class="mt-1 flex items-center gap-1.5 text-xs text-muted"><AppIcon name="pin" :size="13" /> {{ e.location }}</p>
            <ul class="mt-4 space-y-2 text-sm leading-relaxed text-muted">
              <li v-for="p in e.points" :key="p" class="flex gap-2.5">
                <span class="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                <span>{{ p }}</span>
              </li>
            </ul>
          </div>
        </li>
      </ol>
    </div>
  </section>
</template>
