<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import SpeakerModal from '@/components/SpeakerModal.vue'
import SiteMedia from '@/components/site/SiteMedia.vue'
import SiteCta from '@/components/site/SiteCta.vue'
import { useGetProgram } from '@/composables/modules/programs/useGetProgram'
import { useRoute } from 'vue-router'
import { useCustomToast } from '@/composables/core/useCustomToast'

const route = useRoute()
const { loading, error, program, getProgram } = useGetProgram()
const { showToast } = useCustomToast()

onMounted(() => getProgram(route.params.slug as string))

const heroImage = computed(() => program.value?.image || program.value?.images?.[0] || '')
const applyLink = computed(() => {
  const item = program.value
  if (!item) return ''
  if (item.externalFormLink) return item.externalFormLink
  if (item.form?.slug || item.form?._id) return `/forms/submit/${item.form.slug || item.form._id}`
  if (item.formFields?.length) return `/programs/${item.slug}/apply`
  return ''
})
const isExternalApply = computed(() => /^https?:\/\//.test(applyLink.value))
const formattedDescription = computed(() => {
  if (!program.value?.description) return ''
  return program.value.description.split('\n\n').map((p: string) => `<p>${p.replace(/\n/g, '<br>')}</p>`).join('')
})
const dateLabel = (value?: string) => value ? new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Flexible'
const activeSpeaker = ref<any>(null)
const isSpeakerModalVisible = ref(false)
const openSpeakerModal = (speaker: any) => { activeSpeaker.value = speaker; isSpeakerModalVisible.value = true }

const shareProgram = async () => {
  if (!program.value) return
  const url = window.location.href
  try {
    if (navigator.share) await navigator.share({ title: program.value.title, url })
    else { await navigator.clipboard.writeText(url); showToast({ title: 'Link copied', message: 'Share it with someone who should see this.', toastType: 'success' }) }
  } catch { /* dismissed */ }
}

useHead({
  title: computed(() => program.value ? `${program.value.title} | MedLabConvo` : 'Programme | MedLabConvo'),
  meta: [{ name: 'description', content: computed(() => program.value?.description?.substring(0, 160) || 'Explore this MedLabConvo programme.') }],
})
</script>

<template>
  <main class="bg-white">
    <div v-if="loading" class="site-container py-20">
      <div class="grid gap-6 lg:grid-cols-2">
        <div class="site-skeleton h-[32rem]" />
        <div class="space-y-4"><div class="site-skeleton h-12" /><div class="site-skeleton h-40" /><div class="site-skeleton h-12" /></div>
      </div>
    </div>

    <div v-else-if="error || !program" class="site-container py-24">
      <div class="site-card mx-auto max-w-xl p-8 text-center">
        <span class="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#fdf1eb] text-[#DE6129]"><Icon name="lucide:compass" class="h-7 w-7" /></span>
        <h1 class="mt-5 text-xl font-bold text-[#0a202b]">This programme could not be found.</h1>
        <p class="mt-2 text-[12px] leading-6 text-[#5f7482]">{{ error || 'It may have been moved or is no longer active.' }}</p>
        <NuxtLink to="/programs" class="site-btn site-btn-primary mt-5">Back to programmes</NuxtLink>
      </div>
    </div>

    <template v-else>
      <!-- Hero -->
      <section class="relative overflow-hidden bg-[#033958] text-white">
        <div class="absolute inset-0 site-hero-grid opacity-60" />
        <div class="absolute inset-0 site-hero-glow" />
        <div class="site-container relative grid gap-10 py-12 sm:py-16 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:py-20">
          <div>
            <NuxtLink to="/programs" class="inline-flex items-center gap-2 text-[11px] font-semibold text-white/55 transition hover:text-white">
              <Icon name="lucide:arrow-left" class="h-3.5 w-3.5" /> All programmes
            </NuxtLink>
            <div class="mt-5 flex flex-wrap gap-2">
              <span class="site-chip !border-white/15 !bg-white/10 !text-white/70">{{ program.category || 'Programme' }}</span>
              <span class="site-chip !border-white/15 !bg-white/10 !text-white/70" :class="program.status === 'active' ? '!border-[#DE6129]/40 !bg-[#DE6129]/20 !text-[#ffd8c8]' : ''">{{ program.status === 'active' ? 'Applications open' : 'Currently closed' }}</span>
            </div>
            <h1 class="site-display mt-5 text-[clamp(2.5rem,5vw,4.6rem)] !text-white site-text-balance">{{ program.title }}</h1>
            <div class="site-rich mt-5 max-w-xl text-[0.95rem] leading-7 text-white/65" v-html="formattedDescription" />
            <div class="mt-7 flex flex-col gap-2.5 sm:flex-row">
              <NuxtLink v-if="applyLink && program.status === 'active'" :to="applyLink" :target="isExternalApply ? '_blank' : undefined" class="site-btn site-btn-light">
                {{ program.externalFormLink ? 'Apply on partner site' : 'Apply now' }}
                <Icon name="lucide:arrow-up-right" class="h-4 w-4" />
              </NuxtLink>
              <button type="button" class="site-btn site-btn-outline-light" @click="shareProgram"><Icon name="lucide:share-2" class="h-4 w-4" /> Share programme</button>
            </div>
            <div class="mt-7 flex flex-wrap gap-x-6 gap-y-2 border-t border-white/15 pt-5 text-[10px] font-semibold uppercase tracking-[0.1em] text-white/45">
              <span class="inline-flex items-center gap-1.5"><Icon name="lucide:clock-3" class="h-3.5 w-3.5 text-[#f1a37f]" />{{ program.duration || 'Flexible duration' }}</span>
              <span class="inline-flex items-center gap-1.5"><Icon name="lucide:calendar" class="h-3.5 w-3.5 text-[#f1a37f]" />{{ dateLabel(program.startDate || program.createdAt) }}</span>
              <span v-if="program.mode" class="inline-flex items-center gap-1.5"><Icon name="lucide:monitor" class="h-3.5 w-3.5 text-[#f1a37f]" />{{ program.mode }}</span>
            </div>
          </div>
          <div class="relative">
            <div class="site-card overflow-hidden !border-white/10 !bg-white/[0.06] p-2">
              <div class="aspect-[4/4.35] overflow-hidden rounded-[1.15rem]"><SiteMedia :src="heroImage" :alt="program.title" :label="program.category || 'Programme'" icon="lucide:graduation-cap" eager /></div>
            </div>
            <div class="absolute -bottom-4 -left-3 rounded-2xl border border-white/15 bg-[#0a2f42] p-4 shadow-xl sm:-left-6">
              <p class="text-[8px] font-bold uppercase tracking-[0.14em] text-white/45">Cohort experience</p>
              <p class="mt-1 text-[12px] font-bold text-white">Live sessions · mentorship · projects</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Snapshot -->
      <section class="border-b border-[#e4ebf0] bg-[#fbfcfc]">
        <div class="site-container grid gap-4 py-6 sm:grid-cols-4">
          <div v-for="item in [
            { label: 'Format', value: program.mode || 'Cohort-based' },
            { label: 'Duration', value: program.duration || 'Flexible' },
            { label: 'Start', value: dateLabel(program.startDate || program.createdAt) },
            { label: 'Investment', value: program.price ? `₦${program.price}` : 'Free / sponsored' },
          ]" :key="item.label">
            <p class="text-[9px] font-bold uppercase tracking-[0.12em] text-[#8a9ba5]">{{ item.label }}</p>
            <p class="mt-1 text-[12px] font-semibold text-[#0a202b]">{{ item.value }}</p>
          </div>
        </div>
      </section>

      <section class="site-section">
        <div class="site-container grid gap-10 lg:grid-cols-[1.05fr_.95fr]">
          <div>
            <p class="site-eyebrow">What you will leave with</p>
            <h2 class="site-h2 mt-3">Practical capability, not just content.</h2>
            <div v-if="program.highlights?.length" class="mt-6 grid gap-3 sm:grid-cols-2">
              <div v-for="(highlight, i) in program.highlights" :key="i" class="rounded-2xl border border-[#e4ebf0] bg-white p-5">
                <span class="text-[9px] font-bold tracking-[0.14em] text-[#c0ced7]">0{{ i + 1 }}</span>
                <h3 class="mt-4 text-[12px] font-bold text-[#0a202b]">{{ highlight.title }}</h3>
                <p class="mt-1 text-[10.5px] leading-5 text-[#5f7482]">{{ highlight.description }}</p>
              </div>
            </div>
            <div v-else class="mt-6 space-y-3 text-[12.5px] leading-7 text-[#5f7482]">
              <p>This programme is designed around practical exposure, peer learning and direct access to practitioners.</p>
            </div>
          </div>

          <div class="rounded-[1.5rem] bg-[#f7f9f8] p-6 sm:p-7">
            <p class="site-eyebrow">The focus</p>
            <h2 class="mt-2 text-[1.35rem] font-bold tracking-[-0.03em] text-[#0a202b]">What we will cover.</h2>
            <ul v-if="program.focusAreas?.length" class="mt-4 space-y-2.5">
              <li v-for="(area, i) in program.focusAreas" :key="i" class="flex items-start gap-3 rounded-xl border border-[#e4ebf0] bg-white p-3.5">
                <span class="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-[#eef5f9] text-[9px] font-bold text-[#27628C]">{{ i + 1 }}</span>
                <span class="text-[11.5px] font-medium leading-5 text-[#3b5361]">{{ area }}</span>
              </li>
            </ul>
            <p v-else class="mt-3 text-[12px] leading-6 text-[#5f7482]">The curriculum will be shared with accepted participants.</p>
          </div>
        </div>
      </section>

      <!-- Outcomes -->
      <section v-if="program.outcomes?.length" class="bg-[#033958] py-14 text-white sm:py-20">
        <div class="site-container">
          <p class="site-eyebrow !text-white/50">The outcome</p>
          <h2 class="site-h2 mt-3 !text-white">What changes after the cohort.</h2>
          <div class="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <div v-for="(outcome, i) in program.outcomes" :key="i" class="rounded-2xl border border-white/10 bg-white/5 p-5">
              <Icon name="lucide:badge-check" class="h-5 w-5 text-[#f1a37f]" />
              <p class="mt-4 text-[12px] leading-6 text-white/70">{{ outcome }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Schedule -->
      <section v-if="program.keyResponsibilities?.length" class="site-section">
        <div class="site-container">
          <p class="site-eyebrow">The rhythm</p>
          <h2 class="site-h2 mt-3">How the programme runs.</h2>
          <div class="mt-6 space-y-2.5">
            <div v-for="(schedule, i) in program.keyResponsibilities" :key="i" class="flex items-start gap-4 rounded-2xl border border-[#e4ebf0] bg-white p-5">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#eef5f9] text-[10px] font-bold text-[#27628C]">0{{ i + 1 }}</span>
              <p class="text-[12px] font-medium leading-6 text-[#3b5361]">{{ schedule }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Speakers -->
      <section v-if="program.speakers?.length" class="bg-[#f7f9f8] py-14 sm:py-20">
        <div class="site-container">
          <p class="site-eyebrow">Faculty & mentors</p>
          <h2 class="site-h2 mt-3">Learn from people doing the work.</h2>
          <div class="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <button v-for="(speaker, i) in program.speakers" :key="i" type="button" class="group text-left" @click="openSpeakerModal(speaker)">
              <div class="aspect-[4/4.5] overflow-hidden rounded-2xl border border-[#e4ebf0] bg-white">
                <SiteMedia :src="speaker.image" :alt="speaker.name" :label="speaker.name" icon="lucide:user" />
              </div>
              <p class="mt-3 text-[12px] font-bold text-[#0a202b] transition group-hover:text-[#27628C]">{{ speaker.name }}</p>
              <p class="mt-0.5 line-clamp-1 text-[10px] text-[#8a9ba5]">{{ speaker.title || 'Faculty' }}</p>
            </button>
          </div>
        </div>
      </section>

      <!-- Gallery -->
      <section v-if="program.images?.length > 1" class="site-section">
        <div class="site-container">
          <p class="site-eyebrow">Inside the cohort</p>
          <h2 class="site-h2 mt-3">A look at the room.</h2>
          <div class="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <div v-for="(img, i) in program.images" :key="i" class="aspect-[4/3] overflow-hidden rounded-2xl border border-[#eef2f5]"><SiteMedia :src="img" :alt="`${program.title} ${i + 1}`" label="Programme gallery" icon="lucide:image" /></div>
          </div>
        </div>
      </section>

      <SiteCta
        eyebrow="Take the next step"
        :title="program.status === 'active' ? 'The next cohort could be the one that changes your trajectory.' : 'Registration is currently closed.'"
        :description="program.status === 'active' ? 'Applications are reviewed on a rolling basis. If the programme is right for you, start your application today.' : 'Join the community and we will let you know when the next cohort opens.'"
        :primary-label="program.status === 'active' ? 'Apply now' : 'Join the community'"
        :primary-to="program.status === 'active' && applyLink ? applyLink : '/community'"
        secondary-label="Explore other programmes"
        secondary-to="/programs"
      />
    </template>

    <SpeakerModal v-if="activeSpeaker" :speaker="activeSpeaker" :is-visible="isSpeakerModalVisible" @close="isSpeakerModalVisible = false" />
  </main>
</template>
