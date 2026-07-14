import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { getStorage } from "firebase/storage";

import { getAuth } from "firebase/auth";
import { firebaseConfig } from "./config";

let app;
let db: any;
let auth: any;
let storage: any;

try {
  app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
  db = getFirestore(app);
  auth = getAuth(app);
  storage = getStorage(app);
} catch (error) {
  console.warn("Firebase initialization skipped during build:", error);
}

export { db, auth, storage };

/**
 * Interface abstraite du client Firestore.
 */
export class FirestoreClient {
  static async add(collectionName: string, data: any): Promise<string> {
    if (!process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID) {
      console.warn("[FirestoreClient] Mode hors-ligne: Clés manquantes. Simulation d'écriture.");
      return "mock_id_" + Date.now();
    }
    
    try {
      const colRef = collection(db, collectionName);
      const docRef = await addDoc(colRef, data);
      return docRef.id;
    } catch (error) {
      // Simulation de panne (Disaster Recovery Test)
      throw new Error(`Erreur réseau Firestore: ${error}`);
    }
  }

  static async exists(collectionName: string, field: string, value: string): Promise<boolean> {
    if (!process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID) return false;

    const colRef = collection(db, collectionName);
    const q = query(colRef, where(field, "==", value));
    const snapshot = await getDocs(q);
    return !snapshot.empty;
  }
}
