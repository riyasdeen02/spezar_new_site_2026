import Image from "next/image";
// Trimmed versions of media/spezar_logo_*.png (the originals carry a lot of transparent padding).
import whiteLogo from "@/media/logo-white.png";
import darkLogo from "@/media/logo-dark.png";

export default function BrandLogo({ className = "" }) {
  return (
    <span className={`brand-logo ${className}`}>
      <Image
        src={whiteLogo}
        alt="Spezar Tech"
        priority
        className="brand-logo-white"
        sizes="220px"
      />
      <Image
        src={darkLogo}
        alt=""
        aria-hidden="true"
        className="brand-logo-dark"
        sizes="220px"
      />
    </span>
  );
}
