<template>
  <header class="sticky top-0 z-50 w-full border-b border-[#e4ebf0]/80 bg-white/92 backdrop-blur-xl">
    <!-- Announcement strip -->
    <div class="bg-[#033958]">
      <div class="site-container flex min-h-9 flex-wrap items-center justify-center gap-x-3 gap-y-1 py-1.5 text-center text-[10.5px] font-medium text-white/80 sm:text-[11px]">
        <span class="inline-flex items-center gap-1.5">
          <span class="h-1.5 w-1.5 rounded-full bg-[#DE6129]" />
          <span class="sm:hidden">New on the Convo Stack — fresh insight for the lab.</span>
          <span class="hidden sm:inline">New on the Convo Stack — career, research and ecosystem insights.</span>
        </span>
        <button type="button" class="font-semibold text-white underline decoration-white/30 underline-offset-4 transition hover:decoration-white" @click="openSubscriptionModal">
          Subscribe for free
        </button>
      </div>
    </div>

    <nav class="site-container flex h-[4.5rem] items-center justify-between gap-6" aria-label="Global">
      <NuxtLink to="/" class="flex shrink-0 items-center gap-2.5" aria-label="MedLabConvo home">
        <img class="h-9 w-9 rounded-lg object-cover ring-1 ring-[#e4ebf0]" src="@/assets/img/medlab-logo.jpeg" alt="MedLabConvo" />
        <span class="hidden leading-none sm:block">
          <span class="block text-[13px] font-bold tracking-[-0.02em] text-[#0a202b]">MedLabConvo</span>
          <span class="mt-1 block text-[8px] font-bold uppercase tracking-[0.2em] text-[#8a9ba5]">Lab science · Global</span>
        </span>
      </NuxtLink>

      <div class="hidden items-center gap-1 lg:flex">
        <NuxtLink
          v-for="item in navigation"
          :key="item.href"
          :to="item.href"
          class="relative rounded-lg px-3 py-2 text-[12px] font-semibold text-[#5f7482] transition hover:bg-[#f2f7fa] hover:text-[#27628C]"
          :class="isActive(item.href) ? 'bg-[#f2f7fa] text-[#27628C]' : ''"
        >
          {{ item.name }}
          <span v-if="isActive(item.href)" class="absolute inset-x-3 -bottom-[1.05rem] h-0.5 rounded-full bg-[#DE6129]" />
        </NuxtLink>
      </div>

      <div class="hidden items-center gap-2 lg:flex">
        <NuxtLink to="/donate" class="site-btn site-btn-ghost min-h-9 px-3.5 text-[11.5px]">Donate</NuxtLink>
        <button type="button" class="site-btn site-btn-primary min-h-9 px-4 text-[11.5px]" @click="openSubscriptionModal">
          Join the Convo
          <Icon name="lucide:arrow-up-right" class="h-3.5 w-3.5" />
        </button>
      </div>

      <button
        type="button"
        class="flex h-10 w-10 items-center justify-center rounded-xl border border-[#e4ebf0] text-[#0a202b] transition hover:border-[#27628C]/30 hover:text-[#27628C] lg:hidden"
        aria-label="Open menu"
        @click="isOpen = true"
      >
        <Icon name="lucide:menu" class="h-5 w-5" />
      </button>
    </nav>

    <!-- Mobile drawer -->
    <Teleport to="body">
      <Transition name="nav-fade">
        <div v-if="isOpen" class="fixed inset-0 z-[80] lg:hidden">
          <div class="absolute inset-0 bg-[#071d29]/45 backdrop-blur-sm" @click="isOpen = false" />
          <div class="absolute inset-y-0 right-0 flex w-full max-w-sm flex-col bg-white shadow-2xl">
            <div class="flex items-center justify-between border-b border-[#e4ebf0] px-5 py-4">
              <NuxtLink to="/" class="flex items-center gap-2" @click="isOpen = false">
                <img class="h-8 w-8 rounded-lg object-cover" src="@/assets/img/medlab-logo.jpeg" alt="MedLabConvo" />
                <span class="text-[13px] font-bold text-[#0a202b]">MedLabConvo</span>
              </NuxtLink>
              <button type="button" class="flex h-9 w-9 items-center justify-center rounded-lg border border-[#e4ebf0] text-[#5f7482]" aria-label="Close menu" @click="isOpen = false">
                <Icon name="lucide:x" class="h-4 w-4" />
              </button>
            </div>

            <div class="flex-1 overflow-y-auto px-5 py-6">
              <p class="site-eyebrow">Explore</p>
              <div class="mt-4 space-y-1">
                <NuxtLink
                  v-for="item in navigation"
                  :key="item.href"
                  :to="item.href"
                  class="flex items-center justify-between rounded-xl px-3 py-3 text-[15px] font-semibold text-[#0a202b] transition hover:bg-[#f2f7fa] hover:text-[#27628C]"
                  @click="isOpen = false"
                >
                  {{ item.name }}
                  <Icon name="lucide:arrow-up-right" class="h-4 w-4 text-[#8a9ba5]" />
                </NuxtLink>
                <NuxtLink to="/about-us" class="flex items-center justify-between rounded-xl px-3 py-3 text-[15px] font-semibold text-[#0a202b] hover:bg-[#f2f7fa]" @click="isOpen = false">
                  About us
                  <Icon name="lucide:arrow-up-right" class="h-4 w-4 text-[#8a9ba5]" />
                </NuxtLink>
                <NuxtLink to="/enquiries" class="flex items-center justify-between rounded-xl px-3 py-3 text-[15px] font-semibold text-[#0a202b] hover:bg-[#f2f7fa]" @click="isOpen = false">
                  Contact
                  <Icon name="lucide:arrow-up-right" class="h-4 w-4 text-[#8a9ba5]" />
                </NuxtLink>
              </div>
            </div>

            <div class="space-y-2 border-t border-[#e4ebf0] p-5">
              <button type="button" class="site-btn site-btn-accent w-full" @click="openSubscriptionModal(); isOpen = false">
                Subscribe to the Convo Stack
                <Icon name="lucide:arrow-up-right" class="h-4 w-4" />
              </button>
              <NuxtLink to="/donate" class="site-btn site-btn-ghost w-full" @click="isOpen = false">Support our work</NuxtLink>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </header>
</template>

<script setup lang="ts">
import { useSubscriptionModal } from '@/composables/modules/subscriptions/useSubscriptionModal'

const route = useRoute()
const { openSubscriptionModal } = useSubscriptionModal()
const isOpen = ref(false)

const navigation = [
  { name: 'Journo', href: '/journo' },
  { name: 'Convo Stack', href: '/convostack' },
  { name: 'LabCast', href: '/lab-cast' },
  { name: 'Programs', href: '/programs' },
  { name: 'Community', href: '/community' },
  { name: 'Shop', href: '/products' },
]

const isActive = (href: string) => route.path === href || (href !== '/' && route.path.startsWith(`${href}/`))

watch(() => route.fullPath, () => { isOpen.value = false })
</script>

<style scoped>
.nav-fade-enter-active,
.nav-fade-leave-active { transition: opacity 200ms ease; }
.nav-fade-enter-from,
.nav-fade-leave-to { opacity: 0; }
</style>
