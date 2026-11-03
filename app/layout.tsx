import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "Doux – Les marques indépendantes françaises",
  description: "Marketplace de marques indépendantes françaises, fabriquées avec soin.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <header>
          <Link href="/" className="logo">Doux</Link>
          <span className="muted">Indie · Français · Fait avec soin</span>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
