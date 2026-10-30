<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useGetCms } from '@/composables/modules/cms/useGetCms'
import LeadershipSection from '@/components/LeadershipSection.vue'
import SiteHero from '@/components/site/SiteHero.vue'
import SiteMedia from '@/components/site/SiteMedia.vue'
import SiteSectionHeader from '@/components/site/SiteSectionHeader.vue'
import SiteCta from '@/components/site/SiteCta.vue'
import communityImage from '@/assets/img/community1.png'

const { singleCms, getCmsByKey } = useGetCms()

onMounted(() => getCmsByKey('about_page'))

const getSectionContent = (id: string, fallback: string) => {
  if (singleCms.value?.data?.sections) {
    const section = singleCms.value.data.sections.find((s: any) => s.id === id && s.isVisible)
    if (section?.content) return section.content
  }
  return fallback
}

const dimensions = [
  { title: 'Knowledge', description: 'We close gaps in laboratory science education with rigorous, accessible resources and training.', icon: 'lucide:book-open' },
  { title: 'Mindset', description: 'We build the resilience, adaptability and professional confidence that complex careers demand.', icon: 'lucide:brain' },
  { title: 'Skill', description: 'We connect emerging professionals to practitioners, mentors and the tools that sharpen practice.', icon: 'lucide:wrench' },
  { title: 'Network', description: 'We create the rooms, relationships and cross-border collaborations that open doors.', icon: 'lucide:network' },
  { title: 'Identity', description: 'We help laboratory professionals articulate their value and lead with a clear professional identity.', icon: 'lucide:fingerprint' },
]

const coreValues = [
  { title: 'Empowerment & capacity', description: 'Investing in students and early-career professionals through education, mentorship and access.' },
  { title: 'Advocacy & awareness', description: 'Championing the laboratory profession and the public health contribution it makes.' },
  { title: 'Collaboration', description: 'Building partnerships across countries, institutions and disciplines.' },
  { title: 'Excellence & quality', description: 'Holding a world-class standard in our programming, content and community experience.' },
  { title: 'Innovation & technology', description: 'Using digital platforms to make knowledge more useful, more reachable and more human.' },
  { title: 'Community & mentorship', description: 'Creating supportive networks that connect early-career and experienced professionals.' },
]

useHead({
  title: 'About | MedLabConvo',
  meta: [{ name: 'description', content: 'MedLabConvo is a movement shaping the future of medical laboratory science across Africa and beyond.' }],
})
</script>

