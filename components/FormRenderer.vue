<script setup lang="ts">
import type { Form, FormField, FormResponse } from '@/types/form'
import { FormFieldType } from '@/types/form'
import { useSingleUploadFile } from '@/composables/core/useSingleUpload'

const props = defineProps<{
  form: Form
}>()

const emit = defineEmits<{
  submit: [responses: FormResponse[], email?: string]
}>()

const formData = ref<Record<string, any>>({})
const submitterEmail = ref('')
const errors = ref<Record<string, string>>({})
const uploadingFields = ref<Record<string, boolean>>({})

const otherValues = ref<Record<string, string>>({})

const { singleUploadFile } = useSingleUploadFile()

// Initialize form data
const initializeFormData = () => {
  props.form.fields.forEach((field) => {
    if (field.type === FormFieldType.CHECKBOX) {
      formData.value[field.id] = []
    } else {
      formData.value[field.id] = ''
    }
    otherValues.value[field.id] = ''
  })
}

onMounted(() => {
  initializeFormData()
})

// Validate field
const validateField = (field: FormField, value: any): string | null => {
  if (field.required) {
    if (!value || (field.type === FormFieldType.CHECKBOX && value.length === 0)) {
      return `${field.label} is required`
    }
    if (value === 'Other' && !otherValues.value[field.id]) {
      return `Please specify your other answer`
    }
    if (field.type === FormFieldType.CHECKBOX && Array.isArray(value) && value.includes('Other') && !otherValues.value[field.id]) {
      return `Please specify your other answer`
    }
  }

  if (field.type === FormFieldType.EMAIL && value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(value)) {
      return 'Please enter a valid email address'
    }
  }

  if (field.type === FormFieldType.PHONE && value) {
    const phoneRegex = /^[\d\s+()-]+$/
    if (!phoneRegex.test(value)) {
      return 'Please enter a valid phone number'
    }
  }

  if (field.type === FormFieldType.URL && value) {
    try {
      new URL(value)
    } catch {
      return 'Please enter a valid URL'
    }
  }

  if (field.validation && value && value !== 'Other') {
    try {
      const regex = new RegExp(field.validation)
      if (!regex.test(value)) {
        return 'Invalid format'
      }
    } catch {
      // Invalid regex pattern
    }
  }

  return null
}

// Handle form submission
const handleSubmit = () => {
  errors.value = {}
  let hasErrors = false

  // Validate all fields
  props.form.fields.forEach((field) => {
    const error = validateField(field, formData.value[field.id])
    if (error) {
      errors.value[field.id] = error
      hasErrors = true
    }
  })

  if (hasErrors) {
    // Scroll to first error
    const firstErrorField = Object.keys(errors.value)[0]
    const element = document.getElementById(`field-${firstErrorField}`)
    element?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    return
  }

  // Build responses array
  const responses: FormResponse[] = props.form.fields.map((field) => {
    let value = formData.value[field.id]
    
    // Handle "Other" substitution
    if ((field.type === FormFieldType.RADIO || field.type === FormFieldType.SELECT) && value === 'Other') {
      value = `Other: ${otherValues.value[field.id]}`
    } else if (field.type === FormFieldType.CHECKBOX && Array.isArray(value) && value.includes('Other')) {
      value = value.map(v => v === 'Other' ? `Other: ${otherValues.value[field.id]}` : v)
    }

    return {
      fieldId: field.id,
      fieldLabel: field.label,
      value: Array.isArray(value)
        ? value.join(', ')
        : String(value || ''),
    }
  })

  emit('submit', responses, submitterEmail.value || undefined)
}

// Handle checkbox change
const handleCheckboxChange = (fieldId: string, option: string, checked: boolean) => {
  if (!Array.isArray(formData.value[fieldId])) {
    formData.value[fieldId] = []
  }

  if (checked) {
    formData.value[fieldId].push(option)
  } else {
    formData.value[fieldId] = formData.value[fieldId].filter((item: string) => item !== option)
  }
}

// Handle file upload
const handleFileUpload = async (fieldId: string, event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (!file) return

  uploadingFields.value[fieldId] = true
  errors.value[fieldId] = ''
  try {
    const response = await singleUploadFile(file)
    const url = response?.url || response?.secure_url || response?.fileUrl || ''
    if (url) {
      formData.value[fieldId] = url
    } else {
      errors.value[fieldId] = 'Failed to get file URL after upload.'
    }
  } catch (error) {
    errors.value[fieldId] = 'Upload failed. Please try again.'
    console.error('File upload error:', error)
  } finally {
    uploadingFields.value[fieldId] = false
  }
}
</script>

