<template>
  <main class="min-h-screen bg-white">
    <!-- Hero Standardized -->
    <div class="bg-[#27628C] py-24 md:py-40 px-6 lg:px-8 relative overflow-hidden">
        <div class="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]"></div>
        <div class="mx-auto max-w-7xl relative z-10 text-center">
           <div class="max-w-4xl mx-auto">
              <h1 class="text-5xl md:text-7xl font-bold text-white leading-tight tracking-normal  mb-8 animate-in fade-in slide-in-from-bottom-10 duration-1000">
                 {{ getSectionContent('hero_title', 'Leading Change, Building Capacity, Inspiring Action') }}
              </h1>
              <p class="text-2xl md:text-3xl text-blue-50 font-medium leading-relaxed max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-200">
                 {{ getSectionContent('hero_description', 'MedLabConvo is more than a platform—it’s a movement dedicated to shaping the future of medical laboratory science and healthcare.') }}
              </p>
           </div>
        </div>
    </div>

    <!-- The Five Dimensions Section -->
    <div class="py-24 bg-white sm:py-32">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="mx-auto max-w-2xl text-center mb-16">
          <h2 class="text-xl font-bold text-gray-900 tracking-tight ">Our Five Dimensions</h2>
          <div class="mt-4 h-1.5 w-20 bg-[#27628C] mx-auto rounded-full"></div>
        </div>
        
        <div class="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
          <!-- Knowledge -->
          <div class="group relative flex flex-col items-center p-10 bg-slate-50 rounded-[2.5rem] border border-slate-100 transition-all duration-500 hover:shadow-sm border border-slate-200 hover:-translate-y-2">
            <div class="mb-8 flex h-20 w-20 items-center justify-center rounded-2xl bg-white shadow-sm border border-slate-200 overflow-hidden group-hover:scale-110 transition-transform p-3">
              <img src="@/assets/img/goals1.jpeg" class="h-full w-full object-cover rounded-xl" />
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-4">Knowledge</h3>
            <p class="text-gray-600 text-center text-sm leading-relaxed font-medium">
              {{ getSectionContent('knowledge_desc', 'We bridge the gaps in medical laboratory science education by providing cutting-edge resources and training.') }}
            </p>
          </div>

          <!-- Mindset -->
          <div class="group relative flex flex-col items-center p-10 bg-slate-50 rounded-[2.5rem] border border-slate-100 transition-all duration-500 hover:shadow-sm border border-slate-200 hover:-translate-y-2">
            <div class="mb-8 flex h-20 w-20 items-center justify-center rounded-2xl bg-white shadow-sm border border-slate-200 overflow-hidden group-hover:scale-110 transition-transform p-3">
              <img src="@/assets/img/goals2.jpeg" class="h-full w-full object-cover rounded-xl" />
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-4">Mindset</h3>
            <p class="text-gray-600 text-center text-sm leading-relaxed font-medium">
              {{ getSectionContent('mindset_desc', 'Fostering resilience, adaptability, and a proactive approach to challenges is at the heart of our mission.') }}
            </p>
          </div>

          <!-- Skill -->
          <div class="group relative flex flex-col items-center p-10 bg-slate-50 rounded-[2.5rem] border border-slate-100 transition-all duration-500 hover:shadow-sm border border-slate-200 hover:-translate-y-2">
            <div class="mb-8 flex h-20 w-20 items-center justify-center rounded-2xl bg-white shadow-sm border border-slate-200 overflow-hidden group-hover:scale-110 transition-transform p-3">
              <img src="@/assets/img/goals3.jpeg" class="h-full w-full object-cover rounded-xl" />
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-4">Skill</h3>
            <p class="text-gray-600 text-center text-sm leading-relaxed font-medium">
              {{ getSectionContent('skill_desc', 'MedLabConvo connects you with industry leaders and mentors to expand your professional toolkit.') }}
            </p>
          </div>

          <!-- Network -->
          <div class="group relative flex flex-col items-center p-10 bg-slate-50 rounded-[2.5rem] border border-slate-100 transition-all duration-500 hover:shadow-sm border border-slate-200 hover:-translate-y-2">
            <div class="mb-8 flex h-20 w-20 items-center justify-center rounded-2xl bg-white shadow-sm border border-slate-200 overflow-hidden group-hover:scale-110 transition-transform p-3">
              <img src="@/assets/img/goals4.jpeg" class="h-full w-full object-cover rounded-xl" />
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-4">Network</h3>
            <p class="text-gray-600 text-center text-sm leading-relaxed font-medium">
              Building a strong professional network opens doors to new opportunities and collaborations across borders.
            </p>
          </div>

          <!-- Identity -->
          <div class="group relative flex flex-col items-center p-10 bg-slate-50 rounded-[2.5rem] border border-slate-100 transition-all duration-500 hover:shadow-sm border border-slate-200 hover:-translate-y-2 lg:col-start-2">
            <div class="mb-8 flex h-20 w-20 items-center justify-center rounded-2xl bg-white shadow-sm border border-slate-200 overflow-hidden group-hover:scale-110 transition-transform p-3">
              <img src="@/assets/img/goals5.jpeg" class="h-full w-full object-cover rounded-xl" />
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-4">Identity</h3>
            <p class="text-gray-600 text-center text-sm leading-relaxed font-medium">
              Establishing a clear professional identity is key. We provide guidance on personal branding and leadership.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Mission & Vision Section -->
    <div class="bg-gray-50 py-24 sm:py-32">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:gap-x-16">
          <!-- Mission -->
          <div class="relative bg-white p-12 rounded-[3.5rem] shadow-sm border border-slate-200 border border-gray-100 overflow-hidden group hover:shadow-sm border border-slate-200 transition-all duration-500">
            <div class="flex items-center gap-6 mb-8">
              <div class="flex h-16 w-16 items-center justify-center rounded-3xl bg-[#27628C] text-white shadow-sm border border-slate-100 shadow-blue-900/20">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h2 class="text-lg font-bold text-gray-900 ">Mission</h2>
            </div>
            <p class="text-gray-600 text-lg leading-relaxed font-medium">
              To lead positive change in the mindset, attitude, and identity of stakeholders within medical laboratory science, while contributing to transformation across the broader healthcare system; build the capacity of future generations of world-class professionals in medical laboratory science and other health professions; and inspire action through purposeful engagement, education, and advocacy.
            </p>
          </div>

          <!-- Vision -->
          <div class="relative bg-white p-12 rounded-[3.5rem] shadow-sm border border-slate-200 border border-gray-100 overflow-hidden group hover:shadow-sm border border-slate-200 transition-all duration-500">
            <div class="flex items-center gap-6 mb-8">
              <div class="flex h-16 w-16 items-center justify-center rounded-3xl bg-[#27628C] text-white shadow-sm border border-slate-100 shadow-blue-900/20">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.522 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.478 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h2 class="text-lg font-bold text-gray-900 ">Vision</h2>
            </div>
            <p class="text-gray-600 text-lg leading-relaxed font-medium">
              To become the household name of medical laboratory science in Africa and beyond — known, followed, and trusted by professionals and the public through our impact.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Core Values -->
    <div class="py-24 bg-white sm:py-32">
      <div class="mx-auto max-w-7xl px-6 lg:px-8 text-center">
        <h2 class="text-xl font-bold text-gray-900 mb-16 ">Core Values</h2>
        
        <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div v-for="(value, index) in coreValues" :key="index" class="p-10 border border-slate-100 rounded-[2.5rem] bg-slate-50 hover:bg-white hover:shadow-sm border border-slate-200 transition-all duration-500 group">
            <div class="w-14 h-14 bg-white shadow-sm border border-slate-100 text-[#27628C] rounded-2xl flex items-center justify-center mx-auto mb-6 font-bold text-xl transition-all group-hover:bg-[#27628C] group-hover:text-white">{{ index + 1 }}</div>
            <h3 class="text-lg font-bold text-gray-900 mb-3">{{ value.title }}</h3>
            <p class="text-gray-500 text-sm leading-relaxed font-medium">{{ value.desc }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Leadership Team -->
    <div class="py-24 bg-white sm:py-32">
      <div class="mx-auto max-w-7xl px-6 lg:px-8 text-center mb-16">
        <h2 class="text-xl font-bold text-gray-900 tracking-tight">Our Leadership</h2>
        <p class="text-gray-500 mt-4 font-medium leading-relaxed max-w-2xl mx-auto">Meet the visionary team driving clinical excellence and innovation at MedLabConvo.</p>
        <div class="mt-4 h-1.5 w-20 bg-[#27628C] mx-auto rounded-full"></div>
      </div>
      <LeadershipSection />
    </div>

    <!-- Newsletter CTA -->
    <section class="py-24 bg-gray-50 border-t border-gray-100">
      <div class="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-12">
        <div class="max-w-xl">
          <h2 class="text-xl font-bold text-gray-900 tracking-normal">Join the Conversation</h2>
          <p class="text-gray-500 mt-4 font-medium leading-relaxed">Stay updated with our latest initiatives, research pulses, and community events directly in your inbox.</p>
        </div>
        <NuxtLink to="/journo" class="px-12 py-5 bg-[#27628C] text-white rounded-2xl font-bold text-[11px] tracking-normal hover:bg-black transition-all shadow-sm border border-slate-200 active:scale-95">
          Explore Journo
        </NuxtLink>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useGetCms } from '@/composables/modules/cms/useGetCms'
