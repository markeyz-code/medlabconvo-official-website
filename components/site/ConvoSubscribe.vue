<script setup lang="ts">
import { useSubscribe } from '@/composables/modules/subscriptions/useSubscribe'

withDefaults(defineProps<{
  title?: string
  description?: string
  dark?: boolean
  buttonLabel?: string
}>(), {
  title: 'One list. Every MedLabConvo update.',
  description: 'New Journo publications, programme openings and community news — delivered once, without duplicate sign-ups.',
  dark: false,
  buttonLabel: 'Subscribe for free',
})

const email = ref('')
const done = ref(false)
const { subscribe, loading } = useSubscribe()

const submit = async () => {
  if (!email.value) return
  const success = await subscribe(email.value)
  if (success) {
    done.value = true
    email.value = ''
  }
}
</script>

<template>
  <div class="rounded-2xl border p-5" :class="dark ? 'border-white/10 bg-white/5 text-white' : 'border-[#e4ebf0] bg-[#fbfcfc]'">
    <p class="text-[9px] font-bold uppercase tracking-[0.16em]" :class="dark ? 'text-white/45' : 'text-[#8a9ba5]'">MedLabConvo updates</p>
    <p class="mt-2 text-[13px] font-bold leading-snug" :class="dark ? 'text-white' : 'text-[#0a202b]'">{{ title }}</p>
    <p class="mt-1.5 text-[10.5px] leading-5" :class="dark ? 'text-white/55' : 'text-[#5f7482]'">{{ description }}</p>

    <div v-if="done" class="mt-4 flex items-center gap-2 text-[11px] font-semibold" :class="dark ? 'text-[#f1a37f]' : 'text-emerald-600'">
      <Icon name="lucide:check" class="h-4 w-4" /> You are on the list.
    </div>
    <form v-else class="mt-3 space-y-2" @submit.prevent="submit">
      <input v-model="email" type="email" required placeholder="you@example.com" class="h-9 w-full rounded-lg border px-3 text-[11px] outline-none" :class="dark ? 'border-white/15 bg-white/10 text-white placeholder:text-white/30 focus:border-white/40' : 'border-[#dfe7ee] bg-white text-[#0a202b] placeholder:text-[#b6c2cd] focus:border-[#27628C]/40'" />
      <button type="submit" :disabled="loading || !email" class="site-btn site-btn-primary min-h-0 w-full py-2.5 text-[10.5px] disabled:opacity-40">
        {{ loading ? 'Subscribing…' : buttonLabel }}
      </button>
    </form>
  </div>
</template>
