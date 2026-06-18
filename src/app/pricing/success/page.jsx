import { subscribeToPremium } from '@/lib/actions/payment'
import { auth } from '@/lib/auth'
import { stripe } from '@/lib/stripe'
import { Envelope } from '@gravity-ui/icons'
import { Button, Card } from '@heroui/react'
import { ArrowRight, CircleCheck, ShieldCheck, ShoppingBag } from 'lucide-react'
import { headers } from 'next/headers'
import Link from 'next/link'
import { redirect } from 'next/navigation'


export default async function Success({ searchParams }) {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    const user = session?.user;

  const { session_id } = await searchParams

  if (!session_id)
    throw new Error('Please provide a valid session_id (`cs_test_...`)')

  const {
    status,
    metadata,
    customer_details: { email: customerEmail }
  } = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ['line_items', 'payment_intent']
  })

  if (status === 'open') {
    return redirect('/')
  }

  if (status === 'complete') {
    await subscribeToPremium({...metadata, sessionId: session_id})

    return (
      <main className="w-full min-h-screen bg-slate-50 text-zinc-800 pt-32 pb-16 px-4 relative overflow-hidden flex flex-col items-center justify-center">
        
        {/* 🌌 Background Decorative Mesh Blurs (Light Theme Soft Tones) */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-indigo-500/10 rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute bottom-10 -left-10 w-[300px] h-[300px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-xl w-full mx-auto relative z-10">
          <Card className="w-full bg-white border border-zinc-200/80 p-8 sm:p-10 rounded-[24px] text-center shadow-xl shadow-indigo-500/5 flex flex-col items-center">
            
            {/* 🌟 Animated Success Badge Indicator */}
            <div className="w-16 h-16 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 mb-6 relative shadow-xs">
              <CircleCheck size={32} />
              <span className="absolute inset-0 rounded-full border border-indigo-500/20 animate-ping opacity-30 scale-110" />
            </div>

            {/* Header Content */}
            <div className="space-y-2 mb-8">
              <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full shadow-2xs">
                Payment Received
              </span>
              <h1 className="text-3xl font-extrabold text-zinc-900 tracking-tight pt-2">
                Lifetime Access Activated!
              </h1>
              <p className="text-sm text-zinc-500 max-w-sm mx-auto">
                Thank you for your order. Your AI Prompt Platform account configuration has been securely upgraded.
              </p>
            </div>

            <hr className="w-full border-zinc-100 mb-6" />

            {/* Informational Message Grid */}
            <div className="w-full text-left bg-zinc-50/50 border border-zinc-200/60 rounded-xl p-5 space-y-3.5 mb-8">
              <div className="flex items-start gap-3 text-sm">
                <Envelope size={18} className="text-indigo-600 mt-0.5 shrink-0" />
                <p className="text-zinc-600 leading-relaxed">
                  A confirmation billing receipt with activation summary will be dispatched shortly to:{' '}
                  <span className="text-zinc-900 font-semibold underline decoration-indigo-500/40 underline-offset-4 break-all">
                    {customerEmail}
                  </span>
                </p>
              </div>

              <div className="flex items-start gap-3 text-sm pt-3 border-t border-zinc-200/40">
                <ShieldCheck size={18} className="text-zinc-400 mt-0.5 shrink-0" />
                <p className="text-zinc-500 text-xs leading-relaxed">
                  Have questions about parameters integration? Ping our priority platform response team anytime via{' '}
                  <a 
                    href="mailto:orders@example.com" 
                    className="text-indigo-600 font-medium hover:text-indigo-500 underline transition-all"
                  >
                    orders@example.com
                  </a>
                </p>
              </div>
            </div>

            {/* Navigation Flow Controls (Safe Button-Link Wrapper Strategy) */}
            <div className="flex flex-col sm:flex-row gap-3 w-full mt-2">
              <Link href="/jobs" className="w-full">
                <Button
                  variant="bordered"
                  className="w-full h-11 border-zinc-200 bg-transparent text-zinc-700 hover:bg-zinc-50 hover:text-zinc-900 rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-2"
                >
                  <ShoppingBag size={14} />
                  Explore Prompts
                </Button>
              </Link>
              <Link href={`/dashboard/${user?.role}`} className="w-full">
                <Button
                  color="primary"
                  className="w-full h-11 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-semibold tracking-wide transition-all shadow-lg shadow-indigo-500/10 flex items-center justify-center gap-1.5"
                >
                  Go to Dashboard
                  <ArrowRight size={14} />
                </Button>
              </Link>
            </div>

          </Card>
        </div>
      </main>
    )
  }
}