"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Icon from "@/components/ui/Icon";
import BrandLogo from "@/components/ui/BrandLogo";
import { navLinks } from "@/data/nav";

const sectionIds = navLinks
  .filter((link) => link.href.startsWith("/#"))
  .map((link) => link.href.slice(2));

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [lightTheme, setLightTheme] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the nav link for whichever section is crossing the middle of the screen.
  useEffect(() => {
    if (pathname !== "/") return;
    // Watch every section, so sections without a nav link clear the highlight.
    const sections = Array.from(document.querySelectorAll("main section"));
    if (!sections.length || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(sectionIds.includes(entry.target.id) ? entry.target.id : "");
          }
        });
        if (window.scrollY < window.innerHeight * 0.5) setActiveSection("");
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [pathname]);

  const isActive = (href) =>
    href.startsWith("/#") ? pathname === "/" && href.slice(2) === activeSection : pathname === href;

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("spezar-theme");
    const useLightTheme = savedTheme === "light";
    setLightTheme(useLightTheme);
    document.documentElement.classList.toggle("light", useLightTheme);
    document.documentElement.classList.toggle("dark", !useLightTheme);
  }, []);

  const toggleTheme = () => {
    const nextLightTheme = !lightTheme;
    setLightTheme(nextLightTheme);
    document.documentElement.classList.toggle("light", nextLightTheme);
    document.documentElement.classList.toggle("dark", !nextLightTheme);
    window.localStorage.setItem("spezar-theme", nextLightTheme ? "light" : "dark");
  };

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`site-header fixed top-0 left-0 right-0 z-50 border-b backdrop-blur-xl ${
        scrolled ? "is-scrolled border-outline-variant/30" : "border-transparent"
      }`}
    >
      <div
        className={`max-w-[1440px] mx-auto px-margin-mobile lg:px-margin flex items-center justify-between transition-[height] duration-300 ${
          scrolled ? "h-16" : "h-20"
        }`}
      >
        <a href="/#top" aria-label="Spezar Tech home" className="flex items-center focus:outline-none group">
          <BrandLogo className={`header-brand-logo ${scrolled ? "is-compact" : ""}`} />
        </a>

        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 font-body-sm text-[13px] tracking-wider uppercase">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <a
                key={link.href}
                href={link.href}
                aria-current={active ? "location" : undefined}
                className={`header-nav-link ${active ? "is-active text-on-surface" : "text-outline"} hover:text-primary transition-colors py-1`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            aria-label={`Switch to ${lightTheme ? "dark" : "light"} theme`}
            aria-pressed={lightTheme}
            onClick={toggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-outline-variant/40 bg-surface-container-high/70 text-on-surface transition-colors hover:border-primary/50"
          >
            <Icon name={lightTheme ? "dark_mode" : "light_mode"} className="text-[18px]" />
          </button>
          <a
            href="/contact"
            className="inline-flex items-center justify-center px-4 sm:px-5 py-2 rounded-full bg-surface-container-high/90 hover:bg-surface-bright text-on-surface border border-outline-variant/40 hover:border-outline text-[13px] font-body-sm font-medium tracking-wide transition-all shadow-sm"
          >
            Get started
          </a>

          <button
            aria-label="Toggle navigation menu"
            aria-expanded={open}
            className="lg:hidden w-9 h-9 rounded-full bg-surface-container-high border border-outline-variant/30 flex items-center justify-center text-on-surface focus:outline-none"
            onClick={() => setOpen((v) => !v)}
            type="button"
          >
            <Icon name={open ? "close" : "menu"} className="text-[20px]" />
          </button>
        </div>
      </div>

      {/* Mobile dropdown panel */}
      <div
        className={`lg:hidden overflow-hidden border-t border-outline-variant/20 bg-surface-container-lowest/95 backdrop-blur-xl transition-[max-height,opacity] duration-300 ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col px-margin-mobile py-space-sm font-body-sm text-[14px] uppercase tracking-wider">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              aria-current={isActive(link.href) ? "location" : undefined}
              className={`py-3 ${
                isActive(link.href) ? "text-primary" : "text-on-surface-variant"
              } hover:text-primary border-b border-white/5 last:border-0 transition-colors`}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
