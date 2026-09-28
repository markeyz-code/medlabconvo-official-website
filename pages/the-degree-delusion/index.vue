<template>
    <div class="overflow-hidden bg-white">

        <!-- HERO SECTION -->
        <section class="relative bg-gradient-to-br from-[#f0f6fb] via-white to-[#e8f2f9] py-20 px-6 overflow-hidden">
            <div class="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#27628C]/8 blur-3xl pointer-events-none"></div>
            <div class="absolute bottom-0 -left-20 w-72 h-72 rounded-full bg-[#27628C]/6 blur-2xl pointer-events-none"></div>

            <div class="relative max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-14">
                <div class="flex-1 text-center lg:text-left">
                    <span class="inline-block mb-4 text-xs font-semibold  tracking-normal text-[#27628C] bg-[#27628C]/10 px-4 py-1.5 rounded-full">Available Now for Order</span>
                    <h1 class="font-extrabold text-lg lg:text-xl leading-tight text-gray-900 mb-6" style="font-family: 'Georgia', serif;">
                        The Degree<br />
                        <span class="text-[#27628C]">Delusion</span>
                    </h1>
                    <p class="text-gray-500 text-base lg:text-lg italic mb-6 max-w-xl mx-auto lg:mx-0" style="font-family: 'Georgia', serif;">
                        Why Your Degree is Not Enough and How You Can Win Before You Graduate
                    </p>
                    <p class="text-gray-600 text-lg leading-relaxed max-w-xl mx-auto lg:mx-0 mb-8">
                        A practical, honest, and urgent guide for African undergraduates who want to win <em>before</em>
                        they graduate, not after. Challenge comforting lies, restore your agency, and use your
                        university years as the most flexible, resource-rich season of your life.
                    </p>
                    <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                        <a href="https://selar.com/p/72447137r3?affiliate=v6494e7245" target="_blank" rel="noopener noreferrer"
                            class="inline-flex items-center justify-center gap-2 bg-[#27628C] hover:bg-[#1e4f73] text-white font-semibold px-8 py-3.5 rounded-lg transition-all duration-200 shadow-sm border border-slate-100 shadow-[#27628C]/30 hover:shadow-sm border border-slate-200 hover:shadow-[#27628C]/40 hover:-translate-y-0.5">
                            Order Now
                        </a>
                        <a href="#overview"
                            class="inline-flex items-center justify-center gap-2 border-2 border-[#27628C] text-[#27628C] hover:bg-[#27628C] hover:text-white font-semibold px-8 py-3.5 rounded-lg transition-all duration-200">
                            Read Overview
                        </a>
                    </div>
                </div>

                <div class="flex-shrink-0 flex justify-center lg:justify-end">
                    <img src="@/assets/img/book-cover.png" alt="The Degree Delusion book cover"
                        class="w-[32rem] object-contain drop-shadow-sm border border-slate-200" />
                </div>
            </div>
        </section>

        <!-- OVERVIEW / INSIDE THE BOOK -->
        <section id="overview" class="py-16 px-6 bg-white">
            <div class="max-w-6xl mx-auto">
                <div class="text-center mb-14">
                    <h2 class="text-xl lg:text-lg font-extrabold text-gray-900 mb-4" style="font-family:'Georgia',serif;">Inside the Book</h2>
                    <p class="text-gray-500 max-w-2xl mx-auto text-lg">
                        To every undergraduate, recent graduate or young professional navigating uncertainty,
                        expectations, and ambition, this book provides actionable insights to navigate the evolving
                        landscape of higher education and career building.
                    </p>
                </div>

                <div class="bg-[#f8fbfe] border border-[#27628C]/10 rounded-2xl p-8 lg:p-12 mb-14">
                    <p class="text-gray-700 leading-relaxed text-base lg:text-lg mb-4">
                        Study hard. Get good grades. Earn a degree. And life will open up. For the older generation, it
                        mostly worked. A degree was rare, jobs were steadier, and employers hired for potential.
                    </p>
                    <p class="text-gray-700 leading-relaxed text-base lg:text-lg mb-4">
                        But something has changed. Degrees are no longer rare. Jobs are no longer guaranteed. And the
                        world no longer waits for graduates to "find themselves." Yet many students still treat
                        university like a waiting room — something to endure for four or five years while the world
                        waits for them.
                    </p>
                    <p class="text-gray-700 leading-relaxed text-base lg:text-lg font-medium text-[#27628C]">
                        <em>The Degree Delusion</em> is a practical, honest, and urgent guide for African undergraduates
                        who want to win before they graduate, not after.
                    </p>
                </div>

                <h3 class="text-xl font-bold text-gray-900 mb-8 text-center">Inside, you'll learn how to:</h3>
                <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div v-for="(item, i) in insideItems" :key="i"
                        class="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200">
                        <div class="w-10 h-10 rounded-xl bg-[#27628C]/10 flex items-center justify-center mb-4">
                            <svg class="w-5 h-5 text-[#27628C]" fill="none" stroke="currentColor" stroke-width="2"
                                viewBox="0 0 24 24" v-html="item.icon"></svg>
                        </div>
                        <p class="text-gray-800 font-medium leading-snug">{{ item.text }}</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- VIDEOS SECTION -->
        <section class="py-16 px-6 bg-[#27628C] relative overflow-hidden">
            <div class="absolute top-0 right-0 w-80 h-80 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
            <div class="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-white/5 translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

            <div class="relative max-w-6xl mx-auto">
                <div class="text-center mb-14">
                    <h2 class="text-xl lg:text-lg font-extrabold text-white mb-4" style="font-family:'Georgia',serif;">
                        Hear from the Author
                    </h2>
                    <p class="text-white/70 text-lg max-w-xl mx-auto">
                        Get a feel for what's inside — watch the Foreword &amp; Introduction, and hear the story behind the book.
                    </p>
                </div>

                <div class="grid lg:grid-cols-2 gap-8">
                    <!-- Video 1: Foreword & Introduction -->
                    <div class="flex flex-col gap-4">
                        <div
                            ref="video1Ref"
                            class="relative aspect-video rounded-[1.5rem] overflow-hidden shadow-sm border border-slate-200 border-4 border-white/20 transition-all duration-700"
                            :class="video1Visible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-10 opacity-0 scale-95'">
                            <iframe
                                class="w-full h-full"
                                src="https://www.youtube.com/embed/I5nm0cJZUsA"
                                title="Foreword and Introduction – The Degree Delusion"
                                frameborder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerpolicy="strict-origin-when-cross-origin"
                                allowfullscreen>
                            </iframe>
                            <div class="absolute inset-0 pointer-events-none border border-white/10 rounded-[1.5rem]"></div>
                        </div>
                        <div class="text-center">
                            <p class="text-sm font-bold text-white/60  tracking-normal">Foreword &amp; Introduction</p>
                        </div>
                    </div>

                    <!-- Video 2: Story of the Book -->
                    <div class="flex flex-col gap-4">
                        <div
                            ref="video2Ref"
                            class="relative aspect-video rounded-[1.5rem] overflow-hidden shadow-sm border border-slate-200 border-4 border-white/20 transition-all duration-700 delay-150"
                            :class="video2Visible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-10 opacity-0 scale-95'">
                            <iframe
                                class="w-full h-full"
                                src="https://www.youtube.com/embed/mSvRnpVH7xE"
                                title="Story of the Book – The Degree Delusion"
                                frameborder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerpolicy="strict-origin-when-cross-origin"
                                allowfullscreen>
                            </iframe>
                            <div class="absolute inset-0 pointer-events-none border border-white/10 rounded-[1.5rem]"></div>
                        </div>
                        <div class="text-center">
                            <p class="text-sm font-bold text-white/60  tracking-normal">Story of the Book</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- TESTIMONIALS -->
        <section class="py-16 px-6 bg-[#f0f6fb]">
            <div class="max-w-6xl mx-auto">
                <div class="text-center mb-14">
                    <h2 class="text-xl lg:text-lg font-extrabold text-gray-900 mb-4" style="font-family:'Georgia',serif;">Praise from Early Readers</h2>
                    <p class="text-gray-500 max-w-xl mx-auto">See what readers are saying about <em>The Degree Delusion</em>.</p>
                </div>

                <div class="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
                    <div v-for="(t, i) in testimonials" :key="i"
                        class="break-inside-avoid bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
                        <div class="flex gap-1 mb-4">
                            <svg v-for="s in 5" :key="s" class="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                        </div>
                        <p class="text-gray-700 leading-relaxed text-sm mb-5 italic">"{{ t.quote }}"</p>
                        <div class="flex items-center gap-3">
                            <div class="w-10 h-10 rounded-full bg-[#27628C]/15 flex items-center justify-center flex-shrink-0">
                                <span class="text-[#27628C] font-bold text-sm">{{ t.name.charAt(0) }}</span>
                            </div>
                            <div>
                                <p class="font-semibold text-gray-900 text-sm">{{ t.name }}</p>
                                <p class="text-xs text-gray-400">{{ t.role }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- MEET THE AUTHOR -->
        <section class="py-16 px-6 bg-white">
            <div class="max-w-6xl mx-auto flex flex-col lg:flex-row gap-14 items-center">
                <div class="flex-shrink-0">
                    <div class="relative">
                        <div class="absolute inset-0 translate-x-3 translate-y-3 bg-[#27628C]/15 rounded-2xl blur-lg"></div>
                        <div class="relative w-64 h-72 bg-gray-200 rounded-2xl overflow-hidden shadow-sm border border-slate-200 flex items-center justify-center">
                            <div class="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex flex-col items-center justify-center">
                                <img src="@/assets/img/oluwamuyiwa-ogunkoya2.jpg" alt="" class="absolute inset-0 w-full h-full object-cover">
                            </div>
                        </div>
                    </div>
                </div>

                <div class="flex-1">
                    <span class="inline-block mb-3 text-xs font-semibold  tracking-normal text-[#27628C] bg-[#27628C]/10 px-4 py-1.5 rounded-full">Meet the Author</span>
                    <h2 class="text-xl lg:text-lg font-extrabold text-gray-900 mb-6" style="font-family:'Georgia',serif;">Oluwamuyiwa Ogunkoya</h2>
                    <div class="space-y-4 text-gray-600 leading-relaxed">
                        <p>
                            Oluwamuyiwa Ogunkoya is an author, thought leader, researcher and innovator deeply committed
                            to issues on health, education, and leadership. He is passionate about strengthening
                            systems, empowering young professionals, and turning ideas into structures that outlive
                            their founders.
                        </p>
                        <p>
                            A proven leader with multiple awards and a track record of sustainable impact, Oluwamuyiwa
                            operates by a simple philosophy: <strong class="text-gray-900">leave every place better than you met it.</strong>
                        </p>
                        <p>
                            He is the Executive Director of <a href="https://medlabconvo.com" target="_blank" class="text-[#27628C] font-medium hover:underline">MedLabConvo</a>, co-founder of <a href="https://bloodlinesfoundation.org" target="_blank" class="text-[#27628C] font-medium hover:underline">BloodLines</a>, and a Research Scientist on multiple internationally funded projects.
                        </p>
                        <p>
                            He co-engineered foundational efforts that led to the formation of the African Federation of
                            Medical Laboratory Science Students' Associations (AFMLSSA), and initiated a peer mentorship
                            program that has continued for over five years, generating hundreds of impact stories.
                            Beyond his professional work, he is an amateur chess player, with medals from local and
                            international competitions.
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <!-- ORDER CTA -->
        <section class="py-16 px-6 bg-gradient-to-br from-[#f0f6fb] to-white">
            <div class="max-w-4xl mx-auto text-center">
                <h2 class="text-xl lg:text-lg font-extrabold text-gray-900 mb-4" style="font-family:'Georgia',serif;">
                    Secure Your Copy Today</h2>
                <p class="text-gray-500 mb-3 text-lg">Available now in digital format, with hardcover and paperback editions to follow.</p>
                <p class="text-gray-400 text-sm mb-12">Available on Selar for order now.</p>

                <div class="flex flex-wrap justify-center gap-12 mb-12">
                    <div v-for="retailer in retailers" :key="retailer.name" class="flex flex-col items-center gap-1">
                        <p class="font-bold text-gray-900">{{ retailer.name }}</p>
                        <p class="text-sm text-gray-400">{{ retailer.subtitle }}</p>
                    </div>
                </div>

                <a href="https://selar.com/p/72447137r3?affiliate=v6494e7245" target="_blank" rel="noopener noreferrer"
                    class="inline-flex items-center justify-center gap-2 bg-[#27628C] hover:bg-[#1e4f73] text-white font-bold px-12 py-4 rounded-xl transition-all duration-200 shadow-sm border border-slate-200 shadow-[#27628C]/30 hover:shadow-sm border border-slate-200 hover:shadow-[#27628C]/40 hover:-translate-y-0.5 text-lg">
                    Order Now
                </a>

                <p class="text-gray-400 text-xs mt-6">
                    As an affiliate partner, MedLabConvo earns a small commission from qualifying purchases at no additional cost to you.
                </p>
            </div>
        </section>

    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'

import panelist1 from '@/assets/img/adedoyin-aronimo.jpg'
import panelist2 from '@/assets/img/ahmed-adeagbo.jpg'
import panelist3 from '@/assets/img/rispha-juma.jpg'
import panelist4 from '@/assets/img/odinaka-kingsley-obeta.jpg'

// Scroll-animation refs for videos
const video1Ref = ref(null)
const video2Ref = ref(null)
const video1Visible = ref(false)
const video2Visible = ref(false)

let observer

const setupObserver = () => {
    observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.target === video1Ref.value && entry.isIntersecting) video1Visible.value = true
                if (entry.target === video2Ref.value && entry.isIntersecting) video2Visible.value = true
            })
        },
        { threshold: 0.1, rootMargin: '50px' }
    )
    if (video1Ref.value) observer.observe(video1Ref.value)
    if (video2Ref.value) observer.observe(video2Ref.value)
}

