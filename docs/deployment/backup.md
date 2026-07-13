# Stratégie de Sauvegarde (Backup & Disaster Recovery)

## Principes P0
NIDALUM ne peut pas se permettre de perdre les données de ses "Gardiens". Une stratégie de reprise après sinistre est requise avant le lancement.

## Plan de Sauvegarde

### 1. Base de Données (Firestore / Supabase)
- **Quotidien :** Sauvegarde automatique (Point-in-Time Recovery) activée sur la base de données de production. Rétention de 7 jours minimum.
- **Mensuel :** Export manuel ou automatisé des collections principales (Users, Waitlist, Transactions) vers un Cloud Storage (ex: Google Cloud Storage ou AWS S3) verrouillé (WORM - Write Once Read Many).

### 2. Assets & Médias
- Les images premium (fichiers originaux 4K/8K, Codex, Musique HD) doivent être sauvegardées sur un stockage à froid (Coldline/Glacier) redondant.
- Les buckets de production (Firebase Storage) doivent avoir le *Versioning* activé pour empêcher les suppressions accidentelles.

### 3. Code Source (GitHub)
- **Dépôt Git :** Branche `main` protégée. Aucune suppression forcée n'est autorisée.
- **Sauvegarde Hors-ligne :** Clonage mensuel du dépôt par le CTO sur un environnement chiffré local.

## Règle de Résilience
En cas de défaillance critique, le délai cible de restauration (RTO) est fixé à 4 heures, avec une perte de données maximale (RPO) de 24 heures.
