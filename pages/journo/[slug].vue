<template>
  <main class="min-h-screen bg-white">
    <div v-if="loading" class="site-container py-20">
      <div class="mx-auto max-w-3xl space-y-4">
        <div class="site-skeleton h-6 w-32" />
        <div class="site-skeleton h-16" />
        <div class="site-skeleton h-14" />
        <div class="site-skeleton h-[24rem]" />
      </div>
    </div>

    <article v-else-if="publication">
      <!-- Hero -->
      <section class="border-b border-[#e4ebf0] bg-[#faf8f3]">
        <div class="site-container py-10 sm:py-14">
          <NuxtLink to="/journo" class="inline-flex items-center gap-2 text-[11px] font-semibold text-[#5f7482] transition hover:text-[#27628C]">
            <Icon name="lucide:arrow-left" class="h-3.5 w-3.5" /> Back to Journo
          </NuxtLink>

          <div class="mt-6 max-w-4xl">
            <div class="flex flex-wrap items-center gap-2">
              <span class="site-chip !border-[#27628C]/15 !bg-[#eef5f9] !text-[#27628C]">{{ publication.category || 'Perspective' }}</span>
              <span class="site-chip">{{ publication.readTime || 5 }} min read</span>
            </div>
            <h1 class="site-display mt-4 text-[clamp(2.4rem,5.5vw,4.6rem)]">{{ publication.title }}</h1>
            <p v-if="publication.subtitle" class="mt-4 max-w-3xl text-[1.1rem] font-medium leading-7 text-[#27628C]">{{ publication.subtitle }}</p>
            <p v-if="publication.excerpt && publication.excerpt !== publication.subtitle" class="mt-4 max-w-3xl text-[0.95rem] leading-7 text-[#5f7482]">{{ publication.excerpt }}</p>

            <div class="mt-6 flex flex-wrap items-center gap-4 border-t border-[#e4ebf0] pt-4">
              <div class="flex items-center gap-2.5">
                <span class="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-[#27628C] text-[12px] font-bold text-white">
                  <img v-if="publication.authorImage" :src="publication.authorImage" class="h-full w-full object-cover" />
                  <span v-else>{{ (publication.authors?.[0] || publication.authorName || 'M').charAt(0) }}</span>
                </span>
                <div>
                  <p class="text-[11px] font-bold text-[#0a202b]">{{ publication.authors?.join(', ') || publication.authorName || 'MedLabConvo Team' }}</p>
                  <p class="text-[9.5px] text-[#8a9ba5]">{{ formatDate(publication.publishedAt || publication.createdAt) }}</p>
                </div>
              </div>
            </div>
          </div>

          <div v-if="publication.coverImage" class="mt-8 aspect-[16/8] overflow-hidden rounded-2xl border border-[#e4ebf0]">
            <SiteMedia :src="publication.coverImage" :alt="publication.title" :label="publication.category || 'Journo'" icon="lucide:newspaper" eager />
          </div>
        </div>
      </section>

      <div class="site-container py-10 sm:py-14">
        <div class="grid gap-10 lg:grid-cols-[10rem_minmax(0,1fr)] xl:grid-cols-[10rem_minmax(0,46rem)_16rem]">
          <!-- Actions -->
          <aside class="order-2 lg:order-1">
            <div class="flex items-center gap-2 lg:sticky lg:top-28 lg:flex-col lg:items-stretch">
              <button type="button" class="flex items-center justify-center gap-2 rounded-xl border border-[#e4ebf0] bg-white px-3 py-2.5 text-[10.5px] font-semibold text-[#5f7482] transition hover:border-[#DE6129]/30 hover:text-[#DE6129]" @click="handleLike">
                <Icon name="lucide:heart" class="h-4 w-4" :class="isLiked ? 'fill-[#DE6129] text-[#DE6129]' : ''" />
                {{ localLikeCount }}
              </button>
              <button type="button" class="flex items-center justify-center gap-2 rounded-xl border border-[#e4ebf0] bg-white px-3 py-2.5 text-[10.5px] font-semibold text-[#5f7482] transition hover:border-[#27628C]/30 hover:text-[#27628C]" @click="sharePublication">
                <Icon name="lucide:share-2" class="h-4 w-4" /> Share
              </button>
            </div>
          </aside>

          <!-- Body -->
          <div class="order-1 min-w-0 lg:order-2">
            <div v-if="publication.bodyHtml" class="article-prose" v-html="publication.bodyHtml" />
            <div v-else class="article-prose">
              <template v-for="(block, index) in (publication.contentBlocks as any[])" :key="index">
                <div v-if="block.type === 'text'" v-html="block.content" />
                <figure v-else-if="block.type === 'image'" class="my-8">
                  <div class="aspect-[16/9] overflow-hidden rounded-2xl border border-[#e4ebf0]"><SiteMedia :src="block.content" :alt="block.caption || publication.title" label="Article image" icon="lucide:image" /></div>
                  <figcaption v-if="block.caption" class="mt-2 text-center text-[10px] font-medium text-[#8a9ba5]">{{ block.caption }}</figcaption>
                </figure>
                <blockquote v-else-if="block.type === 'quote'" class="my-9 border-l-2 border-[#DE6129] pl-5 text-[1.25rem] font-medium leading-8 text-[#0a202b]">
                  {{ block.content }}
                  <cite v-if="block.caption" class="mt-2 block text-[10px] font-semibold uppercase tracking-[0.1em] text-[#8a9ba5]">— {{ block.caption }}</cite>
                </blockquote>
                <div v-else-if="block.type === 'divider'" class="my-10 flex justify-center"><span class="h-1 w-10 rounded-full bg-[#27628C]/20" /></div>
              </template>
            </div>

            <!-- Comments -->
            <section class="mt-12 border-t border-[#e4ebf0] pt-8">
              <div class="flex items-center justify-between gap-3">
                <div>
                  <p class="site-eyebrow">Discourse</p>
                  <h2 class="mt-2 text-[1.35rem] font-bold tracking-[-0.03em] text-[#0a202b]">Join the conversation.</h2>
                </div>
                <span class="site-chip">{{ comments.length }} comments</span>
              </div>

              <div class="mt-5 rounded-2xl border border-[#e4ebf0] bg-[#fbfcfc] p-4">
                <div v-if="!userProfile" class="mb-3 grid gap-2 sm:grid-cols-3">
                  <input v-model="commentForm.userName" type="text" placeholder="Name" class="h-9 rounded-lg border border-[#dfe7ee] bg-white px-3 text-[11px] outline-none focus:border-[#27628C]/40" />
                  <input v-model="commentForm.userHandle" type="text" placeholder="Handle" class="h-9 rounded-lg border border-[#dfe7ee] bg-white px-3 text-[11px] outline-none focus:border-[#27628C]/40" />
                  <input v-model="commentForm.userEmail" type="email" placeholder="Email" class="h-9 rounded-lg border border-[#dfe7ee] bg-white px-3 text-[11px] outline-none focus:border-[#27628C]/40" />
                </div>
                <div v-else class="mb-3 flex items-center justify-between text-[10px] text-[#5f7482]">
                  <span>Posting as <strong class="text-[#27628C]">@{{ userProfile.userHandle }}</strong></span>
                  <button type="button" class="font-semibold text-[#8a9ba5] hover:text-[#27628C]" @click="userProfile = null">Switch</button>
                </div>
                <textarea v-model="commentForm.content" rows="3" placeholder="Share a considered perspective…" class="w-full resize-y rounded-lg border border-[#dfe7ee] bg-white px-3 py-2.5 text-[12px] leading-6 outline-none placeholder:text-[#b6c2cd] focus:border-[#27628C]/40" />
                <div class="mt-3 flex items-center justify-between gap-3">
                  <p v-if="replyTo" class="text-[10px] text-[#8a9ba5]">Replying to {{ replyTo.userName }} <button type="button" class="font-semibold text-[#27628C]" @click="cancelReply">Cancel</button></p>
                  <span v-else class="text-[9.5px] text-[#8a9ba5]">Be specific, be kind.</span>
                  <button type="button" :disabled="!commentForm.content || submittingComment" class="site-btn site-btn-primary min-h-0 px-4 py-2 text-[10.5px] disabled:opacity-40" @click="submitComment">
                    {{ submittingComment ? 'Posting…' : 'Post comment' }}
                  </button>
                </div>
              </div>

              <div v-if="comments.length" class="mt-6 space-y-4">
                <div v-for="comment in threadedComments" :key="comment._id" class="rounded-2xl border border-[#e4ebf0] bg-white p-4">
                  <div class="flex items-start gap-3">
                    <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#eef5f9] text-[10px] font-bold text-[#27628C]">{{ (comment.userName || '?').charAt(0).toUpperCase() }}</span>
                    <div class="min-w-0 flex-1">
                      <div class="flex flex-wrap items-center gap-2">
                        <p class="text-[11px] font-bold text-[#0a202b]">{{ comment.userName }}</p>
                        <span v-if="comment.userHandle" class="text-[9px] text-[#8a9ba5]">@{{ comment.userHandle }}</span>
                        <span class="ml-auto text-[9px] text-[#a4b2ba]">{{ timeAgo(comment.createdAt) }}</span>
                      </div>
                      <p class="mt-1.5 text-[11.5px] leading-6 text-[#3b5361]">{{ comment.content }}</p>
                      <div class="mt-2 flex items-center gap-4">
                        <button type="button" class="text-[9.5px] font-semibold text-[#8a9ba5] hover:text-[#27628C]" @click="handleReply(comment)">Reply</button>
                        <button type="button" class="text-[9.5px] font-semibold" :class="comment.isLikedByMe ? 'text-[#DE6129]' : 'text-[#8a9ba5] hover:text-[#DE6129]'" @click="handleCommentLike(comment)">{{ comment.likesCount || 0 }} likes</button>
                      </div>
                      <div v-if="comment.replies?.length" class="mt-3 space-y-3 border-l border-[#eef2f5] pl-3">
                        <div v-for="reply in comment.replies" :key="reply._id" class="flex gap-2.5">
                          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#f2f7fa] text-[8px] font-bold text-[#27628C]">{{ (reply.userName || '?').charAt(0) }}</span>
                          <div>
                            <p class="text-[10px] font-bold text-[#0a202b]">{{ reply.userName }} <span class="ml-1 font-normal text-[#a4b2ba]">{{ timeAgo(reply.createdAt) }}</span></p>
                            <p class="mt-0.5 text-[10.5px] leading-5 text-[#5f7482]">{{ reply.content }}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div v-else class="mt-6 rounded-2xl border border-dashed border-[#e4ebf0] bg-[#fbfcfc] px-5 py-10 text-center">
                <p class="text-[12px] font-semibold text-[#0a202b]">Start the discourse.</p>
                <p class="mt-1 text-[10.5px] text-[#8a9ba5]">A considered perspective is always welcome.</p>
              </div>
            </section>
          </div>

          <!-- Right rail -->
          <aside class="order-3 hidden xl:block">
            <div class="sticky top-28 space-y-4">
              <div class="rounded-2xl border border-[#e4ebf0] bg-[#fbfcfc] p-4">
                <p class="text-[9px] font-bold uppercase tracking-[0.14em] text-[#8a9ba5]">The author</p>
                <p class="mt-2 text-[12px] font-bold text-[#0a202b]">{{ publication.authors?.join(', ') || publication.authorName || 'MedLabConvo Team' }}</p>
                <p class="mt-1 text-[10px] leading-5 text-[#5f7482]">Writing at the intersection of laboratory science and the systems around it.</p>
              </div>
              <div class="rounded-2xl bg-[#033958] p-4 text-white">
                <p class="text-[9px] font-bold uppercase tracking-[0.14em] text-white/45">Journo</p>
                <p class="mt-2 text-[13px] font-bold leading-snug">More perspectives, delivered.</p>
                <NuxtLink to="/subscribe" class="site-btn site-btn-light mt-3 w-full min-h-0 py-2.5 text-[10.5px]">Subscribe free</NuxtLink>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </article>

    <div v-else class="site-container py-24">
      <div class="site-card mx-auto max-w-xl p-8 text-center">
        <h1 class="text-xl font-bold text-[#0a202b]">This perspective could not be found.</h1>
        <p class="mt-2 text-[12px] leading-6 text-[#5f7482]">It may have been moved or retracted.</p>
        <NuxtLink to="/journo" class="site-btn site-btn-primary mt-5">Back to Journo</NuxtLink>
      </div>
    </div>

    <ShareModal :is-open="isShareModalOpen" :url="shareUrl" :title="publication?.title" :text="publication?.excerpt" @close="isShareModalOpen = false" />
    <CommentProfileModal :is-open="isProfileModalOpen" @close="isProfileModalOpen = false" @saved="onProfileSaved" />
  </main>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import SiteMedia from '@/components/site/SiteMedia.vue'
