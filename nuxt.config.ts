// Static-generated, single-page portfolio. All content comes from /data/*.json
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  ssr: true,

  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/color-mode'],

  // Self-hosted variable fonts (no Google Fonts request, only needed unicode subsets are fetched)
  css: ['@fontsource-variable/inter', '@fontsource-variable/plus-jakarta-sans'],

  components: [{ path: '~/components', pathPrefix: false }],

  tailwindcss: {
    cssPath: '~/assets/css/main.css',
    viewer: false
  },

  colorMode: {
    classSuffix: '',
    preference: 'system',
    fallback: 'light',
    storageKey: 'khajida-theme'
  },

  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#f8f9fc', media: '(prefers-color-scheme: light)' },
        { name: 'theme-color', content: '#08090e', media: '(prefers-color-scheme: dark)' }
      ],
      link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }]
    }
  },

  nitro: {
    prerender: { routes: ['/'] }
  }
})
