<script setup lang="ts">
import SiteSectionHeader from '@/components/site/SiteSectionHeader.vue'
import SiteMedia from '@/components/site/SiteMedia.vue'
import SiteCta from '@/components/site/SiteCta.vue'
import { useGetPrograms } from '@/composables/modules/programs/useGetPrograms'
import { convostack_api } from '@/api_factory/modules/convostack'
import { useGetLabCasts } from '@/composables/modules/labcast/useGetLabCasts'
import heroImage from '@/assets/img/community1.png'
import ProgramCard from '@/components/site/ProgramCard.vue'
import ArticleCard from '@/components/site/ArticleCard.vue'
import SiteCarousel from '@/components/site/SiteCarousel.vue'

const { programs, loading: programsLoading } = useGetPrograms()
const publications = ref<any[]>([])
const publicationsLoading = ref(true)

onMounted(async () => {
  try {
    const response = await convostack_api.$_get_publications()
    publications.value = response.data || []
  } catch (error) {
    console.error('Failed to load Convo Stack posts', error)
  } finally {
    publicationsLoading.value = false
  }
})
const { labcasts, loading: labcastsLoading } = useGetLabCasts()

const activePrograms = computed(() => (programs.value || []).filter((p: any) => p.status === 'active').slice(0, 6))
const publishedArticles = computed(() => (publications.value || [])
  .sort((a: any, b: any) => new Date(b.publishedAt || b.createdAt || 0).getTime() - new Date(a.publishedAt || a.createdAt || 0).getTime()))
const featuredArticle = computed(() => publishedArticles.value[0])
const latestEpisodes = computed(() => (labcasts.value || [])
  .filter((episode: any) => episode.isActive)
  .sort((a: any, b: any) => (a.position || 0) - (b.position || 0))
  .slice(0, 5))
const spotlightEpisode = computed(() => latestEpisodes.value[0])

const ecosystem = [
  {
    title: 'Journo',
    description: 'Research, essays and sharp perspectives on the forces shaping laboratory medicine.',
    href: '/journo',
    icon: 'lucide:newspaper',
    number: '01',
    accent: false,
  },
  {
    title: 'Convo Stack',
    description: 'A living editorial feed on careers, diagnostics, research and the wider health ecosystem.',
    href: '/convostack',
    icon: 'lucide:messages-square',
    number: '02',
    accent: true,
  },
  {
    title: 'LabCast',
    description: 'Unfiltered conversations with the scientists, founders and policy leaders moving the field.',
    href: '/lab-cast',
    icon: 'lucide:mic',
    number: '03',
  },
  {
    title: 'Programs',
    description: 'Cohort-based programmes that turn ambition into capability and career momentum.',
    href: '/programs',
    icon: 'lucide:graduation-cap',
    number: '04',
  },
  {
    title: 'Community',
    description: 'Interntional and UniVerse — peer networks for interns, students and early-career professionals.',
    href: '/community',
    icon: 'lucide:users',
    number: '05',
  },
  {
    title: 'Shop',
    description: 'Books, courses and field-tested digital tools built for the realities of the laboratory.',
    href: '/products',
    icon: 'lucide:shopping-bag',
    number: '06',
  },
]

const stats = [
  { value: '5,000+', label: 'Professionals reached' },
  { value: '50+', label: 'Programmes delivered' },
  { value: '100+', label: 'Episodes & essays' },
  { value: '30+', label: 'Countries represented' },
]

const testimonials = [
  { name: 'Daniel Adekunle', role: 'Medical Laboratory Scientist', quote: 'MedLabConvo has been a game-changer for me. From knowledge gained through webinars to career mentorship, I now feel more confident about my future in medical laboratory science.' },
  { name: 'Mabel Omoniwa', role: 'Early-career professional', quote: 'MedLabConvo gave me clarity about my career path. The mentorship and resources have transformed the way I approach learning and professional growth.' },
  { name: 'Shedrack Etuk', role: 'Laboratory professional', quote: 'MedLabConvo has redefined professional development in medical laboratory science. The discussions, networking and mentorship have enriched my career.' },
  { name: 'Paul Odeh', role: 'Medical Laboratory Scientist', quote: 'MedLabConvo fosters collaboration among medical lab scientists worldwide. It is a great place to connect, learn and contribute to the advancement of our profession.' },
]

