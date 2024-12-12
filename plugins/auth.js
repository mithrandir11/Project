import { useAuthStore } from "~/store/auth";

export default defineNuxtPlugin(async (nuxtApp) => {
    // const { authUser } = useAuth();

    // try {
    //     const user = await $fetch('/api/auth/me', {
    //         method: 'GET',
    //         headers: useRequestHeaders(['cookie'])
    //     })

    //     authUser.value = user;
    // } catch (error) {
    //     authUser.value = null;
    // }


    const auth = useAuthStore();
    try {
        const data = await $fetch('/api/auth/me', {
            method: 'GET',
            headers: useRequestHeaders(['cookie'])
        })
        auth.user= data.user;
    } catch (error) {
        auth.user= null;
        auth.token= null;
    } 
})