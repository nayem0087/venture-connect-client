import { serverFetch } from "../core/server"

export const getPlanById = async (planId) => {
    // FIXED: Added "=" after plan_id
    return serverFetch(`/api/plan?plan_id=${planId}`)
}