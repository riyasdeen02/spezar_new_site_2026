import Icon from "@/components/ui/Icon";
import SectionHeading from "@/components/ui/SectionHeading";

const integrationPoints = [
  "No friction between PCB dimensions and enclosure tolerances",
  "Firmware developers sit right next to hardware bring-up benches",
  "Continuous testing at each iteration prevents costly re-spins",
];

// `tone` picks the card's accent colour (see .advantage-card--* in globals.css): blue, teal or amber.
const advantages = [
  {
    title: "Cost-conscious engineering",
    body: "Validate important decisions early and reduce avoidable board spins, rework, and integration cost.",
    visual: "cost",
    tone: "amber",
  },
  {
    title: "One connected team",
    body: "Electronics, firmware, mechanics, and software are designed together around the same product goals.",
    visual: "connected",
    tone: "blue",
  },
  {
    title: "Ready to scale",
    body: "Build a dependable foundation that can grow from a working prototype to a production-ready system.",
    visual: "scale",
    tone: "teal",
  },
  {
    title: "Fewer handoff gaps",
    body: "Keep requirements, design choices, and validation connected across disciplines and project milestones.",
    visual: "workflow",
    tone: "teal",
  },
  {
    title: "A partner through delivery",
    body: "Work directly with the engineering team through prototyping, testing, refinement, and technical handover.",
    visual: "partner",
    tone: "amber",
  },
];

// All illustrations share one restrained palette, set in globals.css:
// .adv-ink (fine lines), .adv-dim (guides), .adv-accent (single blue accent), .adv-fill (soft tint).

function AccentGradient({ id, vertical = false }) {
  return (
    <linearGradient id={id} x1="0" y1="0" x2={vertical ? "0" : "1"} y2="1">
      <stop offset="0" className="adv-stop-strong" />
      <stop offset="1" className="adv-stop-soft" />
    </linearGradient>
  );
}

// Coin stack beside a falling cost chart
function CostIllustration() {
  return (
    <svg viewBox="0 0 240 140" className="advantage-illustration" aria-hidden="true">
      <defs>
        <AccentGradient id="adv-cost-bar" vertical />
      </defs>
      <line x1="96" y1="118" x2="214" y2="118" className="adv-dim" />
      {[
        [104, 34],
        [130, 50],
        [156, 66],
        [182, 84],
      ].map(([x, y]) => (
        <rect key={x} x={x} y={y} width="18" height={118 - y} rx="4" fill="url(#adv-cost-bar)" className="adv-ink" />
      ))}
      <path d="M106 24 C140 32 162 54 206 78" className="adv-accent adv-dashed" />
      <path d="M197 69 l10 10 -14 2" className="adv-accent" />
      {[100, 86, 72].map((y) => (
        <g key={y}>
          <path d={`M34 ${y} v10 a24 7 0 0 0 48 0 v-10`} className="adv-ink adv-fill" />
          <ellipse cx="58" cy={y} rx="24" ry="7" className="adv-ink adv-fill" />
        </g>
      ))}
      <text x="58" y="75.5" textAnchor="middle" className="adv-glyph-text">₹</text>
    </svg>
  );
}

