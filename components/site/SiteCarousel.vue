<script setup lang="ts">
withDefaults(defineProps<{
  eyebrow?: string
  title: string
  description?: string
  link?: string
  linkLabel?: string
  controls?: boolean
}>(), {
  eyebrow: '',
  description: '',
  link: '',
  linkLabel: 'View all',
  controls: true,
})

const track = ref<HTMLElement | null>(null)

const move = (direction: 1 | -1) => {
  const el = track.value
  if (!el) return
  el.scrollBy({ left: direction * Math.min(el.clientWidth * 0.85, 640), behavior: 'smooth' })
}
</script>

<template>
  <div>
    <div class="flex items-end justify-between gap-6">
      <div class="max-w-2xl">
        <p v-if="eyebrow" class="site-eyebrow">{{ eyebrow }}</p>
        <h2 class="site-h2 mt-3">{{ title }}</h2>
        <p v-if="description" class="site-lead mt-3 max-w-xl">{{ description }}</p>
      </div>
      <div class="flex shrink-0 items-center gap-2">
        <NuxtLink v-if="link" :to="link" class="site-link-arrow mr-2 hidden sm:inline-flex">
          {{ linkLabel }}
          <Icon name="lucide:arrow-up-right" class="h-4 w-4" />
        </NuxtLink>
        <button
          v-if="controls"
          type="button"
          class="flex h-9 w-9 items-center justify-center rounded-full border border-[#e4ebf0] bg-white text-[#5f7482] transition hover:border-[#27628C]/30 hover:text-[#27628C]"
          aria-label="Scroll previous"
          @click="move(-1)"
        >
          <Icon name="lucide:arrow-left" class="h-4 w-4" />
        </button>
        <button
          v-if="controls"
          type="button"
          class="flex h-9 w-9 items-center justify-center rounded-full border border-[#e4ebf0] bg-white text-[#5f7482] transition hover:border-[#27628C]/30 hover:text-[#27628C]"
          aria-label="Scroll next"
          @click="move(1)"
        >
          <Icon name="lucide:arrow-right" class="h-4 w-4" />
        </button>
      </div>
    </div>

    <div ref="track" class="site-carousel-track mt-7">
      <slot />
    </div>

    <NuxtLink v-if="link" :to="link" class="site-link-arrow mt-5 sm:hidden">
      {{ linkLabel }}
      <Icon name="lucide:arrow-up-right" class="h-4 w-4" />
    </NuxtLink>
  </div>
</template>
