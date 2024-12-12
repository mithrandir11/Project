export const useAuthStore = defineStore('auth', {
    state: () => {
        return {
            user: {},
            token: ''
        }
    },

    actions: {
        async login(form){
            try {
                const data = await $fetch('/api/auth/login',{
                    method: 'POST',
                    body: form
                })
                this.user = data.user
                this.token = data.token
                push.success('شما با موفقیت وارد شدید')
                return navigateTo('/')
            } catch (error) {
                push.error(error.data.data.message)
            }
        },

        async register(form){
            try {
                await $fetch('/api/auth/register',{
                    method: 'POST',
                    body: form
                })

                this.login(form)

            } catch (error) {
                // console.log(error.data.data.errors)
                push.error(error.data.data.message)
            }
        }
    },

})