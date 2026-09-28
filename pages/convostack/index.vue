<template>
  <div class="min-h-screen bg-white font-sans text-gray-900 border-t border-gray-100">
    
    <!-- Substack-style Navigation Tab -->
    <nav class="border-b border-gray-100 sticky top-0 z-40 bg-white/80 backdrop-blur-md">
      <div class="max-w-5xl mx-auto px-6">
        <div class="flex items-center gap-8 h-14 overflow-x-auto no-scrollbar">
          <button 
            @click="activeCategory = ''"
            :class="[
              'text-sm font-medium transition-colors whitespace-nowrap border-b-2 h-full px-1',
              activeCategory === '' ? 'border-[#27628C] text-[#27628C]' : 'border-transparent text-gray-500 hover:text-gray-900'
            ]"
          >
            All Stories
          </button>
          <button 
            v-for="cat in categories" 
            :key="cat"
            @click="activeCategory = cat"
            :class="[
              'text-sm font-medium transition-colors whitespace-nowrap border-b-2 h-full px-1 capitalize',
              activeCategory === cat ? 'border-[#27628C] text-[#27628C]' : 'border-transparent text-gray-500 hover:text-gray-900'
            ]"
          >
            {{ cat }}
          </button>
        </div>
      </div>
    </nav>

    <!-- Main Content Area -->
    <main class="max-w-5xl mx-auto px-6 py-12 md:py-20">
      
      <!-- Loading State -->
      <div v-if="loading" class="flex flex-col items-center justify-center py-40 gap-6">
        <div class="w-10 h-10 border-4 border-gray-100 border-t-[#27628C] rounded-full animate-spin"></div>
        <p class="text-xs font-bold text-gray-400">Syncing with the Stack...</p>
      </div>

      <div v-else-if="filteredPublications.length > 0" class="space-y-24">
        
        <!-- Featured Publication (Top of the Stack) -->
        <section v-if="!activeCategory && !searchQuery" class="group relative grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <NuxtLink :to="`/convostack/${featuredPublication.slug}`" class="relative aspect-[16/9] md:aspect-[4/3] rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 shadow-sm transition-shadow group-hover:shadow-sm border border-slate-200">
            <img 
              v-if="featuredPublication.coverImage" 
              :src="featuredPublication.coverImage" 
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div v-else class="w-full h-full flex items-center justify-center bg-[#27628C]/5 text-[#27628C]">
               <Icon name="lucide:file-text" class="w-20 h-20 opacity-20" />
            </div>
          </NuxtLink>
          
          <div class="space-y-6">
            <div class="flex items-center gap-3">
              <span class="text-sm font-bold text-[#27628C] bg-[#27628C]/5 px-3 py-1 rounded-full capitalize">{{ featuredPublication.category }}</span>
              <span class="text-sm font-medium text-gray-400">{{ featuredPublication.readTime || 5 }} min read</span>
            </div>
            <NuxtLink :to="`/convostack/${featuredPublication.slug}`">
              <h2 class="text-xl md:text-lg font-bold text-gray-900 leading-tight tracking-normal hover:text-[#27628C] transition-colors">
                {{ featuredPublication.title }}
              </h2>
            </NuxtLink>
            <p class="text-lg text-gray-500 leading-relaxed line-clamp-3">
              {{ featuredPublication.excerpt }}
            </p>
            <div class="flex items-center gap-4 pt-4">
               <div class="w-10 h-10 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center font-bold text-[#27628C]">
                  {{ (featuredPublication.authorName || 'M').charAt(0) }}
               </div>
               <div class="flex flex-col">
                  <span class="text-sm font-bold text-gray-900">{{ featuredPublication.authorName || 'MedLabConvo' }}</span>
                  <span class="text-xs text-gray-400">{{ formatDate(featuredPublication.publishedAt || featuredPublication.createdAt) }}</span>
               </div>
            </div>
          </div>
        </section>

        <!-- The Main Feed -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-16">
          
          <!-- Recent Publications Column -->
          <section class="md:col-span-2 space-y-16">
            <div class="flex items-center justify-between border-b border-gray-100 pb-4">
               <h3 class="text-xs font-bold text-gray-400">{{ activeCategory || 'Latest' }} from the stack</h3>
               <div class="relative max-w-[200px]">
                  <input v-model="searchQuery" type="text" class="w-full pl-8 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-full text-xs outline-none focus:border-[#27628C] transition-all" />
                  <!-- <Icon name="lucide:search" class="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400" /> -->
               </div>
            </div>

            <div class="divide-y divide-gray-100">
              <article 
                v-for="pub in recentPublications" 
                :key="pub._id"
                class="py-10 first:pt-0 group"
              >
                <div class="flex flex-col md:flex-row gap-8">
                  <div class="flex-1 space-y-4">
                    <div class="flex items-center gap-3">
                       <span class="text-sm font-bold text-[#27628C] capitalize">{{ pub.category }}</span>
                       <span class="text-sm font-medium text-gray-400">{{ formatDate(pub.publishedAt || pub.createdAt) }}</span>
                    </div>
                    <NuxtLink :to="`/convostack/${pub.slug}`">
                      <h4 class="text-xl md:text-lg font-bold text-gray-900 group-hover:text-[#27628C] transition-colors leading-snug">
                        {{ pub.title }}
                      </h4>
                    </NuxtLink>
                    <p class="text-sm text-gray-500 line-clamp-3 leading-relaxed">
                      {{ pub.excerpt }}
                    </p>
                    <div class="flex items-center gap-4 pt-4 opacity-70">
                       <span class="text-sm font-bold text-gray-900">{{ pub.authorName || 'MedLabConvo Team' }}</span>
                       <span class="text-sm text-gray-400">{{ pub.readTime || 4 }} min read</span>
                    </div>
                  </div>
                  <NuxtLink :to="`/convostack/${pub.slug}`" class="w-full md:w-40 aspect-[4/3] rounded-xl overflow-hidden bg-gray-50 border border-gray-100 shrink-0 shadow-sm group-hover:shadow-md transition-all">
                    <img v-if="pub.coverImage" :src="pub.coverImage" class="w-full h-full object-cover transition-transform group-hover:scale-105" />
                    <div v-else class="w-full h-full flex items-center justify-center text-[#27628C]/20">
                       <Icon name="lucide:file" class="w-10 h-10" />
                    </div>
                  </NuxtLink>
                </div>
              </article>
            </div>
          </section>

          <!-- Sidebar (Recommendations & Substack Vibes) -->
          <aside class="space-y-12">
            <!-- Newsletter Widget -->
            <div class="bg-[#27628C]/5 p-8 rounded-3xl border border-[#27628C]/10 space-y-6">
               <h4 class="text-lg font-bold text-gray-900 tracking-tight leading-tight">Subscribe to the <br /> Convo Substack</h4>
               <p class="text-xs text-gray-500 leading-relaxed font-medium">Join 2,500+ professionals receiving curated diagnostic insights and research pulses.</p>
               <input 
                  type="email" 
 
                  class="w-full px-5 py-3 bg-white border border-[#27628C]/20 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#27628C]/20 transition-all shadow-sm" 
               />
               <button class="w-full py-3.5 bg-[#27628C] text-white rounded-xl text-xs font-bold shadow-sm border border-slate-100 hover:bg-gray-900 transition-all active:scale-95">
                  Subscribe for free
               </button>
            </div>

            <!-- Recommendations -->
            <div class="space-y-8">
               <h3 class="text-sm font-bold text-gray-400 border-b border-gray-100 pb-3">Recommendations</h3>
               <div class="space-y-8">
                  <div v-for="rec in filteredPublications.slice(0, 4)" :key="rec._id" class="flex items-start gap-4 group">
                     <span class="text-lg font-bold text-gray-200 mt-1  group-hover:text-[#27628C]/20 transition-colors">0{{ filteredPublications.indexOf(rec) + 1 }}</span>
                     <div class="space-y-1">
                        <NuxtLink :to="`/convostack/${rec.slug}`" class="text-sm font-bold text-gray-900 hover:text-[#27628C] transition-colors leading-tight block">
                           {{ rec.title }}
                        </NuxtLink>
                        <span class="text-sm font-bold text-[#27628C]/60 capitalize">{{ rec.authorName || 'MedLabConvo' }}</span>
                     </div>
                  </div>
               </div>
            </div>
          </aside>

        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-40 animate-in fade-in zoom-in duration-700">
        <div class="w-20 h-20 bg-gray-50 rounded-full mx-auto mb-8 flex items-center justify-center border border-gray-100">
           <Icon name="lucide:search" class="w-8 h-8 text-gray-300" />
        </div>
        <h3 class="text-xl font-bold text-gray-900 tracking-tight">Nothing found in the stack</h3>
        <p class="text-gray-400 mt-2 text-sm">We couldn't find any articles matching your search criteria.</p>
        <button @click="activeCategory = ''; searchQuery = ''" class="mt-8 text-[#27628C] text-xs font-bold hover:underline">View all stories</button>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { convostack_api } from '@/api_factory/modules/convostack'

const publications = ref([] as any[])
const loading = ref(true)
const searchQuery = ref('')
const activeCategory = ref('')

onMounted(async () => {
  loading.value = true
  try {
    const res = await convostack_api.$_get_publications()
    publications.value = res.data || []
  } catch (e) {
    console.error('Stack Retrieval Error:', e)
  } finally {
    loading.value = false
  }
})

const categories = computed(() => {
  const cats = [...new Set((publications.value || []).map((p: any) => p.category).filter(Boolean))]
  return cats
})

const filteredPublications = computed(() => {
  let list = publications.value || []
  if (activeCategory.value) {
    list = list.filter((p: any) => p.category === activeCategory.value)
  }
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase()
    list = list.filter((p: any) =>
      p.title?.toLowerCase().includes(q) || p.excerpt?.toLowerCase().includes(q) || p.authorName?.toLowerCase().includes(q)
    )
  }
  return list
})

const featuredPublication = computed(() => filteredPublications.value[0] || {})
const recentPublications = computed(() => filteredPublications.value.slice(1))

const formatDate = (date: string) => {
  if (!date) return ''
  return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
