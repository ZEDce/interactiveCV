import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "[Tvoje Meno] - Interaktívny životopis", // Placeholder title
  description:
    "Interaktívny životopis pre pozíciu AI Implementátor | Orange Slovensko", // Placeholder description
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sk">
      {" "}
      {/* Set language to Slovak */}
      <body className={inter.className}>{children}</body>
    </html>
  );
}
