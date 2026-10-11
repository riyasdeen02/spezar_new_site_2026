export const capabilities = [
  {
    icon: "developer_board",
    title: "Electronics & PCB",
    body: "Schematic design, multi-layer and high-speed PCB layout, power electronics, sensor and RF interfacing, and hardware bring-up and testing under real load.",
  },
  {
    icon: "terminal",
    title: "Embedded Systems",
    body: "Firmware for STM32, ESP32, nRF and similar MCUs in C/C++, bare-metal or FreeRTOS, with drivers, bootloaders, OTA updates and low-power design.",
  },
  {
    icon: "hub",
    title: "IoT & Connected Systems",
    body: "LoRaWAN, BLE, Wi-Fi and cellular connectivity, gateway design, MQTT and cloud integration, and telemetry that stays reliable in the field.",
  },
  {
    icon: "smart_toy",
    title: "Robotics & Automation",
    body: "Mobile robots and AGVs, robotic arms and custom robotic systems, BLDC, stepper and servo motor control, navigation and sensor fusion, and PLC and machine automation.",
  },
  {
    icon: "view_in_ar",
    title: "Mechanical & Product Design",
    body: "3D CAD and industrial design, enclosures with IP-rated sealing, thermal and structural analysis, and design for manufacturing from the first revision.",
  },
  {
    icon: "precision_manufacturing",
    title: "Prototyping & Manufacturing",
    body: "3D printing, CNC machining, laser cutting, PCB manufacturing and assembly, bench testing, and small-batch production support.",
  },
  {
    icon: "psychology",
    title: "AI & Intelligent Systems",
    body: "Computer vision and TinyML on edge devices, sensor signal processing, anomaly detection, and models tuned to run within embedded power and memory limits.",
  },
  {
    icon: "cloud_sync",
    title: "Software & Cloud",
    body: "Web apps and real-time dashboards, mobile and desktop apps, backend APIs and device management, OTA update infrastructure, and cloud integration.",
  },
];

export const processStages = [
  {
    num: "01",
    icon: "lightbulb",
    title: "Idea",
    body: "We dig into the problem, the users and the environment, then turn it into clear technical requirements, including any standards the product must meet.",
    services: ["Requirements", "Feasibility check"],
  },
  {
    num: "02",
    icon: "schema",
    title: "Concept",
    body: "System architecture, key component choices and an early BOM, plus a wired proof-of-concept on dev boards to prove the core idea before any custom design.",
    services: ["System architecture", "Wired prototype", "Concept design"],
  },
  {
    num: "03",
    icon: "tune",
    title: "Design",
    body: "Industrial design, schematics and PCB layout, 3D CAD and enclosure design, firmware, and the software and cloud pieces, all designed together.",
    services: ["Industrial design", "Electronic design", "Mechanical design", "Firmware development", "Software & cloud"],
  },
  {
    num: "04",
    icon: "build",
    title: "Prototype",
    body: "PCB fabrication and assembly, 3D-printed and machined parts, and first bring-up on the bench to get a working device in hand quickly.",
    services: ["PCB assembly", "3D printing", "Bench bring-up"],
  },
  {
    num: "05",
    icon: "verified",
    title: "Validation",
    body: "Functional, thermal and power testing, EMC pre-compliance and field trials, with product design iterations until it's ready for release.",
    services: ["Functional testing", "Field trials", "Design iterations"],
  },
  {
    num: "06",
    icon: "rocket_launch",
    title: "Product",
    body: "Design for manufacturing, production files and assembly guides, test fixtures, and support through pilot runs into volume production.",
    services: ["PCB manufacturing", "Machining & laser cutting", "Production support"],
    final: true,
  },
];

export const projects = [
  {
    dotClass: "bg-secondary shadow-[0_0_8px_#89ceff]",
    code: "PROJECT CODE: NEXUS-07 // ROBOTICS",
    metric: "CLOSED-LOOP LATENCY < 2.4ms",
    metricClass: "text-primary",
    tagline: "Robotics • Kinematics • RTOS",
    title: "Multi-Axis Robotics Telemetry & Actuation Controller",
    challenge:
      "High-vibration closed-loop motor synchronization with zero step packet drop over industrial SPI.",
    outcome:
      "Custom multi-axis motor driver board running FreeRTOS with optical encoder sub-degree precision.",
    status: "DEPLOYED IN LAB TESTBED",
    image: "/images/project-nexus07.svg",
    alt: "Futuristic precision robotic manipulator arm operating over an electronic component test bed in a high-tech research laboratory with teal and electric blue lighting.",
  },
  {
    dotClass: "bg-secondary-container shadow-[0_0_8px_#00a2e6]",
    code: "PROJECT CODE: AURA-NODE // SENSING",
    metric: "DEEP SLEEP: 14µA DRAW",
    metricClass: "text-secondary",
    tagline: "Electronics • PCB • IoT Telemetry",
    title: "Industrial IoT Edge Node & Multi-Layer RF PCB",
    challenge:
      "Multi-frequency RF interference in high-voltage industrial environment with battery life > 3 years.",
    outcome:
      "4-layer FR4 PCB with ground guard traces, LoRa transceiver integration, and custom ultra-low-leakage power gate.",
    status: "VALIDATED FOR ENTERPRISE DEPLOYMENT",
    image: "/images/project-auranode.svg",
    alt: "Close-up of a customized printed circuit board node with golden copper wiring and bright status LEDs glowing in a dark electronics lab.",
  },
];

