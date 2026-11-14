<script setup lang="ts">
const colorMode = useColorMode()
const toggle = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}
</script>

<template>
  <button
    type="button"
    class="relative grid h-11 w-11 place-items-center rounded-xl border border-line bg-surface text-fg transition hover:border-primary/50 hover:bg-surface-2"
    aria-label="Toggle dark / light mode"
    title="Toggle theme"
    @click="toggle"
  >
    <!-- CSS decides which icon shows, so there is no hydration mismatch / flash -->
    <AppIcon name="moon" :size="19" class="dark:hidden" />
    <AppIcon name="sun" :size="19" class="hidden dark:block" />
  </button>
</template>
