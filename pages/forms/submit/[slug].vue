<script setup lang="ts">
import type { Form, FormResponse, SubmitFormPayload } from '@/types/form'
import { useSubmitFormByToken } from '@/composables/modules/forms/useSubmitFormByToken'
import { useFetchFormByToken } from '@/composables/modules/forms/useFetchFormByToken'
import { linkify } from '@/utils/linkify'
import SiteMedia from '@/components/site/SiteMedia.vue'

const route = useRoute()
const router = useRouter()

const { fetchFormByToken: fetchFormByTokenUtil } = useFetchFormByToken()
const { submitForm: submitFormUtil } = useSubmitFormByToken()

const slug = computed(() => route.params.slug as string)

const form = ref<Form | null>(null)
const loading = ref(true)
const submitting = ref(false)
const submitted = ref(false)
const error = ref<string | null>(null)
const submissionReference = ref('')
const progress = ref({ completed: 0, total: 0, valid: false })

const progressPercent = computed(() =>
  progress.value.total === 0
    ? 100
    : Math.round((progress.value.completed / progress.value.total) * 100),
)
const instructionsOpen = computed(() => (form.value?.instructions?.length || 0) < 700)
const estimatedMinutes = computed(() => {
  const fields = form.value?.fields?.length || 0
  return Math.max(2, Math.ceil(fields * 1.5))
})

const loadForm = async () => {
  try {
    loading.value = true
    error.value = null
    form.value = await fetchFormByTokenUtil(slug.value)
  } catch (err: any) {
    console.error('Error loading form:', err)
    error.value =
      err?.response?.data?.message ||
      err?.data?.message ||
      err?.message ||
      'Failed to load form. The form may not exist or is no longer active.'
  } finally {
    loading.value = false
  }
}

const handleSubmit = async (responses: FormResponse[], email?: string) => {
  if (!form.value) return

  try {
    submitting.value = true
    error.value = null

    const payload: SubmitFormPayload = {
      responses,
      submitterEmail: email || undefined,
    }
    const submission: any = await submitFormUtil(slug.value, payload)

    submissionReference.value = submission?._id || submission?.id || ''
    submitted.value = true

    if (form.value.redirectUrl) {
      window.setTimeout(() => {
        window.location.href = form.value!.redirectUrl!
      }, 2200)
    }
  } catch (err: any) {
    console.error('Error submitting form:', err)
    error.value =
      err?.response?.data?.message ||
      err?.data?.message ||
      err?.message ||
      'We could not submit your response. Please try again.'
  } finally {
    submitting.value = false
  }
}

const handleProgress = (payload: { completed: number; total: number; valid: boolean }) => {
  progress.value = payload
}

const submitAnother = () => {
  submitted.value = false
  submissionReference.value = ''
  error.value = null
  progress.value = { completed: 0, total: 0, valid: false }
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  loadForm()
})

useHead({
  title: () => (form.value ? `${form.value.title} | MedLabConvo` : 'Form | MedLabConvo'),
  meta: [
    {
      name: 'description',
      content: () => form.value?.description || 'Submit your response to MedLabConvo.',
    },
    { name: 'robots', content: 'noindex, nofollow' },
  ],
})

definePageMeta({ layout: 'empty' })
</script>

