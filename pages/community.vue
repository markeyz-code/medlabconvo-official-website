<script setup lang="ts">
import SiteHero from '@/components/site/SiteHero.vue'
import SiteMedia from '@/components/site/SiteMedia.vue'
import SiteCta from '@/components/site/SiteCta.vue'
import SiteCarousel from '@/components/site/SiteCarousel.vue'
import interntionalImage from '@/assets/img/community1.png'
import universeImage from '@/assets/img/community2.png'
import bonding1 from '@/assets/img/bonding1.jpg'
import bonding2 from '@/assets/img/bonding2.jpg'
import bonding3 from '@/assets/img/bonding3.jpg'
import bonding4 from '@/assets/img/bonding4.jpg'
import bonding5 from '@/assets/img/bonding5.jpg'

useHead({
  title: 'Community | MedLabConvo',
  meta: [{ name: 'description', content: 'Interntional and UniVerse — communities for laboratory interns, NYSC corpers, students and early-career professionals.' }],
})
</script>

<template>
  <main class="bg-white">
    <SiteHero
      eyebrow="The MedLabConvo community"
      title="A global network of people who get it."
      description="Interntional and UniVerse are peer communities for laboratory interns, NYSC corpers, students and early-career professionals who want more than a certificate — they want a room full of people building the same future."
      primary-label="Join a community"
      primary-to="#communities"
      secondary-label="Explore programmes"
      secondary-to="/programs"
    >
      <template #visual>
        <div class="relative mx-auto max-w-lg">
          <div class="grid grid-cols-3 gap-2.5">
            <div class="col-span-2 overflow-hidden rounded-2xl border border-white/10"><div class="aspect-[4/5]"><SiteMedia :src="bonding1" label="Community" icon="lucide:users" eager /></div></div>
            <div class="space-y-2.5">
              <div class="overflow-hidden rounded-2xl border border-white/10"><div class="aspect-square"><SiteMedia :src="bonding2" label="Community" icon="lucide:users" /></div></div>
              <div class="overflow-hidden rounded-2xl border border-white/10"><div class="aspect-square"><SiteMedia :src="bonding3" label="Community" icon="lucide:users" /></div></div>
            </div>
          </div>
          <div class="absolute -bottom-4 -left-3 rounded-xl bg-[#DE6129] px-4 py-3 text-white shadow-lg sm:-left-6">
            <p class="text-[8px] font-bold uppercase tracking-[0.14em] text-white/70">Built for belonging</p>
            <p class="text-[12px] font-bold">Peers. Mentors. Rooms that open.</p>
          </div>
        </div>
      </template>
    </SiteHero>

    <section id="communities" class="site-section">
      <div class="site-container space-y-5">
        <article class="site-card overflow-hidden">
          <div class="grid lg:grid-cols-[.95fr_1.05fr]">
            <div class="relative min-h-[19rem] overflow-hidden bg-[#eef5f9] lg:order-2">
              <SiteMedia :src="interntionalImage" alt="Interntional community" label="Interntional" icon="lucide:users" />
            </div>
            <div class="p-6 sm:p-8 lg:p-10">
              <div class="flex items-center gap-2">
                <span class="site-chip !border-[#27628C]/15 !bg-[#eef5f9] !text-[#27628C]">Interns & corpers</span>
                <span class="site-chip">Community</span>
              </div>
              <h2 class="mt-4 text-[1.7rem] font-bold tracking-[-0.04em] text-[#0a202b]">Interntional</h2>
              <p class="mt-3 text-[12.5px] leading-7 text-[#5f7482]">The internship and NYSC service years are crucial milestones for every Medical Laboratory Science graduate — full of opportunity, but also significant barriers. Interntional is the community that helps interns and corpers navigate career growth, mentorship and the system with clarity.</p>
              <p class="mt-3 text-[12.5px] leading-7 text-[#5f7482]">Through mentorship, professional development and a network that understands both seasons, we help interns and corpers thrive — not just survive.</p>
              <a href="https://interntional.medlabconvo.com/" target="_blank" rel="noopener noreferrer" class="site-btn site-btn-primary mt-6">Explore Interntional <Icon name="lucide:arrow-up-right" class="h-3.5 w-3.5" /></a>
            </div>
          </div>
        </article>

        <article class="site-card overflow-hidden">
          <div class="grid lg:grid-cols-[1.05fr_.95fr]">
            <div class="relative min-h-[19rem] overflow-hidden bg-[#eef5f9]">
              <SiteMedia :src="universeImage" alt="UniVerse community" label="UniVerse" icon="lucide:graduation-cap" />
            </div>
            <div class="p-6 sm:p-8 lg:p-10">
              <div class="flex items-center gap-2">
                <span class="site-chip !border-[#DE6129]/15 !bg-[#fdf1eb] !text-[#b24a1e]">Students</span>
                <span class="site-chip">Community</span>
              </div>
              <h2 class="mt-4 text-[1.7rem] font-bold tracking-[-0.04em] text-[#0a202b]">UniVerse</h2>
              <p class="mt-3 text-[12.5px] leading-7 text-[#5f7482]">The journey of a Medical Laboratory Science student extends beyond academics. UniVerse is a thriving community designed to support students in their personal, professional and systemic development — from study strategies to career direction.</p>
              <p class="mt-3 text-[12.5px] leading-7 text-[#5f7482]">Build skills, forge connections and prepare for a future of impact alongside people walking the same road.</p>
              <a href="https://universe.medlabconvo.com/" target="_blank" rel="noopener noreferrer" class="site-btn site-btn-primary mt-6">Explore UniVerse <Icon name="lucide:arrow-up-right" class="h-3.5 w-3.5" /></a>
            </div>
          </div>
        </article>
      </div>
    </section>

    <section class="bg-[#f7f9f8] py-14 sm:py-20">
      <div class="site-container">
        <div class="grid gap-8 lg:grid-cols-[.85fr_1.15fr] lg:items-center">
          <div>
            <p class="site-eyebrow">Why it works</p>
            <h2 class="site-h2 mt-3">A network is infrastructure.</h2>
            <p class="site-lead mt-3">Careers move through people. A strong peer network gives you context, courage and the occasional shortcut.</p>
          </div>
          <div class="grid gap-3 sm:grid-cols-3">
            <div v-for="item in [
              { title: 'Peer support', text: 'People who understand the exact stage you are in.', icon: 'lucide:heart-handshake' },
              { title: 'Mentorship', text: 'Access to professionals who have walked the path.', icon: 'lucide:compass' },
              { title: 'Opportunity', text: 'Roles, programmes and collaborations shared early.', icon: 'lucide:sparkles' },
            ]" :key="item.title" class="rounded-2xl border border-[#e4ebf0] bg-white p-5">
              <span class="flex h-9 w-9 items-center justify-center rounded-xl bg-[#eef5f9] text-[#27628C]"><Icon :name="item.icon" class="h-4 w-4" /></span>
              <p class="mt-5 text-[12px] font-bold text-[#0a202b]">{{ item.title }}</p>
              <p class="mt-1 text-[10.5px] leading-5 text-[#5f7482]">{{ item.text }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="site-section bg-white">
      <div class="site-container">
        <SiteCarousel
          eyebrow="Inside the community"
          title="The room, in motion."
          description="Workshops, meetups and the informal moments in between — a look at what community looks like when it is working."
        >
          <div v-for="(image, index) in [bonding1, bonding2, bonding3, bonding4, bonding5]" :key="index" class="site-card overflow-hidden">
            <div class="aspect-[4/3]"><SiteMedia :src="image" :alt="`MedLabConvo community moment ${index + 1}`" label="Community moment" icon="lucide:camera" /></div>
          </div>
        </SiteCarousel>
      </div>
    </section>

    <SiteCta eyebrow="Find your people" title="You do not have to navigate the lab alone." description="Join a community that takes your ambition seriously — and makes room for the version of you that is still becoming." primary-label="Join Interntional" primary-to="https://interntional.medlabconvo.com/" secondary-label="Join UniVerse" secondary-to="https://universe.medlabconvo.com/" secondary-variant="light" />
  </main>
</template>
