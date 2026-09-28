<template>
  <main>
    <div>
      <div class="relative isolate overflow-hidden pt-14">
        <div class="mx-auto max-w-2xl lg:py-32 lg:mt-10 mt-36">
          <div class="text-center space-y-5">
            <h1 class="font-bold tracking-tight text-gray-900 text-6xl sm:text-8xl lg:text-9xl mb-6">
              Support MedLabConvo
            </h1>
            <p class="text-2xl sm:text-3xl text-gray-600 font-light animate-fade-in-delay">
              Empower the Future of Laboratory Medicine.
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-col space-y-4 max-w-sm w-40 lg:w-full h-40 mx-auto pt-4 mt-4">
      <a href="https://paystack.com/pay/medlabconvodonation" target="_blank"
        class="bg-[#27628C] text-center text-white py-3 px-3 rounded transition-colors hover:bg-[#1a4665]">
        Donate Now
      </a>
    </div>

    <div class="mt-20 lg:mt-6 flex justify-center items-center px-4">
      <div class="max-w-[900px] w-full flex flex-col justify-center items-center">
        <h2 class="text-4xl md:text-5xl text-center font-extrabold text-gray-900">
          Why Donate to MedLabConvo?
        </h2>
        <p class="text-xl text-gray-600 text-center mt-8 max-w-4xl mx-auto leading-relaxed">
          MedLabConvo is more than just a platform; it is a movement dedicated
          to transforming the landscape of healthcare. Through
          education, mentorship, advocacy, and system strengthening, we are
          shaping the future of healthcare by empowering healthcare
          professionals at every stage of their careers.
        </p>
      </div>
    </div>

    <div class="bg-white container mx-auto mt-20">
      <div class="mx-auto px-4 sm:px-6 lg:px-4">
        <h2 class="text-lg font-bold text-gray-900 text-center ">
          Your donation helps us:
        </h2>

        <div class="flex justify-center items-center w-full lg:flex pt-10">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-14">
            <div
              class="max-w-md lg:max-w-lg lg:w-[500px] w-[300px] mx-auto bg-white rounded-lg border-2 border-gray-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden p-6">
              <div class="space-y-4">
                <h1 class="text-xl font-semibold text-gray-900 tracking-wider">
                  ✅ Train and Mentor Future Leaders
                </h1>
                <p class="text-xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
                  Our programs and professional development initiatives
                  equip young healthcare professionals with the skills and
                  opportunities they need to thrive.
                </p>
              </div>
            </div>

            <div
              class="max-w-md lg:max-w-lg lg:w-[500px] w-[300px] mx-auto bg-white rounded-lg border-2 border-gray-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden p-6">
              <div class="space-y-4">
                <h1 class="text-xl font-semibold text-gray-900 tracking-wider">
                  ✅ Bridge the Knowledge Gap
                </h1>
                <p class="text-xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
                  Through our LabCast podcast, blogs, and research resources, we
                  provide critical knowledge that enhances clinical diagnostics
                  and patient care.
                </p>
              </div>
            </div>

            <div
              class="max-w-md lg:max-w-lg lg:w-[500px] w-[300px] mx-auto bg-white rounded-lg border-2 border-gray-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden p-6">
              <div class="space-y-4">
                <h1 class="text-xl font-semibold text-gray-900 tracking-wider">
                  ✅ Strengthen Healthcare Systems
                </h1>
                <p class="text-xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
                  By fostering collaboration and advocating for laboratory
                  medicine, we contribute to a more robust and efficient
                  healthcare system.
                </p>
              </div>
            </div>

            <div
              class="max-w-md lg:max-w-lg lg:w-[500px] w-[300px] mx-auto bg-white rounded-lg border-2 border-gray-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden p-6">
              <div class="space-y-4">


                <h1 class="text-xl font-semibold text-gray-900 tracking-wider">
                  ✅ Expand Access to Opportunities
                </h1>
                <p class="text-xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
                  Our networking and community-building efforts connect healthcare
                  professionals worldwide, ensuring that no one is left
                  behind.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


    <AddYouTubeVideo title="See What Some People Are Saying"
      subtitle="Catch some moments from our programs and activities" :video-ids="['qS_vrYnoprk', 'j-PppaKgAC4']" />
      <section class="relative py-10 bg-gradient-to-br from-slate-50 via-blue-50 to-white overflow-hidden">
  <div class="absolute inset-0 overflow-hidden">
    <div class="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full opacity-30 animate-float"></div>
    <div class="absolute -bottom-20 -left-20 w-60 h-60 bg-indigo-100 rounded-full opacity-40 animate-float-delayed"></div>
  </div>

  <div class="max-w-7xl mx-auto px-6 lg:px-8">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div v-for="(testimonial, idx) in testimonials" :key="idx" class="group">
        <div
          class="bg-white rounded-3xl p-4 shadow-sm border border-slate-200 hover:shadow-sm border border-slate-200 transition-all duration-500 transform hover:-translate-y-2 h-full">
          <div class="flex items-center mb-6">
            <img class="h-12 w-12 rounded-full object-cover" src="@/assets/img/avatar.jpeg" alt="">
            <div class="ml-4">
              <div class="font-bold text-gray-900">{{ testimonial.name }}</div>
              <div class="text-sm text-gray-900">{{ testimonial.profession }}</div>
            </div>
          </div>
          <blockquote class="text-gray-700 leading-relaxed">
            "{{ testimonial.testimonial }}"
          </blockquote>
        </div>
      </div>
    </div>
  </div>
