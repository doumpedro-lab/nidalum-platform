# Launch Day Checklist

Ce document formalise les étapes cruciales menant au déploiement de la Landing Page NIDALUM. Il s'agit d'un protocole strict garantissant l'intégrité de la marque et la stabilité technique.

## J-7 : Audit de Fondation
- [ ] **Lighthouse Performance :** Validation > 95 sur Mobile et Desktop.
- [ ] **Audit Sécurité :** Vérification des Headers (CSP, HSTS) et blocage des vulnérabilités.
- [ ] **Audit RGPD :** Validation du bandeau Cookiebot et non-déclenchement des scripts tiers avant consentement.
- [ ] **Sitemap & DNS :** Vérification de la propagation DNS de `www.nidalumuniverse.com` et SSL actif.

## J-3 : Test en Conditions Réelles
- [ ] **Test Mobile Complet :** Vérification de l'interface (iPhone SE, 16 Pro, Pixel) - aucun débordement.
- [ ] **Test Formulaire (End-to-End) :** Validation que l'inscription Waitlist s'enregistre correctement en base de données.
- [ ] **Test Analytics :** Vérification que les clics et événements remontent bien sur le dashboard.
- [ ] **Test des Emails :** Vérification des emails de bienvenue (délivrabilité, design, fautes d'orthographe).

## J-1 : Test à l'Aveugle
- [ ] **Test Utilisateur Externe :** Remettre le site à une personne externe à l'équipe. L'observer naviguer sans intervenir. Noter les hésitations.
- [ ] **Préparation de la War Room :** Les tableaux de bord Analytics et Uptime sont prêts.
- [ ] **Tests Paiement (Si applicable) :** Validation Stripe en environnement de test.

## Jour J : Le Lancement
- [ ] **Publication Technique :** Déploiement en Production (`main` branch).
- [ ] **Publication Réseaux Sociaux :** Instagram, Pinterest, LinkedIn, YouTube, Twitter.
- [ ] **Broadcast Newsletter :** Envoi de la campagne aux inscrits préliminaires.
- [ ] **Plan de Support Activé :** Une personne dédiée surveille les emails, les réseaux, et les analytics en temps réel.
- [ ] **Ouverture de la WAR ROOM.**

## J+1 : Post-Mortem
- [ ] **Comité de Direction :** Analyse des 24 premières heures. Décisions stratégiques basées sur les datas récoltées.
