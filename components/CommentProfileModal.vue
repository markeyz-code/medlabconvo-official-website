<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity ease-linear duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity ease-linear duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="isOpen" class="fixed inset-0 z-[150] flex items-center justify-center bg-gray-900/60 backdrop-blur-sm p-4 sm:p-6" @click="close">
        <div @click.stop class="relative bg-white w-full max-w-md rounded-[2rem] shadow-sm border border-slate-200 overflow-hidden animate-fade-in-up">
          <div class="p-8 sm:p-10">
            <div class="mb-8 text-center">
              <div class="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4 text-[#27628C]">
                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
              </div>
              <h3 class="text-lg font-black text-gray-900 tracking-tight">Create your profile</h3>
              <p class="text-gray-500 font-medium mt-2">Introduce yourself to join the discourse.</p>
            </div>

            <form @submit.prevent="handleSubmit" class="space-y-4">
              <div>
                <label class="block text-sm font-black text-gray-400 mb-2 px-1">Full Name</label>
                <input 
                  type="text" 
                  v-model="form.name" 
                  required 
 
                  class="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#27628C] text-sm font-bold placeholder:text-gray-300 transition-all"
                />
              </div>
              <div>
                <label class="block text-sm font-black text-gray-400 mb-2 px-1">Handle (@Username)</label>
                <div class="relative">
                  <span class="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-sm">@</span>
                  <input 
                    type="text" 
                    v-model="form.handle" 
                    required 
 
                    class="w-full pl-10 pr-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#27628C] text-sm font-bold placeholder:text-gray-300 transition-all"
                  />
                </div>
              </div>
              <div>
                <label class="block text-sm font-black text-gray-400 mb-2 px-1">Email Address</label>
                <input 
                  type="email" 
                  v-model="form.email" 
                  required 
 
                  class="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#27628C] text-sm font-bold placeholder:text-gray-300 transition-all"
                />
              </div>

              <button 
                type="submit" 
                class="w-full py-4 bg-gray-900 text-white rounded-2xl text-sm font-black hover:bg-[#27628C] transition-all shadow-sm border border-slate-200 hover:shadow-sm border border-slate-200 active:scale-95 mt-4"
              >
                Join Conversation
              </button>
            </form>
          </div>
          
          <!-- Close Button -->
          <button @click="close" class="absolute top-6 right-6 p-2 text-gray-400 hover:text-gray-900 transition-colors">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

const props = defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits(['close', 'saved'])

const form = reactive({
  name: '',
  handle: '',
  email: ''
})

const close = () => {
  emit('close')
}

const handleSubmit = () => {
  // Clean handle: remove @ if typed
  const cleanHandle = form.handle.replace(/^@/, '').toLowerCase()
  
  const profile = {
    userName: form.name,
    userHandle: cleanHandle,
    userEmail: form.email
  }

  localStorage.setItem('commenterProfile', JSON.stringify(profile))
  emit('saved', profile)
  close()
}
</script>
