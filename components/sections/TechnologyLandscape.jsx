import Icon from "@/components/ui/Icon";
import SectionHeading from "@/components/ui/SectionHeading";

// Hand-placed scatter points (centre x / y in %), shared by both clouds.
// The software cloud uses them rotated 180° so the two groups look different.
const cloudSlots = [
  { x: 7, y: 26, size: "l" },
  { x: 23, y: 16, size: "m" },
  { x: 39, y: 24, size: "s" },
  { x: 55, y: 18, size: "l" },
  { x: 71, y: 24, size: "m" },
  { x: 88, y: 16, size: "s" },
  { x: 15, y: 58, size: "s" },
  { x: 31, y: 50, size: "l" },
  { x: 47, y: 56, size: "m" },
  { x: 63, y: 48, size: "s" },
  { x: 79, y: 56, size: "l" },
  { x: 94, y: 50, size: "s" },
  { x: 6, y: 86, size: "m" },
  { x: 23, y: 86, size: "s" },
  { x: 40, y: 84, size: "m" },
  { x: 57, y: 86, size: "l" },
  { x: 73, y: 88, size: "s" },
  { x: 88, y: 84, size: "m" },
];

const technologyGroups = [
  {
    id: "hardware",
    title: "Hardware & embedded",
    icon: "memory",
    description: "Platforms and tools for electronics, connectivity, and edge devices.",
    technologies: [
      { name: "STM32", file: "stm32.svg", invertOnDark: true },
      { name: "Espressif", file: "espressif.svg" },
      { name: "LoRa", file: "iot-lora-alliance-logo.svg.png", darkFile: "lora-dark.png", fitWidth: true },
      { name: "Arduino", file: "arduino.svg", tone: "lift" },
      { name: "Nordic Semiconductor", file: "nordic.svg", tone: "lift" },
      { name: "Raspberry Pi", file: "raspberry-pi.svg", tone: "lift" },
      { name: "SIMCom", file: "SIMCom-Logo.png", darkFile: "simcom-dark.png", fitWidth: 1.9 },
      { name: "NVIDIA Jetson", file: "nvidia-jetson.svg" },
      { name: "Texas Instruments", file: "Texas-Instruments.webp", darkFile: "texas-instruments-dark.png", fitWidth: 3.2 },
      { name: "Autodesk EAGLE", file: "eagle.png", darkFile: "eagle-dark.png", fitWidth: 3.4 },
      { name: "SolidWorks", file: "solidworks.svg" },
      { name: "u-blox", file: "U-blox_logo.svg.webp", darkFile: "ublox-dark.png" },
      { name: "Arm", file: "arm.svg" },
      { name: "Fusion 360", file: "Fusion360_Logo.svg.webp" },
      { name: "Microchip", file: "microchip.png", darkFile: "microchip-dark.png", fitWidth: true },
      { name: "Open Source Hardware", file: "open-source-hardware.svg" },
      { name: "Quectel", file: "Quectel.png", darkFile: "quectel-dark.png", fitWidth: true },
    ],
  },
  {
    id: "software",
    title: "Software & cloud",
    icon: "terminal",
    description: "Tools for connected products, applications, and data services.",
    rotate: true,
    technologies: [
      { name: "JavaScript", file: "javascript.svg" },
      { name: "HTML5", file: "html5.svg" },
      { name: "Kotlin", file: "kotlin.svg" },
      { name: "React", file: "react.svg" },
      { name: "CSS3", file: "css3.svg" },
      { name: "Swift", file: "swift.svg" },
      { name: "Node.js", file: "nodejs.svg", tone: "lift" },
      { name: "Python", file: "python.svg" },
      { name: "Android Studio", file: "Android_Studio_icon_(2023).svg.webp" },
      { name: "Azure", file: "azure-transparent.png" },
      { name: "AWS", file: "aws.svg", invertOnDark: true },
      { name: "C / C++", file: "cpp.svg" },
      { name: "Angular", file: "angular.svg", invertOnDark: true },
      { name: "Flutter", file: "flutter.png", invertOnDark: true },
      { name: "MongoDB", file: "mongodb.svg" },
      { name: "Google Cloud", file: "google-cloud.svg" },
    ],
  },
];

export default function TechnologyLandscape() {
  return (
    <section
      id="technology-landscape"
      className="w-full bg-surface/80 py-space-xl lg:py-24 px-margin-mobile lg:px-margin relative"
    >
      <div className="max-w-[1440px] mx-auto flex flex-col gap-space-xl relative z-10">
        <div className="reveal">
          <SectionHeading
            title="The right tools for every layer."
            lead="From embedded hardware to cloud-connected products, our teams work across a carefully selected technology stack."
          />
        </div>

        <div className="technology-landscape-list">
          {technologyGroups.map((group) => (
            <div key={group.id} className={`technology-band technology-band-${group.id} reveal`}>
              <div className="technology-band-heading">
                <span className="technology-group-icon" aria-hidden="true">
                  <Icon name={group.icon} className="text-[21px]" />
                </span>
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-on-surface">{group.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-on-surface-variant">{group.description}</p>
                </div>
              </div>

              <ul className="technology-cloud" aria-label={group.title}>
                {group.technologies.map((technology, index) => {
                  const slot = cloudSlots[index];
                  const x = group.rotate ? 100 - slot.x : slot.x;
                  const y = group.rotate ? 100 - slot.y : slot.y;

                  return (
                    <li
                      key={technology.name}
                      className={`technology-bubble technology-bubble-${slot.size}`}
                      style={{
                        "--x": `${x}%`,
                        "--y": `${y}%`,
                        "--float-delay": `${-(index * 0.73) % 6}s`,
                        "--float-duration": `${5 + (index % 4) * 0.9}s`,
                      }}
                    >
                      <span
                        className="technology-bubble-inner"
                        title={technology.name}
                        style={typeof technology.fitWidth === "number" ? { "--fit": technology.fitWidth } : undefined}
                      >
                        {(technology.darkFile ? ["light", "dark"] : ["any"]).map((variant) => (
                          <img
                            key={variant}
                            src={`/technology-logos/${variant === "dark" ? technology.darkFile : technology.file}`}
                            alt={technology.name}
                            className={[
                              "technology-bubble-logo",
                              variant === "light" && "technology-logo-light-only",
                              variant === "dark" && "technology-logo-dark-only",
                              technology.invertOnDark && "technology-logo-source-invert",
                              technology.fitWidth && "technology-logo-fit-width",
                              technology.tone && `technology-logo-${technology.tone}`,
                            ]
                              .filter(Boolean)
                              .join(" ")}
                            loading="lazy"
                          />
                        ))}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
