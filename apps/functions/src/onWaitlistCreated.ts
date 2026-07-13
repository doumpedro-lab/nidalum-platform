// import * as functions from "firebase-functions";
// import * as admin from "firebase-admin";

// admin.initializeApp();

/**
 * Cloud Function déclenchée lors de la création d'un document dans la collection `waitlist`.
 * Permet d'envoyer l'email via Brevo sans exposer l'API Key au client.
 */
export const onWaitlistCreated = undefined; /* functions.firestore
  .document("waitlist/{leadId}")
  .onCreate(async (snap, context) => {
    const data = snap.data();
    const email = data.email;

    console.log(`[Brevo] Préparation de l'envoi pour ${email}`);

    try {
      // TODO: Appel à l'API Brevo
      // const response = await fetch("https://api.brevo.com/v3/smtp/email", { ... })

      // Marquer comme traité dans Firestore
      // await snap.ref.update({ status: "confirmed", emailSentAt: admin.firestore.FieldValue.serverTimestamp() });

      console.log(`[Brevo] Email envoyé avec succès à ${email}`);
    } catch (error) {
      console.error(`[Brevo] Erreur lors de l'envoi à ${email}`, error);
    }
  });
*/
