<template>
  <main class="min-h-screen bg-white">
    <!-- Hero Section -->
    <div class="relative isolate overflow-hidden bg-[#27628C] py-24 sm:py-40">
      <div class="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]"></div>
      
      <div class="mx-auto max-w-7xl px-6 lg:px-8 relative z-10 flex flex-col items-center justify-center pt-16 text-center">
        <div class="max-w-3xl">
          <h1 class="text-2xl font-bold text-blue-200 mb-6 animate-fade-in tracking-normal">Merchandise & Knowledge</h1>
          <h2 class="text-4xl sm:text-6xl font-bold tracking-tight text-white mb-8 animate-fade-in-up">Professional Shop</h2>
          <p class="text-2xl leading-8 text-blue-50 font-medium animate-fade-in-up animation-delay-200 max-w-2xl mx-auto">
            Expertly curated resources, professional tools, and learning materials designed to support your journey in medical laboratory science.
          </p>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="container mx-auto py-24 px-6 lg:px-8">
      <div v-for="i in 3" :key="i" class="mb-24">
        <div class="h-8 w-48 bg-gray-100 rounded-full mb-12 animate-pulse mx-auto"></div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <div v-for="j in 3" :key="j" class="space-y-4">
            <div class="aspect-[3/4] bg-gray-50 rounded-2xl animate-pulse"></div>
            <div class="h-4 bg-gray-50 rounded w-3/4 animate-pulse"></div>
            <div class="h-4 bg-gray-50 rounded w-1/2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Dynamic Content -->
    <div v-else class="container mx-auto py-24 px-6 lg:px-8">
      <div v-if="Object.keys(groupedProducts).length === 0" class="text-center py-32">
        <div class="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-50 mb-6">
          <svg class="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        </div>
        <h3 class="text-lg font-bold text-gray-900 mb-2">No products found</h3>
        <p class="text-gray-500">We are currently updating our catalog. Please check back soon.</p>
      </div>

      <div v-else v-for="(products, category) in groupedProducts" :key="category" class="mb-32 last:mb-0">
        <!-- Category Header -->
        <div class="flex items-center justify-between mb-12 border-b border-gray-100 pb-8">
          <div>
            <h2 class="text-lg font-bold text-gray-900 tracking-tight ">{{ category }}</h2>
            <div class="h-1.5 w-12 bg-[#27628C] mt-2 rounded-full"></div>
          </div>
          <div class="flex items-center gap-4">
            <span class="text-sm font-bold text-gray-400 tracking-normal">{{ products.length }} items</span>
            <div class="flex items-center bg-gray-100 rounded-lg p-1">
              <button 
                @click="viewMode = 'grid'" 
                :class="['p-1.5 rounded-md transition-colors', viewMode === 'grid' ? 'bg-white shadow text-[#27628C]' : 'text-gray-500 hover:text-gray-900']"
                title="Grid View"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
              </button>
              <button 
                @click="viewMode = 'list'" 
                :class="['p-1.5 rounded-md transition-colors', viewMode === 'list' ? 'bg-white shadow text-[#27628C]' : 'text-gray-500 hover:text-gray-900']"
                title="List View"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Products Grid -->
        <div v-if="viewMode === 'grid'" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
          <div v-for="product in products" :key="product.id" class="group relative flex flex-col">
            <!-- Product Image -->
            <div class="relative aspect-[3/4] overflow-hidden rounded-[2rem] bg-gray-100 transition-all duration-500 group-hover:shadow-sm border border-slate-200 group-hover:shadow-blue-900/10 mb-8">
              <img 
                :src="product.imageUrl || 'https://placehold.co/600x800/27628C/ffffff?text=Professional+Resource'" 
                :alt="product.name"
                class="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
              >
              
              <!-- Badges -->
              <div class="absolute top-6 left-6 flex flex-col gap-2">
                <div v-if="product.isDigital" class="bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-xl text-sm font-bold text-gray-900 shadow-sm border border-white/20">
                  Digital
                </div>
                <div v-if="product.availability === 'out_of_stock'" class="bg-red-500/90 backdrop-blur-md px-4 py-1.5 rounded-xl text-sm font-bold text-white shadow-sm">
                  Sold Out
                </div>
              </div>

              <!-- Hover Action -->
              <div class="absolute inset-0 bg-[#27628C]/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center px-8 cursor-pointer" @click.prevent="triggerCheckout(product)">
                <div class="w-full bg-white text-[#27628C] py-4 rounded-2xl text-xs font-bold text-center hover:bg-blue-50 transition-all transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 shadow-sm border border-slate-200">
                  Buy Now
                </div>
              </div>
            </div>

            <!-- Product Info -->
            <div class="flex flex-col flex-1 px-2">
              <div class="flex items-center gap-2 mb-3">
                <span class="text-sm font-bold text-[#27628C] tracking-normal">{{ product.category }}</span>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-2 tracking-tight line-clamp-2 min-h-[3.5rem] group-hover:text-[#27628C] transition-colors">
                {{ product.name }}
              </h3>
              <p class="text-sm text-gray-500 font-medium mb-6 line-clamp-2">
                by {{ product.author || product.instructor || 'MedLabConvo' }}
              </p>
              
              <div class="mt-auto flex items-center justify-between">
                <div class="flex flex-col">
                  <span v-if="product.originalPrice" class="text-sm text-gray-400 line-through mb-1">
                    ₦{{ formatNumber(product.originalPrice) }}
                  </span>
                  <span class="text-xl font-black text-gray-900">
                    {{ product.price ? '₦' + formatNumber(product.price) : 'FREE' }}
                  </span>
                </div>
                
                <button 
                  @click.prevent="triggerCheckout(product)"
                  class="flex items-center gap-2 text-sm font-black text-[#27628C] hover:text-blue-800  tracking-normal transition-colors cursor-pointer"
                >
                  Purchase Securely
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Products List / Table -->
        <div v-else class="overflow-x-auto bg-white rounded-2xl shadow-sm border border-gray-100">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="bg-gray-50 border-b border-gray-100 text-xs text-gray-500  tracking-wider">
                <th class="p-4 font-bold rounded-tl-2xl w-16">Image</th>
                <th class="p-4 font-bold">Product</th>
                <th class="p-4 font-bold">Type</th>
                <th class="p-4 font-bold">Price</th>
                <th class="p-4 font-bold text-right rounded-tr-2xl">Action</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              <tr v-for="product in products" :key="product.id" class="hover:bg-blue-50/50 transition-colors group">
                <td class="p-4">
                  <div class="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden relative shadow-sm">
                    <img 
                      :src="product.imageUrl || 'https://placehold.co/100x100/27628C/ffffff?text=Asset'" 
                      :alt="product.name"
                      class="w-full h-full object-cover"
                    >
                  </div>
                </td>
                <td class="p-4">
                  <h3 class="text-sm font-bold text-gray-900 group-hover:text-[#27628C] transition-colors line-clamp-1">{{ product.name }}</h3>
                  <p class="text-xs text-gray-500 mt-1">by {{ product.author || product.instructor || 'MedLabConvo' }}</p>
                </td>
                <td class="p-4">
                  <span v-if="product.isDigital" class="inline-flex items-center px-2 py-0.5 rounded text-sm font-bold bg-blue-100 text-blue-800">
                    Digital
                  </span>
                  <span v-else class="inline-flex items-center px-2 py-0.5 rounded text-sm font-bold bg-gray-100 text-gray-800">
                    Physical
                  </span>
                  <span v-if="product.availability === 'out_of_stock'" class="inline-flex items-center px-2 py-0.5 rounded text-sm font-bold bg-red-100 text-red-800 ml-2">
                    Sold Out
                  </span>
                </td>
                <td class="p-4 whitespace-nowrap">
                  <div class="flex flex-col">
                    <span v-if="product.originalPrice" class="text-xs text-gray-400 line-through">
                      ₦{{ formatNumber(product.originalPrice) }}
                    </span>
                    <span class="text-sm font-black text-gray-900">
                      {{ product.price ? '₦' + formatNumber(product.price) : 'FREE' }}
                    </span>
                  </div>
                </td>
                <td class="p-4 text-right">
                  <button 
                    @click.prevent="triggerCheckout(product)"
                    class="bg-[#27628C] text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-[#1e4d6f] transition-colors shadow-sm inline-flex items-center gap-2"
                  >
                    Buy Now
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Become a Vendor CTA -->
    <section class="bg-gray-50 py-24 border-t border-gray-100">
      <div class="container mx-auto px-6 lg:px-8 text-center">
        <h2 class="text-lg font-bold text-gray-900 mb-6 ">Become a Vendor</h2>
        <p class="text-xl text-gray-500 font-medium mb-12 max-w-2xl mx-auto leading-relaxed">
          Are you a creator in the medical laboratory science space? Partner with us to showcase your books, courses, and medical apparel to a global community.
        </p>
        <div class="flex flex-col sm:flex-row items-center justify-center gap-6">
          <a href="/enquiries?product=Vendor+Application" class="bg-[#27628C] text-white px-10 py-5 rounded-2xl text-xs font-bold hover:bg-[#1e4d6f] transition-all shadow-sm border border-slate-200 hover:shadow-sm border border-slate-200">
            Partner With Us
          </a>
          <a href="mailto:admin@medlabconvo.com" class="bg-white text-[#27628C] border border-blue-50 px-10 py-5 rounded-2xl text-xs font-bold hover:bg-gray-50 transition-all shadow-sm">
            Email Support
          </a>
        </div>
      </div>
    </section>

    <!-- Email Prompt Modal -->
    <EmailPromptModal 
      :isOpen="isEmailPromptOpen" 
      @submit="handleEmailSubmit" 
      @cancel="isEmailPromptOpen = false" 
    />
  </main>
</template>

<script setup lang="ts">
import { useGetProducts } from "@/composables/modules/products/useGetProducts"
import { useCheckout } from "@/composables/modules/products/useCheckout"
import { useCustomToast } from "@/composables/core/useCustomToast"
import EmailPromptModal from "@/components/core/EmailPromptModal.vue"
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const { getProducts, products, loading } = useGetProducts()
const { initializePaystack, verifyPurchase } = useCheckout()
const { showToast } = useCustomToast()
const emailInput = ref('')
const selectedProduct = ref(null)
const viewMode = ref<'grid' | 'list'>('grid')
const isEmailPromptOpen = ref(false)

const route = useRoute()
const router = useRouter()

onMounted(async () => {
  await getProducts()
  
  // Handle Paystack callback redirect
  if (route.query.verify === 'true' && route.query.reference && route.query.productId && route.query.email) {
    try {
      await verifyPurchase(
        route.query.reference as string, 
        route.query.productId as string, 
        route.query.email as string
      )
      
      showToast({
        title: 'Payment Successful',
        message: `Your payment was verified. We've sent a confirmation email with further details.`,
        toastType: 'success'
      })
      
      // Clean up the URL
      router.replace({ path: '/products' })
    } catch (e) {
      showToast({
        title: 'Verification Failed',
        message: 'Payment completed but verification failed. Please contact support.',
        toastType: 'error'
      })
    }
  }
})

const triggerCheckout = (product: any) => {
  selectedProduct.value = product
  isEmailPromptOpen.value = true
}

const handleEmailSubmit = (userEmail: string) => {
  isEmailPromptOpen.value = false
  
  if (!selectedProduct.value) return

  initializePaystack(
    selectedProduct.value, 
    userEmail, 
    async (response) => {
      try {
        await verifyPurchase(response.reference, selectedProduct.value._id, userEmail)
        showToast({
          title: 'Payment Successful',
          message: `Your payment was verified. We've sent a confirmation email with further details.`,
          toastType: 'success'
        })
        const product: any = selectedProduct.value
        if (product.isDigital && product.downloadUrl) {
          setTimeout(() => {
            window.location.href = product.downloadUrl
          }, 3000)
        }
      } catch (e) {
        showToast({
          title: 'Verification Failed',
          message: 'Payment completed but verification failed. Please contact support.',
          toastType: 'error'
        })
      }
    },
    () => {
      showToast({
        title: 'Payment Incomplete',
        message: 'Payment was not completed. Please try again.',
        toastType: 'error'
      })
    }
  )
}


const groupedProducts = computed(() => {
  if (!products.value) return {}
  
  // Only show active products on the frontend
  const activeProducts = products.value.filter(p => p.status === 'active')
  
  return activeProducts.reduce((groups: any, product: any) => {
    const category = product.category || 'Other Resources'
    if (!groups[category]) {
      groups[category] = []
    }
    groups[category].push(product)
    return groups
  }, {})
})

const formatNumber = (num: number) => {
  return new Intl.NumberFormat().format(num)
}
</script>

<style scoped>
@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes fade-in-up {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in {
  animation: fade-in 1s ease-out forwards;
}

.animate-fade-in-up {
  animation: fade-in-up 0.8s ease-out forwards;
}

.animation-delay-200 {
  animation-delay: 200ms;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>