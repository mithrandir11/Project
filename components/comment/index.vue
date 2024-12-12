<script setup>
import { useAuthStore } from '~/store/auth';
import { reset } from '@formkit/core';

const props = defineProps(['comments','commentableType','commentableId'])
// const body = ref('')
const isLoading = ref(false)

const auth = useAuthStore();

async function handleCreateComment(form) {
    isLoading.value = true
    try {
        if(auth.user){
            await $fetch('/api/comments/create',{
                method: 'POST',
                body: {
                    body: form.body,
                    commentableType: props.commentableType,
                    commentableId: props.commentableId,
                }
            })
            push.success('نظر شما ثبت شد و پس از بازبینی منتشر میشود')
            reset('createComment');
        }else{
            push.error('برای ثبت نظر وارد حساب خود شوید')   
        }
       
    } catch (error) {
        console.log(error.data.data.message)
    }finally{
        isLoading.value = false
    }
}
</script>
<template>
    <section class="bg-white   antialiased">
        <div>

            <FormKit id="createComment" type="form" @submit="handleCreateComment" :actions="false" :incomplete-message="false">
                <div class="mb-6 space-y-4">

                    <FormKit type="textarea" name="body" id="body" label="متن نظر" 
                    label-class="hidden " 
                    placeholder="نوشتن نظر..."
                    rows="5"
                    input-class="border max-w-2xl w-full border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block  p-2.5"
                    validation="required"
                    :validation-messages="{required: 'فیلد متن نظر الزامی است'}"
                    messages-class="text-red-500 text-sm"
                    />

                    <FormKit type="submit" input-class="flex  items-center justify-center text-white bg-primary-600 hover:bg-primary-700 duration-200 rounded-lg text-sm px-5 py-2.5 text-center ">
                        <UtilsLoading v-if="isLoading" class="ml-3"/>
                        ارسال نظر
                    </FormKit>

                </div>
            </FormKit>

            <article v-for="comment in props.comments" class="py-6 text-base bg-white rounded-lg ">
                <div class="flex justify-between items-center mb-2">
                    <div class="flex items-center">
                        <p class="inline-flex items-center ml-3 text-sm text-gray-900  font-semibold"><img
                                class="ml-2 w-8 h-8 rounded-full"
                                src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                                alt="Michael Gough">{{ comment.user }}</p>
                        <p class="text-sm text-gray-600 ">
                            <time pubdate datetime="2022-02-08" title="February 8th, 2022">{{ comment.created_at }}</time>
                        </p>
                    </div>
                    <button id="dropdownComment1Button" data-dropdown-toggle="dropdownComment1"
                        class="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500  bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50   "
                        type="button">
                        <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                            <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"/>
                        </svg>
                        <span class="sr-only">Comment settings</span>
                    </button>
                    

                    <div id="dropdownComment1"
                        class="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow  ">
                        <ul class="py-1 text-sm text-gray-700 "
                            aria-labelledby="dropdownMenuIconHorizontalButton">
                            <li>
                                <a href="#"
                                    class="block py-2 px-4 hover:bg-gray-100 ">Edit</a>
                            </li>
                            <li>
                                <a href="#"
                                    class="block py-2 px-4 hover:bg-gray-100 ">Remove</a>
                            </li>
                            <li>
                                <a href="#"
                                    class="block py-2 px-4 hover:bg-gray-100 ">Report</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <p class="text-gray-500 ">{{ comment.body }}</p>
               
            </article>
          
        </div>
    </section>
</template>