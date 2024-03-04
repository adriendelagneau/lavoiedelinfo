import { NextRequest, NextResponse } from 'next/server';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export const POST = async (req: NextRequest) => {

  const origin = req.headers.get('origin')
 const data = await req.json()
 
 const userEmail = data.userEmail
 const price = data.price

  try {
          // Create Checkout Sessions from body params.
          const session = await stripe.checkout.sessions.create({
            line_items: [
              {
                // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                price: price,
                quantity: 1,
              },
            ],
            mode: 'subscription',
            success_url: `${origin}/`,
            cancel_url: `${origin}/`,
            customer_email: userEmail,
          });
    console.log(session, "sesssion")
      return NextResponse.json({session})
    } catch (err) {
      return new NextResponse(JSON.stringify({ error: "Stripe error" + err }), { status: 500 });
    }
  };