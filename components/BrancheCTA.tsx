import Link from "next/link";

type BrancheCTAProps = {
  branche: string;
};

export function BrancheCTA({ branche }: BrancheCTAProps) {
  return (
    <section className="border-t px-6 py-16 text-center" style={{ borderColor: "#EAF3DE", backgroundColor: "#F4F8EC" }}>
      <h2 className="font-sora mb-4 text-3xl font-black text-gray-900">Klaar om online te gaan?</h2>
      <p className="font-lato mx-auto mb-8 max-w-md text-gray-500">
        Vraag vandaag uw website aan. Online binnen 24 uur mogelijk.**
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <Link
          href={`/contact?branche=${branche}`}
          className="font-lato rounded-xl px-8 py-4 font-black text-white transition hover:opacity-90"
          style={{ backgroundColor: "#3B6D11" }}
        >
          Website aanvragen →
        </Link>
        <Link
          href={`/gratis-website?branche=${branche}`}
          className="font-lato rounded-xl bg-[#C8FF00] px-8 py-4 font-black text-gray-900 transition-colors hover:bg-[#B4EF00]"
        >
          🐾 Gratis one-pager*
        </Link>
      </div>
      <p className="font-lato mt-6 text-xs text-gray-400">
        * Zie{" "}
        <Link href="/voorwaarden" className="hover:underline" style={{ color: "#3B6D11" }}>
          voorwaarden
        </Link>{" "}
        · ** Bij tijdige aanlevering content en logo
      </p>
    </section>
  );
}

export default BrancheCTA;
