<script setup lang="ts">
const { education } = useSite()
</script>

<template>
  <section id="education" class="section">
    <div class="container-x">
      <SectionHeading :eyebrow="education.eyebrow" :title="education.title" />

      <div class="grid gap-6 lg:grid-cols-2">
        <div v-reveal class="space-y-4">
          <h3 class="flex items-center gap-2.5 text-lg font-bold"><AppIcon name="graduation" :size="22" class="text-brand" /> Academic background</h3>
          <article v-for="e in education.education" :key="e.degree" class="card card-hover p-5 sm:p-6">
            <div class="flex flex-wrap items-start justify-between gap-2">
              <h4 class="text-base font-bold sm:text-lg">{{ e.degree }}</h4>
              <span class="chip">{{ e.period }}</span>
            </div>
            <p class="mt-1 text-sm font-semibold text-brand">{{ e.school }}</p>
            <p v-if="e.note" class="mt-1 text-sm text-muted">{{ e.note }}</p>
          </article>
        </div>

        <div v-reveal="100" class="space-y-4">
          <h3 class="flex items-center gap-2.5 text-lg font-bold"><AppIcon name="award" :size="22" class="text-brand" /> {{ education.certificationsTitle }}</h3>
          <article v-for="c in education.certifications" :key="c.name" class="card card-hover flex items-center gap-4 p-5">
            <span class="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-brand"><AppIcon name="award" :size="20" /></span>
            <div class="min-w-0 flex-1">
              <h4 class="text-sm font-bold sm:text-base">{{ c.name }}</h4>
              <p class="text-xs text-muted sm:text-sm">{{ c.issuer }}</p>
            </div>
            <span class="text-xs font-semibold text-muted">{{ c.year }}</span>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>
