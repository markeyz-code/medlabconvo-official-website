<script setup lang="ts">
import type { Form, FormField, FormResponse } from '@/types/form'
import { FormFieldType } from '@/types/form'
import { upload_api } from '@/api_factory/core/upload'
import { linkify } from '@/utils/linkify'

type ProgressPayload = {
  completed: number
  total: number
  valid: boolean
}

const props = defineProps<{
  form: Form
  submitting?: boolean
}>()

const emit = defineEmits<{
  submit: [responses: FormResponse[], email?: string]
  progress: [payload: ProgressPayload]
}>()

const MAX_FILE_SIZE = 15 * 1024 * 1024
const ACCEPTED_FILE_TYPES = '.pdf,.doc,.docx,.jpg,.jpeg,.png,.webp,.gif'
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_PATTERN = /^[\d\s+()\-]{7,}$/

const formData = ref<Record<string, any>>({})
const submitterEmail = ref('')
const errors = ref<Record<string, string>>({})
const touched = ref<Record<string, boolean>>({})
const uploadingFields = ref<Record<string, boolean>>({})
const uploadedFiles = ref<Record<string, { name: string; size?: number; url: string } | null>>({})
const otherValues = ref<Record<string, string>>({})
const submitAttempted = ref(false)
const draggingField = ref<string | null>(null)
const formError = ref('')
const formEl = ref<HTMLFormElement | null>(null)

const fields = computed(() => props.form?.fields || [])
const emailField = computed(() => fields.value.find((field) => field.type === FormFieldType.EMAIL))
const showContactEmail = computed(() => !emailField.value)
const requiredFields = computed(() => fields.value.filter((field) => field.required))
const totalRequired = computed(() => requiredFields.value.length)
const completedRequired = computed(() =>
  requiredFields.value.filter((field) => !validateField(field, formData.value[field.id])).length,
)
const missingRequired = computed(() => Math.max(0, totalRequired.value - completedRequired.value))
const progressPercent = computed(() =>
  totalRequired.value === 0
    ? 100
    : Math.round((completedRequired.value / totalRequired.value) * 100),
)
const isUploading = computed(() => Object.values(uploadingFields.value).some(Boolean))
const contactEmailError = computed(() => {
  if (!showContactEmail.value || !submitterEmail.value.trim()) return ''
  return EMAIL_PATTERN.test(submitterEmail.value.trim()) ? '' : 'Enter a valid email address'
})
const isFormValid = computed(() => {
  if (isUploading.value || contactEmailError.value) return false
  if (Object.keys(errors.value).length > 0) return false
  return fields.value.every((field) => !validateField(field, formData.value[field.id]))
})
const submitLabel = computed(() => {
  if (props.submitting) return 'Submitting response…'
  if (isUploading.value) return 'Waiting for uploads…'
  if (missingRequired.value > 0) {
    return `Complete ${missingRequired.value} required field${missingRequired.value === 1 ? '' : 's'}`
  }
  return 'Submit response'
})

const isFieldEmpty = (field: FormField, value: any): boolean => {
  if (field.type === FormFieldType.CHECKBOX) {
    return !Array.isArray(value) || value.length === 0
  }
  return value === null || value === undefined || String(value).trim() === ''
}

const isPhoneField = (field: FormField): boolean =>
  field.type === FormFieldType.PHONE ||
  (field.type === FormFieldType.NUMBER && /phone|whatsapp|mobile|tel/i.test(field.label))

const inputType = (field: FormField): string => {
  if (isPhoneField(field)) return 'tel'
  if (field.type === FormFieldType.EMAIL) return 'email'
  if (field.type === FormFieldType.NUMBER) return 'number'
  if (field.type === FormFieldType.DATE) return 'date'
  if (field.type === FormFieldType.URL) return 'url'
  return 'text'
}

const inputMode = (field: FormField): 'tel' | 'numeric' | 'email' | 'url' | undefined => {
  if (isPhoneField(field)) return 'tel'
  if (field.type === FormFieldType.NUMBER) return 'numeric'
  if (field.type === FormFieldType.EMAIL) return 'email'
  if (field.type === FormFieldType.URL) return 'url'
  return undefined
}

