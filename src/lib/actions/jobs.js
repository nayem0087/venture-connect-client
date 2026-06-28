'use server';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

// Fetch all opportunities
export async function getAllOpportunities() {
    try {
        const res = await fetch(`${BACKEND_URL}/api/jobs`, { cache: 'no-store' });
        return await res.json();
    } catch (error) {
        return { success: false, data: [] };
    }
}

// Update an opportunity
export async function updateOpportunity(id, opportunityData) {
    try {
        const res = await fetch(`${BACKEND_URL}/api/jobs/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(opportunityData)
        });
        return await res.json();
    } catch (error) {
        return { success: false, message: "Failed to update opportunity" };
    }
}

// Delete an opportunity
export async function deleteOpportunity(id) {
    try {
        const res = await fetch(`${BACKEND_URL}/api/jobs/${id}`, {
            method: 'DELETE'
        });
        return await res.json();
    } catch (error) {
        return { success: false, message: "Failed to delete opportunity" };
    }
}

// Fetch all applications
export async function getAllApplications() {
    try {
        const res = await fetch(`${BACKEND_URL}/api/applications`, { cache: 'no-store' });
        const data = await res.json();
        return { success: true, data: Array.isArray(data) ? data : [] };
    } catch (error) {
        console.error("Action Error:", error);
        return { success: false, data: [] };
    }
}

// Update application status
export async function updateApplicationStatus(id, status) {
    try {
        const res = await fetch(`${BACKEND_URL}/api/applications/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status })
        });
        return await res.json();
    } catch (error) {
        return { success: false, message: "Failed to update status" };
    }
}

// Fetch user by email — success page এ role check এর জন্য
export async function getUserByEmail(email) {
    try {
        const res = await fetch(`${BACKEND_URL}/api/users/${email}`, {
            cache: 'no-store'
        });
        if (!res.ok) return null;
        return await res.json();
    } catch (error) {
        console.error("getUserByEmail Error:", error);
        return null;
    }
}









// 'use server';

// const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

// // Fetch all opportunities
// export async function getAllOpportunities() {
//     try {
//         const res = await fetch(`${BACKEND_URL}/api/jobs`, { cache: 'no-store' });
//         return await res.json();
//     } catch (error) {
//         return { success: false, data: [] };
//     }
// }

// // Update an opportunity
// export async function updateOpportunity(id, opportunityData) {
//     try {
//         const res = await fetch(`${BACKEND_URL}/api/jobs/${id}`, {
//             method: 'PUT',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(opportunityData)
//         });
//         return await res.json();
//     } catch (error) {
//         return { success: false, message: "Failed to update opportunity" };
//     }
// }

// // Delete an opportunity
// export async function deleteOpportunity(id) {
//     try {
//         const res = await fetch(`${BACKEND_URL}/api/jobs/${id}`, {
//             method: 'DELETE'
//         });
//         return await res.json();
//     } catch (error) {
//         return { success: false, message: "Failed to delete opportunity" };
//     }
// }

// // Fetch all applications
// export async function getAllApplications() {
//     try {
//         const res = await fetch(`${BACKEND_URL}/api/jobs-applications`, { cache: 'no-store' });
//         return await res.json();
//     } catch (error) {
//         console.error("Action Error:", error);
//         return { success: false, data: [] };
//     }
// }

// // Update application status
// export async function updateApplicationStatus(id, status) {
//     try {
//         const res = await fetch(`${BACKEND_URL}/api/jobs-applications/${id}`, {
//             method: 'PUT',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ status })
//         });
//         return await res.json();
//     } catch (error) {
//         return { success: false, message: "Failed to update status" };
//     }
// }