const activeTestimonial = ref(0)
let testimonialTimer: ReturnType<typeof setInterval> | undefined

onMounted(() => {
  testimonialTimer = setInterval(() => {
    activeTestimonial.value = (activeTestimonial.value + 1) % testimonials.length
  }, 6000)
})

onUnmounted(() => {
  if (testimonialTimer) clearInterval(testimonialTimer)
})

const formatDate = (value?: string) => {
  if (!value) return 'Recently'
  return new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

useHead({
  title: 'MedLabConvo | The home of laboratory science, insight and opportunity',
  meta: [
    { name: 'description', content: 'MedLabConvo advances medical laboratory science through editorial insight, podcasts, programmes, community and professional tools.' },
    { property: 'og:title', content: 'MedLabConvo | Laboratory science, reimagined' },
    { property: 'og:description', content: 'A global platform for the people, ideas and opportunities shaping laboratory medicine.' },
    { property: 'og:image', content: '/images/medlabconvo-og-image.jpg' },
    { property: 'og:url', content: 'https://www.medlabconvo.com' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ],
})
</script>

<template>
  <main class="bg-white">
    <!-- Hero -->
    <section class="relative overflow-hidden bg-[#033958] text-white">
      <div class="absolute inset-0 site-hero-grid opacity-60" />
      <div class="absolute inset-0 site-hero-glow" />
      <div class="site-container relative grid items-center gap-12 py-14 sm:py-20 lg:grid-cols-[1.06fr_.94fr] lg:py-24">
        <div class="max-w-2xl">
          <p class="site-eyebrow !text-white/70">Medical laboratory science, reimagined</p>
          <h1 class="site-display mt-4 text-[clamp(2.8rem,6vw,5.6rem)] !text-white site-text-balance">
            The people, ideas and opportunities moving the lab forward.
          </h1>
          <p class="mt-5 max-w-xl text-[0.98rem] leading-7 text-white/65">
            MedLabConvo is a global platform connecting laboratory professionals, students and health innovators through intelligent journalism, honest conversation and career-defining programmes.
          </p>
          <div class="mt-7 flex flex-col gap-2.5 sm:flex-row">
            <NuxtLink to="/programs" class="site-btn site-btn-light">
              Explore programmes
              <Icon name="lucide:arrow-up-right" class="h-4 w-4" />
            </NuxtLink>
            <NuxtLink to="/journo" class="site-btn site-btn-outline-light">
              Read Journo
            </NuxtLink>
          </div>

          <div class="mt-8 grid max-w-xl grid-cols-2 gap-x-6 gap-y-4 border-t border-white/15 pt-6 sm:grid-cols-4">
            <div v-for="stat in stats" :key="stat.label">
              <p class="text-lg font-bold tracking-[-0.03em] text-white">{{ stat.value }}</p>
              <p class="mt-1 text-[9px] font-semibold uppercase tracking-[0.1em] text-white/40">{{ stat.label }}</p>
            </div>
          </div>
        </div>

        <div class="relative mx-auto w-full max-w-xl lg:mx-0 lg:max-w-none">
          <div class="relative overflow-hidden rounded-[1.65rem] border border-white/15 bg-white/5 p-2 shadow-2xl shadow-black/20">
            <div class="relative aspect-[4/4.35] overflow-hidden rounded-[1.25rem]">
              <SiteMedia :src="heroImage" alt="MedLabConvo community" label="The MedLabConvo community" icon="lucide:users" eager />
              <div class="absolute inset-0 bg-gradient-to-t from-[#031d29]/80 via-transparent to-transparent" />
              <div class="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                <span class="site-chip !border-white/15 !bg-white/10 !text-white/70">The network</span>
                <p class="mt-3 max-w-xs text-[1.1rem] font-bold leading-tight tracking-[-0.02em] text-white">
                  A global community built for the realities of the laboratory.
                </p>
              </div>
            </div>
          </div>

          <div class="absolute -bottom-6 -left-2 w-[13.5rem] rounded-2xl border border-white/15 bg-[#0a2f42]/95 p-4 shadow-xl backdrop-blur sm:-left-5">
            <div class="flex items-center gap-2">
              <span class="flex h-7 w-7 items-center justify-center rounded-lg bg-[#DE6129] text-white"><Icon name="lucide:sparkles" class="h-3.5 w-3.5" /></span>
              <p class="text-[9px] font-bold uppercase tracking-[0.14em] text-white/55">Built for the next decade</p>
            </div>
            <p class="mt-2 text-[11px] leading-5 text-white/65">Editorial depth. Career momentum. A network that stays with you.</p>
          </div>

          <div class="absolute -right-3 -top-5 hidden rounded-2xl border border-[#DE6129]/30 bg-[#DE6129] px-4 py-3 shadow-xl sm:block">
            <p class="text-[9px] font-bold uppercase tracking-[0.12em] text-white/70">Since 2019</p>
            <p class="mt-1 text-[13px] font-bold text-white">Lead. Build. Inspire.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Ecosystem -->
    <section class="site-section">
      <div class="site-container">
        <SiteSectionHeader
          eyebrow="The ecosystem"
          title="One home. Six ways to grow."
          description="Whether you are looking for a sharper perspective, a career move, a peer network or your next collaborator, there is a place for you here."
        >
          <template #actions>
            <NuxtLink to="/community" class="site-btn site-btn-ghost hidden sm:inline-flex">Meet the community</NuxtLink>
          </template>
        </SiteSectionHeader>

        <div class="mt-9 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <NuxtLink
            v-for="item in ecosystem"
            :key="item.title"
            :to="item.href"
            class="site-card site-card-hover group relative overflow-hidden p-5 sm:p-6"
            :class="item.accent ? '!border-[#27628C] !bg-[#27628C] text-white' : ''"
          >
            <div class="flex items-start justify-between gap-4">
              <span class="flex h-10 w-10 items-center justify-center rounded-xl" :class="item.accent ? 'bg-white/10 text-white' : 'bg-[#eef5f9] text-[#27628C]'">
                <Icon :name="item.icon" class="h-5 w-5" />
              </span>
              <span class="text-[10px] font-bold tracking-[0.14em]" :class="item.accent ? 'text-white/35' : 'text-[#c0ced7]'">{{ item.number }}</span>
            </div>
            <h3 class="mt-7 text-[1.1rem] font-bold tracking-[-0.02em]" :class="item.accent ? 'text-white' : 'text-[#0a202b]'">{{ item.title }}</h3>
            <p class="mt-2 max-w-sm text-[0.8rem] leading-6" :class="item.accent ? 'text-white/65' : 'text-[#5f7482]'">{{ item.description }}</p>
            <span class="mt-5 inline-flex items-center gap-1.5 text-[11px] font-bold" :class="item.accent ? 'text-white' : 'text-[#27628C]'">
              Explore
              <Icon name="lucide:arrow-up-right" class="h-3.5 w-3.5 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Programmes carousel -->
    <section class="bg-[#f7f9f8] py-14 sm:py-20">
      <div class="site-container">
        <template v-if="!programsLoading && activePrograms.length">
          <SiteCarousel
            eyebrow="Programmes"
            title="Build the career your curiosity deserves."
            description="Cohort-based learning, mentorship and practical exposure designed around the future of laboratory science."
            link="/programs"
            link-label="All programmes"
          >
            <ProgramCard v-for="program in activePrograms" :key="program.slug || program._id" :program="program" />
          </SiteCarousel>
        </template>
        <div v-else class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div v-for="i in 3" :key="i" class="site-skeleton h-[26rem]" />
        </div>
      </div>
    </section>

    <!-- Editorial -->
    <section class="site-section">
      <div class="site-container">
        <SiteSectionHeader
          eyebrow="Journo & Convo Stack"
          title="Ideas that make the lab legible."
          description="Reported pieces, essays and conversations that connect laboratory science to the forces shaping healthcare, careers and policy."
          link="/journo"
          link-label="Enter Journo"
        />

        <div v-if="!publicationsLoading" class="mt-9 grid gap-4 lg:grid-cols-[1.18fr_.82fr]">
          <ArticleCard
            v-if="featuredArticle"
            :title="featuredArticle.title"
            :excerpt="featuredArticle.excerpt"
            :image="featuredArticle.coverImage"
            :category="featuredArticle.category || 'Featured'"
            :meta="`${formatDate(featuredArticle.publishedAt || featuredArticle.createdAt)} · ${featuredArticle.authors?.join(', ') || 'MedLabConvo'}`"
            :to="`/convostack/${featuredArticle.slug}`"
            label="Read the feature"
            featured
          />
          <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            <ArticleCard
              v-for="article in publishedArticles.slice(1, 3)"
              :key="article._id || article.id"
              :title="article.title"
              :excerpt="article.excerpt"
              :image="article.coverImage"
              :category="article.category || 'Insight'"
              :meta="formatDate(article.publishedAt || article.createdAt)"
              :to="`/convostack/${article.slug}`"
              label="Read story"
            />
          </div>
        </div>
        <div v-else class="mt-9 grid gap-4 lg:grid-cols-3">
          <div v-for="i in 3" :key="i" class="site-skeleton h-80" />
        </div>

        <div class="mt-4 flex flex-col gap-3 rounded-2xl border border-[#e4ebf0] bg-[#fbfcfc] p-5 sm:flex-row sm:items-center sm:justify-between">
          <p class="text-[12px] leading-6 text-[#5f7482]">
            <span class="font-bold text-[#0a202b]">The Convo Stack</span> — a living feed of careers, diagnostics and ecosystem pulses, updated regularly.
          </p>
          <NuxtLink to="/convostack" class="site-link-arrow shrink-0">Explore the stack <Icon name="lucide:arrow-up-right" class="h-4 w-4" /></NuxtLink>
        </div>
      </div>
    </section>

    <!-- LabCast spotlight -->
    <section class="site-container pb-14 sm:pb-20">
      <div class="relative overflow-hidden rounded-[1.75rem] bg-[#0a2f42] text-white">
        <div class="absolute inset-0 site-hero-grid opacity-50" />
        <div class="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#DE6129]/15 blur-3xl" />
        <div class="relative grid gap-8 p-6 sm:p-9 lg:grid-cols-[.92fr_1.08fr] lg:items-center lg:p-12">
          <div>
            <p class="site-eyebrow !text-white/65">LabCast · Audio & video</p>
            <h2 class="site-display mt-3 text-[clamp(1.9rem,4vw,3.4rem)] !text-white">The conversations the lab deserves.</h2>
            <p class="mt-3 max-w-lg text-[0.9rem] leading-7 text-white/60">
              Hear from the scientists, builders and policy leaders shaping diagnostics, research and the future of healthcare work.
            </p>
            <div class="mt-6 flex flex-col gap-2.5 sm:flex-row">
              <NuxtLink to="/lab-cast" class="site-btn site-btn-light">Browse all episodes <Icon name="lucide:arrow-up-right" class="h-4 w-4" /></NuxtLink>
              <a v-if="spotlightEpisode?.spotifyUrl" :href="spotlightEpisode.spotifyUrl" target="_blank" rel="noopener noreferrer" class="site-btn site-btn-outline-light">Listen on Spotify</a>
            </div>
            <div v-if="spotlightEpisode" class="mt-7 flex items-center gap-3 border-t border-white/10 pt-5">
              <span class="flex h-9 w-9 items-center justify-center rounded-full bg-[#DE6129] text-white"><Icon name="lucide:play" class="h-4 w-4" /></span>
              <div class="min-w-0">
                <p class="truncate text-[11px] font-semibold text-white">{{ spotlightEpisode.title }}</p>
                <p class="mt-0.5 text-[10px] text-white/45">Season {{ spotlightEpisode.season }} · Episode {{ spotlightEpisode.episode }} · {{ spotlightEpisode.duration }} min</p>
              </div>
            </div>
          </div>

          <div v-if="spotlightEpisode" class="relative">
            <div class="overflow-hidden rounded-[1.25rem] border border-white/15 bg-white/5 p-2">
              <div class="aspect-[16/10] overflow-hidden rounded-xl">
                <SiteMedia :src="spotlightEpisode.thumbnailUrl || spotlightEpisode.image" :alt="spotlightEpisode.title" label="LabCast episode" icon="lucide:mic" />
              </div>
            </div>
            <div v-if="latestEpisodes.length > 1" class="mt-3 grid grid-cols-4 gap-2">
              <NuxtLink v-for="episode in latestEpisodes.slice(1, 5)" :key="episode._id" to="/lab-cast" class="group overflow-hidden rounded-lg border border-white/10">
                <div class="aspect-square">
                  <SiteMedia :src="episode.thumbnailUrl || episode.image" :alt="episode.title" label="LabCast" icon="lucide:mic" />
                </div>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Impact -->
    <section class="bg-[#f7f9f8] py-14 sm:py-20">
      <div class="site-container grid gap-8 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
        <div>
          <p class="site-eyebrow">The bigger picture</p>
          <h2 class="site-h2 mt-3 max-w-md">A stronger lab workforce is a stronger health system.</h2>
          <p class="site-lead mt-3 max-w-lg">Our work sits at the intersection of professional development, public understanding and systems change.</p>
          <NuxtLink to="/about-us" class="site-link-arrow mt-5">How we work <Icon name="lucide:arrow-up-right" class="h-4 w-4" /></NuxtLink>
        </div>
        <div class="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div v-for="stat in stats" :key="stat.label" class="rounded-2xl border border-[#e4ebf0] bg-white p-5">
            <p class="text-[1.45rem] font-bold tracking-[-0.04em] text-[#27628C]">{{ stat.value }}</p>
            <p class="mt-1 text-[9px] font-semibold uppercase leading-4 tracking-[0.1em] text-[#8a9ba5]">{{ stat.label }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials -->
    <section class="site-section">
      <div class="site-container">
        <div class="grid gap-8 lg:grid-cols-[.72fr_1.28fr] lg:items-center">
          <div>
            <p class="site-eyebrow">From the community</p>
            <h2 class="site-h2 mt-3">Built with people, not just for them.</h2>
            <p class="site-lead mt-3">The best measure of our work is what it makes possible for the people who trust us with their next step.</p>
          </div>
          <div class="relative rounded-[1.5rem] border border-[#e4ebf0] bg-[#fbfcfc] p-6 sm:p-8">
            <Icon name="lucide:quote" class="h-7 w-7 text-[#DE6129]" />
            <Transition name="fade" mode="out-in">
              <div :key="activeTestimonial">
                <p class="mt-4 min-h-[7.5rem] text-[1rem] leading-8 text-[#243d4b]">“{{ testimonials[activeTestimonial].quote }}”</p>
                <div class="mt-5 flex items-center justify-between gap-4 border-t border-[#e4ebf0] pt-4">
                  <div>
                    <p class="text-[12px] font-bold text-[#0a202b]">{{ testimonials[activeTestimonial].name }}</p>
                    <p class="mt-0.5 text-[10px] font-medium text-[#8a9ba5]">{{ testimonials[activeTestimonial].role }}</p>
                  </div>
                  <div class="flex gap-1.5">
                    <button
                      v-for="(_, i) in testimonials"
                      :key="i"
                      type="button"
                      class="h-1.5 rounded-full transition-all"
                      :class="i === activeTestimonial ? 'w-5 bg-[#27628C]' : 'w-1.5 bg-[#d5e0e6]'"
                      :aria-label="`Testimonial ${i + 1}`"
                      @click="activeTestimonial = i"
                    />
                  </div>
                </div>
              </div>
            </Transition>
          </div>
        </div>
      </div>
    </section>

    <SiteCta
      eyebrow="Take the next step"
      title="Your next chapter in laboratory science starts here."
      description="Join the community, sharpen your perspective and move with the people building what comes next."
      primary-label="Join the community"
      primary-to="/community"
      secondary-label="Explore programmes"
      secondary-to="/programs"
    />
  </main>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active { transition: opacity 180ms ease, transform 180ms ease; }
.fade-enter-from { opacity: 0; transform: translateY(4px); }
.fade-leave-to { opacity: 0; transform: translateY(-4px); }
</style>
