import { stripe } from '@/lib/stripe'
import { redirect } from 'next/navigation'
import { Button } from '@heroui/react'
import { CircleCheck, ArrowRight, Envelope, ShieldCheck } from '@gravity-ui/icons'
import Link from 'next/link'

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams

  if (!session_id)
    throw new Error('Please provide a valid session_id (`cs_test_...`)')

  const session = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ['line_items', 'payment_intent']
  })

  const status = session.status
  const customerEmail = session.customer_details?.email
  const amountTotal = session.amount_total ? (session.amount_total / 100).toFixed(2) : '0.00'
  const currency = session.currency?.toUpperCase() || 'USD'

  if (status === 'open') {
    return redirect('/')
  }

  if (status === 'complete') {
    return (
      <div className="w-full min-h-screen bg-[#0B0B0F] text-zinc-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="max-w-md w-full mx-auto relative">
          
          {/* background aura */}
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* main card */}
          <div className="relative bg-zinc-950/40 border border-emerald-500/30 rounded-2xl p-6 sm:p-8 text-center shadow-[0_0_50px_-12px_rgba(16,185,129,0.15)] backdrop-blur-md">
            
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-400 mb-6 border border-emerald-500/20 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
              <CircleCheck className="w-8 h-8" />
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-100 tracking-tight">
              Payment Successful!
            </h1>
            <p className="text-zinc-400 mt-2 text-sm sm:text-base">
              Thank you for your purchase. Your account has been upgraded.
            </p>

            {/* billing summary box */}
            <div className="my-6 p-4 bg-zinc-900/50 border border-zinc-800/80 rounded-xl text-left space-y-2.5">
              <div className="flex justify-between text-xs">
                <span className="text-zinc-500">Amount Paid</span>
                <span className="font-semibold text-zinc-200">{amountTotal} {currency}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-zinc-500">Payment Status</span>
                <span className="text-emerald-400 font-medium flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Verified by Stripe
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-8">
              A confirmation email with your official invoice has been sent to{' '}
              <span className="text-purple-400 font-medium break-all">{customerEmail}</span>.
            </p>

            <hr className="border-white/5 my-6" />

            {/* action buttons */}
            <div className="space-y-3">
              {/* FIXED: Using Next.js Link directly around the Button to prevent Server-to-Client function pass error */}
              <Link href="/dashboard" className="block w-full">
                <Button
                  className="w-full py-6 bg-purple-600 hover:bg-purple-700 text-white font-bold text-sm rounded-xl transition duration-200 flex items-center justify-center gap-2 shadow-lg shadow-purple-600/20"
                >
                  Go to Dashboard
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>

          </div>
        </div>
      </div>
    )
  }
}