<template>
  <main class="min-h-screen bg-white">
    <!-- Hero Section -->
    <div class="relative isolate overflow-hidden bg-[#27628C] py-24 sm:py-40">
      <div class="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]"></div>
      
      <div class="mx-auto max-w-7xl px-6 lg:px-8 relative z-10 flex flex-col items-center justify-center pt-16 text-center">
        <div class="max-w-3xl">
          <h1 class="text-2xl font-bold text-blue-200 mb-6 animate-fade-in tracking-normal">Knowledge Hub</h1>
          <h2 class="text-5xl font-bold tracking-tight text-white sm:text-7xl mb-8 animate-fade-in-up ">Resources</h2>
          <p class="text-2xl leading-8 text-blue-50 font-medium animate-fade-in-up animation-delay-200 max-w-2xl mx-auto">
            A comprehensive collection of research papers, policy briefs, professional toolkits, and educational materials to support medical laboratory excellence.
          </p>
        </div>
      </div>
    </div>

    <!-- Filter & Content Section -->
    <section class="container mx-auto py-24 px-6 lg:px-8">
      <!-- Category Filters -->
      <div class="flex flex-wrap items-center justify-center gap-4 mb-20">
        <button 
          @click="activeCategory = 'all'"
          :class="[
            'px-8 py-3 rounded-full text-sm font-bold transition-all',
            activeCategory === 'all' ? 'bg-[#27628C] text-white shadow-sm border border-slate-100' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
          ]"
        >
          All Resources
        </button>
        <button 
          v-for="cat in categories" 
          :key="cat"
          @click="activeCategory = cat"
          :class="[
            'px-8 py-3 rounded-full text-sm font-bold transition-all',
            activeCategory === cat ? 'bg-[#27628C] text-white shadow-sm border border-slate-100' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
          ]"
        >
          {{ cat }}
        </button>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        <div v-for="i in 6" :key="i" class="space-y-6">
          <div class="aspect-[3/4] bg-gray-50 rounded-3xl animate-pulse"></div>
          <div class="h-4 bg-gray-50 rounded w-3/4 animate-pulse"></div>
          <div class="h-4 bg-gray-50 rounded w-1/2 animate-pulse"></div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else-if="filteredPublications.length === 0" class="text-center py-32 bg-gray-50 rounded-[3rem] border border-dashed border-gray-200">
        <div class="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white mb-6 shadow-sm">
          <svg class="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </div>
        <h3 class="text-lg font-bold text-gray-900 mb-2">No resources found</h3>
        <p class="text-gray-500">We are currently cataloging our latest resources in this category.</p>
      </div>

      <!-- Resources Grid -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        <article 
          v-for="(pub, idx) in filteredPublications" 
          :key="pub.id"
          class="group relative flex flex-col bg-white border border-gray-100 rounded-[2.5rem] overflow-hidden transition-all duration-500 hover:-translate-y-4 hover:shadow-sm border border-slate-200 hover:shadow-blue-900/5"
          :style="{ animationDelay: `${idx * 100}ms` }"
        >
          <!-- Thumbnail -->
          <div class="relative aspect-[3/4] bg-gray-50 overflow-hidden">
            <img 
              v-if="pub.images && pub.images.length"
              :src="pub.images[0]" 
              :alt="pub.title"
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            >
            <div v-else class="w-full h-full flex items-center justify-center bg-gray-50 text-[#27628C]/20">
              <svg class="w-20 h-20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/><path d="M14 17H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
              </svg>
            </div>
            
            <div class="absolute top-4 left-4">
              <span class="bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-xl text-[10px] font-black  tracking-normal text-[#27628C] shadow-sm">
                {{ pub.category || 'General' }}
              </span>
            </div>
          </div>

          <!-- Content -->
          <div class="p-8 flex flex-col flex-1">
            <div class="flex items-center gap-3 text-[10px] font-bold text-gray-400 mb-4">
              <span>{{ pub.year || '2024' }}</span>
              <span class="w-1 h-1 bg-gray-200 rounded-full"></span>
              <span class="text-[#27628C]">{{ pub.journal || 'MedLabConvo' }}</span>
            </div>

            <h3 class="text-xl font-bold text-gray-900 mb-4 tracking-tight min-h-[3.5rem] line-clamp-2 transition-colors group-hover:text-[#27628C]">
              {{ pub.title }}
            </h3>

            <p class="text-sm text-gray-500 leading-relaxed line-clamp-3 mb-8">
              {{ pub.abstract || 'Access professional resources and insights designed to advance medical laboratory science and healthcare innovation.' }}
            </p>

            <div class="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between">
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-[#27628C] font-bold text-[10px]">
                  {{ (pub.authors || 'M').charAt(0) }}
                </div>
                <span class="text-[10px] font-bold text-gray-400 truncate max-w-[120px]">
                  {{ pub.authors || 'MedLabConvo' }}
                </span>
              </div>

              <NuxtLink 
                :to="pub.link || pub.pubLink || '#'" 
                target="_blank"
                class="flex items-center gap-2 text-[10px] font-bold text-[#27628C] group/btn"
              >
                Access
                <svg class="w-4 h-4 transition-transform group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </NuxtLink>
            </div>
          </div>
        </article>
      </div>

      <!-- Recorded Webinars Section (Coming Soon stylized) -->
      <div class="mt-32">
        <div class="bg-gray-900 rounded-[3rem] overflow-hidden relative isolate">
          <img src="@/assets/img/hero-background.jpeg" alt="" class="absolute inset-0 -z-10 h-full w-full object-cover opacity-20">
          <div class="p-12 sm:p-20 flex flex-col md:flex-row items-center justify-between gap-12">
            <div class="max-w-xl text-center md:text-left">
              <h2 class="text-sm font-bold text-blue-400 mb-6">Video Library</h2>
              <h3 class="text-lg sm:text-lg font-bold text-white mb-8">Recorded Webinars</h3>
              <p class="text-lg text-gray-400 font-light mb-10">
                We are currently migrating our extensive library of recorded webinars to this new hub. Stay tuned for expert sessions on diagnostics, research methodologies, and career development.
              </p>
              <div class="flex flex-col sm:flex-row gap-4">
                <a href="https://wa.link/bub9dk" class="bg-white text-gray-900 px-8 py-4 rounded-2xl text-sm font-bold hover:bg-blue-50 transition-all text-center">
                  Notify Me
                </a>
              </div>
            </div>
            <div class="relative w-full max-w-sm aspect-video bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl flex items-center justify-center group overflow-hidden shadow-sm border border-slate-200">
              <div class="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-purple-500/10"></div>
              <div class="relative z-10 w-20 h-20 rounded-full bg-white/10 flex items-center justify-center text-white/40 group-hover:scale-110 group-hover:text-white transition-all duration-500">
                <svg class="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <div class="absolute bottom-8 left-8 right-8">
                <div class="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div class="h-full w-1/3 bg-blue-500 rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { useGetPublishedPublications } from "@/composables/modules/publications/useGetPublishedPublications"
import { ref, computed, onMounted } from 'vue'

const { getPublishedPublications, publications, loading } = useGetPublishedPublications()
const activeCategory = ref('all')

onMounted(async () => {
  await getPublishedPublications()
})

const categories = computed(() => {
  if (!publications.value) return []
  const cats = publications.value
    .map(p => p.category)
    .filter((v, i, a) => v && a.indexOf(v) === i)
  return cats
})

const filteredPublications = computed(() => {
  if (!publications.value) return []
  if (activeCategory.value === 'all') return publications.value
  return publications.value.filter(p => p.category === activeCategory.value)
})
</script>

<style scoped>
@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes fade-in-up {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in {
  animation: fade-in 1s ease-out forwards;
}

.animate-fade-in-up {
  animation: fade-in-up 0.8s ease-out forwards;
}

.animation-delay-200 {
  animation-delay: 200ms;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-clamp: 2;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-clamp: 3;
}
</style>