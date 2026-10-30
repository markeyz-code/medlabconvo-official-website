<template>
  <footer class="relative overflow-hidden bg-[#033958] text-white" aria-labelledby="footer-heading">
    <div class="absolute inset-0 site-hero-grid opacity-40" />
    <div class="absolute -right-20 top-0 h-72 w-72 rounded-full bg-[#DE6129]/10 blur-3xl" />

    <h2 id="footer-heading" class="sr-only">Footer</h2>
    <div class="site-container relative pb-8 pt-14 sm:pt-20">
      <div class="grid gap-12 lg:grid-cols-[1.15fr_.7fr_.7fr_1.25fr]">
        <div>
          <NuxtLink to="/" class="inline-flex items-center gap-3">
            <img class="h-10 w-10 rounded-xl object-cover ring-1 ring-white/15" src="@/assets/img/medlab-logo.jpeg" alt="MedLabConvo" />
            <span>
              <span class="block text-[15px] font-bold tracking-[-0.02em]">MedLabConvo</span>
              <span class="mt-1 block text-[8px] font-bold uppercase tracking-[0.22em] text-white/45">Lead · Build · Inspire</span>
            </span>
          </NuxtLink>
          <p class="mt-5 max-w-xs text-[12px] leading-6 text-white/55">
            A global platform advancing medical laboratory science through knowledge, community, programmes and professional tools.
          </p>
          <div class="mt-6 flex items-center gap-2">
            <a
              v-for="item in social"
              :key="item.name"
              :href="item.href"
              target="_blank"
              rel="noopener noreferrer"
              class="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/65 transition hover:border-[#DE6129]/60 hover:bg-[#DE6129] hover:text-white"
              :aria-label="item.name"
            >
              <component :is="item.icon" class="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
          <p class="mt-6 max-w-xs text-[10px] leading-5 text-white/35">
            MedLabConvo is a trademark of LabiHealth Ambassadors Initiative, a registered non-profit organisation.
          </p>
        </div>

        <div>
          <h3 class="text-[10px] font-bold uppercase tracking-[0.18em] text-white/45">Platform</h3>
          <ul class="mt-4 space-y-2.5">
            <li v-for="item in platform" :key="item.name">
              <NuxtLink :to="item.href" class="text-[12.5px] text-white/65 transition hover:text-white">{{ item.name }}</NuxtLink>
            </li>
          </ul>
        </div>

        <div>
          <h3 class="text-[10px] font-bold uppercase tracking-[0.18em] text-white/45">Company</h3>
          <ul class="mt-4 space-y-2.5">
            <li v-for="item in company" :key="item.name">
              <NuxtLink :to="item.href" class="text-[12.5px] text-white/65 transition hover:text-white">{{ item.name }}</NuxtLink>
            </li>
          </ul>
          <h3 class="mt-7 text-[10px] font-bold uppercase tracking-[0.18em] text-white/45">Legal</h3>
          <ul class="mt-4 space-y-2.5">
            <li v-for="item in legal" :key="item.name">
              <NuxtLink :to="item.href" class="text-[12.5px] text-white/65 transition hover:text-white">{{ item.name }}</NuxtLink>
            </li>
          </ul>
        </div>

        <div class="rounded-2xl border border-white/10 bg-white/[0.045] p-5 backdrop-blur">
          <p class="text-[10px] font-bold uppercase tracking-[0.18em] text-[#f1a37f]">Stay insightful</p>
          <h3 class="mt-2 text-[18px] font-bold tracking-[-0.02em]">The Convo Stack</h3>
          <p class="mt-2 text-[11.5px] leading-5 text-white/55">
            Professional medical journalism, research pulses and opportunities — delivered to your inbox.
          </p>
          <form class="mt-4 space-y-2" @submit.prevent="handleSubscribe">
            <input
              v-model="email"
              type="email"
              required
              :disabled="loading"
              placeholder="Your email address"
              class="w-full rounded-lg border border-white/10 bg-white/5 px-3.5 py-2.5 text-[12px] text-white outline-none placeholder:text-white/30 focus:border-[#DE6129]/60"
            />
            <button type="submit" :disabled="loading || !email" class="site-btn site-btn-accent w-full min-h-0 py-2.5 text-[11.5px] disabled:opacity-40">
              <span v-if="loading" class="h-3 w-3 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              {{ loading ? 'Subscribing…' : 'Subscribe for free' }}
            </button>
          </form>
          <p class="mt-2 text-center text-[9px] text-white/30">No spam. Unsubscribe anytime.</p>
        </div>
      </div>

      <div class="mt-12 flex flex-col gap-3 border-t border-white/10 pt-5 text-[10.5px] text-white/40 sm:flex-row sm:items-center sm:justify-between">
        <p>© {{ new Date().getFullYear() }} MedLabConvo. All rights reserved.</p>
        <div class="flex flex-wrap items-center gap-x-4 gap-y-2">
          <span>Global Clinical Research &amp; Diagnostics Ecosystem</span>
          <span class="hidden h-3 w-px bg-white/15 sm:block" />
          <span class="text-white/55">MedLabConvo Tech</span>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { h, ref } from 'vue'