export const industries = [
  {
    icon: "devices_other",
    title: "Consumer IoT",
    body: "Ergonomic connected smart home devices, wearables, and low-latency lifestyle gadgets.",
  },
  {
    icon: "medical_services",
    title: "MedTech",
    body: "Diagnostic telemetry, biometric sensors, and assistive medical monitoring equipment.",
  },
  {
    icon: "oil_barrel",
    title: "Oil & Gas",
    body: "Ruggedized telemetry sensors, explosion-proof housings, and long-range pipeline monitors.",
  },
  {
    icon: "bolt",
    title: "Energy & Utilities",
    body: "Grid metering nodes, solar tracker microcontrollers, and sub-second current monitors.",
  },
  {
    icon: "agriculture",
    title: "Smart Agriculture",
    body: "Soil moisture arrays, automated valve actuation, and solar-powered field gateways.",
  },
  {
    icon: "factory",
    title: "Industrial Systems",
    body: "PLC bridges, RS485/Modbus telemetry converters, and automated assembly test benches.",
  },
  {
    icon: "satellite_alt",
    title: "Remote Solutions",
    body: "Off-grid satellite backhaul modules and autonomous sensor packs for rugged terrain.",
  },
  {
    icon: "accessibility_new",
    title: "Assistive Tech",
    body: "Tactile haptic devices, mobility sensors, and customized prosthetic electronics control.",
  },
];

export const awards = [
  {
    place: "INDIA",
    title: "TNSI Award - EDII TN, Government of Tamil Nadu",
    body: "Recognized as one of the top student deep-tech startups in Tamil Nadu, receiving the prestigious Tamil Nadu Student Innovators (TNSI) Award and state seed grant. The award came with a seed grant of ₹1 lakh and was presented at Madras Institute of Technology by the Hon. Minister of MSME, Thiru T.M. Anbarasan, with Mr. V. Arun Roy, IAS, Secretary of MSME, and EDII leadership.",
    icon: "workspace_premium",
    footer: "EDII Tamil Nadu · Government of Tamil Nadu",
  },
  {
    place: "SINGAPORE",
    title: "International Space Challenge 2023 - Singapore",
    body: "Received the Most Creative Award at the International Space Challenge in Singapore, presented by Dr. Mohamad Maliki Bin Osman, Singapore's Minister in the Prime Minister's Office and Second Minister for Education & Foreign Affairs.",
    icon: "public",
    footer: "Space Faculty Singapore",
  },
];

// Footer social links. Paste each profile URL into `href`; links without a URL are hidden.
export const socialLinks = [
  { label: "LinkedIn", icon: "/social/linkedin.svg", href: "https://www.linkedin.com/company/spezartech/" },
  { label: "Instagram", icon: "/social/instagram.svg", href: "https://www.instagram.com/spezartech/" },
  { label: "Facebook", icon: "/social/facebook.svg", href: "https://www.facebook.com/spezartech/" },
  { label: "X (Twitter)", icon: "/social/x.svg", href: "https://twitter.com/spezartech" },
];

// Year the company started; drives the "since" facts, the hero years stat, and the footer copyright.
export const foundedYear = 2021;

// Facts strip in the About section. Add a "Team size" entry once confirmed.
export const aboutFacts = [
  { label: "Founded", value: String(foundedYear) },
  { label: "HQ at", value: "Thanjavur" },
  { label: "Presence", value: "Global" },
];

export const testimonials = [
  {
    quote:
      "Thank you for the first quality of rapid prototyping and delivering on time.",
    name: "ToSpace Pvt Ltd",
    role: "Aerospace Prototyping",
    initials: "TS",
    accent: ["#38bdf8", "#2563eb"],
  },
  {
    quote: "Best quality and top notch industrial automation works by Spezar Tech.",
    name: "Suresh Rajendran",
    role: "Industrial Automation Engineer",
    initials: "SR",
    accent: ["#34d399", "#0d9488"],
  },
  {
    quote:
      "Best circuit and PCB designing services and the delivery is on time with great fabrication quality.",
    name: "A2Z Techvalley",
    role: "Electronics Development",
    initials: "AT",
    accent: ["#fbbf24", "#f43f5e"],
  },
  {
    quote:
      "I recently worked with SpezarTech to develop a customized IoT solution for my business. I would not hesitate to work with Spezar Tech again in the future, and I highly recommend them to anyone looking for a reliable and experienced IoT solutions developer.",
    name: "Sathya",
    role: "Enterprise IoT Client",
    initials: "S",
    accent: ["#f472b6", "#9333ea"],
  },
  {
    quote:
      "Best service I have seen. Thanks for the fast work and timely delivery. The best option for rapid prototyping.",
    name: "Raj Kumar",
    role: "Rapid Prototyping Client",
    initials: "RK",
    accent: ["#a78bfa", "#4f46e5"],
  },
  {
    quote:
      "The quality of the 3D printed products is exceptional, and they were delivered well before the deadline. A great experience with Spezar Tech: a highly customer-focused team with an exceptional attitude.",
    name: "Shaik Khaja Ahmed",
    role: "3D Printing Client",
    initials: "SK",
    accent: ["#22d3ee", "#0e7490"],
  },
];

export const heroImage = "/images/hero-lab.svg";

export const cardImages = [heroImage, ...projects.map((project) => project.image)];
