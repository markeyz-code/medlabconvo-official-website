<script setup lang="ts">
import SiteMedia from '@/components/site/SiteMedia.vue'
withDefaults(defineProps<{
  title: string
  excerpt?: string
  image?: string
  category?: string
  meta?: string
  to: string
  label?: string
  featured?: boolean
}>(), {
  excerpt: '',
  image: '',
  category: 'Insight',
  meta: '',
  label: 'Read story',
  featured: false,
})
</script>

<template>
  <article class="site-card site-card-hover group flex h-full flex-col overflow-hidden">
    <NuxtLink :to="to" class="relative block overflow-hidden" :class="featured ? 'aspect-[16/10]' : 'aspect-[16/10]'">
      <SiteMedia :src="image" :alt="title" :label="category" icon="lucide:newspaper" />
      <span class="absolute left-4 top-4 rounded-full bg-white/95 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.12em] text-[#27628C] backdrop-blur">
        {{ category }}
      </span>
      <span class="absolute bottom-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/95 text-[#27628C] opacity-0 transition group-hover:opacity-100">
        <Icon name="lucide:arrow-up-right" class="h-4 w-4" />
      </span>
    </NuxtLink>

    <div class="flex flex-1 flex-col p-5">
      <p v-if="meta" class="text-[10px] font-semibold uppercase tracking-[0.1em] text-[#8a9ba5]">{{ meta }}</p>
      <NuxtLink :to="to" class="mt-2 block">
        <h3 class="font-bold leading-snug tracking-[-0.02em] text-[#0a202b] transition group-hover:text-[#27628C]" :class="featured ? 'text-xl' : 'text-[0.98rem]'">
          {{ title }}
        </h3>
      </NuxtLink>
      <p v-if="excerpt" class="mt-2 line-clamp-3 text-[0.78rem] leading-6 text-[#5f7482]">{{ excerpt }}</p>
      <NuxtLink :to="to" class="site-link-arrow mt-auto pt-5">
        {{ label }}
        <Icon name="lucide:arrow-right" class="h-3.5 w-3.5" />
      </NuxtLink>
    </div>
  </article>
</template>
