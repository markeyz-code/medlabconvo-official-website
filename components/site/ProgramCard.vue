<script setup lang="ts">
import SiteMedia from '@/components/site/SiteMedia.vue'
const props = withDefaults(defineProps<{
  program: any
  compact?: boolean
}>(), { compact: false })

const image = computed(() => props.program?.image || props.program?.images?.[0] || '')
const applyLink = computed(() => {
  const program = props.program
  if (!program) return ''
  if (program.externalFormLink) return program.externalFormLink
  if (program.form?.slug || program.form?._id) return `/forms/submit/${program.form.slug || program.form._id}`
  if (program.formFields?.length) return `/programs/${program.slug}/apply`
  return ''
})

const dateLabel = computed(() => {
  const value = props.program?.startDate || props.program?.createdAt
  if (!value) return 'Flexible'
  return new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
})
</script>

<template>
  <article class="site-card site-card-hover group flex h-full flex-col overflow-hidden">
    <NuxtLink :to="`/programs/${program.slug}`" class="relative block overflow-hidden" :class="compact ? 'aspect-[4/3]' : 'aspect-[4/3]'">
      <SiteMedia :src="image" :alt="program.title" :label="program.category || 'Programme'" icon="lucide:graduation-cap" />
      <div class="absolute inset-0 bg-gradient-to-t from-[#07212e]/55 via-transparent to-transparent opacity-70 transition group-hover:opacity-90" />
      <div class="absolute left-4 top-4 flex flex-wrap gap-2">
        <span class="rounded-full bg-white/95 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.12em] text-[#27628C] backdrop-blur">
          {{ program.category || 'Programme' }}
        </span>
        <span v-if="program.status === 'active'" class="rounded-full bg-[#DE6129] px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.12em] text-white">
          Open
        </span>
      </div>
      <span class="absolute bottom-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/95 text-[#27628C] opacity-0 transition group-hover:opacity-100">
        <Icon name="lucide:arrow-up-right" class="h-4 w-4" />
      </span>
    </NuxtLink>

    <div class="flex flex-1 flex-col p-5">
      <div class="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-[#8a9ba5]">
        <span class="inline-flex items-center gap-1"><Icon name="lucide:clock-3" class="h-3 w-3" />{{ program.duration || 'Flexible' }}</span>
        <span class="h-1 w-1 rounded-full bg-[#d5e0e6]" />
        <span>{{ dateLabel }}</span>
      </div>

      <NuxtLink :to="`/programs/${program.slug}`" class="mt-3 block">
        <h3 class="text-[1.05rem] font-bold leading-snug tracking-[-0.02em] text-[#0a202b] transition group-hover:text-[#27628C]">
          {{ program.title }}
        </h3>
      </NuxtLink>
      <p class="mt-2 line-clamp-3 text-[0.8rem] leading-6 text-[#5f7482]">{{ program.description }}</p>

      <div class="mt-auto flex items-center justify-between gap-3 border-t border-[#eef2f5] pt-4">
        <NuxtLink :to="`/programs/${program.slug}`" class="site-link-arrow">
          Explore
          <Icon name="lucide:arrow-right" class="h-3.5 w-3.5" />
        </NuxtLink>
        <a
          v-if="applyLink && program.status === 'active'"
          :href="applyLink"
          :target="program.externalFormLink ? '_blank' : undefined"
          class="site-btn site-btn-primary min-h-0 px-3 py-2 text-[0.66rem]"
        >
          Apply
          <Icon name="lucide:arrow-up-right" class="h-3 w-3" />
        </a>
      </div>
    </div>
  </article>
</template>
