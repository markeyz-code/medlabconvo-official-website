<template>
  <main class="min-h-screen bg-white">
    <!-- Hero Section: Premium Minimalist -->
    <div class="relative isolate overflow-hidden bg-[#27628C] py-24 sm:py-40">
      <div class="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]"></div>
      
      <div class="relative mx-auto max-w-7xl px-6 lg:px-8 flex flex-col items-center text-center">
        <h2 class="text-2xl font-bold text-blue-200 mb-8 animate-fade-in tracking-normal">
          Elevating Clinical Excellence
        </h2>
        <h1 class="text-6xl sm:text-8xl lg:text-9xl font-bold text-white leading-tight tracking-normal animate-fade-in-up">
          Programs
        </h1>
        <p class="mt-8 text-2xl text-blue-50 font-medium max-w-3xl leading-relaxed animate-fade-in-up delay-200">
          Dedicated initiatives designed to empower medical laboratory professionals and students through mentorship, skill acquisition, and career acceleration.
        </p>
      </div>
    </div>

    <!-- Active Programs Section -->
    <div class="py-32 px-6 bg-white relative -mt-16">
      <div class="max-w-7xl mx-auto">
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20 animate-fade-in">
          <div>
            <h2 class="text-[10px] font-bold text-[#27628C] tracking-normal mb-4">Opportunities</h2>
            <h3 class="text-4xl md:text-5xl font-bold text-gray-900  tracking-tight">Current Initiatives</h3>
          </div>
          <p class="text-gray-400 text-sm font-medium  tracking-normal" v-if="!loading">
            {{ activePrograms.length }} Active Programs
          </p>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
           <div v-for="n in 3" :key="n" class="space-y-8 animate-pulse">
              <div class="aspect-[3/4] bg-gray-50 rounded-[2.5rem]"></div>
              <div class="h-4 bg-gray-50 rounded w-1/4"></div>
              <div class="h-8 bg-gray-50 rounded"></div>
              <div class="h-20 bg-gray-50 rounded"></div>
           </div>
        </div>

        <!-- Empty State -->
        <div v-else-if="activePrograms.length === 0" class="text-center py-32 bg-gray-50 rounded-[4rem] border border-dashed border-gray-200">
           <p class="text-sm font-black text-gray-400  tracking-normal">No Active Initiatives at this Moment</p>
           <p class="mt-4 text-gray-500 font-light translate-y-1">Check back soon for new opportunities.</p>
        </div>

        <!-- Programs Grid -->
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
          <div 
            v-for="(program, index) in activePrograms" 
            :key="program.slug || index"
            class="group space-y-8 animate-fade-in-up"
            :style="{ animationDelay: `${index * 100}ms` }"
          >
            <!-- Poster Thumbnail -->
            <div 
              @click="navigateToProgram(program)"
              class="relative aspect-[3/4] rounded-[3rem] bg-gray-50 border border-gray-100 overflow-hidden shadow-sm transition-all duration-700 group-hover:shadow-sm border border-slate-200 group-hover:border-transparent cursor-pointer"
            >
               <img 
                v-if="program.image || (program.images && program.images[0])"
                :src="program.image || program.images?.[0]" 
                :alt="program.title"
                class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              >
              <div v-else class="w-full h-full flex items-center justify-center text-lg grayscale opacity-20">📊</div>
              
              <div class="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-10">
                <span class="text-white text-sm font-black  tracking-normal flex items-center gap-2">
                  View Detail
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                </span>
              </div>

              <div class="absolute top-8 left-8">
                <span class="bg-white/90 backdrop-blur-md text-gray-900 px-4 py-1.5 rounded-xl text-[9px] font-black  tracking-normal shadow-sm">
                  {{ program.category }}
                </span>
              </div>
            </div>
            
            <!-- Meta & Content -->
            <div class="space-y-6 px-4">
              <div class="flex items-center gap-4 text-[10px] font-black text-gray-300  tracking-normal">
                <span class="flex items-center gap-2">
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                  {{ program.duration || 'Flexible' }}
                </span>
                <div class="w-1 h-1 rounded-full bg-gray-200"></div>
                <span>{{ formatDate(program.createdAt) }}</span>
              </div>
              
              <h3 class="text-lg font-black text-gray-900 leading-tight group-hover:text-[#27628C] transition-colors  tracking-tight">
                {{ program.title }}
              </h3>
              
              <p class="text-gray-500 text-sm leading-relaxed line-clamp-3 font-light">
                {{ program.description }}
              </p>
              
              <!-- CTAs -->
              <div class="flex items-center gap-3 pt-6 border-t border-gray-50">
                <button 
                  @click="navigateToProgram(program)"
                  class="flex-1 bg-gray-50 text-gray-900 px-6 py-4 rounded-xl text-[10px] font-black  tracking-normal hover:bg-gray-100 transition-all text-center"
                >
                  Learn More
                </button>
                <template v-if="program.status === 'active' && (program.externalFormLink || program.formFields?.length)">
                   <a 
                    v-if="program.externalFormLink"
                    :href="program.externalFormLink"
                    target="_blank"
                    class="flex-1 bg-gray-900 text-white px-6 py-4 rounded-xl text-[10px] font-black  tracking-normal hover:bg-[#27628C] transition-all text-center shadow-sm border border-slate-200 hover:shadow-sm border border-slate-200 flex items-center justify-center gap-2"
                  >
                    Apply Now
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
                  </a>
                  <button 
                    v-else
                    @click="applyToProgram(program)"
                    class="flex-1 bg-gray-900 text-white px-6 py-4 rounded-xl text-[10px] font-black  tracking-normal hover:bg-[#27628C] transition-all text-center shadow-sm border border-slate-200 hover:shadow-sm border border-slate-200"
                  >
                    Enroll Now
                  </button>
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- CTA Section: Impactful -->
    <div class="bg-[#27628C] py-32 px-6 relative overflow-hidden">
      <div class="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]"></div>
      <div class="max-w-4xl mx-auto text-center space-y-10 relative z-10">
        <h2 class="text-sm font-bold text-blue-200 tracking-normal animate-fade-in">The Future Of The Lab</h2>
        <h3 class="text-lg md:text-xl font-bold text-white leading-tight  tracking-normal">
          Your Career, <span class="text-blue-200 ">Accelerated.</span>
        </h3>
        <p class="text-xl text-blue-50 font-medium leading-relaxed">
          Whether you're a student starting your journey or a veteran professional seeking leadership roles, our programs provide the roadmap to excellence.
        </p>
        <div class="pt-10 flex flex-col sm:flex-row items-center justify-center gap-6">
          <NuxtLink to="/products" class="w-full sm:w-auto bg-white text-[#27628C] px-12 py-5 rounded-2xl text-[11px] font-bold tracking-normal hover:bg-blue-50 transition-all shadow-sm border border-slate-200">
            Explore Shop
          </NuxtLink>
          <NuxtLink to="/resources" class="w-full sm:w-auto border border-white/20 text-white px-12 py-5 rounded-2xl text-[11px] font-bold tracking-normal hover:bg-white/5 transition-all">
            Browse Resources
          </NuxtLink>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { useGetPrograms } from "@/composables/modules/programs/useGetPrograms"
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const { programs, loading } = useGetPrograms()
const router = useRouter()

// Filter active programs
const activePrograms = computed(() => {
  if (!programs.value) return []
  return programs?.value?.filter(p => p.status === 'active')
})

const navigateToProgram = (program: any) => {
  router.push(`/programs/${program.slug}`)
}

const applyToProgram = (program: any) => {
  router.push(`/programs/${program.slug}/apply`)
}

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
  title: 'Programs - MedLabConvo',
  meta: [
    { name: 'description', content: 'Professional programs for medical laboratory professionals.' }
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
</style>