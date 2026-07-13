import { WaitlistData } from "@nidalum/core";
import { FirestoreClient } from "@nidalum/firebase/src/client";

export class WaitlistRepository {
  /**
   * Ajoute un lead dans la collection `waitlist`
   */
  static async addLead(data: WaitlistData): Promise<string> {
    // Les timestamps sont désormais gérés via le hook (Date.now()) 
    // ou Cloud Functions pour l'exactitude serveur.
    const enrichedData = {
      ...data,
      createdAt: new Date().toISOString()
    };
    return FirestoreClient.add("waitlist", enrichedData);
  }

  /**
   * Vérifie si un email existe déjà pour éviter les doublons
   */
  static async emailExists(email: string): Promise<boolean> {
    return FirestoreClient.exists("waitlist", "email", email);
  }
}
