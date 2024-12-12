<script setup>
import { useAuthStore } from '~/store/auth';
import { useCartStore } from '~/store/cart';
const { public:{apiBase} } = useRuntimeConfig();
const {data:categories} = await useFetch(`${apiBase}/categories`);
// const {authUser} = useAuth();
const cart = useCartStore();
const countCartItems = computed(()=> cart.count)



const auth = useAuthStore();
</script>

<template>
    <nav class="pt-2.5">
        <div class="flex flex-wrap justify-between items-center mx-auto ">

            <NuxtLink to="/" class="flex items-center">
                <img src="/images/24489711_6933620.svg" class="ml-3 h-20 rounded-lg" alt="Flowbite Logo" />
                <span class=" text-xl font-semibold whitespace-nowrap ">فروشگاه کتاب</span>
            </NuxtLink>

            <div class="flex items-center lg:order-2">

             

                <ClientOnly>
                    <NuxtLink v-if="auth.user"  :to="{name: 'profile'}" class="hidden lg:block  font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2  border">{{ auth.user.name }}</NuxtLink>
                    <!-- <NuxtLink v-if="auth.user"  :to="{name: 'profile'}" class="hidden lg:block  font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2  border">حساب کاربری</NuxtLink> -->
                    <NuxtLink v-else :to="{name: 'login'}" class="hidden lg:block font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2  border">ورود به حساب</NuxtLink>
                </ClientOnly>

                <NuxtLink :to="{name: 'cart'}" class="hidden lg:flex items-center rounded-lg  text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 border ">
                    <ClientOnly><span class="text-primary-700">( {{countCartItems}} )</span></ClientOnly>
                    <svg class="fill-primary-700 mr-1 w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M0 24C0 10.7 10.7 0 24 0L69.5 0c22 0 41.5 12.8 50.6 32l411 0c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3l-288.5 0 5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5L488 336c13.3 0 24 10.7 24 24s-10.7 24-24 24l-288.3 0c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5L24 48C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/></svg>
                </NuxtLink>




                <NuxtLink  class="p-2 lg:hidden inline-flex items-center">
                    <span class="text-primary-700 text-sm">( 1 )</span>
                    <svg class="fill-primary-700 mr-1 w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M0 24C0 10.7 10.7 0 24 0L69.5 0c22 0 41.5 12.8 50.6 32l411 0c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3l-288.5 0 5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5L488 336c13.3 0 24 10.7 24 24s-10.7 24-24 24l-288.3 0c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5L24 48C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/></svg>
                </NuxtLink>

                <button  data-collapse-toggle="mobile-menu-2" type="button" class="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200   " aria-controls="mobile-menu-2" aria-expanded="false">
                    <span class="sr-only">Open main menu</span>
                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
                    <svg class="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                </button>
            </div>

            <div class="grow max-w-lg">
                <SearchBox/>
            </div>

        </div>

        <!-- <div class="hidden lg:block bg-primary-900 bg-opacity-20  p-2 rounded-b-lg"> -->
        <div class="hidden lg:block bg-emerald-700 bg-opacity-20   p-2 rounded-b-lg">
            <ul v-if="categories" class="flex justify-center   lg:gap-x-24 lg:mt-0">
                <li>
                    <!-- <NuxtLink :to="{name: 'books'}" active-class="bg-primary-900 bg-opacity-20 rounded-lg px-2" class="text-primary-950"  >همه</NuxtLink> -->
                    <NuxtLink :to="{name: 'books'}" active-class="bg-white  rounded-lg px-2"   >همه</NuxtLink>
                </li>
                <li v-for="category in categories.data" :key="category.id">
                    <NuxtLink :to="{name:'showCategory', params: { id: category.id, slug: category.slug }}" active-class="bg-white  rounded-lg px-2" class=""  >{{ category.title }}</NuxtLink>
                </li>
            </ul>
        </div>



        <!-- <div v-if="showMobileMenu" class="fixed inset-0 flex z-50 justify-start">
            <div class="fixed inset-0 transition-opacity bg-primary-950 bg-opacity-20 "></div>
            <div class="relative flex-1 flex flex-col  focus:outline-none w-screen max-w-xs h-full bg-white  shadow-xl">

                <div class="flex justify-end px-2 mt-2 gap-x-2">
                    <NuxtLink v-if="user" :to="{name: 'home'}" class="border p-1 rounded-lg self-end">
                        <span class="text-primary-950 text-sm">{{ user.email }}</span>
                    </NuxtLink>

                    <NuxtLink v-else :to="{name: 'login'}" class="border p-1 rounded-lg self-end">
                        <span class="text-primary-950 text-sm">ورود به حساب</span>
                    </NuxtLink>

                    <button @click="showMobileMenu = false" class="border p-1 rounded-lg self-end ">
                        <svg class="h-6 w-6 fill-primary-950 " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>
                    </button>
                </div>

                <div class="p-4 flex-1">
                    
                    <div class="relative overflow-hidden text-lg  px-4  h-full">
                        <ul v-if="categories" class="grid gap-y-4 ">
                            <li><NuxtLink :to="{name:'home'}"  active-class="bg-primary-900 bg-opacity-20 rounded-lg px-2" class="text-primary-950"  >خانه</NuxtLink></li>
                            <li v-for="category in categories.data">
                                <NuxtLink :to="{name:'showCategory', params: { id: category.id, slug: category.slug }}"  active-class="bg-primary-900 bg-opacity-20 rounded-lg px-2" class="text-primary-950"  >{{ category.title }}</NuxtLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div> -->
       








         <!-- <button @click="handleLogout" class="hidden lg:flex group items-center gap-x-2 hover:text-gray-800  duration-200  hover:bg-gray-100 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2  border">
                    <span>خروج</span>
                    <svg class="h-5 w-5 group-hover:fill-red-500 duration-200 fill-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 192 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l210.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128zM160 96c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 32C43 32 0 75 0 128L0 384c0 53 43 96 96 96l64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l64 0z"/></svg>
                </button> -->

        

    </nav>
</template>