import { convostack_api } from '@/api_factory/modules/journo'
import { useCustomToast } from '@/composables/core/useCustomToast'
import shareModal from '@/components/ShareModal.vue'
import CommentProfileModal from '@/components/CommentProfileModal.vue'
import { generateUtmUrl } from '@/utils/utm'
import { useHead } from '#imports'

const { showToast } = useCustomToast()
const route = useRoute()
const slug = route.params.slug as string

const publication = ref<any>(null)
const comments = ref([] as any[])
const loading = ref(false)
const isLiked = ref(false)
const localLikeCount = ref(0)
const submittingComment = ref(false)
const replyTo = ref<any>(null)
const isShareModalOpen = ref(false)
const isProfileModalOpen = ref(false)
const shareUrl = ref('')

const commentForm = reactive({
  userName: '',
  userHandle: '',
  userEmail: '',
  content: ''
})

const userProfile = ref<any>(null)

const threadedComments = computed(() => {
  const rootComments = comments.value.filter((c: any) => !c.parentId)
  return rootComments.map((parent: any) => ({
    ...parent,
    replies: comments.value
      .filter((c: any) => c.parentId === parent._id)
      .sort((a: any, b: any) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
  })).sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
})

onMounted(async () => {
  // Load profile from storage
  const storedProfile = localStorage.getItem('commenterProfile')
  if (storedProfile) {
    userProfile.value = JSON.parse(storedProfile)
    commentForm.userName = userProfile.value.userName
    commentForm.userHandle = userProfile.value.userHandle
    commentForm.userEmail = userProfile.value.userEmail
  }

  loading.value = true
  try {
    const res = await convostack_api.$_get_publication_by_slug(slug)
    publication.value = res.data
    localLikeCount.value = publication.value?.likesCount || 0

    // Set SEO Meta Tags
    useHead({
      title: `${publication.value.title} | MedLabConvo ConvoStack`,
      meta: [
        { name: 'description', content: publication.value.excerpt },
        { property: 'og:title', content: publication.value.title },
        { property: 'og:description', content: publication.value.excerpt },
        { property: 'og:image', content: publication.value.coverImage || '/images/medlabconvo-og-image.jpg' },
        { property: 'og:url', content: window.location.href },
        { property: 'og:type', content: 'article' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: publication.value.title },
        { name: 'twitter:description', content: publication.value.excerpt },
        { name: 'twitter:image', content: publication.value.coverImage || '/images/medlabconvo-twitter-image.jpg' }
      ]
    })

    if (publication.value?._id) {
      const commentsRes = await convostack_api.$_get_comments(publication.value._id)
      comments.value = commentsRes.data || []
    }
  } catch (e) {
    console.error('Failed to load publication:', e)
    publication.value = null
  } finally {
    loading.value = false
  }
})

const handleLike = async () => {
  if (!publication.value?._id) return
  try {
    const res = await convostack_api.$_toggle_like(publication.value._id)
    isLiked.value = res.data?.liked ?? !isLiked.value
    localLikeCount.value = res.data?.likesCount ?? localLikeCount.value
  } catch (e) {
    console.error('Like failed:', e)
  }
}

const submitComment = async () => {
  if (!userProfile.value && (!commentForm.userName || !commentForm.userEmail || !commentForm.userHandle)) {
    isProfileModalOpen.value = true
    return
  }

  if (!publication.value?._id || !commentForm.content) return
  
  submittingComment.value = true
  try {
    const res = await convostack_api.$_add_comment(publication.value._id, {
      userName: commentForm.userName,
      userHandle: commentForm.userHandle,
      userEmail: commentForm.userEmail,
      content: commentForm.content,
      parentId: replyTo.value?._id || undefined
    })
    
    // Add to list and clear content
    comments.value.unshift(res.data)
    commentForm.content = ''
    replyTo.value = null
    showToast({ title: 'Success', message: 'Insight shared successfully!', toastType: 'success' })
  } catch (e) {
    console.error('Comment failed:', e)
    showToast({ title: 'Error', message: 'Failed to share insight.', toastType: 'error' })
  } finally {
    submittingComment.value = false
  }
}

const handleCommentLike = async (comment: any) => {
  try {
    const res = await convostack_api.$_toggle_comment_like(comment._id)
    comment.likesCount = res.data?.likesCount ?? comment.likesCount
    comment.isLikedByMe = res.data?.liked
  } catch (e) {
    console.error('Comment like failed:', e)
  }
}

const handleReply = (comment: any) => {
  if (!userProfile.value) {
    isProfileModalOpen.value = true
    return
  }
  replyTo.value = comment
  // Clean the content just in case so the user can literally start typing the reply right there
  commentForm.content = ''
}

const onProfileSaved = (profile: any) => {
  userProfile.value = profile
  commentForm.userName = profile.userName
  commentForm.userHandle = profile.userHandle
  commentForm.userEmail = profile.userEmail
  showToast({ title: 'Profile Created', message: 'Welcome to the conversation!', toastType: 'success' })
}

const cancelReply = () => { replyTo.value = null }

const sharePublication = async () => {
  const baseUrl = window.location.origin + window.location.pathname
  shareUrl.value = generateUtmUrl(baseUrl, publication.value?.title || 'convostack')
  if (navigator.share) {
    try {
      await navigator.share({ 
        title: publication.value?.title || 'Perspective',
        text: publication.value?.excerpt || '',
        url: shareUrl.value 
      })
    } catch (err) { isShareModalOpen.value = true }
  } else { isShareModalOpen.value = true }
}

const formatDate = (date: string) => {
  if (!date) return ''
  return new Date(date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
}

const timeAgo = (date: string) => {
  if (!date) return ''
  const now = new Date()
  const then = new Date(date)
  const diff = Math.floor((now.getTime() - then.getTime()) / 1000)
  if (diff < 60) return 'just now'
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
  if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`
  return formatDate(date)
}

// Video helpers
const isEmbeddableVideo = (url: string) => {
  return url?.includes('youtube.com') || url?.includes('youtu.be') || url?.includes('vimeo.com')
}

const getEmbedUrl = (url: string) => {
  if (url.includes('youtube.com/watch?v=')) {
    const id = url.split('v=')[1]?.split('&')[0]
    return `https://www.youtube.com/embed/${id}`
  }
  if (url.includes('youtu.be/')) {
    const id = url.split('youtu.be/')[1]?.split('?')[0]
    return `https://www.youtube.com/embed/${id}`
  }
  if (url.includes('vimeo.com/')) {
    const id = url.split('vimeo.com/')[1]?.split('?')[0]
    return `https://player.vimeo.com/video/${id}`
  }
  return url
}
</script>
