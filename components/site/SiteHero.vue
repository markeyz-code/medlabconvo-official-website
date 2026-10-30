<script setup lang="ts">
withDefaults(defineProps<{
  eyebrow?: string
  title: string
  description?: string
  primaryLabel?: string
  primaryTo?: string
  secondaryLabel?: string
  secondaryTo?: string
  theme?: 'brand' | 'light'
  compact?: boolean
}>(), {
  eyebrow: '',
  description: '',
  primaryLabel: '',
  primaryTo: '',
  secondaryLabel: '',
  secondaryTo: '',
  theme: 'brand',
  compact: false,
})

const isExternal = (value: string) => /^https?:\/\//.test(value)
</script>

<template>
  <section
    class="relative overflow-hidden"
    :class="theme === 'brand' ? 'bg-[#033958] text-white' : 'bg-[#faf8f3] text-[#0a202b]'"
  >
    <div v-if="theme === 'brand'" class="absolute inset-0 site-hero-grid opacity-70" />
    <div v-if="theme === 'brand'" class="absolute inset-0 site-hero-glow" />
    <div v-if="theme === 'light'" class="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#27628C]/5 blur-3xl" />
    <div v-if="theme === 'light'" class="absolute -bottom-28 -left-20 h-72 w-72 rounded-full bg-[#DE6129]/5 blur-3xl" />

    <div class="site-container relative py-14 sm:py-20 lg:py-24" :class="compact ? 'lg:py-16' : ''">
      <div class="grid items-center gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,.95fr)]">
        <div>
          <p v-if="eyebrow" class="site-eyebrow" :class="theme === 'brand' ? '!text-white/70 before:!bg-[#DE6129]' : ''">{{ eyebrow }}</p>
          <h1 class="site-display mt-4 text-[clamp(2.7rem,6vw,5.4rem)] site-text-balance" :class="theme === 'brand' ? '!text-white' : ''">
            {{ title }}
          </h1>
          <p v-if="description" class="mt-5 max-w-xl text-[0.98rem] leading-7" :class="theme === 'brand' ? 'text-white/65' : 'text-[#5f7482]'">
            {{ description }}
          </p>

          <div v-if="primaryLabel || secondaryLabel || $slots.actions" class="mt-7 flex flex-col gap-2.5 sm:flex-row">
            <slot name="actions">
              <NuxtLink
                v-if="primaryLabel && primaryTo"
                :to="primaryTo"
                :target="isExternal(primaryTo) ? '_blank' : undefined"
                class="site-btn"
                :class="theme === 'brand' ? 'site-btn-light' : 'site-btn-primary'"
              >
                {{ primaryLabel }}
                <Icon name="lucide:arrow-up-right" class="h-4 w-4" />
              </NuxtLink>
              <NuxtLink
                v-if="secondaryLabel && secondaryTo"
                :to="secondaryTo"
                :target="isExternal(secondaryTo) ? '_blank' : undefined"
                class="site-btn"
                :class="theme === 'brand' ? 'site-btn-outline-light' : 'site-btn-ghost'"
              >
                {{ secondaryLabel }}
              </NuxtLink>
            </slot>
          </div>

          <div v-if="$slots.meta" class="mt-8">
            <slot name="meta" />
          </div>
        </div>

        <div v-if="$slots.visual" class="relative">
          <slot name="visual" />
        </div>
      </div>
    </div>
  </section>
</template>
