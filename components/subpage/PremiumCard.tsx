"use client";

import { motion } from "framer-motion";

const easeOut = "easeOut" as const;

export default function PremiumCard({
  children,
  className = "",
  highlighted = false,
}: {
  children: React.ReactNode;
  className?: string;
  /** Donker blauwe variant (bijv. hosting “meest gekozen”) */
  highlighted?: boolean;
}) {
  if (highlighted) {
    return (
      <motion.div
        className={`rounded-2xl bg-primary p-8 text-white shadow-[0_20px_50px_-12px_rgba(26,59,204,0.45)] ${className}`}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, ease: easeOut }}
        whileHover={{ y: -6, transition: { duration: 0.35, ease: easeOut } }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={`rounded-2xl border border-neutral-light/90 bg-white p-8 shadow-[0_12px_40px_-12px_rgba(10,15,30,0.12)] ${className}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease: easeOut }}
      whileHover={{
        y: -8,
        boxShadow: "0 24px 56px -14px rgba(26,59,204,0.22)",
        borderColor: "rgba(26, 59, 204, 0.25)",
        transition: { duration: 0.35, ease: easeOut },
      }}
    >
      {children}
    </motion.div>
  );
}
