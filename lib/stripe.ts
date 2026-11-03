import Stripe from "stripe";
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "");
export const euros = (cents: number) =>
  new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(cents / 100);
