<template>
  <main class="bg-white">
    <div v-if="loadingProgram" class="site-container py-20">
      <div class="grid gap-6 lg:grid-cols-2"><div class="site-skeleton h-[28rem]" /><div class="site-skeleton h-64" /></div>
    </div>

    <template v-else-if="program">
      <template v-if="success">
        <section class="site-container py-16 sm:py-24">
          <div class="site-card mx-auto max-w-xl p-7 text-center sm:p-10">
            <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600"><Icon name="lucide:check" class="h-8 w-8" /></div>
            <p class="mt-5 text-[10px] font-bold uppercase tracking-[0.16em] text-emerald-600">Application received</p>
            <h1 class="mt-2 text-2xl font-bold tracking-[-0.03em] text-[#0a202b]">You are in the running.</h1>
            <p class="mx-auto mt-2 max-w-sm text-[12px] leading-6 text-[#5f7482]">Your application for <span class="font-semibold text-[#0a202b]">{{ program.title }}</span> has been submitted. Check your inbox for the next steps.</p>
            <div class="mt-6 flex flex-col justify-center gap-2 sm:flex-row">
              <NuxtLink to="/programs" class="site-btn site-btn-primary">Explore more programmes</NuxtLink>
              <a v-if="hasWhatsappLink" href="https://chat.whatsapp.com/GnxsIILq4TbFTQ3W8WxbWQ" target="_blank" rel="noopener noreferrer" class="site-btn site-btn-ghost">Join the community</a>
            </div>
          </div>
        </section>
      </template>

      <template v-else>
        <SiteHero
          eyebrow="Programme application"
          :title="program.title"
          :description="program.formTitle || 'A short application to help us understand where you are and what you want from the cohort.'"
          theme="light"
          compact
        >
          <template #visual>
            <div class="site-card overflow-hidden p-2">
              <div class="aspect-[4/3.1] overflow-hidden rounded-xl"><SiteMedia :src="program.image || program.images?.[0]" :alt="program.title" :label="program.category || 'Programme'" icon="lucide:graduation-cap" eager /></div>
            </div>
          </template>
          <template #meta>
            <div class="flex flex-wrap items-center gap-x-5 gap-y-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-[#8a9ba5]">
              <span class="inline-flex items-center gap-1.5"><Icon name="lucide:clock-3" class="h-3.5 w-3.5 text-[#27628C]" />{{ program.duration || 'Flexible' }}</span>
              <span class="inline-flex items-center gap-1.5"><Icon name="lucide:list-checks" class="h-3.5 w-3.5 text-[#27628C]" />{{ (program.formFields || []).length }} questions</span>
            </div>
          </template>
        </SiteHero>

        <section class="site-section">
          <div class="site-container grid gap-7 lg:grid-cols-[1.1fr_.9fr] lg:items-start">
            <div class="min-w-0">
              <div v-if="program.status !== 'active'" class="site-card p-7 text-center">
                <span class="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#fdf1eb] text-[#DE6129]"><Icon name="lucide:lock" class="h-6 w-6" /></span>
                <h2 class="mt-4 text-lg font-bold text-[#0a202b]">Registration is closed.</h2>
                <p class="mt-1 text-[12px] text-[#5f7482]">This cohort is not accepting applications right now.</p>
                <NuxtLink to="/programs" class="site-btn site-btn-primary mt-5">Explore other programmes</NuxtLink>
              </div>

              <form v-else class="site-card p-5 sm:p-7" @submit.prevent="handleSubmit">
                <div class="flex items-end justify-between gap-4 border-b border-[#eef2f5] pb-4">
                  <div>
                    <p class="site-eyebrow">Your application</p>
                    <h2 class="mt-2 text-[1.35rem] font-bold tracking-[-0.03em] text-[#0a202b]">Tell us about you.</h2>
                  </div>
                  <span class="text-[10px] font-semibold text-[#8a9ba5]">{{ requiredFields.length }} required</span>
                </div>

                <div class="mt-5 space-y-6">
                  <div v-for="(field, index) in (program.formFields || [])" :key="field.id" class="space-y-2">
                    <label :for="field.id" class="flex items-baseline gap-2 text-[12.5px] font-semibold text-[#0a202b]">
                      <span class="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-[#eef5f9] text-[9px] font-bold text-[#27628C]">{{ index + 1 }}</span>
                      {{ field.label }}
                      <span v-if="field.required" class="text-[#DE6129]">*</span>
                      <span v-else class="text-[9px] font-semibold uppercase tracking-[0.08em] text-[#a4b2ba]">Optional</span>
                    </label>
                    <p v-if="field.description" class="pl-7 text-[10.5px] leading-5 text-[#8a9ba5]">{{ field.description }}</p>

                    <textarea v-if="field.type === 'textarea'" :id="field.id" v-model="formData[field.id]" rows="4" :required="field.required" class="mt-1.5 w-full resize-y rounded-lg border border-[#dfe7ee] bg-white px-3.5 py-3 text-[12px] leading-6 outline-none placeholder:text-[#b6c2cd] focus:border-[#27628C]/40" />
                    <select v-else-if="field.type === 'select'" :id="field.id" v-model="formData[field.id]" :required="field.required" class="mt-1.5 h-10 w-full rounded-lg border border-[#dfe7ee] bg-white px-3.5 text-[12px] text-[#0a202b] outline-none focus:border-[#27628C]/40">
                      <option value="" disabled>Choose an option</option>
                      <option v-for="option in field.options" :key="option" :value="option">{{ option }}</option>
                    </select>
                    <div v-else-if="field.type === 'radio'" class="mt-1.5 grid gap-2 sm:grid-cols-2">
                      <label v-for="option in field.options" :key="option" class="flex cursor-pointer items-center gap-2.5 rounded-lg border px-3.5 py-2.5 transition" :class="formData[field.id] === option ? 'border-[#27628C] bg-[#27628C]/5' : 'border-[#e4ebf0] bg-white hover:border-[#27628C]/30'">
                        <input v-model="formData[field.id]" type="radio" :value="option" :required="field.required" class="h-3.5 w-3.5 accent-[#27628C]" />
                        <span class="text-[11.5px] font-medium text-[#3b5361]">{{ option }}</span>
                      </label>
                    </div>
                    <div v-else-if="field.type === 'file'" class="mt-1.5">
                      <label :for="`file-${field.id}`" class="flex cursor-pointer items-center gap-3 rounded-lg border border-dashed border-[#d7e3ec] bg-[#fbfdff] px-4 py-3.5 transition hover:border-[#27628C]/40">
                        <span class="flex h-9 w-9 items-center justify-center rounded-lg bg-[#eef5f9] text-[#27628C]"><Icon :name="uploadingFields[field.id] ? 'lucide:loader-2' : formData[field.id] ? 'lucide:file-check-2' : 'lucide:cloud-upload'" class="h-4 w-4" :class="uploadingFields[field.id] ? 'animate-spin' : ''" /></span>
                        <span class="min-w-0">
                          <span class="block text-[11.5px] font-semibold text-[#0a202b]">{{ uploadingFields[field.id] ? 'Uploading…' : formData[field.id] ? 'File attached — replace' : 'Choose a file' }}</span>
                          <span class="mt-0.5 block text-[9.5px] text-[#8a9ba5]">PDF, DOC, DOCX or image · max 15 MB</span>
                        </span>
                      </label>
                      <input :id="`file-${field.id}`" type="file" class="sr-only" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.webp" @change="handleFileUpload(field.id, $event)" />
                      <a v-if="formData[field.id]" :href="formData[field.id]" target="_blank" rel="noopener noreferrer" class="mt-1.5 inline-flex items-center gap-1 text-[10px] font-semibold text-[#27628C] hover:underline">View uploaded file <Icon name="lucide:arrow-up-right" class="h-3 w-3" /></a>
                    </div>
                    <input v-else :id="field.id" v-model="formData[field.id]" :type="field.type === 'email' ? 'email' : field.type === 'number' ? 'number' : 'text'" :required="field.required" class="mt-1.5 h-10 w-full rounded-lg border border-[#dfe7ee] bg-white px-3.5 text-[12px] text-[#0a202b] outline-none placeholder:text-[#b6c2cd] focus:border-[#27628C]/40" :placeholder="field.placeholder || 'Type your answer'" />
                  </div>
                </div>

                <p v-if="formError || submitError" class="mt-4 rounded-lg border border-red-200 bg-red-50 px-3.5 py-2.5 text-[10.5px] leading-5 text-red-600">{{ formError || submitError }}</p>

                <button type="submit" :disabled="submitting || isUploadingAny || !isApplicationValid" class="site-btn site-btn-primary mt-5 w-full disabled:opacity-40">
                  <span v-if="submitting" class="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  {{ submitting ? 'Submitting application…' : isUploadingAny ? 'Waiting for uploads…' : 'Submit application' }}
                  <Icon v-if="!submitting && !isUploadingAny" name="lucide:arrow-up-right" class="h-3.5 w-3.5" />
                </button>
              </form>
            </div>

            <aside class="space-y-4 lg:sticky lg:top-28">
              <div class="rounded-2xl border border-[#e4ebf0] bg-[#fbfcfc] p-5">
                <p class="site-eyebrow">Before you submit</p>
                <ul class="mt-3 space-y-2.5 text-[10.5px] leading-5 text-[#5f7482]">
                  <li class="flex gap-2"><Icon name="lucide:check" class="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#27628C]" /> Complete every question marked with an asterisk.</li>
                  <li class="flex gap-2"><Icon name="lucide:check" class="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#27628C]" /> Wait for any file upload to finish.</li>
                  <li class="flex gap-2"><Icon name="lucide:check" class="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#27628C]" /> Use an email you check regularly.</li>
                </ul>
              </div>
              <div class="rounded-2xl bg-[#033958] p-5 text-white">
                <p class="text-[9px] font-bold uppercase tracking-[0.14em] text-white/45">Need help?</p>
                <p class="mt-2 text-[11.5px] leading-6 text-white/55">If something is not working, contact the team before the deadline.</p>
                <NuxtLink to="/enquiries" class="site-btn site-btn-light mt-3 w-full min-h-0 py-2.5 text-[10.5px]">Contact support</NuxtLink>
              </div>
            </aside>
          </div>
        </section>
      </template>
    </template>

    <div v-else class="site-container py-24">
      <div class="site-card mx-auto max-w-xl p-8 text-center"><h1 class="text-xl font-bold text-[#0a202b]">This application could not be loaded.</h1><NuxtLink to="/programs" class="site-btn site-btn-primary mt-5">Back to programmes</NuxtLink></div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useGetProgram } from '@/composables/modules/programs/useGetProgram'
