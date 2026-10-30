<script setup lang="ts">
import { ref, reactive } from 'vue'
import Icon from '@/components/Icon.vue'
import { useCreateEnquiry } from '@/composables/modules/enquires/useCreateEnquiry'
import { useCustomToast } from '@/composables/core/useCustomToast'

const props = defineProps<{ prefill?: string }>()
const { showToast } = useCustomToast()
const { createEnquiry, loading, success, resetState } = useCreateEnquiry()

const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  message: props.prefill ? `I am interested in: ${props.prefill}. \n\n` : '',
})

const handleSubmit = async () => {
  try {
    await createEnquiry(form)
  } catch (error) {
    console.error('Enquiry submission error:', error)
    showToast({ title: 'Error', message: 'We could not send your enquiry. Please check your connection and try again.', toastType: 'error' })
  }
}

const resetForm = () => {
  Object.assign(form, { firstName: '', lastName: '', email: '', phoneNumber: '', message: '' })
  resetState()
}
</script>

<template>
  <section class="site-section bg-white">
    <div class="site-container grid gap-8 lg:grid-cols-[.82fr_1.18fr] lg:items-start">
      <div class="space-y-4">
        <div class="rounded-2xl bg-[#033958] p-6 text-white sm:p-7">
          <p class="site-eyebrow !text-white/50">Start a conversation</p>
          <h2 class="mt-3 text-[1.6rem] font-bold leading-tight tracking-[-0.04em]">Tell us what you are trying to do.</h2>
          <p class="mt-3 text-[12px] leading-6 text-white/55">Whether it is a programme, partnership, product question or a professional enquiry, this reaches a real person on the team.</p>
          <div class="mt-6 space-y-3 border-t border-white/10 pt-5">
            <a href="mailto:info@medlabconvo.com" class="flex items-center gap-3 text-[11px] text-white/65 transition hover:text-white">
              <span class="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10"><Icon name="lucide:mail" class="h-3.5 w-3.5" /></span>
              info@medlabconvo.com
            </a>
            <p class="flex items-center gap-3 text-[11px] text-white/65">
              <span class="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10"><Icon name="lucide:clock-3" class="h-3.5 w-3.5" /></span>
              Response within 24 operational hours
            </p>
            <p class="flex items-center gap-3 text-[11px] text-white/65">
              <span class="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10"><Icon name="lucide:globe-2" class="h-3.5 w-3.5" /></span>
              Global enquiries welcome
            </p>
          </div>
        </div>

        <div class="rounded-2xl border border-[#e4ebf0] bg-[#fbfcfc] p-5">
          <p class="text-[10px] font-bold uppercase tracking-[0.14em] text-[#8a9ba5]">Looking for something specific?</p>
          <div class="mt-3 space-y-2.5">
            <NuxtLink to="/programs" class="flex items-center justify-between text-[11.5px] font-semibold text-[#0a202b] hover:text-[#27628C]">Programme enquiries <Icon name="lucide:arrow-up-right" class="h-3.5 w-3.5" /></NuxtLink>
            <NuxtLink to="/products" class="flex items-center justify-between text-[11.5px] font-semibold text-[#0a202b] hover:text-[#27628C]">Shop & product support <Icon name="lucide:arrow-up-right" class="h-3.5 w-3.5" /></NuxtLink>
            <NuxtLink to="/about-us" class="flex items-center justify-between text-[11.5px] font-semibold text-[#0a202b] hover:text-[#27628C]">Partnerships & press <Icon name="lucide:arrow-up-right" class="h-3.5 w-3.5" /></NuxtLink>
          </div>
        </div>
      </div>

      <div class="relative">
        <Transition name="fade">
          <div v-if="success" class="absolute inset-0 z-20 flex flex-col items-center justify-center rounded-[1.5rem] border border-[#e4ebf0] bg-white/95 p-8 text-center backdrop-blur">
            <span class="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600"><Icon name="lucide:check" class="h-7 w-7" /></span>
            <h3 class="mt-5 text-xl font-bold tracking-[-0.03em] text-[#0a202b]">Message received.</h3>
            <p class="mt-2 max-w-xs text-[12px] leading-6 text-[#5f7482]">Thank you for reaching out. A member of the team will respond within 24 operational hours.</p>
            <button type="button" class="site-btn site-btn-ghost mt-5" @click="resetForm">Send another message</button>
          </div>
        </Transition>

        <form class="site-card p-5 sm:p-7" @submit.prevent="handleSubmit">
          <div class="flex items-center justify-between border-b border-[#eef2f5] pb-4">
            <div>
              <p class="site-eyebrow">Enquiry form</p>
              <h2 class="mt-2 text-[1.35rem] font-bold tracking-[-0.03em] text-[#0a202b]">How can we help?</h2>
            </div>
            <span class="hidden h-9 w-9 items-center justify-center rounded-xl bg-[#eef5f9] text-[#27628C] sm:flex"><Icon name="lucide:message-square" class="h-4 w-4" /></span>
          </div>

          <div class="mt-5 grid gap-4 sm:grid-cols-2">
            <label class="block">
              <span class="text-[11px] font-semibold text-[#3b5361]">First name <span class="text-[#DE6129]">*</span></span>
              <input v-model="form.firstName" type="text" required autocomplete="given-name" placeholder="Your first name" class="mt-1.5 h-10 w-full rounded-lg border border-[#dfe7ee] bg-white px-3.5 text-[12px] text-[#0a202b] outline-none transition placeholder:text-[#b6c2cd] focus:border-[#27628C] focus:ring-2 focus:ring-[#27628C]/10" />
            </label>
            <label class="block">
              <span class="text-[11px] font-semibold text-[#3b5361]">Last name <span class="text-[#DE6129]">*</span></span>
              <input v-model="form.lastName" type="text" required autocomplete="family-name" placeholder="Your last name" class="mt-1.5 h-10 w-full rounded-lg border border-[#dfe7ee] bg-white px-3.5 text-[12px] text-[#0a202b] outline-none transition placeholder:text-[#b6c2cd] focus:border-[#27628C] focus:ring-2 focus:ring-[#27628C]/10" />
            </label>
            <label class="block">
              <span class="text-[11px] font-semibold text-[#3b5361]">Email <span class="text-[#DE6129]">*</span></span>
              <input v-model="form.email" type="email" required autocomplete="email" placeholder="you@example.com" class="mt-1.5 h-10 w-full rounded-lg border border-[#dfe7ee] bg-white px-3.5 text-[12px] text-[#0a202b] outline-none transition placeholder:text-[#b6c2cd] focus:border-[#27628C] focus:ring-2 focus:ring-[#27628C]/10" />
            </label>
            <label class="block">
              <span class="text-[11px] font-semibold text-[#3b5361]">Phone <span class="text-[#DE6129]">*</span></span>
              <input v-model="form.phoneNumber" type="tel" required autocomplete="tel" placeholder="+234…" class="mt-1.5 h-10 w-full rounded-lg border border-[#dfe7ee] bg-white px-3.5 text-[12px] text-[#0a202b] outline-none transition placeholder:text-[#b6c2cd] focus:border-[#27628C] focus:ring-2 focus:ring-[#27628C]/10" />
            </label>
          </div>

          <label class="mt-4 block">
            <span class="text-[11px] font-semibold text-[#3b5361]">Message <span class="text-[#DE6129]">*</span></span>
            <textarea v-model="form.message" required rows="6" placeholder="Tell us a little about what you need…" class="mt-1.5 w-full resize-y rounded-lg border border-[#dfe7ee] bg-white px-3.5 py-3 text-[12px] leading-6 text-[#0a202b] outline-none transition placeholder:text-[#b6c2cd] focus:border-[#27628C] focus:ring-2 focus:ring-[#27628C]/10" />
          </label>

          <button type="submit" :disabled="loading" class="site-btn site-btn-primary mt-5 w-full disabled:opacity-50">
            <span v-if="loading" class="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            {{ loading ? 'Sending…' : 'Send enquiry' }}
            <Icon v-if="!loading" name="lucide:send" class="h-3.5 w-3.5" />
          </button>
          <p class="mt-3 text-center text-[9.5px] leading-5 text-[#8a9ba5]">By sending this enquiry you agree to our terms and data processing policy.</p>
        </form>
      </div>
    </div>
  </section>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active { transition: opacity 180ms ease; }
.fade-enter-from,
.fade-leave-to { opacity: 0; }
</style>
