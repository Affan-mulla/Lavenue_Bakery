import Link from "next/link";

export const metadata = {
  title: "Page Not Found | L'Avenue Boulangerie",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-(--wine-950) px-6 text-center text-(--ink-soft)">
      <div className="max-w-2xl">
        <p className="font-display-face text-[clamp(5rem,18vw,12rem)] leading-none">404</p>
        <p className="mt-5 font-display-face text-[clamp(1.25rem,3.6vw,2rem)] leading-tight">
          This page doesn&apos;t exist &mdash; but great food does.
        </p>
        <Link
          href="/"
          className="mt-10 inline-flex items-center justify-center rounded-full border border-[#f2eae3]/40 px-6 py-2 font-display-face text-2xl leading-none"
        >
          Back To Home
        </Link>
      </div>
    </main>
  );
}