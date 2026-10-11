import Icon from "@/components/ui/Icon";
import SpotlightCard from "@/components/ui/SpotlightCard";
import { cardImages } from "@/data/content";

const checks = [
  "No friction between PCB dimensions and enclosure tolerances",
  "Firmware developers sit right next to hardware bring-up benches",
  "Continuous testing at each iteration prevents costly re-spins",
];

const topStacks = [
  {
    tag: "INPUT • STACK 01",
    tagClass: "text-primary",
    hover: "hover:border-primary/30",
    title: "Electronics Design",
    body: "Schematic, power tree, component layout",
  },
  {
    tag: "CONTROL • STACK 02",
    tagClass: "text-secondary",
    hover: "hover:border-secondary/30",
    title: "Firmware & RTOS",
    body: "Drivers, scheduling, telemetry bus",
  },
  {
    tag: "CHASSIS • STACK 03",
    tagClass: "text-tertiary",
    hover: "hover:border-tertiary/30",
    title: "Mechanical 3D",
    body: "Enclosures, thermal CFD, ergonomics",
  },
];

const bottomStacks = [
  {
    tag: "INTERFACE • STACK 04",
    tagClass: "text-secondary",
    hover: "hover:border-secondary/30",
    title: "Cloud & Software",
    body: "Dashboards, API endpoints, web sockets",
  },
  {
    tag: "BUILD • STACK 05",
    tagClass: "text-primary",
    hover: "hover:border-primary/30",
    title: "In-Lab Fabrication",
    body: "Rapid 3D printing, reflow, testing",
  },
];

export default function WhySpezar() {
  return (
    <section
      id="why-spezar"
      className="w-full bg-surface-container-lowest/90 py-space-xl lg:py-24 px-margin-mobile lg:px-margin relative"
    >
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-center relative z-10">
        <div className="lg:col-span-5 flex flex-col gap-space-md reveal">
          <div className="flex items-center gap-2 font-label-mono-sm text-label-mono-sm uppercase text-outline">
            <span>04 // UNIFIED DISCIPLINE</span>
            <span className="text-outline-variant">—</span>
            <span className="text-primary font-medium">THE INTEGRATION ADVANTAGE</span>
          </div>
          <h2 className="text-headline-xl-mobile lg:text-headline-xl font-headline-xl text-on-surface font-semibold tracking-tight">
            Engineering under one roof.
          </h2>
          <p className="text-body-lg font-body-lg text-on-surface-variant leading-relaxed">
            Hardware, firmware, mechanics, and software have to work as one
            cohesive system. When you outsource each piece to separate agencies,
            interface assumptions break and timelines slip.
          </p>
          <p className="text-body-md font-body-md text-on-surface-variant leading-relaxed">
            Our development approach keeps those disciplines connected from day
            one. When our electronics team routes a board, our mechanical
            engineers are already testing enclosure thermal clearances in CAD.
          </p>
          <div className="flex flex-col gap-3 pt-2 font-label-mono text-label-mono text-on-surface">
            {checks.map((c) => (
              <div key={c} className="flex items-center gap-3">
                <Icon name="check_circle" className="text-secondary text-[20px]" />
                <span>{c}</span>
              </div>
            ))}
          </div>
        </div>

        <SpotlightCard image={cardImages[1]} className="lg:col-span-7 p-5 sm:p-6 flex flex-col gap-4 reveal">
          <div className="flex items-center justify-between text-label-mono-sm font-label-mono-sm text-outline border-b border-white/5 pb-3 relative z-10">
            <span>UNIFIED WORKFLOW SCHEMA</span>
            <span className="text-secondary font-medium">COHERENT SIGNAL CHAIN</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 relative z-10">
            {topStacks.map((s) => (
              <div
                key={s.title}
                className={`p-space-md rounded-xl bg-surface-container-high/60 border border-white/5 ${s.hover} transition-all flex flex-col gap-2`}
              >
                <span className={`font-label-mono-sm text-[10px] uppercase ${s.tagClass}`}>
                  {s.tag}
                </span>
                <span className="font-headline-sm text-body-lg font-semibold text-on-surface">
                  {s.title}
                </span>
                <span className="text-body-sm text-on-surface-variant">{s.body}</span>
              </div>
            ))}
          </div>

          <div className="bg-surface-container-low/80 border border-primary/20 p-space-md rounded-xl flex items-center justify-center gap-4 text-center relative z-10 shadow-inner">
            <Icon name="sync" className="text-primary text-[28px] animate-spin" />
            <div className="flex flex-col text-left">
              <span className="font-headline-sm text-body-md font-semibold text-on-surface">
                Continuous Cross-Domain Validation Bench
              </span>
              <span className="font-body-sm text-body-sm text-on-surface-variant">
                Every revision passes through real physical testing prior to client sign-off
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 relative z-10">
            {bottomStacks.map((s) => (
              <div
                key={s.title}
                className={`p-space-md rounded-xl bg-surface-container-high/60 border border-white/5 ${s.hover} transition-all flex flex-col gap-2`}
              >
                <span className={`font-label-mono-sm text-[10px] uppercase ${s.tagClass}`}>
                  {s.tag}
                </span>
                <span className="font-headline-sm text-body-lg font-semibold text-on-surface">
                  {s.title}
                </span>
                <span className="text-body-sm text-on-surface-variant">{s.body}</span>
              </div>
            ))}
            <div className="p-space-md rounded-xl bg-primary-container text-on-primary-container border border-primary/30 flex flex-col gap-2 shadow-lg shadow-primary-container/20">
              <span className="font-label-mono-sm text-[10px] text-on-primary uppercase font-bold">
                OUTCOME // DEPLOYED
              </span>
              <span className="font-headline-sm text-body-lg font-semibold">
                Testable Working Product
              </span>
              <span className="text-body-sm opacity-90">
                Ready for investors, pilot trials &amp; mass production
              </span>
            </div>
          </div>
        </SpotlightCard>
      </div>
    </section>
  );
}
