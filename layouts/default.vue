<template>
  <div class="min-h-screen bg-white font-sans selection:bg-[#27628C]/10 selection:text-[#27628C]">
    <NavigationBar />
    <NuxtPage />
    <SubscriptionModal />
    <Footer />

    <!-- Global Toast Notifications -->
    <Teleport to="body">
      <Transition 
        enter-active-class="transition duration-500 ease-out"
        enter-from-class="transform translate-y-20 opacity-0"
        enter-to-class="transform translate-y-0 opacity-100"
        leave-active-class="transition duration-300 ease-in"
        leave-from-class="transform translate-y-0 opacity-100"
        leave-to-class="transform translate-y-20 opacity-0"
      >
        <div v-if="visible" class="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] w-full max-w-sm px-6">
          <div 
            :class="[
              'p-5 rounded-2xl border shadow-sm border border-slate-200 flex items-center gap-4 backdrop-blur-xl',
              toastData.toastType === 'success' ? 'bg-white/90 border-emerald-100' : 'bg-white/90 border-red-100'
            ]"
          >
            <div 
              :class="[
                'w-10 h-10 rounded-full flex items-center justify-center shrink-0',
                toastData.toastType === 'success' ? 'bg-emerald-50 text-emerald-500' : 'bg-red-50 text-red-500'
              ]"
            >
              <Icon v-if="toastData.toastType === 'success'" name="lucide:check-circle-2" class="w-6 h-6" />
              <Icon v-else name="lucide:alert-circle" class="w-6 h-6" />
            </div>
            <div class="flex-1">
              <h4 class="text-sm font-bold text-gray-900">{{ toastData.title }}</h4>
              <p class="text-xs text-gray-500 font-medium">{{ toastData.message }}</p>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import NavigationBar from '@/components/NavigationBar.vue'
import Footer from '@/components/Footer.vue'
import Icon from '@/components/Icon.vue'
import { useCustomToast } from '@/composables/core/useCustomToast'

const { visible, toastData } = useCustomToast()
</script>

<style>
/* Smooth Global Transitions */
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}

html {
  scroll-behavior: smooth;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  font-family: 'Onest', system-ui, -apple-system, sans-serif;
  color: #0a202b;
  background: #fff;
}

/* Custom Selection Color */
::selection {
  background-color: rgba(39, 98, 140, 0.1);
  color: #27628C;
}

/* Hide scrollbar for Chrome, Safari and Opera */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.no-scrollbar {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
</style>