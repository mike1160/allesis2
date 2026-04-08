"use client";

import { motion } from "framer-motion";
import { Check, Globe, Palette, Search, Shield } from "lucide-react";

const BRAND = "#1a3bcc";
const easeOut = "easeOut" as const;

const floatTransition = (delay: number) => ({
  duration: 3.2 + delay * 0.15,
  repeat: Infinity,
  ease: easeOut,
  repeatType: "mirror" as const,
  delay: delay * 0.2,
});

type IconBlockProps = {
  titel: string;
  index: number;
  cardHovered: boolean;
};

/** Gedeelde container: conic draait, cirkel pulse, float */
function IconAuraShell({
  children,
  index,
  cardHovered,
  conicColors,
  glowColor,
}: {
  children: React.ReactNode;
  index: number;
  cardHovered: boolean;
  conicColors: string;
  glowColor: string;
}) {
  return (
    <motion.div
      className="relative mx-auto mb-2 flex h-[104px] w-[104px] shrink-0 items-center justify-center"
      style={{ perspective: 400 }}
      animate={{
        y: [0, -10, 0],
      }}
      transition={floatTransition(index)}
    >
      <motion.div
        className="absolute inset-0 rounded-full opacity-90"
        style={{
          background: conicColors,
        }}
        animate={{ rotate: cardHovered ? 360 : 360 }}
        transition={
          cardHovered
            ? { duration: 2.2, repeat: Infinity, ease: "linear" }
            : { duration: 14, repeat: Infinity, ease: "linear" }
        }
      />
      <motion.div
        className="absolute inset-[3px] rounded-full bg-white"
        animate={{
          boxShadow: cardHovered
            ? [`0 0 28px ${glowColor}`, `0 0 48px ${glowColor}`, `0 0 28px ${glowColor}`]
            : [`0 0 12px ${glowColor}`, `0 0 28px ${glowColor}`, `0 0 12px ${glowColor}`],
        }}
        transition={{
          duration: cardHovered ? 1.2 : 2.4,
          repeat: Infinity,
          ease: easeOut,
          delay: index * 0.12,
        }}
      />
      <div className="relative z-[2] flex items-center justify-center">{children}</div>
    </motion.div>
  );
}

function PaintDrops({ cardHovered }: { cardHovered: boolean }) {
  const drops = [
    { x: -18, color: "#ff006e", delay: 0 },
    { x: 22, color: "#00f5d4", delay: 0.4 },
    { x: 6, color: "#fee440", delay: 0.8 },
    { x: -8, color: "#9b5de5", delay: 1.2 },
  ];
  return (
    <>
      {drops.map((d, i) => (
        <motion.div
          key={i}
          className="pointer-events-none absolute rounded-full"
          style={{
            width: 10,
            height: 14,
            left: "50%",
            marginLeft: d.x,
            top: 18,
            background: `linear-gradient(180deg, ${d.color}, transparent)`,
            borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
          }}
          animate={{
            y: [0, 28, 8, 22, 0],
            x: [0, d.x * 0.15, -d.x * 0.1, 0],
            opacity: [0.85, 1, 0.7, 1, 0.85],
            scaleY: [1, 1.2, 0.85, 1.05, 1],
          }}
          transition={{
            duration: cardHovered ? 1.8 : 2.8,
            repeat: Infinity,
            ease: easeOut,
            delay: d.delay + i * 0.1,
          }}
        />
      ))}
    </>
  );
}

function PaletteEpic({ index, cardHovered }: { index: number; cardHovered: boolean }) {
  const spinDuration = cardHovered ? 1.2 : 4;

  return (
    <IconAuraShell
      index={index}
      cardHovered={cardHovered}
      conicColors={`conic-gradient(from 0deg, #ff006e, #ffbe0b, #3a86ff, #8338ec, #ff006e)`}
      glowColor="rgba(255, 0, 150, 0.45)"
    >
      <div className="relative flex h-[72px] w-[72px] items-center justify-center">
        <PaintDrops cardHovered={cardHovered} />
        <motion.div
          animate={{
            rotate: 360,
            filter: [
              "hue-rotate(0deg) drop-shadow(0 0 16px rgba(255,0,110,0.95)) drop-shadow(0 0 32px rgba(0,245,212,0.55))",
              "hue-rotate(120deg) drop-shadow(0 0 22px rgba(0,245,212,1)) drop-shadow(0 0 38px rgba(155,93,229,0.6))",
              "hue-rotate(240deg) drop-shadow(0 0 16px rgba(155,93,229,0.95)) drop-shadow(0 0 32px rgba(255,190,11,0.55))",
              "hue-rotate(360deg) drop-shadow(0 0 16px rgba(255,0,110,0.95)) drop-shadow(0 0 32px rgba(0,245,212,0.55))",
            ],
          }}
          transition={{
            rotate: { duration: spinDuration, repeat: Infinity, ease: "linear" },
            filter: { duration: cardHovered ? 2.2 : 5.5, repeat: Infinity, ease: "linear" },
          }}
        >
          <Palette className="h-16 w-16 text-white" strokeWidth={1.45} fill="rgba(255,255,255,0.08)" aria-hidden />
        </motion.div>
      </div>
    </IconAuraShell>
  );
}