import { useSubscribe } from '@/composables/modules/subscriptions/useSubscribe'

const { subscribe, loading } = useSubscribe()
const email = ref('')

const handleSubscribe = async () => {
  const success = await subscribe(email.value)
  if (success) email.value = ''
}

const platform = [
  { name: 'Journo', href: '/journo' },
  { name: 'Convo Stack', href: '/convostack' },
  { name: 'LabCast', href: '/lab-cast' },
  { name: 'Programs', href: '/programs' },
  { name: 'Community', href: '/community' },
  { name: 'Shop', href: '/products' },
]

const company = [
  { name: 'About us', href: '/about-us' },
  { name: 'Resources', href: '/resources' },
  { name: 'Contact', href: '/enquiries' },
  { name: 'Donate', href: '/donate' },
]

const legal = [
  { name: 'Privacy policy', href: '/privacy-policy' },
  { name: 'Terms of service', href: '/terms-of-service' },
  { name: 'Cookie policy', href: '/cookie-policy' },
]

const social = [
  {
    name: 'Facebook',
    href: 'https://m.facebook.com/medlabconvo/',
    icon: () => h('svg', { fill: 'currentColor', viewBox: '0 0 24 24', 'aria-hidden': 'true' }, [
      h('path', { 'fill-rule': 'evenodd', d: 'M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z', 'clip-rule': 'evenodd' }),
    ]),
  },
  {
    name: 'X',
    href: 'https://x.com/medlabconvo',
    icon: () => h('svg', { fill: 'currentColor', viewBox: '0 0 24 24', 'aria-hidden': 'true' }, [
      h('path', { d: 'M13.68 10.62 20.24 3h-1.55l-5.7 6.62L8.45 3H3.2l6.88 10.01L3.2 21h1.55l6.02-6.99L15.57 21h5.24l-7.13-10.38Zm-2.13 2.48-.7-1L5.32 4.17h2.39l4.47 6.4.7 1 5.82 8.32h-2.4l-4.74-6.79Z' }),
    ]),
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/company/medlabconvo',
    icon: () => h('svg', { fill: 'currentColor', viewBox: '0 0 24 24', 'aria-hidden': 'true' }, [
      h('path', { d: 'M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.73V1.73C24 .77 23.2 0 22.22 0h.01Z' }),
    ]),
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/medlabconvo',
    icon: () => h('svg', { fill: 'currentColor', viewBox: '0 0 24 24', 'aria-hidden': 'true' }, [
      h('path', { 'fill-rule': 'evenodd', d: 'M12.32 2c2.43 0 2.78.01 3.81.06 1.06.05 1.79.22 2.43.47a4.9 4.9 0 0 1 1.77 1.15 4.9 4.9 0 0 1 1.15 1.77c.25.64.42 1.36.47 2.43.05 1.07.06 1.41.06 4.12v.08c0 2.64-.01 2.99-.06 4.04-.05 1.06-.22 1.79-.47 2.43a4.9 4.9 0 0 1-1.15 1.77 4.9 4.9 0 0 1-1.77 1.15c-.64.25-1.36.42-2.43.47-1.07.05-1.41.06-4.12.06h-.08c-2.64 0-2.99-.01-4.04-.06-1.06-.05-1.79-.22-2.43-.47a4.9 4.9 0 0 1-1.77-1.15 4.9 4.9 0 0 1-1.15-1.77c-.25-.64-.42-1.36-.47-2.43-.05-1.02-.06-1.38-.06-3.81v-.63c0-2.43.01-2.78.06-3.81.05-1.06.22-1.79.47-2.43a4.9 4.9 0 0 1 1.15-1.77A4.9 4.9 0 0 1 5.45 2.53c.64-.25 1.36-.42 2.43-.47C8.9 2.01 9.26 2 11.69 2h.63Zm-.08 1.8h-.47c-2.46 0-2.78.01-3.81.06-.98.04-1.5.21-1.86.34-.47.18-.8.4-1.15.75-.35.35-.57.68-.75 1.15-.14.35-.3.88-.34 1.86-.05 1.02-.06 1.35-.06 3.81v.47c0 2.45.01 2.78.06 3.8.04.98.21 1.51.34 1.86.18.47.4.8.75 1.15.35.35.68.57 1.15.75.35.14.88.3 1.86.34 1.05.05 1.37.06 4.04.06h.08c2.6 0 2.92-.01 3.96-.06.98-.04 1.51-.21 1.86-.34.47-.18.8-.4 1.15-.75.35-.35.57-.68.75-1.15.14-.35.3-.88.34-1.86.05-1.05.06-1.37.06-4.04v-.08c0-2.6-.01-2.92-.06-3.96-.04-.97-.21-1.5-.34-1.86a3.1 3.1 0 0 0-.75-1.15 3.1 3.1 0 0 0-1.15-.75c-.35-.14-.88-.3-1.86-.34-1.02-.05-1.35-.06-3.8-.06ZM12 6.87a5.14 5.14 0 1 1 0 10.27 5.14 5.14 0 0 1 0-10.27Zm0 1.8a3.33 3.33 0 1 0 0 6.67 3.33 3.33 0 0 0 0-6.67Zm5.34-3.2a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4Z', 'clip-rule': 'evenodd' }),
    ]),
  },
  {
    name: 'Spotify',
    href: 'https://open.spotify.com/show/04S2XZGd6gczoCXStIrh8e',
    icon: () => h('svg', { fill: 'currentColor', viewBox: '0 0 24 24', 'aria-hidden': 'true' }, [
      h('path', { d: 'M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0Zm5.52 17.34c-.24.36-.66.48-1.02.24-2.82-1.74-6.36-2.1-10.56-1.14-.42.12-.78-.18-.9-.54-.12-.42.18-.78.54-.9 4.56-1.02 8.52-.6 11.64 1.32.42.18.48.66.24 1.02h.06Zm1.44-3.3c-.3.42-.84.6-1.26.3-3.24-1.98-8.16-2.58-11.94-1.38-.48.12-1.02-.12-1.14-.6-.12-.48.12-1.02.6-1.14 4.32-1.32 9.72-.6 13.38 1.68.42.18.6.78.3 1.2l.06-.06Zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.3c-.6.18-1.2-.18-1.38-.72-.18-.6.18-1.2.72-1.38 4.26-1.26 11.28-1.02 15.72 1.62.54.3.72 1.02.42 1.56-.24.54-.96.72-1.56.3Z' }),
    ]),
  },
]
</script>
