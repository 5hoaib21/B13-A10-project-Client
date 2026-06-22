import { headers } from "next/headers"
import { auth } from "../auth"

export const getUserSession = async () => {
    const reqHeaders = await headers()
    const session = await auth.api.getSession({
        headers: reqHeaders
    })
    return session?.user || null;
}