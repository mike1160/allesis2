"use client";

import { useEffect, useState } from "react";

export function WPtoNextAnimation() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) return 0;
        return p + 0.5;
      });
    }, 30);
    return () => clearInterval(interval);
  }, []);

  // 0-30: WordPress zichtbaar
  // 30-70: overgang
  // 70-100: Next.js zichtbaar
  const wpOpacity = progress < 40 ? 1 : progress < 70 ? 1 - (progress - 40) / 30 : 0;
  const nextOpacity = progress < 30 ? 0 : progress < 60 ? (progress - 30) / 30 : 1;
  const blurWP = progress > 30 ? (progress - 30) * 0.3 : 0;
  const blurNext = progress < 60 ? (60 - progress) * 0.3 : 0;

  return (
    <div className="relative flex items-center justify-center" style={{ width: 120, height: 120 }}>
      {/* WordPress logo */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center"
        style={{
          opacity: wpOpacity,
          filter: `blur(${blurWP}px)`,
          transition: "none",
        }}
      >
        <svg width="80" height="80" viewBox="0 0 64 64" aria-hidden>
          <circle cx="32" cy="32" r="32" fill="#21759B" />
          <path
            d="M32 8C18.7 8 8 18.7 8 32s10.7 24 24 24 24-10.7 24-24S45.3 8 32 8zm-1.5 43.2L19.3 38.8c-.4-1.1-.6-2.3-.6-3.5 0-4.2 2.3-7.8 5.7-9.7l6.1 16.7-1.1.7v.2zm3 .2l-1.2-3.3 3.8-11.1 3.2 8.7c.1.3.3.6.4.9-1.9 1.9-4 3.3-6.2 4.8zm13.1-5.8c1.1-2.1 1.7-4.4 1.7-6.9 0-2.8-.7-5.4-2-7.7l-2.9 8.4-5.3-14.6c1.7-.1 3.3-.3 3.3-.3.8-.1.7-1.2-.1-1.2 0 0-4.6.3-7.5.3-2.8 0-7.4-.3-7.4-.3-.8 0-.9 1.2-.1 1.2 0 0 1.5.2 3.1.3L26.2 36l-7.5-22.3C21.5 11.3 26.5 9.7 32 9.7c7 0 13.3 2.7 18 7.1-.1 0-.2-.1-.3-.1-2.8 0-4.8 2.4-4.8 5 0 2.3 1.3 4.3 2.8 6.6 1.1 1.9 2.3 4.3 2.3 7.8 0 2.4-.9 5.2-2.6 8.5l-3.8-12.7-4.8 14.2c2.7-.7 5.1-1.9 7.3-3.8z"
            fill="white"
          />
        </svg>
        <span className="mt-1 text-xs font-bold text-[#21759B]">WordPress</span>
      </div>

      {/* Next.js logo */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center"
        style={{
          opacity: nextOpacity,
          filter: `blur(${blurNext}px)`,
          transition: "none",
        }}
      >
        <svg width="80" height="80" viewBox="0 0 64 64" aria-hidden>
          <circle cx="32" cy="32" r="32" fill="black" />
          <path d="M52.7 55.7L26.3 22H22v20h4V27.7l23.8 30.4c.9-.7 1.9-1.5 2.9-2.4z" fill="white" />
          <path d="M42 22h4v20h-4z" fill="white" />
        </svg>
        <span className="mt-1 text-xs font-bold text-gray-900">Next.js</span>
      </div>

      {/* Progress ring */}
      <svg className="absolute inset-0" width="120" height="120" style={{ opacity: 0.15 }} aria-hidden>
        <circle
          cx="60"
          cy="60"
          r="55"
          fill="none"
          stroke="#2563EB"
          strokeWidth="2"
          strokeDasharray={`${progress * 3.46} 346`}
          strokeLinecap="round"
          transform="rotate(-90 60 60)"
        />
      </svg>
    </div>
  );
}
