<script setup>
import { useAuthStore } from '~/store/auth';

const isLoading = ref(false)
const auth = useAuthStore();

async function handleRegister(form) {
    // console.log(form)
    isLoading.value = true
    try {
        auth.register(form)
    } catch (error) {
        console.log(error.data.data.message)
    }finally{
        isLoading.value = false
    }
}
</script>

<template>
    <section class="container mx-auto mt-8 lg:mt-16 ">
        <div class="text-left">
            <NuxtLink :to="{name: 'home'}" class="inline-flex items-center gap-x-1 btn-custom ">
                بازگشت
                <svg class="h-3 w-3 fill-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"/></svg>
            </NuxtLink>
        </div>
    
        <div class="flex flex-wrap  items-center justify-center gap-x-14 lg:px-6 lg:py-16 mx-auto  ">
            <div class="  w-full sm:max-w-md p-3  ">
                <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl text-center">
                        ساخت حساب کاربری
                    </h1>

                    <FormKit type="form" @submit="handleRegister" :actions="false" :incomplete-message="false">
                        <div class="space-y-4 md:space-y-6">

                            <FormKit type="text" name="name" id="name" label="نام" 
                            label-class="block mb-2 text-sm font-medium text-gray-900 " 
                            input-class="border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                            validation="required"
                            :validation-messages="{required: 'فیلد نام الزامی است'}"
                            messages-class="text-red-500 text-sm"
                            />

                            <FormKit type="number" name="cellphone" id="cellphone" label="شماره موبایل" 
                            label-class="block mb-2 text-sm font-medium text-gray-900 " 
                            input-class="border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                            validation="required|number"
                            :validation-messages="{required: 'فیلد شماره موبایل الزامی است', number: 'فیلد شماره موبایل باید عددی باشد'}"
                            messages-class="text-red-500 text-sm"
                            />

                            <FormKit type="email" name="email" id="email" label="ایمیل" 
                            label-class="block mb-2 text-sm font-medium text-gray-900 " 
                            input-class="border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                            validation="required|email"
                            :validation-messages="{required: 'فیلد ایمیل الزامی است', email: 'فرمت فیلد ایمیل نامعتبر است'}"
                            messages-class="text-red-500 text-sm"
                            />

                            <FormKit type="password" name="password" id="password" label="رمز عبور" 
                            label-class="block mb-2 text-sm font-medium text-gray-900 " 
                            input-class="border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                            validation="required"
                            :validation-messages="{required: 'فیلد رمز عبور الزامی است'}"
                            messages-class="text-red-500 text-sm"
                            />

                            <FormKit type="password" name="password_confirm" id="password_confirm" label="تکرار رمز عبور" 
                            label-class="block mb-2 text-sm font-medium text-gray-900 " 
                            input-class="border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                            validation="required|confirm"
                            :validation-messages="{required: 'فیلد تکرار رمز عبور الزامی است', confirm: 'فیلد تکرار رمز عبور مطابقت ندارد'}"
                            messages-class="text-red-500 text-sm"
                            />


                            <FormKit type="submit" input-class="flex w-full items-center justify-center text-white bg-primary-600 hover:bg-primary-700 duration-200 rounded-lg text-sm px-5 py-2.5 text-center ">
                                <UtilsLoading v-if="isLoading" class="ml-3"/>
                                ساخت حساب
                            </FormKit>

                            <p class="text-sm font-light text-gray-500 ">
                                از قبل حساب کاربری دارید؟ <NuxtLink :to="{name:'login'}" class="font-medium text-primary-600 hover:underline ">وارد</NuxtLink> شوید
                            </p>

                        </div>

                    </FormKit>
                    
                </div>
            </div>
            <div>
                <img class="h-40 lg:h-auto" src="/images/bg_book.jpg" alt="">
            </div>
        </div>
    </section>
</template>