import type { Metadata } from "next";
import { Alata } from "next/font/google";
import "./globals.css";

const alata = Alata({
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "MoveWise",
  description: "Organiza tu mudanza con IA",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${alata.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
