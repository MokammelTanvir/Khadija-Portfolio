<script setup lang="ts">
const { skills } = useSite()
</script>

<template>
  <section id="skills" class="section">
    <div class="container-x">
      <SectionHeading :eyebrow="skills.eyebrow" :title="skills.title" :subtitle="skills.subtitle" />

      <div class="grid gap-6 lg:grid-cols-2">
        <div v-for="g in skills.groups" :key="g.title" v-reveal class="card p-6 sm:p-8">
          <h3 class="text-lg font-bold">{{ g.title }}</h3>
          <ul class="mt-6 space-y-5">
            <li v-for="s in g.skills" :key="s.name">
              <div class="mb-2 flex items-center justify-between text-sm">
                <span class="font-semibold">{{ s.name }}</span>
                <span class="tabular-nums text-muted">{{ s.level }}%</span>
              </div>
              <div class="h-2.5 overflow-hidden rounded-full bg-surface-2" role="progressbar" :aria-valuenow="s.level" aria-valuemin="0" aria-valuemax="100" :aria-label="s.name">
                <div class="bar-fill h-full rounded-full bg-gradient-to-r from-primary to-accent" :style="{ '--lvl': s.level / 100 }" />
              </div>
            </li>
          </ul>
        </div>

        <div v-reveal="100" class="card p-6 sm:p-8">
          <h3 class="text-lg font-bold">Tools &amp; platforms</h3>
          <ul class="mt-6 flex flex-wrap gap-2.5">
            <li v-for="t in skills.tools" :key="t" class="rounded-xl border border-line bg-surface-2 px-3.5 py-2 text-sm font-medium transition hover:-translate-y-0.5 hover:border-primary/50">{{ t }}</li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>
