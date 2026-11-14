import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Award,
  CalendarCheck,
  CheckCircle2,
  Clock,
  HeartHandshake,
  MessageCircle,
  Phone,
  ShieldCheck,
  Sparkles,
  Stethoscope,
} from "lucide-react";
import practitionerPortrait from "@/assets/clinic-practitioner-portrait.jpg";
import { clinic, whatsappLink } from "@/lib/clinic";
import { useClinicData } from "@/lib/clinicSync";
import { DEFAULT_DOCTOR } from "@/lib/appointment";
import { LeafSprig, Reveal, SectionHeading } from "./primitives";

export function DoctorSpotlight() {
  const managedClinic = useClinicData();
  const doctorName = managedClinic.doctor_name || DEFAULT_DOCTOR.name;
  const specialty = managedClinic.specialization || DEFAULT_DOCTOR.specialty;
  const qualification = managedClinic.qualification || DEFAULT_DOCTOR.qualifications;
  const fee = managedClinic.consultation_fee || DEFAULT_DOCTOR.consultationFee;

  return (
    <section className="relative overflow-hidden bg-ivory py-20 sm:py-28 border-y border-beige/80">
      {/* Decorative ambient gradients */}
      <div
        aria-hidden="true"
        className="absolute -right-32 top-1/4 h-80 w-80 rounded-full bg-sage-soft/40 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute -left-32 bottom-10 h-80 w-80 rounded-full bg-beige/60 blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Chief Practitioner & Physician"
          title={
            <>
              Meet <em className="italic text-gold-deep">{doctorName}</em>
            </>
          }
          description="Experienced, unhurried healthcare focused on your complete constitution, medical history, and natural recovery."
        />

        <div className="mt-14 grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Doctor Portrait with Trust Overlays */}
          <div className="lg:col-span-5">
            <Reveal className="relative mx-auto max-w-md lg:max-w-none">
              <div
                aria-hidden="true"
                className="absolute -left-4 -top-4 h-full w-full rounded-3xl border border-sage/40"
              />
              <div className="relative overflow-hidden rounded-3xl bg-cream shadow-lift">
                <img
                  src={practitionerPortrait}
                  alt={`${doctorName} at Sanidhya Naturopathy Center`}
                  width={816}
                  height={816}
                  loading="lazy"
                  className="aspect-[4/5] w-full object-cover object-center"
                />

                {/* Verified Physician Badge */}
                <div className="absolute top-4 left-4 inline-flex items-center gap-2 rounded-full border border-teal-200/80 bg-white/95 px-3.5 py-1.5 text-xs font-bold text-teal-800 shadow-md backdrop-blur-md">
                  <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Verified Medical Practitioner</span>
                </div>

                {/* Consultation Fee Card Overlay */}
                <div className="absolute bottom-4 inset-x-4 rounded-2xl border border-white/80 bg-white/95 p-4 shadow-lift backdrop-blur-md">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                        OPD Consultation Fee
                      </p>
                      <p className="font-display text-2xl font-black text-forest">
                        ₹{fee}
                        <span className="text-xs font-normal text-muted-foreground ml-1.5">
                          (Pay at Clinic)
                        </span>
                      </p>
                    </div>
                    <div className="rounded-xl bg-teal-50 px-3 py-1.5 text-right border border-teal-200">
                      <p className="text-[10px] font-bold uppercase text-[#0d9488]">Zero Wait</p>
                      <p className="text-xs font-semibold text-teal-900">Digital Token</p>
                    </div>
                  </div>
                </div>
              </div>
              <LeafSprig className="absolute -bottom-6 -right-4 h-12 w-24 text-gold hidden sm:block" />
            </Reveal>
          </div>

          {/* Doctor Credentials & Consultation Value */}
          <div className="lg:col-span-7 space-y-6">
            <Reveal delay={0.08}>
              <div className="inline-flex items-center gap-2 rounded-full bg-sage-soft/70 px-4 py-1 text-xs font-bold uppercase tracking-wider text-forest">
                <Stethoscope className="h-3.5 w-3.5 text-gold-deep" />
                {specialty}
              </div>

              <h3 className="mt-3 font-display text-3xl font-semibold leading-tight text-forest sm:text-4xl">
                Unhurried, compassionate care designed around{" "}
                <em className="italic text-gold-deep">your health story</em>.
              </h3>

              <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
                At Sanidhya Naturopathy Center in Sector I, Jankipuram, consultations are never a rushed 2-minute prescription. {doctorName} dedicates 45 to 60 minutes to examine your lifestyle, digestion, medical reports, and chronic tension patterns before proposing a gentle, natural protocol.
              </p>
            </Reveal>

            {/* Key Clinical Trust Pillars */}
            <Reveal delay={0.14}>
              <div className="grid gap-3.5 sm:grid-cols-2 pt-2">
                {[
                  {
                    title: "Medical & Holistic Synthesis",
                    desc: "Combines physiological understanding with traditional naturopathy, acupressure & Sujok.",
                  },
                  {
                    title: "100% Non-Surgical Focus",
                    desc: "Proven recoveries in scoliosis, spine alignment, sciatica, and varicose veins without surgery.",
                  },
                  {
                    title: "45–60 Min Deep Consultations",
                    desc: "Plenty of time to discuss reports, past medications, daily habits, and stress factors.",
                  },
                  {
                    title: "DPDP Act 2023 Compliant",
                    desc: "Your medical discussions and health records are completely private, safe, and confidential.",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-beige bg-white p-4 shadow-xs"
                  >
                    <div className="flex items-start gap-2.5">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                      <div>
                        <h4 className="text-sm font-bold text-forest">{item.title}</h4>
                        <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* Direct Booking & Action Buttons */}
            <Reveal delay={0.2} className="pt-2">
              <div className="flex flex-wrap items-center gap-3.5 sm:gap-4">
                <Link
                  to="/booking"
                  className="inline-flex min-h-[50px] items-center justify-center gap-2 rounded-full bg-primary px-8 text-base font-semibold text-primary-foreground shadow-soft transition-all duration-300 hover:bg-forest-deep active:scale-95"
                >
                  <CalendarCheck className="h-4 w-4" />
                  Book OPD Appointment with Doctor
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <a
                  href={whatsappLink(
                    `Hello Sanidhya Naturopathy Center, I would like to consult with ${doctorName}.`,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[50px] items-center justify-center gap-2 rounded-full border border-emerald-600/30 bg-emerald-50 px-6 text-sm font-semibold text-emerald-900 shadow-xs transition-colors hover:bg-emerald-600 hover:text-white active:scale-95"
                >
                  <MessageCircle className="h-4 w-4 text-emerald-600" />
                  WhatsApp Consultation Enquiry
                </a>

                <a
                  href={clinic.phoneHref}
                  className="inline-flex min-h-[50px] items-center justify-center gap-2 rounded-full border border-forest/20 bg-white px-6 text-sm font-semibold text-forest shadow-xs transition-colors hover:bg-forest hover:text-ivory active:scale-95"
                >
                  <Phone className="h-4 w-4 text-gold-deep" />
                  Call: {clinic.phoneDisplay}
                </a>
              </div>

              <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                <ShieldCheck className="h-4 w-4 text-gold-deep shrink-0" />
                <span>OPD Token generated instantly · Zero advance fee required</span>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
