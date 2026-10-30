<template>
  <div class="min-h-screen bg-white">
    <section class="border-b border-[#e4ebf0] bg-[#faf8f3]">
      <div class="site-container py-12 sm:py-16">
        <p class="site-eyebrow">Legal & trust</p>
        <h1 class="site-display mt-4 text-[clamp(2.3rem,4.5vw,4rem)]">Privacy policy</h1>
        <p class="site-lead mt-3 max-w-2xl">How MedLabConvo collects, uses and protects your information.</p>
      </div>
    </section>

    <!-- Content -->
    <main class="site-container py-12 sm:py-16">
      <div class="max-w-3xl">
        <div class="prose prose-lg sm:prose-xl prose-slate max-w-none 
          prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-gray-900 
          prose-p:text-gray-500 prose-p:leading-8 prose-p:font-medium
          prose-strong:text-gray-900 prose-a:text-[#27628C] prose-a:no-underline hover:prose-a:underline
          prose-li:text-gray-500 prose-li:font-medium">
          
          <p class="text-sm font-bold text-[#27628C]/60 mb-16 tracking-normal">Last Updated: April 5, 2026</p>
  
          <section class="mb-20">
            <h2 class="text-xl font-bold text-gray-900 mb-8">Introduction</h2>
            <p>At MedLabConvo, we are committed to protecting the privacy and security of our community members, healthcare professionals, and website visitors. This Privacy Policy explains how we collect, use, and safeguard your information when you interact with our platform.</p>
          </section>
  
          <section class="mb-20">
            <h2 class="text-xl font-bold text-gray-900 mb-8">Information We Collect</h2>
            <p>We collect information that you provide directly to us when you subscribe to our newsletter, engage with the ConvoStack, or make an enquiry. This may include:</p>
            <ul class="space-y-4">
              <li>Contact details (Name, Email, Social Handles)</li>
              <li>Professional information (Job Title, Institution)</li>
              <li>Interaction data (Comments, Likes, Enquiry history)</li>
            </ul>
          </section>
  
          <section class="mb-20">
            <h2 class="text-xl font-bold text-gray-900 mb-8">How We Use Your Information</h2>
            <p>We use the collected data to provide our services, maintain our community metrics, and improve our content delivery. Specifically, we use it for:</p>
            <ul class="space-y-4">
              <li>Delivering the Convo Substack and other editorial content.</li>
              <li>Responding to professional enquiries and requests.</li>
              <li>Processing community scholarship and program applications.</li>
              <li>Analyzing platform performance to enhance user experience.</li>
            </ul>
          </section>
  
          <section class="mb-20">
            <h2 class="text-xl font-bold text-gray-900 mb-8">Data Security</h2>
            <p>We implement industry-standard security measures to protect your data. However, please be aware that no transmission over the internet is 100% secure.</p>
          </section>
  
          <section class="mb-20">
            <h2 class="text-xl font-bold text-gray-900 mb-8">Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please reach out to us at <a href="mailto:admin@medlabconvo.com">admin@medlabconvo.com</a>.</p>
          </section>
        </div>
      </div>
    </main>

  </div>
</template>

<script setup lang="ts">
import { useHead } from '#imports'

useHead({
  title: 'Privacy Policy | MedLabConvo',
  meta: [
    { name: 'description', content: 'Our commitment to protecting your personal data and privacy.' }
  ]
})
</script>