import { useSubmitApplication } from '@/composables/modules/programs/useSubmitApplication'
import { useCustomToast } from '@/composables/core/useCustomToast'
import { upload_api } from '@/api_factory/core/upload'
import SiteHero from '@/components/site/SiteHero.vue'
import SiteMedia from '@/components/site/SiteMedia.vue'
import SiteCta from '@/components/site/SiteCta.vue'

const route = useRoute()
const { showToast } = useCustomToast()
const { program, loading: loadingProgram, getProgram } = useGetProgram()
const { loading: submitting, error: submitError, success, submitApplication } = useSubmitApplication()

const formData = ref<Record<string, any>>({})
const uploadingFields = ref<Record<string, boolean>>({})
const formError = ref('')

const requiredFields = computed(() =>
  (program.value?.formFields || []).filter((field: any) => field.required),
)

const isUploadingAny = computed(() => Object.values(uploadingFields.value).some(Boolean))

const isApplicationValid = computed(() =>
  requiredFields.value.every((field: any) => {
    const value = formData.value[field.id]
    return Array.isArray(value) ? value.length > 0 : String(value ?? '').trim().length > 0
  }),
)

// Initialize form data on mount
onMounted(async () => {
  const idOrSlug = route.params.slug as string
  const data = await getProgram(idOrSlug)
  
  if (data?.formFields) {
    data.formFields.forEach((field: any) => {
      formData.value[field.id] = field.type === 'radio' || field.type === 'select' ? '' : ''
    })
  }
})

