<script setup lang="ts">
import type { Form, FormResponse, SubmitFormPayload } from '@/types/form'
import { useSubmitFormByToken } from '@/composables/modules/forms/useSubmitFormByToken'
import { useFetchFormByToken } from '@/composables/modules/forms/useFetchFormByToken'

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

const loadForm = async () => {
  try {
    loading.value = true
    error.value = null
    form.value = await fetchFormByTokenUtil(slug.value)
  } catch (err: any) {
    console.error('Error loading form:', err)
    error.value = err.data?.message || 'Failed to load form. The form may not exist or is no longer active.'
  } finally {
    loading.value = false
  }
}

const handleSubmit = async (responses: FormResponse[], email?: string) => {
  if (!form.value) return
  try {
    submitting.value = true
    error.value = null
    const payload: SubmitFormPayload = { responses, submitterEmail: email }
    await submitFormUtil(slug.value, payload)
    submitted.value = true
    if (form.value.redirectUrl) {
      setTimeout(() => { window.location.href = form.value!.redirectUrl! }, 2000)
    }
  } catch (err: any) {
    console.error('Error submitting form:', err)
    error.value = err.data?.message || 'Failed to submit form. Please try again.'
  } finally {
    submitting.value = false
  }
}

const submitAnother = () => {
  submitted.value = false
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => { loadForm() })

useHead({
  title: () => form.value ? form.value.title : 'Loading Form...',
  meta: [{ name: 'description', content: () => form.value?.description || 'Submit your response' }],
})

definePageMeta({ layout: "empty" })
</script>

<template>
  <!-- Sticky Navigation — sits flush at the very top, outside all padding -->
  <div class="sticky top-0 z-50 w-full">
    <NavigationBar />
  </div>

  <!-- Page body -->
  <div class="min-h-screen bg-gray-50/40">
    <div class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

      <!-- Back link -->
      <NuxtLink
        to="/programs"
        class="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors mb-8 group text-sm font-medium"
      >
        <Icon name="lucide:arrow-left" class="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
        Back to directory
      </NuxtLink>

      <!-- ── Loading ── -->
      <div v-if="loading" class="flex flex-col items-center justify-center py-24 text-center animate-fade-in">
        <div class="w-10 h-10 border-[3px] border-gray-200 border-t-[#27628C] rounded-full animate-spin mb-4"></div>
        <p class="text-sm font-semibold text-gray-500 tracking-wide">Loading form…</p>
      </div>

      <!-- ── Error ── -->
      <div v-else-if="error && !form" class="bg-white border border-gray-100 shadow-sm rounded-2xl p-10 text-center animate-fade-in">
        <div class="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center text-red-400 mx-auto mb-5">
          <Icon name="lucide:alert-circle" class="w-7 h-7" />
        </div>
        <h3 class="text-lg font-bold text-gray-900 mb-2">Form unavailable</h3>
        <p class="text-gray-500 text-sm mb-7 leading-relaxed">{{ error }}</p>
        <button
          @click="router.push('/programs')"
          class="px-6 py-2.5 bg-gray-900 text-white rounded-lg font-semibold text-sm hover:bg-black transition-colors"
        >
          Return to programs
        </button>
      </div>

      <!-- ── Success ── -->
      <div v-else-if="submitted && form" class="bg-white border border-gray-100 shadow-sm rounded-2xl p-10 text-center animate-fade-in">
        <div class="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-500 mx-auto mb-6">
          <Icon name="lucide:check-circle" class="w-8 h-8" />
        </div>
        <h3 class="text-xl font-bold text-gray-900 mb-3">Submitted successfully</h3>
        <p
          class="text-gray-500 text-sm mb-8 leading-relaxed max-w-sm mx-auto"
          v-html="linkify(form.successMessage || 'Thank you for your response. Your submission has been received.')"
        />
        <div class="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            v-if="!form.redirectUrl"
            @click="submitAnother"
            class="w-full sm:w-auto px-6 py-2.5 bg-[#27628C] text-white font-semibold text-sm rounded-lg hover:bg-[#1e4d6f] transition-colors"
          >
            Submit another response
          </button>
          <button
            @click="router.push('/programs')"
            class="w-full sm:w-auto px-6 py-2.5 bg-gray-100 text-gray-600 font-semibold text-sm rounded-lg hover:bg-gray-200 transition-colors"
          >
            Back to programs
          </button>
        </div>
        <p v-if="form.redirectUrl" class="mt-6 text-xs text-gray-400">Redirecting you shortly…</p>
      </div>

      <!-- ── Form Content ── -->
      <div v-else-if="form" class="space-y-6 animate-fade-in">

        <!-- Banner image -->
        <div
          v-if="form.bannerImage"
          class="overflow-hidden rounded-2xl bg-gray-100 border border-gray-100 aspect-video md:aspect-[21/9] flex items-center justify-center"
        >
          <img :src="form.bannerImage" class="w-full h-full object-cover" alt="Form Banner" />
        </div>

        <!-- Header card -->
        <div class="bg-white border border-gray-100 shadow-sm rounded-2xl p-7 space-y-4">
          <!-- Badges -->
          <div class="flex flex-wrap items-center gap-2">
            <span class="px-2.5 py-1 text-sm font-bold tracking-normal  bg-gray-100 text-gray-500 rounded-full">
              Registration form
            </span>
            <span
              v-if="form.programTitle"
              class="px-2.5 py-1 text-sm font-bold tracking-normal  bg-blue-50 text-blue-600 rounded-full"
            >
              {{ form.programTitle }}
            </span>
          </div>

          <h1 class="text-lg md:text-xl font-extrabold text-gray-900 tracking-tight leading-tight">
            {{ form.title }}
          </h1>

          <p
            v-if="form.description"
            class="text-sm text-gray-500 leading-relaxed"
            v-html="linkify(form.description)"
          />

          <!-- Instructions banner -->
          <div
            v-if="form.instructions"
            class="flex gap-3 p-4 bg-blue-50 rounded-xl border border-blue-100"
          >
            <Icon name="lucide:info" class="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
            <p class="text-sm text-blue-700 leading-relaxed" v-html="linkify(form.instructions)" />
          </div>
        </div>

        <!-- Form renderer card -->
        <div class="bg-white border border-gray-100 shadow-sm rounded-2xl p-7">
          <FormRenderer :form="form" @submit="handleSubmit" />
        </div>

        <!-- Error banner (inline, after load) -->
        <div v-if="error" class="flex items-start gap-3 p-4 bg-red-50 border border-red-100 rounded-xl">
          <Icon name="lucide:alert-circle" class="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
          <p class="text-sm text-red-600">{{ error }}</p>
        </div>
      </div>

    </div>

    <!-- Submitting overlay -->
    <Transition name="fade">
      <div
        v-if="submitting"
        class="fixed inset-0 bg-white/75 backdrop-blur-sm flex items-center justify-center z-[100]"
      >
        <div class="text-center space-y-4">
          <div class="w-10 h-10 border-[3px] border-gray-200 border-t-[#27628C] rounded-full animate-spin mx-auto"></div>
          <p class="text-sm font-semibold text-gray-600">Sending your response…</p>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
@keyframes fade-in {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
}
.animate-fade-in { animation: fade-in 0.5s ease-out forwards; }

.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>