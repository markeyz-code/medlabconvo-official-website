<script setup lang="ts">
import SiteHero from '@/components/site/SiteHero.vue'
import SiteSectionHeader from '@/components/site/SiteSectionHeader.vue'
import SiteCta from '@/components/site/SiteCta.vue'

const objectives = [
  { title: 'Practical career insight', text: 'Exposure to diverse and emerging healthcare fields such as data science, entrepreneurship and public health.', icon: 'lucide:compass' },
  { title: 'A collaborative global community', text: 'Lifelong mentorship networks and peer learning designed for sustained professional growth.', icon: 'lucide:globe-2' },
  { title: 'Leadership & innovation', text: 'Inspiring the next generation of leaders, researchers and innovators in healthcare and laboratory science.', icon: 'lucide:sparkles' },
]

const phases = [
  { title: 'Orientation & direction', text: 'Workshops introducing mentors, mentees and the goals of the programme.' },
  { title: 'Professional knowledge', text: 'Focused sessions on skills development, mentorship and practical career navigation.' },
  { title: 'Networking & collaboration', text: 'Engagement through peer collaboration and real-world challenges.' },
  { title: 'Reflection & continued growth', text: 'Wrap-up sessions and strategies for continued professional development.' },
]

useHead({
  title: 'Career Mentornet | MedLabConvo',
  meta: [{ name: 'description', content: 'A mentorship initiative guiding Medical Laboratory Science professionals toward excellence, leadership and innovation.' }],
})
</script>

