<script setup lang="ts">
import { convostack_api } from '@/api_factory/modules/convostack'
import SiteHero from '@/components/site/SiteHero.vue'
import SiteMedia from '@/components/site/SiteMedia.vue'
import ArticleCard from '@/components/site/ArticleCard.vue'
import SiteCta from '@/components/site/SiteCta.vue'

const publications = ref<any[]>([])
const loading = ref(true)
const searchQuery = ref('')
const activeCategory = ref('')

onMounted(async () => {
  loading.value = true
  try {
    const res = await convostack_api.$_get_publications()
    publications.value = res.data || []
  } catch (error) {
    console.error('Convo Stack retrieval error:', error)
  } finally {
    loading.value = false
  }
})

const categories = computed(() => [...new Set((publications.value || []).map((p: any) => p.category).filter(Boolean))])
const filteredPublications = computed(() => {
  let list = publications.value || []
  if (activeCategory.value) list = list.filter((p: any) => p.category === activeCategory.value)
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase()
    list = list.filter((p: any) =>
      p.title?.toLowerCase().includes(q) ||
      p.excerpt?.toLowerCase().includes(q) ||
      p.authorName?.toLowerCase().includes(q))
  }
  return list
})
const featuredPublication = computed(() => filteredPublications.value[0] || {})
const recentPublications = computed(() => filteredPublications.value.slice(1))

const formatDate = (date: string) => date ? new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Recently'
const articleLink = (article: any) => `/convostack/${article.slug}`

useHead({
  title: 'Convo Stack | MedLabConvo',
  meta: [{ name: 'description', content: 'A living editorial feed of laboratory science, careers, diagnostics and the wider health ecosystem.' }],
})
</script>

