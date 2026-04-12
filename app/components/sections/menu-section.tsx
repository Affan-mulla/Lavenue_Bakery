import { memo } from "react";
import { featureItems } from "../landing-data";

function MenuShape({ shape }: { shape: "circle" | "diamond" | "star" }) {
  if (shape === "circle") {
    return (
      <span className="block h-40 w-40 rounded-full bg-primary md:h-48 md:w-48" />
    );
  }

  if (shape === "diamond") {
    return (
      <svg
        className="h-40 w-40 fill-primary md:h-48 md:w-48"
        viewBox="0 0 200 200"
        aria-hidden="true"
      >
        <path d="M100 20C105.783 63.339 136.661 94.217 180 100C136.661 105.783 105.783 136.661 100 180C94.217 136.661 63.339 105.783 20 100C63.339 94.217 94.217 63.339 100 20Z" />
      </svg>
    );
  }

  return (
    <svg
      className="h-40 w-40 fill-primary md:h-48 md:w-48"
      viewBox="0 0 200 216"
      aria-hidden="true"
    >
      <path d="M100 14L124 43H166V84L195 108L166 132V173H124L100 202L76 173H34V132L5 108L34 84V43H76L100 14Z" />
    </svg>
  );
}

function MenuSection() {
  

  return (
    <section
      id="menu"
      className="wine-surface relative overflow-hidden pb-16 pt-18 "
    >
      <div className="w-full">
        <div className="flex items-start justify-center gap-4 text-lg text-[#efe2d8]/88">
          <div className="max-w-xs text-center" data-fade-up>
            <p className="text-primary text-4xl leading-none" data-spin>
              ✦
            </p>
            <p className="mt-2 text-base uppercase leading-[1.15] tracking-[0.08em]">
              Discover the menu of the day.
            </p>
            <p className="text-base uppercase leading-[1.15] tracking-[0.08em]">
              Beers, dishes and specials
            </p>
          </div>
        </div>

        <div className="mt-10 overflow-hidden py-2">
          <p className="pointer-events-none overflow-hidden font-display-face text-[clamp(68px,11vw,150px)]  text-[#f5e9df]">
            <span data-marquee-loop className="marquee-track block">
              Menu of the day • Menu of the day • Menu of the day • Menu of the day • Menu of the day •
            </span>
          </p>
        </div>

        <div className="relative mx-auto mt-4 max-w-6xl">
          <div className="grid gap-6 md:grid-cols-3 md:gap-10">
            {featureItems.map((item, index) => (
              <article
                key={item.title}
                className="mask-card relative px-2 pb-5 pt-4"
                data-mask-card
                data-menu-card
              >
                <div className="flex min-h-56 items-center justify-center">
                  <MenuShape shape={item.shape} />
                </div>

                <div className="mt-3 overflow-hidden flex items-center justify-between border-y border-[#ecd8ca] py-2">
                  <p className="text-4xl leading-none" data-spin>
                    ✦
                  </p>
                  <p
                    className="font-display-face text-[clamp(30px,2.8vw,40px)] italic leading-none text-[#f7ede4] font-bold overflow-hidden whitespace-nowrap"
                  data-menu-hover-text
                  >
                    {item.title}
                  </p>
                  <p
                    className="font-display-face text-3xl text-[#f7ede4]/90"
                  >
                    ({String(index + 1).padStart(2, "0")})
                  </p>
                </div>

                <p
                  className="mt-5 max-w-[35ch] text-lg leading-[1.15] text-[#e9d8ca]/92 font-mono"
                  
                >
                  {item.copy}
                </p>

                <a
                  href="#visit"
                  className="mt-6 inline-flex items-center gap-2 text-2xl font-semibold text-[#f7ede4] hover:underline"
                >
                  <span >Discover</span>
                  <span
                    aria-hidden="true"
                    className="inline-block text-primary"
                  >
                    {"->"}
                  </span>
                </a>
              </article>
            ))}
          </div>

          <div className="mt-12 pt-3" data-fade-up>
            <p className="flex items-center gap-2 text-sm uppercase tracking-[0.12em] text-[#eedfd4]">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#ecd8ca]">
                {"->"}
              </span>
              Discover the menu
              <span className="text-primary">10 aprile, venerdi</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(MenuSection);
