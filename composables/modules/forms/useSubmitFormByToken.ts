import { ref } from 'vue'
import { forms_api, type SubmitFormData, type FormSubmission } from '@/api_factory/modules/forms'

export const useSubmitFormByToken = () => {
  const loading = ref(false)
  const error = ref<string | null>(null)
  const success = ref(false)
  const submissionData = ref<FormSubmission | null>(null)

  const submitForm = async (token: string, submissionPayload: SubmitFormData) => {
    loading.value = true
    error.value = null
    success.value = false

    try {
      const response: any = await forms_api.$_submit_form_by_token(token, submissionPayload)

      if (response?.type === 'ERROR' || !response?.data) {
        throw new Error(
          response?.data?.message ||
          response?.message ||
          'Failed to submit form',
        )
      }

      success.value = true
      submissionData.value = response.data
      return response.data
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Failed to submit form'
      throw err
    } finally {
      loading.value = false
    }
  }


  return {
    loading,
    error,
    success,
    submissionData,
    submitForm,
  }
}