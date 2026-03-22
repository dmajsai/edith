import type { Metadata } from "next";
import "./globals.css";
import { ClientBody } from "./ClientBody";

export const metadata: Metadata = {
  title: "Edit'h | Méltóság minden pillanatnak",
  description:
    "Szertartásvezető és polgári búcsúztató Budapest és környékén. Esküvői szertartások, temetési búcsúztatók, ünnepi köszöntők — minden pillanat megérdemli a méltóságot.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hu">
      <ClientBody>{children}</ClientBody>
    </html>
  );
}
