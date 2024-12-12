<script setup>
const props = defineProps(['items'])
const showModal = ref(false)
</script>

<template>
    <!-- Modal toggle -->
    <button @click="showModal = true" type="button" class="text-primary-700">
        (نمایش)
    </button>

    <!-- Main modal -->
    <div v-if="showModal" class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">

        <div class="fixed inset-0 bg-black bg-opacity-10 transition-opacity" aria-hidden="true"></div>

        <div class="fixed inset-0 z-10 w-screen ">
            <div class="flex min-h-full items-end justify-center p-4  sm:items-center sm:p-0">
            
            <div class="relative transform overflow-hidden rounded-lg bg-white  shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl">
                <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 max-h-screen overflow-y-auto">

                    <div class="flex items-center justify-between py-2 border-b rounded-t">
                        <!-- <h3 class="text-xl font-semibold text-gray-900 ">
                            کتاب های خریداری شده
                        </h3> -->
                        <button @click="showModal = false" type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 duration-200 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center " >
                            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                            </svg>
                            <span class="sr-only">Close modal</span>
                        </button>
                    </div>
                    
                    <div class="sm:flex sm:items-start">
                    
                        <div class="mt-3  sm:ml-4 sm:mt-0 sm:">
                            <div  v-for="product in props.items"  :key="product.id" class="py-3">
                                <div class="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                                    <NuxtLink class="shrink-0 md:order-1">
                                        <img class="h-auto w-20 border rounded-lg " :src="product.book.image" alt="imac image" />
                                    </NuxtLink>

                                    
                                    <div class="flex items-center justify-between md:order-3 w-full">

                                        <div class="w-full min-w-0 flex-1 space-y-4  md:max-w-md ">
                                            <NuxtLink :to="{name: 'showBook', params:{id: product.book.id, slug: product.book.slug}}" class="text-sm lg:text-base font-medium text-gray-900 hover:underline ">{{ product.book.title }}</NuxtLink>
                                        </div>
            
                                        <div class="text-end  md:w-32">
                                            <p class=" font-bold text-gray-900 ">{{ product.price }} تومان </p>
                                        </div>

                                        <div class="text-end  md:w-24">
                                            <p>{{ product.quantity }} عدد </p>
                                        </div>
                                        
                                        
                                    </div>

                                
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button type="button" class="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto">Deactivate</button>
                <button type="button" class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Cancel</button>
                </div> -->
            </div>
            </div>
        </div>
    </div>

</template>