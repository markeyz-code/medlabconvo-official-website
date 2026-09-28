<template>
  <main class="min-h-screen bg-white">
    <!-- Loading State -->
    <div v-if="loading" class="flex flex-col items-center justify-center min-h-screen">
      <div class="relative w-20 h-20">
        <div class="absolute inset-0 border-4 border-[#27628C]/10 rounded-full"></div>
        <div class="absolute inset-0 border-4 border-[#27628C] rounded-full border-t-transparent animate-spin"></div>
      </div>
      <p class="mt-8 text-sm font-bold text-[#27628C] animate-pulse  tracking-normal">Initialising Program...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="flex flex-col items-center justify-center min-h-screen p-8 text-center">
      <div class="w-24 h-24 bg-rose-50 rounded-[2.5rem] flex items-center justify-center mb-8 border border-rose-100">
        <Icon name="lucide:alert-circle" class="w-12 h-12 text-rose-500" />
      </div>
      <h2 class="text-xl font-black text-gray-900 mb-4 tracking-tight leading-tight">Identity not found</h2>
      <p class="text-gray-500 mb-10 max-w-md font-medium leading-relaxed">{{ error }}</p>
      <NuxtLink to="/programs" class="inline-flex items-center gap-3 bg-gray-900 text-white px-10 py-4 rounded-2xl font-bold text-sm hover:scale-105 active:scale-95 transition-all shadow-sm border border-slate-200 shadow-gray-900/10">
        <Icon name="lucide:refresh-cw" class="w-4 h-4" />
        Return to directory
      </NuxtLink>
    </div>

    <!-- Main Content -->
    <div v-else-if="program" class="animate-in fade-in duration-1000">
      <!-- Dynamic Hero Section -->
      <section class="relative min-h-[85vh] flex items-center pt-24 pb-12 overflow-hidden">
        <!-- Floating Visual Elements -->
        <div class="absolute top-[10%] right-[-5%] w-[40vw] h-[40vw] bg-[#27628B]/5 rounded-full blur-[120px] animate-pulse"></div>
        <div class="absolute bottom-[10%] left-[-5%] w-[30vw] h-[30vw] bg-[#DE6129]/5 rounded-full blur-[100px]"></div>

        <div class="container mx-auto px-6 lg:px-12 relative z-10">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            <!-- Hero Text Content -->
            <div class="space-y-10 order-2 lg:order-1">
              <div class="space-y-4">
                <NuxtLink to="/programs" class="inline-flex items-center gap-2 text-[#27628B] font-black text-xs  tracking-normal hover:translate-x-1 transition-transform mb-6">
                  <Icon name="lucide:arrow-left" class="w-4 h-4" />
                  Directory
                </NuxtLink>
                
                <div class="flex items-center gap-3">
                  <span class="px-4 py-1.5 bg-[#27628C] text-white text-sm font-black  tracking-normal rounded-full">
                    {{ program.category }}
                  </span>
                  <span v-if="program.duration" class="px-4 py-1.5 bg-gray-100 text-gray-900 text-sm font-black  tracking-normal rounded-full flex items-center gap-2 border border-gray-200/50">
                    <Icon name="lucide:clock" class="w-4 h-4" />
                    {{ program.duration }}
                  </span>
                </div>

                <h1 class="text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-[1.1]">
                  {{ program.title }}
                </h1>
              </div>

              <div class="prose prose-slate max-w-2xl text-gray-600 leading-relaxed text-lg" v-html="formattedDescription"></div>

              <!-- Main CTAs -->
              <div v-if="program.status === 'active'" class="flex flex-wrap items-center gap-5 pt-8">
                <a 
                  v-if="program.externalFormLink"
                  :href="program.externalFormLink"
                  target="_blank"
                  class="h-16 px-12 bg-[#27628C] text-white rounded-[1.2rem] font-bold text-sm hover:scale-105 active:scale-95 transition-all flex items-center justify-center space-x-3 shadow-sm border border-slate-200 shadow-blue-900/20"
                >
                  <span>Enrol Now</span>
                  <Icon name="lucide:sparkles" class="w-5 h-5" />
                </a>

                <NuxtLink 
                  v-else-if="program.form"
                  :to="`/forms/submit/${program.form.slug || program.form._id}`"
                  class="h-16 px-12 bg-[#27628C] text-white rounded-[1.2rem] font-bold text-sm hover:scale-105 active:scale-95 transition-all flex items-center justify-center space-x-3 shadow-sm border border-slate-200 shadow-blue-900/20"
                >
                  <span>Enrol Now</span>
                  <Icon name="lucide:sparkles" class="w-5 h-5" />
                </NuxtLink>

                <NuxtLink 
                  v-else-if="program.formFields && program.formFields.length > 0"
                  :to="`/programs/${program.slug}/apply`"
                  class="h-16 px-12 bg-[#27628C] text-white rounded-[1.2rem] font-bold text-sm hover:scale-105 active:scale-95 transition-all flex items-center justify-center space-x-3 shadow-sm border border-slate-200 shadow-blue-900/20"
                >
                  <span>Apply Now</span>
                  <Icon name="lucide:sparkles" class="w-5 h-5" />
                </NuxtLink>
                
                <button @click="shareProgram" class="h-16 px-10 bg-white text-gray-900 border-2 border-gray-100 rounded-[1.2rem] font-bold text-sm hover:bg-gray-50 active:scale-95 transition-all flex items-center justify-center space-x-3">
                  <Icon name="lucide:share-2" class="w-5 h-5" />
                  <span>Share Access</span>
                </button>
              </div>
              <div v-else class="flex flex-wrap items-center gap-5 pt-8">
                <div class="flex items-center gap-3 h-16 px-10 bg-rose-50 text-rose-600 rounded-[1.2rem] font-bold text-sm border border-rose-100">
                  <Icon name="lucide:lock" class="w-5 h-5" />
                  <span>Registration Closed / Paused</span>
                </div>
                
                <button @click="shareProgram" class="h-16 px-10 bg-white text-gray-900 border-2 border-gray-100 rounded-[1.2rem] font-bold text-sm hover:bg-gray-50 active:scale-95 transition-all flex items-center justify-center space-x-3">
                  <Icon name="lucide:share-2" class="w-5 h-5" />
                  <span>Share Access</span>
                </button>
              </div>
            </div>

            <!-- Main Imagery -->
            <div class="relative order-1 lg:order-2">
              <div class="relative rounded-[3rem] overflow-hidden shadow-[0_40px_100px_-20px_rgba(39,98,140,0.25)] border-8 border-white group">
                <img 
                  :src="program.image || (program.images && program.images[0])" 
                  class="w-full aspect-[4/5] object-cover transition-transform duration-1000 group-hover:scale-110"
                  :alt="program.title"
                  @error="(e) => e.target.style.display = 'none'"
                />
                
                <!-- Overlay Gradient -->
                <div class="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
              </div>
              
              <!-- Floating Pill -->
              <div class="absolute -bottom-6 -right-6 md:-right-10 bg-white/10 backdrop-blur-3xl border border-white/20 p-6 rounded-[2rem] shadow-sm border border-slate-200 animate-float max-w-[240px]">
                <div class="flex items-center gap-4 mb-3">
                  <!-- <div class="w-10 h-10 rounded-full bg-[#DE6129] flex items-center justify-center shadow-sm border border-slate-100 shadow-orange-500/30">
                    <Icon name="lucide:graduation-cap" class="w-5 h-5 text-white" />
                  </div> -->
                  <p class="text-xs font-black text-gray-900 ">Interactive learning</p>
                </div>
                <p class="text-sm text-gray-500 font-bold leading-relaxed">Certified curriculum designed by clinical diagnostic experts.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      <!-- Deep Dive Sections Container -->
      <div class="bg-[#F8FAFC]">
        
        <!-- Scientific Speakers & Mentors -->
        <section v-if="program.speakers?.length" class="py-32 container mx-auto px-6 lg:px-12 relative overflow-hidden">
          <!-- Abstract Decor -->
          <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[#27628C]/5 rounded-full blur-[180px] -z-10"></div>
          
          <div class="text-center mb-24 space-y-4">
            <h3 class="text-xs font-black text-[#27628C]  tracking-normal">Faculty & Mentors</h3>
            <h2 class="text-lg md:text-xl font-black text-gray-900 tracking-tight">Scientific Experts</h2>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 text-center">
            <div 
              v-for="(speaker, i) in program.speakers" 
              :key="i"
              class="group relative bg-white border border-slate-100 p-10 rounded-[3rem] shadow-sm hover:shadow-sm border border-slate-200 hover:shadow-slate-200/50 hover:-translate-y-2 transition-all duration-500 cursor-pointer"
              @click="openSpeakerModal(speaker)"
            >
              <div class="flex flex-col items-center space-y-6">
                <!-- Avatar -->
                <div class="relative w-32 h-32">
                  <div class="absolute inset-0 bg-gradient-to-tr from-[#27628C] to-[#DE6129] rounded-full blur-xl opacity-0 group-hover:opacity-20 transition-opacity"></div>
                  <img 
                    :src="speaker.image || '/images/speaker-placeholder.jpg'" 
                    class="relative w-full h-full object-cover rounded-full border-4 border-white shadow-sm border border-slate-200 group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <!-- Info -->
                <div class="space-y-4">
                  <h4 class="text-xl font-black text-gray-900 tracking-tight">{{ speaker.name }}</h4>
                  <div class="w-10 h-1 bg-[#DE6129]/20 mx-auto rounded-full group-hover:w-16 transition-all duration-500"></div>
                  <p class="text-sm font-medium text-gray-500 leading-relaxed line-clamp-3">
                    {{ speaker.bio }}
                  </p>
                  
                  <button class="text-sm font-black  tracking-normal text-[#27628C] hover:text-[#DE6129] transition-colors pt-2">
                    Read Biography
                  </button>
                </div>
              </div>

              <!-- Decorative Decor -->
              <div class="absolute top-8 right-10 opacity-0 group-hover:opacity-100 transition-opacity text-[#DE6129]">
                 <Icon name="lucide:plus-circle" class="w-5 h-5" />
              </div>
            </div>
          </div>
        </section>

        <!-- Highlights & Insights -->
        <section v-if="program.highlights?.length" class="py-32 container mx-auto px-6 lg:px-12">
          <div class="text-center mb-20 space-y-4">
            <h3 class="text-xs font-black text-[#DE6129]  tracking-normal">Expert Perspectives</h3>
            <h2 class="text-lg font-black text-gray-900 tracking-tight">Core Highlights</h2>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div 
              v-for="(highlight, i) in program.highlights" 
              :key="i"
              class="group relative bg-white p-10 rounded-[2.5rem] border border-slate-200/50 hover:border-[#27628C]/30 transition-all duration-500 hover:-translate-y-2"
            >
              <!-- <div class="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-[#27628C]/5 group-hover:text-[#27628C] mb-8 transition-colors">
                <Icon :name="i % 2 === 0 ? 'lucide:terminal' : 'lucide:smartphone'" class="w-7 h-7" />
              </div> -->
              <h4 class="text-lg font-black text-gray-900 mb-4 tracking-tight leading-tight">{{ highlight.title }}</h4>
              <p class="text-sm text-gray-500 leading-relaxed font-medium">{{ highlight.description }}</p>
              
              <!-- Subtle index -->
              <span class="absolute top-8 right-10 text-[40px] font-black text-slate-100 group-hover:text-[#27628C]/10 transition-colors pointer-events-none">0{{ i + 1 }}</span>
            </div>
          </div>
        </section>

        <!-- Focus Areas vs Outcomes (Intelligent De-duplication) -->
        <section class="py-32 bg-white relative overflow-hidden">
          <div class="container mx-auto px-6 lg:px-12">
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-16">
              
              <!-- Left Column: Outcomes -->
              <div class="lg:col-span-5 space-y-12">
                <div class="space-y-4">
                  <h3 class="text-xs font-black text-[#27628C]  tracking-normal">Knowledge Pillars</h3>
                  <h2 class="text-lg font-black text-gray-900 tracking-tight">Curriculum Focus</h2>
                </div>

                <div class="space-y-4">
                  <div 
                    v-for="(area, i) in (program.focusAreas || [])" 
                    :key="i"
                    class="p-6 bg-slate-50 border border-slate-100 rounded-2xl flex items-center gap-6 group hover:bg-[#27628C] transition-all duration-300"
                  >
                    <div class="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-sm font-black text-slate-900 group-hover:scale-90 transition-transform">
                      {{ i + 1 }}
                    </div>
                    <span class="text-sm font-bold text-slate-700 group-hover:text-white transition-colors">{{ area }}</span>
                  </div>
                </div>
              </div>

              <!-- Right Column: Visual Card -->
              <div class="lg:col-span-7" v-if="!areOutcomesSame">
                <div class="relative h-full min-h-[500px] bg-[#27628C] rounded-[3rem] p-12 lg:p-20 overflow-hidden flex flex-col justify-center">
                  <!-- Abstract Shapes -->
                  <div class="absolute top-[-20%] right-[-10%] w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
                  
                  <div class="relative z-10 space-y-12">
                    <div class="space-y-2">
                       <h3 class="text-xs font-black text-white/60  tracking-normal">Future Impact</h3>
                       <h2 class="text-xl lg:text-lg font-black text-white tracking-tight">Key Outcomes</h2>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                       <div v-for="(outcome, i) in program.outcomes" :key="i" class="space-y-3">
                          <Icon name="lucide:badge-check" class="w-6 h-6 text-[#DE6129]" />
                          <p class="text-sm font-bold text-white leading-relaxed">{{ outcome }}</p>
                       </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        <!-- Program Schedule -->
        <section v-if="program.keyResponsibilities?.length" class="py-32 bg-slate-50 relative overflow-hidden">
          <div class="container mx-auto px-6 lg:px-12">
            <div class="text-center mb-16 space-y-4">
              <h3 class="text-xs font-black text-[#DE6129]  tracking-normal">Curriculum Timeline</h3>
              <h2 class="text-lg font-black text-gray-900 tracking-tight">Program Schedule</h2>
            </div>
            
            <div class="max-w-4xl mx-auto">
              <div class="space-y-6">
                <div 
                  v-for="(schedule, i) in program.keyResponsibilities" 
                  :key="i"
                  class="p-8 bg-white border border-slate-200 rounded-3xl flex flex-col md:flex-row md:items-center gap-6 hover:shadow-sm border border-slate-200 transition-all duration-300 hover:-translate-y-1"
                >
                  <div class="w-14 h-14 shrink-0 rounded-2xl bg-[#27628C]/10 flex items-center justify-center text-[#27628C]">
                    <Icon name="lucide:calendar" class="w-7 h-7" />
                  </div>
                  <div>
                    <h4 class="text-lg font-bold text-gray-900">{{ schedule }}</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Media Gallery -->
        <section v-if="program.images?.length > 1" class="py-32 container mx-auto px-6 lg:px-12">
          <div class="text-center mb-20 space-y-4">
            <h3 class="text-xs font-black text-[#DE6129]  tracking-normal">Visual Documentation</h3>
            <h2 class="text-lg font-black text-gray-900 tracking-tight">Gallery & Media</h2>
          </div>

          <div class="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
            <div 
              v-for="(img, i) in program.images" 
              :key="i"
              class="relative rounded-[2rem] overflow-hidden border-4 border-white shadow-sm border border-slate-200 hover:scale-[1.02] transition-transform duration-500 group"
            >
              <img :src="img" class="w-full object-cover">
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-8 flex items-end">
                <p class="text-white text-sm font-black  tracking-normal">{{ program.title }} / View {{ i + 1 }}</p>
              </div>
            </div>
          </div>
        </section>

      </div>

      <!-- Action Footer -->
      <section class="py-32 bg-gray-900 overflow-hidden relative">
          <!-- Abstract Background -->
          <div class="absolute top-0 right-0 w-[500px] h-[500px] bg-[#27628B]/10 rounded-full blur-[150px]"></div>
          
          <div class="container mx-auto px-6 text-center space-y-12 relative z-10">
             <div class="max-w-3xl mx-auto space-y-4">
                <h2 class="text-lg md:text-xl font-black text-white tracking-tight leading-tight">Ready to transform your professional journey?</h2>
                <p class="text-gray-400 font-medium text-lg">Secure your spot today</p>
             </div>
             
             <div class="flex flex-wrap justify-center gap-6">
                <a 
                  v-if="program.externalFormLink"
                  :href="program.externalFormLink"
                  target="_blank"
                  class="h-16 px-16 bg-[#27628C] text-white rounded-[1.2rem] font-bold text-sm hover:scale-105 active:scale-95 transition-all flex items-center justify-center shadow-sm border border-slate-200 shadow-blue-900/40"
                >
                  Enrol Today
                </a>

                <NuxtLink 
                  v-else-if="program.form"
                  :to="`/forms/submit/${program.form.slug || program.form._id}`"
                  class="h-16 px-16 bg-[#27628C] text-white rounded-[1.2rem] font-bold text-sm hover:scale-105 active:scale-95 transition-all flex items-center justify-center shadow-sm border border-slate-200 shadow-blue-900/40"
                >
                  Enrol Today
                </NuxtLink>

                <NuxtLink 
                  v-else-if="program.formFields && program.formFields.length > 0"
                  :to="`/programs/${program.slug}/apply`"
                  class="h-16 px-16 bg-[#27628C] text-white rounded-[1.2rem] font-bold text-sm hover:scale-105 active:scale-95 transition-all flex items-center justify-center shadow-sm border border-slate-200 shadow-blue-900/40"
                >
                  Apply Today
                </NuxtLink>

                <button @click="shareProgram" class="h-16 px-12 bg-white/5 text-white border border-white/10 rounded-[1.2rem] font-bold text-sm hover:bg-white/10 active:scale-95 transition-all flex items-center justify-center group">
                  <!-- <Icon name="lucide:send" class="w-5 h-5 mr-3 -rotate-45 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /> -->
                  Invite a Colleague
                </button>
             </div>
          </div>
      </section>

    </div>

    <!-- Speaker Modal -->
    <SpeakerModal
      v-if="activeSpeaker"
      :speaker="activeSpeaker"
      :is-visible="isSpeakerModalVisible"
      @close="closeSpeakerModal"
    />
  </main>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import SpeakerModal from '@/components/SpeakerModal.vue'
import { useGetProgram } from '@/composables/modules/programs/useGetProgram'
import { useRoute } from 'vue-router'
import { useCustomToast } from '@/composables/core/useCustomToast'

const route = useRoute()
const { loading, error, program, getProgram } = useGetProgram()
const { showToast } = useCustomToast()

// Fetch program data on mount
onMounted(() => {
  const idOrSlug = route.params.slug as string
  getProgram(idOrSlug)
})

// Check if outcomes and focusAreas are identical to prevent repetition
const areOutcomesSame = computed(() => {
  if (!program.value?.focusAreas || !program.value?.outcomes) return false
  if (program.value.focusAreas.length !== program.value.outcomes.length) return false
  return program.value.focusAreas.every((val, index) => val === program.value.outcomes[index])
})

// Format multiline description
const formattedDescription = computed(() => {
  if (!program.value?.description) return ''
  return program.value.description
    .split('\n\n')
    .map(p => `<p class="mb-6">${p.replace(/\n/g, '<br>')}</p>`)
    .join('')
})

// SEO Meta
useHead({
  title: computed(() => program.value ? `${program.value.title} | MedLabConvo Programs` : 'Program Details | MedLabConvo'),
  meta: [
    {
      name: 'description',
      content: computed(() => program.value?.description?.substring(0, 160) || 'Explore this healthcare innovation program at MedLabConvo.')
    },
    { property: 'og:title', content: computed(() => program.value?.title || 'Healthcare Program') },
    { property: 'og:description', content: computed(() => program.value?.description?.substring(0, 200) || 'Advancing medical laboratory science.') },
    { property: 'og:image', content: computed(() => program.value?.image || '/images/medlabconvo-og-image.jpg') },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' }
  ]
})

const activeSpeaker = ref<any>(null)
const isSpeakerModalVisible = ref(false)

const openSpeakerModal = (speaker: any) => {
  activeSpeaker.value = speaker
  isSpeakerModalVisible.value = true
}

const closeSpeakerModal = () => {
  isSpeakerModalVisible.value = false
}

const shareProgram = async () => {
  const { generateUtmUrl } = await import('@/utils/utm')
  const baseUrl = window.location.origin + window.location.pathname
  const url = generateUtmUrl(baseUrl, program.value?.title || 'program')
  
  if (navigator.share) {
    try {
      await navigator.share({
        title: program.value?.title || 'MedLabConvo Program',
        text: program.value?.description?.substring(0, 100) || '',
        url
      })
    } catch (err) {
      copyToClipboard(url)
    }
  } else {
    copyToClipboard(url)
  }
}

const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text)
  showToast({ title: 'Link Copied', message: 'Tracking link copied to clipboard!', toastType: 'success' })
}
</script>

<style scoped>
@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0px); }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

:deep(.prose p) {
  margin-bottom: 1.5rem;
  line-height: 1.8;
}

:deep(.prose b), :deep(.prose strong) {
  color: #111827;
  font-weight: 800;
}
</style>
