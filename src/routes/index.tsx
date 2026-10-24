import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/site/Hero";
import { About } from "@/components/site/About";
import { Services } from "@/components/site/Services";
import { Approach } from "@/components/site/Approach";
import { Reviews } from "@/components/site/Reviews";
import { Booking } from "@/components/site/Booking";
import { LocationHours } from "@/components/site/LocationHours";
import { FAQ } from "@/components/site/FAQ";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Approach />
      <Reviews />
      <Booking />
      <LocationHours />
      <FAQ />
    </>
  );
}
