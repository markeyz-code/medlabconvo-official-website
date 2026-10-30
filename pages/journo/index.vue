<script setup lang="ts">
import { useGetPublications } from '@/composables/modules/publications/useGetPublications'
import SiteHero from '@/components/site/SiteHero.vue'
import SiteMedia from '@/components/site/SiteMedia.vue'
import SiteSectionHeader from '@/components/site/SiteSectionHeader.vue'
import ArticleCard from '@/components/site/ArticleCard.vue'
import SiteCta from '@/components/site/SiteCta.vue'

const { publications, loading } = useGetPublications()
const activeFilter = ref('All')

const published = computed(() => (publications.value || [])
  .filter((pub: any) => pub.status === 'published')
  .sort((a: any, b: any) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()))
const featured = computed(() => published.value[0])
const archive = computed(() => published.value.slice(1))
const filters = computed(() => ['All', ...new Set(published.value.map((pub: any) => pub.category).filter(Boolean))])
const filteredArchive = computed(() => activeFilter.value === 'All' ? archive.value : archive.value.filter((pub: any) => pub.category === activeFilter.value))
const visibleCount = ref(9)
const paginatedArchive = computed(() => filteredArchive.value.slice(0, visibleCount.value))
watch(activeFilter, () => { visibleCount.value = 9 })

const formatDate = (value?: string) => value ? new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Recently'
const articleLink = (article: any) => article.link || article.pubLink || '/journo'

useHead({
  title: 'Journo | Research, articles and insights | MedLabConvo',
  meta: [{ name: 'description', content: 'Research, essays and critical perspectives at the intersection of laboratory science and global health.' }],
})
</script>

