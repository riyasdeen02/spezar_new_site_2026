import Icon from "@/components/ui/Icon";
import BrandLogo from "@/components/ui/BrandLogo";
import { socialLinks, foundedYear } from "@/data/content";
import { withBase } from "@/lib/basePath";

const directory = [
  { label: "Capabilities", href: "/#capabilities" },
  { label: "Process", href: "/#process" },
  { label: "Technology", href: "/#technology-landscape" },
  { label: "Industries", href: "/#industries" },
  { label: "About", href: "/#about" },
  { label: "Recognition", href: "/#recognition" },
  { label: "Contact", href: "/contact" },
];

const activeSocialLinks = socialLinks.filter((link) => link.href);

export default function Footer() {
  return (
    <footer className="w-full bg-surface-container-lowest border-t border-outline-variant/40 mt-auto relative z-10">
      <div className="max-w-[1440px] mx-auto px-margin-mobile lg:px-margin py-space-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-space-lg mb-space-xl">
          <div className="lg:col-span-5 flex flex-col gap-space-sm">
            <BrandLogo className="footer-brand-logo" />
            <p className="font-body-md text-body-md text-on-surface-variant max-w-md">
              Engineering ideas into working products. High-precision hardware
              architecture, embedded firmware design, and industrial electronics
              validation.
            </p>
            {activeSocialLinks.length > 0 && (
              <div className="flex items-center gap-2 pt-1">
                {activeSocialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    className="footer-social"
                  >
                    <span style={{ maskImage: `url(${withBase(link.icon)})`, WebkitMaskImage: `url(${withBase(link.icon)})` }} />
                  </a>
                ))}
              </div>
            )}
          </div>

          <div className="lg:col-span-4 flex flex-col gap-space-xs">
            <span className="footer-heading">Locations</span>
            <p className="font-body-sm text-body-sm text-on-surface">
              HQ at Thanjavur, India
              <br />
              <span className="text-on-surface-variant">Presence in Finland</span>
            </p>
            <div className="mt-space-sm flex flex-col gap-1">
              <span className="footer-heading">Contact</span>
              <a
                href="tel:+918610804852"
                className="font-body-sm text-body-sm text-on-surface hover:text-primary transition-colors flex items-center gap-1.5"
              >
                <Icon name="call" className="text-[16px] text-outline" />
                +91 86108 04852 <span className="text-on-surface-variant">(India)</span>
              </a>
              <a
                href="tel:+358466251369"
                className="font-body-sm text-body-sm text-on-surface hover:text-primary transition-colors flex items-center gap-1.5"
              >
                <Icon name="call" className="text-[16px] text-outline" />
                +358 46 625 1369 <span className="text-on-surface-variant">(Europe)</span>
              </a>
              <a
                href="mailto:info@spezartech.com"
                className="font-body-sm text-body-sm text-on-surface hover:text-primary transition-colors flex items-center gap-1.5"
              >
                <Icon name="mail" className="text-[16px] text-outline" />
                info@spezartech.com
              </a>
            </div>
          </div>

          <div className="lg:col-span-3 flex flex-col gap-space-xs">
            <span className="footer-heading">Explore</span>
            <nav className="flex flex-col gap-2">
              {directory.map((item) => (
                <a
                  key={item.href}
                  href={withBase(item.href)}
                  className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        </div>

        <div className="border-t border-outline-variant/30 pt-space-md flex flex-col md:flex-row items-center justify-between gap-space-sm text-on-surface-variant text-sm">
          <span>© {foundedYear}–{new Date().getFullYear()} Spezar Tech Private Limited. All rights reserved.</span>
          <a href="#top" className="footer-back-to-top group">
            Back to top
            <Icon name="arrow_upward" className="text-[16px] transition-transform group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
