# NIDALUM PLATFORM

Ce dépôt centralise l'ensemble de la propriété intellectuelle technique de la franchise NIDALUM.

## Architecture

Le monorepo utilise des Workspaces NPM (ou Turborepo) pour séparer les responsabilités.
*   **`apps/web`** : Le Hub principal de la franchise (Next.js, App Router).
*   **`apps/oracle`** : (Futur) Web-app Oracle.
*   **`apps/admin`** : (Futur) Tableau de bord interne.

### Packages Partagés
Chaque package a une responsabilité unique :
*   `@nidalum/ui` : Design System (Tailwind, Framer Motion).
*   `@nidalum/core` : Logique métier partagée.
*   `@nidalum/firebase` : Initialisation et hooks de base de données.
*   `@nidalum/config` : Variables, constantes, routes.
*   `@nidalum/analytics` : Centralisation du tracking (`track("event")`).
*   `@nidalum/types` : Interfaces et types TypeScript.

## Fiche de validation (Avant tout commit)
1. Quel problème utilisateur résout-elle ?
2. Quel KPI influence-t-elle ?
3. Comment mesurer son impact ?
4. Peut-elle être réutilisée ailleurs ?

## Installation
```bash
npm install
```

## Scripts
(À venir)
