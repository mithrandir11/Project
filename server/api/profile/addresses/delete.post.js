export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const { public: { apiBase } } = useRuntimeConfig();
    const token = getCookie(event, 'token')

    try {
        const data = await $fetch(`${apiBase}/addresses/delete/${body.address_id}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        return data.data;
    } catch (error) {
        return error
    }
})