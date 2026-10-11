import Icon from "@/components/ui/Icon";
import SectionHeading from "@/components/ui/SectionHeading";
import { awards } from "@/data/content";
import Image from "next/image";
import tnsiAwardImage from "@/media/tnsi.webp";
import spaceChallengeImage from "@/media/isc.webp";
import gseaLogo from "@/logo/GSEA-type-treatment_website-2.svg";
import startupIndiaLogo from "@/logo/Asset-1@3x.webp";
import sastraLogo from "@/logo/sastralogo.webp";
import ediiLogo from "@/logo/TEAM SPEZAR-3.webp";
import fireLogo from "@/logo/spez sat-3.webp";
import startupTnLogo from "@/logo/spez sat-4.webp";
import tnsiLogo from "@/logo/tnsi_logo_web.webp";

const organizations = [
  { name: "Global Student Entrepreneur Awards", image: gseaLogo },
  { name: "Startup India", image: startupIndiaLogo },
  { name: "SASTRA Deemed University", image: sastraLogo },
  { name: "EDII Tamil Nadu · Government of Tamil Nadu", image: ediiLogo },
  { name: "Foundation for Innovation and Research · SASTRA TBI", image: fireLogo },
  { name: "StartupTN", image: startupTnLogo },
  { name: "Tamil Nadu Student Innovators", image: tnsiLogo },
];

const awardImages = [tnsiAwardImage, spaceChallengeImage];

function LogoGroup({ duplicate = false }) {
  return (
    <div className="partner-logo-group" aria-hidden={duplicate || undefined}>
      {organizations.map((organization) => (
        <div className="partner-logo-card" key={organization.name}>
          <div className="partner-logo-frame">
            <Image
              src={organization.image}
              alt={duplicate ? "" : organization.name}
              aria-hidden={duplicate || undefined}
              fill
              sizes="150px"
              className="partner-logo-image"
              unoptimized={organization.image.src.endsWith(".svg")}
            />
          </div>
          <span>{organization.name}</span>
        </div>
      ))}
    </div>
  );
}

export default function Recognition() {
  return (
    <section
      id="recognition"
      className="w-full bg-surface/80 py-space-xl lg:py-24 px-margin-mobile lg:px-margin relative"
    >
      <div className="max-w-[1440px] mx-auto flex flex-col gap-space-xl relative z-10">
        <div className="reveal">
          <SectionHeading
            title="Recognized and supported by."
            lead="Technical credibility earned through competitive engineering challenges, state innovation awards, and the institutions supporting our journey."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
          {awards.map((a, index) => (
            <article className="award-split-card group reveal" key={a.title}>
              <div className="award-split-content">
                <div className="flex flex-col gap-3">
                  <h3 className="text-lg sm:text-xl font-headline-lg text-on-surface font-semibold">
                    {a.title}
                  </h3>
                  <p className="font-body-sm text-sm text-on-surface-variant leading-relaxed">
                    {a.body}
                  </p>
                </div>
                <div className="flex items-center gap-space-sm text-outline text-sm pt-3 mt-4 border-t border-white/5">
                  <Icon name={a.icon} className="text-secondary text-[20px]" />
                  <span className="font-medium text-on-surface-variant">{a.footer}</span>
                </div>
              </div>
              <div className="award-split-image" aria-hidden="true">
                <Image
                  src={awardImages[index]}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 0px, 24vw"
                  className="object-cover"
                />
                <span />
              </div>
            </article>
          ))}
        </div>

        <div id="supported-by" className="scroll-mt-24 border-t border-outline-variant/25 pt-6">
          <div className="partner-marquee" role="region" aria-label="Organizations recognizing and supporting Spezar Tech">
            <div className="partner-track">
              <LogoGroup />
              <LogoGroup duplicate />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
