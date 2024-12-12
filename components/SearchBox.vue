<script setup>
const isLoading = ref(false)
const query = ref('')
const books = ref([])

async function search() {
    // console.log('sdfds')
    isLoading.value = true
    try {
        const data = await $fetch('/api/search',{
            method: 'POST',
            body: {query: query.value}
        })
        books.value = data
    } catch (error) {
        console.log(error.data.data.message)
        
    }finally{
        isLoading.value = false
    }
    
}

watch(query, (newQuery) => {
    if (!newQuery) {
        books.value = [] 
    } else {
        if(query.value.length > 2){
            setTimeout(() => {
                search()
            }, 1000) 
        }
        
    }
})
</script>

<template>
    <form @submit.prevent="search"  class="w-full mx-auto">   
        <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only ">Search</label>
        <div class="relative">
            <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg class="w-4 h-4 text-gray-500 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
            </div>
            <input v-model="query" @change="search" type="text" id="default-search" class="block w-full py-2 lg:py-2.5 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg outline-none focus:border-primary-600 " placeholder="نام کتاب ، نویسنده ، مترجم ..."  />
            <!-- <button type="submit" class="absolute end-1.5 bottom-1.5 flex items-center justify-center  bg-gray-200 hover:bg-gray-300 duration-200 rounded-lg text-sm px-5 py-1 text-center ">
                <UtilsLoading v-if="isLoading" class="ml-3"/>
                جستجو
            </button> -->

            <div v-if="isLoading" class="absolute bg-white h-auto w-full  border border-t-0 mt-1 z-10  divide-y divide-dashed px-3 rounded-b-lg">
                <div  class="flex justify-center py-4 ">
                    <UtilsLoading  theme="dark"/>
                </div>
            </div>

            <div v-if="books.length > 0 && !isLoading" class="absolute bg-white h-auto w-full  border border-t-0 mt-1 z-10  divide-y divide-dashed px-3 rounded-b-lg">
                <div v-for="book in books" class="flex items-center gap-x-3 py-2 ">
                     <img class="border rounded h-16" :src="book.image" alt="">
                    <div>
                        <NuxtLink :to="{ name: 'showBook', params: { id: book.id, slug: book.slug } }" class="text-sm text-gray-800 font-bold">{{ book.title }}</NuxtLink>
                        <p class="text-xs text-gray-600">{{ book.author.name }}</p>
                    </div>
                </div>
            </div>

            <div v-if="books.length == 0 && query && !isLoading" class="absolute bg-white h-auto w-full  border border-t-0 mt-1 z-10  divide-y divide-dashed px-3 rounded-b-lg">
                <p class="text-sm text-center text-gray-600 py-3">موردی یافت نشد !</p>  
            </div>

        </div>
    </form>
</template>