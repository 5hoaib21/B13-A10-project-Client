import { headers } from "next/headers"
import { auth } from "../auth"

export const getUserSession = async () => {
    const reqHeaders = await headers()
    const session = await auth.api.getSession({
        headers: reqHeaders
    })
    return session?.user || null;
}



export const requireRole = async (role) => {
    const user = await getUserSession()
    if(user.role !== role){
        return redirect('/unauthorized')
    }
}