<script setup lang="ts">
import { useGetProducts } from '@/composables/modules/products/useGetProducts'
import { useCheckout } from '@/composables/modules/products/useCheckout'
import { useCustomToast } from '@/composables/core/useCustomToast'
import EmailPromptModal from '@/components/core/EmailPromptModal.vue'
import SiteHero from '@/components/site/SiteHero.vue'
import SiteMedia from '@/components/site/SiteMedia.vue'
import SiteSectionHeader from '@/components/site/SiteSectionHeader.vue'
import SiteCta from '@/components/site/SiteCta.vue'

const { getProducts, products, loading } = useGetProducts()
const { initializePaystack, verifyPurchase } = useCheckout()
const { showToast } = useCustomToast()

const selectedProduct = ref<any>(null)
const isEmailPromptOpen = ref(false)
const route = useRoute()
const router = useRouter()

onMounted(async () => {
  await getProducts()
  if (route.query.verify === 'true' && route.query.reference && route.query.productId && route.query.email) {
    try {
      await verifyPurchase(route.query.reference as string, route.query.productId as string, route.query.email as string)
      showToast({ title: 'Payment successful', message: 'Your payment was verified. A confirmation email is on its way.', toastType: 'success' })
      router.replace({ path: '/products' })
    } catch {
      showToast({ title: 'Verification failed', message: 'Payment completed but verification failed. Please contact support.', toastType: 'error' })
    }
  }
})