const validateField = (field: FormField, value: any): string | null => {
  const empty = isFieldEmpty(field, value)

  if (field.required && empty) {
    return 'This field is required'
  }

  if (empty) return null

  if (field.type === FormFieldType.CHECKBOX && Array.isArray(value) && value.includes('Other')) {
    if (!otherValues.value[field.id]?.trim()) {
      return 'Please specify your other answer'
    }
  }

  if (
    (field.type === FormFieldType.RADIO || field.type === FormFieldType.SELECT) &&
    value === 'Other' &&
    !otherValues.value[field.id]?.trim()
  ) {
    return 'Please specify your other answer'
  }

  if (field.type === FormFieldType.EMAIL && !EMAIL_PATTERN.test(String(value))) {
    return 'Enter a valid email address'
  }

  if (isPhoneField(field) && !PHONE_PATTERN.test(String(value))) {
    return 'Enter a valid phone number'
  }

  if (field.type === FormFieldType.NUMBER && !isPhoneField(field)) {
    if (!/^-?\d+(\.\d+)?$/.test(String(value))) {
      return 'Enter a valid number'
    }
  }

  if (field.type === FormFieldType.URL) {
    try {
      new URL(String(value))
    } catch {
      return 'Enter a valid URL'
    }
  }

  if (field.validation) {
    try {
      if (!new RegExp(field.validation).test(String(value))) {
        return 'This answer does not match the expected format'
      }
    } catch {
      // Ignore an invalid admin-configured pattern.
    }
  }

  return null
}

const setFieldError = (field: FormField, message: string | null) => {
  if (message) {
    errors.value[field.id] = message
  } else {
    delete errors.value[field.id]
  }
}

const validateFieldIfNeeded = (field: FormField) => {
  if (touched.value[field.id] || submitAttempted.value) {
    setFieldError(field, validateField(field, formData.value[field.id]))
  }
}

const touchField = (field: FormField) => {
  touched.value[field.id] = true
  validateFieldIfNeeded(field)
}

const handleFieldInput = (field: FormField) => {
  if (touched.value[field.id] || submitAttempted.value) {
    setFieldError(field, validateField(field, formData.value[field.id]))
  }
  formError.value = ''
}

const handleChoiceChange = (field: FormField) => {
  touchField(field)
}

const handleCheckboxChange = (field: FormField, option: string, checked: boolean) => {
  if (!Array.isArray(formData.value[field.id])) {
    formData.value[field.id] = []
  }

  if (checked) {
    formData.value[field.id].push(option)
  } else {
    formData.value[field.id] = formData.value[field.id].filter((item: string) => item !== option)
  }

  touchField(field)
}

const initializeFormData = () => {
  const nextData: Record<string, any> = {}
  const nextOther: Record<string, string> = {}

  fields.value.forEach((field) => {
    nextData[field.id] = field.type === FormFieldType.CHECKBOX ? [] : ''
    nextOther[field.id] = ''
  })

  formData.value = nextData
  otherValues.value = nextOther
  errors.value = {}
  touched.value = {}
  uploadingFields.value = {}
  uploadedFiles.value = {}
  submitterEmail.value = ''
  submitAttempted.value = false
  formError.value = ''
  emitProgress()
}

const emitProgress = () => {
  emit('progress', {
    completed: completedRequired.value,
    total: totalRequired.value,
    valid: isFormValid.value,
  })
}

const scrollToFirstError = async () => {
  await nextTick()
  const firstField = fields.value.find((field) => errors.value[field.id])
  const target = firstField
    ? document.getElementById(`field-${firstField.id}`)
    : document.getElementById('submitter-email')

  target?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  target?.focus?.({ preventScroll: true })
}

const buildResponses = (): FormResponse[] =>
  fields.value.map((field) => {
    let value = formData.value[field.id]

    if (
      (field.type === FormFieldType.RADIO || field.type === FormFieldType.SELECT) &&
      value === 'Other'
    ) {
      value = `Other: ${otherValues.value[field.id].trim()}`
    } else if (
      field.type === FormFieldType.CHECKBOX &&
      Array.isArray(value) &&
      value.includes('Other')
    ) {
      value = value.map((item: string) =>
        item === 'Other' ? `Other: ${otherValues.value[field.id].trim()}` : item,
      )
    }

    return {
      fieldId: field.id,
      fieldLabel: field.label,
      value: Array.isArray(value) ? value.join(', ') : String(value ?? '').trim(),
    }
  })

