<script setup lang="ts">
const { links } = useSite()
const showTop = ref(false)

onMounted(() => {
  const onScroll = () => { showTop.value = window.scrollY > 700 }
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})
</script>

<template>
  <div class="fixed bottom-5 right-4 z-40 flex flex-col items-end gap-3 sm:right-6">
    <a
      href="#home"
      aria-label="Back to top"
      class="glass grid h-11 w-11 place-items-center rounded-full border border-line shadow-soft transition duration-300 hover:border-primary/50"
      :class="showTop ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'"
    ><AppIcon name="arrow-up" :size="18" /></a>

    <a
      :href="links.whatsapp()"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      class="grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-lg shadow-emerald-500/30 transition hover:scale-105 active:scale-95"
    ><AppIcon name="whatsapp" :size="26" /></a>
  </div>
</template>