import LeadershipSection from '@/components/LeadershipSection.vue'
import { useHead } from '#imports'

const { singleCms, getCmsByKey } = useGetCms()

useHead({
  title: 'About Us | MedLabConvo',
  meta: [
    { name: 'description', content: 'MedLabConvo is a movement dedicated to shaping the future of medical laboratory science and healthcare.' }
  ]
})

onMounted(() => {
  getCmsByKey('about_page')
})

const getSectionContent = (id: string, fallback: string) => {
  if (singleCms.value?.data?.sections) {
    const section = singleCms.value.data.sections.find((s: any) => s.id === id && s.isVisible)
    if (section) return section.content
  }
  return fallback
}

const coreValues = [
  { title: 'Empowerment & Capacity', desc: 'Investing in educating and training students and early-career professionals.' },
  { title: 'Advocacy & Awareness', desc: 'Championing the laboratory profession and public health promotion.' },
  { title: 'Collaboration', desc: 'Building partnerships across countries, institutions, and disciplines.' },
  { title: 'Excellence & Quality', desc: 'Maintaining a standard of world-class professionalism in programming and content.' },
  { title: 'Innovation & Tech-Focus', desc: 'Integrating technology in communications and education (e.g., Labcast, digital editorial).' },
  { title: 'Community & Mentorship', desc: 'Creating supportive networks that bridge early-career individuals and experienced professionals.' }
]
</script>
