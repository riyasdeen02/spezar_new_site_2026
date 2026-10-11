import Icon from "@/components/ui/Icon";

// Closing call-to-action shown above the footer.
export default function StartProjectMarquee() {
  return (
    <section className="start-project-section px-margin-mobile lg:px-margin" aria-labelledby="start-project-title">
      <div className="start-project-card reveal">
        <div className="start-project-rings" aria-hidden="true">
          <span />
          <span />
          <span />
          <i />
        </div>

        <div className="start-project-copy">
          <h2 id="start-project-title">Not sure where to start?</h2>
          <p>
            Tell us what you are trying to build. We'll help shape the first technical steps into a clear plan.
          </p>
        </div>

        <div className="start-project-actions">
          <a href="/contact" className="start-project-button group">
            Start your project
            <Icon name="arrow_forward" className="text-[18px] transition-transform group-hover:translate-x-1" />
          </a>
          <div className="start-project-contacts">
            <a href="mailto:info@spezartech.com" className="start-project-contact">
              <Icon name="mail" className="text-[17px]" />
              info@spezartech.com
            </a>
            <a href="tel:+918610804852" className="start-project-contact">
              <Icon name="call" className="text-[17px]" />
              +91 86108 04852 (India)
            </a>
            <a href="tel:+358466251369" className="start-project-contact">
              <Icon name="call" className="text-[17px]" />
              +358 46 625 1369 (Europe)
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
