<template>
    <div class="relative py-10 px-6 lg:px-8 bg-gradient-to-br from-slate-50 via-blue-50 to-white overflow-hidden mt-20">
      <div class="absolute inset-0 overflow-hidden">
        <div class="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full opacity-30 animate-float"></div>
        <div class="absolute -bottom-20 -left-20 w-60 h-60 bg-indigo-100 rounded-full opacity-40 animate-float-delayed"></div>
      </div>
  
      <div class="relative max-w-6xl mx-auto">
        <div v-if="title" class="text-center mb-12">
          <h2 class="font-bold text-gray-900 mb-4 leading-tight">
            <span class="bg-gradient-to-r text-5xl sm:text-7xl lg:text-8xl from-[#27628C] via-blue-600 to-cyan-500 bg-clip-text text-transparent">
              {{ title }}
            </span>
          </h2>
          <p v-if="subtitle" class="text-2xl text-gray-600 font-medium max-w-3xl mx-auto">
            {{ subtitle }}
          </p>
        </div>
  
        <!-- Video Grid-->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div v-for="(videoId, index) in videoIds" :key="index" class="aspect-video w-full">
            <iframe
              class="w-full h-full rounded-lg shadow-sm border border-slate-200"
              :src="`https://www.youtube.com/embed/${videoId}`"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  defineProps<{
    videoIds: string[]
    title?: string
    subtitle?: string
  }>()
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
  