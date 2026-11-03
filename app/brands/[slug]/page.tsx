import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { euros } from "@/lib/stripe";

export const dynamic = "force-dynamic";

export default async function BrandPage({ params }: { params: { slug: string } }) {
  const b = await db.brand.findUnique({ where: { slug: params.slug }, include: { products: true } });
  if (!b) notFound();
  return (
    <>
      <h1>{b.name}</h1>
      <p className="muted">{b.city}</p>
      <p>{b.story}</p>
      <div className="grid">
        {b.products.map((p) => (
          <Link key={p.id} href={`/products/${p.slug}`} className="card">
            <strong>{p.name}</strong>
            <div>{euros(p.priceCents)}</div>
          </Link>
        ))}
      </div>
    </>
  );
}
