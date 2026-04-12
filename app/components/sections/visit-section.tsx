import { memo } from "react";
import { reservationRows } from "../landing-data";

function VisitSection() {
  return (
    <section id="visit" className="wine-surface overflow-hidden pb-10 pt-12">
      <div className="mx-auto w-full max-w-340 border-t border-[#f0dac9]/22 text-[#f0ddd0]">
        <div className="flex items-center justify-between px-4 py-5 text-sm sm:px-8">
          <a href="#menu">Menu</a>
          <a href="#philosophy">Philosophy</a>
          <a href="#visit">Book</a>
        </div>

        <p className="overflow-hidden border-y border-[#f0dac9]/18 py-2 font-display-face text-[clamp(62px,11vw,198px)] leading-[0.82]">
          <span data-marquee-loop className="marquee-track block">
            Reservation Request Richiesta Prenotazione Reservation Request Richiesta Prenotazione
          </span>
        </p>

        <div className="grid border-b border-[#f0dac9]/18 px-4 py-10 text-center text-[clamp(20px,2.3vw,38px)] sm:grid-cols-2 sm:px-8">
          <p>From Tuesday to Saturday</p>
          <p>6.00 PM - 00.00</p>
        </div>

        <div className="grid border-b border-[#f0dac9]/18 px-4 sm:grid-cols-3 sm:px-8">
          {reservationRows.map((row) => (
            <article
              className="border-b border-[#f0dac9]/18 px-3 py-9 text-center sm:border-b-0 sm:border-r sm:border-[#f0dac9]/18 sm:last:border-r-0"
              key={row.label}
            >
              <p className="mb-3 text-[14px] font-semibold">{row.label}</p>
              <p className="font-display-face whitespace-pre-line text-[clamp(26px,3.1vw,52px)] leading-[0.95]">
                {row.value}
              </p>
            </article>
          ))}
        </div>

        <div className="grid border-b border-[#f0dac9]/18 px-4 py-6 text-sm sm:grid-cols-2 sm:px-8">
          <p className="mb-3 sm:mb-0">Join Nidaba on Instagram ✦ Diventa un Nidafellas</p>
          <p className="text-left sm:text-right">Discover ✦ Nidabar</p>
        </div>

        <div className="grid px-4 py-5 text-sm sm:grid-cols-2 sm:px-8">
          <p>©2026 Nidaba Sas - VAT 01689520268</p>
          <p className="text-left sm:text-right">Privacy - Cookie</p>
        </div>
        <p className="px-4 pb-4 text-xs text-[#ceb7a9] sm:px-8">
          Before submitting your request please check your internet connection and reload to complete verification.
        </p>
      </div>
    </section>
  );
}

export default memo(VisitSection);
