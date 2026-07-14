import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_mock', {
  apiVersion: '2026-06-24.dahlia' // Always use a valid API version
});

export async function POST(request: Request) {
  try {
    const { guardianId, email } = await request.json();

    if (!guardianId) {
      return NextResponse.json({ error: 'Guardian ID manquant' }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      customer_email: email,
      metadata: {
        guardianId: guardianId
      },
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: 'NIDALUM Founder Library',
              description: 'Édition Fondatrice Limitée. Founder Access Included.',
              images: ['https://nidalumuniverse.com/images/grimoire_front.png'],
            },
            unit_amount: 9900, // 99.00 EUR
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/merci?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/`,
    });

    return NextResponse.json({ url: session.url }, { status: 200 });

  } catch (error) {
    console.error('Stripe Checkout Error:', error);
    return NextResponse.json({ error: 'Erreur lors de la création de la session Stripe.' }, { status: 500 });
  }
}
