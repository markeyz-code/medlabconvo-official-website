<script setup lang="ts">
import SiteHero from '@/components/site/SiteHero.vue'
import { subscriptions_api } from '@/api_factory/modules/subscriptions'

const route = useRoute()
const email = computed(() => String(route.query.email || ''))
const loading = ref(false)
const done = ref(false)
const error = ref('')

const unsubscribe = async () => {
  if (!email.value) {
    error.value = 'This unsubscribe link is missing an email address.'
    return
  }
  loading.value = true
  error.value = ''
  try {
    await subscriptions_api.$_unsubscribe(email.value)
    done.value = true
  } catch {
    error.value = 'We could not unsubscribe this address. It may already be inactive.'
  } finally {
    loading.value = false
  }
}

useHead({ title: 'Unsubscribe | MedLabConvo' })
</script>

<template>
  <main class="bg-white">
    <SiteHero
      eyebrow="Journo"
      title="You are in control of your inbox."
      description="Unsubscribe from Journo emails. You can always subscribe again later."
      theme="light"
      compact
    />
    <section class="site-container pb-20">
      <div class="site-card mx-auto max-w-md p-6 text-center sm:p-8">
        <div v-if="done">
          <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-600"><Icon name="lucide:check" class="h-6 w-6" /></div>
          <h2 class="mt-4 text-lg font-bold text-[#0a202b]">You have been unsubscribed.</h2>
          <p class="mt-1 text-[12px] leading-6 text-[#5f7482]">{{ email }} will no longer receive Journo newsletter emails.</p>
          <NuxtLink to="/journo" class="site-btn site-btn-primary mt-5">Back to Journo</NuxtLink>
        </div>
        <div v-else>
          <p class="text-[10px] font-bold uppercase tracking-[0.14em] text-[#8a9ba5]">Confirm</p>
          <h2 class="mt-2 text-lg font-bold text-[#0a202b]">Unsubscribe this address?</h2>
          <p class="mt-2 rounded-lg bg-[#fbfcfc] px-3 py-2 text-[12px] font-semibold text-[#27628C]">{{ email || 'No email provided' }}</p>
          <p v-if="error" class="mt-3 text-[11px] text-red-600">{{ error }}</p>
          <button type="button" class="site-btn site-btn-primary mt-5 w-full" :disabled="loading" @click="unsubscribe">
            {{ loading ? 'Unsubscribing…' : 'Unsubscribe' }}
          </button>
        </div>
      </div>
    </section>
  </main>
</template>
