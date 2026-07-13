import { useState } from "react";
import { generateRequestID } from "@nidalum/core";
import { track, NidalumEvents } from "@nidalum/analytics";

export const useWaitlist = (source: "hero" | "footer" | "popup" = "hero") => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [guardianId, setGuardianId] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    track(NidalumEvents.FOUNDER_ACCESS_CLICK);

    // Génération du Request ID
    const requestID = generateRequestID();

    // Construction du payload
    const payload = {
      requestID,
      email,
      source,
      language: "fr",
      consent: true,
      status: "pending",
      utm: {
        source: new URLSearchParams(window.location.search).get("utm_source") || undefined,
        medium: new URLSearchParams(window.location.search).get("utm_medium") || undefined,
        campaign: new URLSearchParams(window.location.search).get("utm_campaign") || undefined,
      }
    };

    try {
      // Appel à l'API Route Next.js
      const response = await fetch('/api/founder-access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (data.success) {
        setStatus("success");
        setGuardianId(data.guardianId);
        track(NidalumEvents.FOUNDER_ACCESS_SUCCESS, { source });
        track(NidalumEvents.FOUNDER_PAGE_VIEW); // Nouveau KPI Décision 007
      } else {
        setStatus("error");
        setErrorMessage(data.message || "Une erreur est survenue.");
      }
    } catch (error) {
      setStatus("error");
      setErrorMessage("Impossible de joindre le serveur. Veuillez réessayer.");
      console.error(error);
    }
  };

  return {
    email,
    setEmail,
    status,
    errorMessage,
    guardianId,
    submit
  };
};
