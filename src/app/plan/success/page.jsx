import { stripe } from '@/lib/stripe';
import { redirect } from 'next/navigation';
import { Button } from '@heroui/react';
import { CircleCheck, ArrowRight, ShieldCheck } from '@gravity-ui/icons';
import Link from 'next/link';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

async function savePaymentToDB(paymentData) {
    try {
        const res = await fetch(`${BACKEND_URL}/api/payments`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(paymentData),
            cache: 'no-store'
        });
        return res.ok;
    } catch (error) {
        console.error("Database save failed:", error);
        return false;
    }
}

async function upgradeToPremium(email) {
    try {
        const res = await fetch(`${BACKEND_URL}/api/users/upgrade`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email }),
            cache: 'no-store'
        });
        return res.ok;
    } catch (error) {
        console.error("Premium upgrade error:", error);
        return false;
    }
}

async function getUserByEmail(email) {
    try {
        const res = await fetch(`${BACKEND_URL}/api/users/${email}`, {
            cache: 'no-store'
        });
        if (!res.ok) return null;
        return await res.json();
    } catch {
        return null;
    }
}

function getDashboardUrl(role) {
    if (role === 'founder') return '/dashboard/founder/mystartup/new';
    if (role === 'collaborator') return '/dashboard/collaborator/applications';
    return '/dashboard';
}

function getDashboardLabel(role) {
    if (role === 'founder') return 'Post Opportunities';
    if (role === 'collaborator') return 'Go to Dashboard';
    return 'Go to Dashboard';
}

export default async function Success({ searchParams }) {
    const params = await searchParams;
    const session_id = params?.session_id;

    if (!session_id) return redirect('/');

    const session = await stripe.checkout.sessions.retrieve(session_id, {
        expand: ['line_items', 'payment_intent']
    });

    if (session.status !== 'complete') return redirect('/');

    const customerEmail = session.customer_details?.email;

    await savePaymentToDB({
        email: customerEmail,
        name: session.customer_details?.name || 'Customer',
        amount: session.amount_total ? (session.amount_total / 100).toFixed(2) : '0.00',
        transactionId: session.payment_intent?.id,
        status: 'success',
        createdAt: new Date().toISOString()
    });

    if (customerEmail) {
        await upgradeToPremium(customerEmail);
    }

    const user = customerEmail ? await getUserByEmail(customerEmail) : null;

    // FIX: don't default a failed/missing lookup to 'founder' — that was
    // silently mislabeling every collaborator (and masking the fact that
    // the lookup was failing at all). Pass the real role through; if it's
    // undefined, getDashboardUrl/getDashboardLabel already fall back to a
    // neutral '/dashboard' on their own.
    const role = user?.role;

    const amountTotal = session.amount_total ? (session.amount_total / 100).toFixed(2) : '0.00';
    const currency = session.currency?.toUpperCase() || 'USD';
    const dashboardUrl = getDashboardUrl(role);
    const dashboardLabel = getDashboardLabel(role);

    return (
        <div className="w-full min-h-screen bg-[#0B0B0F] text-zinc-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full mx-auto relative">
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl" />

                <div className="relative bg-zinc-950/40 border border-emerald-500/30 rounded-2xl p-8 text-center shadow-[0_0_50px_-12px_rgba(16,185,129,0.15)] backdrop-blur-md">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-400 mb-6 border border-emerald-500/20">
                        <CircleCheck className="w-8 h-8" />
                    </div>

                    <h1 className="text-3xl font-extrabold text-zinc-100">Payment Successful!</h1>
                    <p className="text-zinc-400 mt-2">
                        Your account has been upgraded to{" "}
                        <span className="text-amber-400 font-semibold">Premium ⚡</span>
                    </p>

                    <div className="my-6 p-4 bg-zinc-900/50 border border-zinc-800/80 rounded-xl text-left space-y-2">
                        <div className="flex justify-between text-xs">
                            <span className="text-zinc-500">Amount Paid</span>
                            <span className="font-semibold">{amountTotal} {currency}</span>
                        </div>
                        <div className="flex justify-between text-xs">
                            <span className="text-zinc-500">Payment Status</span>
                            <span className="text-emerald-400 flex items-center gap-1">
                                <ShieldCheck className="w-3.5 h-3.5" /> Verified
                            </span>
                        </div>
                        <div className="flex justify-between text-xs">
                            <span className="text-zinc-500">Plan</span>
                            <span className="text-amber-400 font-semibold">Premium (Unlimited)</span>
                        </div>
                    </div>

                    <Link href={dashboardUrl} className="block w-full">
                        <Button className="w-full py-6 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl transition flex items-center justify-center gap-2">
                            {dashboardLabel} <ArrowRight className="w-4 h-4" />
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

