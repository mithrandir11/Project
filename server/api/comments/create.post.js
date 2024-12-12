export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const { public: { apiBase } } = useRuntimeConfig();
    const token = getCookie(event, 'token')

    const url = `${apiBase}/${body.commentableType}/${body.commentableId}/comments/create`
    try {
        const data = await $fetch(url, {
            method: 'POST',
            body: {
                body: body.body
            },
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