// Hub linking electronics, firmware, mechanics, and cloud
function ConnectedIllustration() {
  const nodes = [
    { x: 46, y: 34, glyph: <><rect x="-7" y="-7" width="14" height="14" rx="2" /><path d="M-3.5 -11v4M3.5 -11v4M-3.5 7v4M3.5 7v4M-11 -3.5h4M-11 3.5h4M7 -3.5h4M7 3.5h4" /></> },
    { x: 194, y: 34, glyph: <path d="M-4 -6 -10 0 -4 6M4 -6 10 0 4 6M2 -9 -2 9" /> },
    { x: 46, y: 108, glyph: <><path d="M0 -9 9 -4 9 6 0 11 -9 6 -9 -4Z" /><path d="M-9 -4 0 1 9 -4M0 1v10" /></> },
    { x: 194, y: 108, glyph: <path d="M-8 6h14a6 6 0 0 0 0-12 8 8 0 0 0-14-1 6 6 0 0 0 0 13Z" /> },
  ];

  return (
    <svg viewBox="0 0 240 140" className="advantage-illustration" aria-hidden="true">
      <defs>
        <radialGradient id="adv-hub" cx=".35" cy=".3" r=".9">
          <stop offset="0" className="adv-stop-strong" />
          <stop offset="1" className="adv-stop-soft" />
        </radialGradient>
      </defs>
      {nodes.map((node) => (
        <path key={`${node.x}-${node.y}`} d={`M120 71 Q${node.x} 71 ${node.x} ${node.y}`} className="adv-dim adv-dashed" />
      ))}
      <circle cx="120" cy="71" r="30" className="adv-dim" />
      <circle cx="120" cy="71" r="21" fill="url(#adv-hub)" className="adv-accent" />
      <g className="adv-on-accent">
        <circle cx="113" cy="67" r="3" />
        <circle cx="127" cy="67" r="3" />
        <circle cx="120" cy="78" r="3" />
        <path d="M113 67 127 67 120 78Z" />
      </g>
      {nodes.map((node) => (
        <g key={`${node.x}+${node.y}`} transform={`translate(${node.x} ${node.y})`}>
          <rect x="-18" y="-18" width="36" height="36" rx="10" className="adv-ink adv-fill" />
          <g className="adv-ink">{node.glyph}</g>
        </g>
      ))}
    </svg>
  );
}

// Growth curve from one prototype to stacked production units
function ScaleIllustration() {
  return (
    <svg viewBox="0 0 240 140" className="advantage-illustration" aria-hidden="true">
      <defs>
        <linearGradient id="adv-scale-area" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" className="adv-stop-area" />
          <stop offset="1" className="adv-stop-clear" />
        </linearGradient>
      </defs>
      <line x1="22" y1="122" x2="218" y2="122" className="adv-dim" />
      <path d="M22 116 C70 112 84 92 116 84 S170 50 214 20 V122 H22Z" fill="url(#adv-scale-area)" />
      <path d="M22 116 C70 112 84 92 116 84 S170 50 214 20" className="adv-accent adv-strong" />
      <path d="M201 18 l14 1 -3 14" className="adv-accent adv-strong" />
      {[
        [40, [104]],
        [100, [104, 88]],
        [160, [104, 88, 72]],
      ].map(([x, rows]) =>
        rows.map((y) => (
          <g key={`${x}-${y}`}>
            <rect x={x} y={y} width="24" height="16" rx="3" className="adv-ink adv-fill" />
            <line x1={x + 5} y1={y + 8} x2={x + 13} y2={y + 8} className="adv-ink" />
          </g>
        ))
      )}
      <circle cx="116" cy="84" r="4.5" className="adv-accent adv-dot" />
    </svg>
  );
}

// Design → Build → Validate joined by one continuous track
function WorkflowIllustration() {
  const steps = [
    { x: 40, label: "Design", glyph: <path d="M-6 7 0 -8 6 7M-3.5 1h7" /> },
    { x: 120, label: "Build", glyph: <path d="M-7 7 3 -3M1 -7a5.5 5.5 0 0 0 6.5 6.5l-2.5 2.5-4.5-4.5 2.5-2.5Z" /> },
    { x: 200, label: "Validate", glyph: <path d="M-7 0 -2 5 7 -5" />, final: true },
  ];

  return (
    <svg viewBox="0 0 240 140" className="advantage-illustration" aria-hidden="true">
      <defs>
        <radialGradient id="adv-flow-final" cx=".35" cy=".3" r=".9">
          <stop offset="0" className="adv-stop-strong" />
          <stop offset="1" className="adv-stop-soft" />
        </radialGradient>
      </defs>
      <path d="M40 62 C70 22 90 22 120 62 S170 102 200 62" className="adv-dim adv-dashed" />
      {steps.map((step) => (
        <g key={step.label} transform={`translate(${step.x} 62)`}>
          <circle r="26" className="adv-dim" />
          {step.final ? (
            <circle r="19" fill="url(#adv-flow-final)" className="adv-accent" />
          ) : (
            <circle r="19" className="adv-ink adv-fill" />
          )}
          <g className={step.final ? "adv-on-accent" : "adv-ink"}>{step.glyph}</g>
          <text y="46" textAnchor="middle" className="advantage-illustration-label">
            {step.label}
          </text>
        </g>
      ))}
    </svg>
  );
}

