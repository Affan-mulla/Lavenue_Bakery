import { memo } from "react";

function LandingHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 px-4 pt-4 sm:px-8">
      <nav
        className="mx-auto my-8 flex w-full items-start justify-between  transition-all duration-300"
      >
        <div className="flex items-center gap-6 md:gap-10">
          <a className="font-display-face text-2xl leading-none" href="#menu">
            Menu
          </a>
          <a className="font-display-face text-2xl leading-none" href="#philosophy">
            Philosophy
          </a>
        </div>

        <a
          className="inline-flex items-center justify-center rounded-full px-2 font-display-face text-2xl leading-none"
          href="#visit"
        >
          Book
        </a>
      </nav>
    </header>
  );
}

export default memo(LandingHeader);
