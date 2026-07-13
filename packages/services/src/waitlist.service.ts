import { WaitlistSchema, handleError } from "@nidalum/core";
import { WaitlistRepository } from "@nidalum/repositories";
import { track, AnalyticsEvents } from "@nidalum/analytics";

export class WaitlistService {
  /**
   * Orchestre la validation Zod, la vérification des doublons, et l'écriture Firestore.
   */
  static async submit(rawData: unknown): Promise<{ success: boolean; message: string }> {
    try {
      track(AnalyticsEvents.WAITLIST_START);

      // 1. Validation Stricte via Zod
      const validatedData = WaitlistSchema.parse(rawData);

      // 2. Vérification des doublons (Business logic)
      const exists = await WaitlistRepository.emailExists(validatedData.email);
      if (exists) {
        return { success: false, message: "Cet email est déjà inscrit sur la liste des Gardiens." };
      }

      // 3. Écriture en base
      await WaitlistRepository.addLead(validatedData);

      // 4. Analytics
      track(AnalyticsEvents.WAITLIST_SUBMIT, { source: validatedData.source });

      return { success: true, message: "Inscription confirmée." };

    } catch (error: any) {
      handleError("WAITLIST_SUBMIT_ERROR", error);
      
      // Retourner une erreur compréhensible (ZodError)
      if (error.issues && error.issues.length > 0) {
          return { success: false, message: error.issues[0].message };
      }

      // Disaster Recovery: Si Firebase ou le réseau tombe, l'utilisateur a un message propre
      return { success: false, message: "Une erreur réseau est survenue. Le système a été notifié. Veuillez réessayer." };
    }
  }
}
