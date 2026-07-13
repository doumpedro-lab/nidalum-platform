# Conformité RGPD & Cookie Consent

## Décision Stratégique
Le système de gestion du consentement (CMP) retenu est **Cookiebot**.
Ce choix s'aligne avec le positionnement européen (Allemagne) de NIDALUM, offrant une conformité stricte et une intégration fluide.

## Configuration Technique
- Le script `uc.js` est intégré dans `<head>` via `next/script` avec la stratégie `beforeInteractive`.
- **Mode de blocage :** `auto`. Cookiebot scannera automatiquement le site et bloquera les trackers (GA4, TikTok, Meta) jusqu'à ce que l'utilisateur donne son consentement explicite.
- **Identifiant :** L'attribut `data-cbid` devra être configuré avec l'ID du domaine `www.nidalumuniverse.com` généré sur la plateforme Cookiebot.

## Sécurité Complémentaire
La Content Security Policy (CSP) dans `next.config.ts` a été configurée pour autoriser explicitement le domaine `https://consent.cookiebot.com`.
