<script setup>
import { useCartStore } from '~/store/cart';

const cart = useCartStore();
const countCartItems = computed(()=> cart.count)
const cartItems = computed(()=> cart.allItems)
const totalAmount = computed(()=> cart.totalAmount)
const coupon = reactive({
    code: '',
    percent: 0,
})
const selectedAddressId = ref(null)

const {data: addresses} = await useFetch('/api/profile/addresses')
// console.log(selectedAddressId.value)
</script>
<template>
    <ClientOnly>
        <section class="bg-white py-4 antialiased  md:py-16">
            <div class="mx-auto max-w-screen-xl ">

                <!-- <PurchaseSteps/> -->
                
                <h2 class="lg:text-xl font-semibold text-gray-900  ">سبد خرید شما</h2>

                <div v-if="countCartItems > 0" class="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
                    <div class="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
                        <div  class=" divide-y ">

                            <div  v-for="product in cartItems"  :key="product.id"  class="py-3">
                                <div class="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                                    <NuxtLink  :to="{ name: 'showBook', params: { id: product.id, slug: product.slug } }" class="shrink-0 md:order-1">
                                        <img class="h-auto w-28 border rounded-lg " :src="product.image" alt="imac image" />
                                    </NuxtLink>

                                    <label for="counter-input" class="sr-only">Choose quantity:</label>
                                    <div class="flex items-center justify-between md:order-3 md:justify-end">
                                        <div class="flex items-center">
                                            <button @click="cart.addToCart(product)" type="button" id="increment-button" data-input-counter-increment="counter-input" class="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100  ">
                                                <svg class="h-2.5 w-2.5 text-gray-900 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
                                                </svg>
                                            </button>
                                           
                                            <input type="text" id="counter-input" data-input-counter class="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0 " placeholder="" :value="product.qty" required />
                                            <button @click="cart.removeFromCart(product.id)" type="button" id="decrement-button" data-input-counter-decrement="counter-input" 
                                            class="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 ">
                                                <svg class="h-2.5 w-2.5 text-gray-900 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16" />
                                                </svg>
                                            </button>
                                        </div>
                                        <div class="text-end md:order-4 md:w-32">
                                            <p class=" font-bold text-gray-900 ">{{ numberFormat(product.price) }} تومان </p>
                                        </div>
                                    </div>

                                    <div class="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                                        <NuxtLink :to="{ name: 'showBook', params: { id: product.id, slug: product.slug } }" class="text-sm lg:text-base font-medium text-gray-900 hover:underline ">{{ product.title }}</NuxtLink>

                                        <div class="flex items-center gap-x-8">
                                        <button type="button" class="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 hover:underline ">
                                            <svg class="me-1.5 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z" />
                                            </svg>
                                            افزودن به علاقه مندی ها
                                        </button>

                                        <button @click="removeFromCart(product)" type="button" class="inline-flex items-center text-sm font-medium text-red-600 hover:underline ">
                                            <svg class="me-1.5 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18 17.94 6M18 18 6.06 6" />
                                            </svg>
                                            حذف
                                        </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>


                        <h2 class="lg:text-xl font-semibold text-gray-900 mt-24">انتخاب آدرس <NuxtLink :to="{name: 'profile.addresses'}" class="text-primary-700 font-bold mt-3  text-sm underline underline-offset-4"> ( ایجاد آدرس جدید )</NuxtLink></h2>
                        <div class="mt-6">
                            <select v-if="addresses?.length > 0" v-model="selectedAddressId" id="countries" class="border text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 ">
                                <option :value="null">انتخاب آدرس</option>
                                <option v-for="address in addresses" :key="address.id" :value="address.id">{{ address.full_address }}</option>
                            </select>

                            <div v-else >
                                <p>شما در حال حاضر آدرس ثبت شده ای ندارید </p>
                            </div>
                            

                            
                        </div>




                       <CartPayment :coupon="coupon" :addressId="selectedAddressId" :cart="cartItems"/>
                        



                    
                    </div>

                    <div  class="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
                        <div class="space-y-4 rounded-lg border  bg-white p-4 shadow-sm  sm:p-6">
                            <p class="lg:text-xl font-semibold text-gray-900 text-center">خلاصه سفارش</p>

                            <div class="space-y-4">
                                <div class="space-y-2">
                                    <dl class="flex items-center justify-between gap-4">
                                        <dt class="text-base font-normal text-gray-500 ">قیمت کل</dt>
                                        <dd class="text-base font-medium text-gray-900 ">{{ numberFormat(totalAmount) }} تومان</dd>
                                    </dl>

                                    <!-- {{ coupon }} -->

                                    <dl v-if="coupon.code" class="flex items-center justify-between gap-4">
                                        <dt class="text-base font-normal text-gray-500 ">تخفیف {{ coupon.percent }}%</dt>
                                        <dd class="text-base font-medium text-green-600">{{ numberFormat((totalAmount * coupon.percent)/100) }}- تومان</dd>
                                    </dl>

                                    <dl class="flex items-center justify-between gap-4">
                                        <dt class="text-base font-normal text-gray-500 ">هزینه ارسال</dt>
                                        <dd class="text-base font-medium text-gray-900 ">رایگان</dd>
                                    </dl>

                                </div>

                                <dl class="flex items-center justify-between gap-4 border-t  pt-2 ">
                                <dt class="text-base font-bold text-gray-900 ">قیمت پرداختی</dt>
                                <dd class="text-base font-bold text-gray-900 ">{{ totalAmount - ((totalAmount * coupon.percent)/100) }} تومان</dd>
                                </dl>
                            </div>

                        
                            <!-- <NuxtLink :to="{name: 'shipping'}"  class="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none ">مرحله بعدی</NuxtLink> -->
                        </div>

                        
                        <CartDiscountForm :coupon="coupon" />

                    </div>

                </div>

                <div v-else class="max-w-md mx-auto text-center ">
                    <p class="mt-8 border rounded-lg p-6 w-full text-lg text-center">سبد خرید شما خالی میباشد!</p>
                    <NuxtLink :to="{name: 'books'}" class="mt-6 inline-flex items-center gap-2 text-sm font-medium   ">
                        مشاهده محصولات
                        <svg class="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 12H5m14 0-4 4m4-4-4-4" />
                        </svg>
                    </NuxtLink>
                </div>



            </div>
        </section>

        <template #fallback>
            <!-- <h1 class="text-2xl my-24">loading ....</h1> -->
            <div class="w-full flex justify-center opacity-50">
                <video  autoplay muted loop playsinline>
                    <source src="/video/loading_book.webm" type="video/webm" />
                </video>
            </div>
        </template>
    </ClientOnly>
</template>