<template>
  <main>
    <!-- Hero Section -->
    <div class="relative isolate overflow-hidden bg-[#27628C] py-24 sm:py-40">
      <div class="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]"></div>
      
      <div class="mx-auto max-w-7xl px-6 lg:px-8 relative z-10 flex flex-col items-center justify-center pt-16 text-center">
        <div class="max-w-3xl">
          <h1 class="text-2xl font-bold text-blue-200 mb-6 animate-fade-in tracking-normal">Audio & Visual Insights</h1>
          <h2 class="text-6xl sm:text-8xl lg:text-9xl font-bold tracking-tight text-white mb-8 animate-fade-in-up">LabCast</h2>
          <p class="text-2xl leading-8 text-blue-50 font-medium animate-fade-in-up animation-delay-200 max-w-2xl mx-auto">
            Conversations with laboratory scientists, public health experts, health innovators, and policy leaders shaping the future of healthcare.
          </p>
        </div>
      </div>
    </div>

    <!-- Latest Episode Section -->
    <div class="container mx-auto px-6 py-16">
      <div class="flex items-center gap-6 mb-12">
        <div class="w-2 h-12 bg-gradient-to-b from-[#27628C] to-blue-400 rounded-full"></div>
        <h1 class="text-lg font-extrabold text-gray-900 tracking-tight">Latest Episode</h1>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="bg-white rounded-3xl shadow-sm border border-slate-200 p-8 animate-pulse">
        <div class="flex flex-col lg:flex-row gap-8">
          <div class="w-full lg:w-96 h-64 bg-gray-200 rounded-2xl"></div>
          <div class="flex-1 space-y-4">
            <div class="h-8 bg-gray-200 rounded w-3/4"></div>
            <div class="h-4 bg-gray-200 rounded w-full"></div>
            <div class="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
        </div>
      </div>

      <div v-else-if="latestEpisode" class="group relative bg-white rounded-[2.5rem] shadow-sm border border-slate-200 overflow-hidden border border-gray-100 transition-all duration-500 hover:shadow-blue-900/10 active:scale-[0.99] animate-fade-in">
        <div class="flex flex-col lg:flex-row min-h-[450px]">
          <!-- Thumbnail Side -->
          <div class="lg:w-[45%] relative bg-gray-50 flex items-center justify-center p-6">
            <img 
              :src="latestEpisode.thumbnailUrl || latestEpisode.image" 
              :alt="latestEpisode.title" 
              class="w-full h-full max-h-[600px] object-contain drop-shadow-sm border border-slate-200 transition-transform duration-700 group-hover:scale-105" 
            />

            <div class="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            
            <div class="absolute top-8 left-8">
              <div class="bg-gray-900/90 backdrop-blur-md text-white px-5 py-2 rounded-2xl text-sm font-bold shadow-sm border border-slate-200">
                Season {{ latestEpisode.season }} • Episode {{ latestEpisode.episode }}
              </div>
            </div>
          </div>
          
          <!-- Content Side -->
          <div class="flex-1 p-10 lg:p-16 flex flex-col justify-between space-y-8 bg-white">
            <div class="space-y-6">
              <div class="flex items-center gap-4 text-[#27628C] font-bold text-sm">
                <span class="flex items-center gap-2">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                  {{ formatDate(latestEpisode.publishedAt) }}
                </span>
                <span class="w-1.5 h-1.5 bg-gray-300 rounded-full"></span>
                <span class="flex items-center gap-2">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  {{ latestEpisode.duration }} MINS
                </span>
              </div>

              <h3 class="text-lg lg:text-lg font-black text-gray-900 leading-[1.1] group-hover:text-[#27628C] transition-colors duration-300">
                {{ latestEpisode.title }}
              </h3>
              
              <p class="text-gray-600 text-xl leading-relaxed max-w-2xl line-clamp-4">
                {{ latestEpisode.description }}
              </p>
              
              <div class="flex flex-col sm:flex-row gap-6 pt-4">
                <div v-if="latestEpisode.hosts?.length" class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-[#27628C]">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                  </div>
                  <div>
                    <p class="text-sm text-gray-400 font-bold  tracking-wider">Hosted By</p>
                    <p class="text-sm font-bold text-gray-900">{{ latestEpisode.hosts.join(', ') }}</p>
                  </div>
                </div>
                <div v-if="latestEpisode.guest" class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path>
                    </svg>
                  </div>
                  <div>
                    <p class="text-sm text-gray-400 font-bold">Guest Speaker</p>
                    <p class="text-sm font-bold text-gray-900">{{ latestEpisode.guest }} ({{ latestEpisode.guestTitle }})</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Action Area -->
            <div class="pt-8 border-t border-gray-100 flex flex-wrap items-center gap-6">
              <span class="text-sm font-bold text-gray-400">Listen On</span>
              <div class="flex flex-wrap gap-3">
                <a :href="latestEpisode.spotifyUrl" target="_blank" class="p-3 bg-[#1DB954] text-white rounded-2xl hover:scale-110 active:scale-95 transition-all shadow-sm border border-slate-100 shadow-[#1DB954]/20">
                  <svg class="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.49 17.306c-.215.353-.674.464-1.024.25-2.85-1.742-6.438-2.138-10.665-1.173-.4.092-.804-.16-.897-.562-.092-.4.16-.804.562-.897 4.622-1.057 8.577-.6 11.776 1.353.352.214.464.676.248 1.029zm1.465-3.266c-.27.44-.846.58-1.287.31-3.26-2.003-8.23-2.585-12.086-1.415-.494.15-1.02-.128-1.17-.622-.15-.495.127-1.02.622-1.17 4.407-1.338 9.882-.686 13.62 1.61.442.272.583.847.312 1.287l-.01.011zm.126-3.41c-3.91-2.322-10.366-2.535-14.135-1.39-.6.182-1.24-.153-1.423-.754-.182-.6.153-1.24.754-1.422C8.35 6.075 15.485 6.32 20.02 9c.538.32.71 1.01.39 1.548-.32.535-1.01.71-1.55.39v-.008z"/></svg>
                </a>
                <a :href="latestEpisode.appleUrl" target="_blank" class="p-3 bg-gray-900 text-white rounded-2xl hover:scale-110 active:scale-95 transition-all shadow-sm border border-slate-100 shadow-gray-900/20">
                  <svg class="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M12.152 6.896c-.548 0-1.411-.516-2.438-.516-1.357 0-2.7 1.02-2.7 2.454 0 2.317 2.055 5.568 3.91 5.568 1.118 0 1.39-.532 2.464-.532 1.073 0 1.436.532 2.438.532 1.511 0 3.324-3.01 3.324-4.513 0-.084-.012-.172-.042-.257-.04-.112-.112-.224-.265-.33-.637-.487-1.454-.828-1.454-2.126 0-1.203.95-2.004 1.76-2.454a8 8 0 00-1.118-2.61c-.604-.888-1.233-1.748-2.162-1.748-.992 0-1.26.6-2.43.6s-1.438-.6-2.47-.6c-1.02 0-1.872.827-2.61 1.916a9.9 9.9 0 00-2.02 5.37c0 3.097 2.127 7.02 4.14 7.02 1.022 0 1.258-.6 2.428-.6 1.17 0 1.455.6 2.417.6 1.76 0 3.65-3.32 3.65-4.887 0-.022 0-.053-.002-.072-.34-.954-1.26-1.543-1.26-2.712z"/></svg>
                </a>
                <a :href="latestEpisode.youtubeUrl || defaultYoutubeUrl" target="_blank" class="p-3 bg-[#FF0000] text-white rounded-2xl hover:scale-110 active:scale-95 transition-all shadow-sm border border-slate-100 shadow-[#FF0000]/20">
                  <svg class="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div v-else-if="!loading" class="bg-white rounded-2xl shadow-sm border border-slate-100 p-12 text-center animate-fade-in">
        <div class="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
          <span class="text-lg">🎙️</span>
        </div>
        <h3 class="text-xl font-semibold text-gray-900 mb-2">No Latest Episode</h3>
        <p class="text-gray-600">Check back soon for our newest episode!</p>
      </div>
    </div>
    
    <!-- Video Section -->
    <div class="bg-gray-50 py-20">
      <div class="container mx-auto px-6">
        <LabCastVideo />
      </div>
    </div>

    <!-- All Episodes Section -->
    <div class="container mx-auto px-6 py-20">
      <div class="flex items-center justify-center mb-16">
        <div class="h-px bg-gray-200 flex-1"></div>
        <h2 class="text-lg font-bold text-gray-900 mx-8 tracking-tight">All Episodes</h2>
        <div class="h-px bg-gray-200 flex-1"></div>
      </div>

      <!-- Episodes Grid -->
      <div v-if="episodes.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        <div 
          v-for="(episode, index) in episodes" 
          :key="episode.id || (episode as any)._id"
          class="group relative flex flex-col bg-white rounded-3xl overflow-hidden transition-all duration-500 hover:-translate-y-3 animate-fade-in-up"
          :style="{ animationDelay: `${index * 100}ms` }"
        >
          <!-- Thumbnail -->
          <div class="relative bg-slate-50 overflow-hidden aspect-square border-b border-slate-50">
            <img 
              :src="episode.thumbnailUrl || episode.image" 
              :alt="episode.title"
              class="absolute inset-0 w-full h-full object-contain p-4 drop-shadow-md transition-transform duration-700 group-hover:scale-105"
            />

            <!-- Progress/Status Badge -->
            <div class="absolute top-4 left-4">
              <div class="bg-white/90 backdrop-blur-md text-slate-900 px-3 py-1 rounded-lg text-[10px] font-bold shadow-sm border border-slate-100">
                S{{ episode.season }} E{{ episode.episode }}
              </div>
            </div>
          </div>
          
          <!-- Card Content -->
          <div class="p-6 flex-1 flex flex-col justify-between border-x border-b border-slate-100 rounded-b-2xl">
            <div class="space-y-4">
              <div class="flex items-center justify-between text-[10px] font-bold text-slate-400">
                <span class="flex items-center gap-1.5">
                   <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                  {{ formatDate(episode.publishedAt) }}
                </span>
                <span class="flex items-center gap-1.5">
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  {{ episode.duration }} MIN
                </span>
              </div>
              
              <h3 class="text-lg font-bold text-slate-900 group-hover:text-[#27628C] transition-colors leading-tight line-clamp-2">
                {{ episode.title }}
              </h3>
              
              <p class="text-slate-500 text-sm leading-relaxed line-clamp-3">
                {{ episode.description }}
              </p>
            </div>

            <!-- Links -->
            <div class="flex items-center gap-2 pt-6 mt-6 border-t border-slate-50">
              <a :href="episode.spotifyUrl" target="_blank" class="flex-1 flex items-center justify-center py-2.5 bg-slate-50 text-slate-400 hover:bg-[#1DB954] hover:text-white rounded-xl transition-all active:scale-95 shadow-sm border border-slate-100 text-[10px] font-bold gap-2">
                 Spotify
              </a>
              <a :href="episode.appleUrl" target="_blank" class="flex-1 flex items-center justify-center py-2.5 bg-slate-50 text-slate-400 hover:bg-slate-900 hover:text-white rounded-xl transition-all active:scale-95 shadow-sm border border-slate-100 text-[10px] font-bold gap-2">
                 Apple
              </a>
              <a v-if="episode.youtubeUrl" :href="episode.youtubeUrl" target="_blank" class="flex-1 flex items-center justify-center py-2.5 bg-slate-50 text-slate-400 hover:bg-[#FF0000] hover:text-white rounded-xl transition-all active:scale-95 shadow-sm border border-slate-100 text-[10px] font-bold gap-2">
                 YouTube
              </a>
            </div>
          </div>

        </div>
      </div>

      <!-- Empty State -->
      <div v-else-if="!loading" class="text-center py-16 animate-fade-in">
        <div class="w-32 h-32 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
          <span class="text-xl">🎙️</span>
        </div>
        <h3 class="text-lg font-semibold text-gray-900 mb-2">No Episodes Available</h3>
        <p class="text-gray-600 text-lg">We're working on bringing you amazing content. Check back soon!</p>
      </div>
    </div>

    <!-- View All Button -->
    <div v-if="episodes.length > 0" class="flex justify-center mt-10">
      <a 
        href="https://open.spotify.com/show/04S2XZGd6gczoCXStIrh8e"
        target="_blank"
        class="group relative inline-block focus:outline-none focus:ring transform hover:scale-105 transition-transform duration-200"
      >
        <span class="absolute inset-0 translate-x-1.5 translate-y-1.5 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-lg transition-transform group-hover:translate-x-0 group-hover:translate-y-0"></span>
        <span class="relative inline-block px-8 py-3 text-sm font-bold text-black bg-white border-2 border-black rounded-lg group-hover:bg-yellow-50">
          View All Episodes on Spotify
        </span>
      </a>
    </div>
  </main>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useGetLabCasts } from "@/composables/modules/labcast/useGetLabCasts"
import LabCastVideo from '~/components/LabCastVideo.vue'


const { labcasts, loading } = useGetLabCasts()

// Default fallback YouTube URL
const defaultYoutubeUrl = "https://www.youtube.com/channel/UCQBppaTTQ6TyyCHA2XCxvBQ"

// Computed properties for better data handling
const episodes = computed(() => {
  if (!labcasts.value || !Array.isArray(labcasts.value)) return []
  return [...labcasts.value]
    .sort((a, b) => (a.position || 0) - (b.position || 0))
    .filter(episode => episode.isActive)
})

const latestEpisode = computed(() => {
  if (!episodes.value.length) return null
  return episodes.value[0]
})

// Date formatting function
const formatDate = (dateValue: Date | string | undefined) => {
  if (!dateValue) return 'N/A'
  const date = new Date(dateValue)
  if (isNaN(date.getTime())) return 'N/A'
  return date.toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}
</script>

<style scoped>
/* Add your custom animations and styles */
</style>
