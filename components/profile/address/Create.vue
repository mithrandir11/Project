<script setup>
import { reset } from '@formkit/core';

const props = defineProps(['refresh'])
const showCreateAddressForm = ref(false)
const isLoading = ref(false)

async function handleCreate(form) {
    console.log(form)
    isLoading.value = true

    try {
        await $fetch('/api/profile/addresses/create',{
            method: 'POST',
            body: form
        })
        push.success('آدرس شما با موفقیت ایجاد شد')
        reset('createAddress');
        props.refresh()
    } catch (error) {
        console.log(error.data.data.message)
        
    }finally{
        isLoading.value = false
    }
    
}
</script>
<template>
     <button @click="showCreateAddressForm = !showCreateAddressForm" type="button" class=" border-b pb-1  text-sm mb-6">ایجاد آدرس جدید +</button>

    <FormKit v-if="showCreateAddressForm" id="createAddress" type="form" @submit="handleCreate" :actions="false" :incomplete-message="false" >
        <div  class="grid grid-cols-2 gap-6" >

            <FormKit type="text" name="recipient_name" id="recipient_name" label="نام گیرنده" 
            label-class="block mb-2 text-sm font-medium text-gray-900 " 
            input-class="border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            validation="required"
            :validation-messages="{required: 'فیلد نام گیرنده الزامی است'}"
            messages-class="text-red-500 text-sm"
            />

            <FormKit type="number" name="cellphone" id="cellphone" label="شماره تماس" 
            label-class="block mb-2 text-sm font-medium text-gray-900 " 
            input-class="border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            :validation="[['required'],['matches',/^(\+98|0)?9\d{9}$/]]"
            :validation-messages="{required: 'فیلد شماره تماس الزامی است', matches: 'فیلد شماره تماس نامعتبر است'}"
            messages-class="text-red-500 text-sm"
            />

            <FormKit type="text" name="state" id="state" label="استان" 
            label-class="block mb-2 text-sm font-medium text-gray-900 " 
            input-class="border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            validation="required"
            :validation-messages="{required: 'فیلد استان الزامی است'}"
            messages-class="text-red-500 text-sm"
            />

            <FormKit type="text" name="city" id="city" label="شهر" 
            label-class="block mb-2 text-sm font-medium text-gray-900 " 
            input-class="border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            validation="required"
            :validation-messages="{required: 'فیلد شهر الزامی است'}"
            messages-class="text-red-500 text-sm"
            />

            <FormKit type="text" name="postal_code" id="postal_code" label="کدپستی" 
            label-class="block mb-2 text-sm font-medium text-gray-900 " 
            input-class="border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            validation="required"
            :validation-messages="{required: 'فیلد کدپستی الزامی است'}"
            messages-class="text-red-500 text-sm"
            />

            
            <div class="col-span-full">
                <FormKit type="textarea" name="full_address" id="full_address" label="آدرس کامل" 
                label-class="block mb-2 text-sm font-medium text-gray-900 " 
                input-class="border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                validation="required"
                :validation-messages="{required: 'فیلد آدرس کامل الزامی است'}"
                messages-class="text-red-500 text-sm"
                />
            </div>

            


            <FormKit type="submit" input-class="flex items-center justify-center text-white bg-primary-600 hover:bg-primary-700 duration-200 rounded-lg text-sm px-5 py-2.5 text-center ">
                <UtilsLoading v-if="isLoading" class="ml-3"/>
                ایجاد
            </FormKit>
        </div>
    </FormKit>
</template>