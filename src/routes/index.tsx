import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { About } from "@/components/site/About";
import { Services } from "@/components/site/Services";
import { Approach } from "@/components/site/Approach";
import { Reviews } from "@/components/site/Reviews";
import { Booking } from "@/components/site/Booking";
import { LocationHours } from "@/components/site/LocationHours";
import { FAQ } from "@/components/site/FAQ";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="flex min-h-screen flex-col bg-ivory font-sans text-charcoal antialiased selection:bg-sage-soft selection:text-forest">
      <Header />
      <main id="main-content" className="flex-1">
        <Hero />
        <About />
        <Services />
        <Approach />
        <Reviews />
        <Booking />
        <LocationHours />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
