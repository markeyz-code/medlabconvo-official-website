<template>
  <div class="min-h-screen bg-white">
    <!-- Hero Standardized -->
    <div class="bg-[#27628C] py-24 md:py-32 px-6 lg:px-8 relative overflow-hidden text-center">
        <div class="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]"></div>
        <div class="mx-auto max-w-7xl relative z-10">
           <div class="max-w-2xl mx-auto">
              <h1 class="text-lg md:text-xl font-bold text-white leading-tight tracking-normal  mb-4 animate-in fade-in slide-in-from-bottom-10 duration-1000">
                 Join the Pulse
              </h1>
              <p class="text-lg text-blue-50 font-medium leading-relaxed max-w-lg mx-auto animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-200">
                 Subscribe to the MedLabConvo Substack for expert medical journalism, industry pulses, and community updates.
              </p>
           </div>
        </div>
    </div>

    <!-- Subscription Form Section -->
    <section class="py-24 bg-white relative">
      <div class="max-w-xl mx-auto px-6">
        <div class="p-10 md:p-16 bg-gray-50 rounded-[3rem] border border-gray-100 shadow-sm border border-slate-200 relative">
          <div class="absolute -top-6 -left-6 w-12 h-12 bg-[#27628C] rounded-2xl flex items-center justify-center text-white shadow-sm border border-slate-200">
             <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
          </div>
          
          <h2 class="text-xl font-bold text-gray-900 mb-8  tracking-tight">Weekly Ecosystem Insights</h2>
          
          <form @submit.prevent="handleSubscribe" class="space-y-6">
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-black text-gray-400  tracking-normal mb-3 ml-1">Full Name</label>
                <input v-model="form.name" type="text" required class="w-full px-6 py-4 bg-white border border-gray-100 rounded-2xl text-sm focus:ring-2 focus:ring-[#27628C] focus:border-transparent outline-none transition-all shadow-sm" />
              </div>
              <div>
                <label class="block text-sm font-black text-gray-400  tracking-normal mb-3 ml-1">Email Address</label>
                <input v-model="form.email" type="email" required class="w-full px-6 py-4 bg-white border border-gray-100 rounded-2xl text-sm focus:ring-2 focus:ring-[#27628C] focus:border-transparent outline-none transition-all shadow-sm" />
              </div>
              <div>
                <label class="block text-sm font-black text-gray-400  tracking-normal mb-3 ml-1">Area of Interest</label>
                <select v-model="form.interest" class="w-full px-6 py-4 bg-white border border-gray-100 rounded-2xl text-sm focus:ring-2 focus:ring-[#27628C] focus:border-transparent outline-none transition-all shadow-sm">
                   <option value="journalism">Medical Journalism</option>
                   <option value="innovation">Health Innovation</option>
                   <option value="careers">Career Development</option>
                   <option value="all">Ecosystem Updates</option>
                </select>
              </div>
            </div>

            <button type="submit" :disabled="loading" class="w-full py-5 bg-[#27628C] text-white rounded-2xl text-xs font-bold hover:bg-black transition-all shadow-sm border border-slate-200 active:scale-95 flex items-center justify-center gap-3">
              <span v-if="loading" class="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>
              {{ loading ? 'Transmitting...' : 'Join the Substack' }}
            </button>
          </form>

          <p class="text-center mt-10 text-[9px] font-bold text-gray-400  tracking-normal leading-relaxed">
             By joining, you agree to our <a href="/privacy-policy" class="text-[#27628C] underline">Privacy Policy</a>. <br/> Zero spam. Pure professional value.
          </p>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useHead } from '#imports'
import { useSubscribe } from '@/composables/modules/subscriptions/useSubscribe'

const { subscribe, loading } = useSubscribe()
const form = reactive({
  name: '',
  email: '',
  interest: 'journalism'
})

const handleSubscribe = async () => {
    const success = await subscribe(form.email)
    if (success) {
        form.name = ''
        form.email = ''
        form.interest = 'journalism'
    }
}

useHead({
  title: 'Subscribe | MedLabConvo',
  meta: [
    { name: 'description', content: 'Subscribe to MedLabConvo for professional medical journalism and insights.' }
  ]
})
</script>
