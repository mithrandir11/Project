import { useAuthStore } from "~/store/auth";

export default defineNuxtRouteMiddleware(() => {
    // const { authUser } = useAuth();

    const auth = useAuthStore();

    if (auth.user) {
        return navigateTo('/')
    }
})