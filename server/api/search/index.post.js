export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const { public: { apiBase } } = useRuntimeConfig()

    try {
        const data = await $fetch(`${apiBase}/books/search`, {
            method: 'POST',
            params:{include_details:true},
            body: body,
            headers: {
                'Accept': 'application/json',
            }
        });

        return data.data;
    } catch (error) {
        return error
    }
})