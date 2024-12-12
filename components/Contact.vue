<script setup>
const { public:{apiBase} } = useRuntimeConfig();


const isLoading = ref(false)
const errors = reactive({})
const form = reactive({
    email: "",
    subject: "",
    text: "",
})

async function submit(){
    isLoading.value = true
    Object.keys(errors).forEach(key => delete errors[key])
    try {
        const response = await $fetch(`${apiBase}/contact-us`, {
            method: 'POST',
            body: form
        })
        push.success('پیام شما با موفقیت ثبت شد.')
    } catch (error) {
        console.log(error.data.errors)
        Object.assign(errors, error.data.errors)
        // errors.value = Object.values(error.data.errors).flat() 
    } finally {
        isLoading.value = false
    }
}
</script>

<template>
    <div class="grid grid-cols-2 gap-x-8"> 

        <h2 class="col-span-full text-primary-950  font-bold lg:text-xl mb-3 ">تماس با ما</h2>

        <section>
            <div class="  mx-auto max-w-screen-md">
               
                <!-- <p class="mb-8 lg:mb-16 font-light text-center text-gray-500  sm:text-xl">Got a technical issue? Want to send feedback about a beta feature? Need details about our Business plan? Let us know.</p> -->
                
                <div v-if="errors.length > 0" class="bg-red-200">
                    <ul>
                        <li v-for="error in errors">{{ error }}</li>
                    </ul>
                </div>
                <form @submit.prevent="submit" class="space-y-6">
                    <div>
                        <!-- <label for="email" class="block mb-2 text-sm font-medium text-gray-900 ">ایمیل</label> -->
                        <input v-model="form.email" type="email" id="email" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 " placeholder="ایمیل شما" >
                        <span v-if="errors.email" class="text-red-500 text-sm">{{ errors.email[0] }}</span>
                    </div>
                    <div>
                        <!-- <label for="subject" class="block mb-2 text-sm font-medium text-gray-900 ">موضوع پیام</label> -->
                        <input v-model="form.subject" type="text" id="subject" class="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 " placeholder="موضوع پیام" >
                        <span v-if="errors.subject" class="text-red-500 text-sm">{{ errors.subject[0] }}</span>
                    </div>
                    <div class="sm:col-span-2">
                        <!-- <label for="message" class="block mb-2 text-sm font-medium text-gray-900 ">متن پیام</label> -->
                        <textarea v-model="form.text" id="message" rows="6" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 " placeholder="متن پیام"></textarea>
                        <span v-if="errors.text" class="text-red-500 text-sm">{{ errors.text[0] }}</span>
                    </div>
                    <button type="submit" class="mx-auto flex w-full items-center justify-center py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-primary-700 sm:w-fit hover:bg-primary-800 duration-200 ">
                        <UtilsLoading v-if="isLoading" class="ml-3"/>
                        ارسال پیام
                    </button>
                </form>
            </div>
        </section>

        <section>
            <iframe 
            class="rounded-lg"
            width="100%"
            height="350" 
            src="https://www.openstreetmap.org/export/embed.html?bbox=51.3387680053711%2C35.66580395271919%2C51.433782577514656%2C35.72129098165948&amp;layer=mapnik&amp;marker=35.69355229264128%2C51.38627529144287" >
            </iframe>
        </section>

    </div>
</template>