export interface AppError {
  timestamp: string;
  event: string;
  message: string;
  stack?: string;
  userAgent?: string;
}

export const handleError = (event: string, error: unknown): AppError => {
  const timestamp = new Date().toISOString();
  let message = "Erreur inconnue";
  let stack;

  if (error instanceof Error) {
    message = error.message;
    stack = error.stack;
  }

  const appError: AppError = {
    timestamp,
    event,
    message,
    stack,
    userAgent: typeof window !== "undefined" ? window.navigator.userAgent : "server",
  };

  // Plus tard: envoyer à Sentry ou BigQuery
  console.error(`[${event}] ${message}`, appError);

  return appError;
};
