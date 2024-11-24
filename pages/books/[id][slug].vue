<script setup>
import { useCartStore } from '~/store/cart';

const route = useRoute();
const { public:{apiBase} } = useRuntimeConfig();

const {data:book, refresh} = await useFetch(()=> `${apiBase}/books/findById/${route.params.id}`, {
    params:{include_details:true}
})

// console.log(book.value.data.id)

const cart = useCartStore()
const qty = computed(()=> cart.qtyOfItem(book.value.data.id))
const countCartItems = computed(()=> cart.count)
// console.log(qty)

// function addToCart(product){
//     cart.addToCart(product);
// }

// function removeFromCart(productId){
//     cart.removeFromCart(productId);
// }

</script>


<template>
    <div class="divide-y ">

        <nav class="flex    py-8" aria-label="Breadcrumb">
            <ol class="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                <li class="inline-flex items-center">
                    <NuxtLink :to="{name:'home'}" class="inline-flex items-center text-xs lg:text-sm font-medium text-gray-700 hover:text-primary-600 ">
                        خانه
                    </NuxtLink>
                </li>
                <li>
                    <div class="flex items-center">
                        <svg class="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
                        </svg>
                        <NuxtLink  class="ms-1 text-xs lg:text-sm font-medium text-gray-700 hover:text-primary-600 md:ms-2 ">کتاب ها</NuxtLink>
                    </div>
                </li>
                <li>
                    <div class="flex items-center">
                        <svg class="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
                        </svg>
                        <NuxtLink :to="{name:'showCategory', params: { id: book.data.category.id, slug: book.data.category.slug }}" class="ms-1 text-xs lg:text-sm font-medium text-gray-700 hover:text-primary-600 md:ms-2 ">{{  book.data.category.title }}</NuxtLink>
                    </div>
                </li>
                <li aria-current="page">
                    <div class="flex items-center">
                        <svg class="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
                        </svg>
                        <span class="ms-1 text-xs lg:text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">{{ book.data.title }}</span>
                    </div>
                </li>
            </ol>
        </nav>
        
        <div class="flex  py-8">
            <img class="border rounded-lg w-40 lg:w-52 h-auto self-start" :src="book.data.image" alt="">
            <div class=" grow  grid  pr-5 mr-5 border-r">
                <h3 class="font-bold lg:text-2xl">ویژگی های محصول</h3>
            
                <div class="grid content-between text-xs lg:text-base  gap-y-1 mt-3">
                    <p class="text-primary-950 font-bold">{{ book.data.title }} </p>
                    <div>
                        <span>نویسنده :</span>
                        <span class="mr-2"> {{ book.data.author?.name }} </span>
                    </div>
                    <div>
                        <span>مترجم :</span>
                        <span class="mr-2"> {{ book.data.translator?.name }} </span>
                    </div>
                    <div>
                        <span>انتشارات :</span>
                        <span class="mr-2"> {{ book.data.publisher?.name }} </span>
                    </div>
                    <div>
                        <span>سال انتشار :</span>
                        <span class="mr-2"> {{ book.data.published_year }} </span>
                    </div>
                    <div>
                        <span>موضوع :</span>
                        <span class="mr-2"> {{ book.data.category.title }} </span>
                    </div>
                    <div>
                        <span>تعداد صفحه :</span>
                        <span class="mr-2"> {{ book.data.pages }} </span>
                    </div>
                    <div>
                        <span>شابک :</span>
                        <span class="mr-2"> {{ book.data.isbn }} </span>
                    </div>
                    <div>
                        <span>قیمت :</span>
                        <span class="mr-2 text-emerald-500 font-bold tracking-widest ml-1"> {{ numberFormat(book.data.price) }} </span> تومان
                    </div>   

                </div>

                <div class="self-end justify-self-start lg:justify-self-end mt-4 ">
                    <!-- <div class=" flex items-center gap-x-6 rounded-lg  border  px-5 py-2.5  ">
                        <button @click="addToCart(book.data)" type="button">
                            <svg class="w-7 h-7 fill-gray-400  rounded-md p-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z"/></svg>
                        </button>
                        <span>1</span>
                        <button @click="removeFromCart(book.data.id)" type="button">
                            <svg class="w-7 h-7 fill-gray-400  rounded-md p-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z"/></svg>
                        </button>
                    </div> -->

                    <ClientOnly>
                        <div v-if="qty > 0" class="flex items-center">
                            <button @click="cart.addToCart(book.data)" type="button" id="increment-button" data-input-counter-increment="counter-input" 
                            class="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100  ">
                                <svg class="h-2.5 w-2.5 text-gray-900 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
                                </svg>
                            </button>
                            
                            <input type="text" id="counter-input" data-input-counter class="w-16 shrink-0 border-0 bg-transparent text-center text-lg font-medium text-gray-900 focus:outline-none focus:ring-0 " placeholder="" :value="qty" required />
                            <button @click="cart.removeFromCart(book.data.id)" type="button" id="decrement-button" data-input-counter-decrement="counter-input" 
                            class="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 ">
                                <svg class="h-2.5 w-2.5 text-gray-900 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16" />
                                </svg>
                            </button>
                        </div>

                        <button v-else @click="cart.addToCart(book.data)" type="button" class="flex items-center gap-x-3 rounded-lg bg-primary-700 px-5 py-2.5 text-sm  text-white duration-200 hover:bg-primary-800 focus:outline-none">
                            افزودن به سبد
                            <svg class="w-5 h-5 fill-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M0 24C0 10.7 10.7 0 24 0L69.5 0c22 0 41.5 12.8 50.6 32l411 0c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3l-288.5 0 5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5L488 336c13.3 0 24 10.7 24 24s-10.7 24-24 24l-288.3 0c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5L24 48C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96zM252 160c0 11 9 20 20 20l44 0 0 44c0 11 9 20 20 20s20-9 20-20l0-44 44 0c11 0 20-9 20-20s-9-20-20-20l-44 0 0-44c0-11-9-20-20-20s-20 9-20 20l0 44-44 0c-11 0-20 9-20 20z"/></svg>
                        </button>
                    </ClientOnly>

                    
                </div>
            </div>
        </div>

        <div class="py-8">
            <div class="grid grid-cols-2 lg:grid-cols-4 text-sm lg:text-base gap-y-10 justify-around bg-primary-900 bg-opacity-10 rounded-lg py-8 ">
                <div class="text-center">
                    <img class="mx-auto" src="/images/product_icons/express-delivery.png" alt="">
                    <p class="mt-2">تحویل سریع و به‌موقع</p>
                </div>

                <div class="text-center">
                    <img class="mx-auto" src="/images/product_icons/protect.png" alt="">
                    <p class="mt-2">تضمین سلامت فیزیکی کتاب‌ها</p>
                </div>

                <div class="text-center">
                    <img class="mx-auto" src="/images/product_icons/check-box.png" alt="">
                    <p class="mt-2">تنوع بی‌نظیر در انتخاب کتاب‌ها</p>
                </div>

                <div class="text-center">
                    <img class="mx-auto" src="/images/product_icons/call.png" alt="">
                    <p class="mt-2">پشتیبانی 24/7</p>
                </div>
                
            </div>
        </div>

        <div class="py-8">
            <h4 class="font-bold lg:text-xl mb-3">معرفی کتاب {{ book.data.title }}</h4>
            <p class="text-gray-500">{{ book.data.description }}</p>
        </div>

        <div class="py-8">
            <h4 class="font-bold lg:text-xl mb-3">کتاب های مرتبط</h4>
            <BookRelated/>
        </div>

        <div class="py-8">
            <h4 class="font-bold lg:text-xl mb-3">نظرات کاربران</h4>
            <!-- <Comment :comments="book.data.comments" :book_id="book.data.id"/> -->
        </div>

    </div>
</template>