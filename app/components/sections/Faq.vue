<script setup lang="ts">
const { faq } = useSite()
</script>

<template>
  <section id="faq" class="section">
    <div class="container-x max-w-3xl">
      <SectionHeading :eyebrow="faq.eyebrow" :title="faq.title" />

      <div class="space-y-3">
        <details
          v-for="(f, i) in faq.items"
          :key="f.q"
          v-reveal="i * 50"
          name="faq"
          class="card group overflow-hidden"
        >
          <summary class="flex min-h-[56px] cursor-pointer items-center justify-between gap-4 px-5 py-4 text-left text-base font-semibold sm:px-6">
            {{ f.q }}
            <AppIcon name="chevron" :size="20" class="faq-chevron shrink-0 text-muted transition-transform duration-300" />
          </summary>
          <p class="px-5 pb-5 text-sm leading-relaxed text-muted sm:px-6 sm:text-base">{{ f.a }}</p>
        </details>
      </div>
    </div>
  </section>
</template>
