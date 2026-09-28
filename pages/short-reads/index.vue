<template>
  <main class="min-h-screen bg-[#F8FAFC] py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h1 class="text-5xl sm:text-7xl lg:text-8xl font-bold text-gray-900 mb-6">Short Reads</h1>
        <p class="text-2xl text-gray-600">Quick, engaging stories designed for a fast read.</p>
      </div>

      <div v-if="loading" class="text-center py-20 text-gray-500">
        <div class="inline-block animate-spin rounded-full h-8 w-8 border-4 border-[#033958] border-t-transparent mb-4"></div>
        <p>Loading stories...</p>
      </div>
      
      <div v-else-if="!publishedReads.length" class="text-center py-20 text-gray-500">
        <p>No stories published yet. Check back soon!</p>
      </div>

      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <NuxtLink 
          v-for="read in publishedReads" 
          :key="read._id" 
          :to="`/short-reads/${read.slug}`"
          class="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-sm border border-slate-200 transition-all duration-300 transform hover:-translate-y-1"
        >
          <div class="aspect-[4/5] overflow-hidden relative">
            <img 
              :src="read.coverImageUrl" 
              :alt="read.title" 
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            <div class="absolute bottom-0 left-0 right-0 p-6">
              <h2 class="text-lg font-bold text-white mb-2 leading-tight">{{ read.title }}</h2>
              <p v-if="read.author" class="text-white/80 text-sm font-medium">By {{ read.author }}</p>
            </div>
          </div>
        </NuxtLink>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useGetShortReads } from '@/composables/modules/short-reads/useGetShortReads'

const { shortReads, loading, getShortReads } = useGetShortReads()

// Only show published reads on the frontend
const publishedReads = computed(() => {
  return shortReads.value.filter(read => read.status === 'published')
})

onMounted(() => {
  // Fetch all reads, or you can filter via API if supported
  getShortReads({ status: 'published' })
})
</script>
