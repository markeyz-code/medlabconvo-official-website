<template>
    <section class="relative py-16 lg:px-20 bg-gradient-to-b from-slate-50 via-blue-50 to-white overflow-hidden">
        <div class="max-w-7xl mx-auto px-6 lg:px-8">
            <div class="text-center mb-10">
                <h2 class="text-5xl sm:text-7xl lg:text-8xl font-bold text-[#27628C] mb-6">
                    Our Past Programs
                </h2>
                <p class="text-2xl text-gray-600 max-w-2xl mx-auto">
                    Take a look at some of the impactful programs we’ve organized over the years.
                </p>
            </div>
            <div class="relative" @mouseenter="isPaused = true" @mouseleave="isPaused = false">
                <div ref="carousel" class="flex gap-6 overflow-x-hidden scroll-smooth snap-x snap-mandatory pb-2">
                    <div v-for="(flyer, idx) in flyers" :key="idx"
                        class="carousel-card flex-shrink-0 snap-start bg-white rounded-2xl shadow-md hover:shadow-sm border border-slate-200 transition-all duration-500 overflow-hidden"
                        role="group">
                        <div class="card-image-wrapper">
                            <img :src="flyer.image" :alt="flyer.title" class="w-full h-full object-cover block"
                                loading="lazy" />
                        </div>
                        <div class="p-2">
                            <h3 class="text-lg font-semibold text-[#27628C] mb-2">
                                {{ flyer.title }}
                            </h3>
                            <p class="text-sm text-gray-600">{{ flyer.date }}</p>
                        </div>
                    </div>
                </div>

                <!-- Arrows -->
                <button @click="prevPage"
                    class="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white text-[#27628C] p-3 rounded-full shadow hover:bg-blue-50 transition z-20"
                    aria-label="Previous slide">
                    ‹
                </button>

                <button @click="nextPage"
                    class="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white text-[#27628C] p-3 rounded-full shadow hover:bg-blue-50 transition z-20"
                    aria-label="Next slide">
                    ›
                </button>

                <!-- Dots -->
                <div class="flex items-center justify-center gap-2 mt-6">
                    <button v-for="(_, i) in totalPages" :key="i" @click="goToPage(i)" :class="[
                        'w-3 h-3 rounded-full transition-all duration-300',
                        activePage === i
                            ? 'bg-[#27628C] scale-110'
                            : 'bg-gray-400 opacity-50 hover:opacity-80'
                    ]" />
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch, nextTick } from 'vue'
import conference from '@/assets/img/conference.jpeg'
import FACP from '@/assets/img/forging-a-career-path.jpg'
import FL from '@/assets/img/financial-literacy.jpeg'
import scholarship from '@/assets/img/scholarship.jpeg'

/* ----- Config ----- */
const AUTOPLAY = true
const INTERVAL = 3500


const carousel = ref<HTMLElement | null>(null)
const flyers = ref([
    { title: '21st Century Biomedical Science Conference', date: '2025', image: conference },
    { title: 'Forging a Career Path Series', date: '2025', image: FACP },
    { title: 'Financial Literacy', date: '2025', image: FL },
    { title: 'Scholarship Application Masterclass', date: '2025', image: scholarship },
])

const activePage = ref(0)
const cardsPerView = ref(1)
const autoplayTimer = ref<number | null>(null)
const isPaused = ref(false)

const totalPages = computed(() =>
    Math.ceil(flyers.value.length / cardsPerView.value)
)

function updateCardsPerView() {
    const width = window.innerWidth
    if (width >= 1024) cardsPerView.value = 2
    else if (width >= 768) cardsPerView.value = 2
    else cardsPerView.value = 1
}

function scrollToPage(page: number) {
    if (!carousel.value) return
    const containerWidth = carousel.value.clientWidth
    const scrollLeft = containerWidth * page
    carousel.value.scrollTo({ left: scrollLeft, behavior: 'smooth' })
    activePage.value = page
}

function nextPage() {
    activePage.value = (activePage.value + 1) % totalPages.value
    scrollToPage(activePage.value)
}

function prevPage() {
    activePage.value =
        (activePage.value - 1 + totalPages.value) % totalPages.value
    scrollToPage(activePage.value)
}

function goToPage(page: number) {
    scrollToPage(page)
}

function startAutoplay() {
    if (!AUTOPLAY) return
    clearAutoplay()
    autoplayTimer.value = window.setInterval(() => {
        if (!isPaused.value) nextPage()
    }, INTERVAL)
}

function clearAutoplay() {
    if (autoplayTimer.value !== null) {
        clearInterval(autoplayTimer.value)
        autoplayTimer.value = null
    }
}

onMounted(() => {
    updateCardsPerView()
    window.addEventListener('resize', updateCardsPerView)
    startAutoplay()
})

onBeforeUnmount(() => {
    clearAutoplay()
    window.removeEventListener('resize', updateCardsPerView)
})

</script>

<style scoped>
.hide-scrollbar::-webkit-scrollbar {
    display: none;
}

.hide-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
}

.carousel-card {
    display: flex;
    flex-direction: column;
    width: 50%;
    height: 400px;
    min-height: 400px;
    max-height: 400px;
}

.card-image-wrapper {
    height: 75%;
    width: 100%;
    overflow: hidden;
    background: #e6f0f8;
}

/* tiny dot styling */
button[aria-label^="Go to slide"] {
    background: #27628C;
}

.carousel-card:focus-within,
button:focus {
    outline: 3px solid rgba(39, 98, 140, 0.15);
    outline-offset: 3px;
}

@media (min-width: 1024px) {
    .carousel-card {
        height: 400px;
        min-height: 400px;
        max-height: 400px;
    }
}

.carousel-card {
    width: 100%;
}

@media (min-width: 768px) {
    .carousel-card {
        width: 47%;
    }
}

@media (min-width: 1024px) {
    .carousel-card {
        width: 49%;
    }
}
</style>