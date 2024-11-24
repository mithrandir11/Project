<script setup>
const props = defineProps(['address','refresh'])

const showEditAddressForm = ref(false)
const isLoading = ref(false)

async function handleEdit(form) {
    // console.log(form)
    isLoading.value = true

    try {
        await $fetch('/api/profile/addresses/edit',{
            method: 'POST',
            body: {...form, address_id: props.address.id}
        })
        push.success('آدرس شما با موفقیت بروزرسانی شد')
        props.refresh()
    } catch (error) {
        console.log(error.data.data.message)
        
    }finally{
        isLoading.value = false
    }
    
}
</script>
<template>

    <button @click="showEditAddressForm = !showEditAddressForm"  type="button" class=" btn-custom inline-flex  items-center gap-x-1  text-sm">
        ویرایش
        <svg class="w-4 h-4 fill-gray-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152L0 424c0 48.6 39.4 88 88 88l272 0c48.6 0 88-39.4 88-88l0-112c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 112c0 22.1-17.9 40-40 40L88 464c-22.1 0-40-17.9-40-40l0-272c0-22.1 17.9-40 40-40l112 0c13.3 0 24-10.7 24-24s-10.7-24-24-24L88 64z"/></svg>
    </button>
     <!-- <button @click="showEditAddressForm = !showEditAddressForm" type="button" class=" border-b pb-1  text-sm mb-6">ایجاد آدرس جدید +</button> -->

    <div class="w-full  mt-6">
        <FormKit v-if="showEditAddressForm"  type="form" @submit="handleEdit" :actions="false" :incomplete-message="false" >
        <div  class="grid grid-cols-2 gap-6" >

            <FormKit type="text" name="recipient_name" id="recipient_name" label="نام گیرنده" 
            label-class="block mb-2 text-sm font-medium text-gray-900 " 
            input-class="border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            validation="required"
            :validation-messages="{required: 'فیلد نام گیرنده الزامی است'}"
            messages-class="text-red-500 text-sm"
            :value="props.address.recipient_name"
            />

            <FormKit type="number" name="cellphone" id="cellphone" label="شماره تماس" 
            label-class="block mb-2 text-sm font-medium text-gray-900 " 
            input-class="border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            :validation="[['required'],['matches',/^(\+98|0)?9\d{9}$/]]"
            :validation-messages="{required: 'فیلد شماره تماس الزامی است', matches: 'فیلد شماره تماس نامعتبر است'}"
            messages-class="text-red-500 text-sm"
            :value="props.address.cellphone"
            />

            <FormKit type="text" name="state" id="state" label="استان" 
            label-class="block mb-2 text-sm font-medium text-gray-900 " 
            input-class="border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            validation="required"
            :validation-messages="{required: 'فیلد استان الزامی است'}"
            messages-class="text-red-500 text-sm"
            :value="props.address.state"
            />

            <FormKit type="text" name="city" id="city" label="شهر" 
            label-class="block mb-2 text-sm font-medium text-gray-900 " 
            input-class="border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            validation="required"
            :validation-messages="{required: 'فیلد شهر الزامی است'}"
            messages-class="text-red-500 text-sm"
            :value="props.address.city"
            />

            <FormKit type="text" name="postal_code" id="postal_code" label="کدپستی" 
            label-class="block mb-2 text-sm font-medium text-gray-900 " 
            input-class="border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            validation="required"
            :validation-messages="{required: 'فیلد کدپستی الزامی است'}"
            messages-class="text-red-500 text-sm"
            :value="props.address.postal_code"
            />

            
            <div class="col-span-full">
                <FormKit type="textarea" name="full_address" id="full_address" label="آدرس کامل" 
                label-class="block mb-2 text-sm font-medium text-gray-900 " 
                input-class="border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                validation="required"
                :validation-messages="{required: 'فیلد آدرس کامل الزامی است'}"
                messages-class="text-red-500 text-sm"
                :value="props.address.full_address"
                />
            </div>

            


            <FormKit type="submit" input-class="flex items-center justify-center text-white bg-primary-600 hover:bg-primary-700 duration-200 rounded-lg text-sm px-5 py-2.5 text-center ">
                <UtilsLoading v-if="isLoading" class="ml-3"/>
                ویرایش
            </FormKit>
        </div>
    </FormKit>
    </div>
</template>