import { Space_Grotesk, JetBrains_Mono, Geist } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

// Geist is distributed via Google Fonts; the variable lets Tailwind's
// `font-body-*` utilities resolve to it with no layout shift.
const geist = Geist({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-geist",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://spezartech.com"),
  title: {
    default: "Spezar Tech Private Limited | Hardware & Systems R&D",
    template: "%s | Spezar Tech",
  },
  description:
    "Spezar Tech is a deep tech research & product development company, turning technically challenging ideas into engineered, testable products — electronics, embedded systems, software, mechanical design and rapid prototyping under one roof.",
  keywords: [
    "hardware R&D",
    "embedded systems",
    "PCB design",
    "robotics",
    "IoT",
    "rapid prototyping",
    "Spezar Tech",
  ],
  authors: [{ name: "Spezar Tech Private Limited" }],
  openGraph: {
    title: "Spezar Tech Private Limited | Hardware & Systems R&D",
    description:
      "A deep tech research & product development company. From complex ideas to working products, with electronics, embedded systems, mechanical design and rapid prototyping under one roof.",
    type: "website",
    locale: "en_US",
    siteName: "Spezar Tech",
  },
  twitter: {
    card: "summary_large_image",
    title: "Spezar Tech Private Limited | Hardware & Systems R&D",
    description:
      "From complex ideas to working products — hardware, firmware, mechanics and software engineered under one roof.",
  },
};

export const viewport = {
  themeColor: "#0d141d",
  colorScheme: "dark",
};

// Material Symbols is ~3.9 MB with every icon and style; asking Google for just the icons the site
// uses (one default style) cuts it to a few KB. ADD ANY NEW <Icon name="..."> HERE, or it shows as text.
// Google requires the list in alphabetical order.
const iconNames = [
  "accessibility_new", "agriculture", "arrow_forward", "arrow_upward", "bolt", "build", "calendar_today",
  "call", "check_circle", "close", "cloud_sync", "dark_mode", "developer_board", "devices_other",
  "expand_more", "factory", "format_quote", "groups", "hub", "light_mode", "lightbulb", "mail",
  "medical_services", "memory", "menu", "oil_barrel", "precision_manufacturing", "psychology", "public",
  "rocket_launch", "satellite_alt", "schema", "smart_toy", "sync", "terminal", "tune", "verified",
  "view_in_ar", "workspace_premium",
];
const iconFontUrl = `https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&icon_names=${[...iconNames].sort().join(",")}&display=block`;

// Fallback HTTPS-only redirect. The real redirects happen at the edge (GitHub Pages "Enforce HTTPS"
// and Cloudflare "Always Use HTTPS", see docs/DEPLOYMENT.md); this only catches a plain-http visit that
// slips through, and never runs on localhost.
const httpsRedirect = `(function(l){if(l.protocol==="http:"&&!/^(localhost|127\\.0\\.0\\.1|\\[::1\\])$/.test(l.hostname)){l.replace("https://"+l.host+l.pathname+l.search+l.hash)}})(window.location);`;

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`dark ${spaceGrotesk.variable} ${geist.variable} ${jetBrainsMono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: httpsRedirect }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href={iconFontUrl} />
      </head>
      <body className="bg-background font-body-md text-on-surface antialiased selection:bg-primary-container selection:text-on-primary-container min-h-screen flex flex-col relative overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
