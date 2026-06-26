import { headers } from "next/headers"
import { auth } from "../auth"
import { redirect } from "next/navigation";

/**
 * 
 * @returns {Promise<Object|null>} 
 */
export const getUserSession = async () => {
    try {
        const sessionData = await auth.api.getSession({
            headers: await headers()
        })

        if (!sessionData) return null;

        return {
            ...sessionData.user,       
            sessionInfo: sessionData.session 
        };
    } catch (error) {
        console.error("Error fetching user session:", error);
        return null;
    }
}

export const requireRole = async (role) => {
    const user = await getUserSession();
    console.log('user', user);
    if(user?.role !== role) {
        console.log('user role', role?.role);
       return redirect('/unauthorized')
    }
}