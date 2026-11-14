<script setup lang="ts">
withDefaults(defineProps<{ eyebrow?: string; title: string; subtitle?: string; center?: boolean }>(), { center: true })
</script>

<template>
  <div v-reveal class="mb-12 sm:mb-16" :class="center ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'">
    <span v-if="eyebrow" class="eyebrow">{{ eyebrow }}</span>
    <h2 class="mt-4 text-3xl font-extrabold leading-tight sm:text-4xl lg:text-[2.75rem]">{{ title }}</h2>
    <p v-if="subtitle" class="mt-4 text-base leading-relaxed text-muted sm:text-lg">{{ subtitle }}</p>
  </div>
</template>
