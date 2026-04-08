import type { Metadata } from "next";
import RegisterForm from "@/components/auth/RegisterForm";
import PremiumCard from "@/components/subpage/PremiumCard";
import { Reveal } from "@/components/subpage/Reveal";
import SubpageHero from "@/components/subpage/SubpageHero";

export const metadata: Metadata = {
  title: "Registreren",
  description: "Maak een account aan bij Allesis.",
  robots: { index: false, follow: false },
};

export default function RegisterPage() {
  return (
    <>
      <SubpageHero eyebrow="Klantenpaneel" title="Account aanmaken" subtitle="Gratis registreren als klant" />
      <Reveal className="flex min-h-[50vh] items-center justify-center bg-neutral-light/50 px-6 py-16 md:py-20">
        <div className="w-full max-w-md">
          <div className="mb-8 flex justify-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary">
              <span className="font-sora text-xl font-extrabold text-white">A</span>
            </div>
          </div>
          <PremiumCard className="!p-8">
            <RegisterForm />
          </PremiumCard>
        </div>
      </Reveal>
    </>
  );
}

export const dynamic = "force-dynamic";
