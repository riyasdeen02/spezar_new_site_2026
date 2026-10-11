import Image from "next/image";
import SectionHeading from "@/components/ui/SectionHeading";
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
              sizes="190px"
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

export default function SupportedBy() {
  return (
    <section
      id="supported-by"
      className="supported-by-section relative overflow-hidden border-y border-outline-variant/25 bg-surface-container-low/70 py-16 lg:py-20"
      aria-label="Organizations recognizing and supporting Spezar Tech"
    >
      <div className="mx-auto mb-9 max-w-[1440px] px-margin-mobile lg:px-margin">
        <SectionHeading
          title="Recognized and supported by."
          lead="A few of the institutions, programs, and innovation communities connected to our journey."
        />
      </div>

      <div className="partner-marquee" role="region" aria-label="Recognizing and supporting organizations">
        <div className="partner-track">
          <LogoGroup />
          <LogoGroup duplicate />
        </div>
      </div>
      <p className="mx-auto mt-5 max-w-[1440px] px-margin-mobile text-[10px] font-label-mono-sm uppercase tracking-[0.14em] text-outline lg:px-margin">
        Auto-scrolling logos · pauses on hover or keyboard focus
      </p>
    </section>
  );
}