<template>
  <main class="bg-white">
    <SiteHero
      eyebrow="Journo · The editorial desk"
      title="Ideas that make the lab legible."
      description="Research, reported features and sharp perspectives connecting laboratory science to healthcare, careers, policy and the wider world."
      primary-label="Read the latest"
      primary-to="/journo#latest"
      secondary-label="Subscribe to the Stack"
      secondary-to="/convostack"
    >
      <template #visual>
        <div class="relative mx-auto max-w-lg">
          <div class="site-card overflow-hidden !border-white/10 !bg-white/[0.06] p-2">
            <div class="aspect-[4/4.4] overflow-hidden rounded-[1.15rem]">
              <SiteMedia :src="featured?.images?.[0]" :alt="featured?.title || 'Journo'" :label="featured?.category || 'The editorial desk'" icon="lucide:newspaper" eager />
            </div>
          </div>
          <div class="absolute -bottom-5 -left-4 max-w-[15rem] rounded-2xl border border-white/15 bg-[#0a2f42] p-4 shadow-xl sm:-left-8">
            <p class="text-[9px] font-bold uppercase tracking-[0.14em] text-white/45">Latest dispatch</p>
            <p class="mt-1 line-clamp-2 text-[11px] font-semibold leading-5 text-white">{{ featured?.title || 'A new perspective on the laboratory' }}</p>
            <p class="mt-1 text-[9px] text-white/40">{{ formatDate(featured?.createdAt) }}</p>
          </div>
          <div class="absolute -right-3 top-8 rounded-xl bg-[#DE6129] px-3.5 py-2.5 shadow-lg">
            <p class="text-[8px] font-bold uppercase tracking-[0.12em] text-white/70">The archive</p>
            <p class="text-[11px] font-bold text-white">{{ published.length }} pieces</p>
          </div>
        </div>
      </template>
    </SiteHero>

    <section id="latest" class="site-section">
      <div class="site-container">
        <div v-if="loading" class="grid gap-5 lg:grid-cols-[1.2fr_.8fr]">
          <div class="site-skeleton h-[32rem]" />
          <div class="grid gap-5"><div class="site-skeleton h-52" /><div class="site-skeleton h-52" /></div>
        </div>

        <template v-else-if="featured">
          <div class="grid gap-5 lg:grid-cols-[1.15fr_.85fr]">
            <article class="site-card group overflow-hidden">
              <NuxtLink :to="articleLink(featured)" class="relative block aspect-[16/9] overflow-hidden">
                <SiteMedia :src="featured.images?.[0]" :alt="featured.title" :label="featured.category || 'Journo'" icon="lucide:newspaper" />
                <span class="absolute left-4 top-4 rounded-full bg-white/95 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.12em] text-[#27628C]">Featured</span>
              </NuxtLink>
              <div class="p-6 sm:p-7">
                <div class="flex flex-wrap items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.1em] text-[#8a9ba5]">
                  <span class="text-[#27628C]">{{ featured.category || 'Insight' }}</span>
                  <span class="h-1 w-1 rounded-full bg-[#d5e0e6]" />
                  <span>{{ formatDate(featured.createdAt) }}</span>
                  <span class="h-1 w-1 rounded-full bg-[#d5e0e6]" />
                  <span>{{ featured.journal || 'Journo' }}</span>
                </div>
                <NuxtLink :to="articleLink(featured)">
                  <h2 class="mt-3 text-[1.7rem] font-bold leading-tight tracking-[-0.04em] text-[#0a202b] transition group-hover:text-[#27628C] sm:text-[2.1rem]">{{ featured.title }}</h2>
                </NuxtLink>
                <p class="mt-3 line-clamp-3 text-[0.86rem] leading-7 text-[#5f7482]">{{ featured.abstract }}</p>
                <div class="mt-5 flex items-center justify-between gap-4 border-t border-[#eef2f5] pt-4">
                  <div class="flex items-center gap-2.5">
                    <span class="flex h-8 w-8 items-center justify-center rounded-full bg-[#eef5f9] text-[11px] font-bold text-[#27628C]">{{ (featured.authors || 'M').charAt(0) }}</span>
                    <div>
                      <p class="text-[10.5px] font-bold text-[#0a202b]">{{ featured.authors || 'MedLabConvo' }}</p>
                      <p class="text-[9px] text-[#8a9ba5]">{{ featured.year || '2026' }}</p>
                    </div>
                  </div>
                  <NuxtLink :to="articleLink(featured)" class="site-link-arrow">Read the piece <Icon name="lucide:arrow-up-right" class="h-3.5 w-3.5" /></NuxtLink>
                </div>
              </div>
            </article>

            <div class="grid gap-5">
              <ArticleCard
                v-for="article in archive.slice(0, 2)"
                :key="article._id || article.id"
                :title="article.title"
                :excerpt="article.abstract"
                :image="article.images?.[0]"
                :category="article.category || 'Insight'"
                :meta="`${formatDate(article.createdAt)} · ${article.journal || 'Journo'}`"
                :to="articleLink(article)"
                label="Read piece"
              />
            </div>
          </div>
        </template>

        <div v-else class="site-card px-6 py-16 text-center">
          <h2 class="text-xl font-bold text-[#0a202b]">The next issue is being written.</h2>
          <p class="mt-2 text-[12px] text-[#5f7482]">New research and perspectives will appear here soon.</p>
        </div>
      </div>
    </section>

    <section class="bg-[#f7f9f8] py-14 sm:py-20">
      <div class="site-container">
        <SiteSectionHeader
          eyebrow="The archive"
          title="All dispatches."
          description="Browse by theme, or read straight through the archive."
        />
        <div class="mt-6 flex flex-wrap gap-2">
          <button
            v-for="filter in filters"
            :key="filter"
            type="button"
            class="rounded-full border px-3.5 py-1.5 text-[10.5px] font-bold transition"
            :class="activeFilter === filter ? 'border-[#27628C] bg-[#27628C] text-white' : 'border-[#e4ebf0] bg-white text-[#5f7482] hover:border-[#27628C]/30 hover:text-[#27628C]'"
            @click="activeFilter = filter"
          >
            {{ filter }}
          </button>
        </div>

        <div v-if="filteredArchive.length" class="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <ArticleCard
            v-for="article in paginatedArchive"
            :key="article._id || article.id"
            :title="article.title"
            :excerpt="article.abstract"
            :image="article.images?.[0]"
            :category="article.category || 'Insight'"
            :meta="`${formatDate(article.createdAt)} · ${article.journal || 'Journo'}`"
            :to="articleLink(article)"
            label="Read piece"
          />
        </div>
        <div v-else class="site-card mt-7 px-6 py-14 text-center">
          <p class="text-[13px] font-semibold text-[#0a202b]">No pieces in this theme yet.</p>
          <button type="button" class="site-link-arrow mt-3" @click="activeFilter = 'All'">View all dispatches</button>
        </div>

        <div v-if="visibleCount < filteredArchive.length" class="mt-7 flex justify-center">
          <button type="button" class="site-btn site-btn-ghost" @click="visibleCount += 9">Load more dispatches</button>
        </div>
      </div>
    </section>

    <section class="site-container py-10 sm:py-14">
      <div class="overflow-hidden rounded-[1.5rem] border border-[#e4ebf0] bg-white">
        <div class="grid gap-6 p-6 sm:p-8 lg:grid-cols-[1fr_1.15fr] lg:items-center">
          <div>
            <p class="site-eyebrow">The Convo Stack</p>
            <h2 class="mt-2 text-[1.8rem] font-bold tracking-[-0.04em] text-[#0a202b]">The conversation continues in your inbox.</h2>
            <p class="mt-2 max-w-md text-[12.5px] leading-6 text-[#5f7482]">Research, career notes and ecosystem pulses, written for people who work in and around the laboratory.</p>
            <NuxtLink to="/convostack" class="site-link-arrow mt-4">Explore the Convo Stack <Icon name="lucide:arrow-up-right" class="h-4 w-4" /></NuxtLink>
          </div>
          <div class="overflow-hidden rounded-xl border border-[#e4ebf0] bg-[#f7f9f8]">
            <iframe src="https://mlcjourno.substack.com/embed" width="100%" height="320" frameborder="0" scrolling="no" class="w-full" />
          </div>
        </div>
      </div>
    </section>

    <SiteCta
      eyebrow="Write with us"
      title="Have a perspective the field needs to hear?"
      description="We publish rigorous, accessible work from people who know the laboratory from the inside."
      primary-label="Pitch an idea"
      primary-to="/enquiries"
      secondary-label="Explore the community"
      secondary-to="/community"
    />
  </main>
</template>
