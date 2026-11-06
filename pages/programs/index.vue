<script setup lang="ts">
import { useGetPrograms } from '@/composables/modules/programs/useGetPrograms'
import SiteHero from '@/components/site/SiteHero.vue'
import SiteMedia from '@/components/site/SiteMedia.vue'
import SiteSectionHeader from '@/components/site/SiteSectionHeader.vue'
import ProgramCard from '@/components/site/ProgramCard.vue'
import SiteCta from '@/components/site/SiteCta.vue'
import { isProgramOpen } from '@/utils/programs'

const { programs, loading } = useGetPrograms()

const search = ref('')
const activeCategory = ref('All')

const activePrograms = computed(() => (programs.value || []).filter((p: any) => p.status === 'active'))
const openPrograms = computed(() => activePrograms.value.filter((p: any) => isProgramOpen(p)))
const categories = computed(() => ['All', ...new Set(activePrograms.value.map((p: any) => p.category).filter(Boolean))])

const filteredPrograms = computed(() => {
  let list = activePrograms.value
  if (activeCategory.value !== 'All') list = list.filter((p: any) => p.category === activeCategory.value)
  if (search.value.trim()) {
    const q = search.value.toLowerCase()
    list = list.filter((p: any) =>
      p.title?.toLowerCase().includes(q) ||
      p.description?.toLowerCase().includes(q) ||
      p.category?.toLowerCase().includes(q))
  }
  return list
})

const featuredProgram = computed(() => activePrograms.value[0])

useHead({
  title: 'Programmes | MedLabConvo',
  meta: [{ name: 'description', content: 'Cohort-based programmes, mentorship and practical learning for laboratory professionals and students.' }],
})
</script>

<template>
  <main class="bg-white">
    <SiteHero
      eyebrow="Programmes & cohorts"
      title="Build the career your curiosity deserves."
      description="Cohort-based learning, mentorship and practical exposure designed around the future of laboratory science — from your first internship to your next leadership move."
      primary-label="Browse open programmes"
      primary-to="#programmes"
      secondary-label="Talk to our team"
      secondary-to="/enquiries"
    >
      <template #visual>
        <div class="relative mx-auto max-w-lg">
          <div class="site-card overflow-hidden !border-white/10 !bg-white/[0.06] p-2">
            <div class="aspect-[4/4.6] overflow-hidden rounded-[1.15rem]">
              <SiteMedia :src="featuredProgram?.image || featuredProgram?.images?.[0]" :alt="featuredProgram?.title || 'MedLabConvo programme'" :label="featuredProgram?.category || 'Programme'" icon="lucide:graduation-cap" eager />
            </div>
          </div>
          <div class="absolute -bottom-5 -left-4 rounded-2xl border border-white/15 bg-[#0a2f42] p-4 shadow-xl sm:-left-8">
            <p class="text-[9px] font-bold uppercase tracking-[0.14em] text-white/45">Applications open</p>
            <p class="mt-1 text-[15px] font-bold text-white">{{ openPrograms.length }} open programme{{ openPrograms.length === 1 ? '' : 's' }}</p>
            <p class="mt-1 text-[10px] text-white/50">Across clinical, research and career tracks</p>
          </div>
          <div class="absolute -right-3 top-8 rounded-xl bg-[#DE6129] px-3.5 py-2.5 shadow-lg">
            <p class="text-[8px] font-bold uppercase tracking-[0.12em] text-white/70">Since 2019</p>
            <p class="text-[11px] font-bold text-white">50+ cohorts</p>
          </div>
        </div>
      </template>
    </SiteHero>

    <!-- Programme principles -->
    <section class="border-b border-[#e4ebf0] bg-[#fbfcfc]">
      <div class="site-container grid gap-4 py-8 sm:grid-cols-3">
        <div v-for="(item, i) in [
          { title: 'Learn with practitioners', text: 'Faculty who work in the field, not just talk about it.', icon: 'lucide:stethoscope' },
          { title: 'Build something real', text: 'Projects, artefacts and frameworks you can use immediately.', icon: 'lucide:hammer' },
          { title: 'Leave with a network', text: 'Peers and mentors who stay in your corner after the cohort.', icon: 'lucide:users' },
        ]" :key="item.title" class="flex items-start gap-3">
          <span class="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#eef5f9] text-[#27628C]"><Icon :name="item.icon" class="h-4 w-4" /></span>
          <div>
            <p class="text-[12px] font-bold text-[#0a202b]">{{ item.title }}</p>
            <p class="mt-0.5 text-[10.5px] leading-5 text-[#5f7482]">{{ item.text }}</p>
          </div>
        </div>
      </div>
    </section>

    <section id="programmes" class="site-section bg-white">
      <div class="site-container">
        <SiteSectionHeader
          eyebrow="Open opportunities"
          title="Current initiatives."
          :description="loading ? 'Loading the latest programme directory…' : `${openPrograms.length} open programmes, designed to meet you where you are.`"
        >
          <template #actions>
            <div class="relative hidden sm:block">
              <Icon name="lucide:search" class="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#8a9ba5]" />
              <input v-model="search" type="search" placeholder="Search programmes" class="h-9 w-48 rounded-lg border border-[#e4ebf0] bg-white pl-9 pr-3 text-[11px] font-medium text-[#0a202b] outline-none transition focus:border-[#27628C]/40" />
            </div>
          </template>
        </SiteSectionHeader>

        <div class="mt-6 flex flex-wrap gap-2">
          <button
            v-for="category in categories"
            :key="category"
            type="button"
            class="rounded-full border px-3.5 py-1.5 text-[10.5px] font-bold transition"
            :class="activeCategory === category ? 'border-[#27628C] bg-[#27628C] text-white' : 'border-[#e4ebf0] bg-white text-[#5f7482] hover:border-[#27628C]/30 hover:text-[#27628C]'"
            @click="activeCategory = category"
          >
            {{ category }}
          </button>
        </div>
        <div class="mt-4 sm:hidden">
          <div class="relative">
            <Icon name="lucide:search" class="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#8a9ba5]" />
            <input v-model="search" type="search" placeholder="Search programmes" class="h-10 w-full rounded-lg border border-[#e4ebf0] bg-white pl-9 pr-3 text-[12px] outline-none focus:border-[#27628C]/40" />
          </div>
        </div>

        <div v-if="loading" class="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <div v-for="i in 6" :key="i" class="site-skeleton h-[26rem]" />
        </div>

        <div v-else-if="filteredPrograms.length" class="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <ProgramCard v-for="program in filteredPrograms" :key="program.slug || program._id" :program="program" />
        </div>

        <div v-else class="site-card mt-8 flex flex-col items-center justify-center px-6 py-16 text-center">
          <span class="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eef5f9] text-[#27628C]"><Icon name="lucide:search-x" class="h-6 w-6" /></span>
          <h3 class="mt-4 text-lg font-bold tracking-[-0.02em] text-[#0a202b]">No programmes match that search</h3>
          <p class="mt-1 max-w-sm text-[12px] leading-6 text-[#5f7482]">Try a different category or clear the search. New cohorts are added regularly.</p>
          <button type="button" class="site-btn site-btn-ghost mt-5" @click="search = ''; activeCategory = 'All'">Clear filters</button>
        </div>
      </div>
    </section>

    <SiteCta
      eyebrow="Not sure where to start?"
      title="Tell us where you are. We will point you to the right room."
      description="Whether you are a student, intern, researcher or established professional, there is a MedLabConvo pathway for you."
      primary-label="Talk to us"
      primary-to="/enquiries"
      secondary-label="Explore the community"
      secondary-to="/community"
    />
  </main>
</template>