<template>
  <main class="bg-white">
    <SiteHero
      eyebrow="About MedLabConvo"
      title="A movement for the people behind the science."
      :description="getSectionContent('hero_description', 'MedLabConvo is more than a platform. It is a movement dedicated to shaping the future of medical laboratory science, the professionals who carry it and the healthcare systems it serves.')"
      primary-label="Meet the team"
      primary-to="#leadership"
      secondary-label="Our programmes"
      secondary-to="/programs"
    >
      <template #visual>
        <div class="relative mx-auto max-w-lg">
          <div class="site-card overflow-hidden !border-white/10 !bg-white/[0.06] p-2">
            <div class="aspect-[4/4.5] overflow-hidden rounded-[1.15rem]"><SiteMedia :src="communityImage" alt="The MedLabConvo community" label="MedLabConvo" icon="lucide:users" eager /></div>
          </div>
          <div class="absolute -bottom-5 -left-4 rounded-2xl border border-white/15 bg-[#0a2f42] p-4 shadow-xl sm:-left-8">
            <p class="text-[9px] font-bold uppercase tracking-[0.14em] text-white/45">Our ambition</p>
            <p class="mt-1 text-[13px] font-bold text-white">The household name for laboratory science.</p>
            <p class="mt-1 text-[9px] text-white/45">Africa and beyond</p>
          </div>
          <div class="absolute -right-3 top-8 rounded-xl bg-[#DE6129] px-3.5 py-2.5 shadow-lg">
            <p class="text-[8px] font-bold uppercase tracking-[0.12em] text-white/70">The work</p>
            <p class="text-[11px] font-bold text-white">Knowledge · network · identity</p>
          </div>
        </div>
      </template>
    </SiteHero>

    <!-- Mission & vision -->
    <section class="site-section">
      <div class="site-container grid gap-4 lg:grid-cols-2">
        <article class="rounded-[1.5rem] bg-[#033958] p-7 text-white sm:p-9">
          <div class="flex items-center justify-between">
            <p class="site-eyebrow !text-white/50">01 · Mission</p>
            <span class="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-white"><Icon name="lucide:compass" class="h-4 w-4" /></span>
          </div>
          <h2 class="mt-5 text-[1.55rem] font-bold leading-tight tracking-[-0.03em]">Lead positive change in the mindset, identity and capacity of laboratory professionals.</h2>
          <p class="mt-4 text-[12.5px] leading-7 text-white/60">We contribute to transformation across the broader healthcare system by building future generations of world-class professionals and inspiring action through purposeful engagement, education and advocacy.</p>
        </article>
        <article class="rounded-[1.5rem] border border-[#e4ebf0] bg-[#faf8f3] p-7 sm:p-9">
          <div class="flex items-center justify-between">
            <p class="site-eyebrow">02 · Vision</p>
            <span class="flex h-9 w-9 items-center justify-center rounded-xl bg-[#27628C]/10 text-[#27628C]"><Icon name="lucide:eye" class="h-4 w-4" /></span>
          </div>
          <h2 class="mt-5 text-[1.55rem] font-bold leading-tight tracking-[-0.03em] text-[#0a202b]">To become the household name of medical laboratory science in Africa and beyond.</h2>
          <p class="mt-4 text-[12.5px] leading-7 text-[#5f7482]">Known, followed and trusted by professionals and the public through the quality and reach of our impact.</p>
          <div class="mt-6 flex flex-wrap gap-2">
            <span class="site-chip">Known</span><span class="site-chip">Followed</span><span class="site-chip">Trusted</span>
          </div>
        </article>
      </div>
    </section>

    <!-- Five dimensions -->
    <section class="bg-[#f7f9f8] py-14 sm:py-20">
      <div class="site-container">
        <SiteSectionHeader eyebrow="The five dimensions" title="What we actually build." description="Our work is not one thing. It moves across knowledge, mindset, skill, network and identity — because careers are not built in a single dimension." />
        <div class="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          <article v-for="(item, index) in dimensions" :key="item.title" class="rounded-2xl border border-[#e4ebf0] bg-white p-5">
            <div class="flex items-center justify-between">
              <span class="flex h-9 w-9 items-center justify-center rounded-xl bg-[#eef5f9] text-[#27628C]"><Icon :name="item.icon" class="h-4 w-4" /></span>
              <span class="text-[9px] font-bold tracking-[0.14em] text-[#c0ced7]">0{{ index + 1 }}</span>
            </div>
            <h3 class="mt-7 text-[1rem] font-bold tracking-[-0.02em] text-[#0a202b]">{{ item.title }}</h3>
            <p class="mt-2 text-[11px] leading-6 text-[#5f7482]">{{ item.description }}</p>
          </article>
        </div>
      </div>
    </section>

    <!-- Values -->
    <section class="site-section">
      <div class="site-container">
        <SiteSectionHeader eyebrow="What we stand for" title="Six values, held in practice." description="These are not wall posters. They shape how we choose partners, build programmes and show up for the community." />
        <div class="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <article v-for="(value, index) in coreValues" :key="value.title" class="group rounded-2xl border border-[#e4ebf0] bg-white p-5 transition hover:border-[#27628C]/25">
            <span class="flex h-9 w-9 items-center justify-center rounded-xl bg-[#faf8f3] text-[11px] font-bold text-[#DE6129]">{{ String(index + 1).padStart(2, '0') }}</span>
            <h3 class="mt-6 text-[1rem] font-bold tracking-[-0.02em] text-[#0a202b]">{{ value.title }}</h3>
            <p class="mt-2 text-[11px] leading-6 text-[#5f7482]">{{ value.description }}</p>
          </article>
        </div>
      </div>
    </section>

    <!-- Leadership -->
    <div id="leadership">
      <LeadershipSection />
    </div>

    <SiteCta eyebrow="Work with us" title="The future of the lab is a collaborative project." description="Partner with us, bring a programme to your institution, or join the community shaping what comes next." primary-label="Start a conversation" primary-to="/enquiries" secondary-label="Explore programmes" secondary-to="/programs" />
  </main>
</template>
