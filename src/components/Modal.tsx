"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { X } from "lucide-react";

interface ModalProps {
  isOpen:   boolean;
  onClose:  () => void;
  title:    string;
  eyebrow?: string;
  img?:     string;
  children: React.ReactNode;
}

export function Modal({ isOpen, onClose, title, eyebrow, img, children }: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-6"
      style={{
        background:     "rgba(5, 12, 24, 0.92)",
        backdropFilter: "blur(8px)",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div
        ref={panelRef}
        className="relative w-full md:max-w-3xl flex flex-col overflow-hidden"
        style={{
          maxHeight:    "94vh",
          background:   "linear-gradient(160deg, #0c1d36 0%, #050c18 100%)",
          border:       "1px solid rgba(196, 164, 86, 0.3)",
          boxShadow:    "0 32px 100px rgba(5, 12, 24, 0.85), 0 0 60px rgba(196, 164, 86, 0.07)",
          borderRadius: "3px 3px 0 0",
        }}
      >
        {/* ── Sticky header – never scrolls away ── */}
        <div
          className="flex-shrink-0 flex items-start justify-between gap-4 px-8 pt-7 pb-5"
          style={{ borderBottom: "1px solid rgba(143, 168, 200, 0.10)" }}
        >
          <div>
            {eyebrow && (
              <span
                className="block font-inter text-[9px] tracking-[0.42em] uppercase mb-2"
                style={{ color: "var(--gold)" }}
              >
                {eyebrow}
              </span>
            )}
            <h3 className="font-cinzel text-xl md:text-2xl text-[#eef4fc] leading-snug tracking-wide">
              {title}
            </h3>
          </div>
          <button
            aria-label="Bezárás"
            onClick={onClose}
            className="flex-shrink-0 mt-1 p-1.5 transition-colors duration-200"
            style={{ color: "var(--muted)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--gold)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted)")}
          >
            <X size={18} />
          </button>
        </div>

        {/* ── Single scrollable zone: image + content scroll as one ── */}
        <div className="overflow-y-auto flex-1 min-h-0">

          {/* Hero image with bottom fade-into-modal */}
          {img && (
            <div className="relative w-full" style={{ height: "260px", flexShrink: 0 }}>
              <Image src={img} alt={title} fill className="object-cover" />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to bottom, rgba(5,12,24,0.1) 0%, transparent 22%, rgba(5,12,24,0.55) 68%, #050c18 100%)",
                }}
              />
              {/* Gold divider sitting over the faded bottom edge */}
              <div
                className="absolute bottom-0 left-0 right-0 flex items-center gap-3 px-8 pb-4"
                style={{ zIndex: 10 }}
              >
                <span className="flex-1 h-px" style={{ background: "linear-gradient(to right, rgba(196,164,86,0.85), transparent)" }} />
                <span style={{ color: "var(--gold)", fontSize: "14px", lineHeight: 1 }}>◈</span>
                <span className="flex-1 h-px" style={{ background: "linear-gradient(to left, rgba(196,164,86,0.85), transparent)" }} />
              </div>
            </div>
          )}

          {/* Divider for no-image modals (price lists, etc.) */}
          {!img && (
            <div className="flex items-center gap-3 px-8 pt-6 pb-1">
              <span className="flex-1 h-px" style={{ background: "linear-gradient(to right, rgba(196,164,86,0.7), transparent)" }} />
              <span style={{ color: "var(--gold)", fontSize: "14px" }}>◈</span>
              <span className="flex-1 h-px" style={{ background: "linear-gradient(to left, rgba(196,164,86,0.7), transparent)" }} />
            </div>
          )}

          {/* Content body */}
          <div
            className="px-8 py-7 font-inter text-sm md:text-[15px] space-y-4 leading-[1.85]"
            style={{ color: "var(--text-lighter)" }}
          >
            {children}
          </div>

          {/* ── CTA — kapcsolatfelvétel ── */}
          <div className="px-8 pb-9 pt-2">
            <div className="flex items-center gap-3 mb-6">
              <span className="flex-1 h-px" style={{ background: "linear-gradient(to right, rgba(196,164,86,0.3), transparent)" }} />
            </div>
            <button
              onClick={() => {
                onClose();
                setTimeout(() => {
                  document.getElementById("kapcsolat")?.scrollIntoView({ behavior: "smooth" });
                }, 120);
              }}
              className="w-full py-4 font-inter text-[10px] tracking-[0.35em] uppercase transition-all duration-300 flex items-center justify-center gap-3"
              style={{
                color:        "var(--gold)",
                borderTop:    "1px solid rgba(196,164,86,0.18)",
                borderBottom: "1px solid rgba(196,164,86,0.18)",
                background:   "rgba(196,164,86,0.04)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "rgba(196,164,86,0.09)";
                (e.currentTarget as HTMLButtonElement).style.borderTopColor = "rgba(196,164,86,0.45)";
                (e.currentTarget as HTMLButtonElement).style.borderBottomColor = "rgba(196,164,86,0.45)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "rgba(196,164,86,0.04)";
                (e.currentTarget as HTMLButtonElement).style.borderTopColor = "rgba(196,164,86,0.18)";
                (e.currentTarget as HTMLButtonElement).style.borderBottomColor = "rgba(196,164,86,0.18)";
              }}
            >
              <span style={{ color: "var(--gold)", fontSize: "13px" }}>◈</span>
              Kapcsolatfelvétel
              <span style={{ fontSize: "11px", opacity: 0.7 }}>→</span>
            </button>
          </div>

        </div>
        {/* ── No Bezárás footer; X button handles close ── */}
      </div>
    </div>
  );
}
