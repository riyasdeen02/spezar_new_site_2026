import Image from "next/image";
import Icon from "@/components/ui/Icon";
import SpotlightCard from "@/components/ui/SpotlightCard";
import SectionHeading from "@/components/ui/SectionHeading";
import { processStages } from "@/data/content";
import whatWeDoImage from "@/media/whatwedo.webp";

export default function Process() {
  return (
    <section
      id="process"
      className="w-full bg-surface-container-lowest/90 py-space-xl lg:py-24 px-margin-mobile lg:px-margin relative"
    >
      <div className="max-w-[1440px] mx-auto flex flex-col gap-space-xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-stretch">
          <div className="reveal lg:col-span-5 flex items-center">
            <SectionHeading
              title="From idea to engineered product."
              lead="Hardware mistakes get expensive the later they're found. Our six-stage process tackles the risky decisions early, so every step builds on something already tested."
            />
          </div>
          <div className="relative min-h-[220px] lg:min-h-[260px] overflow-hidden rounded-2xl border border-white/10 lg:col-span-7 reveal">
            <Image
              src={whatWeDoImage}
              alt="Product engineer working on a 3D mechanical design at a workstation"
              fill
              sizes="(max-width: 1024px) 100vw, 58vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#080b12]/85 via-[#080b12]/30 to-transparent" />
            <div className="absolute bottom-5 left-5 sm:bottom-7 sm:left-7 max-w-sm">
              <p className="text-lg sm:text-xl font-semibold text-white">Ideas become tested hardware, one stage at a time.</p>
            </div>
          </div>
        </div>

        <ol className="process-timeline grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-space-md">
          {processStages.map((stage) => (
            <SpotlightCard
              as="li"
              key={stage.num}
              image={null}
              className={`process-stage-card p-4 flex flex-col gap-3 group reveal ${
                stage.final ? "is-final border-primary/30" : ""
              }`}
            >
              <div className="flex items-center justify-between relative z-10">
                <span className="process-step-badge" aria-label={`Stage ${stage.num}`}>
                  {stage.num}
                </span>
                <Icon
                  name={stage.icon}
                  className={`text-[20px] ${
                    stage.final
                      ? "text-primary"
                      : "text-outline group-hover:text-primary transition-colors"
                  }`}
                />
              </div>
              <h4 className="font-headline-sm text-body-lg font-semibold text-on-surface group-hover:text-primary transition-colors relative z-10">
                {stage.title}
              </h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant relative z-10 leading-relaxed">
                {stage.body}
              </p>
              {stage.services?.length > 0 && (
                <ul className="process-services" aria-label={`${stage.title} services`}>
                  {stage.services.map((service) => (
                    <li key={service}>{service}</li>
                  ))}
                </ul>
              )}
            </SpotlightCard>
          ))}
        </ol>
      </div>
    </section>
  );
}
