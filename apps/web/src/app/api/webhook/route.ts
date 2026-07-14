import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { adminDb, adminAuth } from '@nidalum/firebase';
import { Resend } from 'resend';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_mock', {
  apiVersion: '2026-06-24.dahlia'
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;
const resend = new Resend(process.env.RESEND_API_KEY || 're_dummy_key_for_build');

function generateLicenseId() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const randomStr = (len: number) => Array.from({length: len}, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  return `NDL-FL-2026-${randomStr(4)}-${randomStr(4)}`;
}

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
      
      const email = session.customer_details?.email;
      if (!email) {
         console.error('Session Stripe sans email');
         return NextResponse.json({ error: 'Email manquant' }, { status: 400 });
      }

      console.log(`Paiement réussi, traitement pour: ${email}`);

      // 1. Transaction Firestore for founderCounter
      const systemRef = adminDb.collection('system').doc('counters');
      let founderNumber = 1;
      await adminDb.runTransaction(async (t: any) => {
        const doc = await t.get(systemRef);
        if (!doc.exists) {
          founderNumber = 1;
          t.set(systemRef, { founderCounter: founderNumber });
        } else {
          founderNumber = (doc.data().founderCounter || 0) + 1;
          t.update(systemRef, { founderCounter: founderNumber });
        }
      });

      // 2. Generation of IDs
      const paddedNumber = String(founderNumber).padStart(6, '0');
      const guardianId = `GD-${paddedNumber}`;
      const licenseId = generateLicenseId();

      // 3. Firebase Auth User Creation/Retrieval
      let uid;
      try {
        const userRecord = await adminAuth.getUserByEmail(email);
        uid = userRecord.uid;
      } catch (error: any) {
        if (error.code === 'auth/user-not-found') {
          const newUser = await adminAuth.createUser({
            email,
            displayName: session.customer_details?.name || '',
          });
          uid = newUser.uid;
        } else {
          throw error;
        }
      }

      // 4. Create Users Doc
      const userRef = adminDb.collection('users').doc(uid);
      await userRef.set({
        uid: uid,
        guardianId: guardianId,
        founderNumber: founderNumber,
        email: email,
        displayName: session.customer_details?.name || '',
        language: 'fr',
        country: session.customer_details?.address?.country || '',
        createdAt: new Date(),
        lastLogin: null,
        lastPurchase: new Date(),
        lastSeen: null,
        marketingConsent: false,
        analyticsConsent: true,
        emailVerified: false,
        provider: "magic_link",
        products: ['PRD_001'], // dynamic product ID reference
        entitlements: {
          library: { active: true, since: new Date(), lifetime: true },
          music: { active: true, since: new Date(), lifetime: true },
          downloads: { active: true, since: new Date(), lifetime: true },
          reader: { active: true, since: new Date(), lifetime: true },
          soundscapes: { active: true, since: new Date(), lifetime: true },
          updates: { active: true, since: new Date(), lifetime: true }
        },
        status: 'active',
        appVersion: "1.0.0",
        schemaVersion: "1.0"
      }, { merge: true });

      // 5. Create Order Doc
      const orderRef = adminDb.collection('orders').doc(session.id);
      await orderRef.set({
        stripeSessionId: session.id,
        paymentIntentId: session.payment_intent || '',
        uid: uid,
        guardianId: guardianId,
        amount: session.amount_total,
        currency: session.currency,
        status: session.payment_status,
        createdAt: new Date(),
        invoiceUrl: ''
      });

      // 6. Create License Doc
      const licenseRef = adminDb.collection('licenses').doc(licenseId);
      await licenseRef.set({
        licenseId: licenseId,
        uid: uid,
        guardianId: guardianId,
        type: 'Founder Library',
        version: '1.0.0',
        issuedAt: new Date(),
        status: 'active'
      });

      // 7. Audit Log: Purchase Completed
      await adminDb.collection('audit_logs').add({
        action: 'purchase_completed',
        uid: uid,
        guardianId: guardianId,
        stripeSessionId: session.id,
        timestamp: new Date()
      });

      // 8. Audit Log: License Created
      await adminDb.collection('audit_logs').add({
        action: 'license_created',
        uid: uid,
        guardianId: guardianId,
        licenseId: licenseId,
        timestamp: new Date()
      });

      // 9. Generate Magic Link
      const actionCodeSettings = {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/login?finishSignUp=true`,
        handleCodeInApp: true,
      };
      const magicLink = await adminAuth.generateSignInWithEmailLink(email, actionCodeSettings);

      await adminDb.collection('audit_logs').add({
        action: 'magic_link_generated',
        uid: uid,
        guardianId: guardianId,
        timestamp: new Date()
      });

      // 10. Send Resend Email with Magic Link
      try {
        await resend.emails.send({
          from: 'NIDALUM <founders@nidalumuniverse.com>',
          to: email,
          subject: 'Welcome to the Founder Library',
          html: `
            <div style="font-family: monospace; background-color: #050505; color: #ffffff; padding: 40px;">
              <h1 style="color: #D4AF37;">NIDALUM</h1>
              <p>Bienvenue dans la Founder Library.</p>
              <br/>
              <p>Vos accès sécurisés ont été générés avec succès :</p>
              <ul>
                <li><strong>Guardian ID :</strong> ${guardianId}</li>
                <li><strong>Licence :</strong> ${licenseId}</li>
              </ul>
              <br/>
              <p>Cliquez sur le lien ci-dessous pour accéder immédiatement à votre Dashboard de manière sécurisée (ce lien est personnel).</p>
              <br/>
              <a href="${magicLink}" style="background-color: #D4AF37; color: #050505; padding: 12px 24px; text-decoration: none; font-weight: bold; display: inline-block;">Access your Library</a>
              <br/><br/>
              <p style="color: #666; font-size: 12px;">Cette édition inclut toutes les futures mises à jour.</p>
            </div>
          `
        });
        
        await adminDb.collection('audit_logs').add({
          action: 'email_sent',
          uid: uid,
          guardianId: guardianId,
          type: 'welcome_magic_link',
          timestamp: new Date()
        });
        console.log(`Email de bienvenue avec Magic Link envoyé à ${email}`);
      } catch (emailError) {
        console.error('Erreur lors de l\'envoi de l\'email Resend:', emailError);
      }
    }

    return NextResponse.json({ received: true }, { status: 200 });

  } catch (error) {
    console.error('Stripe Webhook Error:', error);
    return NextResponse.json({ error: 'Erreur interne du serveur.' }, { status: 500 });
  }
}