<template>
  <div class="w-full">
    <form @submit.prevent="handleSubmit" class="space-y-10">
      <!-- Email field (Optional) -->
      <div class="space-y-3">
        <label for="submitter-email" class="text-sm font-bold text-gray-900">
          Contact information <span class="text-gray-400 font-medium ml-1">(Optional)</span>
        </label>
        
        <div class="relative">
          <div class="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-400">
            <Icon name="lucide:mail" class="w-5 h-5" />
          </div>
          <input
            id="submitter-email"
            v-model="submitterEmail"
            type="email"

            class="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-xl text-sm font-medium outline-none focus:border-[#27628C] focus:ring-4 focus:ring-[#27628C]/5 transition-all placeholder:text-gray-300"
          />
        </div>
        <p class="text-sm text-gray-400 font-medium px-1">
          Provide your email to receive a copy of your submission
        </p>
      </div>

      <div class="border-t border-gray-100"></div>

      <!-- Dynamic Form fields -->
      <div class="space-y-10">
        <div v-for="field in form.fields" :key="field.id" :id="`field-${field.id}`" class="space-y-3 animate-fade-in">
          <!-- Field Label & Description -->
          <div class="space-y-1">
            <label :for="field.id" class="text-sm font-bold text-gray-900 flex items-center gap-1.5">
              <span v-html="linkify(field.label)"></span>
              <span v-if="field.required" class="text-red-500">*</span>
            </label>
            <p v-if="field.description" class="text-sm text-gray-900 leading-relaxed max-w-2xl" v-html="linkify(field.description)">
            </p>
          </div>

          <!-- Input Types Rendering -->
          <div class="relative">
            <!-- Text/Email/Phone/Number Input -->
            <div v-if="[FormFieldType.TEXT, FormFieldType.EMAIL, FormFieldType.PHONE, FormFieldType.NUMBER, FormFieldType.URL].includes(field.type)" class="relative">
              <input
                :id="field.id"
                v-model="formData[field.id]"
                :type="field.type === FormFieldType.PHONE ? 'tel' : field.type.toLowerCase()"

                class="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-xl text-sm font-medium outline-none focus:border-[#27628C] focus:ring-4 focus:ring-[#27628C]/5 transition-all placeholder:text-gray-300"
                :class="{ '!border-red-200 !bg-red-50/30': errors[field.id] }"
              />
            </div>

            <!-- Date Input -->
            <div v-else-if="field.type === FormFieldType.DATE" class="relative">
              <input
                :id="field.id"
                v-model="formData[field.id]"
                type="date"
                class="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-xl text-sm font-medium outline-none focus:border-[#27628C] focus:ring-4 focus:ring-[#27628C]/5 transition-all shadow-sm"
                :class="{ '!border-red-200 !bg-red-50/30': errors[field.id] }"
              />
            </div>

            <!-- Textarea -->
            <div v-else-if="field.type === FormFieldType.TEXTAREA" class="relative">
              <textarea
                :id="field.id"
                v-model="formData[field.id]"

                rows="5"
                class="w-full px-4 py-4 bg-white border border-gray-200 rounded-2xl text-sm font-medium outline-none focus:border-[#27628C] focus:ring-4 focus:ring-[#27628C]/5 transition-all placeholder:text-gray-300 resize-none"
                :class="{ '!border-red-200 !bg-red-50/30': errors[field.id] }"
              ></textarea>
            </div>

            <!-- File Upload -->
            <div v-else-if="field.type === FormFieldType.FILE" class="relative">
              <div class="flex items-center space-x-4">
                <label 
                  :for="field.id" 
                  class="cursor-pointer px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-medium hover:border-[#27628C] transition-all"
                  :class="{ '!border-red-200 !bg-red-50/30': errors[field.id], 'opacity-50 pointer-events-none': uploadingFields[field.id] }"
                >
                  <span v-if="uploadingFields[field.id]">Uploading...</span>
                  <span v-else-if="formData[field.id]">Change File</span>
                  <span v-else>Choose File</span>
                  <input
                    :id="field.id"
                    type="file"
                    class="hidden"
                    @change="(e) => handleFileUpload(field.id, e)"
                  />
                </label>
                <div v-if="formData[field.id]" class="text-sm text-[#27628C] truncate max-w-[200px]">
                  <a :href="formData[field.id]" target="_blank" class="hover:underline">View Uploaded File</a>
                </div>
              </div>
            </div>

            <!-- Select Input -->
            <div v-else-if="field.type === FormFieldType.SELECT" class="space-y-3">
              <UiSelectInput
                v-model="formData[field.id]"
                :label="field.label"
                :options="field.allowOther ? [...(field.options || []), 'Other'] : (field.options || [])"

                :hasError="!!errors[field.id]"
                class="!mb-0"
              />
              <div v-if="formData[field.id] === 'Other'" class="animate-scale-up">
                <input
                  v-model="otherValues[field.id]"
                  type="text"

                  class="w-full px-4 py-3 bg-blue-50/30 border border-blue-100 rounded-xl text-sm font-medium outline-none focus:border-[#27628C] transition-all"
                />
              </div>
            </div>

            <!-- Radio Buttons (Minimalist) -->
            <div v-else-if="field.type === FormFieldType.RADIO" class="space-y-3">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label 
                  v-for="option in (field.allowOther ? [...(field.options || []), 'Other'] : (field.options || []))" 
                  :key="option"
                  :class="[
                    'group relative flex items-center p-4 rounded-xl border transition-all cursor-pointer',
                    formData[field.id] === option 
                      ? 'border-[#27628C] bg-blue-50/30' 
                      : 'border-gray-100 bg-white hover:border-gray-200'
                  ]"
                >
                  <input
                    type="radio"
                    v-model="formData[field.id]"
                    :value="option"
                    class="sr-only"
                  />
                  <div :class="[
                    'w-4 h-4 rounded-full border mr-3 flex items-center justify-center transition-all',
                    formData[field.id] === option ? 'border-[#27628C] bg-[#27628C]' : 'border-gray-300 bg-white'
                  ]">
                    <div v-if="formData[field.id] === option" class="w-1 h-1 rounded-full bg-white"></div>
                  </div>
                  <span :class="['text-sm font-medium', formData[field.id] === option ? 'text-[#27628C]' : 'text-gray-600']" v-html="linkify(option)">
                  </span>
                </label>
              </div>
              <div v-if="formData[field.id] === 'Other'" class="animate-scale-up">
                <input
                  v-model="otherValues[field.id]"
                  type="text"

                  class="w-full px-4 py-3 bg-blue-50/30 border border-blue-100 rounded-xl text-sm font-medium outline-none focus:border-[#27628C] transition-all"
                />
              </div>
            </div>

            <!-- Checkboxes (Minimalist) -->
            <div v-else-if="field.type === FormFieldType.CHECKBOX" class="space-y-3">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label 
                  v-for="option in (field.allowOther ? [...(field.options || []), 'Other'] : (field.options || []))" 
                  :key="option"
                  :class="[
                    'group relative flex items-center p-4 rounded-xl border transition-all cursor-pointer',
                    (formData[field.id] || []).includes(option)
                      ? 'border-[#27628C] bg-blue-50/30' 
                      : 'border-gray-100 bg-white hover:border-gray-200'
                  ]"
                >
                  <input
                    type="checkbox"
                    :value="option"
                    :checked="(formData[field.id] || []).includes(option)"
                    @change="(e) => handleCheckboxChange(field.id, option, (e.target as HTMLInputElement).checked)"
                    class="sr-only"
                  />
                  <div :class="[
                    'w-4 h-4 rounded border mr-3 flex items-center justify-center transition-all',
                    (formData[field.id] || []).includes(option) ? 'border-[#27628C] bg-[#27628C]' : 'border-gray-300 bg-white'
                  ]">
                    <Icon v-if="(formData[field.id] || []).includes(option)" name="lucide:check" class="w-3 h-3 text-white" />
                  </div>
                  <span :class="['text-sm font-medium', (formData[field.id] || []).includes(option) ? 'text-[#27628C]' : 'text-gray-600']" v-html="linkify(option)">
                  </span>
                </label>
              </div>
              <div v-if="(formData[field.id] || []).includes('Other')" class="animate-scale-up">
                <input
                  v-model="otherValues[field.id]"
                  type="text"

                  class="w-full px-4 py-3 bg-blue-50/30 border border-blue-100 rounded-xl text-sm font-medium outline-none focus:border-[#27628C] transition-all"
                />
              </div>
            </div>
          </div>

          <!-- Error Messaging -->
          <Transition name="slide-fade">
            <div v-if="errors[field.id]" class="flex items-center gap-1.5 mt-1.5 px-1 text-red-500">
              <Icon name="lucide:alert-circle" class="w-4 h-4 flex-shrink-0" />
              <span class="text-sm font-bold">{{ errors[field.id] }}</span>
            </div>
          </Transition>
        </div>
      </div>

      <!-- Submit Section -->
      <div class="pt-8 border-t border-gray-100">
        <button
          type="submit"
          class="w-full flex items-center justify-center bg-[#27628C] text-white rounded-xl py-4 font-bold text-sm hover:bg-[#1e4d6f] transition-all"
        >
          Submit registration
          <Icon name="lucide:send" class="w-4 h-4 ml-2" />
        </button>
        <p class="text-center mt-4 text-sm text-gray-400 font-medium">
          By submitting, you agree to our terms and data processing policy
        </p>
      </div>
    </form>
  </div>
</template>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}
.slide-fade-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-5px);
  opacity: 0;
}

@keyframes fade-in {
  from { opacity: 0; transform: translateY(5px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in { animation: fade-in 0.4s ease-out forwards; }
</style>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}
.slide-fade-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}

@keyframes scale-up {
  from { transform: scale(0.5); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-4px); }
  75% { transform: translateX(4px); }
}

.animate-scale-up { animation: scale-up 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
.animate-shake { animation: shake 0.3s ease-in-out; }
</style>