onMounted(() => nextTick(setupObserver))
onUnmounted(() => observer?.disconnect())

const insideItems = [
    {
        text: 'Stop waiting for the system and start building your future early',
        icon: `<path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/>`,
    },
    {
        text: 'Build real-world skills alongside your degree',
        icon: `<path stroke-linecap="round" stroke-linejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m1.636-6.364l.707.707M6 20l.707-.707M17.657 6.343l-.707.707M18 20l-.707-.707M12 21a9 9 0 100-18 9 9 0 000 18z"/>`,
    },
    {
        text: 'Create leverage through relationships, reputation, and results',
        icon: `<path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/>`,
    },
    {
        text: 'Position yourself for opportunities in unstable economies and competitive job markets',
        icon: `<path stroke-linecap="round" stroke-linejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>`,
    },
    {
        text: 'Graduate prepared, confident, and equipped for the real world',
        icon: `<path stroke-linecap="round" stroke-linejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/>`,
    },
]

const panelists = [
    { image: panelist1, name: 'Adedoyin Aronimo' },
    { image: panelist2, name: 'Ahmed Adeagbo' },
    { image: panelist3, name: 'Rispha Juma' },
    { image: panelist4, name: 'Odinaka Kingsley Obeta' },
]

const testimonials = [
    {
        quote: 'The Degree Delusion is the most incredible and perfect book I have ever read about the university. It contains all that needs to be understood about the degree and the university as a whole.',
        name: 'Rispha Juma',
        role: 'Final year student',
    },
    {
        quote: 'The book is an engaging and useful read, the kind of book that makes me wish it had found me earlier, but well, like they say, it\'s better late than never.',
        name: 'Destiny Aniyom',
        role: 'Final year student',
    },
    {
        quote: 'The Degree Delusion is a well-researched, conversational, and deeply relevant guide for undergraduates and early-career professionals navigating the gap between formal education and real-world readiness. If I had access to this book as an undergraduate, I firmly believe it would have shaped my choices for the better.',
        name: 'Chubiyojo Agada',
        role: 'Director, The G.R.I.T Community',
    },
    {
        quote: 'This book breaks down a lot of concepts and will go a long way for every young adult trying to get into school and navigate their student life — it says a lot on strategy, value creation and clarity.',
        name: 'Modupe Oyinyechukwu Laja',
        role: 'Co-founder, Her Physio Movement',
    },
    {
        quote: 'It\'s a great book... People can pick up actionable items from it, not just theoretical ideas, and the fact that it is grounded in other people\'s lived reality makes it a banger.',
        name: 'Ahmed Adeagbo',
        role: 'Rhodes Scholar',
    },
    {
        quote: 'The ideas Oluwamuyiwa has captured in this book are so profound. These ideas are the untold truths about education in many parts of the developing world.',
        name: 'Odinaka Kingsley Obeta',
        role: 'Chevening Scholar',
    },
    {
        quote: 'This book is a cheat code to do life.',
        name: 'Victoire Ahoua',
        role: 'First class graduate',
    },
]

const retailers = [
    { name: 'Selar', subtitle: 'Digital format' },
]
</script>