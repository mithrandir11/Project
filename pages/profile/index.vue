<script setup>
const isLoading = ref(false)

const {data:user} = await useFetch('/api/profile/info', {
    headers: useRequestHeaders(['cookie'])
})

async function handleEdit(form) {
    isLoading.value = true

    try {
        await $fetch('/api/profile/info/edit',{
            method: 'POST',
            body: form
        })
        push.success('اطلاعات شما با موفقیت بروزرسانی شد')
    } catch (error) {
        console.log(error.data.data.message)
        
    }finally{
        isLoading.value = false
    }
    
}
</script>

<template>
   
    <div  class="w-full" >

        <FormKit type="form" @submit="handleEdit" :actions="false" :incomplete-message="false" >

            <div  class="space-y-4 md:space-y-6 max-w-lg" >
                <FormKit type="text" name="name" id="name" label="نام و نام‌خانوادگی" 
                label-class="block mb-2 text-sm font-medium text-gray-900 " 
                input-class="border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                validation="required"
                :validation-messages="{required: 'فیلد نام الزامی است'}"
                messages-class="text-red-500 text-sm"
                :value="user.name"
                />

                <FormKit type="email" name="email" id="email" label="ایمیل" 
                label-class="block mb-2 text-sm font-medium text-gray-900 " 
                input-class="border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                validation="required|email"
                :validation-messages="{required: 'فیلد ایمیل الزامی است', email:'ایمیل نامعتبر است'}"
                messages-class="text-red-500 text-sm"
                :value="user.email"
                />

                <!-- <FormKit type="number" name="phone" id="phone" label="شماره موبایل"  disabled
                label-class="block mb-2 text-sm font-medium text-gray-900 " 
                input-class="border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                validation="required|number"
                :validation-messages="{required: 'فیلد شماره موبایل است'}"
                messages-class="text-red-500 text-sm"
                /> -->
                <div>
                    <label for="phone" class="block mb-2 text-sm font-medium text-gray-900 " >شماره موبایل</label>
                    <input type="number"  name="phone" id="phone" :value="user.cellphone" disabled class="bg-gray-100 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"  >
                </div>


                <FormKit type="submit" input-class="flex items-center justify-center text-white bg-primary-600 hover:bg-primary-700 duration-200 rounded-lg text-sm px-5 py-2.5 text-center ">
                    <UtilsLoading v-if="isLoading" class="ml-3"/>
                    ویرایش
                </FormKit>
            </div>

            
        </FormKit>

      
       
        <!-- <div>
            <label for="phone" class="block mb-2 text-sm font-medium text-gray-900 ">شماره موبایل</label>
            <input type="text"  name="phone" id="phone" class=" border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5    " placeholder="name@company.com" >
            <span v-if="errors?.email" class="text-red-500 text-sm">{{ errors.email }}</span>
        </div> -->

        <!-- <button type="submit" class="flex items-center justify-center text-white bg-primary-600 hover:bg-primary-700 duration-200 rounded-lg text-sm px-5 py-2.5 text-center  ">
            <UtilsLoading v-if="isLoading" class="ml-3"/>
            ویرایش
        </button> -->
       
    </div>

</template>