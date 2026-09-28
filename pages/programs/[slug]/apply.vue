<template>
  <main class="min-h-screen bg-[#F8FAFC]">
    <!-- Application Hero Section -->
    <section class="bg-gray-900 pt-32 pb-48 relative overflow-hidden">
      <!-- Abstract Decors -->
      <div class="absolute top-0 right-0 w-[600px] h-[600px] bg-[#27628C]/10 rounded-full blur-[120px]"></div>
      <div class="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#DE6129]/5 rounded-full blur-[100px]"></div>

      <div class="container mx-auto px-6 lg:px-12 relative z-10">
        <div class="max-w-4xl mx-auto space-y-8">
          <NuxtLink 
            :to="`/programs/${route.params.slug}`" 
            class="inline-flex items-center gap-3 text-white/60 hover:text-white font-black text-xs  tracking-normal transition-all group"
          >
            <Icon name="lucide:arrow-left" class="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to program
          </NuxtLink>

          <div class="space-y-4">
             <div class="inline-flex items-center gap-3 px-4 py-1.5 bg-white/5 border border-white/10 rounded-full backdrop-blur-md">
                <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span class="text-sm font-black text-white  tracking-normal">Enrolment Portal</span>
             </div>
             <h1 class="text-lg md:text-xl font-black text-white tracking-tight leading-tight">
               {{ program?.title || 'Program Registration' }}
             </h1>
          </div>
        </div>
      </div>
    </section>

    <!-- Form Container -->
    <div class="container mx-auto px-6 lg:px-8 -mt-32 pb-32 relative z-20">
      <div class="mx-auto max-w-4xl">
        <div class="bg-white/80 backdrop-blur-2xl rounded-[3rem] shadow-sm border border-slate-200 shadow-gray-900/10 border border-white overflow-hidden animate-in fade-in slide-in-from-bottom-10 duration-1000">
          
          <!-- Banner Image if available -->
          <div v-if="program?.image || program?.images?.[0]" class="h-64 w-full overflow-hidden border-b border-gray-100 group bg-slate-50">
             <img :src="program?.image || program?.images?.[0]" @error="(e) => e.target.style.display = 'none'" class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" :alt="program?.title" />
          </div>

          <div class="p-10 lg:p-16">
            <!-- Loading State -->
            <div v-if="loadingProgram" class="flex flex-col items-center justify-center py-20">
               <div class="relative w-16 h-16">
                  <div class="absolute inset-0 border-4 border-[#27628C]/10 rounded-full"></div>
                  <div class="absolute inset-0 border-4 border-[#27628C] rounded-full border-t-transparent animate-spin"></div>
              </div>
              <p class="mt-8 text-sm font-black text-[#27628C]  tracking-normal">Initialising Portal...</p>
            </div>

            <!-- Success State -->
            <div v-else-if="success" class="text-center py-12 space-y-10 animate-in fade-in zoom-in duration-700">
              <div class="relative inline-block">
                 <div class="absolute inset-0 bg-emerald-500/20 blur-2xl rounded-full scale-150"></div>
                 <div class="relative w-24 h-24 bg-emerald-500 text-white rounded-[2.5rem] flex items-center justify-center border-4 border-white shadow-sm border border-slate-200">
                    <Icon name="lucide:sparkles" class="w-12 h-12" />
                 </div>
              </div>
              
              <div class="space-y-4 max-w-md mx-auto">
                <h2 class="text-xl font-black text-gray-900 tracking-tight">Experience Unlocked!</h2>
                <p class="text-gray-500 font-medium leading-relaxed">
                  Your application for <span class="text-[#27628C] font-black">{{ program?.title }}</span> has been submitted. 
                  Check your inbox for the welcome pack.
                </p>
              </div>

              <div class="flex flex-col sm:flex-row items-center justify-center gap-6 pt-6">
                <NuxtLink 
                  to="/programs" 
                  class="h-14 px-10 bg-gray-900 text-white rounded-2xl font-black text-sm hover:scale-105 active:scale-95 transition-all flex items-center gap-3"
                >
                  <Icon name="lucide:search" class="w-5 h-5" />
                  Explore Directory
                </NuxtLink>
                
                <a 
                  v-if="hasWhatsappLink"
                  href="https://chat.whatsapp.com/GnxsIILq4TbFTQ3W8WxbWQ" 
                  target="_blank"
                  class="h-14 px-10 bg-[#25D366] text-white rounded-2xl font-black text-sm hover:scale-105 active:scale-95 transition-all flex items-center gap-3"
                >
                  <Icon name="bi:whatsapp" class="w-5 h-5" />
                  Join Commmunity
                </a>
              </div>
            </div>

            <!-- Form Body -->
            <div v-else-if="program?.status === 'active'" class="space-y-12">
               <div class="space-y-2">
                  <h3 class="text-xs font-black text-[#DE6129]  tracking-normal">Section 01</h3>
                  <h2 class="text-lg font-black text-gray-900 tracking-tight">{{ program?.formTitle || 'Registration Form' }}</h2>
                  <p class="text-gray-500 font-medium text-sm leading-relaxed">{{ program?.formInstructions || 'Please provide your details below' }}</p>
               </div>

               <form @submit.prevent="handleSubmit" class="space-y-10">
                 <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
                   <div 
                     v-for="field in program?.formFields" 
                     :key="field.id"
                     :class="field.type === 'textarea' || field.id === 'expectations' ? 'md:col-span-2' : ''"
                     class="group space-y-4"
                   >
                     <label :for="field.id" class="flex items-center justify-between">
                       <span class="text-xs font-black text-gray-900  tracking-normal group-focus-within:text-[#27628C] transition-colors">
                         {{ field.label }}
                       </span>
                       <span v-if="field.required" class="text-sm font-black text-[#DE6129] ">Required</span>
                     </label>

                     <!-- Dynamic Input Types -->
                     <!-- Textarea -->
                     <textarea
                       v-if="field.type === 'textarea'"
                       v-model="formData[field.id]"
                       :id="field.id"

                       :required="field.required"
                       rows="4"
                       class="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl p-6 text-sm font-bold text-gray-900 focus:bg-white focus:border-[#27628C] focus:ring-0 transition-all outline-none"
                     ></textarea>

                     <!-- Select -->
                     <select
                       v-else-if="field.type === 'select'"
                       v-model="formData[field.id]"
                       :id="field.id"
                       :required="field.required"
                       class="h-16 w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-6 text-sm font-bold text-gray-900 focus:bg-white focus:border-[#27628C] focus:ring-0 transition-all outline-none appearance-none"
                     >
                       <option value="" disabled>Choose an option</option>
                       <option v-for="opt in field.options" :key="opt" :value="opt">{{ opt }}</option>
                     </select>

                     <!-- Radio Grid -->
                     <div v-else-if="field.type === 'radio'" class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <label 
                          v-for="opt in field.options" 
                          :key="opt"
                          class="relative flex items-center p-5 bg-gray-50 border-2 border-gray-100 rounded-2xl cursor-pointer transition-all hover:bg-gray-100 group/opt"
                          :class="formData[field.id] === opt ? 'border-[#27628C] bg-white ring-4 ring-[#27628C]/5' : ''"
                        >
                          <input type="radio" v-model="formData[field.id]" :value="opt" :required="field.required" class="sr-only" />
                          <div class="flex items-center gap-4">
                             <div class="w-5 h-5 rounded-full border-2 border-gray-300 flex items-center justify-center" :class="formData[field.id] === opt ? 'border-[#27628C]' : ''">
                                <div v-if="formData[field.id] === opt" class="w-2.5 h-2.5 bg-[#27628C] rounded-full scale-100 transition-transform"></div>
                             </div>
                             <span class="text-sm font-black text-gray-900">{{ opt }}</span>
                          </div>
                        </label>
                     </div>

                     <!-- Standard Input -->
                     <input
                       v-else
                       :type="field.type === 'email' ? 'email' : 'text'"
                       v-model="formData[field.id]"
                       :id="field.id"

                       :required="field.required"
                       class="h-16 w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-6 text-sm font-bold text-gray-900 focus:bg-white focus:border-[#27628C] focus:ring-0 transition-all outline-none"
                     />
                     
                     <p v-if="field.description" class="text-sm text-gray-400 font-bold italic">{{ field.description }}</p>
                   </div>
                 </div>

                 <!-- Error Feedback -->
                 <div v-if="submitError" class="p-6 bg-rose-50 border border-rose-100 rounded-2xl flex items-center gap-4">
                    <Icon name="lucide:alert-triangle" class="w-6 h-6 text-rose-500" />
                    <p class="text-sm font-bold text-rose-600">Failed to submit: {{ submitError }}</p>
                 </div>

                 <!-- Footer -->
                 <div class="pt-12 border-t border-gray-100 flex flex-col items-center gap-6">
                   <button
                     type="submit"
                     :disabled="submitting"
                     class="w-full h-16 bg-[#27628C] text-white rounded-[1.2rem] font-bold text-sm tracking-normal  hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center space-x-3 shadow-sm border border-slate-200 shadow-blue-900/20 disabled:opacity-50"
                   >
                     <div v-if="submitting" class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                     <span>{{ submitting ? 'Finalising Enrolment...' : 'Register Now' }}</span>
                   </button>
                    <p class="text-sm text-gray-400 font-bold  tracking-normal text-center leading-relaxed">
                      By registering, you confirm that the information provided is accurate and agree to our Terms and Conditions and Privacy Policy.
                    </p>
                 </div>
               </form>
            </div>

            <!-- Closed / Paused State -->
            <div v-else class="text-center py-16 space-y-10 animate-in fade-in zoom-in duration-700">
              <div class="relative inline-block">
                 <div class="absolute inset-0 bg-rose-500/10 blur-2xl rounded-full scale-150"></div>
                 <div class="relative w-24 h-24 bg-rose-50 text-rose-500 rounded-[2.5rem] flex items-center justify-center border-4 border-white shadow-sm border border-slate-200">
                    <Icon name="lucide:lock" class="w-10 h-10" />
                 </div>
              </div>
              
              <div class="space-y-4 max-w-md mx-auto">
                <h2 class="text-xl font-black text-gray-900 tracking-tight">Registration Closed</h2>
                <p class="text-gray-500 font-medium leading-relaxed">
                  The application window for <span class="text-[#27628C] font-black">{{ program?.title }}</span> has elapsed or the program is currently paused. 
                  Stay tuned for future cohorts!
                </p>
              </div>

              <div class="flex flex-col sm:flex-row items-center justify-center gap-6 pt-6">
                <NuxtLink 
                  to="/programs" 
                  class="h-14 px-10 bg-gray-900 text-white rounded-2xl font-black text-sm hover:scale-105 active:scale-95 transition-all flex items-center gap-3 shadow-sm border border-slate-200 shadow-gray-900/10"
                >
                  <Icon name="lucide:arrow-left" class="w-5 h-5" />
                  Explore Other Programs
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useGetProgram } from '@/composables/modules/programs/useGetProgram'
import { useSubmitApplication } from '@/composables/modules/programs/useSubmitApplication'
import { useCustomToast } from '@/composables/core/useCustomToast'

const route = useRoute()
const { showToast } = useCustomToast()
const { program, loading: loadingProgram, getProgram } = useGetProgram()
const { loading: submitting, error: submitError, success, submitApplication } = useSubmitApplication()

const formData = ref<Record<string, any>>({})

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

const handleSubmit = async () => {
  if (!program.value?.registrationToken) {
    showToast({
      title: 'Error',
      message: 'Critical Error: Program registration token missing.',
      toastType: 'error'
    })
    return
  }

  // Format responses for backend
  const responses = Object.keys(formData.value).map(key => {
    const field = program.value?.formFields?.find(f => f.id === key)
    return {
      fieldId: key,
      fieldLabel: field?.label || key,
      value: String(formData.value[key])
    }
  })

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
