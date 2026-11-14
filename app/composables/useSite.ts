// Single entry point for all editable content. Edit the JSON files in /data — never the components.
import site from '~~/data/site.json'
import about from '~~/data/about.json'
import services from '~~/data/services.json'
import workflow from '~~/data/process.json'
import projects from '~~/data/projects.json'
import skills from '~~/data/skills.json'
import experience from '~~/data/experience.json'
import education from '~~/data/education.json'
import testimonials from '~~/data/testimonials.json'
import faq from '~~/data/faq.json'

export function hexToRgb(hex: string): string {
  const h = hex.replace('#', '')
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h
  const n = parseInt(full, 16)
  return `${(n >> 16) & 255} ${(n >> 8) & 255} ${n & 255}`
}

export function useSite() {
  const c = site.contact
  const links = {
    mail: `mailto:${c.email}`,
    tel: `tel:${c.phone.replace(/[^+\d]/g, '')}`,
    whatsapp: (msg: string = c.whatsappMessage) =>
      `https://wa.me/${c.whatsapp}?text=${encodeURIComponent(msg)}`
  }
  return { site, about, services, workflow, projects, skills, experience, education, testimonials, faq, links }
}
