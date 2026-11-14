<script setup lang="ts">
const { site, links } = useSite()
const year = new Date().getFullYear()
const navItems = site.nav.filter((n) => site.sections[n.href.replace('#', '') as keyof typeof site.sections] !== false)
</script>

<template>
  <footer class="border-t border-line bg-surface">
    <div class="container-x grid gap-10 py-14 md:grid-cols-12">
      <div class="md:col-span-5">
        <a href="#home" class="font-display text-2xl font-extrabold"><span class="text-gradient">{{ site.brand }}</span></a>
        <p class="mt-4 max-w-sm text-sm leading-relaxed text-muted">{{ site.footer.blurb }}</p>
        <div class="mt-6 flex gap-2.5">
          <a
            v-for="s in site.social"
            :key="s.label"
            :href="s.url"
            target="_blank"
            rel="noopener noreferrer"
            :aria-label="s.label"
            class="grid h-11 w-11 place-items-center rounded-xl border border-line text-muted transition hover:border-primary/50 hover:text-fg"
          ><AppIcon :name="s.icon" :size="18" /></a>
        </div>
      </div>

      <div class="md:col-span-3">
        <h3 class="text-sm font-bold uppercase tracking-wider">Quick links</h3>
        <ul class="mt-4 space-y-2.5 text-sm text-muted">
          <li v-for="n in navItems" :key="n.href"><a :href="n.href" class="transition hover:text-fg">{{ n.label }}</a></li>
        </ul>
      </div>

      <div class="md:col-span-4">
        <h3 class="text-sm font-bold uppercase tracking-wider">Get in touch</h3>
        <ul class="mt-4 space-y-2.5 text-sm text-muted">
          <li><a :href="links.mail" class="transition hover:text-fg">{{ site.contact.email }}</a></li>
          <li><a :href="links.tel" class="transition hover:text-fg">{{ site.contact.phone }}</a></li>
          <li>{{ site.contact.city }}</li>
        </ul>
      </div>
    </div>

    <div class="border-t border-line">
      <div class="container-x flex flex-col items-center justify-between gap-2 py-6 text-xs text-muted sm:flex-row">
        <p>© {{ year }} {{ site.name }}. {{ site.footer.copyright }}</p>
        <a href="#home" class="inline-flex items-center gap-1.5 transition hover:text-fg">Back to top <AppIcon name="arrow-up" :size="14" /></a>
      </div>
    </div>
  </footer>
</template>
