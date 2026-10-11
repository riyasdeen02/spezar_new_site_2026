import Icon from "@/components/ui/Icon";
import HeroExplodedView from "@/components/sections/HeroExplodedView";
import { foundedYear } from "@/data/content";
import { withBase } from "@/lib/basePath";

const stats = [
  { value: `${new Date().getFullYear() - foundedYear}+ years`, label: `Building hardware since ${foundedYear}` },
  { value: "End-to-end", label: "From concept to tested hardware" },
  { value: "Global", label: "Clients worldwide" },
  { value: "6 disciplines", label: "One engineering team" },
];

export default function Hero() {
  return (
    <section id="top" className="hero-stage relative isolate overflow-hidden px-margin-mobile lg:px-margin">
      <div className="hero-grid absolute inset-0 pointer-events-none" />
      <div className="hero-horizon absolute inset-x-0 top-[22%] pointer-events-none" />

      <div className="relative z-10 max-w-[1440px] mx-auto">
        <div className="grid min-h-[720px] lg:min-h-[calc(100vh-5rem)] grid-cols-1 lg:grid-cols-12 items-center gap-6 lg:gap-0 pt-24 pb-10 lg:pt-16">
          <div className="hero-copy lg:col-span-6 relative z-20 flex flex-col items-start gap-6">
            <h1 className="max-w-[740px] font-display-lg text-[clamp(3.3rem,7.5vw,7.4rem)] font-medium leading-[0.91] tracking-[-0.075em] text-white">
              Ideas, engineered into <span className="hero-title-accent">real</span> hardware.
            </h1>

            <p className="max-w-xl text-[16px] sm:text-[18px] leading-7 text-slate-300/80">
              We help early-stage startups, innovators, and researchers turn deep-tech ideas into products that work in the real world, with hardware, firmware, mechanics, and software built together.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <a href={withBase("/contact")} className="hero-primary-button group inline-flex items-center gap-3 rounded-full px-6 py-3.5 text-sm font-medium text-white transition-all">
                Start a project
                <Icon name="arrow_forward" className="text-[17px] transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>

          <div className="hero-art lg:col-span-6 relative flex items-center justify-center sm:min-h-[520px] lg:min-h-[640px]">
            <HeroExplodedView />
          </div>
        </div>

        <div className="hero-stats grid grid-cols-2 md:grid-cols-4 border-t border-white/10 py-7 sm:py-9 reveal">
          {stats.map((stat, index) => (
            <div key={stat.label} className={`px-4 sm:px-8 ${index > 0 ? "border-l border-white/10" : "pl-0"}`}>
              <div className="font-display-lg text-[clamp(1.8rem,3vw,3rem)] font-light leading-none tracking-[-0.055em] text-white">{stat.value}</div>
              <div className="mt-2 text-xs sm:text-sm text-slate-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
