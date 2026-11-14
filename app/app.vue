<script setup lang="ts">
const { site, links } = useSite()
const s = site.sections
const seo = site.seo
const ogImage = seo.siteUrl + seo.ogImage

useSeoMeta({
  title: seo.title,
  description: seo.description,
  keywords: seo.keywords,
  author: site.name,
  ogTitle: seo.title,
  ogDescription: seo.description,
  ogType: 'website',
  ogUrl: seo.siteUrl,
  ogImage,
  ogSiteName: site.name,
  twitterCard: 'summary_large_image',
  twitterTitle: seo.title,
  twitterDescription: seo.description,
  twitterImage: ogImage
})

useHead({
  link: [{ rel: 'canonical', href: seo.siteUrl }],
  // theme colours come from data/site.json → injected as CSS variables
  style: [{ innerHTML: `:root{--primary:${hexToRgb(site.theme.primary)};--accent:${hexToRgb(site.theme.accent)}}` }],
  script: [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      name: `${site.name} — ${site.role}`,
      description: seo.description,
      url: seo.siteUrl,
      image: ogImage,
      telephone: site.contact.phone,
      email: site.contact.email,
      address: { '@type': 'PostalAddress', streetAddress: site.contact.address, addressCountry: 'BD' },
      sameAs: site.social.map((x) => x.url),
      founder: { '@type': 'Person', name: site.name, jobTitle: site.role }
    })
  }]
})
</script>

<template>
  <div>
    <a href="#main" class="sr-only z-[60] rounded-lg bg-primary px-4 py-2 text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4">Skip to content</a>
    <AppHeader />
    <main id="main">
      <Hero />
      <Stats v-if="s.stats" />
      <About v-if="s.about" />
      <Services v-if="s.services" />
      <Process v-if="s.process" />
      <Projects v-if="s.projects" />
      <Skills v-if="s.skills" />
      <Experience v-if="s.experience" />
      <Education v-if="s.education" />
      <Testimonials v-if="s.testimonials" />
      <Faq v-if="s.faq" />
      <Contact v-if="s.contact" />
    </main>
    <AppFooter />
    <FloatingActions />
  </div>
</template>
