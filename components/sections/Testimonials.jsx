import Icon from "@/components/ui/Icon";
import SpotlightCard from "@/components/ui/SpotlightCard";
import SectionHeading from "@/components/ui/SectionHeading";
import { testimonials, cardImages } from "@/data/content";

// Average client rating, as shown in the company portfolio deck.
const rating = 4.9;

function Stars() {
  return (
    <span className="testimonial-stars" aria-hidden="true">
      {[0, 1, 2, 3, 4].map((star) => (
        <svg key={star} viewBox="0 0 24 24">
          <path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.2l-5.7 3.1 1.2-6.4-4.7-4.4 6.4-.8z" />
        </svg>
      ))}
    </span>
  );
}

function QuoteGroup({ duplicate = false }) {
  return (
    <div className="testimonial-group" aria-hidden={duplicate || undefined}>
      {testimonials.map((t, index) => (
        <SpotlightCard
          key={t.name}
          as="figure"
          image={cardImages[index % cardImages.length]}
          className="testimonial-card group"
        >
          <blockquote className="relative z-10">
            <span style={{ color: t.accent[0] }}>
              <Icon name="format_quote" className="text-[30px]" />
            </span>
            <p>“{t.quote}”</p>
          </blockquote>
          <figcaption className="testimonial-author">
            <span
              className="testimonial-avatar"
              style={{ background: `linear-gradient(135deg, ${t.accent[0]}, ${t.accent[1]})` }}
              aria-hidden="true"
            >
              {t.initials}
            </span>
            <span className="flex flex-col">
              <span className="font-semibold text-on-surface">{t.name}</span>
              <span className="text-sm text-outline">{t.role}</span>
            </span>
          </figcaption>
        </SpotlightCard>
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="w-full bg-surface-container-lowest/90 py-space-xl lg:py-24 px-margin-mobile lg:px-margin relative"
    >
      <div className="max-w-[1440px] mx-auto flex flex-col gap-space-xl relative z-10">
        <div className="reveal flex flex-col lg:flex-row lg:items-end lg:justify-between gap-space-lg">
          <SectionHeading
            title="The voice of startups & founders."
            lead="Direct remarks from startups and founders who relied on Spezar Tech for their physical builds."
          />
          <div className="testimonial-rating" aria-label={`Average client rating ${rating} out of 5`}>
            <span className="testimonial-rating-value">{rating}</span>
            <span className="flex flex-col gap-1">
              <Stars />
              <span className="testimonial-rating-label">Average client rating</span>
            </span>
          </div>
        </div>

        <div className="testimonial-marquee reveal" role="region" aria-label="Client testimonials">
          <div className="testimonial-track">
            <QuoteGroup />
            <QuoteGroup duplicate />
          </div>
        </div>
      </div>
    </section>
  );
}
