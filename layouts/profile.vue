<script setup>
import { useAuthStore } from '~/store/auth';

// const {authUser} = useAuth();

const auth = useAuthStore();


async function handleLogout() {
    await useFetch('/api/auth/logout', {
        method: 'POST'
    })

    // authUser.value = null;
    auth.user = null
    auth.token = null
    push.info("شما از سیستم خارج شدید")
    return navigateTo('/')
}
</script>
<template>
    <div class="container mx-auto px-1 lg:px-0">
        <Header/>
        <div class="flex pt-10 gap-x-8">
            <div class="max-w-xs w-full">
                <div class="border rounded-lg py-8 px-4  text-lg   divide-y text-center">
                    <NuxtLink :to="{name: 'profile'}" activeClass="text-primary-700" class="p-4  flex items-center  gap-x-3 text-gray-600">
                        <!-- <div class="w-1 h-8 bg-primary-600 rounded"></div> -->
                        <svg class="w-5 h-5 fill-gray-700" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z"/></svg>
                        اطلاعات کاربر
                    </NuxtLink>

                    <NuxtLink :to="{name: 'profile.addresses'}" activeClass="text-primary-700" class="p-4  flex items-center  gap-x-3 text-gray-600 ">
                        <svg class="w-5 h-5 fill-gray-700" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/></svg>
                        آدرس ها
                    </NuxtLink>

                    <NuxtLink :to="{name: 'profile.orders'}" activeClass="text-primary-700" class="p-4  flex items-center  gap-x-3 text-gray-600 ">
                        <svg class="w-5 h-5 fill-gray-700" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M160 112c0-35.3 28.7-64 64-64s64 28.7 64 64l0 48-128 0 0-48zm-48 48l-64 0c-26.5 0-48 21.5-48 48L0 416c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-208c0-26.5-21.5-48-48-48l-64 0 0-48C336 50.1 285.9 0 224 0S112 50.1 112 112l0 48zm24 48a24 24 0 1 1 0 48 24 24 0 1 1 0-48zm152 24a24 24 0 1 1 48 0 24 24 0 1 1 -48 0z"/></svg>
                        سفارشات
                    </NuxtLink>

                    <button @click="handleLogout" type="button" activeClass="text-primary-700" class="p-4  flex items-center  gap-x-3 text-gray-600 w-full ">
                        <svg class="w-5 h-5 fill-gray-700" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 192 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l210.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128zM160 96c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 32C43 32 0 75 0 128L0 384c0 53 43 96 96 96l64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l64 0z"/></svg>
                        خروج
                    </button>

                    <!-- <NuxtLink :to="{name: 'profile.addresses'}" class="p-3 block">آدرس ها</NuxtLink> -->
                    <!-- <NuxtLink :to="{name: 'profile.orders'}" class="p-3 block">سفارشات</NuxtLink> -->
                    <!-- <div class="p-3">تراکنش ها</div> -->
                    <!-- <button @click="handleLogout" class="p-3 block w-full">خروج</button> -->
                </div>
            </div>
            <slot/>
        </div>
        
    </div>
</template>