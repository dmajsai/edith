import Link from "next/link";

const navLinks = [
  { label: "Rólam",           href: "/#rolam" },
  { label: "Szolgáltatásaim", href: "/#szolgaltatasaim" },
  { label: "Áraim",           href: "/#araim" },
  { label: "GYIK",            href: "/#gyik" },
  { label: "Blog",            href: "/blog" },
  { label: "Kapcsolat",       href: "/#kapcsolat" },
];

export function Footer() {
  return (
    <footer
      className="text-[#dce9f7] py-16 px-5 md:px-10 lg:px-20"
      style={{ background: "linear-gradient(160deg, #0a1628 0%, #050c18 100%)" }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center mb-14">
          <span className="font-cinzel text-2xl tracking-[0.22em] uppercase text-[#f5f9ff] mb-3">
            Edit<span className="text-[#c4a456]">&apos;h</span>
          </span>
          <p className="font-cormorant italic text-lg text-[#8fa8c8]">
            Méltóság minden pillanatnak
          </p>
          <div className="flex items-center gap-4 mt-6">
            <span className="w-16 h-px" style={{ background: "linear-gradient(to right, transparent, #c4a456)" }} />
            <span className="text-[#c4a456]">◈</span>
            <span className="w-16 h-px" style={{ background: "linear-gradient(to left, transparent, #c4a456)" }} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-14">
          <div>
            <h4 className="font-cinzel text-xs tracking-[0.3em] uppercase text-[#c4a456] mb-6">
              Navigáció
            </h4>
            <ul className="space-y-3">
              {navLinks.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="font-inter text-sm text-[#8fa8c8] transition-colors duration-200 hover:text-[#c4a456]"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-cinzel text-xs tracking-[0.3em] uppercase text-[#c4a456] mb-6">
              Kapcsolat
            </h4>
            <ul className="space-y-4 font-inter text-sm text-[#8fa8c8]">
              <li>
                <a href="tel:+3630000000" className="flex items-center gap-3 transition-colors hover:text-[#c4a456]">
                  <span className="text-[#c4a456]">—</span>+36 30 000 0000
                </a>
              </li>
              <li>
                <a href="mailto:hello@edith.hu" className="flex items-center gap-3 transition-colors hover:text-[#c4a456]">
                  <span className="text-[#c4a456]">—</span>hello@edith.hu
                </a>
              </li>
              <li>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 transition-colors hover:text-[#c4a456]">
                  <span className="text-[#c4a456]">—</span>Facebook oldal
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-cinzel text-xs tracking-[0.3em] uppercase text-[#c4a456] mb-6">
              Röviden
            </h4>
            <p className="font-inter text-sm text-[#8fa8c8] leading-relaxed">
              Szertartásvezető és polgári búcsúztató Budapest és vonzáskörzetében.
              Esküvők, temetési búcsúztatók, ünnepi köszöntők — minden pillanat
              egyedi és megismételhetetlen.
            </p>
          </div>
        </div>

        <div
          className="flex flex-col md:flex-row items-center justify-between gap-3 pt-8"
          style={{ borderTop: "1px solid rgba(143, 168, 200, 0.12)" }}
        >
          <p className="font-inter text-xs text-[#5a7a9a] tracking-wide">
            © {new Date().getFullYear()} Edit&apos;h — Minden jog fenntartva.
          </p>
          <p className="font-inter text-xs text-[#5a7a9a]">
            Budapest, Magyarország
          </p>
        </div>
      </div>
    </footer>
  );
}
