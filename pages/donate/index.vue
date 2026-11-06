<script setup lang="ts">
import SiteHero from '@/components/site/SiteHero.vue'
import SiteSectionHeader from '@/components/site/SiteSectionHeader.vue'
import SiteCta from '@/components/site/SiteCta.vue'

const textToCopy = ref('2226584232')
const copied = ref(false)

const copyText = async () => {
  try {
    await navigator.clipboard.writeText(textToCopy.value)
    copied.value = true
    setTimeout(() => { copied.value = false }, 2000)
  } catch (error) {
    console.error('Failed to copy account number:', error)
  }
}

const testimonials = [
  { name: 'Raphael Yohanna', role: 'Biomedical Scientist', quote: 'The masterclass has tweaked my thoughts and ideas on the scholarship application process and motivated me to review my application materials for a more compelling application.' },
  { name: 'Precious Adesola', role: 'Biomedical Scientist', quote: 'This masterclass equipped me with effective strategies and invaluable resources to navigate scholarship applications. I am deeply grateful to MedLabConvo for offering it for free.' },
  { name: 'Modupe Laja', role: 'Physiotherapist', quote: 'The amazing work by MedLabConvo truly inspired me during my years in school and up till now. I love to see the amazing things the team is doing.' },
]

const impacts = [
  { title: 'Train and mentor future leaders', text: 'Programmes and professional development that equip young healthcare professionals with the skills and opportunities to thrive.', icon: 'lucide:graduation-cap' },
  { title: 'Bridge the knowledge gap', text: 'LabCast, editorial and research resources that bring critical knowledge closer to everyday clinical practice.', icon: 'lucide:book-open' },
  { title: 'Strengthen health systems', text: 'Collaboration and advocacy that contribute to a more robust, efficient and equitable healthcare system.', icon: 'lucide:heart-pulse' },
  { title: 'Expand access to opportunity', text: 'Networking and community-building that connect professionals across borders — so no one is left behind.', icon: 'lucide:globe-2' },
]

const rewards = [
  { amount: 'Any amount', title: 'A personal thank-you', text: 'Every donor receives a heartfelt personalised email from the team.' },
  { amount: '₦5,000+', title: 'A card to keep', text: 'A personalised thank-you card in addition to your email.' },
  { amount: '₦50,000+', title: 'A piece of the work', text: 'An exclusive MedLabConvo souvenir alongside your card and email.' },
]

useHead({
  title: 'Donate | MedLabConvo',
  meta: [{ name: 'description', content: 'Support MedLabConvo and help build a stronger laboratory workforce and health system.' }],
})
</script>

