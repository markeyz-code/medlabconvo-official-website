<script setup lang="ts">
withDefaults(defineProps<{
  eyebrow?: string
  title: string
  description?: string
  link?: string
  linkLabel?: string
  align?: 'left' | 'center'
}>(), {
  eyebrow: '',
  description: '',
  link: '',
  linkLabel: 'View all',
  align: 'left',
})
</script>

<template>
  <div class="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between" :class="align === 'center' ? 'text-center sm:block' : ''">
    <div class="max-w-2xl">
      <p v-if="eyebrow" class="site-eyebrow">{{ eyebrow }}</p>
      <h2 class="site-h2 mt-3 site-text-balance">{{ title }}</h2>
      <p v-if="description" class="site-lead mt-3 max-w-xl">{{ description }}</p>
      <slot />
    </div>
    <div class="flex shrink-0 items-center gap-3">
      <slot name="actions" />
      <NuxtLink v-if="link" :to="link" class="site-link-arrow shrink-0">
        {{ linkLabel }}
        <Icon name="lucide:arrow-up-right" class="h-4 w-4" />
      </NuxtLink>
    </div>
  </div>
</template>
