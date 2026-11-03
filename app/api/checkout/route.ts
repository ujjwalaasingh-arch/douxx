import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { stripe } from "@/lib/stripe";

// Creates a Stripe Checkout session. The money goes to the brand's connected
// account; Doux keeps a commission via application_fee_amount.
export async function POST(req: Request) {
  const form = await req.formData();
  const productId = String(form.get("productId"));
  const product = await db.product.findUnique({ where: { id: productId }, include: { brand: true } });
  if (!product || product.stock < 1) return NextResponse.json({ error: "Indisponible" }, { status: 404 });

  const site = process.env.NEXT_PUBLIC_SITE_URL!;
  const feePct = Number(process.env.PLATFORM_FEE_PERCENT ?? 12);
  const fee = Math.round((product.priceCents * feePct) / 100);

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [{
      quantity: 1,
      price_data: { currency: "eur", unit_amount: product.priceCents, product_data: { name: product.name } },
    }],
    shipping_address_collection: { allowed_countries: ["FR", "BE", "DE", "ES", "IT", "NL"] },
    ...(product.brand.stripeAccountId && {
      payment_intent_data: {
        application_fee_amount: fee,
        transfer_data: { destination: product.brand.stripeAccountId },
      },
    }),
    success_url: `${site}/merci`,
    cancel_url: `${site}/products/${product.slug}`,
  });
  return NextResponse.redirect(session.url!, 303);
}
