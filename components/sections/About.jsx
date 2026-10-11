import Image from "next/image";
import Icon from "@/components/ui/Icon";
import SectionHeading from "@/components/ui/SectionHeading";
import { aboutFacts } from "@/data/content";
import workshopImage from "@/media/IMG_2149.webp";

const highlights = [
  { icon: "groups", text: "Focused on early-stage startups, innovators, and researchers building their first products" },
  { icon: "precision_manufacturing", text: "From concept design and 3D CAD to PCB manufacturing, laser cutting, and full-scale manufacturing" },
  { icon: "public", text: "Headquartered in Thanjavur, Tamil Nadu, with a global presence and clients worldwide" },
];

export default function About() {
  return (
    <section
      id="about"
      className="w-full bg-surface-container-lowest/90 py-space-xl lg:py-24 px-margin-mobile lg:px-margin relative scroll-mt-20"
    >
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-center relative z-10">
        <div className="lg:col-span-7 flex flex-col gap-space-lg reveal">
          <SectionHeading
            title="The technology partner for deep-tech startups."
            lead="Spezar Tech is a deep tech research & product development company. With a global presence, we work as a full engineering partner, taking products from first sketch to tested hardware with electronics, firmware, mechanics, and software under one roof."
          />

          <ul className="about-highlights">
            {highlights.map((item) => (
              <li key={item.text}>
                <span className="about-highlight-icon" aria-hidden="true">
                  <Icon name={item.icon} className="text-[18px]" />
                </span>
                <span>{item.text}</span>
              </li>
            ))}
          </ul>

          <dl className="about-facts">
            {aboutFacts.map((fact) => (
              <div key={fact.label}>
                <dt>{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <figure className="about-photo lg:col-span-5 reveal">
          <Image
            src={workshopImage}
            alt="Spezar engineer inspecting a 3D-printed prototype in the workshop"
            fill
            sizes="(max-width: 1024px) 100vw, 40vw"
            className="object-cover object-[62%_center]"
          />
          <div className="about-photo-shade" aria-hidden="true" />
        </figure>
      </div>
    </section>
  );
}
