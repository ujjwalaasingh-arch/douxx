# Doux

Marketplace de marques indépendantes françaises. Next.js 14 · Prisma · Stripe Connect.

## Démarrer
```bash
npm install
cp .env.example .env        # puis renseigner STRIPE_SECRET_KEY
npm run db:push && npm run db:seed
npm run dev                 # http://localhost:3000
```

## Ce qui est inclus
- Catalogue, page produit, page marque (`app/`)
- Paiement Stripe Checkout avec commission de la plateforme (`app/api/checkout/route.ts`)
- Schéma Brand / Product (`prisma/schema.prisma`)

## À construire ensuite
1. Onboarding des marques via Stripe Connect (Express) pour remplir `stripeAccountId`
2. Authentification + tableau de bord marque (ajout de produits, stock)
3. Panier multi-marques, webhooks Stripe (décrémenter le stock, confirmation par e-mail)
4. Recherche et filtres par catégorie / ville
5. Production : passer Prisma sur PostgreSQL, déployer sur Vercel
