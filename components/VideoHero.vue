<template>
  <div class="relative min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-white overflow-hidden">
    <!-- Background Elements -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full opacity-30 animate-float"></div>
      <div class="absolute -bottom-20 -left-20 w-60 h-60 bg-indigo-100 rounded-full opacity-40 animate-float-delayed"></div>
    </div>

    <div class="relative py-20 px-6 lg:px-8">
      <div class="max-w-6xl mx-auto">
          <section id="about" class="py-24 bg-gradient-to-br from-white via-blue-50/30 to-white">
    <div class="max-w-7xl mx-auto px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="text-lg font-bold text-gray-900 mb-6">
          <span class="bg-gradient-to-r from-[#27628C] to-blue-600 bg-clip-text text-transparent">
            Transforming Healthcare
          </span>
        </h2>
        <p class="text-lg font-light text-gray-700 mb-4">
          Through Digital Services for Laboratory Professionals
        </p>
        <div class="w-24 h-1 bg-gradient-to-r from-[#27628C] to-blue-600 mx-auto rounded-full"></div>
      </div>
      <div class="max-w-4xl mx-auto">
        <p class="text-lg text-gray-600 leading-relaxed mb-6">
          MedLabConvo is a digital service organisation advancing medical laboratory science and healthcare through knowledge platforms, professional tools, data-driven programs, and innovation-focused services.
        </p>
        <p class="text-lg text-gray-600 leading-relaxed">
          We design and deliver digital programs, content products, advocacy programs and professional development services that strengthen technical capacity, leadership, and innovation readiness across the healthcare workforce.
        </p>
      </div>
    </div>
  </section>
        <!-- Header -->
        <!-- <div class="text-center mb-16" ref="headerRef">
          <h2 class="text-lg lg:text-xl font-bold text-gray-900 mb-6 leading-tight transform transition-all duration-1000"
              :class="{ 'translate-y-0 opacity-100': headerVisible, 'translate-y-10 opacity-0': !headerVisible }">
            <span class="bg-gradient-to-r from-[#27628C] via-blue-600 to-cyan-500 bg-clip-text text-transparent">
              Transforming Healthcare
            </span>
            <br>
            <span class="text-gray-700 inline-block mt-2">
              One Professional at a Time
            </span>
          </h2>
          
          <p class="text-xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed transform transition-all duration-1000 delay-300"
             :class="{ 'translate-y-0 opacity-100': headerVisible, 'translate-y-10 opacity-0': !headerVisible }">
            We are leading change, inspiring action, and building the capacity of future generations of world-class
            professionals in medical laboratory science and in the healthcare system at large.
          </p>
          <p class="text-xl font-bold text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed transform transition-all duration-1000 delay-300"
             :class="{ 'translate-y-0 opacity-100': headerVisible, 'translate-y-10 opacity-0': !headerVisible }">
             We design and deliver digital programs, content products, advocacy programs and professional development services
             that strengthen technical capacity, leadership, and innovation readiness across the healthcare workforce.
          </p>
        </div> -->

        <!-- Compact Video Section -->
        <div class="relative max-w-4xl mx-auto" ref="videoRef">
          <div class="group relative aspect-video rounded-[2.5rem] overflow-hidden shadow-sm border border-slate-200 border-8 border-white transition-all duration-1000"
               :class="{ 'translate-y-0 opacity-100 scale-100': videoVisible, 'translate-y-10 opacity-0 scale-95': !videoVisible }">
            
            <iframe 
              class="w-full h-full"
              src="https://www.youtube.com/embed/rhVkU6HAbn0?si=PP3LqgBgNf_oVTMa" 
              title="Healthcare Transformation Video" 
              frameborder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              referrerpolicy="strict-origin-when-cross-origin" 
              allowfullscreen>
            </iframe>

            <!-- Overlay Decor -->
            <div class="absolute inset-0 pointer-events-none border border-white/10 rounded-[2rem]"></div>
          </div>
          
          <!-- Subtle Quote / Caption -->
          <div class="mt-8 text-center animate-pulse">
             <p class="text-sm font-bold text-[#27628C]  tracking-normal">Watch Our Vision for 2025</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue'

// Reactive refs
const headerRef = ref<HTMLElement>()
const videoRef = ref<HTMLElement>()
const headerVisible = ref(false)
const videoVisible = ref(false)

// Intersection Observer for animations
let observer: IntersectionObserver

const setupIntersectionObserver = () => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.target === headerRef.value && entry.isIntersecting) {
          headerVisible.value = true
        }
        if (entry.target === videoRef.value && entry.isIntersecting) {
          videoVisible.value = true
        }
      })
    },
    {
      threshold: 0.1,
      rootMargin: '50px',
    }
  )

  if (headerRef.value) observer.observe(headerRef.value)
  if (videoRef.value) observer.observe(videoRef.value)
}

onMounted(() => {
  nextTick(() => {
    setupIntersectionObserver()
  })
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
})
</script>

<style scoped>
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
}

@keyframes float-delayed {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-15px); }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-float-delayed {
  animation: float-delayed 8s ease-in-out infinite;
  animation-delay: 2s;
}
</style>