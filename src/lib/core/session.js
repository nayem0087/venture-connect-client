'use server'

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
    if(!user){
        redirect('/auth/signin')
    }
    if(user?.role !== role) {
       redirect('/unauthorized')
    }
    return user;
}