const getCheckoutUrl = (product: any): string | null => {
  if (!product) return null
  const candidate = product.downloadUrl || product.buyUrl || product.purchaseUrl || product.selarUrl
  if (candidate && typeof candidate === 'string') {
    const trimmed = candidate.trim()
    if (trimmed) {
      if (/^https?:\/\//i.test(trimmed)) return trimmed
      if (trimmed.includes('.')) return `https://${trimmed}`
      return trimmed
    }
  }
  if (product.previewUrl && typeof product.previewUrl === 'string') {
    const trimmed = product.previewUrl.trim()
    if (trimmed && (trimmed.includes('selar.') || trimmed.includes('paystack.') || trimmed.includes('flutterwave.'))) {
      if (/^https?:\/\//i.test(trimmed)) return trimmed
      if (trimmed.includes('.')) return `https://${trimmed}`
      return trimmed
    }
  }
  return null
}

const triggerCheckout = (product: any) => {
  const checkoutUrl = getCheckoutUrl(product)
  if (checkoutUrl) {
    const newTab = window.open(checkoutUrl, '_blank', 'noopener,noreferrer')
    if (!newTab || newTab.closed || typeof newTab.closed === 'undefined') window.location.href = checkoutUrl
    return
  }
  selectedProduct.value = product
  isEmailPromptOpen.value = true
}

const handleEmailSubmit = (userEmail: string) => {
  isEmailPromptOpen.value = false
  if (!selectedProduct.value) return
  initializePaystack(selectedProduct.value, userEmail, async (response: any) => {
    try {
      await verifyPurchase(response.reference, selectedProduct.value._id, userEmail)
      showToast({ title: 'Payment successful', message: 'Your payment was verified. A confirmation email is on its way.', toastType: 'success' })
      const product: any = selectedProduct.value
      if (product.isDigital && product.downloadUrl) {
        setTimeout(() => { window.location.href = product.downloadUrl }, 3000)
      }
    } catch {
      showToast({ title: 'Verification failed', message: 'Payment completed but verification failed. Please contact support.', toastType: 'error' })
    }
  }, () => {
    showToast({ title: 'Payment incomplete', message: 'Payment was not completed. Please try again.', toastType: 'error' })
  })
}

const groupedProducts = computed(() => {
  if (!products.value) return {}
  const active = products.value.filter((p: any) => p.status === 'active')
  return active.reduce((groups: any, product: any) => {
    const category = product.category || 'Other resources'
    if (!groups[category]) groups[category] = []
    groups[category].push(product)
    return groups
  }, {})
})

const totalProducts = computed(() => Object.values(groupedProducts.value).reduce((sum: number, items: any) => sum + items.length, 0))
const formatNumber = (num: number) => new Intl.NumberFormat().format(num)

useHead({
  title: 'The shop | MedLabConvo',
  meta: [{ name: 'description', content: 'Books, courses and digital tools for medical laboratory professionals.' }],
})
</script>

<template>
  <main class="bg-white">
    <SiteHero
      eyebrow="The MedLabConvo shop"
      title="Tools for the work. Ideas for the next move."
      description="Field-tested books, courses and digital resources made for laboratory professionals who want to think sharper and move further."
      primary-label="Browse the shop"
      primary-to="#shop"
      secondary-label="Become a vendor"
      secondary-to="/enquiries?product=Vendor+Application"
      theme="light"
    >
      <template #visual>
        <div class="relative mx-auto max-w-md">
          <div class="grid grid-cols-2 gap-3">
            <div class="site-card overflow-hidden p-2">
              <div class="aspect-[3/4] overflow-hidden rounded-xl"><SiteMedia :src="Object.values(groupedProducts)[0]?.[0]?.imageUrl" label="Digital book" icon="lucide:book-open" /></div>
            </div>
            <div class="mt-8 site-card overflow-hidden p-2">
              <div class="aspect-[3/4] overflow-hidden rounded-xl"><SiteMedia :src="Object.values(groupedProducts)[1]?.[0]?.imageUrl" label="Course" icon="lucide:play-circle" /></div>
            </div>
          </div>
          <div class="absolute -bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full border border-[#e4ebf0] bg-white px-4 py-2 shadow-lg">
            <span class="flex h-6 w-6 items-center justify-center rounded-full bg-[#eef5f9] text-[#27628C]"><Icon name="lucide:shield-check" class="h-3.5 w-3.5" /></span>
            <span class="text-[10px] font-bold uppercase tracking-[0.1em] text-[#5f7482]">Secure checkout</span>
          </div>
        </div>
      </template>
      <template #meta>
        <div class="flex flex-wrap items-center gap-x-6 gap-y-3 text-[10px] font-semibold uppercase tracking-[0.1em] text-[#8a9ba5]">
          <span class="inline-flex items-center gap-1.5"><Icon name="lucide:download" class="h-3.5 w-3.5 text-[#27628C]" /> Instant digital access</span>
          <span class="inline-flex items-center gap-1.5"><Icon name="lucide:lock" class="h-3.5 w-3.5 text-[#27628C]" /> Secure payments</span>
          <span class="inline-flex items-center gap-1.5"><Icon name="lucide:badge-check" class="h-3.5 w-3.5 text-[#27628C]" /> Built by practitioners</span>
        </div>
      </template>
    </SiteHero>

    <section id="shop" class="site-section">
      <div class="site-container">
        <SiteSectionHeader
          eyebrow="The catalogue"
          :title="totalProducts ? 'Made for the realities of the laboratory.' : 'The shop is being restocked.'"
          :description="totalProducts ? `${totalProducts} resources across books, courses and professional toolkits.` : 'We are updating our catalogue. Check back soon for new resources.'"
          link="/resources"
          link-label="Free resources"
        />

        <div v-if="loading" class="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <div v-for="i in 6" :key="i" class="site-skeleton h-[28rem]" />
        </div>

        <div v-else-if="totalProducts" class="mt-8 space-y-12">
          <section v-for="(items, category) in groupedProducts" :key="category">
            <div class="flex items-end justify-between border-b border-[#e4ebf0] pb-3">
              <div>
                <h2 class="text-[1.35rem] font-bold tracking-[-0.03em] text-[#0a202b]">{{ category }}</h2>
                <p class="mt-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-[#8a9ba5]">{{ (items as any[]).length }} resource{{ (items as any[]).length === 1 ? '' : 's' }}</p>
              </div>
            </div>

            <div class="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              <article v-for="product in items" :key="product._id || product.id" class="site-card site-card-hover group flex h-full flex-col overflow-hidden">
                <button type="button" class="relative block aspect-[4/5] overflow-hidden text-left" @click="triggerCheckout(product)">
                  <SiteMedia :src="product.imageUrl" :alt="product.name" :label="product.category || 'MedLabConvo shop'" icon="lucide:shopping-bag" />
                  <div class="absolute inset-0 bg-gradient-to-t from-[#031d29]/60 via-transparent to-transparent opacity-70" />
                  <div class="absolute left-4 top-4 flex flex-wrap gap-2">
                    <span v-if="product.isDigital" class="rounded-full bg-white/95 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.12em] text-[#27628C]">Digital</span>
                    <span v-if="product.availability === 'out_of_stock'" class="rounded-full bg-[#DE6129] px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.12em] text-white">Sold out</span>
                  </div>
                  <div class="absolute inset-x-0 bottom-0 flex items-center justify-between p-4">
                    <span class="text-[10px] font-semibold uppercase tracking-[0.12em] text-white/75">{{ product.category }}</span>
                    <span class="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#27628C]"><Icon name="lucide:arrow-up-right" class="h-4 w-4" /></span>
                  </div>
                </button>

                <div class="flex flex-1 flex-col p-5">
                  <h3 class="text-[1.02rem] font-bold leading-snug tracking-[-0.02em] text-[#0a202b]">{{ product.name }}</h3>
                  <p class="mt-1 text-[11px] text-[#8a9ba5]">by {{ product.author || product.instructor || 'MedLabConvo' }}</p>
                  <div class="mt-auto flex items-end justify-between gap-3 border-t border-[#eef2f5] pt-4">
                    <div>
                      <p v-if="product.originalPrice" class="text-[10px] text-[#a4b2ba] line-through">₦{{ formatNumber(product.originalPrice) }}</p>
                      <p class="text-[1.15rem] font-bold tracking-[-0.03em] text-[#0a202b]">{{ product.price ? `₦${formatNumber(product.price)}` : 'Free' }}</p>
                    </div>
                    <button type="button" class="site-btn site-btn-primary min-h-0 px-3.5 py-2.5 text-[10.5px]" @click="triggerCheckout(product)">
                      {{ product.availability === 'out_of_stock' ? 'Sold out' : 'Buy securely' }}
                    </button>
                  </div>
                </div>
              </article>
            </div>
          </section>
        </div>

        <div v-else class="site-card mt-8 flex flex-col items-center justify-center px-6 py-16 text-center">
          <span class="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eef5f9] text-[#27628C]"><Icon name="lucide:shopping-bag" class="h-6 w-6" /></span>
          <h3 class="mt-4 text-lg font-bold text-[#0a202b]">The shelves are being restocked</h3>
          <p class="mt-1 max-w-sm text-[12px] leading-6 text-[#5f7482]">We are updating the catalogue. In the meantime, explore our free resources.</p>
          <NuxtLink to="/resources" class="site-btn site-btn-primary mt-5">Browse resources</NuxtLink>
        </div>
      </div>
    </section>

    <section class="bg-[#f7f9f8] py-12 sm:py-16">
      <div class="site-container">
        <div class="grid gap-6 rounded-[1.5rem] border border-[#e4ebf0] bg-white p-6 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p class="site-eyebrow">For creators</p>
            <h2 class="mt-2 text-[1.5rem] font-bold tracking-[-0.03em] text-[#0a202b]">Build with MedLabConvo.</h2>
            <p class="mt-2 max-w-xl text-[12.5px] leading-6 text-[#5f7482]">If you make books, courses or tools for laboratory professionals, we would love to help you reach the right people.</p>
          </div>
          <div class="flex flex-col gap-2 sm:flex-row">
            <NuxtLink to="/enquiries?product=Vendor+Application" class="site-btn site-btn-primary">Partner with us</NuxtLink>
            <a href="mailto:admin@medlabconvo.com" class="site-btn site-btn-ghost">Email support</a>
          </div>
        </div>
      </div>
    </section>

    <EmailPromptModal :isOpen="isEmailPromptOpen" @submit="handleEmailSubmit" @cancel="isEmailPromptOpen = false" />
    <SiteCta
      eyebrow="Keep learning"
      title="The best resource is a sharper question."
      description="Explore free research, explainers and professional toolkits in the MedLabConvo knowledge hub."
      primary-label="Open resources"
      primary-to="/resources"
      secondary-label="Read Journo"
      secondary-to="/journo"
    />
  </main>
</template>
