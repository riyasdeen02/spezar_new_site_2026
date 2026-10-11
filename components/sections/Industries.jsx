import SpotlightCard from "@/components/ui/SpotlightCard";
import SectionHeading from "@/components/ui/SectionHeading";
import { industries } from "@/data/content";

const industryImages = {
  "Consumer IoT": "/industry/consumeriot.png",
  MedTech: "/industry/medtech.png",
  "Oil & Gas": "/industry/oilgas.png",
  "Energy & Utilities": "/industry/energy.png",
  "Smart Agriculture": "/industry/agri.png",
  "Industrial Systems": "/industry/industrialsys.png",
  "Remote Solutions": "/industry/remotesol.png",
  "Assistive Tech": "/industry/assistivetech.png",
};

const industryDescriptions = {
  "Consumer IoT": "Connected home devices, wearables, and everyday products.",
  MedTech: "Diagnostic devices, biometric sensors, and patient monitoring.",
  "Oil & Gas": "Rugged telemetry for remote and demanding infrastructure.",
  "Energy & Utilities": "Metering, renewables, and real-time grid monitoring.",
  "Smart Agriculture": "Field sensing, solar gateways, and automated irrigation.",
  "Industrial Systems": "Machine connectivity, automation, and production testing.",
  "Remote Solutions": "Autonomous monitoring beyond reliable network coverage.",
  "Assistive Tech": "Adaptive electronics for mobility, haptics, and daily living.",
};

export default function Industries() {
  return (
    <section
      id="industries"
      className="w-full bg-surface/80 py-space-xl lg:py-24 px-margin-mobile lg:px-margin relative"
    >
      <div className="max-w-[1440px] mx-auto flex flex-col gap-space-lg relative z-10">
        <div className="reveal industry-heading">
          <SectionHeading
            title="Expertise across verticals."
            lead="From agriculture and healthcare to industrial automation and consumer products, we bring the same engineering depth to every sector we work in."
          />
        </div>

        <div className="industry-mosaic grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {industries.map((item, index) => (
            <SpotlightCard
              as="article"
              key={item.title}
              image={industryImages[item.title]}
              sizes={
                index === 0 || index > 4
                  ? "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 46vw"
                  : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 23vw"
              }
              className={`industry-mosaic-card group reveal ${index === 0 || index > 4 ? "lg:col-span-2" : ""}`}            >
              <div className="industry-card-copy">
                <div>
                  <h3>{item.title}</h3>
                  <p>{industryDescriptions[item.title] || item.body}</p>
                </div>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
}
