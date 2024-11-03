export const apiGanerator = async(api_url, method, credentials, body)=>{

    const fetchApi = await fetch(`${import.meta.env.VITE_API_URL}${import.meta.env.VITE_SERVER_PORT || ''}/api/${api_url}`,{
        method: method,
        "Access-Control-Allow-Origin": "*",
        credentials: credentials ? 'include' : 'omit',
        body: body ? JSON.stringify(body) : undefined,
        headers: {
            'Content-Type': 'application/json',
        }
    })

    return fetchApi;


}

