# Data Governance Policy

Conformément à la décision stratégique du Comité de Direction, chaque donnée collectée par NIDALUM doit justifier son existence. NIDALUM ne collecte pas de données "au cas où".

## Registre des Données Collectées (Waitlist)

| Donnée | Pourquoi ? | Durée de conservation | Responsable |
| :--- | :--- | :--- | :--- |
| **Email** | Communication, Accès Waitlist, Envoi Codex | Jusqu'à désinscription (Opt-out) ou politique stricte | NIDALUM |
| **Source (UTM)** | Attribution marketing (Savoir quel canal convertit) | Durée définie par la politique d'analyse (ex: 24 mois) | Marketing |
| **Pays (Country)** | Compréhension démographique / Analytics | Agrégé (BigQuery) à terme | Produit |
| **Appareil (Device)** | Optimisation de l'UX (Mobile vs Desktop) | Agrégé (BigQuery) à terme | Technique |
| **Consentement** | Conformité légale (RGPD) | Tant que l'utilisateur est actif | Juridique / NIDALUM |
| **Request ID** | Traçabilité des erreurs de bout en bout | Éphémère (Logs limités à 30 jours) | Technique |

## Règles Générales
1. **Minimisation :** Toute nouvelle demande d'ajout de champ dans un formulaire doit être validée par le CTO/CEO selon les critères : *Pourquoi ? Qui l'utilise ? Durée ? Supprimable ?*
2. **Droit à l'oubli :** Un utilisateur supprimé de la collection `users` entraîne une cascade de suppression ou d'anonymisation dans `orders`, `analytics`, etc.
3. **Data Masking :** L'accès direct à la base de données de production est interdit au personnel non accrédité.
