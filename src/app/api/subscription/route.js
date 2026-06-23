import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { stripe } from '@/lib/stripe';
import { auth } from '@/lib/auth';



export async function POST(req) {
  const request = await req.json()
  console.log('req:', request);
  try {
    const headersList = await headers()
    const origin = headersList.get('origin')
   const PRICE_ID = process.env.STRIPE_PRICE_ID;

   const userSession = await auth.api.getSession({
    headers: await headers()
   });
   const user = userSession?.user;

    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      customer_email: user?.email,
      line_items: [
        {
          // Provide the exact Price ID (for example, price_1234) of the product you want to sell
          price: PRICE_ID,
          quantity: 1,
        },
      ],
      metadata: {
        userId: user?.id,
        priceId: PRICE_ID,
        userEmail: user?.email,
        price: request?.price,
      },
      mode: 'payment',
      success_url: `${origin}/pricing/success?session_id={CHECKOUT_SESSION_ID}`,
    });
    return NextResponse.json({url :session.url})
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 }
    )
  }
}





export async function GET() {
    return NextResponse.json({ message: "Hello from Subscription API" });
}