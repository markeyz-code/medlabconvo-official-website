<script setup lang="ts">
import EnquirySection from '@/components/EnquirySection.vue'
import SiteHero from '@/components/site/SiteHero.vue'
import SiteCta from '@/components/site/SiteCta.vue'

const route = useRoute()
const productName = computed(() => route.query.product as string || '')

useHead({
  title: 'Contact & enquiries | MedLabConvo',
  meta: [{ name: 'description', content: 'Contact the MedLabConvo team for programme, product, partnership or media enquiries.' }],
})
</script>

<template>
  <main class="bg-white">
    <SiteHero
      eyebrow="Contact & enquiries"
      title="Let’s build something useful."
      description="Questions, proposals, product support, partnership ideas or a story worth telling — this is the fastest way to reach the MedLabConvo team."
      primary-label="Send a message"
      primary-to="#contact"
      secondary-label="Browse programmes"
      secondary-to="/programs"
      theme="light"
      compact
    >
      <template #visual>
        <div class="site-card overflow-hidden p-6 sm:p-8">
          <p class="site-eyebrow">How we can help</p>
          <div class="mt-4 space-y-3">
            <div v-for="item in [
              { title: 'Programmes & cohorts', text: 'Admissions, eligibility and cohort logistics.', icon: 'lucide:graduation-cap' },
              { title: 'Products & access', text: 'Purchases, downloads and digital access.', icon: 'lucide:shopping-bag' },
              { title: 'Partnerships & media', text: 'Collaborations, press and speaking requests.', icon: 'lucide:handshake' },
            ]" :key="item.title" class="flex items-start gap-3 rounded-xl border border-[#eef2f5] bg-[#fbfcfc] p-3.5">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#eef5f9] text-[#27628C]"><Icon :name="item.icon" class="h-4 w-4" /></span>
              <div>
                <p class="text-[11px] font-bold text-[#0a202b]">{{ item.title }}</p>
                <p class="mt-0.5 text-[10px] leading-5 text-[#5f7482]">{{ item.text }}</p>
              </div>
            </div>
          </div>
        </div>
      </template>
    </SiteHero>

    <div id="contact">
      <EnquirySection :prefill="productName" />
    </div>

    <SiteCta eyebrow="Prefer email?" title="You can always write to us directly." description="For formal correspondence, proposals or documentation, email is the right channel." primary-label="Email the team" primary-to="mailto:info@medlabconvo.com" secondary-label="About MedLabConvo" secondary-to="/about-us" />
  </main>
</template>