const hasWhatsappLink = computed(() => {
  if (!program.value) return false
  return program.value.slug === 'biomedical-science-conference-2026' || 
         program.value.formFields?.some(f => f.description?.includes('chat.whatsapp.com'))
})

const handleFileUpload = async (fieldId: string, event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (!file) return

  const token = program.value?.registrationToken
  if (!token) {
    showToast({ title: 'Upload Failed', message: 'Registration token is missing', toastType: 'error' })
    return
  }

  if (file.size > 15 * 1024 * 1024) {
    showToast({ title: 'Upload Failed', message: 'File must be 15 MB or smaller', toastType: 'error' })
    return
  }

  uploadingFields.value[fieldId] = true
  formError.value = ''
  try {
    const payload = new FormData()
    payload.append('file', file)
    const response: any = await upload_api.$_program_upload(token, payload)

    if (response?.type === 'ERROR') {
      throw new Error(response?.data?.message || 'Upload failed')
    }

    const url = response?.data?.url || ''
    if (url) {
      formData.value[fieldId] = url
    } else {
      throw new Error('The server did not return a file URL')
    }
  } catch (error: any) {
    formError.value = error?.message || 'Upload failed. Please try again.'
    showToast({ title: 'Upload Failed', message: formError.value, toastType: 'error' })
  } finally {
    uploadingFields.value[fieldId] = false
  }
}

