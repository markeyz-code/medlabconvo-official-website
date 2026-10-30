import { ref } from 'vue'
import { subscriptions_api } from '@/api_factory/modules/subscriptions'
import { useCustomToast } from '@/composables/core/useCustomToast'

export const useSubscribe = () => {
  const loading = ref(false)
  const { showToast } = useCustomToast()

  const subscribe = async (email: string) => {
    if (!email) {
      showToast({
        title: 'Validation Error',
        message: 'Please provide a valid email address.',
        toastType: 'error'
      })
      return false
    }

    loading.value = true
    try {
      await subscriptions_api.$_create_subscription({ email })
      showToast({
        title: 'Subscription Successful',
        message: 'You have been added to the Convo Stack.',
        toastType: 'success'
      })
      return true
    } catch (error: any) {
      const msg = error.response?.data?.message || 'Failed to subscribe. Please try again later.'
      showToast({
        title: 'Subscription Failed',
        message: msg,
        toastType: 'error'
      })
      return false
    } finally {
      loading.value = false
    }
  }

  return { subscribe, loading }
}
