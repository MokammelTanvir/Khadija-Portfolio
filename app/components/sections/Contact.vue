<script setup lang="ts">
const { site, services, links } = useSite()

const selectedService = useState<string>('selectedService', () => '')
const serviceOptions = [...services.items.map((s) => s.title), 'Other']

const form = reactive({ name: '', email: '', phone: '', service: '', budget: '', message: '', website: '' })
const status = ref<'idle' | 'sending' | 'ok' | 'error'>('idle')

// pre-select the service the visitor clicked on in the Services section
watch(selectedService, (v) => { if (v) form.service = v })

const cards = [
  { icon: 'mail', label: 'Email', value: site.contact.email, href: links.mail },
  { icon: 'phone', label: 'Phone', value: site.contact.phone, href: links.tel },
  { icon: 'whatsapp', label: 'WhatsApp', value: 'Chat instantly', href: links.whatsapp(), external: true },
  { icon: 'pin', label: 'Address', value: site.contact.address, href: site.contact.mapUrl, external: true },
  { icon: 'clock', label: 'Working hours', value: site.contact.workingHours }
]

async function submit() {
  if (form.website) return // honeypot
  status.value = 'sending'
  const subject = `New enquiry${form.service ? ' — ' + form.service : ''} from ${form.name}`
  const body =
    `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone || '-'}\nService: ${form.service || '-'}\nBudget: ${form.budget || '-'}\n\n${form.message}`

  const { endpoint: customEndpoint, accessKey } = site.contactForm
  // accessKey set → Web3Forms (emails the submission straight to your inbox); else custom endpoint; else mailto
  const endpoint = accessKey ? 'https://api.web3forms.com/submit' : customEndpoint
  if (!endpoint) {
    // no backend configured → open the visitor's email app with everything pre-filled
    window.location.href = `mailto:${site.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    status.value = 'ok'
    return
  }
  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        ...(accessKey ? { access_key: accessKey, from_name: site.name } : {}),
        subject,
        name: form.name,
        email: form.email,
        phone: form.phone,
        service: form.service,
        budget: form.budget,
        message: form.message
      })
    })
    const data = await res.json().catch(() => ({}))
    if (!res.ok || data.success === false) throw new Error('bad status')
    status.value = 'ok'
    Object.assign(form, { name: '', email: '', phone: '', service: '', budget: '', message: '' })
  } catch {
    status.value = 'error'
  }
}
</script>

<template>
  <section id="contact" class="section relative overflow-hidden bg-surface-2/50">
    <div class="pointer-events-none absolute -right-24 top-10 -z-0 h-80 w-80 rounded-full bg-primary/15 blur-[110px]" aria-hidden="true" />
    <div class="container-x relative">
      <SectionHeading eyebrow="Contact" title="Let's grow your business together" subtitle="Tell me about your goals — I'll reply within 24 hours with ideas and a clear next step." />

      <div class="grid gap-8 lg:grid-cols-12">
        <div v-reveal class="space-y-4 lg:col-span-5">
          <component
            :is="c.href ? 'a' : 'div'"
            v-for="c in cards"
            :key="c.label"
            :href="c.href"
            :target="c.external ? '_blank' : undefined"
            :rel="c.external ? 'noopener noreferrer' : undefined"
            class="card group flex items-center gap-4 p-4 sm:p-5"
            :class="c.href ? 'card-hover' : ''"
          >
            <span class="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-primary/10 text-brand transition group-hover:bg-primary group-hover:text-white"><AppIcon :name="c.icon" :size="21" /></span>
            <span class="min-w-0">
              <span class="block text-xs font-medium text-muted">{{ c.label }}</span>
              <span class="block break-words text-sm font-semibold sm:text-base">{{ c.value }}</span>
            </span>
          </component>

          <div class="flex gap-2.5 pt-2">
            <a v-for="s in site.social" :key="s.label" :href="s.url" target="_blank" rel="noopener noreferrer" :aria-label="s.label"
              class="grid h-11 w-11 place-items-center rounded-xl border border-line bg-surface text-muted transition hover:border-primary/50 hover:text-fg">
              <AppIcon :name="s.icon" :size="18" />
            </a>
          </div>
        </div>

        <form v-reveal="100" class="card space-y-5 p-6 sm:p-8 lg:col-span-7" novalidate @submit.prevent="submit">
          <div class="grid gap-5 sm:grid-cols-2">
            <label class="block">
              <span class="mb-1.5 block text-sm font-semibold">Full name *</span>
              <input v-model="form.name" type="text" name="name" required autocomplete="name" class="input" placeholder="Your name">
            </label>
            <label class="block">
              <span class="mb-1.5 block text-sm font-semibold">Email *</span>
              <input v-model="form.email" type="email" name="email" required autocomplete="email" class="input" placeholder="you@company.com">
            </label>
          </div>
          <div class="grid gap-5 sm:grid-cols-2">
            <label class="block">
              <span class="mb-1.5 block text-sm font-semibold">Phone / WhatsApp</span>
              <input v-model="form.phone" type="tel" name="phone" autocomplete="tel" class="input" placeholder="+880 ...">
            </label>
            <label class="block">
              <span class="mb-1.5 block text-sm font-semibold">Budget</span>
              <select v-model="form.budget" name="budget" class="input">
                <option value="">Select a range</option>
                <option v-for="b in site.contactForm.budgets" :key="b" :value="b">{{ b }}</option>
              </select>
            </label>
          </div>
          <label class="block">
            <span class="mb-1.5 block text-sm font-semibold">Service needed</span>
            <select v-model="form.service" name="service" class="input">
              <option value="">Select a service</option>
              <option v-for="s in serviceOptions" :key="s" :value="s">{{ s }}</option>
            </select>
          </label>
          <label class="block">
            <span class="mb-1.5 block text-sm font-semibold">Project details *</span>
            <textarea v-model="form.message" name="message" required rows="5" class="input resize-y" placeholder="Tell me about your business, goals and timeline…" />
          </label>

          <!-- honeypot -->
          <input v-model="form.website" type="text" name="website" tabindex="-1" autocomplete="off" class="hidden" aria-hidden="true">

          <button type="submit" class="btn btn-primary w-full !min-h-[52px] text-base disabled:opacity-60" :disabled="status === 'sending' || !form.name || !form.email || !form.message">
            {{ status === 'sending' ? 'Sending…' : 'Send message' }} <AppIcon name="send" :size="18" />
          </button>

          <p v-if="status === 'ok'" class="rounded-xl bg-emerald-500/10 px-4 py-3 text-sm font-medium text-emerald-600 dark:text-emerald-400" role="status">
            {{ (site.contactForm.accessKey || site.contactForm.endpoint) ?'Thank you! Your message was sent — I\'ll get back to you soon.' : 'Your email app should open with the message ready to send.' }}
          </p>
          <p v-if="status === 'error'" class="rounded-xl bg-rose-500/10 px-4 py-3 text-sm font-medium text-rose-600 dark:text-rose-400" role="alert">
            Something went wrong. Please email me directly or use WhatsApp.
          </p>
        </form>
      </div>
    </div>
  </section>
</template>
