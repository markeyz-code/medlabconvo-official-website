<template>
  <header class="sticky top-0 z-50 w-full bg-black transition-all duration-300" :class="{ 'border-b border-white/10 shadow-sm border border-slate-100': isScrolled }">
    <!-- Subscription Banner -->
    <div class="bg-[#27628C] py-2 px-4 shadow-inner">
      <div class="max-w-7xl mx-auto flex items-center justify-center gap-4 text-center">
        <p class="text-sm sm:text-xs font-bold text-white drop-shadow-sm">
          Stay Ahead — Join the Convo Substack for exclusive insights
        </p>
        <button 
          @click="openSubscriptionModal"
          class="bg-white text-[#27628C] px-3 py-1 rounded-full text-[9px] font-bold hover:bg-white/90 transition-all active:scale-95 shadow-sm"
        >
          Subscribe
        </button>
      </div>
    </div>
    <nav class="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
      <div class="flex lg:flex-1">
        <NuxtLink to="/" class="-m-1.5 p-1.5 transition-transform hover:scale-105">
          <span class="sr-only">MedLabConvo</span>
          <img class="h-12 w-auto object-contain rounded-md shadow-sm" src="@/assets/img/medlab-logo.jpeg" alt="MedLabConvo Logo" />
        </NuxtLink>
      </div>
      <div class="flex xl:hidden">
        <button @click="isOpen = true" type="button" class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-300 hover:text-white transition-colors">
          <span class="sr-only">Open main menu</span>
          <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
      </div>
      <div class="hidden xl:flex xl:gap-x-8">
        <NuxtLink v-for="item in navigation" :key="item.name" :to="item.href" class="text-sm font-medium leading-6 text-gray-300 hover:text-white transition-colors duration-200 relative group">
          {{ item.name }}
          <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#27628C] transition-all duration-300 group-hover:w-full"></span>
        </NuxtLink>
      </div>
      <div class="hidden xl:flex xl:flex-1 xl:justify-end xl:gap-x-4">
        <NuxtLink to="/donate" class="text-sm font-semibold leading-6 text-[#27628C] bg-white hover:bg-gray-50 shadow-sm border border-slate-100 px-6 py-2.5 rounded-full transition-all duration-300">
          Donate
        </NuxtLink>
         <NuxtLink to="/about-us" class="text-sm font-semibold leading-6 text-white bg-[#27628C] hover:bg-[#1a425f] shadow-sm border border-slate-100 px-6 py-2.5 rounded-full transition-all duration-300 group">
          About Us <span aria-hidden="true" class="inline-block transition-transform group-hover:translate-x-1 ml-1">&rarr;</span>
        </NuxtLink>
      </div>
    </nav>
    <!-- Mobile menu -->
    <div v-if="isOpen" class="xl:hidden" role="dialog" aria-modal="true">
      <div class="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity" @click="isOpen = false"></div>
      <div class="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-gray-900/95 backdrop-blur-xl px-6 py-6 sm:max-w-sm border-l border-white/10 shadow-sm border border-slate-200 transition-transform duration-300 transform" :class="isOpen ? 'translate-x-0' : 'translate-x-full'">
        <div class="flex items-center justify-between">
          <NuxtLink to="/" class="-m-1.5 p-1.5">
            <span class="sr-only">MedLabConvo</span>
            <img class="h-10 w-auto rounded-md shadow-sm" src="@/assets/img/medlab-logo.jpeg" alt="MedLabConvo Logo" />
          </NuxtLink>
          <button @click="isOpen = false" type="button" class="-m-2.5 rounded-md p-2.5 text-gray-400 hover:text-white transition-colors">
            <span class="sr-only">Close menu</span>
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div class="mt-6 flow-root">
          <div class="-my-6 divide-y divide-gray-700/50">
            <div class="space-y-2 py-6">
              <NuxtLink v-for="item in navigation" :key="item.name" @click="isOpen = false" :to="item.href" class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors">
                {{ item.name }}
              </NuxtLink>
            </div>
            <div class="py-6 flex flex-col gap-3">
              <NuxtLink @click="isOpen = false" to="/donate" class="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-[#27628C] bg-white border border-[#27628C] hover:bg-gray-50 transition-colors text-center">
                Donate
              </NuxtLink>
              <NuxtLink @click="isOpen = false" to="/about-us" class="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-white bg-[#27628C] hover:bg-[#1a425f] transition-colors text-center">
                About Us
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useSubscriptionModal } from '@/composables/modules/subscriptions/useSubscriptionModal'

const { openSubscriptionModal } = useSubscriptionModal()
const isOpen = ref(false)
const isScrolled = ref(false)

const navigation = [
  { name: 'Journo', href: '/journo' },
  // { name: 'Short Reads', href: '/short-reads' },
  { name: 'LabCast', href: '/lab-cast' },
  { name: 'Programs', href: '/programs' },
  { name: 'Community', href: '/community' },
  { name: 'Products', href: '/products' },
]

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>