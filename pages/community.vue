<template>
  <div class="bg-white min-h-screen">
    <main class="isolate">
      <!-- Hero Section -->
      <div class="relative isolate overflow-hidden bg-[#27628C] py-24 sm:py-40">
        <div class="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]"></div>
        
        <div class="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
          <div class="mx-auto max-w-2xl gap-x-14 lg:mx-0 lg:flex lg:max-w-none lg:items-center">
            <div class="w-full max-w-xl lg:shrink-0 xl:max-w-2xl">
              <h1 class="text-5xl sm:text-7xl lg:text-8xl font-bold text-white leading-tight tracking-normal mb-8 animate-in fade-in slide-in-from-bottom-10 duration-1000">
                A Global Network <br /> of Excellence
              </h1>
              <p class="text-2xl md:text-3xl leading-8 text-blue-50 font-medium max-w-xl animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-200">
                Connecting laboratory professionals, researchers, and innovators to transform the future of clinical diagnostics through collaboration.
              </p>
            </div>
            <div class="mt-14 flex justify-end gap-8 sm:-mt-44 sm:justify-start sm:pl-20 lg:mt-0 lg:pl-0">
              <div class="ml-auto w-44 flex-none space-y-8 pt-32 sm:ml-0 sm:pt-80 lg:order-last lg:pt-36 xl:order-none xl:pt-80">
                <div class="relative group">
                  <img src="@/assets/img/bonding1.jpg" alt="" class="aspect-[2/3] w-full rounded-[2.5rem] bg-gray-900/5 object-cover shadow-sm border border-slate-200 transition-transform duration-700 group-hover:scale-105">
                </div>
              </div>
              <div class="mr-auto w-44 flex-none space-y-8 sm:mr-0 sm:pt-52 lg:pt-36">
                <div class="relative group">
                  <img src="@/assets/img/bonding2.jpg" alt="" class="aspect-[2/3] w-full rounded-[2.5rem] bg-gray-900/5 object-cover shadow-sm border border-slate-200 transition-transform duration-700 group-hover:scale-105">
                </div>
                <div class="relative group">
                  <img src="@/assets/img/bonding3.jpg" alt="" class="aspect-[2/3] w-full rounded-[2.5rem] bg-gray-900/5 object-cover shadow-sm border border-slate-200 transition-transform duration-700 group-hover:scale-105">
                </div>
              </div>
              <div class="w-44 flex-none space-y-8 pt-32 sm:pt-0">
                <div class="relative group">
                  <img src="@/assets/img/bonding4.jpg" alt="" class="aspect-[2/3] w-full rounded-[2.5rem] bg-gray-900/5 object-cover shadow-sm border border-slate-200 transition-transform duration-700 group-hover:scale-105">
                </div>
                <div class="relative group">
                  <img src="@/assets/img/bonding5.jpg" alt="" class="aspect-[2/3] w-full rounded-[2.5rem] bg-gray-900/5 object-cover shadow-sm border border-slate-200 transition-transform duration-700 group-hover:scale-105">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Communities List -->
      <div class="py-24 sm:py-40 space-y-32">
        
        <!-- Interntional Section -->
        <section class="max-w-7xl mx-auto px-6 lg:px-8">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div class="order-2 lg:order-1 space-y-8">
              <div class="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 text-[#27628C] rounded-full text-[10px] font-bold">
                <span class="w-1.5 h-1.5 rounded-full bg-[#27628C] animate-pulse"></span>
                Active Community
              </div>
              <h2 class="text-4xl md:text-5xl font-bold text-gray-900  tracking-tight">Interntional</h2>
              <div class="h-1.5 w-20 bg-[#27628C] rounded-full"></div>
              
              <div class="space-y-6 text-gray-600 font-medium leading-relaxed">
                <p>
                  The internship year is a crucial milestone for every Medical Laboratory Science (MLS) graduate—a period filled with opportunities but also significant challenges. Many interns struggle with navigating career growth and systemic barriers.
                </p>
                <p>
                  Interntional is a dynamic community built to bridge these gaps. Through mentorship, professional development, and networking, we empower MLS interns to thrive—not just survive—during their transformative year.
                </p>
              </div>

              <div class="pt-6">
                <NuxtLink 
                  to="/interntional" 
                  class="inline-flex items-center gap-3 px-10 py-5 bg-[#27628C] text-white rounded-2xl text-[11px] font-bold hover:bg-gray-900 transition-all shadow-sm border border-slate-200 shadow-blue-900/20 active:scale-95"
                >
                  Learn More About Interntional
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                </NuxtLink>
              </div>
            </div>
            
            <div class="order-1 lg:order-2">
              <div class="relative group">
                <div class="absolute -inset-4 bg-[#27628C]/5 rounded-[3.5rem] blur-2xl group-hover:bg-[#27628C]/10 transition-colors"></div>
                <img src="@/assets/img/community1.png" alt="Interntional Community" class="relative rounded-[3rem] shadow-sm border border-slate-200 border border-gray-100 object-cover aspect-video lg:aspect-square" />
              </div>
            </div>
          </div>
        </section>

        <!-- UniVerse Section -->
        <section class="bg-gray-50 py-24 sm:py-40">
          <div class="max-w-7xl mx-auto px-6 lg:px-8">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div class="relative group">
                <div class="absolute -inset-4 bg-[#27628C]/5 rounded-[3.5rem] blur-2xl group-hover:bg-[#27628C]/10 transition-colors"></div>
                <img src="@/assets/img/community2.png" alt="UniVerse Community" class="relative rounded-[3rem] shadow-sm border border-slate-200 border border-gray-100 object-cover aspect-video lg:aspect-square" />
              </div>

              <div class="space-y-8">
                <div class="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 text-[#27628C] rounded-full text-[10px] font-bold">
                  <span class="w-1.5 h-1.5 rounded-full bg-blue-300"></span>
                  Opening Soon
                </div>
                <h2 class="text-4xl md:text-5xl font-bold text-gray-900  tracking-tight">UniVerse</h2>
                <div class="h-1.5 w-20 bg-[#27628C] rounded-full"></div>
                
                <div class="space-y-6 text-gray-600 font-medium leading-relaxed">
                  <p>
                    The journey of a Medical Laboratory Science student extends beyond academics—it’s about building skills, forging connections, and preparing for a future of impact.
                  </p>
                  <p>
                    UniVerse, powered by MedLabConvo, is a thriving community designed to support MLS students in their personal, professional, and systemic development.
                  </p>
                </div>

                <div class="flex flex-col sm:flex-row gap-4 pt-6">
                  <button disabled class="flex-1 px-8 py-5 bg-gray-100 text-gray-400 rounded-2xl text-[11px] font-bold cursor-not-allowed border border-gray-200">
                    Download Handbook
                  </button>
                  <button disabled class="flex-1 px-8 py-5 bg-white text-[#27628C] border-2 border-[#27628C]/10 rounded-2xl text-[11px] font-bold cursor-not-allowed opacity-50">
                    Become a Campus Luminary
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { useHead } from '#imports'

useHead({
  title: 'Community | MedLabConvo',
  meta: [
    { name: 'description', content: 'Explore the global communities of MedLabConvo connecting students and professionals.' }
  ]
})
</script>

<style scoped>
.animate-in {
  animation-duration: 1s;
  animation-fill-mode: both;
}
.fade-in {
  animation-name: fadeIn;
}
.slide-in-from-bottom-10 {
  animation-name: slideInBottom;
}
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes slideInBottom {
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
.delay-200 {
  animation-delay: 200ms;
}
</style>