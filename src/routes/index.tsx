import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "sonner";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { About } from "@/components/site/About";
import { Services } from "@/components/site/Services";
import { Testimonials } from "@/components/site/Testimonials";
import { Offers } from "@/components/site/Offers";
import { Booking } from "@/components/site/Booking";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";
import { ScrollProgress } from "@/components/site/ScrollProgress";
import { Loader } from "@/components/site/Loader";
import { Marquee } from "@/components/site/Marquee";
// import { Gallery } from "@/components/site/Gallery";  ← re-enable when ready

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="bg-rr-cream">
      <Loader />
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Services />
        <Testimonials />
        <Offers />
        <Booking />
        <Contact />
      </main>
      <Footer />
      <Toaster position="top-center" richColors />
    </div>
  );
}
