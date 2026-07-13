import { v4 as uuidv4 } from "uuid";

/**
 * Génère un identifiant unique universel (UUID v4).
 * Utilisé principalement pour corréler les logs et traçer les requêtes (Request ID).
 */
export const generateRequestID = (): string => {
  return uuidv4();
};
