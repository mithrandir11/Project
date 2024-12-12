<script setup>
const page = ref(0);
const {data, refresh} = await useFetch(() => '/api/profile/orders', {
    query:{page},
    headers: useRequestHeaders(['cookie'])
})

// console.log(data.value)

function paginate(number){
    console.log('sdf')
    page.value = number
    refresh()
}
</script>
<template>
     <div v-if="data.data.length > 0"  class="w-full" >
        <div class="relative overflow-x-auto  sm:rounded-lg">
            <table class="w-full text-sm  text-gray-500 ">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50  ">
                    <tr>
                       
                        <th scope="col" class="px-6 py-3">
                            شماره سفارش
                        </th>
                        <th scope="col" class="px-6 py-3">
                            آدرس
                        </th>
                        <th scope="col" class="px-6 py-3">
                            وضعیت
                        </th>
                        <th scope="col" class="px-6 py-3">
                            قیمت کل
                        </th>
                        <th scope="col" class="px-6 py-3">
                            تعداد محصول
                        </th>
                        <th scope="col" class="px-6 py-3">
                            مبلغ تخفیف
                        </th>
                        <th scope="col" class="px-6 py-3">
                            تاریخ
                        </th>
                      
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="order in data.data" :key="order.id" class="bg-white border-b  hover:bg-gray-50 ">
                      
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                            {{ order.id }}
                        </th>
                        <td class="px-6 py-4">
                            {{ order.address }}
                        </td>
                        <td class="px-6 py-4" :class="{'text-green-500' : order.status == 'پرداخت شده'}">
                            {{ order.status }}
                        </td>
                        <td class="px-6 py-4">
                            {{ numberFormat(order.total_amount) }}
                        </td>
                        <td class="px-6 py-4 flex gap-x-2">
                            {{ order.items.length }}  <ProfileOrdersItemModal :items="order.items"/> 
                        </td>
                        <td class="px-6 py-4">
                            {{ numberFormat(order.discount_amount) }}
                        </td>
                        <td class="px-6 py-4">
                            {{ order.created_at }}
                        </td>
                    
                    </tr>
                   
                </tbody>
            </table>
        </div>

        <div v-if="data.pagination.lastPage > 1" class="flex  justify-center items-center gap-x-1 lg:gap-x-2 mt-10 lg:mt-16 ">
            <template v-for="page_number in data.pagination.lastPage" >
                <button @click="paginate(page_number)" type="button" class="rounded-lg py-2 px-3.5 text-sm text-primary-950 bg-primary-700 bg-opacity-20">{{ page_number }}</button>
            </template>
        </div>

    </div>

    <div v-else class=" w-full text-gray-600 text-center text-xl pt-12">موردی یافت نشد!</div>
</template>