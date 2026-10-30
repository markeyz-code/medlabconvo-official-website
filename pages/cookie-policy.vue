<template>
  <div class="min-h-screen bg-white">
    <section class="border-b border-[#e4ebf0] bg-[#faf8f3]">
      <div class="site-container py-12 sm:py-16">
        <p class="site-eyebrow">Legal & trust</p>
        <h1 class="site-display mt-4 text-[clamp(2.3rem,4.5vw,4rem)]">Cookie policy</h1>
        <p class="site-lead mt-3 max-w-2xl">How we use cookies and similar technologies to improve your experience.</p>
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
            <h2 class="text-xl font-bold text-gray-900 mb-8">What Are Cookies?</h2>
            <p>Cookies are small text files that are stored on your device when you visit websites. They are used to make websites work more efficiently and to provide information to the website owners.</p>
          </section>
  
          <section class="mb-20">
            <h2 class="text-xl font-bold text-gray-900 mb-8">How We Use Cookies</h2>
            <p>MedLabConvo uses cookies to improve your experience on our platform. We use them for:</p>
            <ul class="space-y-4">
              <li><strong>Essential Cookies:</strong> These are required for the website to function correctly, including your authentication and session state.</li>
              <li><strong>Performance & Preference Cookies:</strong> These help us remember your navigation choices and settings, such as your theme or language preference.</li>
              <li><strong>Analytics Cookies:</strong> These allow us to understand how visitors interact with our platform so we can optimize our content and UI.</li>
            </ul>
          </section>
  
          <section class="mb-20">
            <h2 class="text-xl font-bold text-gray-900 mb-8">Your Choices</h2>
            <p>Most browsers allow you to manage or disable cookies through their settings. Please note that disabling essential cookies may impact your ability to use certain features on our platform.</p>
          </section>
  
          <section class="mb-20">
            <h2 class="text-xl font-bold text-gray-900 mb-8">Updates to This Policy</h2>
            <p>We may update this policy periodically to reflect changes in our practices or legal requirements.</p>
          </section>
  
          <section class="mb-20">
            <h2 class="text-xl font-bold text-gray-900 mb-8">Contact Us</h2>
            <p>If you have any questions about this Cookie Policy, please reach out to us at <a href="mailto:admin@medlabconvo.com">admin@medlabconvo.com</a>.</p>
          </section>
        </div>
      </div>
    </main>

  </div>
</template>

<script setup lang="ts">
import { useHead } from '#imports'

useHead({
  title: 'Cookie Policy | MedLabConvo',
  meta: [
    { name: 'description', content: 'How we use cookies to improve your community experience.' }
  ]
})
</script>
