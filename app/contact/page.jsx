import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AmbientBackground from "@/components/layout/AmbientBackground";
import InteractionProvider from "@/components/layout/InteractionProvider";
import Contact from "@/components/sections/Contact";

export const metadata = {
  title: "Contact",
  description:
    "Talk with Spezar Tech about your hardware, embedded systems, and product engineering project.",
};

export default function ContactPage() {
  return (
    <>
      <InteractionProvider />
      <AmbientBackground />
      <Header />
      <main className="w-full pt-20 bg-background/60 flex-1 relative z-10">
        <Contact />
      </main>
      <Footer />
    </>
  );
}
