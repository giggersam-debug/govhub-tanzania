"use client";

import { useEffect, useState } from "react";

export default function SplashScreen({ children }: { children: React.ReactNode }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 3800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {children}
      <div
        aria-hidden={!visible}
        className={`fixed inset-0 z-[999] bg-green flex flex-col items-center justify-center transition-opacity duration-500 ${
          visible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <svg width="120" height="120" viewBox="0 0 64 64" className="animate-pulse">
          <defs>
            <path id="splash-seal-path" d="M 32,32 m -24,0 a 24,24 0 1,1 48,0 a 24,24 0 1,1 -48,0" />
          </defs>
          <circle cx="32" cy="32" r="30" fill="none" stroke="#F0B429" strokeWidth="1.4" strokeDasharray="1.5 3.4" opacity="0.6" />
          <circle cx="32" cy="32" r="22" fill="none" stroke="#F0B429" strokeWidth="1.2" />
          <text fontSize="5.6" fill="#F0B429" letterSpacing="2">
            <textPath href="#splash-seal-path" startOffset="1%">
              RASMI • SERIKALI • RASMI • SERIKALI •
            </textPath>
          </text>
          <text x="32" y="37" textAnchor="middle" fontSize="15" fontWeight="700" fill="#F0B429" fontFamily="IBM Plex Mono, monospace">
            GH
          </text>
        </svg>
        <div className="mt-6 font-display font-bold text-white text-xl tracking-wide">GovHub Tanzania</div>
        <div className="mt-1.5 font-mono text-[11px] tracking-[0.22em] uppercase text-gold">Rasmi · Serikali</div>
      </div>
    </>
  );
}
