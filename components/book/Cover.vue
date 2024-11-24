<script setup>
const props = defineProps(['book'])
</script>

<template>
    <div class="grid justify-center ">
        <div class="relative w-40 h-48 lg:w-56 lg:h-72  mx-auto ">
         
            
            <img src="/images/book4.webp" class="w-full h-full object-contain" alt="Background Image">
           
            <NuxtLink :to="{name: 'showBook', params:{id: props.book.id, slug: props.book.slug}}"  class="absolute inset-0 m-auto w-full h-auto px-8 py-5  mr-2">
                <img :src="props.book?.image" class=" object-cover rounded" alt="Centered Image">
            </NuxtLink>
          
        </div>

        <div class="text-center  px-3 ">
            <NuxtLink :to="{name: 'showBook', params:{id: props.book.id, slug: props.book.slug}}"  class="line-show-1 mt-1 text-xs lg:text-base text-primary-950 font-bold ">{{ props.book.title }}</NuxtLink>
            <p class="text-primary-700 font-bold  text-sm lg:text-base">{{ numberFormat(props.book.price) }} تومان</p>
        </div>
    </div>


</template>