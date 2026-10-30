<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div v-if="isSubscriptionModalOpen" class="fixed inset-0 z-[100] flex items-center justify-center bg-[#031d29]/65 p-4 backdrop-blur-sm sm:p-6" @click="closeModal">
        <div class="relative w-full max-w-2xl overflow-hidden rounded-[1.5rem] border border-white/10 bg-white shadow-2xl" @click.stop>
          <button type="button" class="absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-lg border border-white/20 bg-white/10 text-white transition hover:bg-white/20" aria-label="Close subscription dialog" @click="closeModal">
            <Icon name="lucide:x" class="h-4 w-4" />
          </button>

          <div class="grid md:grid-cols-[.92fr_1.08fr]">
            <div class="relative hidden overflow-hidden bg-[#033958] p-7 text-white md:flex md:flex-col md:justify-between">
              <div class="absolute inset-0 site-hero-grid opacity-50" />
              <div class="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#DE6129]/20 blur-3xl" />
              <div class="relative">
                <span class="site-eyebrow !text-white/50">The Convo Stack</span>
                <h3 class="mt-3 text-[1.65rem] font-bold leading-[1.08] tracking-[-0.04em]">One considered email. Zero noise.</h3>
                <p class="mt-3 text-[11.5px] leading-6 text-white/55">Professional medical journalism, career notes and ecosystem pulses for people who work in and around the laboratory.</p>
              </div>
              <div class="relative mt-8 space-y-2 border-t border-white/10 pt-5 text-[10px] text-white/45">
                <p class="flex items-center gap-2"><Icon name="lucide:check" class="h-3.5 w-3.5 text-[#f1a37f]" /> Research and reported features</p>
                <p class="flex items-center gap-2"><Icon name="lucide:check" class="h-3.5 w-3.5 text-[#f1a37f]" /> Career and opportunity notes</p>
                <p class="flex items-center gap-2"><Icon name="lucide:check" class="h-3.5 w-3.5 text-[#f1a37f]" /> Unsubscribe anytime</p>
              </div>
            </div>

            <div class="relative bg-white p-6 sm:p-8">
              <p class="site-eyebrow md:hidden">The Convo Stack</p>
              <h3 class="mt-2 text-[1.45rem] font-bold tracking-[-0.03em] text-[#0a202b] md:mt-0">Stay close to what is changing.</h3>
              <p class="mt-2 text-[11.5px] leading-6 text-[#5f7482]">Subscribe for free and get the next considered dispatch in your inbox.</p>

              <form class="mt-5 space-y-3" @submit.prevent="handleSubscribe">
                <label class="block">
                  <span class="text-[10.5px] font-semibold text-[#3b5361]">Email address</span>
                  <input v-model="email" type="email" required autocomplete="email" placeholder="you@example.com" class="mt-1.5 h-10 w-full rounded-lg border border-[#dfe7ee] bg-white px-3.5 text-[12px] text-[#0a202b] outline-none transition placeholder:text-[#b6c2cd] focus:border-[#27628C] focus:ring-2 focus:ring-[#27628C]/10" />
                </label>
                <button type="submit" :disabled="loading || !email" class="site-btn site-btn-primary w-full disabled:opacity-50">
                  <span v-if="loading" class="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  {{ loading ? 'Subscribing…' : 'Subscribe for free' }}
                  <Icon v-if="!loading" name="lucide:arrow-up-right" class="h-3.5 w-3.5" />
                </button>
              </form>

              <p class="mt-3 text-center text-[9px] leading-5 text-[#8a9ba5]">By subscribing you agree to our <NuxtLink to="/privacy-policy" class="font-semibold text-[#27628C]">Privacy Policy</NuxtLink>.</p>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useSubscribe } from '@/composables/modules/subscriptions/useSubscribe'
import { useSubscriptionModal } from '@/composables/modules/subscriptions/useSubscriptionModal'

const email = ref('')
const { subscribe, loading } = useSubscribe()
const { isSubscriptionModalOpen, closeSubscriptionModal } = useSubscriptionModal()

const closeModal = () => closeSubscriptionModal()

const handleSubscribe = async () => {
  const success = await subscribe(email.value)
  if (success) {
    email.value = ''
    closeModal()
  }
}
</script>

<style scoped>
.modal-fade-enter-active,
.modal-fade-leave-active { transition: opacity 180ms ease; }
.modal-fade-enter-from,
.modal-fade-leave-to { opacity: 0; }
</style>
