import type { Metadata } from "next";
import LoginForm from "@/components/auth/LoginForm";
import PremiumCard from "@/components/subpage/PremiumCard";
import { Reveal } from "@/components/subpage/Reveal";
import SubpageHero from "@/components/subpage/SubpageHero";

export const metadata: Metadata = {
  title: "Inloggen",
  description: "Log in op uw Allesis klantenpaneel.",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <>
      <SubpageHero eyebrow="Klantenpaneel" title="Inloggen" subtitle="Toegang tot uw klantenpaneel" />
      <Reveal className="flex min-h-[50vh] items-center justify-center bg-neutral-light/50 px-6 py-16 md:py-20">
        <div className="w-full max-w-md">
          <div className="mb-8 flex justify-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary">
              <span className="font-sora text-xl font-extrabold text-white">A</span>
            </div>
          </div>
          <PremiumCard className="!p-8">
            <LoginForm />
          </PremiumCard>
        </div>
      </Reveal>
    </>
  );
}

export const dynamic = "force-dynamic";
