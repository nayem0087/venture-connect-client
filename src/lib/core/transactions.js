import { serverFetch } from "../core/server"

export const getTransactions = async (filters = {}) => {
    const params = new URLSearchParams(filters).toString();
    const query = params ? `?${params}` : '';
    return serverFetch(`/api/transactions${query}`)
}