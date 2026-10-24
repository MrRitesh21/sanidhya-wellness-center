import { ExternalLink } from "lucide-react";
import botanicalImg from "@/assets/botanical-band.jpg";
import { clinic } from "@/lib/clinic";
import { Reveal, SectionHeading } from "./primitives";
import { Stars } from "./Stars";

export function Reviews() {
  return (
    <section id="reviews" className="relative overflow-hidden py-24 sm:py-32">
      {/* Botanical background band */}
      <img
        src={botanicalImg}
        alt=""
        width={1920}
        height={704}
        loading="lazy"
        decoding="async"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-ivory/85" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Google reviews"
          title={
            <>
              Rated on <em className="italic text-gold-deep">Google</em>
            </>
          }
          description="The rating below comes directly from the clinic's verified Google profile — read the reviews there, in visitors' own words."
        />

        <Reveal delay={0.1} className="mt-12">
          <div className="mx-auto max-w-xl rounded-4xl border border-white/70 bg-white/85 p-10 text-center shadow-lift backdrop-blur-md">
            <p className="font-display text-7xl font-semibold leading-none text-forest">
              {clinic.rating}
            </p>
            <div className="mt-4 flex justify-center">
              <Stars rating={clinic.rating} starClass="h-5 w-5" />
            </div>
            <p className="mt-3 text-sm font-medium text-muted-foreground">
              out of 5 · based on {clinic.reviewCount} Google reviews
            </p>
            <a
              href={clinic.reviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex min-h-[48px] items-center gap-2 rounded-full border border-forest/20 px-7 text-sm font-semibold text-forest transition-colors hover:border-forest/40 hover:bg-ivory active:scale-[0.98]"
            >
              Read Google Reviews
              <ExternalLink className="h-4 w-4 text-gold-deep" aria-hidden="true" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