</section>

<ProgramsCarousel />
<PastPrograms />

    <!-- Donation Rewards -->
    <section class="relative py-16 bg-gradient-to-br from-blue-50 via-white to-slate-50 overflow-hidden">
      <div class="absolute inset-0 overflow-hidden">
        <div class="absolute -top-20 -left-20 w-60 h-60 bg-blue-100 rounded-full opacity-30 animate-float"></div>
        <div
          class="absolute -bottom-20 -right-20 w-72 h-72 bg-indigo-100 rounded-full opacity-40 animate-float-delayed">
        </div>
      </div>

      <div class="relative max-w-6xl mx-auto px-6 lg:px-8">
        <h2 class="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-8">
          Donation Appreciation Packages
        </h2>
        <p class="text-lg text-gray-700 text-center max-w-3xl mx-auto mb-10 leading-relaxed">
          Every donation counts! Show your support for MedLabConvo and receive a
          token of appreciation — our way of saying <span class="font-semibold">thank you</span>
          for helping us build a stronger community of Healthcare Professionals.
        </p>

        <!-- Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-16 place-items-center">
          <div class="w-full max-w-sm bg-white rounded-xl shadow-md overflow-hidden hover:shadow-sm border border-slate-100 transition">
            <img src="@/assets/img/email-sample.jpg" alt="Personalized Email Sample" class="w-full h-48 object-cover" />
            <div class="p-4">
              <h3 class="text-lg font-semibold text-[#27628C] mb-1">
                Personalized Email
              </h3>
              <p class="text-gray-600 text-sm">
                Every donor receives a heartfelt personalized thank-you email.
              </p>
            </div>
          </div>

          <div class="w-full max-w-sm bg-white rounded-xl shadow-md overflow-hidden hover:shadow-sm border border-slate-100 transition">
            <img src="@/assets/img/thankyou-card.jpg" alt="Thank You Card Sample" class="w-full h-48 object-cover" />
            <div class="p-4">
              <h3 class="text-lg font-semibold text-[#27628C] mb-1">
                Thank You Card
              </h3>
              <p class="text-gray-600 text-sm">
                For donations of ₦5,000 and above, receive a personalized
                thank-you card in addition to your email.
              </p>
            </div>
          </div>

          <div class="w-full max-w-sm bg-white rounded-xl shadow-md overflow-hidden hover:shadow-sm border border-slate-100 transition">
            <!-- <img
          src="@/assets/img/souvenir.jpg"
          alt="Souvenir Sample"
          class="w-full h-48 object-cover"
        /> -->
            <div class="p-4">
              <h3 class="text-lg font-semibold text-[#27628C] mb-1">Souvenir</h3>
              <p class="text-gray-600 text-sm">
                For donations of ₦50,000 and above, receive an exclusive souvenir
                along with your card and email.
              </p>
            </div>
          </div>
        </div>

        <!-- Summary -->
        <div
          class="bg-white/80 border border-[#27628C]/20 rounded-2xl shadow-sm border border-slate-100 p-8 max-w-3xl mx-auto text-center space-y-3">
          <p class="text-sm font-semibold text-[#27628C]  tracking-wide">
            You can donate any amount 💙
          </p>
          <p class="text-gray-700 leading-relaxed">
            <span class="font-semibold">₦0+</span>: Personalized appreciation email.
          </p>
          <p class="text-gray-700 leading-relaxed">
            <span class="font-semibold">₦5,000+</span>: Personalized email +
            thank-you card.
          </p>
          <p class="text-gray-700 leading-relaxed">
            <span class="font-semibold">₦50,000+</span>: Personalized email +
            thank-you card + MedLabConvo souvenir.
          </p>
        </div>
      </div>
    </section>


    <div class="flex justify-center items-center px-4 mt-20">
      <div class="max-w-[900px] w-full flex flex-col justify-center items-center">
        <h2 class="text-lg font-bold text-gray-900 text-center">
          Join Us in Making an Impact
        </h2>
        <p class="text-xl max-w-[800px] w-full text-gray-600 text-center mt-6 leading-relaxed">
          By supporting MedLabConvo, you are investing in a future where healthcare professionals are better
          equipped, more connected, and more empowered to drive change in healthcare.
        </p>
        <p class="text-lg font-bold text-gray-900 text-center mt-14">
          Donate Today and Be Part of the Change!
        </p>
      </div>
    </div>

    <div class="flex flex-col space-y-4  max-w-sm w-40 lg:w-full mx-auto pt-4 mt-6">
      <a href="https://paystack.com/pay/medlabconvodonation" target="_blank"
        class="bg-[#27628C] text-center text-white py-3 px-3 rounded transition-colors hover:bg-[#1a4665]">
        Donate Now
      </a>
      <p class="text-center text-gray-600">Or</p>
    </div>

    <div class="flex justify-center items-center px-4 mb-10">
      <div class="max-w-[900px] w-full flex flex-col justify-center items-center">
        <div class="w-full max-w-[500px] border-2 rounded-2xl px-4 lg:px-4 py-6 mt-6 mx-auto">
          <p class="text-lg text-gray-600">Donate Directly To Our Bank Account</p>
          <div class="bg-red-400 h-[1px] mt-2 opacity-60"></div>
          <p class="text-gray-900 text-lg mt-4">Copy Account Details</p>

          <div class="flex items-center gap-6 lg:gap-20 mt-6 border-2 lg:p-4 p-2 rounded-2xl">
            <div class="bg-[#27628C] relative p-3 rounded-2xl w-[280px] min-h-[120px] flex flex-col justify-start">
              <img src="@/assets/img/mastercard.jpg" alt="Mastercard logo" class="absolute top-2 right-2 w-10" />
              <p class="text-lg text-white">MedLabConvo</p>
              <p class="text-lg font-extrabold text-white">{{ textToCopy }}</p>
              <p class="text-lg text-white">UBA</p>
            </div>

            <div class="flex flex-col justify-center items-center min-h-[120px]">
              <p class="text-xl text-gray-900 mb-2">Copy</p>
              <img src="@/assets/img/copy.png" alt="Copy"
                class="w-10 h-10 cursor-pointer opacity-80 hover:opacity-60 transition" @click="copyText" />
              <span v-if="copied" class="text-green-500 text-sm mt-2">Copied!</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import AddYouTubeVideo from '@/components/AddYouTubeVideo.vue'
import PastPrograms from '~/components/PastPrograms.vue';


const testimonials = ref([
  {
    name: 'Raphael Yohanna',
    profession: 'Biomedical Scientist',
    testimonial: `The masterclass has tweaked my thoughts and ideas on the scholarship application process and has motivated me to review my application materials and make necessary changes to better suit my research interests for a more compelling application.`
  },
  {
    name: 'Precious Adesola',
    profession: 'Biomedical Scientist',
    testimonial: `Over the past few weeks, this comprehensive masterclass has equipped me with effective strategies and invaluable resources to navigate scholarship applications successfully. I am deeply grateful to MedLabConvo for offering this exceptional and free masterclass.`
  },
  {
    name: 'Modupe Laja',
    profession: 'Physiotherapist',
    testimonial: `The amazing work by MedLabConvo truly inspired me during my years in school and up till now. I love to see the amazing things the team is doing.`
  }
])

const textToCopy = ref('2226584232');
const copied = ref(false);

const copyText = async () => {
  try {
    await navigator.clipboard.writeText(textToCopy.value);
    copied.value = true;
    setTimeout(() => copied.value = false, 2000);
  } catch (err) {
    console.error('Failed to copy: ', err);
  }
}
</script>