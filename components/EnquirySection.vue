<template>
  <section class="py-24 md:py-40 bg-gray-50 overflow-hidden">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        
        <!-- Narratives & Brand Presence -->
        <div class="space-y-12 animate-fade-in-left">
          <div class="inline-block px-4 py-1.5 bg-[#27628C]/10 text-[#27628C] text-sm font-bold rounded-full">
             Initiate Dialogue
          </div>
          <h2 class="text-lg md:text-xl font-bold text-gray-900 leading-tight tracking-normal ">
            Expanding <span class="text-[#27628C]">Healthcare</span> <br /> Through Connection
          </h2>
          <p class="text-lg md:text-xl text-gray-500 font-medium leading-relaxed max-w-lg">
            Have a question, a proposal, or seeking technical clarity? Our experts are standing by to bridge the gap between inquiry and action.
          </p>

          <div class="space-y-8 pt-8">
             <div class="flex items-start gap-6 group">
                <!-- <div class="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-[#27628C] shadow-sm group-hover:bg-[#27628C] group-hover:text-white transition-all duration-500">
                   <Icon name="lucide:message-square" class="w-6 h-6" />
                </div> -->
                <div>
                   <h4 class="text-sm font-bold text-gray-900 mb-1">Direct Support</h4>
                   <p class="text-sm font-medium text-gray-400">Response time within 24 operational hours.</p>
                </div>
             </div>
             <div class="flex items-start gap-6 group text-gray-400">
                <!-- <div class="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm group-hover:bg-black group-hover:text-white transition-all duration-500">
                   <Icon name="lucide:mail" class="w-6 h-6" />
                </div> -->
                <div>
                   <h4 class="text-sm font-bold text-gray-900 mb-1">Email Registry</h4>
                   <p class="text-sm font-medium">info@medlabconvo.com</p>
                </div>
             </div>
          </div>
        </div>

        <!-- The Enquiry Engine (Form) -->
        <div class="relative animate-fade-in-right">
          <!-- Geometric Decor -->
          <div class="absolute -right-20 -top-20 w-64 h-64 bg-[#27628C]/5 rounded-full blur-3xl"></div>
          <div class="absolute -left-10 -bottom-10 w-40 h-40 bg-blue-500/5 rounded-full blur-2xl"></div>

          <div class="relative bg-white rounded-[3rem] p-8 md:p-12 shadow-sm border border-slate-200 border border-gray-100 overflow-hidden">
             
             <!-- Success State Overlay -->
             <Transition name="fade">
               <div v-if="success" class="absolute inset-0 bg-white/95 backdrop-blur-md flex flex-col items-center justify-center p-12 text-center z-20">
                  <div class="w-24 h-24 bg-emerald-50 text-emerald-500 rounded-[2.5rem] flex items-center justify-center mb-8 animate-bounce-slow">
                     <Icon name="lucide:check-circle" class="w-12 h-12" />
                  </div>
                  <h3 class="text-lg font-bold text-gray-900 tracking-normal  mb-4">Transmission Received</h3>
                  <p class="text-gray-500 font-medium mb-10 max-w-xs">Your enquiry has been successfully logged into our governance system. An expert will be in touch shortly.</p>
                  <button @click="resetForm" class="px-10 py-4 bg-gray-900 text-white rounded-2xl font-bold text-sm tracking-normal hover:bg-black transition-all active:scale-95">
                     Log Another
                  </button>
               </div>
             </Transition>

             <form @submit.prevent="handleSubmit" class="space-y-8">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div class="space-y-2">
                    <label class="text-sm font-bold text-gray-400 px-1">First Name</label>
                    <input 
                      v-model="form.firstName" 
                      type="text" 
                      required 

                      class="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-medium focus:bg-white focus:border-[#27628C] focus:ring-4 focus:ring-[#27628C]/5 outline-none transition-all placeholder:text-gray-300"
                    />
                  </div>
                  <div class="space-y-2">
                    <label class="text-sm font-bold text-gray-400 px-1">Last Name</label>
                    <input 
                      v-model="form.lastName" 
                      type="text" 
                      required 

                      class="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-medium focus:bg-white focus:border-[#27628C] focus:ring-4 focus:ring-[#27628C]/5 outline-none transition-all placeholder:text-gray-300"
                    />
                  </div>
                </div>

                <div class="space-y-2">
                  <label class="text-sm font-bold text-gray-400 px-1">Email Dimension</label>
                  <input 
                    v-model="form.email" 
                    type="email" 
                    required 

                    class="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-medium focus:bg-white focus:border-[#27628C] focus:ring-4 focus:ring-[#27628C]/5 outline-none transition-all placeholder:text-gray-300"
                  />
                </div>

                <div class="space-y-2">
                  <label class="text-sm font-bold text-gray-400 px-1">Phone Protocol</label>
                  <input 
                    v-model="form.phoneNumber" 
                    type="tel" 
                    required 

                    class="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-medium focus:bg-white focus:border-[#27628C] focus:ring-4 focus:ring-[#27628C]/5 outline-none transition-all placeholder:text-gray-300"
                  />
                </div>

                <div class="space-y-2">
                  <label class="text-sm font-bold text-gray-400 px-1">Core Context (Message)</label>
                  <textarea 
                    v-model="form.message" 
                    required 
                    rows="6"

                    class="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-[2rem] text-sm font-medium focus:bg-white focus:border-[#27628C] focus:ring-4 focus:ring-[#27628C]/5 outline-none transition-all placeholder:text-gray-300 resize-none"
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  :disabled="loading"
                  class="w-full py-5 bg-[#27628C] text-white rounded-2xl font-bold text-sm tracking-normal hover:bg-gray-900 transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-3 shadow-[0_20px_40px_rgba(39,98,140,0.2)]"
                >
                  <div v-if="loading" class="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                  <span>Transmit Query</span>
                </button>
             </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import Icon from '@/components/Icon.vue'
import { useCreateEnquiry } from '@/composables/modules/enquires/useCreateEnquiry'
import { useCustomToast } from '@/composables/core/useCustomToast'

const { showToast } = useCustomToast()

const props = defineProps<{
  prefill?: string
}>()

const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  message: props.prefill ? `I am interested in: ${props.prefill}. \n\n` : ''
})

const { createEnquiry, loading, success, resetState } = useCreateEnquiry()

const handleSubmit = async () => {
  try {
    await createEnquiry(form)
  } catch (e) {
    console.error('Enquiry Submission Error:', e)
    showToast({
      title: 'Error',
      message: 'Failed to transmit query. Please check your network protocol.',
      toastType: 'error'
    })
  }
}

const resetForm = () => {
  Object.assign(form, {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    message: ''
  })
  resetState()
}
</script>

<style scoped>
.animate-fade-in-left {
  animation: fadeInLeft 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
.animate-fade-in-right {
  animation: fadeInRight 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes fadeInLeft {
  from { opacity: 0; transform: translateX(-40px); }
  to { opacity: 1; transform: translateX(0); }
}

@keyframes fadeInRight {
  from { opacity: 0; transform: translateX(40px); }
  to { opacity: 1; transform: translateX(0); }
}

.animate-bounce-slow {
  animation: bounceSlow 3s infinite;
}

@keyframes bounceSlow {
  0%, 100% { transform: translateY(-5%); animation-timing-function: cubic-bezier(0.8, 0, 1, 1); }
  50% { transform: translateY(0); animation-timing-function: cubic-bezier(0, 0, 0.2, 1); }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
