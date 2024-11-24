<template>
    <div class=" relative" >
      <swiper
      :modules="modules"
      :slides-per-view="1"
      :space-between="50"
      :navigation="{
        nextEl: '.custom-next',
        prevEl: '.custom-prev',
      }"
      :autoplay="true"
      :effect="'creative'"
      :creativeEffect="{
        prev: {
          shadow: true,
          translate: [0, 0, -400],
        },
        next: {
          translate: ['100%', 0, 0],
        },
      }"
      :pagination="{ clickable: true }"
    >
      <swiper-slide><img class="rounded-lg" src="/images/slider3.webp" alt=""></swiper-slide>
      <swiper-slide><img class="rounded-lg" src="/images/slider2.webp" alt=""></swiper-slide>

        <button class="custom-prev absolute left-0 top-1/2 transform -translate-y-1/2 bg-white text-primary-900 p-3 rounded-r-lg z-10">
            <svg class="h-5 w-5 fill-primary-900" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"/></svg>
        </button>
        <button class="custom-next absolute right-0 top-1/2 transform -translate-y-1/2 bg-white text-primary-900 p-3 rounded-l-lg z-10">
            <svg class="h-5 w-5 fill-primary-900" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>
        </button>
    </swiper>
    </div>
</template>
    
<script setup>
import { Navigation, Scrollbar, A11y, Autoplay, EffectCreative } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
// import 'swiper/css/navigation';
const modules = [Navigation, Scrollbar, A11y, Autoplay, EffectCreative];
</script>
  
  
    