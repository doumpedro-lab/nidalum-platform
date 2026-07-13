import { NextResponse } from 'next/server';
import { adminDb } from '@nidalum/firebase';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: Request) {
  try {
    const { email, source } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Email invalide.' }, { status: 400 });
    }

    // Initialize Guardian ID
    const guardianId = `G-${uuidv4().split('-')[0].toUpperCase()}`;

    // Verify if already exists
    const usersRef = adminDb.collection('founders');
    const snapshot = await usersRef.where('email', '==', email).get();

    if (!snapshot.empty) {
      // Already exists
      const existingUser = snapshot.docs[0].data();
      return NextResponse.json({ 
        success: true, 
        guardianId: existingUser.guardianId,
        message: 'Vous êtes déjà inscrit.' 
      }, { status: 200 });
    }

    // Save to Firestore
    await usersRef.add({
      email,
      guardianId,
      source: source || 'hero',
      createdAt: new Date().toISOString(),
      status: 'pending_payment'
    });

    // Envoi de la Transmission 001 via Resend
    if (process.env.RESEND_API_KEY) {
      const { Resend } = require('resend');
      const resend = new Resend(process.env.RESEND_API_KEY);

      try {
        await resend.emails.send({
          from: 'NIDALUM <transmission@nidalumuniverse.com>',
          to: [email],
          subject: 'Transmission 001 — Le Silence.',
          html: `
            <div style="font-family: monospace; max-width: 600px; margin: 0 auto; color: #333; line-height: 1.6;">
              <p>Guardian ID : <strong>${guardianId}</strong></p>
              <p>Le monde entier est une machine à voler votre attention.</p>
              <p>Bienvenue dans la Rébellion.</p>
              <p><a href="https://nidalumuniverse.com/sanctuaire" style="color: #D4AF37;">Accéder au Sanctuaire</a></p>
            </div>
          `
        });
      } catch (emailError) {
        console.error('Erreur Envoi Email:', emailError);
      }
    }

    return NextResponse.json({ 
      success: true, 
      guardianId 
    }, { status: 201 });

  } catch (error) {
    console.error('Founder Access Error:', error);
    return NextResponse.json({ error: 'Erreur interne du serveur.' }, { status: 500 });
  }
}
