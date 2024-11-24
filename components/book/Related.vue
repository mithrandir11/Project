<script setup>
import { Navigation, Pagination, Scrollbar, A11y, Autoplay, EffectCreative } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
const modules = [Navigation, Pagination, Scrollbar, A11y, Autoplay, EffectCreative];

const { public:{apiBase} } = useRuntimeConfig();
const {data:books} = await useFetch(`${apiBase}/books/relatedBooks`)
</script>

<template>
    <div>
      <swiper 
      :modules="modules"
      :reverseDirection=true
      :slides-per-view="9"
      :space-between="30"
      :pagination=false
      :navigation=true
      :autoplay="true"
      :breakpoints="{
        '0': {
          slidesPerView: 3,
          spaceBetween: 0,
        },
        '640': {
          slidesPerView: 5,
        },
        '768': {
          slidesPerView: 7,
        },
        '1024': {
          slidesPerView: 9,
        },
      }"
      >
        <swiper-slide v-for="book in books.data">
          <NuxtLink :to="{ name: 'showBook', params: { id: book.id, slug: book.slug } }"><img class="w-28 lg:w-auto border rounded-lg" :src="book.image" alt=""></NuxtLink>
        </swiper-slide>
      </swiper>
    </div>
</template>

  
  
    