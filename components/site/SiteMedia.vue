<script setup lang="ts">
const props = withDefaults(defineProps<{
  src?: string | null
  alt?: string
  label?: string
  icon?: string
  eager?: boolean
}>(), {
  src: '',
  alt: '',
  label: 'MedLabConvo',
  icon: 'lucide:flask-conical',
  eager: false,
})

const failed = ref(false)
const loaded = ref(false)

watch(() => props.src, () => {
  failed.value = false
  loaded.value = false
})
</script>

<template>
  <div class="relative h-full w-full overflow-hidden bg-[#eaf2f6]">
    <!-- Intentional fallback / loading state -->
    <div class="absolute inset-0 flex h-full w-full flex-col items-center justify-center gap-3 overflow-hidden bg-gradient-to-br from-[#033958] via-[#27628C] to-[#3f89b6] px-5 text-center">
      <div class="absolute -right-10 -top-10 h-36 w-36 rounded-full border border-white/15" />
      <div class="absolute -bottom-14 -left-10 h-44 w-44 rounded-full border border-white/10" />
      <span class="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-white/20 bg-white/10 text-white backdrop-blur">
        <Icon :name="icon" class="h-6 w-6" />
      </span>
      <span class="relative max-w-[90%] text-[10px] font-bold uppercase tracking-[0.16em] text-white/75">{{ label }}</span>
    </div>

    <img
      v-if="src && !failed"
      :src="src"
      :alt="alt"
      :loading="eager ? 'eager' : 'lazy'"
      decoding="async"
      class="absolute inset-0 h-full w-full object-cover transition-opacity duration-500"
      :class="loaded ? 'opacity-100' : 'opacity-0'"
      @load="loaded = true"
      @error="failed = true"
    />
  </div>
</template>