<template>
  <div class="min-h-screen bg-[#f6f8fa]">
    <div class="sticky top-0 z-50 w-full">
      <NavigationBar />
    </div>

    <main class="mx-auto max-w-6xl px-4 pb-16 pt-6 sm:px-6 lg:px-8 lg:pt-10">
      <NuxtLink
        to="/programs"
        class="group mb-6 inline-flex items-center gap-2 text-[12px] font-semibold text-slate-500 transition hover:text-[#27628C]"
      >
        <span class="flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 bg-white transition group-hover:border-[#27628C]/30 group-hover:bg-[#27628C]/5">
          <Icon name="lucide:arrow-left" class="h-3.5 w-3.5" />
        </span>
        Back to programs
      </NuxtLink>

      <!-- Loading -->
      <div v-if="loading" class="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div class="space-y-6">
          <div class="skeleton h-60 rounded-[24px]" />
          <div class="skeleton h-28 rounded-[22px]" />
          <div class="skeleton h-[480px] rounded-[22px]" />
        </div>
        <div class="hidden space-y-4 lg:block">
          <div class="skeleton h-40 rounded-[20px]" />
          <div class="skeleton h-32 rounded-[20px]" />
        </div>
      </div>

      <!-- Unavailable -->
      <div v-else-if="error && !form" class="mx-auto max-w-xl">
        <div class="rounded-[24px] border border-slate-200 bg-white p-8 text-center shadow-[0_18px_50px_-34px_rgba(3,57,88,0.28)] sm:p-10">
          <div class="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-500">
            <Icon name="lucide:file-warning" class="h-7 w-7" />
          </div>
          <h1 class="mt-5 text-xl font-bold tracking-tight text-slate-900">This form is unavailable</h1>
          <p class="mx-auto mt-2 max-w-sm text-[13px] leading-relaxed text-slate-500">{{ error }}</p>
          <button class="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#27628C] px-5 py-3 text-[12.5px] font-bold text-white transition hover:bg-[#1e4d6f]" @click="router.push('/programs')">
            Browse programs
            <Icon name="lucide:arrow-right" class="h-4 w-4" />
          </button>
        </div>
      </div>

      <!-- Submitted -->
      <div v-else-if="submitted && form" class="mx-auto max-w-2xl">
        <div class="overflow-hidden rounded-[26px] border border-slate-200 bg-white shadow-[0_24px_70px_-40px_rgba(3,57,88,0.35)]">
          <div class="h-1.5 bg-gradient-to-r from-[#27628C] via-[#3d86b5] to-[#DE6129]" />
          <div class="p-7 text-center sm:p-10">
            <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 ring-8 ring-emerald-50/50">
              <Icon name="lucide:check" class="h-8 w-8" stroke-width="2.5" />
            </div>
            <p class="mt-6 text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-600">Submission received</p>
            <h1 class="mt-2 text-2xl font-bold tracking-tight text-slate-900">Thank you for your response</h1>
            <div class="form-rich-text mx-auto mt-3 max-w-md text-[13.5px] leading-7 text-slate-500" v-html="linkify(form.successMessage || 'Your response has been recorded successfully. The MedLabConvo team will be in touch if needed.')" />

            <div v-if="submissionReference" class="mx-auto mt-6 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-[11px] text-slate-500">
              <Icon name="lucide:hash" class="h-3.5 w-3.5 text-slate-400" />
              Reference: <span class="font-semibold text-slate-700">{{ submissionReference.slice(-8).toUpperCase() }}</span>
            </div>

            <div class="mt-7 flex flex-col justify-center gap-2.5 sm:flex-row">
              <button v-if="!form.redirectUrl" class="inline-flex items-center justify-center gap-2 rounded-xl bg-[#27628C] px-5 py-3 text-[12.5px] font-bold text-white transition hover:bg-[#1e4d6f]" @click="submitAnother">
                <Icon name="lucide:rotate-ccw" class="h-4 w-4" />
                Submit another response
              </button>
              <button class="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-[12.5px] font-bold text-slate-600 transition hover:border-slate-300 hover:bg-slate-50" @click="router.push('/programs')">
                Back to programs
              </button>
            </div>

            <p v-if="form.redirectUrl" class="mt-6 flex items-center justify-center gap-2 text-[11px] text-slate-400">
              <Icon name="lucide:loader-2" class="h-3.5 w-3.5 animate-spin" />
              Redirecting you shortly…
            </p>
          </div>
        </div>
      </div>

      <!-- Form -->
      <div v-else-if="form" class="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div class="min-w-0 space-y-5">
          <!-- Hero -->
          <section class="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-[0_18px_50px_-34px_rgba(3,57,88,0.28)]">
            <div v-if="form.bannerImage" class="relative h-44 overflow-hidden bg-[#eef5f9] sm:h-56 lg:h-60">
              <SiteMedia :src="form.bannerImage" :alt="form.title" :label="form.title" icon="lucide:file-text" eager />
              <div class="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/45 via-transparent to-transparent" />
              <span class="absolute bottom-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-[#27628C] shadow-sm backdrop-blur">
                <Icon name="lucide:file-text" class="h-3 w-3" />
                Application form
              </span>
            </div>
            <div v-else class="h-1.5 bg-gradient-to-r from-[#27628C] via-[#3d86b5] to-[#DE6129]" />

            <div class="p-5 sm:p-7">
              <div class="flex flex-wrap items-center gap-2">
                <span class="inline-flex items-center gap-1.5 rounded-full bg-[#27628C]/5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-[#27628C]">
                  <span class="h-1.5 w-1.5 rounded-full bg-[#27628C]" />
                  {{ form.programTitle ? 'Programme application' : 'MedLabConvo form' }}
                </span>
                <span v-if="form.programTitle" class="inline-flex items-center rounded-full bg-[#DE6129]/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.1em] text-[#b24a1e]">
                  {{ form.programTitle }}
                </span>
              </div>

              <h1 class="mt-4 max-w-3xl text-[27px] font-bold leading-[1.12] tracking-[-0.03em] text-slate-950 sm:text-[34px]">
                {{ form.title }}
              </h1>
              <div v-if="form.description" class="form-rich-text mt-3 max-w-2xl text-[13px] leading-6 text-slate-500" v-html="linkify(form.description)" />

              <div class="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-slate-100 pt-4 text-[11px] font-medium text-slate-400">
                <span class="inline-flex items-center gap-1.5"><Icon name="lucide:lock" class="h-3.5 w-3.5" /> Secure form</span>
                <span class="inline-flex items-center gap-1.5"><Icon name="lucide:clock-3" class="h-3.5 w-3.5" /> About {{ estimatedMinutes }} minutes</span>
                <span class="inline-flex items-center gap-1.5"><Icon name="lucide:list-checks" class="h-3.5 w-3.5" /> {{ form.fields?.length || 0 }} questions</span>
              </div>
            </div>
          </section>

          <!-- Guidelines -->
          <details v-if="form.instructions" class="group rounded-[20px] border border-[#27628C]/15 bg-[#f3f8fb]" :open="instructionsOpen">
            <summary class="flex cursor-pointer list-none items-center justify-between gap-3 px-5 py-4 text-[12.5px] font-bold text-[#1e4d6f] [&::-webkit-details-marker]:hidden">
              <span class="flex items-center gap-2">
                <Icon name="lucide:book-open" class="h-4 w-4 text-[#27628C]" />
                Submission guidelines
              </span>
              <Icon name="lucide:chevron-down" class="h-4 w-4 text-[#27628C]/60 transition group-open:rotate-180" />
            </summary>
            <div class="form-rich-text guidelines-copy border-t border-[#27628C]/10 px-5 py-4 text-[12.5px] leading-7 text-[#48677a]" v-html="linkify(form.instructions)" />
          </details>

          <div v-if="error" class="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4">
            <Icon name="lucide:alert-circle" class="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
            <div>
              <p class="text-[12px] font-semibold text-red-700">Your response was not sent</p>
              <p class="mt-0.5 text-[11.5px] leading-relaxed text-red-600">{{ error }}</p>
            </div>
          </div>

          <FormRenderer :form="form" :submitting="submitting" @submit="handleSubmit" @progress="handleProgress" />
        </div>

        <!-- Sidebar -->
        <aside class="hidden space-y-4 lg:sticky lg:top-32 lg:block">
          <div class="rounded-[20px] border border-slate-200 bg-white p-5 shadow-[0_18px_45px_-36px_rgba(3,57,88,0.35)]">
            <div class="flex items-center justify-between gap-3">
              <p class="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400">Progress</p>
              <span class="text-[12px] font-bold tabular-nums text-[#27628C]">{{ progressPercent }}%</span>
            </div>
            <p class="mt-2 text-2xl font-bold tracking-tight text-slate-900">
              {{ progress.completed }}<span class="text-base font-medium text-slate-400">/{{ progress.total }}</span>
            </p>
            <p class="mt-0.5 text-[11px] text-slate-500">required questions complete</p>
            <div class="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-100">
              <div class="h-full rounded-full bg-[#27628C] transition-all duration-500" :style="{ width: `${progressPercent}%` }" />
            </div>
            <div class="mt-4 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold" :class="progress.valid ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'">
              <span class="h-1.5 w-1.5 rounded-full" :class="progress.valid ? 'bg-emerald-500' : 'bg-amber-500'" />
              {{ progress.valid ? 'Ready to submit' : 'In progress' }}
            </div>
          </div>

          <div class="rounded-[20px] border border-slate-200 bg-white p-5">
            <p class="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400">Before you submit</p>
            <ul class="mt-3 space-y-2.5 text-[11.5px] leading-relaxed text-slate-500">
              <li class="flex items-start gap-2"><Icon name="lucide:check" class="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#27628C]" /> Answer every required question marked with an asterisk.</li>
              <li class="flex items-start gap-2"><Icon name="lucide:check" class="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#27628C]" /> Wait for any attached file to finish uploading.</li>
              <li class="flex items-start gap-2"><Icon name="lucide:check" class="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#27628C]" /> Use a valid email address if you need a confirmation.</li>
            </ul>
          </div>

          <div class="rounded-[20px] border border-slate-200 bg-white p-5">
            <p class="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400">Need help?</p>
            <p class="mt-2 text-[11.5px] leading-relaxed text-slate-500">If you have a problem with this form, contact the MedLabConvo team.</p>
            <a href="mailto:admin@medlabconvo.com?subject=Help%20with%20a%20MedLabConvo%20form" class="mt-3 inline-flex items-center gap-1.5 text-[11.5px] font-semibold text-[#27628C] hover:underline">
              admin@medlabconvo.com
              <Icon name="lucide:arrow-up-right" class="h-3 w-3" />
            </a>
          </div>
        </aside>
      </div>
    </main>

    <!-- Submitting overlay -->
    <Transition name="fade">
      <div v-if="submitting" class="fixed inset-0 z-[100] flex items-center justify-center bg-white/75 p-4 backdrop-blur-sm">
        <div class="w-full max-w-xs rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-xl">
          <div class="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-[#27628C]/5">
            <Icon name="lucide:loader-2" class="h-5 w-5 animate-spin text-[#27628C]" />
          </div>
          <p class="mt-3 text-[12.5px] font-semibold text-slate-800">Sending your response…</p>
          <p class="mt-0.5 text-[10.5px] text-slate-400">Please do not close this page.</p>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.form-rich-text :deep(a) {
  color: #27628c;
  font-weight: 600;
  text-decoration: underline;
  text-underline-offset: 2px;
}

.guidelines-copy {
  white-space: pre-line;
}

.skeleton {
  position: relative;
  overflow: hidden;
  border: 1px solid #e8eef3;
  background: #eef4f8;
}

.skeleton::after {
  position: absolute;
  inset: 0;
  content: '';
  transform: translateX(-100%);
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.65), transparent);
  animation: skeleton-shimmer 1.45s infinite;
}

@keyframes skeleton-shimmer {
  100% { transform: translateX(100%); }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
