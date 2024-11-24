<script setup>
const form = reactive({
    email: '',
    password: '',
})
const isLoading = ref(false)
const { authUser } = useAuth()

async function handleLogin() {
    isLoading.value = true

    if(form.email === '' || form.password === ''){
        push.error('تمام موارد الزامی است')
    }

    try {
        const user = await $fetch('/api/auth/login',{
            method: 'POST',
            body: form
        })

        authUser.value = user
        push.success('شما با موفقیت وارد شدید')
        return navigateTo('/')
    } catch (error) {
        console.log(error.data.data.message)
        
    }finally{
        isLoading.value = false
    }
    
}
</script>

<template>
    <section class="container mx-auto mt-8 lg:mt-16 ">
        <!-- <div class="text-left">
            <NuxtLink :to="{name: 'home'}" class="inline-flex items-center gap-x-1 btn-custom ">
                بازگشت
                <svg class="h-3 w-3 fill-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"/></svg>
            </NuxtLink>
        </div> -->
    
        <div class="flex flex-wrap  items-center justify-center gap-x-14 lg:px-6 lg:py-16 mx-auto border ">
            <div class="  w-full sm:max-w-md p-3  ">
                <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl text-center">
                        ورود به حساب کاربری
                    </h1>

                    <form @submit.prevent="handleLogin" class="space-y-4 md:space-y-6" >
                        <div>
                            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 ">ایمیل</label>
                            <input type="email" v-model="form.email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5    " placeholder="name@company.com" >
                            <!-- <span v-if="errors?.email" class="text-red-500 text-sm">{{ errors.email }}</span> -->
                        </div>
                        <div>
                            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 ">رمز عبور</label>
                            <input type="password" v-model="form.password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5    " >
                            <!-- <span v-if="errors?.password" class="text-red-500 text-sm">{{ errors.password }}</span> -->
                        </div>

                        <button type="submit" class="flex w-full items-center justify-center text-white bg-primary-600 hover:bg-primary-700 duration-200 rounded-lg text-sm px-5 py-2.5 text-center  ">
                            <UtilsLoading v-if="isLoading" class="ml-3"/>
                            ورود
                        </button>
                        <p class="text-sm font-light text-gray-500 ">
                            هنوز ثبت نام نکرده اید؟ <NuxtLink  class="font-medium text-primary-600 hover:underline ">ساخت حساب</NuxtLink>
                        </p>
                    </form>
                    
                </div>
            </div>
            <div>
                <img class="h-40 lg:h-auto" src="/images/bg_book.jpg" alt="">
            </div>
        </div>
    </section>
</template>