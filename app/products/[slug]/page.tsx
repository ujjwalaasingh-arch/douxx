import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { euros } from "@/lib/stripe";

export const dynamic = "force-dynamic";

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const p = await db.product.findUnique({ where: { slug: params.slug }, include: { brand: true } });
  if (!p) notFound();
  return (
    <div className="card">
      <h1>{p.name}</h1>
      <p className="muted">
        par <Link href={`/brands/${p.brand.slug}`}><u>{p.brand.name}</u></Link> · {p.brand.city} · Fabriqué en {p.madeIn}
      </p>
      <p>{p.description}</p>
      <p><strong>{euros(p.priceCents)}</strong></p>
      <form action="/api/checkout" method="POST">
        <input type="hidden" name="productId" value={p.id} />
        <button className="btn" disabled={p.stock < 1}>{p.stock < 1 ? "Épuisé" : "Acheter"}</button>
      </form>
    </div>
  );
}