<template>
  <main class="bg-white">
    <SiteHero
      eyebrow="Career Mentornet"
      title="A mentor changes what you believe is possible."
      description="A structured mentorship initiative for Medical Laboratory Science professionals navigating the gap between academic training and a career that matches their ambition."
      primary-label="Register interest"
      primary-to="/enquiries"
      secondary-label="Explore programmes"
      secondary-to="/programs"
    >
      <template #visual>
        <div class="site-card overflow-hidden !border-white/10 !bg-white/[0.06] p-6 sm:p-7">
          <p class="site-eyebrow !text-white/50">Programme structure</p>
          <div class="mt-5 space-y-3">
            <div class="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-4">
              <Icon name="lucide:clock-3" class="mt-0.5 h-4 w-4 text-[#f1a37f]" />
              <div><p class="text-[10px] font-bold uppercase tracking-[0.1em] text-white/45">Duration</p><p class="mt-1 text-[12px] font-semibold text-white">2 months · 6 sessions</p></div>
            </div>
            <div class="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-4">
              <Icon name="lucide:users" class="mt-0.5 h-4 w-4 text-[#f1a37f]" />
              <div><p class="text-[10px] font-bold uppercase tracking-[0.1em] text-white/45">Structure</p><p class="mt-1 text-[12px] font-semibold text-white">100 mentors × 100 mentees</p></div>
            </div>
            <div class="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-4">
              <Icon name="lucide:target" class="mt-0.5 h-4 w-4 text-[#f1a37f]" />
              <div><p class="text-[10px] font-bold uppercase tracking-[0.1em] text-white/45">Goal</p><p class="mt-1 text-[12px] font-semibold text-white">Guidance, collaboration & leadership growth</p></div>
            </div>
          </div>
        </div>
      </template>
    </SiteHero>

    <section class="site-section">
      <div class="site-container grid gap-10 lg:grid-cols-[1.15fr_.85fr]">
        <div>
          <p class="site-eyebrow">From the community</p>
          <h2 class="site-h2 mt-3">One relationship can change a career trajectory.</h2>
          <div class="mt-5 space-y-3 text-[13px] leading-7 text-[#5f7482]">
            <p>The Interntional Community of MedLabConvo welcomes participants embarking on the Career Mentornet journey — designed to support Medical Laboratory Science graduates, interns and NYSC corpers through mentorship, professional development and holistic growth.</p>
            <p>This programme is a testament to our shared commitment to excellence, collaboration and the advancement of medical laboratory science worldwide.</p>
          </div>
        </div>
        <div class="rounded-[1.5rem] bg-[#033958] p-6 text-white sm:p-7">
          <p class="text-[9px] font-bold uppercase tracking-[0.16em] text-white/45">What we are building</p>
          <h3 class="mt-2 text-[1.4rem] font-bold leading-tight tracking-[-0.03em]">A mentorship culture, not a one-off programme.</h3>
          <p class="mt-3 text-[11.5px] leading-6 text-white/55">Structured relationships, practical guidance and a network that continues long after the final session.</p>
          <div class="mt-5 flex flex-wrap gap-2">
            <span class="site-chip !border-white/15 !bg-white/10 !text-white/60">Mentors</span>
            <span class="site-chip !border-white/15 !bg-white/10 !text-white/60">Mentees</span>
            <span class="site-chip !border-white/15 !bg-white/10 !text-white/60">Alumni</span>
          </div>
        </div>
      </div>
    </section>

    <section class="bg-[#f7f9f8] py-14 sm:py-20">
      <div class="site-container">
        <SiteSectionHeader eyebrow="Mission & objectives" title="What the programme is for." description="To bridge the gap between academic training and professional excellence through mentorship, collaboration and personalised guidance." />
        <div class="mt-8 grid gap-3 sm:grid-cols-3">
          <article v-for="objective in objectives" :key="objective.title" class="rounded-2xl border border-[#e4ebf0] bg-white p-5">
            <span class="flex h-9 w-9 items-center justify-center rounded-xl bg-[#eef5f9] text-[#27628C]"><Icon :name="objective.icon" class="h-4 w-4" /></span>
            <h3 class="mt-6 text-[12px] font-bold text-[#0a202b]">{{ objective.title }}</h3>
            <p class="mt-1.5 text-[11px] leading-6 text-[#5f7482]">{{ objective.text }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="site-section">
      <div class="site-container">
        <SiteSectionHeader eyebrow="What you get" title="Built for both sides of the relationship." />
        <div class="mt-8 grid gap-3 md:grid-cols-2">
          <article class="rounded-[1.5rem] border border-[#e4ebf0] bg-white p-6 sm:p-7">
            <p class="site-eyebrow">For mentors</p>
            <h3 class="mt-3 text-[1.35rem] font-bold tracking-[-0.03em] text-[#0a202b]">Leave a professional legacy.</h3>
            <ul class="mt-4 space-y-2.5 text-[11.5px] leading-6 text-[#5f7482]">
              <li class="flex gap-2"><Icon name="lucide:check" class="mt-1 h-3.5 w-3.5 shrink-0 text-[#27628C]" /> Shape future leaders through structured mentorship.</li>
              <li class="flex gap-2"><Icon name="lucide:check" class="mt-1 h-3.5 w-3.5 shrink-0 text-[#27628C]" /> Refine leadership, communication and coaching skills.</li>
              <li class="flex gap-2"><Icon name="lucide:check" class="mt-1 h-3.5 w-3.5 shrink-0 text-[#27628C]" /> Network with global medical laboratory experts and innovators.</li>
            </ul>
          </article>
          <article class="rounded-[1.5rem] border border-[#e4ebf0] bg-[#faf8f3] p-6 sm:p-7">
            <p class="site-eyebrow">For mentees</p>
            <h3 class="mt-3 text-[1.35rem] font-bold tracking-[-0.03em] text-[#0a202b]">Move with better information.</h3>
            <ul class="mt-4 space-y-2.5 text-[11.5px] leading-6 text-[#5f7482]">
              <li class="flex gap-2"><Icon name="lucide:check" class="mt-1 h-3.5 w-3.5 shrink-0 text-[#27628C]" /> Receive personalised guidance from experienced professionals.</li>
              <li class="flex gap-2"><Icon name="lucide:check" class="mt-1 h-3.5 w-3.5 shrink-0 text-[#27628C]" /> Accelerate your growth and expand your professional reach.</li>
              <li class="flex gap-2"><Icon name="lucide:check" class="mt-1 h-3.5 w-3.5 shrink-0 text-[#27628C]" /> Build confidence, leadership and a lifelong support network.</li>
            </ul>
          </article>
        </div>
      </div>
    </section>

    <section class="bg-[#f7f9f8] py-14 sm:py-20">
      <div class="site-container">
        <SiteSectionHeader eyebrow="The journey" title="Four phases. One clear direction." />
        <div class="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <article v-for="(phase, index) in phases" :key="phase.title" class="rounded-2xl border border-[#e4ebf0] bg-white p-5">
            <span class="text-[10px] font-bold text-[#DE6129]">0{{ index + 1 }}</span>
            <h3 class="mt-4 text-[12px] font-bold text-[#0a202b]">{{ phase.title }}</h3>
            <p class="mt-1.5 text-[11px] leading-6 text-[#5f7482]">{{ phase.text }}</p>
          </article>
        </div>
      </div>
    </section>

    <SiteCta eyebrow="Apply or refer someone" title="Step into the next version of your career." description="Registration interest for the next Career Mentornet cohort is open. Tell us whether you want to mentor or be mentored." primary-label="Register interest" primary-to="/enquiries" secondary-label="Explore programmes" secondary-to="/programs" />
  </main>
</template>
