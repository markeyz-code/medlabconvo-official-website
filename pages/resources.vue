<script setup lang="ts">
import { convostack_api } from '@/api_factory/modules/convostack'
import SiteHero from '@/components/site/SiteHero.vue'
import SiteMedia from '@/components/site/SiteMedia.vue'
import SiteSectionHeader from '@/components/site/SiteSectionHeader.vue'
import SiteCta from '@/components/site/SiteCta.vue'

const publications = ref<any[]>([])
const loading = ref(true)

const getPublishedPublications = async () => {
  loading.value = true
  try {
    const response = await convostack_api.$_get_publications()
    publications.value = response.data || []
  } finally {
    loading.value = false
  }
}
const activeCategory = ref('all')
const search = ref('')

onMounted(() => getPublishedPublications())

const categories = computed(() => ['all', ...new Set((publications.value || []).map((p: any) => p.category).filter(Boolean))])
const visibleCount = ref(9)
const filteredPublications = computed(() => {
  let list = publications.value || []
  if (activeCategory.value !== 'all') list = list.filter((p: any) => p.category === activeCategory.value)
  if (search.value.trim()) {
    const q = search.value.toLowerCase()
    list = list.filter((p: any) => p.title?.toLowerCase().includes(q) || p.excerpt?.toLowerCase().includes(q))
  }
  return list
})
const paginatedPublications = computed(() => filteredPublications.value.slice(0, visibleCount.value))
watch([activeCategory, search], () => { visibleCount.value = 9 })

useHead({
  title: 'Resources | MedLabConvo',
  meta: [{ name: 'description', content: 'Research papers, policy briefs and professional toolkits for medical laboratory science.' }],
})
</script>

