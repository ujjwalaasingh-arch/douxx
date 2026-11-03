import Link from "next/link";
import { db } from "@/lib/db";
import { euros } from "@/lib/stripe";

export const dynamic = "force-dynamic";

export default async function Home() {
  const products = await db.product.findMany({ include: { brand: true }, orderBy: { createdAt: "desc" } });
  return (
    <>
      <h1>Découvrez les marques indépendantes françaises</h1>
      <div className="grid">
        {products.map((p) => (
          <Link key={p.id} href={`/products/${p.slug}`} className="card">
            {p.imageUrl ? <img className="img" src={p.imageUrl} alt={p.name} /> : <div className="img" />}
            <strong>{p.name}</strong>
            <div className="muted">{p.brand.name} · {p.brand.city}</div>
            <div>{euros(p.priceCents)}</div>
          </Link>
        ))}
      </div>
    </>
  );
}
