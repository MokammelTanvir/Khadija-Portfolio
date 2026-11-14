# CLAUDE.md — Digital Marketer Portfolio (Khajida Khatun)

Static, fast, mobile-first portfolio for a professional digital marketer.
**Every piece of content lives in local JSON files — no code edit needed to update the site.**

## 1. Goals

| Goal | How |
|---|---|
| Edit content without touching code | All text/contact/services/projects in `data/*.json` |
| Fastest possible load | Nuxt 4 **static generation** (`nuxt generate`), JSON bundled at build time (no runtime fetch, no CMS), self-hosted variable fonts, inline SVG icons, zero heavy libs |
| Professional modern UI/UX | Tailwind, clean type scale, bento/card layouts, subtle scroll-reveal, gradient accents |
| Mobile friendly | Mobile-first, sticky bottom-friendly CTAs, slide-in mobile menu, floating WhatsApp button |
| Dark + Light mode | `@nuxtjs/color-mode` (light / dark / system), CSS-variable design tokens, no flash on load |
| SEO | `useSeoMeta`, JSON-LD (Person + ProfessionalService), OG tags, robots.txt, semantic HTML |

## 2. Tech stack

- **Nuxt 4** (static preset) · **Vue 3** · **Tailwind CSS 3** (`@nuxtjs/tailwindcss`)
- `@nuxtjs/color-mode` for theme
- `@fontsource-variable/inter` (body) + `@fontsource-variable/plus-jakarta-sans` (headings) — bundled, no Google Fonts request
- No icon library: `components/ui/AppIcon.vue` holds an inline SVG path map
- No UI kit, no animation lib: tiny `v-reveal` directive (IntersectionObserver) + CSS

## 3. Data architecture (the "CMS")

All editable files are in `data/`. Edit → save → dev server hot-reloads (or re-run `npm run generate`).

| File | Controls |
|---|---|
| `data/site.json` | Name, role, tagline, **email, phone, WhatsApp, address**, social links, nav, theme colors, SEO, section on/off toggles, contact-form endpoint, footer |
| `data/about.json` | Bio paragraphs, stats counters, highlights, languages, "what I believe" |
| `data/services.json` | Service cards (title, icon, description, bullets, deliverables, starting price) |
| `data/projects.json` | Case studies (title, category, client, result metrics, tools, cover color/image, link) |
| `data/skills.json` | Skill bars/groups + tools & platforms list |
| `data/experience.json` | Work timeline |
| `data/education.json` | Education + certifications |
| `data/testimonials.json` | Client reviews |
| `data/process.json` | "How I work" steps |
| `data/faq.json` | FAQ accordion |

Rules:
- Add a new item = add one object to the array. Remove = delete it. Order in JSON = order on page.
- Hide an entire section: `site.json → sections.<name> = false`.
- Images go in `public/images/`; JSON references them like `"/images/profile.svg"`.
- Profile photo: replace `public/images/profile.svg` (or change `site.json → profile.image`). Placeholder is a dummy avatar.
- Theme accent colours: `site.json → theme.primary / theme.accent` (hex). Injected as CSS variables at build.
- All numbers/clients/testimonials currently shipped are **dummy placeholders** — replace before launch.

## 4. Folder structure

```
Khadija/
├─ CLAUDE.md
├─ nuxt.config.ts            # static, modules, SEO defaults, route prerender
├─ tailwind.config.ts        # tokens mapped to CSS vars
├─ data/                     # ← ALL editable content (JSON)
├─ public/
│  ├─ images/                # profile, project covers, og image
│  ├─ favicon.svg
│  └─ robots.txt
└─ app/
   ├─ app.vue                # SEO/JSON-LD + mounts all sections (no pages/ dir → vue-router NOT bundled = smaller JS)
   ├─ assets/css/main.css    # design tokens (light/dark), base, utilities
   ├─ composables/useSite.ts # single access point to all JSON data + mail/tel/WhatsApp link helpers
   ├─ plugins/reveal.ts      # v-reveal scroll-animation directive
   └─ components/            # auto-imported WITHOUT folder prefix (pathPrefix: false)
      ├─ layout/  AppHeader, AppFooter, ThemeToggle, FloatingActions
      ├─ sections/ Hero, Stats, About, Services, Process, Projects, Skills,
      │            Experience, Education, Testimonials, Faq, Contact
      └─ ui/      AppIcon (inline SVG map), SectionHeading, CountUp
```

## 4a. Quick edit cheat-sheet

