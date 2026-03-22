import Link from "next/link";

const blogPosts = [
  {
    title: "Mitől igazán személyes egy búcsúztatás?",
    excerpt:
      "A személyes hangvételű búcsúbeszéd nem sablonokból épül. Miért fontos, hogy az elhunyt egyénisége tükröződjön a szertartásban — és hogyan segíthetek ebben.",
    date: "2025. június",
  },
  {
    title: "Esküvői szertartás a szabadban — tippek és tapasztalatok",
    excerpt:
      "Tópart, erdei tisztás vagy hegycsúcs? A szabadtéri esküvő varázsa és a szervezés buktatói — saját élményeim és tanácsaim pároknak.",
    date: "2025. május",
  },
  {
    title: "Mikor érdemes memoárt íratni?",
    excerpt:
      "Nem csak utólag, hanem előre is készülhetünk. Miért ajándék egy időben megírt memoár az egész családnak — és hogyan segítek az elkészítésében.",
    date: "2025. április",
  },
];

export default function BlogPage() {
  return (
    <>
      {/* Hero */}
      <section
        className="relative py-32 md:py-40 px-6 flex flex-col items-center text-center"
        style={{
          background: "linear-gradient(180deg, #050c18 0%, #0a1628 100%)",
        }}
      >
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-inter text-[10px] tracking-[0.3em] uppercase text-[#8fa8c8] hover:text-[#c4a456] transition-colors mb-10"
        >
          ← Vissza a főoldalra
        </Link>

        <span className="eyebrow">Gondolatok</span>
        <h1 className="font-cinzel text-4xl md:text-5xl text-[#f5f9ff] mt-3 mb-6">
          Blog
        </h1>
        <div className="flex items-center gap-4">
          <span
            className="w-16 h-px"
            style={{
              background: "linear-gradient(to right, transparent, #c4a456)",
            }}
          />
          <span className="text-[#c4a456] text-sm">◈</span>
          <span
            className="w-16 h-px"
            style={{
              background: "linear-gradient(to left, transparent, #c4a456)",
            }}
          />
        </div>
      </section>

      {/* Posts */}
      <section
        className="section-padding"
        style={{ background: "var(--navy)" }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="grid gap-8">
            {blogPosts.map((post) => (
              <article
                key={post.title}
                className="group border border-white/[0.06] bg-white/[0.02] hover:border-[#c4a456]/30 transition-all duration-300 p-8 md:p-10"
              >
                <span className="block font-inter text-[10px] tracking-[0.3em] uppercase text-[#c4a456] mb-3">
                  {post.date}
                </span>
                <h2 className="font-cinzel text-xl md:text-2xl text-[#f5f9ff] mb-4 leading-snug">
                  {post.title}
                </h2>
                <p className="font-inter text-sm md:text-base text-[#8fa8c8] leading-relaxed mb-5">
                  {post.excerpt}
                </p>
                <span className="inline-block font-inter text-[10px] tracking-[0.25em] uppercase text-[#c4a456]/60 group-hover:text-[#c4a456] transition-colors">
                  Hamarosan →
                </span>
              </article>
            ))}
          </div>

          <div className="text-center mt-16">
            <div className="flex items-center justify-center gap-4 mb-6">
              <span
                className="w-12 h-px"
                style={{
                  background:
                    "linear-gradient(to right, transparent, rgba(196,164,86,0.3))",
                }}
              />
              <span className="text-[#c4a456]/40 text-xs">◈</span>
              <span
                className="w-12 h-px"
                style={{
                  background:
                    "linear-gradient(to left, transparent, rgba(196,164,86,0.3))",
                }}
              />
            </div>
            <p className="font-cormorant italic text-lg text-[#5a7a9a]">
              További bejegyzések hamarosan…
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

