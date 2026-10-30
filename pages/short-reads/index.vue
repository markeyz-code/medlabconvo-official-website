<script setup lang="ts">
import { useGetShortReads } from '@/composables/modules/short-reads/useGetShortReads'
import SiteHero from '@/components/site/SiteHero.vue'
import SiteMedia from '@/components/site/SiteMedia.vue'
import SiteSectionHeader from '@/components/site/SiteSectionHeader.vue'
import SiteCta from '@/components/site/SiteCta.vue'

const { shortReads, loading, getShortReads } = useGetShortReads()
const publishedReads = computed(() => shortReads.value.filter((read: any) => read.status === 'published'))
const featured = computed(() => publishedReads.value[0])

onMounted(() => getShortReads({ status: 'published' }))

useHead({
  title: 'Short Reads | MedLabConvo',
  meta: [{ name: 'description', content: 'Quick, visual stories from the world of medical laboratory science.' }],
})
</script>

<template>
  <main class="bg-white">
    <SiteHero
      eyebrow="Short Reads · Visual stories"
      title="Small stories. Long aftertaste."
      description="Quick, visual narratives from the laboratory and the people around it — designed to be read in a moment and remembered for longer."
      primary-label="Start reading"
      primary-to="#stories"
      secondary-label="Read Journo"
      secondary-to="/journo"
      theme="light"
    >
      <template #visual>
        <div class="relative mx-auto max-w-sm">
          <div class="site-card overflow-hidden p-2">
            <div class="aspect-[4/5] overflow-hidden rounded-xl"><SiteMedia :src="featured?.coverImageUrl" :alt="featured?.title || 'Short Reads'" label="Short Reads" icon="lucide:book-open" eager /></div>
          </div>
          <div class="absolute -bottom-4 -left-4 rounded-xl bg-[#DE6129] px-4 py-3 text-white shadow-lg">
            <p class="text-[8px] font-bold uppercase tracking-[0.14em] text-white/70">New visual stories</p>
            <p class="text-[12px] font-bold">{{ publishedReads.length }} to explore</p>
          </div>
        </div>
      </template>
    </SiteHero>

    <section id="stories" class="site-section">
      <div class="site-container">
        <SiteSectionHeader eyebrow="The collection" title="Read something worth keeping." description="A growing library of short-form stories about science, career, identity and the everyday life of the lab." />
        <div v-if="loading" class="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <div v-for="i in 6" :key="i" class="site-skeleton h-[26rem]" />
        </div>
        <div v-else-if="publishedReads.length" class="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <NuxtLink v-for="read in publishedReads" :key="read._id" :to="`/short-reads/${read.slug}`" class="site-card site-card-hover group overflow-hidden">
            <div class="relative aspect-[4/5] overflow-hidden">
              <SiteMedia :src="read.coverImageUrl" :alt="read.title" label="Short Read" icon="lucide:book-open" />
              <div class="absolute inset-0 bg-gradient-to-t from-[#031d29]/85 via-[#031d29]/10 to-transparent" />
              <div class="absolute inset-x-0 bottom-0 p-5">
                <span class="site-chip !border-white/20 !bg-white/10 !text-white/70">Short read</span>
                <h2 class="mt-3 text-[1.15rem] font-bold leading-tight tracking-[-0.03em] text-white">{{ read.title }}</h2>
                <p v-if="read.author" class="mt-1 text-[10px] text-white/60">By {{ read.author }}</p>
                <span class="mt-4 inline-flex items-center gap-1.5 text-[10px] font-bold text-white">Read story <Icon name="lucide:arrow-up-right" class="h-3.5 w-3.5" /></span>
              </div>
            </div>
          </NuxtLink>
        </div>
        <div v-else class="site-card mt-8 px-6 py-16 text-center">
          <h2 class="text-lg font-bold text-[#0a202b]">The next story is being written.</h2>
          <p class="mt-2 text-[12px] text-[#5f7482]">Check back soon for a new short read.</p>
        </div>
      </div>
    </section>

    <SiteCta eyebrow="Tell your story" title="The lab has more stories than it has pages." description="If you have a short story, visual essay or field note that belongs here, we would love to see it." primary-label="Pitch a short read" primary-to="/enquiries" secondary-label="Read Journo" secondary-to="/journo" />
  </main>
</template>
