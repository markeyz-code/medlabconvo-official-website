<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import Icon from '@/components/Icon.vue'
import SiteMedia from '@/components/site/SiteMedia.vue'
import { useGetTeamMembers } from '@/composables/modules/teams/useGetTeamMembers'
import { teams_api } from '@/api_factory/modules/teams'

const selectedMember = ref<any>(null)
const { getTeamMembers, teamMembers: members, loading } = useGetTeamMembers()
const backendCategories = ref<any[]>([])

onMounted(async () => {
  try {
    const data = await getTeamMembers()
    if (data) members.value = data.sort((a: any, b: any) => (a.position || 0) - (b.position || 0))
  } catch (error) {
    console.error('Leadership fetch error:', error)
  }
  try {
    const res = await teams_api.$_get_categories()
    backendCategories.value = res.data
  } catch (error) {
    console.error('Failed to fetch categories:', error)
  }
})

const activeCategories = computed(() => {
  const categoriesMap = new Map()
  if (backendCategories.value.length > 0) backendCategories.value.forEach((cat: any) => categoriesMap.set(cat.name, []))
  members.value.forEach((member: any) => {
    const category = member.roleCategory || 'Other teams'
    if (!categoriesMap.has(category)) categoriesMap.set(category, [])
    categoriesMap.get(category).push(member)
  })
  return Array.from(categoriesMap.entries())
    .map(([name, membersList]: any) => ({ name, members: membersList }))
    .filter((category: any) => category.members.length > 0)
})

const getSocialIcon = (type: string) => {
  switch (type) {
    case 'linkedin': return 'mdi:linkedin'
    case 'twitter': return 'mdi:twitter'
    case 'instagram': return 'mdi:instagram'
    case 'facebook': return 'mdi:facebook'
    default: return 'lucide:globe'
  }
}
</script>

<template>
  <section class="bg-[#f7f9f8] py-14 sm:py-20">
    <div class="site-container">
      <div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div class="max-w-2xl">
          <p class="site-eyebrow">Leadership</p>
          <h2 class="site-h2 mt-3">The architects of change.</h2>
          <p class="site-lead mt-3">Meet the board, executives and department leads building the conditions for laboratory science to thrive.</p>
        </div>
        <p class="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#8a9ba5]">Board · Executive · Departments</p>
      </div>

      <div v-if="loading" class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div v-for="i in 4" :key="i" class="site-skeleton h-72" />
      </div>

      <div v-else class="mt-9 space-y-12">
        <div v-for="category in activeCategories" :key="category.name">
          <div class="flex items-center gap-4">
            <h3 class="shrink-0 text-[10px] font-bold uppercase tracking-[0.16em] text-[#8a9ba5]">{{ category.name }}</h3>
            <span class="h-px flex-1 bg-[#e4ebf0]" />
          </div>
          <div class="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <button
              v-for="member in category.members"
              :key="member._id"
              type="button"
              class="group text-left"
              @click="selectedMember = member"
            >
              <div class="relative aspect-[4/4.5] overflow-hidden rounded-2xl border border-[#e4ebf0] bg-white">
                <SiteMedia :src="member.image" :alt="member.name" :label="member.name" icon="lucide:user" />
                <div class="absolute inset-0 bg-gradient-to-t from-[#031d29]/65 via-transparent to-transparent opacity-75 transition group-hover:opacity-95" />
                <div class="absolute inset-x-0 bottom-0 p-4">
                  <p class="text-[12px] font-bold text-white">{{ member.name }}</p>
                  <p class="mt-0.5 line-clamp-1 text-[9.5px] text-white/60">{{ member.title }}</p>
                </div>
                <span class="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-[#27628C] opacity-0 transition group-hover:opacity-100">
                  <Icon name="lucide:arrow-up-right" class="h-3.5 w-3.5" />
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>

      <div v-if="!loading && activeCategories.length === 0" class="site-card mt-8 px-6 py-14 text-center">
        <p class="text-[13px] font-semibold text-[#0a202b]">The board is currently in recess.</p>
      </div>
    </div>

    <Teleport to="body">
      <Transition name="leader-fade">
        <div v-if="selectedMember" class="fixed inset-0 z-[90] flex items-center justify-center p-4 sm:p-6">
          <div class="absolute inset-0 bg-[#031d29]/60 backdrop-blur-sm" @click="selectedMember = null" />
          <div class="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-[1.5rem] border border-[#e4ebf0] bg-white shadow-2xl">
            <button type="button" class="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-lg border border-[#e4ebf0] bg-white text-[#5f7482] transition hover:text-[#27628C]" aria-label="Close profile" @click="selectedMember = null">
              <Icon name="lucide:x" class="h-4 w-4" />
            </button>
            <div class="grid gap-6 p-6 sm:p-8 md:grid-cols-[.8fr_1.2fr]">
              <div>
                <div class="aspect-[4/4.6] overflow-hidden rounded-xl border border-[#e4ebf0]">
                  <SiteMedia :src="selectedMember.image" :alt="selectedMember.name" :label="selectedMember.name" icon="lucide:user" />
                </div>
                <div v-if="selectedMember.profiles?.length" class="mt-3 flex gap-2">
                  <a v-for="social in selectedMember.profiles" :key="social.type" :href="social.url" target="_blank" rel="noopener noreferrer" class="flex h-8 w-8 items-center justify-center rounded-lg border border-[#e4ebf0] text-[#5f7482] transition hover:border-[#27628C]/30 hover:text-[#27628C]">
                    <Icon :name="getSocialIcon(social.type)" class="h-4 w-4" />
                  </a>
                </div>
              </div>
              <div class="pt-2 md:pt-6">
                <p class="site-eyebrow">{{ selectedMember.roleCategory || 'Leadership' }}</p>
                <h3 class="mt-2 text-[1.7rem] font-bold tracking-[-0.04em] text-[#0a202b]">{{ selectedMember.name }}</h3>
                <p class="mt-1 text-[12px] font-semibold text-[#27628C]">{{ selectedMember.title }}</p>
                <div class="site-rich mt-4 text-[12.5px] leading-7 text-[#5f7482]" v-html="selectedMember.bio" />
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </section>
</template>

<style scoped>
.leader-fade-enter-active,
.leader-fade-leave-active { transition: opacity 180ms ease; }
.leader-fade-enter-from,
.leader-fade-leave-to { opacity: 0; }
</style>
