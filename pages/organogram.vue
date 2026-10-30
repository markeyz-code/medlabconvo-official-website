<template>
  <div class="min-h-screen bg-white pb-32">
    <!-- Hero Section -->
    <div class="relative bg-[#0F172A] pt-40 pb-32 overflow-hidden">
      <!-- Animated Background Pattern -->
      <div class="absolute inset-0 opacity-20 pointer-events-none">
        <svg class="h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 100">
          <defs>
            <pattern id="grid" width="8" height="8" patternUnits="userSpaceOnUse">
              <path d="M 8 0 L 0 0 0 8" fill="none" stroke="white" stroke-width="0.2"/>
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#grid)" />
        </svg>
      </div>
      
      <!-- Gradient Orbs -->
      <div class="absolute -top-40 -right-40 w-96 h-96 bg-indigo-600/30 rounded-full blur-[120px]"></div>
      <div class="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-600/30 rounded-full blur-[120px]"></div>

      <div class="relative max-w-7xl mx-auto px-6 text-center">
        <span class="inline-block px-4 py-1.5 mb-6 text-sm font-bold tracking-normal text-indigo-400  bg-indigo-500/10 rounded-full border border-indigo-500/20">Team Hierarchy</span>
        <h1 class="text-lg md:text-xl font-extrabold text-white mb-8 tracking-normal leading-tight lg:px-20">
          Our Organizational Structure
        </h1>
        <p class="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
          The collaborative framework driving excellence in medical laboratory science across Africa and beyond.
        </p>
      </div>
    </div>

    <!-- Organogram Container -->
    <div class="max-w-7xl mx-auto px-4 -mt-16 relative z-30">
      
      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center items-center py-40">
        <div class="relative w-20 h-20">
          <div class="absolute inset-0 border-4 border-indigo-100 rounded-full"></div>
          <div class="absolute inset-0 border-4 border-t-indigo-600 rounded-full animate-spin"></div>
        </div>
      </div>

      <div v-else class="space-y-32 py-10">
        <!-- Dynamic Categories based on Backend Order -->
        <section v-for="(category, index) in activeCategories" :key="category.name" class="flex flex-col items-center relative gap-12" :class="{'pb-20': index === activeCategories.length - 1}">
            <div class="flex flex-col items-center w-full relative">
               <div v-if="index === 0" class="w-0.5 h-12 bg-gradient-to-t from-indigo-500/30 to-transparent mb-4"></div>
               <div v-else class="w-0.5 h-20 bg-gradient-to-b from-indigo-100 to-indigo-500/20 mb-4"></div>
               <h2 class="text-sm font-black tracking-normal text-indigo-600  bg-slate-100/50 px-6 py-2 rounded-full border border-slate-200 z-10">{{ category.name }}</h2>
            </div>
            
            <div class="flex flex-wrap justify-center gap-10 w-full max-w-6xl px-4 relative pt-4">
              <div v-for="member in category.members" :key="member.id" class="organogram-node group" :class="[
                index === 0 ? 'w-full md:w-auto' : 'flex justify-center',
                index > 1 ? 'opacity-90 scale-95 hover:scale-100 transition-all duration-500' : ''
              ]">
                <MemberCard :member="member" :is-large="index === 0" :is-compact="index > 1" />
              </div>
            </div>
        </section>
      </div>
    </div>

    <!-- Content Placeholder for Empty State -->
    <div v-if="!loading && activeCategories.length === 0" class="text-center py-40">
        <p class="text-slate-400">No team members found. Check your database settings.</p>
    </div>

  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useGetTeamMembers } from '@/composables/modules/teams/useGetTeamMembers'
import { teams_api } from '@/api_factory/modules/teams'

const { loading, teamMembers, getTeamMembers } = useGetTeamMembers()
const categories = ref<any[]>([])

const fetchCategories = async () => {
  try {
    const res = await teams_api.$_get_categories()
    categories.value = res.data
  } catch (error) {
    console.error('Failed to fetch categories:', error)
  }
}

onMounted(async () => {
  await Promise.all([
    getTeamMembers(),
    fetchCategories()
  ])
})

const activeCategories = computed(() => {
  if (categories.value.length === 0) return []
  
  return categories.value.map(cat => {
    return {
      name: cat.name,
      members: teamMembers.value.filter(m => m.roleCategory === cat.name).sort((a, b) => (a.position || 0) - (b.position || 0))
    }
  }).filter(cat => cat.members.length > 0)
})
</script>

<style scoped>
.organogram-node {
    animation: slideUpFade 1s cubic-bezier(0.22, 1, 0.36, 1) backwards;
    @apply transition-all duration-700;
}

@keyframes slideUpFade {
    0% { opacity: 0; transform: translateY(30px) scale(0.98); }
    100% { opacity: 1; transform: translateY(0) scale(1); }
}

/* Staggered load */
.organogram-node:nth-child(n) { animation-delay: calc(var(--n, 0) * 0.1s); }
</style>