<template>
  <main class="bg-white">
    <SiteHero
      eyebrow="Support the work"
      title="Invest in the people who carry the science."
      description="Your donation helps MedLabConvo train, connect and amplify laboratory professionals — building a stronger workforce and a more equitable health system."
      primary-label="Donate now"
      primary-to="https://paystack.com/pay/medlabconvodonation"
      secondary-label="See our programmes"
      secondary-to="/programs"
    >
      <template #visual>
        <div class="site-card overflow-hidden !border-white/10 !bg-white/[0.06] p-6 sm:p-8">
          <p class="text-[9px] font-bold uppercase tracking-[0.16em] text-white/45">The impact at a glance</p>
          <div class="mt-5 grid grid-cols-2 gap-4">
            <div class="rounded-xl border border-white/10 bg-white/5 p-4"><p class="text-[1.35rem] font-bold text-white">5,000+</p><p class="mt-1 text-[9px] uppercase tracking-[0.1em] text-white/40">Professionals reached</p></div>
            <div class="rounded-xl border border-white/10 bg-white/5 p-4"><p class="text-[1.35rem] font-bold text-white">50+</p><p class="mt-1 text-[9px] uppercase tracking-[0.1em] text-white/40">Programmes delivered</p></div>
            <div class="rounded-xl border border-white/10 bg-white/5 p-4"><p class="text-[1.35rem] font-bold text-white">30+</p><p class="mt-1 text-[9px] uppercase tracking-[0.1em] text-white/40">Countries represented</p></div>
            <div class="rounded-xl border border-[#DE6129]/30 bg-[#DE6129]/15 p-4"><p class="text-[1.35rem] font-bold text-white">100%</p><p class="mt-1 text-[9px] uppercase tracking-[0.1em] text-white/50">Community-led</p></div>
          </div>
          <div class="mt-5 flex items-center gap-2 border-t border-white/10 pt-4">
            <Icon name="lucide:shield-check" class="h-4 w-4 text-[#f1a37f]" />
            <p class="text-[10px] leading-5 text-white/50">MedLabConvo is a trademark of LabiHealth Ambassadors Initiative, a registered non-profit organisation.</p>
          </div>
        </div>
      </template>
    </SiteHero>

    <section class="site-section">
      <div class="site-container">
        <SiteSectionHeader eyebrow="Where it goes" title="Your donation becomes capability." description="Every contribution is directed into the work of building people, knowledge and systems — not simply keeping a platform online." />
        <div class="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <article v-for="item in impacts" :key="item.title" class="rounded-2xl border border-[#e4ebf0] bg-white p-5">
            <span class="flex h-10 w-10 items-center justify-center rounded-xl bg-[#eef5f9] text-[#27628C]"><Icon :name="item.icon" class="h-5 w-5" /></span>
            <h3 class="mt-6 text-[1rem] font-bold leading-snug tracking-[-0.02em] text-[#0a202b]">{{ item.title }}</h3>
            <p class="mt-2 text-[11px] leading-6 text-[#5f7482]">{{ item.text }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="bg-[#f7f9f8] py-14 sm:py-20">
      <div class="site-container">
        <div class="max-w-3xl">
          <p class="site-eyebrow">Give what you can</p>
          <h2 class="site-h2 mt-3">Every amount is meaningful.</h2>
          <p class="site-lead mt-3">Keep the giving experience simple. Any amount supports the work; higher tiers receive a small token of our gratitude.</p>
        </div>

        <div class="mt-8 grid gap-4 md:grid-cols-3">
          <article class="relative overflow-hidden rounded-[1.5rem] border border-[#27628C]/15 bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg">
            <div class="absolute right-0 top-0 h-24 w-24 rounded-bl-full bg-[#eef5f9]" />
            <p class="relative text-[10px] font-bold uppercase tracking-[0.16em] text-[#27628C]">Any amount</p>
            <p class="relative mt-4 text-[2rem] font-bold tracking-[-0.045em] text-[#0a202b]">Thank you.</p>
            <div class="relative mt-5 border-t border-[#eef2f5] pt-4">
              <p class="text-[13px] font-bold text-[#0a202b]">A personal thank-you</p>
              <p class="mt-1.5 text-[11.5px] leading-6 text-[#5f7482]">Every donor receives a heartfelt personalised email from the team.</p>
            </div>
          </article>

          <article class="relative overflow-hidden rounded-[1.5rem] border border-[#27628C]/25 bg-[#033958] p-6 text-white transition hover:-translate-y-1 hover:shadow-xl">
            <div class="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#27628C]/50 blur-2xl" />
            <p class="relative text-[10px] font-bold uppercase tracking-[0.16em] text-[#f1a37f]">₦5,000+</p>
            <p class="relative mt-4 text-[2rem] font-bold tracking-[-0.045em]">A card to keep.</p>
            <div class="relative mt-5 border-t border-white/15 pt-4">
              <p class="text-[13px] font-bold">A personalised thank-you card</p>
              <p class="mt-1.5 text-[11.5px] leading-6 text-white/60">A physical card from the team, alongside your thank-you email.</p>
            </div>
          </article>

          <article class="relative overflow-hidden rounded-[1.5rem] border-2 border-[#DE6129] bg-[#fff8f4] p-6 transition hover:-translate-y-1 hover:shadow-xl">
            <div class="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-[#DE6129]/10" />
            <p class="relative text-[10px] font-bold uppercase tracking-[0.16em] text-[#b24a1e]">₦50,000+</p>
            <p class="relative mt-4 text-[2rem] font-bold tracking-[-0.045em] text-[#0a202b]">A piece of the work.</p>
            <div class="relative mt-5 border-t border-[#DE6129]/15 pt-4">
              <p class="text-[13px] font-bold text-[#0a202b]">An exclusive souvenir</p>
              <p class="mt-1.5 text-[11.5px] leading-6 text-[#5f7482]">A MedLabConvo keepsake alongside your card and personalised email.</p>
            </div>
          </article>
        </div>

        <div class="mt-7 flex flex-col gap-3 rounded-2xl border border-[#e4ebf0] bg-white p-5 sm:flex-row sm:items-center sm:justify-between">
          <p class="text-[11.5px] leading-6 text-[#5f7482]"><span class="font-bold text-[#0a202b]">Every tier starts with the same thing:</span> a direct contribution to the work.</p>
          <a href="https://paystack.com/pay/medlabconvodonation" target="_blank" rel="noopener noreferrer" class="site-btn site-btn-primary shrink-0">Donate securely <Icon name="lucide:arrow-up-right" class="h-4 w-4" /></a>
        </div>
      </div>
    </section>

    <section class="site-section">
      <div class="site-container grid gap-8 lg:grid-cols-[1.1fr_.9fr] lg:items-center">
        <div class="rounded-[1.5rem] border border-[#e4ebf0] bg-[#fbfcfc] p-6 sm:p-8">
          <div class="flex items-start justify-between gap-4">
            <div>
              <p class="site-eyebrow">Direct transfer</p>
              <h2 class="mt-2 text-[1.5rem] font-bold tracking-[-0.03em] text-[#0a202b]">Prefer a bank transfer?</h2>
              <p class="mt-2 text-[12px] leading-6 text-[#5f7482]">You can send a direct donation to the account below. Please use “Donation” as the narration.</p>
            </div>
            <span class="flex h-10 w-10 items-center justify-center rounded-xl bg-[#eef5f9] text-[#27628C]"><Icon name="lucide:landmark" class="h-5 w-5" /></span>
          </div>
          <div class="mt-6 rounded-xl border border-[#e4ebf0] bg-white p-5">
            <div class="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p class="text-[9px] font-bold uppercase tracking-[0.14em] text-[#8a9ba5]">Account name</p>
                <p class="mt-1 text-[13px] font-bold text-[#0a202b]">MedLabConvo</p>
              </div>
              <div>
                <p class="text-[9px] font-bold uppercase tracking-[0.14em] text-[#8a9ba5]">Bank</p>
                <p class="mt-1 text-[13px] font-bold text-[#0a202b]">UBA</p>
              </div>
              <div>
                <p class="text-[9px] font-bold uppercase tracking-[0.14em] text-[#8a9ba5]">Account number</p>
                <div class="mt-1 flex items-center gap-2">
                  <p class="text-[16px] font-bold tracking-[0.05em] text-[#0a202b]">{{ textToCopy }}</p>
                  <button type="button" class="text-[#27628C] transition hover:text-[#DE6129]" aria-label="Copy account number" @click="copyText">
                    <Icon :name="copied ? 'lucide:check' : 'lucide:copy'" class="h-4 w-4" />
                  </button>
                </div>
                <p v-if="copied" class="mt-1 text-[9px] font-semibold text-emerald-600">Copied</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <p class="site-eyebrow">From the community</p>
          <div class="mt-4 space-y-3">
            <blockquote v-for="testimonial in testimonials" :key="testimonial.name" class="rounded-2xl border border-[#e4ebf0] bg-white p-5">
              <p class="text-[11.5px] leading-6 text-[#3b5361]">“{{ testimonial.quote }}”</p>
              <footer class="mt-3 text-[10px]"><span class="font-bold text-[#0a202b]">{{ testimonial.name }}</span> <span class="text-[#8a9ba5]">· {{ testimonial.role }}</span></footer>
            </blockquote>
          </div>
        </div>
      </div>
    </section>

    <SiteCta eyebrow="Be part of the change" title="The work is possible because people choose to support it." description="If MedLabConvo has been useful to you or someone you know, help us keep building for the next person." primary-label="Donate now" primary-to="https://paystack.com/pay/medlabconvodonation" secondary-label="Explore programmes" secondary-to="/programs" />
  </main>
</template>
