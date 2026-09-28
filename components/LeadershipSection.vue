<template>
  <section class="py-24 md:py-40 bg-white overflow-hidden">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <!-- Section Header -->
      <div class="max-w-2xl mb-20 animate-fade-in">
        <h2 class="text-lg md:text-xl font-bold text-gray-900 leading-tight tracking-normal  mb-8">
          The <span class="text-[#27628C]">Architects</span> of Change
        </h2>
        <p class="text-lg md:text-xl text-gray-500 font-medium leading-relaxed max-w-lg">
          Meet the visionary leadership team dedicated to transforming the landscape of medical laboratory science across Africa.
        </p>
      </div>

      <!-- Categories & Grid -->
      <div v-if="loading" class="flex flex-col items-center justify-center py-40 gap-6">
        <div class="w-12 h-12 border-4 border-gray-100 border-t-[#27628C] rounded-full animate-spin"></div>
        <p class="text-sm font-bold text-gray-400">Fetching Leadership nodes...</p>
      </div>

      <div v-else class="space-y-32">
        <div v-for="category in activeCategories" :key="category.name" class="space-y-12 animate-fade-in-up">
          <div class="flex items-center gap-4">
             <div class="h-px flex-1 bg-gray-100"></div>
             <h3 class="text-sm font-bold text-gray-400 capitalize">{{ category.name }}</h3>
             <div class="h-px flex-1 bg-gray-100"></div>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 lg:gap-10">
            <div 
              v-for="member in category.members" 
              :key="member._id"
              class="group relative flex flex-col h-full bg-white transition-all duration-700"
            >
              <!-- Portrait Layer -->
              <div class="relative aspect-square max-w-[280px] mx-auto rounded-[3rem] overflow-hidden bg-gray-50 border border-gray-100 mb-8">
                <img 
                  v-if="member.image" 
                  :src="member.image" 
                  :alt="member.name"
                  class="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ease-out" 
                />
                <div v-else class="w-full h-full flex items-center justify-center text-gray-200">
                  <Icon name="lucide:user" class="w-20 h-20" />
                </div>
                
                <!-- Social Overlay -->
                <div class="absolute bottom-6 left-6 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                  <a 
                    v-for="social in member.profiles" 
                    :key="social.type" 
                    :href="social.url" 
                    target="_blank"
                    class="w-10 h-10 bg-white/90 backdrop-blur-md flex items-center justify-center rounded-2xl text-gray-900 hover:bg-[#27628C] hover:text-white transition-all border border-white/20 shadow-sm border border-slate-200"
                  >
                    <Icon :name="getSocialIcon(social.type)" class="w-5 h-5" />
                  </a>
                </div>
              </div>

              <!-- Identity Layer -->
              <div class="flex-1 flex flex-col">
                <h4 class="text-lg md:text-xl font-bold text-gray-900 mb-2 tracking-normal  group-hover:text-[#27628C] transition-colors">
                  {{ member.name }}
                </h4>
                <p class="text-sm font-bold text-gray-400 tracking-wider mb-6">
                  {{ member.title }}
                </p>
                
                <!-- Bio & Achievements Accordion-style or Static -->
                <p 
                  class="text-gray-500 font-medium leading-relaxed mb-8 line-clamp-3 group-hover:line-clamp-none transition-all duration-500"
                  v-html="member.bio"
                ></p>

                <!-- Impact Chips -->
                <div class="flex flex-wrap gap-2 mt-auto">
                   <div 
                     v-for="(ach, idx) in member.achievements" 
                     :key="idx"
                     class="px-3 py-1.5 bg-gray-50 text-gray-400 text-[9px] font-bold rounded-xl hover:bg-black hover:text-white transition-all cursor-default"
                   >
                     {{ ach }}
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="!loading && activeCategories.length === 0" class="py-40 text-center">
         <p class="text-sm font-bold text-gray-300">The Board is currently in Recess.</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import Icon from '@/components/Icon.vue'
import { useGetTeamMembers } from '@/composables/modules/teams/useGetTeamMembers'
import { teams_api } from '@/api_factory/modules/teams'

const { getTeamMembers, teamMembers: members, loading } = useGetTeamMembers()
const backendCategories = ref<any[]>([])

onMounted(async () => {
  try {
    const data = await getTeamMembers()
    if (data) {
      members.value = data.sort((a: any, b: any) => (a.position || 0) - (b.position || 0))
    }
  } catch (e) {
    console.error('Leadership Fetch Error:', e)
  }

  try {
    const res = await teams_api.$_get_categories()
    backendCategories.value = res.data
  } catch (e) {
    console.error('Failed to fetch categories:', e)
  }
})

const activeCategories = computed(() => {
  // First, group by the backend categories if available to maintain correct order
  const categoriesMap = new Map()
  
  if (backendCategories.value.length > 0) {
    backendCategories.value.forEach(cat => {
      categoriesMap.set(cat.name, [])
    })
  }

  // Populate categories
  members.value.forEach(member => {
    const cat = member.roleCategory || 'Other Teams'
    if (!categoriesMap.has(cat)) {
      categoriesMap.set(cat, [])
    }
    categoriesMap.get(cat).push(member)
  })

  // Format and filter empty categories
  return Array.from(categoriesMap.entries())
    .map(([name, membersList]) => ({ name, members: membersList }))
    .filter(cat => cat.members.length > 0)
})

const getSocialIcon = (type: string) => {
  switch (type) {
    case 'linkedin': return 'mdi:linkedin'
    case 'twitter': return 'mdi:twitter'
    case 'instagram': return 'mdi:instagram'
    case 'facebook': return 'mdi:facebook'
    default: return 'lucide:globe'
  }
}
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 1s ease-out forwards;
}
.animate-fade-in-up {
  animation: fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>

