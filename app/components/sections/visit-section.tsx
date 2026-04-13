import { memo } from "react";
import { reservationRows } from "../landing-data";

function VisitSection() {
  return (
    <section id="visit" className="wine-surface relative overflow-hidden pb-6 pt-10 sm:pb-8">

      <div className="relative z-10 w-full text-[#f0ddd0]">
        <p className="mx-auto h-6 w-6 text-center text-4xl leading-none text-[#f53345]" data-spin>
          ✦
        </p>

        <div className="mt-6 px-4 text-center text-[#f2dfd2] sm:px-8" data-fade-up>
          <p className="font-display-face text-[clamp(28px,2.1vw,38px)] leading-none">Why wait?</p>
          <p className="mt-1 font-display-face text-[clamp(18px,1.2vw,22px)] leading-none">
            Request your reservation now
          </p>
        </div>

        <p className="my-18 overflow-hidden  py-10 font-script-face text-8xl leading-[0.78] text-[#f4e7dd] sm:py-7">
          <span data-marquee-loop className="marquee-track -ml-18 block pr-18 tracking-[-0.012em]">
            Reservation Request Richiesta di Prenotazione
          </span>
        </p>

        <div className="grid border-y border-[#f0dac9]/18 px-4 font-mono text-center sm:grid-cols-2 sm:px-8">
          <p className="overflow-hidden py-6">
            <span data-slide-up className="block">From Monday to Saturday</span>
          </p>
          <p className="overflow-hidden border-t border-[#f0dac9]/18 py-6 sm:border-l sm:border-t-0">
            <span data-slide-up className="block">6.00 PM - 00.00</span>
          </p>
        </div>

        <div className="grid border-b border-[#f0dac9]/18 px-4 sm:grid-cols-3 sm:px-8">
          {reservationRows.map((row) => (
            <article
              className="border-b font-mono border-[#f0dac9]/18 px-3 py-8 text-center sm:border-b-0 sm:border-r sm:border-[#f0dac9]/18 sm:last:border-r-0"
              key={row.label}
            >
              <p className="overflow-hidden text-xl font-semibold leading-none">
                <span data-slide-up className="block">{row.label}</span>
              </p>
              <p className="mt-5 overflow-hidden leading-6">
                <span data-slide-up className="block whitespace-pre-line">{row.value}</span>
              </p>
            </article>
          ))}
        </div>


        <div className="grid border-b border-[#f0dac9]/18 font-mono px-4 py-5 sm:grid-cols-2 sm:px-8">
          <p className="overflow-hidden">
            <span data-slide-up className="block">©2026 Nidaba Sas - VAT 01689520268</span>
          </p>
          <p className="overflow-hidden text-left sm:text-right">
            <span data-slide-up className="block">Privacy - Cookie</span>
          </p>
        </div>

      </div>
    </section>
  );
}

export default memo(VisitSection);
