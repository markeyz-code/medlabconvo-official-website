<template>
  <main class="min-h-screen bg-white">
    <!-- Hero Section -->
    <div class="relative isolate overflow-hidden bg-[#27628C] py-24 sm:py-40">
      <div class="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]"></div>
      
      <div class="mx-auto max-w-7xl px-6 lg:px-8 relative z-10 flex flex-col items-center justify-center pt-16 text-center">
        <div class="max-w-3xl">
          <h1 class="text-2xl font-bold text-blue-200 mb-6 animate-fade-in tracking-normal">Research, Articles & Insights</h1>
          <h2 class="text-6xl sm:text-8xl lg:text-9xl font-bold tracking-tight text-white mb-8 animate-fade-in-up">Journo</h2>
          <p class="text-2xl leading-8 text-blue-50 font-medium animate-fade-in-up animation-delay-200 max-w-2xl mx-auto">
            Research publications, clinical perspectives, and curated articles at the intersection of laboratory science and global health.
          </p>
        </div>
      </div>
    </div>

    <!-- ==================== PUBLICATIONS (Journo) ==================== -->
    <div>
      <!-- Latest Publication: High Impact Feature -->
      <div class="relative pt-12 pb-32 px-6">
        <div class="max-w-7xl mx-auto">
          <!-- Loading State -->
          <div v-if="pubLoading" class="bg-gray-50 rounded-[3rem] h-[600px] animate-pulse flex items-center justify-center">
             <div class="w-12 h-12 border-4 border-gray-200 border-t-[#27628C] rounded-full animate-spin"></div>
          </div>

          <!-- Latest Content -->
          <div v-else-if="latestPublication" class="group relative bg-white rounded-[3rem] overflow-hidden border border-gray-100 transition-all duration-500 animate-fade-in-up">
            <div class="flex flex-col lg:flex-row min-h-[600px]">
              <!-- Visual Side -->
              <div class="lg:w-1/2 relative bg-gray-50 flex items-center justify-center p-12 overflow-hidden">
                 <img 
                  v-if="latestPublication.images && latestPublication.images.length"
                  :src="latestPublication.images[0]" 
                  :alt="latestPublication.title"
                  class="w-full h-full object-contain transition-transform duration-1000 group-hover:scale-105"
                >
                <div v-else class="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center text-xl">📄</div>
                
                <div class="absolute top-12 left-12">
                  <span class="bg-gray-900 text-white px-6 py-2 rounded-full text-[10px] font-black  tracking-normal">
                    FEATURED PUBLICATION
                  </span>
                </div>
              </div>
              
              <!-- Information Side -->
              <div class="lg:w-1/2 p-12 lg:p-20 flex flex-col justify-between">
                <div class="space-y-12">
                  <div class="flex items-center gap-6">
                    <div class="flex flex-col">
                      <span class="text-[10px] font-black text-gray-300  tracking-normal mb-1">Published</span>
                      <span class="text-sm font-bold text-gray-900">{{ formatDate(latestPublication.createdAt) }}</span>
                    </div>
                    <div class="h-8 w-px bg-gray-100"></div>
                    <div class="flex flex-col">
                      <span class="text-[10px] font-black text-gray-300  tracking-normal mb-1">Author</span>
                      <span class="text-sm font-bold text-gray-900">{{ latestPublication.authors }}</span>
                    </div>
                  </div>

                  <h3 class="text-4xl md:text-5xl font-black text-gray-900 leading-[1.1]  tracking-tight group-hover:text-[#27628C] transition-colors duration-300">
                    {{ latestPublication.title }}
                  </h3>
                  
                  <p class="text-gray-500 text-lg font-light leading-relaxed line-clamp-4">
                    {{ latestPublication.abstract }}
                  </p>
                  
                  <div class="flex flex-wrap items-center gap-3">
                    <span class="bg-blue-50 text-[#27628C] px-4 py-1.5 rounded-xl text-[10px] font-black  tracking-normal border border-blue-100">
                      {{ latestPublication.journal }}
                    </span>
                    <span class="bg-gray-50 text-gray-400 px-4 py-1.5 rounded-xl text-[10px] font-black  tracking-normal border border-gray-100">
                      {{ latestPublication.category }}
                    </span>
                  </div>
                </div>

                <div class="pt-16">
                  <NuxtLink 
                    :to="latestPublication.link || latestPublication.pubLink"
                    target="_blank"
                    class="inline-flex items-center justify-center bg-gray-900 text-white px-12 py-5 rounded-2xl text-sm font-black  tracking-normal hover:bg-gray-800 transition-all"
                  >
                    Read Full Paper
                    <svg class="w-4 h-4 ml-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>

          <!-- No Data State -->
          <div v-else-if="!pubLoading" class="text-center py-32 bg-gray-50 rounded-[3rem] border border-dashed border-gray-200">
             <p class="text-sm font-black text-gray-400  tracking-normal">No publications found</p>
          </div>
        </div>
      </div>

      <!-- Archive Section -->
      <div class="py-32 px-6 bg-white">
        <div class="max-center max-w-7xl mx-auto">
          <div class="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
            <div>
              <h2 class="text-[10px] font-bold text-[#27628C] mb-4">The Archive</h2>
              <h3 class="text-4xl md:text-5xl font-bold text-gray-900 tracking-normal">All Publications</h3>
            </div>
            <p class="text-gray-400 text-sm font-medium">
              Showing {{ otherPublications.length }} publications
            </p>
          </div>

          <div v-if="pubLoading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
             <div v-for="n in 3" :key="n" class="space-y-8 animate-pulse">
                <div class="aspect-square bg-gray-50 rounded-[2.5rem]"></div>
                <div class="h-4 bg-gray-50 rounded w-1/4"></div>
                <div class="h-8 bg-gray-50 rounded"></div>
                <div class="h-20 bg-gray-50 rounded"></div>
             </div>
          </div>

          <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
            <article 
              v-for="(publication, index) in otherPublications" 
              :key="publication.id || (publication as any)._id"
              class="group space-y-8 animate-fade-in-up"
              :style="{ animationDelay: `${index * 100}ms` }"
            >
              <NuxtLink :to="publication.link || publication.pubLink" target="_blank" class="block space-y-8 h-full">
                <!-- Grid Thumbnail -->
                <div class="relative aspect-square rounded-[2.5rem] bg-gray-50 border border-gray-100 overflow-hidden transition-all duration-700 group-hover:border-transparent">
                   <img 
                    v-if="publication.images && publication.images.length"
                    :src="publication.images[0]" 
                    :alt="publication.title"
                    class="w-full h-full object-contain p-8 transition-transform duration-700 group-hover:scale-110"
                  >
                  <div v-else class="w-full h-full flex items-center justify-center text-lg grayscale opacity-20">📄</div>
                  
                  <div class="absolute top-8 left-8">
                    <span class="bg-white/90 backdrop-blur-md text-gray-900 px-4 py-1.5 rounded-xl text-[9px] font-bold">
                      {{ publication.category }}
                    </span>
                  </div>
                </div>
                
                <!-- Meta & Content -->
                <div class="space-y-4 px-4">
                  <div class="flex items-center gap-4 text-[10px] font-bold text-gray-300">
                    <span>{{ publication.year }}</span>
                    <div class="w-1 h-1 rounded-full bg-gray-200"></div>
                    <span class="truncate max-w-[150px]">{{ publication.journal }}</span>
                  </div>
                  
                  <h3 class="text-lg font-bold text-gray-900 leading-tight group-hover:text-[#27628C] transition-colors tracking-tight">
                    {{ publication.title }}
                  </h3>
                  
                  <p class="text-gray-500 text-sm leading-relaxed line-clamp-3 font-light">
                    {{ publication.abstract }}
                  </p>
                  
                  <div class="flex items-center gap-3 pt-6 border-t border-gray-50">
                     <div class="w-8 h-8 rounded-full bg-gray-900 flex items-center justify-center text-white text-[10px] font-bold">
                       {{ (publication.authors || 'A').charAt(0) }}
                     </div>
                     <div class="flex flex-col">
                       <span class="text-[9px] font-bold text-gray-900 tracking-normal">{{ publication.authors }}</span>
                       <span class="text-[8px] font-bold text-gray-300">{{ formatDate(publication.createdAt) }}</span>
                     </div>
                  </div>
                </div>
              </NuxtLink>
            </article>
          </div>
        </div>
      </div>

      <!-- Substack Newsletter -->
      <div class="bg-gray-900 py-32 px-6">
        <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
             <h2 class="text-sm font-bold text-blue-400 mb-8">Stay Updated</h2>
             <h3 class="text-lg md:text-xl font-bold text-white leading-tight tracking-normal mb-10">
               Delivered to your<br><span class="text-blue-500">digital doorstep.</span>
             </h3>
             <p class="text-xl text-gray-400 font-light leading-relaxed max-w-lg">
               Research, insights, and critical perspectives delivered directly to your inbox. No noise, just science.
             </p>
          </div>
          <div class="relative overflow-hidden rounded-[3rem] bg-white p-2">
             <iframe 
                src="https://mlcjourno.substack.com/embed" 
                width="100%" 
                height="400"
                frameborder="0" 
                scrolling="no"
                class="w-full"
              ></iframe>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useGetPublications } from "@/composables/modules/publications/useGetPublications"

