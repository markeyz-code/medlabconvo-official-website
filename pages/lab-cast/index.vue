<script setup lang="ts">
import { useGetLabCasts } from '@/composables/modules/labcast/useGetLabCasts'
import LabCastVideo from '@/components/LabCastVideo.vue'
import SiteHero from '@/components/site/SiteHero.vue'
import SiteMedia from '@/components/site/SiteMedia.vue'
import SiteSectionHeader from '@/components/site/SiteSectionHeader.vue'
import SiteCta from '@/components/site/SiteCta.vue'

const { labcasts, loading } = useGetLabCasts()
const activeSeason = ref('All')

const episodes = computed(() => {
  if (!Array.isArray(labcasts.value)) return []
  return [...labcasts.value].sort((a: any, b: any) => (a.position || 0) - (b.position || 0)).filter((episode: any) => episode.isActive)
})
const latestEpisode = computed(() => episodes.value[0] || null)
const seasons = computed(() => ['All', ...new Set(episodes.value.map((e: any) => String(e.season)).filter(Boolean))])
const filteredEpisodes = computed(() => activeSeason.value === 'All' ? episodes.value : episodes.value.filter((e: any) => String(e.season) === activeSeason.value))
const visibleCount = ref(9)
const paginatedEpisodes = computed(() => filteredEpisodes.value.slice(0, visibleCount.value))
watch(activeSeason, () => { visibleCount.value = 9 })

const formatDate = (value?: string) => {
  if (!value) return 'Recently'
  const date = new Date(value)
  return isNaN(date.getTime()) ? 'Recently' : date.toLocaleDateString('en-GB', { month: 'short', day: 'numeric', year: 'numeric' })
}

useHead({
  title: 'LabCast | Conversations from the laboratory | MedLabConvo',
  meta: [{ name: 'description', content: 'Conversations with laboratory scientists, public health experts and health innovators shaping the future of healthcare.' }],
})
</script>