const handleSubmit = async () => {
  submitAttempted.value = true
  formError.value = ''
  errors.value = {}

  let hasErrors = false

  fields.value.forEach((field) => {
    const message = validateField(field, formData.value[field.id])
    if (message) {
      errors.value[field.id] = message
      hasErrors = true
    }
  })

  if (showContactEmail.value && contactEmailError.value) {
    hasErrors = true
  }

  if (isUploading.value) {
    formError.value = 'Please wait for your file upload to finish before submitting.'
    hasErrors = true
  }

  if (hasErrors) {
    await scrollToFirstError()
    return
  }

  if (!isFormValid.value) {
    formError.value = 'Please complete all required fields before submitting.'
    await scrollToFirstError()
    return
  }

  const email = emailField.value
    ? String(formData.value[emailField.value.id] || '').trim()
    : submitterEmail.value.trim()

  emit('submit', buildResponses(), email || undefined)
}

const validateFile = (file: File): string | null => {
  if (file.size > MAX_FILE_SIZE) {
    return 'File is too large. Maximum size is 15 MB.'
  }

  const extension = (file.name.split('.').pop() || '').toLowerCase()
  if (!['pdf', 'doc', 'docx', 'jpg', 'jpeg', 'png', 'webp', 'gif'].includes(extension)) {
    return 'Upload a PDF, Word document, or image.'
  }

  return null
}

const handleFileUpload = async (field: FormField, event: Event) => {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file) return

  await uploadFile(field, file)
  input.value = ''
}

const handleDrop = async (field: FormField, event: DragEvent) => {
  draggingField.value = null
  const file = event.dataTransfer?.files?.[0]
  if (!file) return
  await uploadFile(field, file)
}

const uploadFile = async (field: FormField, file: File) => {
  const localError = validateFile(file)
  if (localError) {
    errors.value[field.id] = localError
    touched.value[field.id] = true
    return
  }

  const token = props.form.accessToken || props.form.slug
  if (!token) {
    errors.value[field.id] = 'This form is missing its upload token. Please contact the organizer.'
    return
  }

  uploadingFields.value[field.id] = true
  errors.value[field.id] = ''
  formError.value = ''
  formData.value[field.id] = ''
  uploadedFiles.value[field.id] = null

  try {
    const payload = new FormData()
    payload.append('file', file)

    const response: any = await upload_api.$_form_upload(token, payload)
    if (response?.type === 'ERROR') {
      throw new Error(response?.data?.message || 'Upload failed')
    }

    const uploaded = response?.data
    if (!uploaded?.url) {
      throw new Error('The server did not return a file URL.')
    }

    formData.value[field.id] = uploaded.url
    uploadedFiles.value[field.id] = {
      name: uploaded.name || file.name,
      size: uploaded.size || file.size,
      url: uploaded.url,
    }
    touched.value[field.id] = true
    setFieldError(field, null)
  } catch (err: any) {
    errors.value[field.id] =
      err?.response?.data?.message || err?.message || 'Upload failed. Please try again.'
    touched.value[field.id] = true
  } finally {
    uploadingFields.value[field.id] = false
    emitProgress()
  }
}

const removeFile = (field: FormField) => {
  formData.value[field.id] = ''
  uploadedFiles.value[field.id] = null
  if (touched.value[field.id]) {
    setFieldError(field, validateField(field, ''))
  }
  emitProgress()
}

