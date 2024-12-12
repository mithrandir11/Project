<script setup>
const gateway = ref('pay');
const isLoading = ref(false)

const props = defineProps(['coupon','addressId','cart'])

async function payment(){
    if(props.addressId === '' || props.addressId === null){
        push.error('انتخاب آدرس الزامی است')
        return
    }

    isLoading.value = true

    const formattedCart = props.cart.map(item => ({
        book_id: item.id,
        quantity: item.qty,
    }));

    try {
        const data = await $fetch('/api/payment/send',{
            method: 'POST',
            body: {
                items: formattedCart,
                discount_code: props.coupon.code || '',
                address_id: props.addressId,
                gateway: gateway.value,
            }
        })
        // console.log(data)
        await navigateTo(data.url, {
            external: true
        })
    } catch (error) {
        // push.error(error.data.data.message)
        // console.log(error)
    }finally{
        isLoading.value = false
    }
}
</script>
<template>
    <h2 class="lg:text-xl font-semibold text-gray-900 mt-24">انتخاب درگاه و پرداخت</h2>
    <div class="space-y-4  justify-self-start">
        <!-- <p class="text-xl font-semibold text-gray-900 text-center">انتخاب درگاه</p> -->

        <div class="space-y-4">
            <div class="flex gap-x-2 justify-center items-center  py-3 ">
            <div @click="gateway = 'pay'" :class="[gateway == 'pay' ? 'border-primary-600' : '']" class="border rounded-lg cursor-pointer">
                    <img class="w-20 h-20 p-1" src="/images/payment_logo_pay2.png" alt="">
            </div>

            <div @click="gateway = 'idpay'" :class="[gateway == 'idpay' ? 'border-primary-600' : '']" class="border rounded-lg cursor-pointer">
                    <img class="w-20 h-20 p-1" src="/images/payment_logo_idpay.png" alt="">
            </div>
            </div>
        </div>

        <button @click="payment" :disabled="isLoading" type="button" class="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none ">
            <UtilsLoading v-if="isLoading" class="ml-3"/>
            پرداخت و ثبت سفارش
        </button>

    </div>
</template>