const handleSubmit = async () => {
  formError.value = ''

  if (!isApplicationValid.value) {
    formError.value = 'Please complete every required field before submitting.'
    showToast({ title: 'Incomplete form', message: formError.value, toastType: 'error' })
    return
  }

  if (!program.value?.registrationToken) {
    showToast({
      title: 'Error',
      message: 'Critical Error: Program registration token missing.',
      toastType: 'error'
    })
    return
  }

  // Format responses for backend
  const responses = Object.keys(formData.value)
    .map(key => {
      const field = program.value?.formFields?.find(f => f.id === key)
      return {
        fieldId: key,
        fieldLabel: field?.label || key,
        value: String(formData.value[key] ?? '').trim()
      }
    })
    .filter(response => response.value.length > 0)

  // Get email for backend tracking
  let emailField = program.value.formFields?.find(f => f.type === 'email')
  if (!emailField) {
    emailField = program.value.formFields?.find(f => f.label?.toLowerCase().includes('email'))
  }
  let email = emailField ? formData.value[emailField.id] : ''

  // Fallback: search all values for an email string
  if (!email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const possibleEmail = Object.values(formData.value).find(val => typeof val === 'string' && emailRegex.test(val.trim()))
    if (possibleEmail) email = possibleEmail.trim()
  }

  const payload = {
    applicantEmail: email,
    responses
  }

  try {
    await submitApplication(program.value.registrationToken, payload as any)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  } catch (err) {
    console.error('Submission failed', err)
  }
}
</script>

<style scoped>
@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slide-up {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in {
  animation: fade-in 1s ease-out forwards;
}

.animate-slide-up {
  animation: slide-up 0.6s ease-out forwards;
}

.delay-200 {
  animation-delay: 200ms;
}

.delay-300 {
  animation-delay: 300ms;
}

/* Custom switch behavior for radio labels */
input[type="radio"]:checked + span {
  color: #27628C;
}
</style>
