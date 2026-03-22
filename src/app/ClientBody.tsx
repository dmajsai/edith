"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export function ClientBody({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <body className="antialiased flex flex-col min-h-screen" suppressHydrationWarning>
      <Header />
      <main className={`flex-grow ${isHome ? "" : "pt-20"}`}>
        {children}
      </main>
      <Footer />
    </body>
  );
}