// ==================== PUBLICATIONS (Journo) ====================
const { publications, loading: pubLoading } = useGetPublications()

const publishedPublications = computed(() => {
  if (!publications.value) return []
  return publications.value.filter((pub: any) => pub.status === 'published')
})

const latestPublication = computed(() => {
  if (publishedPublications.value.length === 0) return null
  return [...publishedPublications.value].sort((a: any, b: any) => {
    const aDate = new Date(a.createdAt || 0).getTime()
    const bDate = new Date(b.createdAt || 0).getTime()
    return bDate - aDate
  })[0]
})

const otherPublications = computed(() => {
  if (!latestPublication.value) return publishedPublications.value
  const latestId = (latestPublication.value as any).id || (latestPublication.value as any)._id
  return publishedPublications.value.filter((pub: any) => {
     const pubId = (pub as any).id || (pub as any)._id
     return pubId !== latestId
  })
})

// ==================== SHARED ====================
const formatDate = (dateString: string | undefined): string => {
  if (!dateString) return 'N/A'
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

// SEO
useHead({
  title: 'Journo | Research, Articles & Insights | MedLabConvo',
  meta: [
    { name: 'description', content: 'Research publications, clinical perspectives, and curated articles at the intersection of laboratory science and global health.' },
    { property: 'og:title', content: 'Journo - Research, Articles & Insights' },
    { property: 'og:description', content: 'Explore premium articles, research publications, and insights in medical laboratory science.' },
    { property: 'og:image', content: '/images/medlabconvo-og-image.jpg' },
    { property: 'og:url', content: 'https://medlabconvo.com/journo' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Journo | MedLabConvo' },
    { name: 'twitter:description', content: 'Research publications and clinical perspectives at the intersection of laboratory science and global health.' }
  ]
})
</script>

<style scoped>
@keyframes fade-in-up {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}
.animate-fade-in-up { animation: fade-in-up 0.8s ease-out forwards; }
.animate-fade-in { animation: fade-in 1s ease-out forwards; }
.delay-200 { animation-delay: 200ms; }
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>