function ShieldEpic({ index, cardHovered }: { index: number; cardHovered: boolean }) {
  const ringSpeed = cardHovered ? 2.5 : 6;
  const particles = 8;

  return (
    <IconAuraShell
      index={index}
      cardHovered={cardHovered}
      conicColors={`conic-gradient(from 0deg, #FFD700, #ffec80, #daa520, #FFD700, #fff8dc, #FFD700)`}
      glowColor="rgba(26, 59, 204, 0.5)"
    >
      <div className="relative flex h-[88px] w-[88px] items-center justify-center">
        {/* Orbiting particles */}
        <motion.div
          className="pointer-events-none absolute left-1/2 top-1/2 h-[100px] w-[100px] -translate-x-1/2 -translate-y-1/2"
          animate={{ rotate: cardHovered ? 360 : -360 }}
          transition={{ duration: cardHovered ? 5 : 16, repeat: Infinity, ease: "linear" }}
        >
          {Array.from({ length: particles }).map((_, i) => (
            <span
              key={i}
              className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-400 shadow-[0_0_10px_#FFD700]"
              style={{
                transform: `rotate(${i * (360 / particles)}deg) translateY(-46px)`,
              }}
            />
          ))}
        </motion.div>

        {/* Golden halo ring */}
        <motion.div
          className="pointer-events-none absolute h-[76px] w-[76px] rounded-full border-[3px] border-amber-400"
          style={{
            boxShadow: "0 0 20px rgba(255, 215, 0, 0.55), inset 0 0 12px rgba(255, 215, 0, 0.2)",
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: ringSpeed, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="pointer-events-none absolute h-[84px] w-[84px] rounded-full border border-amber-200/60"
          animate={{ rotate: -360 }}
          transition={{ duration: ringSpeed * 1.4, repeat: Infinity, ease: "linear" }}
        />

        <motion.div
          className="relative z-[3] flex h-[72px] w-[72px] items-center justify-center rounded-2xl"
          animate={{
            scale: cardHovered ? [1, 1.12, 1.08] : [1, 1.04, 1],
            boxShadow: cardHovered
              ? [
                  `0 0 20px rgba(26,59,204,0.55), 0 0 40px rgba(26,59,204,0.45)`,
                  `0 0 36px rgba(26,59,204,0.95), 0 0 60px rgba(91,124,255,0.5)`,
                  `0 0 20px rgba(26,59,204,0.55), 0 0 40px rgba(26,59,204,0.45)`,
                ]
              : [
                  `0 0 14px rgba(26,59,204,0.35)`,
                  `0 0 28px rgba(26,59,204,0.65)`,
                  `0 0 14px rgba(26,59,204,0.35)`,
                ],
          }}
          transition={{
            duration: cardHovered ? 1.1 : 2.2,
            repeat: Infinity,
            ease: easeOut,
            delay: index * 0.08,
          }}
        >
          <Shield
            className="relative z-[1] h-16 w-16"
            stroke={BRAND}
            strokeWidth={1.6}
            fill="rgba(26, 59, 204, 0.14)"
            aria-hidden
          />
          <motion.div
            className="absolute inset-0 flex items-center justify-center pt-1"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 380,
              damping: 18,
              delay: 0.35 + index * 0.12,
            }}
          >
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                y: [0, -3, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: easeOut,
                delay: 0.8 + index * 0.1,
              }}
            >
              <Check className="h-7 w-7 text-emerald-500 drop-shadow-[0_0_6px_rgba(16,185,129,0.8)]" strokeWidth={3} aria-hidden />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </IconAuraShell>
  );
}

function GlobeEpic({ index, cardHovered }: { index: number; cardHovered: boolean }) {
  return (
    <IconAuraShell
      index={index}
      cardHovered={cardHovered}
      conicColors={`conic-gradient(from 0deg, ${BRAND}, #5b7cff, #22d3ee, #5b7cff, ${BRAND})`}
      glowColor="rgba(34, 211, 238, 0.4)"
    >
      <motion.div
        animate={{ rotate: cardHovered ? [0, 15, -15, 0] : [0, 8, -8, 0] }}
        transition={{ duration: cardHovered ? 2 : 5, repeat: Infinity, ease: easeOut, delay: index * 0.15 }}
      >
        <Globe className="h-16 w-16 text-primary" strokeWidth={1.5} aria-hidden />
      </motion.div>
    </IconAuraShell>
  );
}

function SearchEpic({ index, cardHovered }: { index: number; cardHovered: boolean }) {
  return (
    <IconAuraShell
      index={index}
      cardHovered={cardHovered}
      conicColors={`conic-gradient(from 0deg, #7c3aed, ${BRAND}, #06b6d4, ${BRAND}, #7c3aed)`}
      glowColor="rgba(124, 58, 237, 0.4)"
    >
      <motion.div
        animate={{
          scale: cardHovered ? [1, 1.08, 1] : [1, 1.04, 1],
          rotate: cardHovered ? [0, -12, 12, 0] : [0, -6, 6, 0],
        }}
        transition={{ duration: cardHovered ? 1.8 : 3.5, repeat: Infinity, ease: easeOut, delay: index * 0.18 }}
      >
        <Search className="h-16 w-16 text-primary" strokeWidth={1.5} aria-hidden />
      </motion.div>
    </IconAuraShell>
  );
}

export default function HomeServiceIconBlock({ titel, index, cardHovered }: IconBlockProps) {
  switch (titel) {
    case "Webdesign":
      return <PaletteEpic index={index} cardHovered={cardHovered} />;
    case "AVG & Compliance":
      return <ShieldEpic index={index} cardHovered={cardHovered} />;
    case "Hosting & Domeinen":
      return <GlobeEpic index={index} cardHovered={cardHovered} />;
    case "SEO & Vindbaarheid":
      return <SearchEpic index={index} cardHovered={cardHovered} />;
    default:
      return <GlobeEpic index={index} cardHovered={cardHovered} />;
  }
}
