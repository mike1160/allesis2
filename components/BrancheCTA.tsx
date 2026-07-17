import Link from "next/link";

type BrancheCTAProps = {
  branche: string;
};

export function BrancheCTA({ branche }: BrancheCTAProps) {
  return (
    <section className="border-t border-blue-100 bg-blue-50 px-6 py-16 text-center">
      <h2 className="font-sora mb-4 text-3xl font-black text-gray-900">Klaar om online te gaan?</h2>
      <p className="font-lato mx-auto mb-8 max-w-md text-gray-500">
        Vraag vandaag uw website aan. Online binnen 24 uur mogelijk.**
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <Link
          href={`/contact?branche=${branche}`}
          className="font-lato rounded-xl bg-blue-600 px-8 py-4 font-black text-white transition-colors hover:bg-blue-700"
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
        <Link href="/voorwaarden" className="text-blue-500 hover:underline">
          voorwaarden
        </Link>{" "}
        · ** Bij tijdige aanlevering content en logo
      </p>
    </section>
  );
}

export default BrancheCTA;
