<script setup lang="ts">
withDefaults(defineProps<{
  eyebrow?: string
  title: string
  description?: string
  primaryLabel?: string
  primaryTo?: string
  secondaryLabel?: string
  secondaryTo?: string
  secondaryVariant?: 'outline' | 'light'
}>(), {
  eyebrow: 'Join the conversation',
  description: '',
  primaryLabel: '',
  primaryTo: '',
  secondaryLabel: '',
  secondaryTo: '',
  secondaryVariant: 'outline',
})
</script>

<template>
  <section class="site-container py-10 sm:py-14">
    <div class="relative overflow-hidden rounded-[1.75rem] bg-[#27628C] px-6 py-10 text-white sm:px-10 lg:px-14 lg:py-12">
      <div class="absolute inset-0 site-hero-grid opacity-60" />
      <div class="absolute -right-20 -top-24 h-64 w-64 rounded-full border border-white/15" />
      <div class="absolute -bottom-24 -right-8 h-56 w-56 rounded-full bg-[#DE6129]/20 blur-2xl" />
      <div class="relative flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
        <div class="max-w-2xl">
          <p class="site-eyebrow !text-white/70 before:!bg-[#DE6129]">{{ eyebrow }}</p>
          <h2 class="site-display mt-3 text-[clamp(1.8rem,3.7vw,3rem)] !text-white site-text-balance">{{ title }}</h2>
          <p v-if="description" class="mt-3 max-w-xl text-[0.9rem] leading-7 text-white/65">{{ description }}</p>
        </div>
        <div class="flex shrink-0 flex-col gap-2.5 sm:flex-row">
          <a v-if="primaryLabel && primaryTo && /^https?:\/\//.test(primaryTo)" :href="primaryTo" target="_blank" rel="noopener noreferrer" class="site-btn site-btn-light">
            {{ primaryLabel }}
            <Icon name="lucide:arrow-up-right" class="h-4 w-4" />
          </a>
          <NuxtLink v-else-if="primaryLabel && primaryTo" :to="primaryTo" class="site-btn site-btn-light">
            {{ primaryLabel }}
            <Icon name="lucide:arrow-up-right" class="h-4 w-4" />
          </NuxtLink>
          <a v-if="secondaryLabel && secondaryTo && /^https?:\/\//.test(secondaryTo)" :href="secondaryTo" target="_blank" rel="noopener noreferrer" :class="secondaryVariant === 'light' ? 'site-btn site-btn-light' : 'site-btn site-btn-outline-light'">
            {{ secondaryLabel }}
          </a>
          <NuxtLink v-else-if="secondaryLabel && secondaryTo" :to="secondaryTo" :class="secondaryVariant === 'light' ? 'site-btn site-btn-light' : 'site-btn site-btn-outline-light'">
            {{ secondaryLabel }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>
