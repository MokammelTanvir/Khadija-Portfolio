<script setup lang="ts">
const { workflow: process } = useSite()
</script>

<template>
  <section id="process" class="section">
    <div class="container-x">
      <SectionHeading :eyebrow="process.eyebrow" :title="process.title" :subtitle="process.subtitle" />

      <ol class="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
        <div class="absolute left-[10%] right-[10%] top-6 hidden h-px bg-gradient-to-r from-transparent via-line to-transparent lg:block" aria-hidden="true" />
        <li v-for="(s, i) in process.steps" :key="s.title" v-reveal="i * 80" class="relative text-center sm:text-left lg:text-center">
          <span class="relative mx-auto grid h-12 w-12 place-items-center rounded-full border-2 border-primary bg-bg font-display text-lg font-extrabold text-brand sm:mx-0 lg:mx-auto">
            {{ i + 1 }}
          </span>
          <h3 class="mt-4 text-lg font-bold">{{ s.title }}</h3>
          <p class="mt-2 text-sm leading-relaxed text-muted">{{ s.text }}</p>
        </li>
      </ol>
    </div>
  </section>
</template>