<template>
  <main class="bg-white">
    <SiteHero
      eyebrow="LabCast · Audio & video"
      title="The conversations the lab deserves."
      description="Unfiltered, intelligent conversations with the scientists, clinicians, founders and policy leaders moving diagnostics and healthcare work forward."
      primary-label="Listen to the latest"
      primary-to="#latest"
      secondary-label="Browse all episodes"
      secondary-to="#episodes"
    >
      <template #visual>
        <div class="relative mx-auto max-w-lg">
          <div class="site-card overflow-hidden !border-white/10 !bg-white/[0.06] p-2">
            <div class="aspect-[4/4.2] overflow-hidden rounded-[1.15rem]"><SiteMedia :src="latestEpisode?.thumbnailUrl || latestEpisode?.image" :alt="latestEpisode?.title || 'LabCast'" label="LabCast" icon="lucide:mic" eager /></div>
          </div>
          <div class="absolute -bottom-5 -left-4 max-w-[15rem] rounded-2xl border border-white/15 bg-[#0a2f42] p-4 shadow-xl sm:-left-8">
            <p class="text-[9px] font-bold uppercase tracking-[0.14em] text-white/45">Now playing</p>
            <p class="mt-1 line-clamp-2 text-[11px] font-semibold leading-5 text-white">{{ latestEpisode?.title || 'A new conversation' }}</p>
            <p class="mt-1 text-[9px] text-white/40">Season {{ latestEpisode?.season || '—' }} · Episode {{ latestEpisode?.episode || '—' }}</p>
          </div>
          <div class="absolute -right-3 top-8 rounded-xl bg-[#DE6129] px-3.5 py-2.5 shadow-lg">
            <p class="text-[8px] font-bold uppercase tracking-[0.12em] text-white/70">Episodes</p>
            <p class="text-[11px] font-bold text-white">{{ episodes.length }}</p>
          </div>
        </div>
      </template>
      <template #meta>
        <div class="flex flex-wrap items-center gap-4">
          <a v-if="latestEpisode?.spotifyUrl" :href="latestEpisode.spotifyUrl" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1.5 rounded-full border border-white/20 px-3 py-1.5 text-[10px] font-semibold text-white/70 transition hover:border-white/50 hover:text-white"><Icon name="lucide:headphones" class="h-3.5 w-3.5" /> Spotify</a>
          <a v-if="latestEpisode?.youtubeUrl" :href="latestEpisode.youtubeUrl" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1.5 rounded-full border border-white/20 px-3 py-1.5 text-[10px] font-semibold text-white/70 transition hover:border-white/50 hover:text-white"><Icon name="lucide:youtube" class="h-3.5 w-3.5" /> YouTube</a>
          <span class="text-[10px] text-white/40">New episodes regularly</span>
        </div>
      </template>
    </SiteHero>

    <section id="latest" class="site-section">
      <div class="site-container">
        <div v-if="loading" class="site-skeleton h-[28rem]" />
        <article v-else-if="latestEpisode" class="site-card overflow-hidden">
          <div class="grid lg:grid-cols-[.9fr_1.1fr]">
            <div class="relative min-h-[18rem] overflow-hidden bg-[#eef5f9]">
              <SiteMedia :src="latestEpisode.thumbnailUrl || latestEpisode.image" :alt="latestEpisode.title" label="Latest LabCast episode" icon="lucide:mic" />
              <div class="absolute left-4 top-4 flex gap-2">
                <span class="rounded-full bg-white/95 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.12em] text-[#27628C]">Latest</span>
                <span class="rounded-full bg-[#0a202b]/85 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.12em] text-white">S{{ latestEpisode.season }} E{{ latestEpisode.episode }}</span>
              </div>
            </div>
            <div class="flex flex-col justify-between p-6 sm:p-8">
              <div>
                <div class="flex flex-wrap items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.1em] text-[#8a9ba5]">
                  <span>{{ formatDate(latestEpisode.publishedAt) }}</span>
                  <span class="h-1 w-1 rounded-full bg-[#d5e0e6]" />
                  <span>{{ latestEpisode.duration }} min</span>
                </div>
                <h2 class="mt-3 text-[1.8rem] font-bold leading-tight tracking-[-0.04em] text-[#0a202b]">{{ latestEpisode.title }}</h2>
                <p class="mt-3 line-clamp-4 text-[0.86rem] leading-7 text-[#5f7482]">{{ latestEpisode.description }}</p>
                <div v-if="latestEpisode.hosts?.length || latestEpisode.guest" class="mt-5 flex flex-wrap gap-5 border-t border-[#eef2f5] pt-4 text-[10px]">
                  <div v-if="latestEpisode.hosts?.length"><span class="font-bold text-[#0a202b]">Hosted by</span> <span class="text-[#5f7482]">{{ latestEpisode.hosts.join(', ') }}</span></div>
                  <div v-if="latestEpisode.guest"><span class="font-bold text-[#0a202b]">Guest</span> <span class="text-[#5f7482]">{{ latestEpisode.guest }}</span></div>
                </div>
              </div>
              <div class="mt-6 flex flex-wrap gap-2">
                <a v-if="latestEpisode.spotifyUrl" :href="latestEpisode.spotifyUrl" target="_blank" rel="noopener noreferrer" class="site-btn site-btn-primary">Listen on Spotify <Icon name="lucide:arrow-up-right" class="h-3.5 w-3.5" /></a>
                <a v-if="latestEpisode.appleUrl" :href="latestEpisode.appleUrl" target="_blank" rel="noopener noreferrer" class="site-btn site-btn-ghost">Apple Podcasts</a>
                <a v-if="latestEpisode.youtubeUrl" :href="latestEpisode.youtubeUrl" target="_blank" rel="noopener noreferrer" class="site-btn site-btn-ghost">Watch on YouTube</a>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>

    <section id="episodes" class="bg-[#f7f9f8] py-14 sm:py-20">
      <div class="site-container">
        <SiteSectionHeader eyebrow="The archive" title="Every conversation, in one place." description="Catch up on seasons, revisit a favourite or find the conversation you did not know you needed." />
        <div class="mt-6 flex flex-wrap gap-2">
          <button v-for="season in seasons" :key="season" type="button" class="rounded-full border px-3.5 py-1.5 text-[10.5px] font-bold transition" :class="activeSeason === season ? 'border-[#27628C] bg-[#27628C] text-white' : 'border-[#e4ebf0] bg-white text-[#5f7482] hover:border-[#27628C]/30'" @click="activeSeason = season">
            {{ season === 'All' ? 'All seasons' : `Season ${season}` }}
          </button>
        </div>

        <div v-if="loading" class="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <div v-for="i in 6" :key="i" class="site-skeleton h-80" />
        </div>
        <div v-else-if="filteredEpisodes.length" class="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <article v-for="episode in paginatedEpisodes" :key="episode._id || episode.id" class="site-card site-card-hover group flex h-full flex-col overflow-hidden">
            <div class="relative aspect-[16/10] overflow-hidden bg-[#eef5f9]">
              <SiteMedia :src="episode.thumbnailUrl || episode.image" :alt="episode.title" label="LabCast episode" icon="lucide:mic" />
              <span class="absolute left-3 top-3 rounded-full bg-white/95 px-2 py-1 text-[9px] font-bold uppercase tracking-[0.1em] text-[#27628C]">S{{ episode.season }} E{{ episode.episode }}</span>
              <span class="absolute bottom-3 right-3 rounded-full bg-[#0a202b]/80 px-2 py-1 text-[9px] font-semibold text-white">{{ episode.duration }} min</span>
            </div>
            <div class="flex flex-1 flex-col p-5">
              <p class="text-[9.5px] font-semibold uppercase tracking-[0.1em] text-[#8a9ba5]">{{ formatDate(episode.publishedAt) }}</p>
              <h3 class="mt-2 line-clamp-2 text-[1rem] font-bold leading-snug tracking-[-0.02em] text-[#0a202b] transition group-hover:text-[#27628C]">{{ episode.title }}</h3>
              <p class="mt-2 line-clamp-2 text-[11px] leading-6 text-[#5f7482]">{{ episode.description }}</p>
              <div class="mt-auto flex items-center gap-2 border-t border-[#eef2f5] pt-4">
                <a v-if="episode.spotifyUrl" :href="episode.spotifyUrl" target="_blank" rel="noopener noreferrer" class="flex h-8 w-8 items-center justify-center rounded-lg bg-[#eef5f9] text-[#27628C]" aria-label="Spotify"><Icon name="lucide:headphones" class="h-3.5 w-3.5" /></a>
                <a v-if="episode.appleUrl" :href="episode.appleUrl" target="_blank" rel="noopener noreferrer" class="flex h-8 w-8 items-center justify-center rounded-lg bg-[#eef5f9] text-[#27628C]" aria-label="Apple Podcasts"><Icon name="lucide:podcast" class="h-3.5 w-3.5" /></a>
                <a v-if="episode.youtubeUrl" :href="episode.youtubeUrl" target="_blank" rel="noopener noreferrer" class="flex h-8 w-8 items-center justify-center rounded-lg bg-[#eef5f9] text-[#27628C]" aria-label="YouTube"><Icon name="lucide:youtube" class="h-3.5 w-3.5" /></a>
                <span class="ml-auto text-[9px] font-semibold text-[#8a9ba5]">Listen</span>
              </div>
            </div>
          </article>
        </div>
        <div v-if="visibleCount < filteredEpisodes.length" class="mt-7 flex justify-center">
          <button type="button" class="site-btn site-btn-ghost" @click="visibleCount += 9">Load more episodes</button>
        </div>
        <div v-else-if="!filteredEpisodes.length" class="site-card mt-7 px-6 py-16 text-center">
          <h3 class="text-lg font-bold text-[#0a202b]">No episodes in this season yet.</h3>
          <p class="mt-1 text-[12px] text-[#5f7482]">Try another season or check back soon.</p>
        </div>
      </div>
    </section>

    <section class="site-container py-10 sm:py-14">
      <div class="overflow-hidden rounded-[1.5rem] bg-[#0a2f42] p-2">
        <LabCastVideo />
      </div>
    </section>

    <SiteCta eyebrow="Join the conversation" title="A microphone is only as good as the questions." description="Subscribe wherever you listen, or bring a story worth telling to the next episode." primary-label="Browse episodes" primary-to="#episodes" secondary-label="Suggest a guest" secondary-to="/enquiries" />
  </main>
</template>
