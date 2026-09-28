<template>
  <div class="min-h-screen bg-white">
    <!-- Loading -->
    <div v-if="loading" class="flex flex-col items-center justify-center py-40 gap-6">
      <div class="w-12 h-12 border-4 border-gray-100 border-t-[#27628C] rounded-full animate-spin"></div>
      <p class="text-sm font-bold text-gray-400">Loading Perspective...</p>
    </div>

    <!-- Article -->
    <article v-else-if="publication" class="pt-24 pb-32">
      <!-- Premium Hero Section -->
      <div class="max-w-7xl mx-auto px-6 mb-16 md:mb-24">
        <div class="flex flex-col items-center text-center mb-12 animate-fade-in">
          <div class="flex items-center gap-4 mb-8">
            <span class="bg-[#27628C] text-white px-5 py-2 rounded-full text-sm font-bold shadow-sm border border-slate-200 capitalize tracking-normal">
              {{ publication.category || 'Opinion' }}
            </span>
            <span class="text-gray-400 text-sm font-bold">
              {{ publication.readTime || 5 }} min read
            </span>
          </div>
          <h1 class="text-4xl md:text-5xl font-bold text-gray-900 leading-[1.05] tracking-normal mb-10 max-w-5xl">
            {{ publication.title }}
          </h1>
          <p v-if="publication.subtitle" class="text-xl md:text-lg text-[#27628C] font-bold leading-tight mb-8 max-w-4xl italic">
            {{ publication.subtitle }}
          </p>
          <p class="text-xl md:text-xl text-gray-500 font-medium leading-relaxed max-w-3xl">
            {{ publication.excerpt }}
          </p>
        </div>

        <!-- Immersive Cover Image -->
        <div v-if="publication.coverImage" class="relative group rounded-[3rem] overflow-hidden shadow-sm border border-slate-200 bg-gray-50 aspect-[21/9] md:aspect-[2.4/1]">
           <img 
            :src="publication.coverImage" 
            :alt="publication.title" 
            class="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105" 
          />
        </div>
      </div>

      <!-- Main Layout: Content + Sticky Sidebar -->
      <div class="max-w-7xl mx-auto px-6">
        <div class="flex flex-col lg:flex-row gap-16 lg:gap-24 relative">
          
          <!-- Sticky Sidebar Left (Desktop) -->
          <aside class="hidden lg:block w-64 flex-shrink-0">
            <div class="sticky top-32 space-y-12">
              <!-- Author Profile -->
              <div class="space-y-6">
                <div class="w-20 h-20 rounded-[2.5rem] bg-gray-50 flex items-center justify-center text-[#27628C] border border-gray-100 overflow-hidden shadow-sm">
                  <img v-if="publication.authorImage" :src="publication.authorImage" class="w-full h-full object-cover" />
                  <span v-else class="text-xl font-bold">{{ (publication.authorName || 'M').charAt(0) }}</span>
                </div>
                <div>
                  <p class="text-sm font-bold text-[#27628C] mb-2  tracking-normal">Author</p>
                  <h3 class="text-xl font-bold text-gray-900 leading-tight mb-2">
                    {{ publication.authors?.join(', ') || publication.authorName || 'MedLabConvo Team' }}
                  </h3>
                  <p class="text-sm font-medium text-gray-500">{{ formatDate(publication.publishedAt || publication.createdAt) }}</p>
                </div>
              </div>

              <!-- High-Level Actions -->
              <div class="flex flex-col gap-4">
                <button @click="handleLike" :class="['flex items-center justify-center gap-3 px-8 py-4 rounded-2xl transition-all font-bold text-sm', isLiked ? 'bg-red-50 text-red-600' : 'bg-gray-50 text-gray-900 hover:bg-gray-100 shadow-sm border border-gray-100']">
                  <svg class="w-5 h-5" :fill="isLiked ? 'currentColor' : 'none'" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
                  {{ localLikeCount }} Likes
                </button>
                <button @click="sharePublication" class="flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-gray-900 text-white font-bold text-sm shadow-sm border border-slate-200 hover:bg-black transition-all">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/></svg>
                  Share Story
                </button>
              </div>
            </div>
          </aside>

          <!-- Main Article Body -->
          <div class="flex-1 max-w-3xl">
            <!-- Mobile Author Info (Hidden on Desktop) -->
            <div class="lg:hidden flex items-center gap-6 mb-12 pb-12 border-b border-gray-100">
               <div class="w-16 h-16 rounded-3xl bg-gray-50 flex items-center justify-center text-[#27628C] border border-gray-100 overflow-hidden shadow-sm">
                <img v-if="publication.authorImage" :src="publication.authorImage" class="w-full h-full object-cover" />
                <span v-else class="text-lg font-bold">{{ (publication.authorName || 'M').charAt(0) }}</span>
              </div>
              <div>
                <h3 class="text-lg font-bold text-gray-900 leading-tight">
                  {{ publication.authors?.join(', ') || publication.authorName || 'MedLabConvo Team' }}
                </h3>
                <p class="text-sm font-medium text-gray-500 mt-1">{{ formatDate(publication.publishedAt || publication.createdAt) }}</p>
              </div>
            </div>

            <!-- Content Blocks Renderer -->
            <div class="space-y-12 mb-32">
              <!-- Substack High-Fidelity HTML Rendering -->
              <div v-if="publication.bodyHtml" class="substack-content prose prose-lg sm:prose-xl prose-slate max-w-none 
                prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-gray-900 
                prose-p:text-gray-500 prose-p:leading-8 prose-p:font-medium
                prose-strong:text-gray-900 prose-a:text-[#27628C] prose-a:no-underline hover:prose-a:underline
                prose-li:text-gray-500 prose-li:font-medium" v-html="publication.bodyHtml"></div>

              <!-- Standard Block-based Rendering Fallback -->
              <template v-else>
                <div v-for="(block, index) in (publication.contentBlocks as any[])" :key="index" class="animate-fade-in-up" :style="{ animationDelay: `${(index as number) * 100}ms` }">
                  <!-- Text Block -->
                  <div v-if="block.type === 'text'" class="prose prose-lg sm:prose-xl prose-slate max-w-none 
                    prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-gray-900 
                    prose-p:text-gray-500 prose-p:leading-8 prose-p:font-medium
                    prose-strong:text-gray-900 prose-a:text-[#27628C] prose-a:no-underline hover:prose-a:underline
                    prose-li:text-gray-500 prose-li:font-medium" v-html="block.content"></div>

                  <!-- Image Block -->
                  <figure v-if="block.type === 'image'" class="my-16">
                    <div class="overflow-hidden rounded-[2.5rem] bg-gray-50 border border-gray-100 shadow-sm group">
                      <img :src="block.content" :alt="block.caption || 'Publication image'" class="w-full h-auto transition-transform duration-700 group-hover:scale-105" />
                    </div>
                    <figcaption v-if="block.caption" class="mt-6 text-center text-sm font-bold text-gray-400 capitalize">{{ block.caption }}</figcaption>
                  </figure>

                  <!-- Quote Block -->
                  <blockquote v-if="block.type === 'quote'" class="my-16 py-12 px-8 border-y border-gray-100 relative text-center">
                    <div class="absolute -top-6 left-1/2 -translate-x-1/2 bg-white px-6">
                      <svg class="w-12 h-12 text-[#27628C]/20" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H16.017C14.9124 8 14.017 7.10457 14.017 6V3L14.017 3H21.017V15C21.017 18.3137 18.3307 21 15.017 21H14.017ZM3.017 21L3.017 18C3.017 16.8954 3.91243 16 5.017 16H8.017C8.56928 16 9.017 15.5523 9.017 15V9C9.017 8.44772 8.56928 8 8.017 8H5.017C3.91243 8 3.017 7.10457 3.017 6V3L3.017 3H10.017V15C10.017 18.3137 7.33071 21 4.017 21H3.017Z"/></svg>
                    </div>
                    <p class="text-4xl md:text-5xl text-gray-900 leading-tight font-medium font-serif">{{ block.content }}</p>
                    <cite v-if="block.caption" class="block mt-8 text-sm font-bold text-[#27628C]  tracking-normal not-italic">— {{ block.caption }}</cite>
                  </blockquote>

                  <!-- Divider Block -->
                  <div v-if="block.type === 'divider'" class="my-20 flex items-center justify-center">
                    <div class="h-1.5 w-12 bg-[#27628C]/20 rounded-full"></div>
                  </div>
                </div>
              </template>
            </div>

            <!-- Discourse Section integrated into footer flow -->
          </div>
        </div>
      </div>      <!-- Discourse Section -->
      <section class="max-w-3xl mx-auto px-6 py-32 border-t border-gray-100 mt-20">
        <div class="mb-16 text-center lg:text-left">
          <h2 class="text-xl md:text-lg font-bold text-gray-900 tracking-normal flex items-center justify-center lg:justify-start gap-4">
            Discourse
            <span class="text-xl font-bold text-[#27628C] bg-blue-50 px-4 py-1.5 rounded-full">{{ comments.length }}</span>
          </h2>
          <p class="text-lg text-gray-400 font-medium mt-4">Join the clinical conversation and share your perspective.</p>
        </div>

        <!-- Modern Threaded Input Area -->
        <div class="mb-20">
          <div class="flex items-start gap-5">
            <div class="hidden sm:flex w-12 h-12 rounded-[1.25rem] bg-gradient-to-br from-[#27628C] to-[#1a425f] items-center justify-center text-white font-black text-sm flex-shrink-0 shadow-sm border border-slate-200 overflow-hidden">
              {{ userProfile?.userName ? userProfile.userName.charAt(0).toUpperCase() : (commentForm.userName ? commentForm.userName.charAt(0).toUpperCase() : 'U') }}
            </div>
            <div class="flex-1 bg-white border border-gray-100 rounded-[2.5rem] focus-within:ring-[12px] focus-within:ring-blue-50/50 focus-within:border-[#27628C]/30 transition-all duration-500 overflow-hidden shadow-sm border border-slate-200 shadow-blue-900/5">
              <div v-if="!userProfile" class="grid grid-cols-2 gap-0 border-b border-gray-50">
                <input v-model="commentForm.userName" type="text" class="w-full px-6 py-4 text-sm font-bold text-gray-900 border-r border-gray-50 focus:outline-none placeholder:text-gray-300 bg-transparent" />
                <input v-model="commentForm.userEmail" type="email" class="w-full px-6 py-4 text-sm font-bold text-gray-900 focus:outline-none placeholder:text-gray-300 bg-transparent" />
              </div>
              <div v-else class="px-6 py-3 bg-gray-50/50 border-b border-gray-50 flex items-center justify-between">
                <span class="text-sm font-bold text-[#27628C]  tracking-normal">Posting as @{{ userProfile.userHandle }}</span>
                <button @click="userProfile = null" class="text-sm font-bold text-gray-400 hover:text-red-500 transition-colors">Switch Profile</button>
              </div>
              <textarea
                v-model="commentForm.content"
                rows="3"

                class="w-full px-6 py-6 text-base font-medium text-gray-700 border-none focus:outline-none placeholder:text-gray-300 resize-none bg-transparent"
                @focus="replyTo = null"
              ></textarea>
              <div class="bg-gray-50/50 px-6 py-4 flex justify-between items-center border-t border-gray-50">
                <p class="text-sm font-bold text-gray-400">Share insights responsibly.</p>
                <button
                  @click="submitComment"
                  :disabled="(!userProfile && !commentForm.userName) || !commentForm.content || submittingComment"
                  class="bg-[#27628C] text-white px-8 py-3 rounded-2xl text-sm font-bold hover:bg-black transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-sm border border-slate-200 active:scale-95"
                >
                  {{ submittingComment ? 'Transmitting...' : 'Post Insight' }}
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Professional Discussion Stream -->
        <div v-if="comments.length > 0" class="space-y-12">
          <div v-for="comment in threadedComments" :key="comment._id" class="animate-fade-in-up">
            
            <!-- Root Comment Card -->
            <div class="flex gap-5 group">
              <div class="flex flex-col items-center">
                <div class="w-12 h-12 rounded-[1.5rem] bg-slate-50 flex items-center justify-center text-[#27628C] font-black text-sm flex-shrink-0 z-10 border-2 border-white shadow-md overflow-hidden">
                  <img v-if="comment.photoUrl" :src="comment.photoUrl" class="w-full h-full object-cover" />
                  <span v-else>{{ (comment.userName || '?').charAt(0).toUpperCase() }}</span>
                </div>
                <!-- Continuous Thread Line -->
                <div v-if="comment.replies?.length || replyTo?._id === comment._id" class="w-[2px] h-full bg-slate-100 my-2 group-hover:bg-[#27628C]/10 transition-colors"></div>
              </div>
              
              <div class="flex-1 pb-6">
                <div class="flex items-center gap-3 mb-2">
                  <h4 class="text-sm font-bold text-gray-900 capitalize">{{ comment.userName }}</h4>
                  <span v-if="comment.userHandle" class="text-sm font-bold text-[#27628C] bg-[#27628C]/5 px-2 py-0.5 rounded-full">@{{ comment.userHandle }}</span>
                  <span class="text-sm font-bold text-gray-400 ml-auto">{{ timeAgo(comment.createdAt) }}</span>
                </div>
                <p class="text-gray-600 text-base leading-relaxed mb-4 font-medium">{{ comment.content }}</p>
                
                <div class="flex items-center gap-8">
                  <button @click="handleReply(comment)" class="text-sm font-bold text-gray-400 hover:text-[#27628C] transition-all flex items-center gap-2">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"/></svg>
                    Reply Thread
                  </button>
                  <button @click="handleCommentLike(comment)" :class="['text-sm font-bold transition-all flex items-center gap-2', comment.isLikedByMe ? 'text-red-500' : 'text-gray-400 hover:text-red-500']">
                    <svg class="w-4 h-4" :fill="comment.isLikedByMe ? 'currentColor' : 'none'" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
                    {{ comment.likesCount || 0 }} Applause
                  </button>
                </div>
              </div>
            </div>

            <!-- Inline Reply Area (Integrated Design) -->
            <div v-if="replyTo?._id === comment._id" class="flex gap-5 mt-4 mb-8 ml-16 animate-fade-in-up">
              <div class="flex-1 bg-white border border-[#27628C]/20 rounded-[2rem] focus-within:ring-[8px] focus-within:ring-blue-50 transition-all overflow-hidden shadow-sm border border-slate-200">
                <textarea v-model="commentForm.content" rows="2" class="w-full px-6 py-4 text-sm font-medium text-gray-700 border-none focus:outline-none placeholder:text-gray-300 bg-transparent resize-none"></textarea>
                <div class="px-6 py-3 flex justify-between items-center border-t border-gray-50 bg-gray-50/30">
                  <span class="text-[9px] font-bold text-gray-400 ">Reply Mode</span>
                  <div class="flex gap-3">
                    <button @click="cancelReply" class="text-sm font-bold text-gray-400 hover:text-gray-900 px-4 py-2 rounded-xl hover:bg-gray-100 transition-all">Dismiss</button>
                    <button @click="submitComment" :disabled="!commentForm.content" class="bg-gray-900 text-white px-5 py-2 rounded-xl text-sm font-bold hover:bg-black disabled:opacity-30 transition-all shadow-sm border border-slate-100">Post Reply</button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Threaded Replies (Professional Indent) -->
            <div v-if="comment.replies?.length" class="ml-[1.5rem] pl-[1.5rem] border-l-[2px] border-slate-50 flex flex-col gap-8 pt-4">
              <div v-for="reply in comment.replies" :key="reply._id" class="flex gap-4 group/reply">
                <div class="w-10 h-10 rounded-[1.25rem] bg-white flex items-center justify-center text-[#27628C] font-bold text-xs flex-shrink-0 border border-slate-100 shadow-sm group-hover/reply:border-[#27628C]/30 transition-all overflow-hidden">
                  <img v-if="reply.photoUrl" :src="reply.photoUrl" class="w-full h-full object-cover" />
                  <span v-else>{{ (reply.userName || '?').charAt(0).toUpperCase() }}</span>
                </div>
                <div class="flex-1">
                  <div class="flex items-center gap-3 mb-1.5">
                    <h4 class="text-[13px] font-bold text-gray-900 capitalize">{{ reply.userName }}</h4>
                    <span v-if="reply.userHandle" class="text-[9px] font-bold text-[#27628C] bg-[#27628C]/5 px-1.5 py-0.5 rounded-full">@{{ reply.userHandle }}</span>
                    <span class="text-sm font-bold text-gray-400 ml-auto">{{ timeAgo(reply.createdAt) }}</span>
                  </div>
                  <p class="text-gray-600 text-[14px] leading-relaxed font-medium mb-3">{{ reply.content }}</p>
                  <button @click="handleCommentLike(reply)" :class="['text-sm font-bold transition-all flex items-center gap-2', reply.isLikedByMe ? 'text-red-500' : 'text-gray-400 hover:text-red-500']">
                    <svg class="w-3.5 h-3.5" :fill="reply.isLikedByMe ? 'currentColor' : 'none'" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
                    {{ reply.likesCount || 0 }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Empty Discourse State -->
        <div v-else class="text-center py-24 px-8 border border-dashed border-gray-200 rounded-[3rem] bg-gray-50/30">
          <div class="w-16 h-16 bg-white rounded-[1.5rem] flex items-center justify-center mx-auto mb-6 shadow-sm border border-slate-200 shadow-blue-900/5 rotate-3">
            <svg class="w-8 h-8 text-[#27628C]/20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-2">No Discourse Found</h3>
          <p class="text-sm font-medium text-gray-400 tracking-wide">Be the inaugural contributor to this clinical perspective.</p>
        </div>
      </section>
    </article>

    <!-- Not Found -->
    <div v-else class="flex flex-col items-center justify-center py-40 px-6 text-center">
      <h2 class="text-lg font-bold text-gray-900 tracking-tight mb-4">Missing Perspective</h2>
      <p class="text-lg text-gray-500 font-light mb-12">The publication you are seeking has either been moved or is retracted.</p>
      <NuxtLink to="/journo" class="bg-gray-900 text-white px-10 py-5 rounded-2xl text-sm font-bold hover:bg-[#27628C] transition-all shadow-sm border border-slate-200">Return to Hub</NuxtLink>
    </div>

    <ShareModal 
      :is-open="isShareModalOpen" 
      :url="shareUrl" 
      :title="publication?.title" 
      :text="publication?.excerpt"
      @close="isShareModalOpen = false" 
    />

    <CommentProfileModal 
      :is-open="isProfileModalOpen" 
      @close="isProfileModalOpen = false"
      @saved="onProfileSaved"
    />

    <FooterComponent />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { convostack_api } from '@/api_factory/modules/convostack'
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
