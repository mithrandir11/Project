<script setup>
const {authUser} = useAuth();
async function handleLogout() {
    await useFetch('/api/auth/logout', {
        method: 'POST'
    })

    authUser.value = null;
    push.warning("شما از سیستم خارج شدید")
    return navigateTo('/')
}
</script>
<template>
    <div class="container mx-auto px-1 lg:px-0">
        <Header/>
        <div class="flex pt-10 gap-x-4">
            <div class="max-w-xs w-full">
                <div class="border rounded-lg py-8  text-xl  px-12 divide-y text-center">
                    <NuxtLink :to="{name: 'profile'}" class="p-3 block">اطلاعات کاربر</NuxtLink>
                    <NuxtLink :to="{name: 'profile.addresses'}" class="p-3 block">آدرس ها</NuxtLink>
                    <NuxtLink :to="{name: 'profile.orders'}" class="p-3 block">سفارشات</NuxtLink>
                    <!-- <div class="p-3">تراکنش ها</div> -->
                    <button @click="handleLogout" class="p-3 block w-full">خروج</button>
                </div>
            </div>
            <slot/>
        </div>
        
    </div>
</template>