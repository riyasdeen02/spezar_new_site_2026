import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AmbientBackground from "@/components/layout/AmbientBackground";
import InteractionProvider from "@/components/layout/InteractionProvider";

import Hero from "@/components/sections/Hero";
import Capabilities from "@/components/sections/Capabilities";
import TechnologyLandscape from "@/components/sections/TechnologyLandscape";
import ClientAdvantages from "@/components/sections/ClientAdvantages";
import Process from "@/components/sections/Process";
import Industries from "@/components/sections/Industries";
import About from "@/components/sections/About";
import Recognition from "@/components/sections/Recognition";
import Testimonials from "@/components/sections/Testimonials";
import StartProjectMarquee from "@/components/sections/StartProjectMarquee";

export default function Home() {
  return (
    <>
      {/* Client-only: scroll reveal + smooth anchor scrolling */}
      <InteractionProvider />

      <AmbientBackground />
      <Header />

      <main className="w-full pt-20 bg-background/60 flex-1 relative z-10">
        <div className="flex flex-col w-full">
          <Hero />
          <Capabilities />
          <Process />
          <TechnologyLandscape />
          <ClientAdvantages />
          <Industries />
          <About />
          <Recognition />
          <Testimonials />
          <StartProjectMarquee />
        </div>
      </main>

      <Footer />
    </>
  );
}
