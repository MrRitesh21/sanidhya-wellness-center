import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/site/Hero";
import { About } from "@/components/site/About";
import { Services } from "@/components/site/Services";
import { ClinicalCases } from "@/components/site/ClinicalCases";
import { Approach } from "@/components/site/Approach";
import { Reviews } from "@/components/site/Reviews";
import { Booking } from "@/components/site/Booking";
import { LocationHours } from "@/components/site/LocationHours";
import { FAQ } from "@/components/site/FAQ";

const HOMEPAGE_TITLE = "Naturopathy Centre in Jankipuram, Lucknow | Sanidhya Naturopathy Center";

const HOMEPAGE_DESCRIPTION =
  "Sanidhya Naturopathy Center is a naturopathy centre in Sector I, Jankipuram, Lucknow offering natural therapies — hydrotherapy, mud therapy, steam bath, acupressure, sujok, yoga and Reiki courses. Rated 4.7 on Google. Open Mon–Sat 10 AM–9:30 PM, Sun 10 AM–2 PM. Call +91 94150 26684.";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: HOMEPAGE_TITLE },
      { name: "description", content: HOMEPAGE_DESCRIPTION },
      {
        name: "keywords",
        content:
          "Naturopathy centre in Jankipuram Lucknow, Naturopathy center Lucknow, Natural wellness clinic Jankipuram, Holistic wellness consultation Lucknow, Hydrotherapy Lucknow, Mud therapy Lucknow, Steam bath Jankipuram, Acupressure Lucknow, Sujok Lucknow, Yoga classes Jankipuram, Reiki course Lucknow",
      },
      { property: "og:title", content: HOMEPAGE_TITLE },
      { property: "og:description", content: HOMEPAGE_DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { property: "og:locale", content: "en_IN" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: HOMEPAGE_TITLE },
      { name: "twitter:description", content: HOMEPAGE_DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
});

function Index() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <ClinicalCases />
      <Approach />
      <Reviews />
      <Booking />
      <LocationHours />
      <FAQ />
    </>
  );
}
