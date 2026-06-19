
import { authClient } from "../auth-client"

const baseURL = process.env.NEXT_PUBLIC_BASE_URL 


export const addPrompt = async (data) => {
   const {data: token} = await authClient.token()
//    console.log('token: ',token);
    const res = await fetch(`${baseURL}/creator/prompts`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token?.token}`
        },
        body: JSON.stringify(data)
    })
    const result = await res.json()
    return result;
}