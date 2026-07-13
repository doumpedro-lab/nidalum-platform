# Gestion des Environnements

## Pipeline Stricte de Déploiement
Conformément aux directives de la Direction, **aucun développement ne se fait directement en production**. Le cycle de vie applicatif de NIDALUM respecte une ségrégation rigoureuse.

### 1. Development (Local)
- **URL :** `http://localhost:3000`
- **Données :** Mocked data ou émulateurs locaux (Firebase Local Emulator Suite).
- **Rôle :** Développement des Sprints, itérations graphiques, tests unitaires.

### 2. Staging (Pré-production)
- **URL :** `https://staging.nidalumuniverse.com` (protégé par mot de passe ou IP restreinte).
- **Données :** Base de données distincte. Environnement ISO-Production.
- **Rôle :** Assurance Qualité (QA), validation des Checklists (Mobile, Formulaires) par le CTO/CEO avant la mise en ligne. Tests end-to-end.

### 3. Production
- **URL :** `https://www.nidalumuniverse.com`
- **Données :** Données réelles des Gardiens et clients.
- **Rôle :** Environnement intouchable. Déploiement automatisé uniquement via CI/CD depuis la branche `main` après validation Staging.
