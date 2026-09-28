<template>
  <div 
    :class="[
      'relative group transition-all duration-700 ease-out',
      isLarge ? 'w-full md:w-80' : (isCompact ? 'w-full sm:w-60' : 'w-full sm:w-64')
    ]"
  >
    <!-- Background Glow Effect -->
    <div class="absolute inset-0 bg-gradient-to-br from-[#27628C]/20 to-indigo-500/10 rounded-[3rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
    
    <div 
      :class="[
        'relative bg-white/80 backdrop-blur-md rounded-[3rem] p-8 border border-white/50 shadow-sm group-hover:shadow-sm border border-slate-200 group-hover:-translate-y-4 flex flex-col items-center transition-all duration-500',
        isLarge ? 'pt-12 pb-10' : 'pt-10 pb-8'
      ]"
    >
      <!-- Image Container -->
      <div :class="['relative mb-8', isLarge ? 'w-48 h-48' : 'w-32 h-32']">
        <!-- Floating Ring -->
        <div class="absolute inset-0 rounded-full border-2 border-dashed border-[#27628C]/30 animate-[spin_20s_linear_infinite] group-hover:border-[#27628C]/60 group-hover:scale-110 transition-all"></div>
        
        <!-- Member Image -->
        <div class="absolute inset-2 rounded-full overflow-hidden border-4 border-white shadow-inner bg-gray-100">
          <img 
            :src="member.image || '/avatar-placeholder.png'" 
            :alt="member.name"
            class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
            @error="$event.target.src = '/avatar-placeholder.png'"
          />
        </div>
        
        <!-- Status Dot -->
        <div class="absolute bottom-2 right-2 w-5 h-5 bg-emerald-500 border-4 border-white rounded-full shadow-sm border border-slate-100 z-10 group-hover:scale-125 transition-transform"></div>
      </div>

      <!-- Info -->
      <div class="text-center space-y-2 w-full">
        <h3 :class="['font-black text-gray-900 tracking-tight leading-tight', isLarge ? 'text-lg' : 'text-lg']">
          {{ member.name }}
        </h3>
        
        <div class="inline-block px-4 py-1.5 rounded-full bg-blue-50/50 border border-blue-100/50">
          <p class="text-[#27628C] font-bold text-sm">
            {{ member.title }}
          </p>
        </div>
      </div>

      <!-- Social Social Links -->
      <div v-if="!isCompact" class="flex justify-center gap-3 mt-8 pt-6 border-t border-gray-50/80 w-full">
        <template v-for="profile in member.profiles" :key="profile.type">
          <a 
            v-if="profile.type === 'twitter' || profile.type === 'linkedin' || profile.type === 'facebook' || profile.type === 'instagram'"
            :href="profile.url" 
            target="_blank" 
            class="p-2.5 rounded-2xl bg-gray-50 text-gray-400 hover:bg-[#27628C] hover:text-white hover:scale-110 hover:-rotate-6 transition-all duration-300 shadow-sm"
          >
            <!-- Standard SVGs instead of Icon component if it might be missing -->
            <svg v-if="profile.type === 'twitter'" class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.84 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
            <svg v-if="profile.type === 'linkedin'" class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            <svg v-if="profile.type === 'facebook'" class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            <svg v-if="profile.type === 'instagram'" class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.332 3.608 1.308.975.975 1.245 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.332 2.633-1.308 3.608-.975.975-2.242 1.245-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.332-3.608-1.308-.975-.975-1.245-2.242-1.308-3.608-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.366.332-2.633 1.308-3.608.975-.975 2.242-1.245 3.608-1.308 1.266-.058 1.646-.07 4.85-.07zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.28.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.668-.072-4.948-.197-4.354-2.612-6.782-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
          </a>
        </template>
      </div>

      <!-- Badge for Leadership -->
      <div v-if="isLarge" class="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#27628C] text-white text-sm font-bold px-6 py-2 rounded-2xl shadow-sm border border-slate-200">
        Key Leadership
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  member: any
  isLarge?: boolean
  isCompact?: boolean
}>()
</script>