// Client and engineer sharing one project board
function PartnerIllustration() {
  return (
    <svg viewBox="0 0 240 140" className="advantage-illustration" aria-hidden="true">
      {/* shared board */}
      <rect x="82" y="20" width="76" height="62" rx="9" className="adv-ink adv-fill" />
      <line x1="82" y1="34" x2="158" y2="34" className="adv-dim" />
      <circle cx="92" cy="27" r="2" className="adv-ink" />
      <circle cx="99" cy="27" r="2" className="adv-ink" />
      {[45, 57, 69].map((y, index) => (
        <g key={y}>
          {index < 2 ? (
            <path d={`M90 ${y} l2.5 2.5 5 -5`} className="adv-accent" />
          ) : (
            <circle cx="94" cy={y} r="3.5" className="adv-dim" />
          )}
          <line x1="104" y1={y} x2={index === 1 ? 134 : 146} y2={y} className="adv-ink adv-soft-line" />
        </g>
      ))}

      {/* people */}
      <circle cx="46" cy="70" r="13" className="adv-ink adv-fill" />
      <path d="M22 122c0-17 10-29 24-29s24 12 24 29" className="adv-ink adv-fill" />
      <circle cx="194" cy="70" r="13" className="adv-ink adv-fill" />
      <path d="M170 122c0-17 10-29 24-29s24 12 24 29" className="adv-ink adv-fill" />

      {/* link between them */}
      <path d="M72 104 C96 92 144 92 168 104" className="adv-dim adv-dashed" />
      <circle cx="120" cy="96" r="12" fill="url(#adv-partner-check)" className="adv-accent" />
      <path d="M114 96 l4 4 8 -9" className="adv-on-accent" />
      <defs>
        <radialGradient id="adv-partner-check" cx=".35" cy=".3" r=".9">
          <stop offset="0" className="adv-stop-strong" />
          <stop offset="1" className="adv-stop-soft" />
        </radialGradient>
      </defs>
    </svg>
  );
}
const illustrations = {
  cost: CostIllustration,
  connected: ConnectedIllustration,
  scale: ScaleIllustration,
  workflow: WorkflowIllustration,
  partner: PartnerIllustration,
};

export default function ClientAdvantages() {
  return (
    <section
      id="client-advantages"
      className="w-full bg-surface-container-lowest/90 py-space-xl lg:py-24 px-margin-mobile lg:px-margin relative"
    >
      <div className="max-w-[1440px] mx-auto flex flex-col gap-space-xl relative z-10">
        <div className="reveal flex flex-col gap-space-md">
          <SectionHeading
            title="More than a working prototype."
            lead="Hardware, firmware, mechanics, and software are built by one connected team, so interfaces don't break between agencies and your product moves forward with confidence."
          />
          <ul className="advantage-points">
            {integrationPoints.map((point) => (
              <li key={point}>
                <Icon name="check_circle" className="text-[18px]" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-space-md">
          {advantages.map((advantage, index) => {
            const Illustration = illustrations[advantage.visual];
            return (
              <article
                className={`advantage-card advantage-card--${advantage.tone} group reveal ${index < 3 ? "lg:col-span-2" : "lg:col-span-3"}`}
                key={advantage.title}
              >
                <div className="advantage-card-visual">
                  <Illustration />
                </div>
                <div className="relative z-10">
                  <h3 className="advantage-card-title text-lg font-semibold text-on-surface transition-colors">{advantage.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">{advantage.body}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
