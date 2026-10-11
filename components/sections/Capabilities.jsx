import Image from "next/image";
import SectionHeading from "@/components/ui/SectionHeading";
import { capabilities } from "@/data/content";
import benchImage from "@/media/capabilities-bench.webp";

export default function Capabilities() {
  return (
    <section
      id="capabilities"
      className="w-full bg-surface/80 py-space-xl lg:py-24 px-margin-mobile lg:px-margin relative"
    >
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-start relative z-10">
        <div className="lg:col-span-5 flex flex-col justify-center gap-space-lg">
          <div className="reveal">
            <SectionHeading
              title="We engineer the difficult parts."
              lead="From the first technical concept to a functional prototype, Spezar brings together the disciplines required to turn an idea into a real, testable product."
            />
          </div>

          <ol className="capability-title-list" aria-label="Engineering capabilities">
            {capabilities.map((capability, index) => (
              <li className="capability-title-item reveal" key={capability.title} tabIndex={0}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div className="capability-title-copy">
                  <h3>{capability.title}</h3>
                  <p>{capability.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <figure className="capability-image-frame reveal lg:col-span-7">
          <Image
            src={benchImage}
            alt="A connected device mid-assembly on an engineering workbench, with its CAD model on screen and an oscilloscope behind"
            fill
            sizes="(max-width: 1024px) 100vw, 58vw"
            className="object-cover object-[55%_62%]"
            priority={false}
          />
          <div className="capability-image-shade" aria-hidden="true" />
        </figure>
      </div>
    </section>
  );
}
