// Place this file at: app/api/transactions/route.js
// This is a plain Next.js Route Handler (NOT a Server Action), so it can be
// called from the client with a normal fetch() — no RSC action wire protocol,
// no Turbopack HMR fragility with setInterval polling.

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    const status = searchParams.get('status');

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    const params = new URLSearchParams();
    if (email) params.set('email', email);
    if (status) params.set('status', status);
    const query = params.toString() ? `?${params.toString()}` : '';

    try {
        const res = await fetch(`${baseUrl}/api/transactions${query}`, {
            cache: 'no-store',
        });

        if (!res.ok) {
            return Response.json(
                { error: `Backend responded with ${res.status}` },
                { status: res.status }
            );
        }

        const data = await res.json();
        return Response.json(data);
    } catch (error) {
        console.error('Error proxying /api/transactions:', error);
        return Response.json(
            { error: 'Failed to reach backend' },
            { status: 502 }
        );
    }
}