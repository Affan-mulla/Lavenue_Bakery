import { memo, type RefObject } from "react";

type LandingHeaderProps = {
  headerShellRef: RefObject<HTMLDivElement | null>;
  magneticRef: RefObject<HTMLAnchorElement | null>;
};

function LandingHeader({ headerShellRef, magneticRef }: LandingHeaderProps) {
  return (
    <header className="fixed inset-x-0 top-0 z-40 px-4 pt-4 sm:px-6 lg:px-10">
      <div
        ref={headerShellRef}
        className="mx-auto flex w-full max-w-7xl items-center justify-between rounded-2xl border border-[#2e56d8]/20 bg-white/75 px-4 py-3 backdrop-blur-xl transition-all duration-300 md:px-6"
      >
        <a className="font-display-face text-xl tracking-wide" href="#home">
          L&apos;Avenue Boulangerie
        </a>

        <nav
          className="hidden items-center gap-8 text-sm uppercase tracking-[0.18em] text-[#1e356f] md:flex"
          aria-label="Primary navigation"
        >
          <a className="transition-colors hover:text-[#2a4fd2]" href="#menu">
            Menu
          </a>
          <a className="transition-colors hover:text-[#2a4fd2]" href="#atelier">
            Atelier
          </a>
          <a className="transition-colors hover:text-[#2a4fd2]" href="#visit">
            Visit
          </a>
        </nav>

        <a
          ref={magneticRef}
          className="inline-flex h-11 items-center rounded-full bg-[linear-gradient(135deg,#2f57da,#5e80ff)] px-5 text-xs font-semibold uppercase tracking-[0.16em] text-white"
          href="#visit"
        >
          Reserve
        </a>
      </div>
    </header>
  );
}

export default memo(LandingHeader);
