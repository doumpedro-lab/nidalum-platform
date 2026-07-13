import { z } from "zod";

export const WaitlistSchema = z.object({
  // UUID de la requête pour la traçabilité de bout en bout
  requestID: z.string().uuid(),
  
  email: z
    .string()
    .trim()
    .toLowerCase()
    .max(100, "L'email est trop long")
    .email("Format d'email invalide")
    // Rejet des caractères invisibles ou non-ASCII basiques
    .regex(/^[\x20-\x7E]+$/, "L'email contient des caractères non autorisés"),
  
  source: z.enum(["hero", "footer", "popup"]).default("hero"),
  language: z.enum(["fr", "en", "de"]).default("fr"),
  country: z.string().optional(),
  device: z.string().optional(),
  
  utm: z.object({
    source: z.string().optional(),
    medium: z.string().optional(),
    campaign: z.string().optional(),
  }).optional(),
  
  consent: z.literal(true, {
    errorMap: () => ({ message: "Le consentement est obligatoire" }),
  }),
  
  status: z.enum(["pending", "confirmed"]).default("pending"),
  createdAt: z.date().optional() // Géré par le serveur
});

export type WaitlistData = z.infer<typeof WaitlistSchema>;