<template>
  <main class="bg-white">
    <SiteHero
      eyebrow="Convo Stack · The living feed"
      title="The conversation around the lab, in real time."
      description="A living editorial feed of careers, diagnostics, research and ecosystem pulses — written for people who want to stay close to what is changing."
      primary-label="Read the latest"
      primary-to="#feed"
      secondary-label="Subscribe to the Stack"
      secondary-to="/journo"
      theme="light"
    >
      <template #visual>
        <div class="relative mx-auto max-w-md">
          <div class="site-card overflow-hidden p-2">
            <div class="aspect-[4/4.2] overflow-hidden rounded-xl"><SiteMedia :src="featuredPublication?.coverImage" :alt="featuredPublication?.title || 'Convo Stack'" :label="featuredPublication?.category || 'The stack'" icon="lucide:messages-square" eager /></div>
          </div>
          <div class="absolute -bottom-5 -left-4 rounded-2xl border border-[#e4ebf0] bg-white p-4 shadow-xl sm:-left-6">
            <p class="text-[9px] font-bold uppercase tracking-[0.14em] text-[#8a9ba5]">On the stack</p>
            <p class="mt-1 max-w-[12rem] line-clamp-2 text-[11px] font-semibold leading-5 text-[#0a202b]">{{ featuredPublication?.title || 'Fresh perspectives, regularly' }}</p>
            <p class="mt-1 text-[9px] text-[#8a9ba5]">{{ categories.length }} themes · {{ publications.length }} stories</p>
          </div>
        </div>
      </template>
    </SiteHero>

    <section id="feed" class="site-section">
      <div class="site-container">
        <div class="flex flex-wrap items-center gap-2">
          <button type="button" class="rounded-full border px-3.5 py-1.5 text-[10.5px] font-bold transition" :class="!activeCategory ? 'border-[#27628C] bg-[#27628C] text-white' : 'border-[#e4ebf0] bg-white text-[#5f7482] hover:border-[#27628C]/30'" @click="activeCategory = ''">All stories</button>
          <button v-for="cat in categories" :key="cat" type="button" class="rounded-full border px-3.5 py-1.5 text-[10.5px] font-bold capitalize transition" :class="activeCategory === cat ? 'border-[#27628C] bg-[#27628C] text-white' : 'border-[#e4ebf0] bg-white text-[#5f7482] hover:border-[#27628C]/30'" @click="activeCategory = cat">{{ cat }}</button>
          <div class="relative ml-auto w-full sm:w-56">
            <Icon name="lucide:search" class="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#8a9ba5]" />
            <input v-model="searchQuery" type="search" placeholder="Search the stack" class="h-9 w-full rounded-lg border border-[#e4ebf0] bg-white pl-9 pr-3 text-[11px] outline-none focus:border-[#27628C]/40" />
          </div>
        </div>

        <div v-if="loading" class="mt-7 grid gap-5 lg:grid-cols-[1.2fr_.8fr]">
          <div class="site-skeleton h-[30rem]" />
          <div class="grid gap-5"><div class="site-skeleton h-48" /><div class="site-skeleton h-48" /></div>
        </div>

        <template v-else-if="filteredPublications.length">
          <div class="mt-7 grid gap-5 lg:grid-cols-[1.2fr_.8fr]">
            <article v-if="featuredPublication" class="site-card group overflow-hidden">
              <NuxtLink :to="articleLink(featuredPublication)" class="relative block aspect-[16/9] overflow-hidden">
                <SiteMedia :src="featuredPublication.coverImage" :alt="featuredPublication.title" :label="featuredPublication.category || 'Convo Stack'" icon="lucide:messages-square" />
                <span class="absolute left-4 top-4 rounded-full bg-white/95 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.12em] text-[#27628C]">Top of the stack</span>
              </NuxtLink>
              <div class="p-6 sm:p-7">
                <div class="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.1em] text-[#8a9ba5]">
                  <span class="text-[#27628C] capitalize">{{ featuredPublication.category }}</span>
                  <span class="h-1 w-1 rounded-full bg-[#d5e0e6]" />
                  <span>{{ formatDate(featuredPublication.publishedAt || featuredPublication.createdAt) }}</span>
                </div>
                <NuxtLink :to="articleLink(featuredPublication)">
                  <h2 class="mt-3 text-[1.65rem] font-bold leading-tight tracking-[-0.04em] text-[#0a202b] transition group-hover:text-[#27628C]">{{ featuredPublication.title }}</h2>
                </NuxtLink>
                <p class="mt-3 line-clamp-3 text-[0.86rem] leading-7 text-[#5f7482]">{{ featuredPublication.excerpt }}</p>
                <div class="mt-5 flex items-center justify-between border-t border-[#eef2f5] pt-4">
                  <div class="flex items-center gap-2.5">
                    <span class="flex h-8 w-8 items-center justify-center rounded-full bg-[#eef5f9] text-[11px] font-bold text-[#27628C]">{{ (featuredPublication.authorName || 'M').charAt(0) }}</span>
                    <div>
                      <p class="text-[10.5px] font-bold text-[#0a202b]">{{ featuredPublication.authorName || 'MedLabConvo' }}</p>
                      <p class="text-[9px] text-[#8a9ba5]">{{ featuredPublication.readTime || 5 }} min read</p>
                    </div>
                  </div>
                  <NuxtLink :to="articleLink(featuredPublication)" class="site-link-arrow">Read story <Icon name="lucide:arrow-up-right" class="h-3.5 w-3.5" /></NuxtLink>
                </div>
              </div>
            </article>

            <div class="grid gap-5">
              <ArticleCard v-for="article in recentPublications.slice(0, 2)" :key="article._id || article.slug" :title="article.title" :excerpt="article.excerpt" :image="article.coverImage" :category="article.category || 'Stack'" :meta="formatDate(article.publishedAt || article.createdAt)" :to="articleLink(article)" label="Read story" />
            </div>
          </div>

          <div class="mt-14 grid gap-10 lg:grid-cols-[1fr_20rem]">
            <div>
              <div class="flex items-end justify-between border-b border-[#e4ebf0] pb-3">
                <div>
                  <p class="site-eyebrow">The feed</p>
                  <h2 class="mt-2 text-[1.5rem] font-bold tracking-[-0.03em] text-[#0a202b]">More from the stack</h2>
                </div>
                <p class="text-[10px] font-semibold uppercase tracking-[0.1em] text-[#8a9ba5]">{{ filteredPublications.length }} stories</p>
              </div>
              <div class="divide-y divide-[#eef2f5]">
                <article v-for="article in filteredPublications.slice(1)" :key="article._id || article.slug" class="group grid gap-4 py-6 sm:grid-cols-[1fr_10rem]">
                  <div>
                    <div class="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.1em] text-[#8a9ba5]">
                      <span class="text-[#27628C] capitalize">{{ article.category }}</span>
                      <span class="h-1 w-1 rounded-full bg-[#d5e0e6]" />
                      <span>{{ formatDate(article.publishedAt || article.createdAt) }}</span>
                    </div>
                    <NuxtLink :to="articleLink(article)" class="mt-2 block">
                      <h3 class="text-[1.1rem] font-bold leading-snug tracking-[-0.02em] text-[#0a202b] transition group-hover:text-[#27628C]">{{ article.title }}</h3>
                    </NuxtLink>
                    <p class="mt-1.5 line-clamp-2 text-[11.5px] leading-6 text-[#5f7482]">{{ article.excerpt }}</p>
                    <p class="mt-2 text-[9.5px] text-[#8a9ba5]">{{ article.authorName || 'MedLabConvo' }} · {{ article.readTime || 4 }} min read</p>
                  </div>
                  <NuxtLink :to="articleLink(article)" class="hidden overflow-hidden rounded-xl border border-[#eef2f5] sm:block">
                    <SiteMedia :src="article.coverImage" :alt="article.title" :label="article.category" icon="lucide:file-text" />
                  </NuxtLink>
                </article>
              </div>
            </div>

            <aside class="space-y-4">
              <div class="rounded-2xl bg-[#27628C] p-5 text-white">
                <p class="text-[9px] font-bold uppercase tracking-[0.16em] text-white/50">The Convo Stack</p>
                <h3 class="mt-2 text-[1.2rem] font-bold leading-tight tracking-[-0.03em]">Get the good stuff in your inbox.</h3>
                <p class="mt-2 text-[10.5px] leading-5 text-white/60">Join professionals receiving curated diagnostics, career and research pulses.</p>
                <NuxtLink to="/journo" class="site-btn site-btn-light mt-4 w-full">Subscribe free</NuxtLink>
              </div>
              <div class="rounded-2xl border border-[#e4ebf0] bg-white p-5">
                <p class="text-[9px] font-bold uppercase tracking-[0.16em] text-[#8a9ba5]">Recommendations</p>
                <div class="mt-3 space-y-3">
                  <NuxtLink v-for="(article, i) in filteredPublications.slice(0, 4)" :key="article._id" :to="articleLink(article)" class="group flex gap-2.5">
                    <span class="text-[10px] font-bold text-[#c0ced7]">0{{ i + 1 }}</span>
                    <span class="text-[11px] font-semibold leading-5 text-[#0a202b] transition group-hover:text-[#27628C]">{{ article.title }}</span>
                  </NuxtLink>
                </div>
              </div>
            </aside>
          </div>
        </template>

        <div v-else class="site-card mt-7 px-6 py-16 text-center">
          <span class="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eef5f9] text-[#27628C]"><Icon name="lucide:search-x" class="h-6 w-6" /></span>
          <h2 class="mt-4 text-lg font-bold text-[#0a202b]">Nothing in the stack matches that.</h2>
          <p class="mt-1 text-[12px] text-[#5f7482]">Try a different theme or clear the search.</p>
          <button type="button" class="site-btn site-btn-ghost mt-5" @click="activeCategory = ''; searchQuery = ''">View all stories</button>
        </div>
      </div>
    </section>

    <SiteCta eyebrow="Keep the conversation going" title="A sharper feed starts with better questions." description="Subscribe to the Convo Stack for editorial that treats laboratory professionals as the main audience, not an afterthought." primary-label="Subscribe to the Stack" primary-to="/journo" secondary-label="Read Journo" secondary-to="/journo" />
  </main>
</template>
