<script setup>
const {id} = useRoute().params
// const page = ref(0)
const router = useRouter()
const route = useRoute()
const query = ref({})
const { public:{apiBase} } = useRuntimeConfig();

query.value = route.query
const {data:books, refresh} = await useFetch(()=> `${apiBase}/books/findByCategoryId/${id}`, {
    query: query
})

const {data:publishers} = await useFetch(`${apiBase}/publishers`)


function handleFilter(param){
    // page.value = page_number
    query.value = { ...route.query, ...param }

    if(!param.hasOwnProperty('page')){
        delete query.value.page
    }

    router.push({
        // query: { page: page.value } 
        query: query.value 
    })

    refresh()
}

</script>
<template>
    <div class="grid grid-cols-5 gap-x-8 my-8 ">

        <div class="hidden lg:block col-auto  space-y-5">
            <div class=" rounded-lg p-6 self-start bg-primary-900 bg-opacity-20 ">
                <div class="w-full space-y-8">

                    <div>
                    
                        <div class="flex items-center gap-x-2   text-primary-950 font-bold">
                            <!-- <svg class="h-5 w-5  fill-primary-900 " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M249.6 471.5c10.8 3.8 22.4-4.1 22.4-15.5l0-377.4c0-4.2-1.6-8.4-5-11C247.4 52 202.4 32 144 32C93.5 32 46.3 45.3 18.1 56.1C6.8 60.5 0 71.7 0 83.8L0 454.1c0 11.9 12.8 20.2 24.1 16.5C55.6 460.1 105.5 448 144 448c33.9 0 79 14 105.6 23.5zm76.8 0C353 462 398.1 448 432 448c38.5 0 88.4 12.1 119.9 22.6c11.3 3.8 24.1-4.6 24.1-16.5l0-370.3c0-12.1-6.8-23.3-18.1-27.6C529.7 45.3 482.5 32 432 32c-58.4 0-103.4 20-123 35.6c-3.3 2.6-5 6.8-5 11L304 456c0 11.4 11.7 19.3 22.4 15.5z"/></svg> -->
                            <svg class="h-4 w-4  fill-primary-950" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M40 48C26.7 48 16 58.7 16 72l0 48c0 13.3 10.7 24 24 24l48 0c13.3 0 24-10.7 24-24l0-48c0-13.3-10.7-24-24-24L40 48zM192 64c-17.7 0-32 14.3-32 32s14.3 32 32 32l288 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L192 64zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32l288 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-288 0zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32l288 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-288 0zM16 232l0 48c0 13.3 10.7 24 24 24l48 0c13.3 0 24-10.7 24-24l0-48c0-13.3-10.7-24-24-24l-48 0c-13.3 0-24 10.7-24 24zM40 368c-13.3 0-24 10.7-24 24l0 48c0 13.3 10.7 24 24 24l48 0c13.3 0 24-10.7 24-24l0-48c0-13.3-10.7-24-24-24l-48 0z"/></svg>
                            انتشارات
                            <div class="grow border-t border-dashed border-primary-800"></div>
                        </div>

                        <div class="space-y-2 mt-3 text-primary-950 h-64 overflow-y-auto">
                            <div v-for="publisher in publishers.data" class="flex items-center gap-x-2">
                                <input @click="handleFilter({publisher_id: publisher.id})" :id="publisher.id" name="publisher" type="radio">
                                <label class="text-sm" :for="publisher.id">{{ publisher.name }}</label>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <!-- <BookFilterPublisher @update-publisher="handlePublisherChange"/>
            <BookFilterAuthor @update-author="handleAuthorChange"/> -->
        </div>

        <!-- <div class="lg:hidden col-span-full mb-5  space-y-5">

            <button @click="showFilter = !showFilter" type="button" class="flex items-center justify-center btn-custom-2 text-sm">
                <svg class="h-4 w-4 ml-2 fill-primary-900 opacity-70" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M3.9 54.9C10.5 40.9 24.5 32 40 32l432 0c15.5 0 29.5 8.9 36.1 22.9s4.6 30.5-5.2 42.5L320 320.9 320 448c0 12.1-6.8 23.2-17.7 28.6s-23.8 4.3-33.5-3l-64-48c-8.1-6-12.8-15.5-12.8-25.6l0-79.1L9 97.3C-.7 85.4-2.8 68.8 3.9 54.9z"/></svg>
                فیلتر نتایج
            </button>

            <template v-if="showFilter">
                <BookFilterPublisher @update-publisher="handlePublisherChange"/>
                <BookFilterAuthor @update-author="handleAuthorChange"/>
            </template>
        </div> -->

        <div  class="col-span-5 lg:col-span-4 ">

            <template v-if="books.data.length != 0">
                <div class="lg:pb-4 flex justify-between  mb-1 ">
                    <span class="hidden lg:block text-gray-700 font-bold text-xl">مرتب سازی بر اساس :</span>
                    <div class="flex self-start mx-auto lg:mx-0 gap-x-2  w-full lg:w-auto">
                        <button @click="handleFilter({sort_by: 'latest'})" class="btn-custom-2 text-sm grow">جدید ترین</button>
                        <button @click="handleFilter({sort_by: 'best_seller'})" class="btn-custom-2 text-sm grow">پرفروش ترین</button>
                        <button @click="handleFilter({sort_by: 'cheapest'})" class="btn-custom-2 text-sm grow">ارزان ترین</button>
                        <button @click="handleFilter({sort_by: 'most_expensive'})" class="btn-custom-2 text-sm grow">گران ترین</button>
                    </div>
                </div>

            
                <div class=" grid grid-cols-2  md:grid-cols-3 lg:grid-cols-4  justify-center gap-3 lg:gap-4 mt-6 ">
                    <BookCover v-for="book in books.data" :key="book.id" :book="book"/>
                </div>

                <div class="flex  justify-center items-center gap-x-1 lg:gap-x-2 mt-10 lg:mt-16 ">
                    <template v-for="page_number in books.pagination.lastPage" >
                        <button @click="handleFilter({page: page_number})" type="button" class="rounded-lg py-2 px-3.5 text-sm text-primary-950 bg-primary-700 bg-opacity-20">{{ page_number }}</button>
                    </template>
                </div>
            </template>

            

            <div v-else>
                <div>
                    <h3 class="text-center mt-24 text-lg font-bold">محصولی یافت نشد</h3>
                </div>
            </div>


           
            

            <!-- <div v-if="totalPages > 1" class="flex  justify-center items-center gap-x-1 lg:gap-x-2 mt-10 lg:mt-16 ">
                <LazyUtilsPagination  :totalPages="totalPages" :currentPage="currentPage" :sortBy="sortBy" />
            </div> -->

        </div>

    </div>
</template>