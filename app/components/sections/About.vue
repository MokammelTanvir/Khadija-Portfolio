<script setup lang="ts">
const { about, site, links } = useSite()

const details = [
  { icon: 'mail', label: 'Email', value: site.contact.email, href: links.mail },
  { icon: 'phone', label: 'Phone', value: site.contact.phone, href: links.tel },
  { icon: 'pin', label: 'Location', value: site.contact.city, href: site.contact.mapUrl }
]
</script>

<template>
  <section id="about" class="section">
    <div class="container-x grid gap-12 lg:grid-cols-12 lg:gap-14">
      <div v-reveal class="lg:col-span-7">
        <span class="eyebrow">{{ about.eyebrow }}</span>
        <h2 class="mt-4 text-3xl font-extrabold leading-tight sm:text-4xl lg:text-[2.6rem]">{{ about.title }}</h2>
        <div class="mt-6 space-y-4 text-base leading-relaxed text-muted sm:text-lg">
          <p v-for="(p, i) in about.paragraphs" :key="i">{{ p }}</p>
        </div>

        <div class="mt-10 grid gap-4 sm:grid-cols-3">
          <div v-for="h in about.highlights" :key="h.title" class="card card-hover p-5">
            <span class="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-brand"><AppIcon :name="h.icon" :size="22" /></span>
            <h3 class="mt-4 text-base font-bold">{{ h.title }}</h3>
            <p class="mt-1.5 text-sm leading-relaxed text-muted">{{ h.text }}</p>
          </div>
        </div>
      </div>

      <aside v-reveal="120" class="lg:col-span-5">
        <div class="card p-6 sm:p-8">
          <h3 class="text-lg font-bold">Quick details</h3>
          <ul class="mt-5 space-y-4">
            <li v-for="d in details" :key="d.label">
              <a :href="d.href" class="group flex items-center gap-4" :target="d.icon === 'pin' ? '_blank' : undefined" rel="noopener">
                <span class="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-surface-2 text-brand transition group-hover:bg-primary group-hover:text-white"><AppIcon :name="d.icon" :size="19" /></span>
                <span class="min-w-0">
                  <span class="block text-xs font-medium text-muted">{{ d.label }}</span>
                  <span class="block truncate text-sm font-semibold">{{ d.value }}</span>
                </span>
              </a>
            </li>
          </ul>

          <div class="mt-7 border-t border-line pt-6">
            <p class="text-xs font-semibold uppercase tracking-wider text-muted">Languages</p>
            <div class="mt-3 flex flex-wrap gap-2"><span v-for="l in about.languages" :key="l" class="chip">{{ l }}</span></div>
            <p class="mt-5 text-xs font-semibold uppercase tracking-wider text-muted">Interests</p>
            <div class="mt-3 flex flex-wrap gap-2"><span v-for="l in about.interests" :key="l" class="chip">{{ l }}</span></div>
          </div>

          <a v-if="site.cta.resume.show" :href="site.cta.resume.href" download class="btn btn-ghost mt-7 w-full">
            <AppIcon name="download" :size="18" /> {{ site.cta.resume.label }}
          </a>
        </div>
      </aside>
    </div>
  </section>
</template>
