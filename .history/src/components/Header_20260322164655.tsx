"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, Menu } from "lucide-react";

const navLinks = [
  { label: "Rólam",           href: "/#rolam" },
  { label: "Szolgáltatásaim", href: "/#szolgaltatasaim" },
  { label: "Áraim",           href: "/#araim" },
  { label: "GYIK",            href: "/#gyik" },
  { label: "Blog",            href: "/blog" },
  { label: "Kapcsolat",       href: "/#kapcsolat" },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState("");
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!isHome) return;
    const ids = ["rolam", "szolgaltatasaim", "araim", "gyik", "blog-section", "kapcsolat", "ajanlasok"];
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActiveId(e.target.id);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    }
    return () => obs.disconnect();
  }, [isHome]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const transparent = isHome && !scrolled;
  const headerBg = transparent
    ? "bg-transparent"
    : "bg-[#0a1628]/95 backdrop-blur-md border-b border-white/5 shadow-lg shadow-[#050c18]/40";

  return (
    <>
      <header className={`fixed top-0 inset-x-0 z-40 transition-all duration-500 ${headerBg}`}>
        <div className="max-w-7xl mx-auto px-5 md:px-10 lg:px-16 flex items-center justify-between h-16 lg:h-20">

          {/* Logo */}
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className="font-display text-base md:text-lg tracking-[0.5em] text-[#f5f9ff] transition-opacity hover:opacity-80"
          >
            Edit<span style={{ color: "var(--gold)" }}>&apos;h</span>
          </Link>

          {/* Desktop nav lg+ */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map(({ label, href }) => {
              const id = href.replace("/#", "");
              const active = isHome && activeId === id;
              return (
                <Link
                  key={href}
                  href={href}
                  className={`font-inter text-[10px] tracking-[0.28em] uppercase transition-colors duration-200 ${
                    active
                      ? "text-[#c4a456]"
                      : "text-[#dce9f7]/70 hover:text-[#c4a456]"
                  }`}
                >
                  {label}
                </Link>
              );
            })}
          </nav>

          {/* Tablet: first 4 links + hamburger */}
          <div className="hidden md:flex lg:hidden items-center gap-6">
            {navLinks.slice(0, 4).map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className="font-inter text-[10px] tracking-[0.25em] uppercase text-[#dce9f7]/70 hover:text-[#c4a456] transition-colors"
              >
                {label}
              </Link>
            ))}
            <button
              aria-label="Menü"
              onClick={() => setMenuOpen(true)}
              className="p-1 text-[#dce9f7]/70 hover:text-[#c4a456] transition-colors"
            >
              <Menu size={20} />
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            aria-label="Menü megnyitása"
            onClick={() => setMenuOpen(true)}
            className="md:hidden p-2 text-[#dce9f7]/80 hover:text-[#c4a456] transition-colors"
          >
            <Menu size={22} />
          </button>
        </div>
      </header>

      {/* Full-screen drawer */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-50 flex"
          role="dialog"
          aria-modal="true"
        >
          <div
            className="absolute inset-0"
            style={{ background: "rgba(5,12,24,0.75)", backdropFilter: "blur(4px)" }}
            onClick={() => setMenuOpen(false)}
          />
          <div
            className="relative ml-auto w-[85vw] max-w-sm h-full flex flex-col border-l border-white/[0.08]"
            style={{ background: "linear-gradient(160deg, #0d1f38 0%, #050c18 100%)" }}
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.08]">
              <span className="font-cinzel text-base tracking-[0.2em] text-[#f5f9ff]">
                Edit<span style={{ color: "var(--gold)" }}>&apos;h</span>
              </span>
              <button
                aria-label="Bezárás"
                onClick={() => setMenuOpen(false)}
                className="p-2 text-[#8fa8c8] hover:text-[#c4a456] transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <nav className="flex flex-col flex-1 px-6 py-4">
              {navLinks.map(({ label, href }, i) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className="group flex items-center gap-4 py-4 border-b border-white/5 last:border-0"
                  style={{ transitionDelay: `${i * 40}ms` }}
                >
                  <span
                    className="h-px transition-all duration-300 group-hover:w-10"
                    style={{ width: "24px", background: "var(--gold)", opacity: 0.5 }}
                  />
                  <span className="font-cinzel text-xs tracking-[0.25em] uppercase transition-colors duration-200 text-[#dce9f7]/70 group-hover:text-[#c4a456]">
                    {label}
                  </span>
                </Link>
              ))}
            </nav>

            <div className="px-6 py-6 border-t border-white/[0.08]">
              <p className="font-cormorant italic text-sm" style={{ color: "var(--silver)" }}>
                Méltóság minden pillanatnak
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
