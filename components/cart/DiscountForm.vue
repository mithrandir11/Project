<script setup>
const props = defineProps(['coupon'])
const code = ref('')
const isLoading = ref(false)

async function checkCoupon(){
    if(code.value === '' || code.value === null){
        push.error('وارد کردن کد تخفیف الزامی است')
        return
    }

    isLoading.value = true

    try {
        const data = await $fetch('/api/cart/checkCoupon',{
            method: 'POST',
            body: {code: code.value}
        })
        push.success('کد تخفیف با موفقیت اعمال شد')
        
        props.coupon.code = code.value
        props.coupon.percent = data.discount_percentage
        // console.log(data)
    } catch (error) {
        push.error(error.data.data.message)
        // console.log(error.data.data.message)
        
    }finally{
        isLoading.value = false
    }
}
</script>
<template>
    <div class="space-y-4 rounded-lg border  bg-white p-4 shadow-sm  sm:p-6">
        <div class="space-y-4">
            <div>
                <label for="voucher" class="mb-2 block text-sm font-medium text-gray-900 ">آیا کد تخفیف یا کارت هدیه دارید؟</label>
                <input v-model="code" type="text" id="voucher" class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500    " placeholder="" required />
                
            </div>


            <!-- <div v-if="discountCodeApplied" class="text-sm flex justify-between bg-green-200 p-2.5 rounded-lg">
                <span class="text-green-600">کد {{ discountCodeApplied }} اعمال شد</span>
                <span @click="removeDiscountCode" class="text-red-600 cursor-pointer">حذف</span>
            </div> -->
            
            <button @click="checkCoupon" :disabled="isLoading" type="button" class="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none">
                <UtilsLoading v-if="isLoading" class="ml-3"/>
                اعمال کد
            </button>
        </div>
    </div>
</template>