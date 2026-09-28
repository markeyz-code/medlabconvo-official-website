<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity ease-linear duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity ease-linear duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="isSubscriptionModalOpen" class="fixed inset-0 z-[100] flex items-center justify-center bg-gray-900/60 backdrop-blur-sm p-4 sm:p-6" @click="closeModal">
        <div @click.stop class="relative bg-white w-full max-w-lg rounded-[2rem] shadow-sm border border-slate-200 overflow-hidden animate-fade-in-up">
          
          <!-- Banner Image Area (optional) -->
          <div class="h-32 sm:h-40 bg-gradient-to-br from-[#27628C] to-gray-900 flex items-center justify-center relative overflow-hidden">
            <div class="absolute inset-0 bg-[url('~/assets/img/pattern.svg')] opacity-20"></div>
            <div class="z-10 bg-white p-3 rounded-full shadow-sm border border-slate-100">
              <svg class="w-8 h-8 text-[#27628C]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
            </div>
          </div>

          <!-- Close Button -->
          <button @click="closeModal" class="absolute top-4 right-4 p-2 text-white/70 hover:text-white bg-black/20 hover:bg-black/40 rounded-full transition-all">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>

          <div class="p-8 sm:p-10 text-center">
            <h3 class="text-lg sm:text-xl font-bold text-gray-900 tracking-tight mb-3">For Newsletters</h3>
            <p class="text-gray-500 font-medium mb-8">Subscribe to receive exclusive insights, medical journalism, and ecosystem pulses directly in your inbox.</p>
            
            <form @submit.prevent="handleSubscribe" class="space-y-4">
              <div class="relative">
                <input 
                  type="email" 
                  v-model="email" 
                  required 
 
                  class="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#27628C] text-sm font-bold placeholder:text-gray-400 transition-all"
                />
              </div>
              <button 
                type="submit" 
                :disabled="loading || !email"
                class="w-full py-4 bg-gray-900 text-white rounded-2xl text-sm font-bold tracking-normal hover:bg-[#27628C] transition-all disabled:opacity-50 shadow-sm border border-slate-200 hover:shadow-sm border border-slate-200"
              >
                <div v-if="loading" class="flex items-center justify-center gap-2">
                  <div class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Transmitting...</span>
                </div>
                <span v-else>Subscribe Now</span>
              </button>
            </form>
            <p class="text-sm text-gray-400 mt-6 font-semibold tracking-wider">No spam. Unsubscribe at any time.</p>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useSubscribe } from '@/composables/modules/subscriptions/useSubscribe'
import { useSubscriptionModal } from '@/composables/modules/subscriptions/useSubscriptionModal'

const email = ref('')
const { subscribe, loading } = useSubscribe()
const { isSubscriptionModalOpen, closeSubscriptionModal } = useSubscriptionModal()

// Mount logic for the "show once" functionality
onMounted(() => {
  const hasSeenModal = localStorage.getItem('hasSeenSubscriptionModal')
  if (!hasSeenModal) {
     setTimeout(() => {
       isSubscriptionModalOpen.value = true
       localStorage.setItem('hasSeenSubscriptionModal', 'true')
     }, 3000) // 3 second delay before popping up
  }
})

const closeModal = () => {
  closeSubscriptionModal()
}

const handleSubscribe = async () => {
  const success = await subscribe(email.value)
  if (success) {
    email.value = ''
    closeModal()
  }
}
</script>
