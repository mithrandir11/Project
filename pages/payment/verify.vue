<script setup>
import { useCartStore } from '~/store/cart';

const route = useRoute();
const queries = route.query

const cart = useCartStore();

onMounted(()=>{
    if(queries.status && queries.status == 'successful') cart.clear();
})
// console.log(queries)
</script>
<template>
    <div class="flex justify-center mt-32 ">
        <div v-if="queries.status && queries.status == 'successful'" class=" bg-green-100 rounded-lg py-10 px-6 grid justify-items-center gap-y-4">
            <!-- <svg class="h-12 w-12 animate-[bounce_2s_infinite] fill-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg> -->
            <svg class="h-12 w-12 animate-[bounce_2s_infinite] fill-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg>
            <p class="text-green-600 ">پرداخت شما با موفقیت انجام شد</p>
            <!-- <p class="text-gray-600 text-sm ">شماره پیگیری : 234423</p> -->
            <div class="flex justify-between w-full mt-10 gap-x-20">
                <NuxtLink :to="{name: 'profile.orders'}" class="text-sm bg-white rounded-lg p-2">مشاهده سفارش</NuxtLink>
                <NuxtLink :to="{name: 'home'}" class="text-sm bg-white rounded-lg p-2">بازگشت به سایت</NuxtLink>
            </div>
        </div>

        <div v-else class=" bg-red-100 rounded-lg py-10 px-6 grid justify-items-center gap-y-4">
            <svg class="h-12 w-12 animate-[bounce_2s_infinite] fill-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>
            <p class="text-red-600 ">{{ queries.error }} !</p>
            <div class="flex justify-between w-full mt-10 gap-x-20">
                <NuxtLink :to="{name: 'cart'}" class="text-sm bg-white rounded-lg p-2">بازگشت به سبد خرید</NuxtLink>
                <NuxtLink :to="{name: 'home'}" class="text-sm bg-white rounded-lg p-2">بازگشت به سایت</NuxtLink>
            </div>
        </div>
    </div>
</template>