const formatFileSize = (bytes?: number) => {
  if (!bytes) return ''
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

watch(
  () => props.form,
  () => initializeFormData(),
  { immediate: true },
)

watch(
  [formData, otherValues],
  () => {
    fields.value.forEach((field) => validateFieldIfNeeded(field))
    emitProgress()
  },
  { deep: true },
)

watch(contactEmailError, () => emitProgress())
</script>

<template>
  <form ref="formEl" class="space-y-6" novalidate @submit.prevent="handleSubmit">
    <section class="form-card">
      <div class="border-b border-slate-100 px-5 py-5 sm:px-7 sm:py-6">
        <p class="text-[11px] font-bold uppercase tracking-[0.16em] text-[#27628C]">Your response</p>
        <div class="mt-2 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 class="text-[19px] font-bold tracking-tight text-slate-900">Complete the form</h2>
            <p class="mt-1 text-[13px] leading-relaxed text-slate-500">
              {{ fields.length }} question{{ fields.length === 1 ? '' : 's' }}
              <span v-if="totalRequired"> · {{ totalRequired }} required</span>
            </p>
          </div>
          <div class="inline-flex w-fit items-center gap-2 rounded-full bg-[#27628C]/5 px-3 py-1.5 text-[11px] font-semibold text-[#27628C]">
            <Icon name="lucide:shield-check" class="h-3.5 w-3.5" />
            Secure submission
          </div>
        </div>
      </div>

      <div class="divide-y divide-slate-100">
        <!-- Optional confirmation email, hidden when the form already asks for one -->
        <div v-if="showContactEmail" class="px-5 py-6 sm:px-7">
          <div class="flex items-start gap-3">
            <span class="question-number">0</span>
            <div class="min-w-0 flex-1">
              <label for="submitter-email" class="form-label">
                Contact email
                <span class="form-optional">Optional</span>
              </label>
              <p class="form-description">
                Add an email if you would like a confirmation of your submission.
              </p>
              <div class="relative mt-3">
                <Icon name="lucide:mail" class="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  id="submitter-email"
                  v-model="submitterEmail"
                  type="email"
                  autocomplete="email"
                  placeholder="you@example.com"
                  class="form-input pl-11"
                  :class="{ 'form-input-error': !!contactEmailError }"
                  :aria-invalid="!!contactEmailError"
                  @input="formError = ''"
                />
              </div>
              <p v-if="contactEmailError" class="form-error">
                <Icon name="lucide:alert-circle" class="h-3.5 w-3.5" />
                {{ contactEmailError }}
              </p>
            </div>
          </div>
        </div>

        <div
          v-for="(field, index) in fields"
          :id="`field-${field.id}`"
          :key="field.id"
          class="scroll-mt-28 px-5 py-6 sm:px-7"
          :data-error="!!errors[field.id]"
        >
          <div class="flex items-start gap-3">
            <span class="question-number">{{ index + 1 }}</span>
            <div class="min-w-0 flex-1">
              <label :for="field.id" class="form-label">
                <span v-html="linkify(field.label)" />
                <span v-if="field.required" class="ml-1 text-[#DE6129]" aria-hidden="true">*</span>
                <span v-else class="form-optional">Optional</span>
              </label>
              <p v-if="field.description" class="form-description" v-html="linkify(field.description)" />

              <!-- Text, email, phone, number, URL and date -->
              <input
                v-if="[FormFieldType.TEXT, FormFieldType.EMAIL, FormFieldType.PHONE, FormFieldType.NUMBER, FormFieldType.URL, FormFieldType.DATE].includes(field.type)"
                :id="field.id"
                v-model="formData[field.id]"
                :type="inputType(field)"
                :inputmode="inputMode(field)"
                :placeholder="field.placeholder || 'Type your answer'"
                class="form-input mt-3"
                :class="{ 'form-input-error': !!errors[field.id] }"
                :aria-invalid="!!errors[field.id]"
                :aria-describedby="errors[field.id] ? `error-${field.id}` : undefined"
                @blur="touchField(field)"
                @input="handleFieldInput(field)"
              />

              <!-- Long answer -->
              <textarea
                v-else-if="field.type === FormFieldType.TEXTAREA"
                :id="field.id"
                v-model="formData[field.id]"
                rows="5"
                :placeholder="field.placeholder || 'Share your answer'"
                class="form-input mt-3 min-h-[132px] resize-y"
                :class="{ 'form-input-error': !!errors[field.id] }"
                :aria-invalid="!!errors[field.id]"
                @blur="touchField(field)"
                @input="handleFieldInput(field)"
              />

              <!-- File upload -->
              <div
                v-else-if="field.type === FormFieldType.FILE"
                class="mt-3"
                @dragover.prevent="draggingField = field.id"
                @dragleave.prevent="draggingField = null"
                @drop.prevent="handleDrop(field, $event)"
              >
                <input
                  :id="field.id"
                  type="file"
                  class="sr-only"
                  :accept="ACCEPTED_FILE_TYPES"
                  @change="handleFileUpload(field, $event)"
                />

                <div
                  class="file-dropzone"
                  :class="{
                    'file-dropzone-error': !!errors[field.id],
                    'file-dropzone-active': draggingField === field.id,
                  }"
                >
                  <div v-if="uploadingFields[field.id]" class="flex items-center gap-3">
                    <span class="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#27628C]/10">
                      <Icon name="lucide:loader-2" class="h-5 w-5 animate-spin text-[#27628C]" />
                    </span>
                    <div>
                      <p class="text-[13px] font-semibold text-slate-900">Uploading your file…</p>
                      <p class="mt-0.5 text-[11.5px] text-slate-500">Please keep this page open.</p>
                    </div>
                  </div>

                  <div v-else-if="formData[field.id]" class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div class="flex min-w-0 items-center gap-3">
                      <span class="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                        <Icon name="lucide:file-check-2" class="h-5 w-5" />
                      </span>
                      <div class="min-w-0">
                        <p class="truncate text-[13px] font-semibold text-slate-900">
                          {{ uploadedFiles[field.id]?.name || 'Uploaded file' }}
                        </p>
                        <p class="mt-0.5 text-[11.5px] text-slate-500">
                          <span v-if="uploadedFiles[field.id]?.size">{{ formatFileSize(uploadedFiles[field.id]?.size) }} · </span>
                          File attached
                        </p>
                      </div>
                    </div>
                    <div class="flex shrink-0 items-center gap-2">
                      <a
                        :href="formData[field.id]"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="form-file-action"
                      >
                        <Icon name="lucide:external-link" class="h-3.5 w-3.5" />
                        View
                      </a>
                      <label :for="field.id" class="form-file-action cursor-pointer">
                        Replace
                      </label>
                      <button type="button" class="form-file-remove" aria-label="Remove uploaded file" @click="removeFile(field)">
                        <Icon name="lucide:x" class="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>

                  <label v-else :for="field.id" class="flex cursor-pointer flex-col items-center gap-2 text-center sm:flex-row sm:text-left">
                    <span class="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#27628C]/5 text-[#27628C]">
                      <Icon name="lucide:cloud-upload" class="h-5 w-5" />
                    </span>
                    <span class="min-w-0">
                      <span class="block text-[13px] font-semibold text-slate-900">
                        Click to upload <span class="font-medium text-slate-500">or drag and drop</span>
                      </span>
                      <span class="mt-0.5 block text-[11.5px] leading-relaxed text-slate-500">
                        PDF, DOC, DOCX, PNG or JPG · up to 15 MB
                      </span>
                    </span>
                  </label>
                </div>
              </div>

              <!-- Select -->
              <div v-else-if="field.type === FormFieldType.SELECT" class="mt-3">
                <select
                  :id="field.id"
                  v-model="formData[field.id]"
                  class="form-input form-select"
                  :class="{ 'form-input-error': !!errors[field.id] }"
                  :aria-invalid="!!errors[field.id]"
                  @change="handleChoiceChange(field)"
                >
                  <option value="" disabled>Select an option</option>
                  <option
                    v-for="option in (field.allowOther ? [...(field.options || []), 'Other'] : (field.options || []))"
                    :key="option"
                    :value="option"
                  >
                    {{ option }}
                  </option>
                </select>
                <input
                  v-if="formData[field.id] === 'Other'"
                  v-model="otherValues[field.id]"
                  type="text"
                  class="form-input mt-3"
                  placeholder="Please specify"
                  @blur="touchField(field)"
                  @input="handleFieldInput(field)"
                />
              </div>

              <!-- Radio -->
              <div v-else-if="field.type === FormFieldType.RADIO" class="mt-3">
                <div class="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                  <label
                    v-for="option in (field.allowOther ? [...(field.options || []), 'Other'] : (field.options || []))"
                    :key="option"
                    class="option-card"
                    :class="{ 'option-card-selected': formData[field.id] === option }"
                  >
                    <input
                      type="radio"
                      :name="field.id"
                      :value="option"
                      :checked="formData[field.id] === option"
                      class="sr-only"
                      @change="formData[field.id] = option; handleChoiceChange(field)"
                    />
                    <span class="option-indicator" :class="{ 'option-indicator-selected': formData[field.id] === option }">
                      <span v-if="formData[field.id] === option" class="h-1.5 w-1.5 rounded-full bg-white" />
                    </span>
                    <span class="text-[13px] font-medium leading-snug" :class="formData[field.id] === option ? 'text-[#27628C]' : 'text-slate-700'" v-html="linkify(option)" />
                  </label>
                </div>
                <input
                  v-if="formData[field.id] === 'Other'"
                  v-model="otherValues[field.id]"
                  type="text"
                  class="form-input mt-3"
                  placeholder="Please specify"
                  @blur="touchField(field)"
                  @input="handleFieldInput(field)"
                />
              </div>

              <!-- Checkbox -->
              <div v-else-if="field.type === FormFieldType.CHECKBOX" class="mt-3">
                <div class="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                  <label
                    v-for="option in (field.allowOther ? [...(field.options || []), 'Other'] : (field.options || []))"
                    :key="option"
                    class="option-card"
                    :class="{ 'option-card-selected': (formData[field.id] || []).includes(option) }"
                  >
                    <input
                      type="checkbox"
                      :value="option"
                      :checked="(formData[field.id] || []).includes(option)"
                      class="sr-only"
                      @change="handleCheckboxChange(field, option, ($event.target as HTMLInputElement).checked)"
                    />
                    <span class="option-indicator option-indicator-square" :class="{ 'option-indicator-selected': (formData[field.id] || []).includes(option) }">
                      <Icon v-if="(formData[field.id] || []).includes(option)" name="lucide:check" class="h-3 w-3 text-white" />
                    </span>
                    <span class="text-[13px] font-medium leading-snug" :class="(formData[field.id] || []).includes(option) ? 'text-[#27628C]' : 'text-slate-700'" v-html="linkify(option)" />
                  </label>
                </div>
                <input
                  v-if="(formData[field.id] || []).includes('Other')"
                  v-model="otherValues[field.id]"
                  type="text"
                  class="form-input mt-3"
                  placeholder="Please specify"
                  @blur="touchField(field)"
                  @input="handleFieldInput(field)"
                />
              </div>

              <p v-if="errors[field.id]" :id="`error-${field.id}`" class="form-error">
                <Icon name="lucide:alert-circle" class="h-3.5 w-3.5" />
                {{ errors[field.id] }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="form-card p-5 sm:p-7">
      <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div class="flex items-start gap-3">
          <span class="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#27628C]/5 text-[#27628C]">
            <Icon name="lucide:list-checks" class="h-4 w-4" />
          </span>
          <div>
            <p class="text-[13px] font-semibold text-slate-900">Submission readiness</p>
            <p class="mt-0.5 text-[11.5px] text-slate-500">
              {{ completedRequired }} of {{ totalRequired }} required question{{ totalRequired === 1 ? '' : 's' }} complete
            </p>
          </div>
        </div>
        <span class="text-[12px] font-bold tabular-nums text-[#27628C]">{{ progressPercent }}%</span>
      </div>

      <div class="mt-4 h-1.5 overflow-hidden rounded-full bg-slate-100">
        <div
          class="h-full rounded-full bg-[#27628C] transition-all duration-500"
          :style="{ width: `${progressPercent}%` }"
        />
      </div>

      <p v-if="formError" class="form-error mt-4">
        <Icon name="lucide:alert-circle" class="h-3.5 w-3.5" />
        {{ formError }}
      </p>

      <button
        type="submit"
        class="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#27628C] px-5 py-3.5 text-[13px] font-bold text-white transition hover:bg-[#1e4d6f] disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-500"
        :disabled="!isFormValid || props.submitting || isUploading"
      >
        <Icon v-if="props.submitting" name="lucide:loader-2" class="h-4 w-4 animate-spin" />
        <Icon v-else-if="isUploading" name="lucide:cloud-upload" class="h-4 w-4" />
        <span>{{ submitLabel }}</span>
        <Icon v-if="!props.submitting && !isUploading && isFormValid" name="lucide:send" class="h-4 w-4" />
      </button>

      <div class="mt-4 flex items-start justify-center gap-2 text-center text-[11px] leading-relaxed text-slate-400">
        <Icon name="lucide:lock" class="mt-0.5 h-3 w-3 shrink-0" />
        <p>Your response is submitted securely. By submitting, you agree to our terms and data processing policy.</p>
      </div>
    </section>
  </form>
</template>

<style scoped>
.form-card {
  border-radius: 22px;
  border: 1px solid #e8eef3;
  background: #ffffff;
  box-shadow: 0 18px 50px -34px rgba(3, 57, 88, 0.28);
}

.form-label {
  display: block;
  font-size: 13.5px;
  font-weight: 600;
  line-height: 1.5;
  color: #0f172a;
}

.form-optional {
  display: inline-block;
  margin-left: 0.35rem;
  border-radius: 999px;
  background: #f1f5f9;
  padding: 2px 7px;
  font-size: 9.5px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #94a3b8;
}

.form-description {
  margin-top: 0.35rem;
  max-width: 66ch;
  font-size: 12.5px;
  line-height: 1.65;
  color: #64748b;
}

.form-description :deep(a) {
  color: #27628c;
  font-weight: 600;
  text-decoration: underline;
  text-underline-offset: 2px;
}

.form-input {
  width: 100%;
  border-radius: 11px;
  border: 1px solid #dfe7ee;
  background: #ffffff;
  padding: 0.8rem 0.9rem;
  font-size: 13.5px;
  font-weight: 500;
  color: #0f172a;
  outline: none;
  transition: border-color 0.18s ease, box-shadow 0.18s ease, background 0.18s ease;
}

.form-input::placeholder {
  color: #b6c2cd;
  font-weight: 400;
}

.form-input:hover {
  border-color: #c9d7e2;
}

.form-input:focus {
  border-color: #27628c;
  box-shadow: 0 0 0 4px rgba(39, 98, 140, 0.1);
  background: #ffffff;
}

.form-input-error {
  border-color: #fca5a5 !important;
  background: #fff8f8;
}

.form-input-error:focus {
  border-color: #ef4444 !important;
  box-shadow: 0 0 0 4px rgba(239, 68, 68, 0.09);
}

.form-select {
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2394a3b8' stroke-width='1.8'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='m6 9 6 6 6-6'/%3E%3C/svg%3E");
  background-position: right 0.85rem center;
  background-repeat: no-repeat;
  background-size: 1rem;
  padding-right: 2.4rem;
}

.question-number {
  display: inline-flex;
  height: 24px;
  width: 24px;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background: #f1f6f9;
  font-size: 10px;
  font-weight: 700;
  color: #27628c;
}

.option-card {
  display: flex;
  cursor: pointer;
  align-items: flex-start;
  gap: 0.7rem;
  border-radius: 11px;
  border: 1px solid #e8eef3;
  background: #ffffff;
  padding: 0.8rem 0.9rem;
  transition: border-color 0.18s ease, background 0.18s ease, box-shadow 0.18s ease;
}

.option-card:hover {
  border-color: #c9d9e5;
  background: #fbfdfe;
}

.option-card-selected {
  border-color: #27628c;
  background: rgba(39, 98, 140, 0.045);
  box-shadow: 0 0 0 1px #27628c inset;
}

.option-indicator {
  display: inline-flex;
  height: 17px;
  width: 17px;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  border: 1.5px solid #cbd5e1;
  background: #ffffff;
  margin-top: 1px;
  transition: all 0.18s ease;
}

.option-indicator-square {
  border-radius: 5px;
}

.option-indicator-selected {
  border-color: #27628c;
  background: #27628c;
}

.form-error {
  display: flex;
  align-items: flex-start;
  gap: 0.35rem;
  margin-top: 0.55rem;
  font-size: 11.5px;
  font-weight: 600;
  line-height: 1.5;
  color: #dc2626;
}

.file-dropzone {
  border-radius: 14px;
  border: 1.5px dashed #d7e3ec;
  background: #fbfdff;
  padding: 1rem;
  transition: border-color 0.18s ease, background 0.18s ease;
}

.file-dropzone:hover {
  border-color: #9fc3da;
  background: #f8fbfd;
}

.file-dropzone-active {
  border-color: #27628c;
  background: rgba(39, 98, 140, 0.045);
}

.file-dropzone-error {
  border-color: #fca5a5;
  background: #fff8f8;
}

.form-file-action {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  background: #ffffff;
  padding: 0.35rem 0.55rem;
  font-size: 10.5px;
  font-weight: 600;
  color: #475569;
  transition: all 0.18s ease;
}

.form-file-action:hover {
  border-color: #27628c;
  color: #27628c;
}

.form-file-remove {
  display: inline-flex;
  height: 26px;
  width: 26px;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  color: #94a3b8;
  transition: all 0.18s ease;
}

.form-file-remove:hover {
  background: #fef2f2;
  color: #dc2626;
}
</style>
