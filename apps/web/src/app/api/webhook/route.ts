import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { adminDb } from '@nidalum/firebase';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_mock', {
  apiVersion: '2026-06-24.dahlia'
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: Request) {
  try {
    const body = await request.text();
    const signature = request.headers.get('stripe-signature');

    if (!signature) {
      return NextResponse.json({ error: 'Signature Stripe manquante' }, { status: 400 });
    }

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err: any) {
      console.error(`Webhook signature verification failed: ${err.message}`);
      return NextResponse.json({ error: 'Signature invalide' }, { status: 400 });
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      
      const guardianId = session.metadata?.guardianId;
      const email = session.customer_details?.email;

      if (guardianId && email) {
        console.log(`Paiement réussi pour Guardian ID: ${guardianId}`);

        // Update Firestore user status
        const usersRef = adminDb.collection('founders');
        const snapshot = await usersRef.where('guardianId', '==', guardianId).get();

        if (!snapshot.empty) {
          const doc = snapshot.docs[0];
          await doc.ref.update({
            status: 'active_founder',
            stripeSessionId: session.id,
            paymentDate: new Date().toISOString()
          });
        }
      }
    }

    return NextResponse.json({ received: true }, { status: 200 });

  } catch (error) {
    console.error('Stripe Webhook Error:', error);
    return NextResponse.json({ error: 'Erreur interne du serveur.' }, { status: 500 });
  }
}
