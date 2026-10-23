import { useEffect, useState } from "react";
import {
  Accessibility,
  ArrowUpRight,
  MapPin,
  Phone,
} from "lucide-react";
import {
  clinic,
  formatTime,
  fullAddress,
  getOpenStatus,
  hours,
} from "@/lib/clinic";
import { cn } from "@/lib/utils";
import { Reveal, SectionHeading } from "./primitives";

const MAP_EMBED =
  "https://www.google.com/maps?q=Sanidhya%20Naturopathy%20Center%2C%20Sector%20I%2C%20Jankipuram%2C%20Lucknow%2C%20Uttar%20Pradesh%20226021&output=embed";

export function LocationHours() {
  const [today, setToday] = useState<string | null>(null);
  const [status, setStatus] = useState<{ open: boolean; label: string } | null>(
    null,
  );

  useEffect(() => {
    setToday(
      new Intl.DateTimeFormat("en-GB", {
        timeZone: clinic.timezone,
        weekday: "long",
      }).format(new Date()),
    );
    setStatus(getOpenStatus());
  }, []);

  return (
    <section id="contact" className="relative overflow-hidden bg-cream py-24 sm:py-32">
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Location & hours"
          title={
            <>
              Visit Us in <em className="italic text-gold-deep">Jankipuram</em>
            </>
          }
          description="Find the centre in Sector I, Janki Vihar Colony — with parking, step-free entry and simple phone-based directions."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          {/* Details card */}
          <Reveal className="flex flex-col gap-6">
            <div className="rounded-3xl border border-beige bg-white p-7 shadow-soft">
              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-sage-soft text-forest">
                  <MapPin className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="font-display text-xl font-semibold text-forest">
                    {clinic.name}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {clinic.address.line1}, {clinic.address.line2},
                    <br />
                    {clinic.address.area}, {clinic.address.city},{" "}
                    {clinic.address.state} {clinic.address.pin}
                  </p>
                </div>
              </div>

              {status && (
                <div className="mt-4 inline-flex items-center gap-2.5 rounded-full bg-ivory px-4 py-2 text-sm font-medium text-charcoal">
                  <span
                    className={cn(
                      "h-2 w-2 rounded-full",
                      status.open ? "bg-sage" : "bg-gold",
                    )}
                    aria-hidden="true"
                  />
                  {status.label}
                </div>
              )}

              <div className="mt-5 flex flex-wrap gap-3">
                <a
                  href={clinic.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[48px] items-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-soft transition-colors hover:bg-forest-deep active:scale-[0.98]"
                >
                  Get Directions
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
                <a
                  href={clinic.phoneHref}
                  className="inline-flex min-h-[48px] items-center gap-2 rounded-full border border-forest/20 px-6 text-sm font-semibold text-forest transition-colors hover:border-forest/40 active:scale-[0.98]"
                >
                  <Phone className="h-4 w-4 text-gold-deep" aria-hidden="true" />
                  {clinic.phoneDisplay}
                </a>
              </div>
            </div>

            {/* Weekly hours */}
            <div className="rounded-3xl border border-beige bg-white p-7 shadow-soft">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-xl font-semibold text-forest">
                  Opening hours
                </h3>
                <span className="text-xs font-medium text-muted-foreground">
                  Asia/Kolkata
                </span>
              </div>
              <ul className="mt-4 divide-y divide-beige/70">
                {hours.map((row) => {
                  const isToday = today === row.day;
                  return (
                    <li
                      key={row.day}
                      className={cn(
                        "flex items-center justify-between px-3 py-2.5 text-sm transition-colors",
                        isToday &&
                          "rounded-xl bg-sage-soft/60 font-semibold text-forest",
                      )}
                    >
                      <span>
                        {row.day}
                        {isToday && (
                          <span className="ml-2 rounded-full bg-forest px-2 py-0.5 text-[0.65rem] font-bold uppercase tracking-wider text-primary-foreground">
                            Today
                          </span>
                        )}
                      </span>
                      <span className="text-charcoal/90">
                        {formatTime(row.open)} – {formatTime(row.close)}
                      </span>
                    </li>
                  );
                })}
              </ul>
              <div className="mt-4 flex items-start gap-3 rounded-2xl bg-ivory px-4 py-3">
                <Accessibility className="mt-0.5 h-4 w-4 shrink-0 text-gold-deep" aria-hidden="true" />
                <p className="text-xs leading-relaxed text-charcoal/80">
                  {clinic.accessibility}
                </p>
              </div>
            </div>
          </Reveal>

          {/* Map */}
          <Reveal delay={0.12} className="min-h-[24rem]">
            <div className="h-full overflow-hidden rounded-3xl border border-beige shadow-soft">
              <iframe
                title="Map showing the location of Sanidhya Naturopathy Center in Jankipuram, Lucknow"
                src={MAP_EMBED}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                className="h-full min-h-[24rem] w-full border-0"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
