<script setup>
// const {id} = useRoute().params
const router = useRouter()
const route = useRoute()
const query = ref({})
const { public:{apiBase} } = useRuntimeConfig();

query.value = route.query
const {data:books, refresh} = await useFetch(()=> `${apiBase}/books`, {
    query: query
})

const {data:publishers} = await useFetch(`${apiBase}/publishers`)
const {data:authors} = await useFetch(`${apiBase}/authors`)


function handleFilter(param){
    query.value = { ...route.query, ...param }

    if(!param.hasOwnProperty('page')){
        delete query.value.page
    }

    router.push({
        query: query.value 
    })

    refresh()
}

function removeFilter(paramKey) {
    const { [paramKey]: _, ...rest } = query.value;
    query.value = rest;

    delete query.value.page;

    router.push({
        query: query.value,
    });

    refresh();
}
</script>
<template>
    <div class="grid grid-cols-5 gap-x-8 my-8 ">

        <div class="hidden lg:block col-auto  space-y-8">
            <div class=" p-6 self-start  ">
                <div class="w-full space-y-6">
                    <div class="flex items-center gap-x-2   text-primary-950 font-bold">
                        <svg class="h-4 w-4  fill-primary-950" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M40 48C26.7 48 16 58.7 16 72l0 48c0 13.3 10.7 24 24 24l48 0c13.3 0 24-10.7 24-24l0-48c0-13.3-10.7-24-24-24L40 48zM192 64c-17.7 0-32 14.3-32 32s14.3 32 32 32l288 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L192 64zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32l288 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-288 0zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32l288 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-288 0zM16 232l0 48c0 13.3 10.7 24 24 24l48 0c13.3 0 24-10.7 24-24l0-48c0-13.3-10.7-24-24-24l-48 0c-13.3 0-24 10.7-24 24zM40 368c-13.3 0-24 10.7-24 24l0 48c0 13.3 10.7 24 24 24l48 0c13.3 0 24-10.7 24-24l0-48c0-13.3-10.7-24-24-24l-48 0z"/></svg>
                        انتشارات
                        <div class="grow border-t border-dashed border-primary-800"></div>
                        <button @click="removeFilter('publisher_id')" type="button" class="text-primary-950 text-xs">حذف فیلتر</button>
                    </div>

                    <div class="space-y-2 mt-3 text-primary-950 h-64 overflow-y-auto ">
                        <div v-for="publisher in publishers.data" class="flex items-center gap-x-2">
                            <input @click="handleFilter({publisher_id: publisher.id})" :id="publisher.id" name="publisher" type="radio">
                            <label class="text-sm" :for="publisher.id">{{ publisher.name }}</label>
                        </div>
                    </div>
                </div>
            </div>

            <div class=" p-6 self-start  ">
                <div class="w-full space-y-6">
                    <div class="flex items-center gap-x-2   text-primary-950 font-bold">
                        <svg class="h-4 w-4  fill-primary-950" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1 0 32c0 8.8 7.2 16 16 16l32 0zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"/></svg>
                        نویسنده
                        <div class="grow border-t border-dashed border-primary-800"></div>
                        <button @click="removeFilter('author_id')" type="button" class="text-primary-950 text-xs">حذف فیلتر</button>
                    </div>

                    <div class="space-y-2 mt-3 text-primary-950 h-64 overflow-y-auto">
                        <div v-for="author in authors.data" class="flex items-center gap-x-2">
                            <input @click="handleFilter({author_id: author.id})" :id="'author'+author.id" name="author" type="radio">
                            <label class="text-sm" :for="'author'+author.id">{{ author.name }}</label>
                        </div>
                    </div>
                </div>
            </div>
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
                <!-- <div class="lg:pb-4 flex justify-between  mb-1 ">
                    <span class="hidden lg:block text-gray-700 font-bold text-xl">مرتب سازی بر اساس :</span>
                    <div class="flex self-start mx-auto lg:mx-0 gap-x-2  w-full lg:w-auto">
                        <button @click="handleFilter({sort_by: 'latest'})" class="btn-custom-2 text-sm grow">جدید ترین</button>
                        <button @click="handleFilter({sort_by: 'best_seller'})" class="btn-custom-2 text-sm grow">پرفروش ترین</button>
                        <button @click="handleFilter({sort_by: 'cheapest'})" class="btn-custom-2 text-sm grow">ارزان ترین</button>
                        <button @click="handleFilter({sort_by: 'most_expensive'})" class="btn-custom-2 text-sm grow">گران ترین</button>
                    </div>
                </div> -->
                <div class=" grid grid-cols-2  md:grid-cols-3 lg:grid-cols-4  justify-center gap-3 lg:gap-4 mt-6 ">
                    <BookCover v-for="book in books.data" :key="book.id" :book="book"/>
                </div>

                <div v-if="books.pagination.lastPage > 1" class="flex  justify-center items-center gap-x-1 lg:gap-x-2 mt-10 lg:mt-16 ">
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
        </div>

    </div>
</template>