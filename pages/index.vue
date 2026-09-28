
<template>
  <!-- 1. UPDATED HERO SECTION - Replace the existing hero -->
  <div class="relative isolate overflow-hidden bg-gradient-to-br from-[#27628C] via-[#1e4d6b] to-[#27628C]">
    <div class="absolute inset-0 -z-10">
      <div class="absolute inset-0 bg-gradient-to-br from-[#27628C]/90 via-[#1e4d6b]/90 to-[#27628C]/90"></div>
      <img src="@/assets/img/hero-background.jpeg" alt="" class="absolute inset-0 w-full h-full object-cover opacity-20">
    </div>

    <!-- Animated background elements -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute -top-40 -left-20 w-80 h-80 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute -bottom-40 -right-20 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
    </div>

    <div class="relative mx-auto max-w-7xl px-6 py-32 sm:py-40 lg:px-8">
      <div class="text-center">
        <h1 class="text-6xl sm:text-8xl lg:text-9xl font-bold tracking-tight text-white mb-6 animate-fade-in">
          <span class="bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
            MedLabConvo
          </span>
        </h1>
        <p class="text-xl sm:text-2xl lg:text-3xl text-blue-100 font-light mb-4 animate-fade-in-delay">
          A Platform for Laboratory Science, Health Innovation,
        </p>
        <p class="text-xl sm:text-2xl lg:text-3xl text-blue-100 font-light mb-8 animate-fade-in-delay">
          and Workforce Development
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12">
          <a href="#what-we-do" class="bg-white text-[#27628C] px-8 py-4 rounded-full font-semibold hover:bg-blue-50 transition-all duration-300 shadow-sm border border-slate-100 hover:shadow-sm border border-slate-200 transform hover:-translate-y-1">
            Explore Our Services
          </a>
          <a href="#about" class="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-[#27628C] transition-all duration-300">
            Learn More
          </a>
        </div>
        <!-- Testimonial Carousel in Hero -->
        <div class="mt-16 max-w-lg mx-auto relative h-24 overflow-hidden animate-fade-in-delay">
          <div v-for="(testimonial, index) in testimonials" :key="index" 
               v-show="activeTestimonial === index"
               class="absolute inset-0 flex flex-col items-center justify-center transition-all duration-700 transform"
               :class="{ 'translate-y-0 opacity-100': activeTestimonial === index, 'translate-y-4 opacity-0': activeTestimonial !== index }">
            <p class="text-blue-100 text-sm font-medium  leading-relaxed text-center px-4">
              "{{ testimonial.testimonial.length > 120 ? testimonial.testimonial.substring(0, 117) + '...' : testimonial.testimonial }}"
            </p>
            <p class="text-[10px] font-bold text-white mt-2  tracking-normal">— {{ testimonial.name }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <VideoHero />

  <!-- 2. NEW SECTION: Transforming Healthcare (Add after Mission Statement Video Section) -->
  <!-- <section id="about" class="py-24 bg-gradient-to-br from-white via-blue-50/30 to-white">
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
  </section> -->

  <!-- 3. NEW SECTION: What We Do (Professional Refresh) -->
  <section id="what-we-do" class="py-24 bg-white">
    <div class="max-w-7xl mx-auto px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="text-sm font-bold text-[#27628C] mb-4">Core Services</h2>
        <h3 class="text-lg font-bold text-gray-900 mb-6">Advancing Healthcare through Innovation</h3>
        <div class="w-16 h-1.5 bg-[#27628C] mx-auto rounded-full"></div>
      </div>
 
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
        <!-- Service 1 -->
        <div class="group relative bg-white rounded-2xl p-10 border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300">
          <div class="relative">
            <div class="flex items-center justify-center w-12 h-12 mb-8 rounded-xl bg-slate-50 border border-slate-100 text-[#27628C] group-hover:bg-[#27628C] group-hover:text-white transition-all duration-300">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
              </svg>
            </div>
            <h3 class="text-lg font-bold text-gray-900 mb-4 tracking-tight">
              Digital Programs and Capacity Building
            </h3>
            <p class="text-slate-500 leading-relaxed font-medium">
              We design structured digital programs that support career development, leadership training, and workforce readiness in medical laboratory science and allied health fields.
            </p>
          </div>
        </div>
 
        <!-- Service 2 -->
        <div class="group relative bg-white rounded-2xl p-10 border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300">
          <div class="relative">
            <div class="flex items-center justify-center w-12 h-12 mb-8 rounded-xl bg-slate-50 border border-slate-100 text-[#27628C] group-hover:bg-[#27628C] group-hover:text-white transition-all duration-300">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path>
              </svg>
            </div>
            <h3 class="text-lg font-bold text-gray-900 mb-4 tracking-tight">
              Media and Knowledge Platforms
            </h3>
            <p class="text-slate-500 leading-relaxed font-medium">
              Through LabCast and Journo, we produce high-quality digital content including expert conversations, industry analysis, research commentary, and professional insights.
            </p>
          </div>
        </div>
 
        <!-- Service 3 -->
        <div class="group relative bg-white rounded-2xl p-10 border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300">
          <div class="relative">
            <div class="flex items-center justify-center w-12 h-12 mb-8 rounded-xl bg-slate-50 border border-slate-100 text-[#27628C] group-hover:bg-[#27628C] group-hover:text-white transition-all duration-300">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
            </div>
            <h3 class="text-lg font-bold text-gray-900 mb-4 tracking-tight">
              Community and Professional Networks
            </h3>
            <p class="text-slate-500 leading-relaxed font-medium">
              We operate a global digital community connecting laboratory professionals, researchers, innovators, and health leaders for peer learning and cross-border exchange.
            </p>
          </div>
        </div>
 
        <!-- Service 4 -->
        <div class="group relative bg-white rounded-2xl p-10 border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300">
          <div class="relative">
            <div class="flex items-center justify-center w-12 h-12 mb-8 rounded-xl bg-slate-50 border border-slate-100 text-[#27628C] group-hover:bg-[#27628C] group-hover:text-white transition-all duration-300">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
            </div>
            <h3 class="text-lg font-bold text-gray-900 mb-4 tracking-tight">
              Products and Resources
            </h3>
            <p class="text-slate-500 leading-relaxed font-medium">
              We develop and curate digital resources, toolkits, guides, and learning materials that support evidence-based practice and career progression.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>


  <!-- 4. UPDATED Target Audience Section (Professional Style) -->
  <section class="py-20 bg-slate-50 border-y border-slate-100">
    <div class="max-w-7xl mx-auto px-6 lg:px-8">
      <div class="text-center mb-10">
        <h2 class="text-lg font-bold text-gray-900 mb-4 tracking-tight">Who We Serve</h2>
        <div class="w-12 h-1.5 bg-[#27628C] mx-auto rounded-full"></div>
      </div>
      <p class="text-xl text-slate-500 max-w-4xl mx-auto text-center leading-relaxed font-medium">
        Our work supports students, early career professionals, institutions, and partners navigating the future of laboratory medicine and health technology.
      </p>
    </div>
  </section>


  <!-- 5. NEW SECTION: Featured Programs -->
  <section class="py-24 bg-slate-50 border-t border-slate-100">
    <div class="max-w-7xl mx-auto px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="text-sm font-bold text-[#27628C] mb-4">Our Programs</h2>
        <h3 class="text-lg font-bold text-gray-900 mb-6">Transforming Your Career Journey</h3>
        <div class="w-16 h-1.5 bg-[#27628C] mx-auto rounded-full"></div>
      </div>
      
      <div v-if="fetchingPrograms" class="flex justify-center py-12">
        <div class="w-12 h-12 rounded-full border-4 border-slate-200 border-t-[#27628C] animate-spin"></div>
      </div>
      <div v-else-if="activePrograms?.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="program in activePrograms.slice(0, 3)" :key="program.id || program._id" class="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-sm border border-slate-200 transition-all duration-300 border border-slate-100 group flex flex-col">
          <div class="relative h-60 overflow-hidden">
            <img :src="program.image || '/placeholder-program.jpg'" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Program Image">
            <div class="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>
            <div class="absolute bottom-6 left-6 right-6">
              <span class="inline-block px-3 py-1 bg-[#DE6129] text-white text-[10px] font-black  tracking-normal rounded-full mb-3">{{ program.category || 'Program' }}</span>
              <h4 class="text-xl font-bold text-white">{{ program.title }}</h4>
            </div>
          </div>
          <div class="p-6 flex flex-col flex-grow">
            <p class="text-gray-500 text-sm leading-relaxed mb-6 flex-grow line-clamp-3">
              {{ program.description }}
            </p>
            <NuxtLink :to="`/programs/${program.slug}`" class="text-xs font-black  tracking-normal text-[#27628C] group-hover:text-[#DE6129] transition-colors flex items-center gap-2">
              Learn More
              <svg class="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
            </NuxtLink>
          </div>
        </div>
      </div>
      
      <div class="text-center mt-12" v-if="activePrograms?.length > 3">
        <NuxtLink to="/programs" class="inline-flex items-center bg-white border-2 border-[#27628C] text-[#27628C] px-8 py-4 rounded-xl font-bold text-sm hover:bg-[#27628C] hover:text-white transition-all">
          View All Programs
        </NuxtLink>
      </div>
    </div>
  </section>

  <!-- 6. NEW SECTION: Featured Platforms (Clean Table/Grid Hybrid) -->
  <section class="py-24 bg-white">
    <div class="max-w-7xl mx-auto px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="text-sm font-bold text-[#27628C] mb-4">Our Platforms</h2>
        <h3 class="text-lg font-bold text-gray-900 mb-6">Expert Insights at Your Fingertips</h3>
        <div class="w-16 h-1.5 bg-[#27628C] mx-auto rounded-full"></div>
      </div>
 
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <!-- LabCast Platform -->
        <div class="group relative bg-[#27628C] rounded-[2.5rem] overflow-hidden shadow-sm border border-slate-200 transition-all duration-500 hover:scale-[1.02]">
          <div class="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000"></div>
          <div class="relative p-12 lg:p-16">
            <div class="flex items-center mb-10">
              <div class="flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md mr-6">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-white tracking-tight ">LabCast</h3>
            </div>
            <p class="text-blue-50 text-xl leading-relaxed mb-12 font-medium opacity-90">
              Conversations with laboratory scientists, public health experts, and health innovators shaping the future of healthcare.
            </p>
            <NuxtLink to="/lab-cast" class="inline-flex items-center bg-white text-[#27628C] px-10 py-5 rounded-2xl font-bold text-xs hover:bg-black hover:text-white transition-all shadow-sm border border-slate-200 active:scale-95 group">
              Listen & Explore
              <svg class="w-4 h-4 ml-3 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
              </svg>
            </NuxtLink>
          </div>
        </div>
 
        <!-- Journo Platform -->
        <div class="group relative bg-[#13110F] rounded-[2.5rem] overflow-hidden shadow-sm border border-slate-200 transition-all duration-500 hover:scale-[1.02]">
          <div class="absolute -right-10 -top-10 w-40 h-40 bg-[#27628C]/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000"></div>
          <div class="relative p-12 lg:p-16">
            <div class="flex items-center mb-10">
              <div class="flex items-center justify-center w-16 h-16 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md mr-6">
                <svg class="w-8 h-8 text-[#27628C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-white tracking-tight ">Journo</h3>
            </div>
            <p class="text-gray-400 text-xl leading-relaxed mb-12 font-medium">
              Insight-driven articles, opinion pieces, and explainers on medical laboratory science, careers, and global health systems.
            </p>
            <NuxtLink to="/journo" class="inline-flex items-center bg-[#27628C] text-white px-10 py-5 rounded-2xl font-bold text-xs hover:bg-white hover:text-black transition-all shadow-sm border border-slate-200 active:scale-95 group">
              Read Journalism
              <svg class="w-4 h-4 ml-3 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
              </svg>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>


  <!-- 6. NEW SECTION: Impact Stats (Professional Dark Mode) -->
  <section class="py-24 bg-[#0a192f] relative overflow-hidden">
    <div class="absolute inset-0 opacity-10 bg-[radial-gradient(#27628C_1px,transparent_1px)] [background-size:20px_20px]"></div>
    
    <div class="relative max-w-7xl mx-auto px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <h2 class="text-lg font-bold text-white mb-8 tracking-tight leading-tight">
            Transforming Professional <br/> Growth at Scale
          </h2>
          <p class="text-xl text-slate-400 leading-relaxed max-w-xl font-medium">
            MedLabConvo has supported thousands of laboratory professionals through digital engagement, education, and community-driven learning.
          </p>
        </div>
 
        <div class="grid grid-cols-2 gap-6">
          <div class="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-colors">
            <div class="text-lg font-bold text-white mb-2">5000+</div>
            <div class="text-slate-500 text-sm font-bold">Beneficiaries</div>
          </div>
          <div class="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-colors">
            <div class="text-lg font-bold text-white mb-2">50+</div>
            <div class="text-slate-500 text-sm font-bold">Programs</div>
          </div>
          <div class="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-colors">
            <div class="text-lg font-bold text-white mb-2">100+</div>
            <div class="text-slate-500 text-sm font-bold">Episodes</div>
          </div>
          <div class="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-colors">
            <div class="text-lg font-bold text-white mb-2">30+</div>
            <div class="text-slate-500 text-sm font-bold">Countries</div>
          </div>
        </div>
      </div>
    </div>
  </section>


<!-- Testimonials removed from bottom (moved to Hero) -->


  <!-- 8. UPDATED Partnership Section (Standard Grid) -->
  <section class="py-24 bg-slate-50 border-t border-slate-100">
    <div class="max-w-7xl mx-auto px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="text-lg font-bold text-gray-900 mb-6 tracking-tight">Partner With Us</h2>
        <div class="w-12 h-1.5 bg-[#27628C] mx-auto rounded-full mb-10"></div>
        <p class="text-xl text-slate-500 max-w-4xl mx-auto mb-16 font-medium leading-relaxed">
          We collaborate with academic institutions and partners to deliver impactful digital programs and workforce development initiatives.
        </p>
      </div>
 
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 items-center mb-16">
        <div v-for="i in [partner1, partner2, partner3, partner4, partner5, partner6]" :key="i" class="flex items-center justify-center p-6 bg-white border border-slate-100 rounded-xl transition-all duration-300">
           <img class="h-10 w-auto object-contain grayscale opacity-50" :src="i" :alt="`Partner ${i}`">
        </div>
      </div>
 
      <div class="text-center">
        <a href="mailto:admin@medlabconvo.com" class="inline-flex items-center bg-[#27628C] text-white px-10 py-4 rounded-xl font-bold text-sm hover:bg-[#1e4d6f] transition-all">
          Partner With MedLabConvo
          <svg class="w-4 h-4 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
          </svg>
        </a>
      </div>
    </div>
  </section>


  <!-- 9. UPDATED Donation CTA (Professional Bordered) -->
  <section class="py-24 bg-[#0a192f] border-t border-white/5 relative overflow-hidden">
    <div class="relative max-w-4xl mx-auto text-center px-6 lg:px-8">
      <h2 class="text-lg font-bold text-white mb-6 tracking-tight">Support Our Work</h2>
      <p class="text-xl text-slate-400 mb-12 leading-relaxed font-medium">
        Help us sustain and expand our digital services for healthcare professionals.
      </p>
      <router-link to="/donate" class="inline-flex items-center bg-white text-[#27628C] px-10 py-5 rounded-xl font-bold text-sm hover:bg-blue-50 transition-all duration-300">
        Donate Now
        <svg class="w-4 h-4 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
        </svg>
      </router-link>
    </div>
  </section>


  <!-- 10. UPDATED Newsletter Section -->
  <div class="bg-gradient-to-br from-gray-50 to-blue-50 py-20">
    <div class="max-w-4xl mx-auto text-center px-6 lg:px-8">
      <h2 class="text-lg font-bold text-[#27628C] mb-6">Stay Informed</h2>
      <p class="text-xl text-gray-700 mb-10 leading-relaxed">
        Subscribe to our newsletter for insights, programs, and opportunities in laboratory science and healthcare innovation.
      </p>
      <NuxtLink to="/subscribe" class="inline-flex items-center bg-gradient-to-r from-[#27628C] to-blue-600 text-white px-10 py-5 rounded-full font-bold text-lg hover:shadow-sm border border-slate-200 transition-all duration-300 transform hover:-translate-y-1 group">
        Subscribe for Updates
        <svg class="w-5 h-5 ml-3 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
        </svg>
      </NuxtLink>

      <div class="mt-16">
        <p class="font-semibold text-gray-800 text-lg mb-6">Let's Talk Medical Laboratory Science</p>
        <div class="flex justify-center space-x-5">
          <a href="https://x.com/medlabconvo" class="group" aria-label="X (Twitter)">
            <div class="w-12 h-12 rounded-full bg-white shadow-sm border border-slate-100 flex items-center justify-center group-hover:bg-gray-900 group-hover:scale-110 transition-all duration-300">
              <img src="@/assets/img/logo1.png" class="h-6 w-6 group-hover:brightness-0 group-hover:invert transition-all" alt="X"/>
            </div>
          </a>
          <a href="https://www.instagram.com/medlabconvo/" class="group" aria-label="Instagram">
            <div class="w-12 h-12 rounded-full bg-white shadow-sm border border-slate-100 flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-purple-600 group-hover:to-pink-600 group-hover:scale-110 transition-all duration-300">
              <img src="@/assets/img/logo4.svg" class="h-6 w-6 group-hover:brightness-0 group-hover:invert transition-all" alt="Instagram"/>
            </div>
          </a>
          <a href="https://web.facebook.com/medlabconvo" class="group" aria-label="Facebook">
            <div class="w-12 h-12 rounded-full bg-white shadow-sm border border-slate-100 flex items-center justify-center group-hover:bg-blue-600 group-hover:scale-110 transition-all duration-300">
              <img src="@/assets/img/logo3.svg" class="h-6 w-6 group-hover:brightness-0 group-hover:invert transition-all" alt="Facebook"/>
            </div>
          </a>
          <a href="https://www.linkedin.com/company/medlabconvo/" class="group" aria-label="LinkedIn">
            <div class="w-12 h-12 rounded-full bg-white shadow-sm border border-slate-100 flex items-center justify-center group-hover:bg-blue-700 group-hover:scale-110 transition-all duration-300">
              <img src="@/assets/img/logo5.svg" class="h-6 w-6 group-hover:brightness-0 group-hover:invert transition-all" alt="LinkedIn"/>
            </div>
          </a>
          <a href="https://mlcjourno.substack.com/" class="group" aria-label="Substack">
            <div class="w-12 h-12 rounded-full bg-white shadow-sm border border-slate-100 flex items-center justify-center group-hover:bg-orange-500 group-hover:scale-110 transition-all duration-300">
              <img src="@/assets/img/substack.png" class="h-6 w-6 group-hover:brightness-0 group-hover:invert transition-all" alt="Substack"/>
            </div>
          </a>
          <a href="https://open.spotify.com/show/04S2XZGd6gczoCXStIrh8e" class="group" aria-label="Spotify">
            <div class="w-12 h-12 rounded-full bg-white shadow-sm border border-slate-100 flex items-center justify-center group-hover:bg-green-500 group-hover:scale-110 transition-all duration-300">
              <img src="@/assets/img/logo2.png" class="h-6 w-6 group-hover:brightness-0 group-hover:invert transition-all" alt="Spotify"/>
            </div>
          </a>
        </div>
      </div>

      <div class="w-full flex justify-center items-center flex-col pt-12 border-t border-gray-200 mt-12">
        <p class="text-center text-sm text-gray-600 mb-2">
          MedLabConvo is a trademark of LabiHealth Ambassadors Initiative, a registered non-profit organisation.
        </p>
        <p class="text-sm text-gray-600">
          © LabiHealth Ambassadors Initiative 2025. All Rights Reserved
        </p>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { useHead } from '#imports'

// Set SEO Meta Tags
useHead({
  title: 'MedLabConvo | Leading Change in Medical Laboratory Science & Healthcare',
  meta: [
    { name: 'description', content: 'MedLabConvo is a digital service organisation advancing medical laboratory science and healthcare through knowledge platforms, professional tools, and workforce development.' },
    { property: 'og:title', content: 'MedLabConvo - Transforming Healthcare One Lab Professional at a Time' },
    { property: 'og:description', content: 'Advancing medical laboratory science through digital programs, community networks, and expert-led publications like LabCast and Journo.' },
    { property: 'og:image', content: '/images/medlabconvo-og-image.jpg' },
    { property: 'og:url', content: 'https://medlabconvo.com' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'MedLabConvo | Advancing Healthcare Innovation' },
    { name: 'twitter:description', content: 'Join the global community of laboratory professionals and health leaders shaping the future of healthcare.' },
    { name: 'twitter:image', content: '/images/medlabconvo-twitter-image.jpg' }
  ]
})
// import AnniversaryPopup from "@/components/AnniversaryPopup.vue";
import { useYoutubeVideo } from '@/composables/useYoutubeVideo';
import labcast from '@/assets/img/latest-labcast.jpg'
const isOpen = ref(false)
import convo from "@/assets/img/forging-a-career-path.jpg"
import { useGetPrograms } from "@/composables/modules/programs/useGetPrograms"
import latestJourno from '@/assets/img/journals-dust.jpg'
import { useGetPublications } from "@/composables/modules/publications/useGetPublications"
import { useGetLabCasts } from "@/composables/modules/labcast/useGetLabCasts"

import partner1 from '@/assets/img/partner1.jpeg'
import partner2 from '@/assets/img/partner2.jpeg'
import partner3 from '@/assets/img/partner3.jpeg'
import partner4 from '@/assets/img/partner4.jpeg'
import partner5 from '@/assets/img/partner5.jpeg'
import partner6 from '@/assets/img/partner6.jpeg'



const activeTestimonial = ref(0)
onMounted(() => {
  setInterval(() => {
    activeTestimonial.value = (activeTestimonial.value + 1) % testimonials.value.length
  }, 5000)
})

const { labcasts, loading: loadingLabcasts } = useGetLabCasts()
const { publications, loading: loadingPublications } = useGetPublications()
const { programs, loading: fetchingPrograms } = useGetPrograms()

const activePrograms = computed(() => {
  if (!programs.value) return []
  return programs?.value?.filter((p: any) => p.status === 'active')
})
const journosList = ref([
  {
    title: 'FORGING A CAREER PATH 4.0',
    image: convo,
    desc: `The FACP program aims to expand the career horizons of young professionals and students in medical laboratory science by showcasing diverse opportunities beyond traditional clinical roles. In response to the evollving healthcare landscape. the program highlights various career paths within and outside the medical laboratory field, encouraging participants to explore their potential.`,
    secondPart: `Through interactive workshops, mentorship sessions, and networking events, the FACP program fosters an environment that promotes innovative thinking and professional development. Participants are inspired to consider careers in research, healthcare technology, public health, education, and industry innovation, ultimately redefining what success looks like in medical laboratory science. By transforming challenges into opportunities, the program seeks to empower individuals to forge their unique paths in this dynamic field.`,
    previousEditionUrl: '#',
    status: 'latest',
    registerUrl: '#'
  },
])

const { videoUrl } = useYoutubeVideo('rhVkU6HAbn0'); // Example video ID
console.log(videoUrl.value); // should log "https://www.youtube.com/embed/rhVkU6HAbn0"

const testimonials = ref([
  {
    name: 'Daniel Adekunle',
    testimonial: `MedLabConvo has been a game-changer for me. From knowledge gained through webinars to career mentorship, MedLabConvo has helped me grow professionally and personally. I now feel more confident about my future in medical laboratory science.`
  },
  {
    name: 'Mabel Omoniwa',
    testimonial: `MedLabConvo gave me clarity about my career path. The mentorship and resources have transformed the way I approach learning and professional growth. I now feel equipped to excel in the health ecosystem.`
  },
  {
    name: 'Shedrack Etuk',
    testimonial: `MedLabConvo has redefined professional development in medical laboratory science. The discussions, networking, and mentorship opportunities have enriched my career.`
  },
  {
    name: 'Paul Odeh',
    testimonial: `MedLabConvo fosters collaboration among medical lab scientists worldwide. It’s a great place to connect, learn, and contribute to the advancement of our profession.`
  },
  {
    name: 'Dolapo Moses',
    testimonial: `MedLabConvo organized an excellent and quintessential masterclass on scholarships, which was totally free. They shared quality and useful information with. I am sincerely challenged and encouraged to keep it up and not to give up. Thank you so much!`
  },
  {
    name: 'Jude Emeka',
    testimonial: `Honestly, the experience was eye-opening. I'm grateful to the organizers and the presenters for the amazing work they've done, and I look forward to other such programs from MedLabConvo.`
  }
])
</script>

<style scoped>


.youtube-video {
  max-width: 800px;
  margin: 0 auto;
}

.word {
  position: absolute;
  inset: 0;
  opacity: 0;    
  animation-fill-mode: both;
  text-align: center;
}

@keyframes fade-word {
  0%, 100% { opacity: 0; transform: translateY(10px); }
  10%, 40% { opacity: 1; transform: translateY(0); }
  50%, 100% { opacity: 0; transform: translateY(-10px); }
}

.animate-fade-word {
  animation: fade-word 6s ease-in-out infinite;
}

@keyframes fade-in {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in {
  animation: fade-in 1s ease-out;
}

.animate-fade-in-delay {
  animation: fade-in 1s ease-out 0.3s both;
}

.bg-grid-white {
  background-image: linear-gradient(white 1px, transparent 1px),
                    linear-gradient(90deg, white 1px, transparent 1px);
}
</style>