| I want to… | Edit |
|---|---|
| Change name / role / headline / tagline | `data/site.json` → `name`, `role`, `headline`, `headlineHighlight`, `tagline` |
| Change email / phone / WhatsApp / address | `data/site.json` → `contact` (`whatsapp` = digits only, country code, no `+`) |
| Change social links | `data/site.json` → `social` (icons: linkedin, facebook, instagram, youtube) |
| Change brand colours | `data/site.json` → `theme.primary`, `theme.accent` |
| Hero floating badges / tag chips | `data/site.json` → `heroChips`, `heroTags` |
| Show "Download CV" button | put `cv.pdf` in `public/`, then `site.json → cta.resume.show = true` |
| Hide a section | `data/site.json` → `sections.<name> = false` |
| Add / edit a service | `data/services.json` → `items` (icon names: see `AppIcon.vue`) |
| Add a project / case study | `data/projects.json` → `items` (+ add its `category` to `categories`; optional `image`) |
| Experience / education / certificates | `data/experience.json`, `data/education.json` |
| Profile photo | replace `public/images/profile.svg` or point `site.json → profile.image` to e.g. `/images/me.jpg` (use ~800×1000, <150 KB) |
| Make contact form email straight to Gmail | Get a free key at web3forms.com (enter the Gmail) → paste into `site.json → contactForm.accessKey`. (Alternative: `contactForm.endpoint` = Formspree URL.) Empty = falls back to `mailto:` |
| Real domain for SEO | `site.json → seo.siteUrl` + `public/robots.txt` + regenerate `public/images/og.png` (1200×630) |

## 4b. Decisions made

- **Plain JSON imports, not @nuxt/content** — zero runtime, zero extra module, fastest possible; trade-off: content is JSON (not Markdown). If long-form blog posts are wanted later, add `@nuxt/content` just for `/blog`.
- **Single page, no router** — anchor links only; keeps the JS bundle minimal.
- **Contact form on a static site** — no backend. Default `mailto:` pre-fills the visitor's email app; set `contactForm.endpoint` for real submissions. WhatsApp floating button is the primary instant channel.
- **Services "Get a quote" → pre-selects the service in the contact form** (shared `useState('selectedService')`).
- Primary colour defaults to `#4361ee` (white-on-primary text passes WCAG AA).

## 5. Page sections (single-page, anchor navigation)

1. **Header** – logo/name, anchor nav, theme toggle, "Hire me" CTA, mobile drawer
2. **Hero** – headline, sub, CTAs (Hire / WhatsApp), profile image, floating metric chips, availability badge
3. **Stats strip** – years, projects, ad spend managed, ROAS (animated count-up)
4. **About** – bio, highlights, contact details
5. **Services** – SEO, Meta/Facebook Ads, Google Ads, Social Media, E-commerce marketing, **E-commerce website setup (Shopify/WooCommerce)**, Email & WhatsApp marketing, Content & Copywriting, Analytics & Tracking (GA4/GTM/CAPI), Landing page & CRO, Marketplace (Daraz/Amazon), Brand strategy
6. **Process** – Discover → Strategy → Launch → Optimize → Report
7. **Projects / Case studies** – category filter chips, result metrics
8. **Skills & Tools** – grouped skills + tool chips
9. **Experience** – vertical timeline
10. **Education & Certifications**
11. **Testimonials**
12. **FAQ** – accessible accordion (`<details>`)
13. **Contact** – email / phone / WhatsApp / address cards + form (works static: Formspree-style endpoint if set, otherwise opens `mailto:`)
14. **Footer** + floating WhatsApp button + back-to-top

## 6. UI / UX principles

- Mobile-first; tap targets ≥ 44px; fluid type via `clamp`.
- Tokens as RGB CSS variables → `rgb(var(--x) / <alpha-value>)` so Tailwind opacity works in both themes.
- Light: soft off-white bg, white cards, royal-blue/indigo primary, indigo-violet accent. Dark: near-black bg, elevated surfaces, same hues slightly brighter.
- Contrast ≥ WCAG AA; visible focus rings; `prefers-reduced-motion` disables reveals/animations.
- Images: `loading="lazy"` except hero (`fetchpriority="high"`), explicit width/height to avoid CLS.

## 7. Performance plan

- `nuxt generate` → pure static HTML/CSS/JS, deployable on Netlify / Vercel / Cloudflare Pages / any hosting.
- JSON imported statically → tree-shaken into the bundle; no network calls at runtime.
- Only latin subsets of fonts, `font-display: swap`.
- Inline critical CSS (Nuxt default), minimal JS (no third-party scripts).
- Target Lighthouse ≥ 95 on all four categories.

## 8. Commands

```bash
npm install
npm run dev        # http://localhost:3000
npm run generate   # static output → .output/public  (deploy this folder)
npm run preview
```

## 9. Conventions for future edits

- Never hardcode copy in components — read from `useSite()` / JSON.
- New section = new JSON file + import in `useSite.ts` + new component in `components/sections/` + toggle in `site.json → sections` + mount in `app/app.vue`.
- Keep components dependency-free; prefer CSS over JS animation.
- Placeholder contact: phone `+880 1980480686` (real, given by owner); email/address/social are dummy.
