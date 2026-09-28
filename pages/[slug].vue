<template>
  <div class="min-h-screen bg-white">
    <!-- Check if CMS content is loading -->
    <div v-if="loading" class="flex flex-col items-center justify-center py-40 gap-6">
      <div class="w-12 h-12 border-4 border-gray-100 border-t-[#27628C] rounded-full animate-spin"></div>
      <p class="text-sm font-bold text-gray-400">Fetching Perspective...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="flex flex-col items-center justify-center py-40 px-6 text-center">
      <h2 class="text-lg font-bold text-gray-900 tracking-normal  mb-4">Fractured Space</h2>
      <p class="text-lg text-gray-500 font-light mb-12 max-w-sm">The digital node you are seeking has either been moved or never existed in this dimension.</p>
      <NuxtLink to="/" class="bg-gray-900 text-white px-10 py-5 rounded-2xl text-sm font-bold hover:bg-[#27628C] transition-all shadow-sm border border-slate-200">Back to Ground Zero</NuxtLink>
    </div>

    <!-- Dynamic Renderer -->
    <CmsRenderer 
      v-else-if="pageData?.sections" 
      :sections="pageData.sections" 
    />

    <!-- Fallback 404 (Valid slug but empty data) -->
    <div v-else class="flex flex-col items-center justify-center py-40 px-6 text-center">
       <h2 class="text-lg font-black text-gray-900 tracking-normal">Null Resonance</h2>
       <p class="text-gray-500 mt-4 mb-8">This page exists in name, but contains no structural data yet.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useCmsData } from '@/composables/modules/cms/useCmsData'
import CmsRenderer from '@/components/CmsRenderer.vue'

const route = useRoute()
const slug = route.params.slug as string

// Dynamic key based on current URL slug
const { pageData, loading, error } = useCmsData(slug)
</script>
