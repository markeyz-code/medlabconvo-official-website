<template>
  <div class="cms-page-renderer px-6 md:px-0">
    <div v-for="(section, index) in sortedSections" :key="section.id || index" class="animate-fade-in-up" :style="{ animationDelay: `${index * 100}ms` }">
      <!-- Special Component Handler (e.g. LeadershipSection) -->
      <component 
        v-if="getSpecialComponent(section.id)"
        :is="getSpecialComponent(section.id)"
        v-bind="section"
      />

      <!-- Standard Text Section -->
      <div v-else-if="section.isVisible" class="max-w-4xl mx-auto py-20 border-b border-gray-50 last:border-0 px-6">
        <!-- Section Header -->
        <div v-if="section.title" class="mb-10">
          <div class="inline-block px-4 py-1.5 bg-blue-50 text-[#27628C] text-sm font-bold rounded-full mb-4 capitalize">
            {{ section.id?.replace(/_/g, ' ') || 'Insight' }}
          </div>
          <h2 class="text-xl md:text-lg font-bold text-gray-900 leading-tight tracking-normal ">
            {{ section.title }}
          </h2>
        </div>

        <!-- Section Content -->
        <div 
          class="prose prose-xl prose-slate max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-gray-900 prose-p:text-gray-600 prose-p:leading-relaxed prose-strong:text-gray-900 prose-a:text-[#27628C] prose-a:font-bold"
          v-html="renderContent(section.content)"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent } from 'vue'

const props = defineProps<{
  sections: Array<{ id: string; title: string; content: string; isVisible: boolean; order: number }>
}>()

// Map specific Section IDs to high-fidelity Vue components
const specialComponents: Record<string, any> = {
  'LeadershipSection': defineAsyncComponent(() => import('./LeadershipSection.vue')),
  'EnquirySection': defineAsyncComponent(() => import('./EnquirySection.vue')),
  // Add more special components here as needed
}

const getSpecialComponent = (id: string) => {
  return specialComponents[id] || null
}

const sortedSections = computed(() => {
  return [...props.sections].sort((a, b) => (a.order || 0) - (b.order || 0))
})

const renderContent = (content: string) => {
  if (!content) return ''
  return content.replace(/\n/g, '<br />')
}
</script>
