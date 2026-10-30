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
  meta: [{ name: 'description', content: 'Subscribe to the MedLabConvo Convo Stack for professional medical journalism and ecosystem insight.' }],
})
</script>

<template>
  <main class="bg-white">
    <SiteHero
      eyebrow="The Convo Stack"
      title="Stay close to what is changing."
      description="Professional medical journalism, research pulses and career notes for people who work in and around the laboratory. One considered email at a time."
      theme="light"
      compact
    >
      <template #visual>
        <div class="site-card p-6 sm:p-7">
          <p class="text-[9px] font-bold uppercase tracking-[0.16em] text-[#8a9ba5]">What lands in your inbox</p>
          <div class="mt-4 space-y-3">
            <div v-for="item in [
              { title: 'Editorial', text: 'Reported pieces on the forces shaping laboratory medicine.', icon: 'lucide:newspaper' },
              { title: 'Career notes', text: 'Practical thinking for the next step, not generic advice.', icon: 'lucide:compass' },
              { title: 'Ecosystem pulses', text: 'Roles, programmes and opportunities worth knowing about.', icon: 'lucide:radar' },
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
          <h2 class="site-h2 mt-3">One good email is enough.</h2>
          <p class="site-lead mt-3">We write for laboratory professionals, students and the people building around them. Expect signal, not noise.</p>
          <div class="mt-6 flex flex-wrap gap-2">
            <span class="site-chip">Editorial</span><span class="site-chip">Careers</span><span class="site-chip">Research</span><span class="site-chip">Opportunity</span>
          </div>
        </div>

        <form class="site-card p-5 sm:p-7" @submit.prevent="handleSubscribe">
          <div class="flex items-center justify-between border-b border-[#eef2f5] pb-4">
            <div>
              <p class="site-eyebrow">The Convo Stack</p>
              <h2 class="mt-2 text-[1.35rem] font-bold tracking-[-0.03em] text-[#0a202b]">Subscribe for free</h2>
            </div>
            <span class="flex h-9 w-9 items-center justify-center rounded-xl bg-[#eef5f9] text-[#27628C]"><Icon name="lucide:mail" class="h-4 w-4" /></span>
          </div>

          <div class="mt-5 space-y-4">
            <label class="block">
              <span class="text-[11px] font-semibold text-[#3b5361]">Full name</span>
              <input v-model="form.name" type="text" autocomplete="name" placeholder="Your name" class="mt-1.5 h-10 w-full rounded-lg border border-[#dfe7ee] bg-white px-3.5 text-[12px] text-[#0a202b] outline-none transition placeholder:text-[#b6c2cd] focus:border-[#27628C] focus:ring-2 focus:ring-[#27628C]/10" />
            </label>
            <label class="block">
              <span class="text-[11px] font-semibold text-[#3b5361]">Email address <span class="text-[#DE6129]">*</span></span>
              <input v-model="form.email" type="email" required autocomplete="email" placeholder="you@example.com" class="mt-1.5 h-10 w-full rounded-lg border border-[#dfe7ee] bg-white px-3.5 text-[12px] text-[#0a202b] outline-none transition placeholder:text-[#b6c2cd] focus:border-[#27628C] focus:ring-2 focus:ring-[#27628C]/10" />
            </label>
            <label class="block">
              <span class="text-[11px] font-semibold text-[#3b5361]">What interests you most?</span>
              <select v-model="form.interest" class="mt-1.5 h-10 w-full rounded-lg border border-[#dfe7ee] bg-white px-3.5 text-[12px] text-[#0a202b] outline-none transition focus:border-[#27628C] focus:ring-2 focus:ring-[#27628C]/10">
                <option value="journalism">Medical journalism</option>
                <option value="innovation">Health innovation</option>
                <option value="careers">Career development</option>
                <option value="all">The whole ecosystem</option>
              </select>
            </label>
          </div>

          <button type="submit" :disabled="loading" class="site-btn site-btn-primary mt-5 w-full disabled:opacity-50">
            <span v-if="loading" class="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            {{ loading ? 'Subscribing…' : 'Join the Convo Stack' }}
            <Icon v-if="!loading" name="lucide:arrow-up-right" class="h-3.5 w-3.5" />
          </button>
          <p class="mt-3 text-center text-[9.5px] leading-5 text-[#8a9ba5]">By subscribing you agree to our <NuxtLink to="/privacy-policy" class="font-semibold text-[#27628C]">Privacy Policy</NuxtLink>.</p>
        </form>
      </div>
    </section>
  </main>
</template>
