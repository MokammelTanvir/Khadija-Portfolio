<script setup lang="ts">
const { about } = useSite()
</script>

<template>
  <section aria-label="Key numbers" class="relative z-10">
    <div class="container-x">
      <div v-reveal class="card grid grid-cols-2 divide-line p-2 sm:p-3 lg:grid-cols-4 lg:divide-x">
        <div
          v-for="s in about.stats"
          :key="s.label"
          class="px-3 py-6 text-center sm:px-6 sm:py-8"
        >
          <p class="font-display text-3xl font-extrabold sm:text-4xl lg:text-[2.6rem]">
            <span class="text-gradient">
              <CountUp :value="s.value" :prefix="'prefix' in s ? s.prefix : ''" :suffix="s.suffix" :decimals="'decimals' in s ? s.decimals : 0" />
            </span>
          </p>
          <p class="mt-1.5 text-xs font-medium text-muted sm:text-sm">{{ s.label }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
