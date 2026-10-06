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

const { singleUploadFile } = useSingleUploadFile()

// Initialize form data
const initializeFormData = () => {
  props.form.fields.forEach((field) => {
    if (field.type === FormFieldType.CHECKBOX) {
      formData.value[field.id] = []
    } else {
      formData.value[field.id] = ''
    }
  })
}

onMounted(() => {
  initializeFormData()
})

// Validate field
const validateField = (field: FormField, value: any): string | null => {
  if (field.required && !value) {
    return `${field.label} is required`
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

  if (field.validation && value) {
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
  const responses: FormResponse[] = props.form.fields.map((field) => ({
    fieldId: field.id,
    fieldLabel: field.label,
    value: Array.isArray(formData.value[field.id])
      ? formData.value[field.id].join(', ')
      : String(formData.value[field.id] || ''),
  }))

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
      errors.value[fieldId] = 'Failed to get file URL'
    }
  } catch (error) {
    errors.value[fieldId] = 'Upload failed'
  } finally {
    uploadingFields.value[fieldId] = false
  }
}
</script>

<template>
  <div class="w-full max-w-3xl mx-auto">
    <form @submit.prevent="handleSubmit" class="space-y-6">
      <!-- Email field (optional) -->
      <div>
        <label for="submitter-email" class="block text-sm font-medium text-gray-700 mb-2">
          Your Email (Optional)
        </label>
        <UiAnimatedInput
          id="submitter-email"
          label="Email"
          v-model="submitterEmail"
          type="email"
        />
        <p class="mt-1 text-sm text-gray-900">
          Provide your email if you'd like to receive a copy of your submission
        </p>
      </div>

      <div class="border-t border-gray-200 pt-6"></div>

      <!-- Form fields -->
      <div v-for="field in form.fields" :key="field.id" :id="`field-${field.id}`" class="space-y-2">
        <label :for="field.id" class="block text-sm font-medium text-gray-700">
          {{ field.label }}
          <span v-if="field.required" class="text-red-500">*</span>
        </label>
        <UiAnimatedInput
          v-if="field.type !== FormFieldType.TEXTAREA && field.type !== FormFieldType.FILE"
          :id="field.id"
          v-model="formData[field.id]"
          :type="field.type.toLowerCase()"
          :label="field.label"

          :required="field.required"
          :class="{ 'border-red-500': errors[field.id] }"
        />

        <p v-if="field.description" class="text-sm text-gray-600">
          {{ field.description }}
        </p>

        <!-- Text Input -->
        <UiAnimatedInput
          v-if="field.type === FormFieldType.TEXT"
          :id="field.id"
          v-model="formData[field.id]"
          type="text"
          label=""

          :required="field.required"
          :class="{ 'border-red-500': errors[field.id] }"
        />

        <!-- Email Input -->
        <UiAnimatedInput
          v-else-if="field.type === FormFieldType.EMAIL"
          :id="field.id"
          v-model="formData[field.id]"
          type="email"
          label="Email"

          :required="field.required"
          :class="{ 'border-red-500': errors[field.id] }"
        />

        <!-- Phone Input -->
        <UiAnimatedInput
          v-else-if="field.type === FormFieldType.PHONE"
          :id="field.id"
          v-model="formData[field.id]"
          type="tel"
          label="Phone"

          :required="field.required"
          :class="{ 'border-red-500': errors[field.id] }"
        />

        <!-- URL Input -->
        <UiAnimatedInput
          v-else-if="field.type === FormFieldType.URL"
          :id="field.id"
          v-model="formData[field.id]"
          type="url"
          label="URL"

          :required="field.required"
          :class="{ 'border-red-500': errors[field.id] }"
        />

        <!-- Number Input -->
        <UiAnimatedInput
          v-else-if="field.type === FormFieldType.NUMBER"
          :id="field.id"
          v-model.number="formData[field.id]"
          label="Number"

          :required="field.required"
          :class="{ 'border-red-500': errors[field.id] }"
        />

        <!-- Date Input -->
        <UiAnimatedInput
          v-else-if="field.type === FormFieldType.DATE"
          :id="field.id"
          v-model="formData[field.id]"
          label="Date"

          type="date"
          :required="field.required"
          :class="{ 'border-red-500': errors[field.id] }"
        />

        <!-- Textarea -->
        <UiAnimatedInput
          v-else-if="field.type === FormFieldType.TEXTAREA"
          :id="field.id"
          v-model="formData[field.id]"
          :label="field.placeholder"

          :required="field.required"
          :rows="4"
          :class="{ 'border-red-500': errors[field.id] }"
        />

        <!-- File Upload -->
        <div v-else-if="field.type === FormFieldType.FILE" class="mt-2">
          <label 
            class="block w-full px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 text-sm"
            :class="{'opacity-50 pointer-events-none': uploadingFields[field.id]}"
          >
            <span v-if="uploadingFields[field.id]" class="text-blue-500 font-medium">Uploading...</span>
            <span v-else-if="formData[field.id]" class="text-blue-500 font-medium truncate">Change File</span>
            <span v-else class="text-gray-500">Choose File</span>
            <input type="file" class="hidden" @change="(e) => handleFileUpload(field.id, e)" />
          </label>
          <div v-if="formData[field.id]" class="mt-1 text-sm text-blue-500 truncate">
            <a :href="formData[field.id]" target="_blank" class="hover:underline">View Uploaded File</a>
          </div>
        </div>

        <!-- Select Dropdown -->
        <select
          v-else-if="field.type === FormFieldType.SELECT"
          :id="field.id"
          v-model="formData[field.id]"
          :required="field.required"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          :class="{ 'border-red-500': errors[field.id] }"
        >
          <option value=""></option>
          <option v-for="option in field.options" :key="option" :value="option">
            {{ option }}
          </option>
        </select>

        <!-- Radio Buttons -->
        <div v-else-if="field.type === FormFieldType.RADIO" class="space-y-2">
          <div v-for="option in field.options" :key="option" class="flex items-center">
            <input
              :id="`${field.id}-${option}`"
              v-model="formData[field.id]"
              type="radio"
              :value="option"
              :name="field.id"
              :required="field.required"
              class="w-4 h-4 text-blue-600 focus:ring-blue-500"
            />
            <label :for="`${field.id}-${option}`" class="ml-3 text-sm text-gray-700">
              {{ option }}
            </label>
          </div>
        </div>

        <!-- Checkboxes -->
        <div v-else-if="field.type === FormFieldType.CHECKBOX" class="space-y-2">
          <div v-for="option in field.options" :key="option" class="flex items-center">
            <input
              :id="`${field.id}-${option}`"
              type="checkbox"
              :value="option"
              @change="(e) => handleCheckboxChange(field.id, option, (e.target as HTMLInputElement).checked)"
              class="custom-checkbox"
            />
            <label :for="`${field.id}-${option}`" class="ml-3 text-sm text-gray-700">
              {{ option }}
            </label>
          </div>
        </div>

        <!-- Error message -->
        <p v-if="errors[field.id]" class="text-sm text-red-600">
          {{ errors[field.id] }}
        </p>
      </div>

      <!-- Submit button -->
      <div class="pt-6">
        <button
          type="submit"
          class="w-full px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          Submit Form
        </button>
      </div>
    </form>
  </div>
</template>