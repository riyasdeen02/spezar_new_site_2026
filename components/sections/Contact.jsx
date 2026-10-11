"use client";

import { useState } from "react";
import Image from "next/image";
import Icon from "@/components/ui/Icon";
import SpotlightCard from "@/components/ui/SpotlightCard";
import { cardImages } from "@/data/content";
import contactImage from "@/media/contact.webp";

const needOptions = [
  "Full prototype (hardware, firmware and CAD)",
  "PCB design and bring-up",
  "Firmware development",
  "Enclosure design and fabrication",
  "Software (cloud, mobile or desktop app)",
  "Not sure yet, let's talk",
];

// Where to find us. Add street addresses to `place` once you want them shown.
const locations = [
  { title: "Headquarters", place: "Thanjavur, Tamil Nadu, India" },
  { title: "Europe", place: "Finland" },
];

const initialForm = {
  name: "",
  email: "",
  phone: "",
  need: needOptions[0],
  summary: "",
};

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const update = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = "Please enter your name or organisation.";
    if (!form.email.trim()) {
      next.email = "We need an email address to reply to.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = "That email address doesn't look right.";
    }
    if (!form.summary.trim()) next.summary = "Tell us a little about the project.";
    return next;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length === 0) {
      // No backend yet — surface a confirmation and reset.
      setSubmitted(true);
      setForm(initialForm);
    }
  };

  // Field colours live in .contact-field (globals.css) so they follow the theme reliably.
  const inputBase =
    "contact-field w-full px-3.5 py-2 rounded-lg border font-body-sm text-[14px] focus:outline-none focus:ring-1 focus:ring-primary";
  const labelBase = "text-sm font-medium text-on-surface-variant";

  return (
    <section
      id="contact-intake"
      className="w-full bg-surface-container-lowest/90 pt-space-lg pb-space-xl lg:pt-12 lg:pb-12 px-margin-mobile lg:px-margin relative"
    >
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-start relative z-10">
        <div className="lg:col-span-6 flex flex-col gap-5 reveal">
          <div className="flex flex-col gap-3">
            <h2 className="text-headline-xl-mobile lg:text-headline-xl font-headline-xl text-on-surface font-bold tracking-tight">
              Have an idea? Ready to make it real?
            </h2>
            <p className="text-body-md font-body-md text-on-surface-variant max-w-xl leading-relaxed">
              Tell us what you have in mind. We'll come back with a clear, honest picture of what it takes
              to get to working hardware, from the parts and the board to the firmware and the timeline.
            </p>
          </div>

          <div className="relative h-52 sm:h-64 lg:h-56 w-full max-w-xl overflow-hidden rounded-2xl border border-outline-variant/25 shadow-lg shadow-primary/10">
            <Image
              src={contactImage}
              alt="Inside the Spezar Tech lab"
              fill
              sizes="(max-width: 640px) 100vw, 576px"
              className="object-cover"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="https://calendly.com/spezartech"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-lg bg-primary text-on-primary-fixed font-body-md font-semibold hover:bg-secondary transition-colors shadow-sm"
            >
              <span>Book a call</span>
              <Icon name="calendar_today" className="text-[18px]" />
            </a>
            <a
              href="mailto:info@spezartech.com"
              className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-lg bg-surface-container-high/60 hover:bg-surface-container-high text-on-surface font-body-md border border-outline-variant/30 transition-colors"
            >
              <span>Email us</span>
              <Icon name="mail" className="text-[18px]" />
            </a>
          </div>

          <dl className="contact-details">
            {locations.map((location) => (
              <div key={location.title}>
                <dt>{location.title}</dt>
                <dd>{location.place}</dd>
              </div>
            ))}
            <div>
              <dt>Phone</dt>
              <dd>
                <a href="tel:+918610804852">+91 86108 04852</a> (India)
                <br />
                <a href="tel:+358466251369">+358 46 625 1369</a> (Europe)
              </dd>
            </div>
            <div>
              <dt>Email</dt>
              <dd>
                <a href="mailto:info@spezartech.com">info@spezartech.com</a>
              </dd>
            </div>
          </dl>
        </div>

        <SpotlightCard image={cardImages[0]} className="lg:col-span-6 rounded-2xl p-6 sm:p-7 flex flex-col shadow-xl shadow-primary/10 reveal">
          {submitted ? (
            <div className="flex flex-col items-center text-center gap-4 py-10">
              <div className="w-14 h-14 rounded-full bg-primary-container/20 border border-primary/30 flex items-center justify-center">
                <Icon name="check_circle" className="text-primary text-[32px]" />
              </div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                Thanks, we've got it.
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant max-w-sm">
                Someone from the engineering team will read your message and reply within one business day.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="mt-2 inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-surface-container-high/70 hover:bg-surface-container-high text-on-surface font-body-sm border border-outline-variant/30 transition-colors"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form className="flex flex-col gap-3" onSubmit={handleSubmit} noValidate>
              <div className="flex flex-col gap-1">
                <h3 className="text-xl font-semibold text-on-surface">Tell us about your project</h3>
                <p className="text-sm text-on-surface-variant">A few lines is enough to get started. We reply within one business day.</p>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className={labelBase} htmlFor="intake-name">
                  Your name or organisation
                </label>
                <input
                  id="intake-name"
                  type="text"
                  value={form.name}
                  onChange={update("name")}
                  className={`${inputBase} ${errors.name ? "border-error/60 focus:ring-error" : "border-white/5"}`}
                  aria-invalid={!!errors.name}
                />
                {errors.name && (
                  <span className="text-error font-body-sm text-[12px]">{errors.name}</span>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className={labelBase} htmlFor="intake-email">
                  Email
                </label>
                <input
                  id="intake-email"
                  type="email"
                  value={form.email}
                  onChange={update("email")}
                  className={`${inputBase} ${errors.email ? "border-error/60 focus:ring-error" : "border-white/5"}`}
                  aria-invalid={!!errors.email}
                />
                {errors.email && (
                  <span className="text-error font-body-sm text-[12px]">{errors.email}</span>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className={labelBase} htmlFor="intake-phone">
                  Phone <span className="font-normal text-on-surface-variant/70">(optional)</span>
                </label>
                <input
                  id="intake-phone"
                  type="tel"
                  autoComplete="tel"
                  value={form.phone}
                  onChange={update("phone")}
                  className={`${inputBase} border-white/5`}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className={labelBase} htmlFor="intake-need">
                  What do you need?
                </label>
                <div className="relative">
                  <select
                    id="intake-need"
                    value={form.need}
                    onChange={update("need")}
                    className={`${inputBase} border-white/5 appearance-none pr-10 cursor-pointer`}
                  >
                    {needOptions.map((opt) => (
                      <option key={opt}>{opt}</option>
                    ))}
                  </select>
                  <Icon
                    name="expand_more"
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-outline text-[20px]"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className={labelBase} htmlFor="intake-summary">
                  About the project
                </label>
                <textarea
                  id="intake-summary"
                  rows={3}
                  value={form.summary}
                  onChange={update("summary")}
                  placeholder="What it should do, where it will be used, and any timeline you have in mind."
                  className={`${inputBase} ${errors.summary ? "border-error/60 focus:ring-error" : "border-white/5"}`}
                  aria-invalid={!!errors.summary}
                />
                {errors.summary && (
                  <span className="text-error font-body-sm text-[12px]">{errors.summary}</span>
                )}
              </div>

              <div className="pt-1 flex flex-col gap-2">
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 rounded-xl bg-primary text-on-primary-fixed font-body-md font-semibold hover:bg-secondary transition-colors flex items-center justify-center gap-2 shadow-md"
                >
                  <span>Send message</span>
                  <Icon name="arrow_forward" className="text-[18px]" />
                </button>
                <p className="text-xs text-on-surface-variant/80 text-center">
                  Happy to sign an NDA before you share anything sensitive.
                </p>
              </div>
            </form>
          )}
        </SpotlightCard>
      </div>
    </section>
  );
}
