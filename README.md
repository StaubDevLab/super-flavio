# Super Flavio

Site Next.js 14 pour un artisan multi-services en Corrèze. La couleur principale du logo est conservée (`--primary: 135 32% 47%`).

## Développement

```sh
npm install
npx prisma generate
npm run dev
```

Les paramètres existants de connexion, de stockage Supabase et d’envoi des messages restent dans `.env`. `ALLOWED_EMAILS` (ou, pour compatibilité, `NEXT_PUBLIC_ALLOWED_EMAILS`) contient les adresses autorisées à gérer les services, séparées par des virgules.

## Gestion des services

Accès : `/admin/services`, après connexion avec une adresse autorisée.

- Recherche par nom ou métier, filtres par catégorie et publication, tri par titre ou ordre.
- Métiers proposés : plomberie, électricité, peinture, placo, charpenterie, climatisation, carrelage. Une catégorie personnalisée peut être saisie.
- Résumé pour la carte, description détaillée, prestations (une par ligne), tarif indicatif facultatif.
- Publication ou brouillon, mise en avant sur l’accueil, ordre d’affichage.
- Photo facultative (JPG, PNG ou WebP, 5 Mo maximum), texte alternatif, aperçu de la carte.

L’accueil présente jusqu’à six services publiés, avec les services mis en avant en premier, puis l’ordre d’affichage. La page des services présente tout le catalogue publié. Les URL des services existants restent inchangées après modification du titre.

## Réalisations

La section de l’accueil présente jusqu’à trois chantiers publiés. Le portfolio complet est accessible sur `/realisations`, avec filtres par métier et galerie détaillée dans une fenêtre.

L’espace `/admin/realisations` permet de créer, modifier, masquer ou supprimer un chantier. Champs : titre, description, métier, commune facultative, date, publication, mise en avant et ordre. Jusqu’à 20 photos, ajout multiple (JPG, PNG ou WebP, 5 Mo par photo), légendes, réorganisation et repères « Avant » / « Après ». La première photo sert de couverture. Un brouillon peut être enregistré sans photo ; la publication nécessite au moins une photo.

La migration `202609140002_realisations` crée uniquement la table `Realisation` et son index. Appliquer `npm run db:migrate` avant le déploiement de cette fonctionnalité. La section est masquée lorsqu’aucune réalisation n’est publiée.

## Mise à jour de la base

La compilation ne modifie plus automatiquement la base. Appliquer les migrations séparément avant de mettre en ligne la nouvelle version.

Pour une **base existante créée avec `prisma db push`**, vérifier qu’elle correspond au schéma initial et en conserver une sauvegarde. Enregistrer une seule fois le schéma initial comme déjà appliqué :

```sh
npx prisma migrate resolve --applied 202609140000_initial
npm run db:migrate
```

Pour une base neuve, ou si le schéma initial a déjà été enregistré dans l’historique :

```sh
npm run db:migrate
```

La migration des services ajoute `category`, `featured`, `priceLabel` et `prestations`. Elle conserve les données existantes. Les anciens services sont classés dans « Plomberie » par défaut ; leur métier peut ensuite être ajusté dans l’administration. Aucun nouveau service n’est inséré automatiquement.

## Vérifications et compilation

```sh
npm test
npx tsc --noEmit
npm run lint
npm run build
```

La connexion Google, le chargement des photos et l’envoi de messages nécessitent les services externes configurés. Les pages publiques n’exposent que les services publiés ; l’écriture est limitée aux adresses autorisées.

## Envoi du formulaire de contact (Resend)

`/api/send` utilise Resend pour transmettre la demande à l’artisan, puis un accusé de réception au client. Le client est placé en « Répondre à » sur la notification.

Variables serveur à configurer dans `.env` et chez l’hébergeur :

```dotenv
RESEND_API_KEY=
RESEND_FROM_EMAIL=contact@superflavioplomberie.fr
CONTACT_EMAIL=flavien.staub@gmail.com
```

Le domaine de l’expéditeur doit être vérifié dans Resend : https://resend.com/docs/send-with-nextjs. `CONTACT_EMAIL` conserve par défaut la valeur existante de `NEXT_PUBLIC_EMAIL`. La clé ne doit jamais porter le préfixe `NEXT_PUBLIC_`. SendGrid et sa clé ne sont plus utilisés.

Un refus ou une panne lors de l’envoi à l’artisan renvoie une erreur au formulaire. Si seul l’accusé échoue, la demande reste considérée comme envoyée pour éviter un doublon. Les tests simulent Resend et n’envoient aucun email réel.