<template>
  <main class="bg-white">
    <SiteHero
      eyebrow="Knowledge hub"
      title="Good work starts with good material."
      description="A curated library of research, policy briefs, professional toolkits and learning resources for people building the future of laboratory medicine."
      primary-label="Browse the library"
      primary-to="#library"
      secondary-label="Read Journo"
      secondary-to="/journo"
      theme="light"
    >
      <template #visual>
        <div class="relative mx-auto max-w-md">
          <div class="grid grid-cols-2 gap-3">
            <div class="site-card p-2"><div class="aspect-[3/4] overflow-hidden rounded-xl"><SiteMedia :src="filteredPublications[0]?.coverImage" label="Research paper" icon="lucide:file-text" eager /></div></div>
            <div class="mt-8 site-card p-2"><div class="aspect-[3/4] overflow-hidden rounded-xl"><SiteMedia :src="filteredPublications[1]?.coverImage" label="Policy brief" icon="lucide:book-open" /></div></div>
          </div>
          <div class="absolute -bottom-4 left-1/2 -translate-x-1/2 rounded-full border border-[#e4ebf0] bg-white px-4 py-2 shadow-lg">
            <p class="text-[10px] font-bold text-[#0a202b]">{{ filteredPublications.length }} resources <span class="font-medium text-[#8a9ba5]">ready to explore</span></p>
          </div>
        </div>
      </template>
    </SiteHero>

    <section id="library" class="site-section">
      <div class="site-container">
        <SiteSectionHeader eyebrow="The library" title="Research and tools, organised." description="Filter by type or search for a specific topic. Everything here is designed to be useful, not decorative.">
          <template #actions>
            <div class="relative hidden sm:block">
              <Icon name="lucide:search" class="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#8a9ba5]" />
              <input v-model="search" type="search" placeholder="Search resources" class="h-9 w-48 rounded-lg border border-[#e4ebf0] bg-white pl-9 pr-3 text-[11px] outline-none focus:border-[#27628C]/40" />
            </div>
          </template>
        </SiteSectionHeader>

        <div class="mt-5 flex flex-wrap gap-2">
          <button v-for="cat in categories" :key="cat" type="button" class="rounded-full border px-3.5 py-1.5 text-[10.5px] font-bold capitalize transition" :class="activeCategory === cat ? 'border-[#27628C] bg-[#27628C] text-white' : 'border-[#e4ebf0] bg-white text-[#5f7482] hover:border-[#27628C]/30'" @click="activeCategory = cat">
            {{ cat === 'all' ? 'All resources' : cat }}
          </button>
        </div>
        <div class="mt-4 sm:hidden">
          <input v-model="search" type="search" placeholder="Search resources" class="h-10 w-full rounded-lg border border-[#e4ebf0] bg-white px-3 text-[12px] outline-none focus:border-[#27628C]/40" />
        </div>

        <div v-if="loading" class="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <div v-for="i in 6" :key="i" class="site-skeleton h-[26rem]" />
        </div>
        <div v-else-if="filteredPublications.length" class="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <article v-for="pub in paginatedPublications" :key="pub.id || pub._id" class="site-card site-card-hover group flex h-full flex-col overflow-hidden">
            <div class="relative aspect-[4/3] overflow-hidden bg-[#eef5f9]">
              <SiteMedia :src="pub.coverImage" :alt="pub.title" :label="pub.category || 'Resource'" icon="lucide:file-text" />
              <span class="absolute left-3 top-3 rounded-full bg-white/95 px-2 py-1 text-[9px] font-bold uppercase tracking-[0.1em] text-[#27628C]">{{ pub.category || 'Resource' }}</span>
            </div>
            <div class="flex flex-1 flex-col p-5">
              <p class="text-[9.5px] font-semibold uppercase tracking-[0.1em] text-[#8a9ba5]">{{ pub.category || 'Convo Stack' }} · {{ pub.readTime || 5 }} min read</p>
              <h3 class="mt-2 line-clamp-2 text-[1rem] font-bold leading-snug tracking-[-0.02em] text-[#0a202b] transition group-hover:text-[#27628C]">{{ pub.title }}</h3>
              <p class="mt-2 line-clamp-3 text-[11px] leading-6 text-[#5f7482]">{{ pub.excerpt || 'A professional resource from the MedLabConvo knowledge hub.' }}</p>
              <div class="mt-auto flex items-center justify-between gap-3 border-t border-[#eef2f5] pt-4">
                <span class="text-[9.5px] text-[#8a9ba5]">{{ pub.authors?.join(', ') || 'MedLabConvo' }}</span>
                <NuxtLink :to="`/convostack/${pub.slug}`" target="_blank" class="site-link-arrow">Access <Icon name="lucide:arrow-up-right" class="h-3.5 w-3.5" /></NuxtLink>
              </div>
            </div>
          </article>
        </div>
        <div v-else class="site-card mt-7 px-6 py-16 text-center">
          <h3 class="text-lg font-bold text-[#0a202b]">No resources match that search.</h3>
          <p class="mt-1 text-[12px] text-[#5f7482]">Try another category or clear the search.</p>
          <button type="button" class="site-btn site-btn-ghost mt-5" @click="activeCategory = 'all'; search = ''">Clear filters</button>
        </div>

        <div v-if="visibleCount < filteredPublications.length" class="mt-7 flex justify-center">
          <button type="button" class="site-btn site-btn-ghost" @click="visibleCount += 9">Load more resources</button>
        </div>

        <div class="mt-12 overflow-hidden rounded-[1.5rem] bg-[#0a2f42] p-6 sm:p-8">
          <div class="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p class="site-eyebrow !text-white/50">Recorded webinars</p>
              <h2 class="mt-2 text-[1.6rem] font-bold tracking-[-0.03em] text-white">The video library is coming together.</h2>
              <p class="mt-2 max-w-xl text-[12px] leading-6 text-white/55">We are migrating our recorded sessions into a searchable hub. Leave your email and we will tell you when it is ready.</p>
            </div>
            <a href="https://wa.link/bub9dk" target="_blank" rel="noopener noreferrer" class="site-btn site-btn-light">Notify me <Icon name="lucide:arrow-up-right" class="h-3.5 w-3.5" /></a>
          </div>
        </div>
      </div>
    </section>

    <SiteCta eyebrow="Go deeper" title="The archive is a starting point, not a ceiling." description="Read the editorial, listen to the conversations, or join a programme that turns insight into practice." primary-label="Explore Journo" primary-to="/journo" secondary-label="Browse programmes" secondary-to="/programs" />
  </main>
</template>
