<script setup lang="ts">
import { reactive } from 'vue'
import SiteHero from '@/components/site/SiteHero.vue'
import { useSubscribe } from '@/composables/modules/subscriptions/useSubscribe'

const { subscribe, loading } = useSubscribe()
const form = reactive({ name: '', email: '', interest: 'journalism' })

const handleSubscribe = async () => {
  const success = await subscribe(form.email)
  if (success) {
    form.name = ''
    form.email = ''
    form.interest = 'journalism'
  }
}

useHead({
  title: 'Subscribe | MedLabConvo',
  meta: [{ name: 'description', content: 'One MedLabConvo subscription for Journo publications, programmes, community news and ecosystem insight.' }],
})
</script>

<template>
  <main class="bg-white">
    <SiteHero
      eyebrow="MedLabConvo updates"
      title="Stay close to what is changing."
      description="One subscription covers every MedLabConvo email: new Journo publications, programme openings, community news and the occasional ecosystem pulse."
      theme="light"
      compact
    >
      <template #visual>
        <div class="site-card p-6 sm:p-7">
          <p class="text-[9px] font-bold uppercase tracking-[0.16em] text-[#8a9ba5]">One list. Everything here.</p>
          <div class="mt-4 space-y-3">
            <div v-for="item in [
              { title: 'Journo', text: 'New publications, essays and reported perspectives.', icon: 'lucide:newspaper' },
              { title: 'Programmes', text: 'New cohorts, application windows and opportunities.', icon: 'lucide:graduation-cap' },
              { title: 'Community', text: 'Interntional, UniVerse, corpers and early-career news.', icon: 'lucide:users' },
            ]" :key="item.title" class="flex items-start gap-3 rounded-xl border border-[#eef2f5] bg-[#fbfcfc] p-3.5">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#eef5f9] text-[#27628C]"><Icon :name="item.icon" class="h-4 w-4" /></span>
              <div>
                <p class="text-[11px] font-bold text-[#0a202b]">{{ item.title }}</p>
                <p class="mt-0.5 text-[10px] leading-5 text-[#5f7482]">{{ item.text }}</p>
              </div>
            </div>
          </div>
          <p class="mt-4 text-[9px] font-semibold uppercase tracking-[0.12em] text-[#8a9ba5]">No spam. Unsubscribe anytime.</p>
        </div>
      </template>
    </SiteHero>

    <section class="site-section">
      <div class="site-container grid gap-8 lg:grid-cols-[.9fr_1.1fr] lg:items-start">
        <div>
          <p class="site-eyebrow">Join the list</p>
          <h2 class="site-h2 mt-3">Subscribe once. Get everything.</h2>
          <p class="site-lead mt-3">No second list, no duplicate sign-ups. One subscription receives every MedLabConvo email.</p>
          <div class="mt-6 flex flex-wrap gap-2">
            <span class="site-chip">Editorial</span><span class="site-chip">Careers</span><span class="site-chip">Research</span><span class="site-chip">Opportunity</span>
          </div>
        </div>

        <form class="site-card p-5 sm:p-7" @submit.prevent="handleSubscribe">
          <div class="flex items-center justify-between border-b border-[#eef2f5] pb-4">
            <div>
              <p class="site-eyebrow">MedLabConvo updates</p>
              <h2 class="mt-2 text-[1.35rem] font-bold tracking-[-0.03em] text-[#0a202b]">One subscription</h2>
            </div>
            <span class="flex h-9 w-9 items-center justify-center rounded-xl bg-[#eef5f9] text-[#27628C]"><Icon name="lucide:mail" class="h-4 w-4" /></span>
          </div>

          <div class="mt-5 space-y-4">
            <label class="block">
              <span class="text-[11px] font-semibold text-[#3b5361]">Email address <span class="text-[#DE6129]">*</span></span>
              <input v-model="form.email" type="email" required autocomplete="email" placeholder="you@example.com" class="mt-1.5 h-10 w-full rounded-lg border border-[#dfe7ee] bg-white px-3.5 text-[12px] text-[#0a202b] outline-none transition placeholder:text-[#b6c2cd] focus:border-[#27628C] focus:ring-2 focus:ring-[#27628C]/10" />
            </label>
          </div>

          <button type="submit" :disabled="loading" class="site-btn site-btn-primary mt-5 w-full disabled:opacity-50">
            <span v-if="loading" class="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            {{ loading ? 'Subscribing…' : 'Subscribe once' }}
            <Icon v-if="!loading" name="lucide:arrow-up-right" class="h-3.5 w-3.5" />
          </button>
          <p class="mt-3 text-center text-[9.5px] leading-5 text-[#8a9ba5]">By subscribing you agree to our <NuxtLink to="/privacy-policy" class="font-semibold text-[#27628C]">Privacy Policy</NuxtLink>.</p>
        </form>
      </div>
    </section>
  </main>
</template>
