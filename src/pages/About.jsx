import { useState } from "react";
import {
  MapPin,
  ChevronRight,
  Sparkles,
  Droplets,
  Flower2,
  Heart,
  Award,
  Users,
  ShieldCheck,
  BadgeCheck,
  Phone,
  MessageCircle,
} from "lucide-react";
import { RUSSIAN_THERAPISTS, INDIAN_THERAPISTS } from "../data/team";

/* ── Random pick helper (Fisher–Yates shuffle) ───────────── */
function pickRandom(arr, n) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, n);
}

/* ── Therapist card ──────────────────────────────────────── */
function TherapistCard({ therapist }) {
  const { name, role, experience, certified, desc, price, img } = therapist;

  const PHONE_NUMBER = "918796910363"; // +91 87969 10363 without + sign

  const callLink = `tel:+${PHONE_NUMBER}`;
  const waLink = `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(
    `Hi Mahika Russian Spa, I'd like to book ${name} (${role}). Please share availability.`
  )}`;

  return (
    <div className="group relative rounded-2xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col min-h-[340px] xs:min-h-[360px] sm:min-h-[380px] lg:min-h-[420px]">
      {/* Background image */}
      <img
        src={img}
        alt={name}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        onError={(e) => {
          e.currentTarget.style.display = "none";
        }}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-stone-950/95 via-stone-950/55 to-stone-950/10" />

      {/* Top-left: price */}
      <span className="absolute top-2 sm:top-3 left-2 sm:left-3 rounded-full bg-white/90 backdrop-blur px-2 sm:px-2.5 py-0.5 sm:py-1 text-[10px] sm:text-[11px] font-medium text-emerald-800">
        {price}
      </span>

      {/* Top-right: certified */}
      {certified && (
        <span className="absolute top-2 sm:top-3 right-2 sm:right-3 inline-flex items-center gap-1 rounded-full bg-emerald-600/90 backdrop-blur px-1.5 sm:px-2.5 py-0.5 sm:py-1 text-[8px] sm:text-[10px] uppercase tracking-[0.08em] sm:tracking-[0.12em] text-white font-light">
          <BadgeCheck size={9} className="sm:w-[11px] sm:h-[11px] flex-shrink-0" />
          <span className="hidden xs:inline">Certified</span>
        </span>
      )}

      {/* Bottom content — flex column, buttons pushed to bottom */}
      <div className="relative mt-auto p-3 sm:p-4 lg:p-5 text-white flex flex-col">
        <h3 className="font-serif text-sm xs:text-base sm:text-lg lg:text-xl leading-tight">
          {name}
        </h3>
        <p className="text-[9px] xs:text-[10px] sm:text-[11px] uppercase tracking-[0.1em] sm:tracking-[0.15em] text-emerald-300 mt-0.5">
          {role} · {experience}
        </p>
        <p className="mt-1.5 sm:mt-2 text-[10px] xs:text-[11px] sm:text-[12px] lg:text-[13px] text-stone-200 font-light leading-snug line-clamp-2">
          {desc}
        </p>

        {/* Call + WhatsApp buttons */}
        <div className="mt-2 sm:mt-3 flex items-center gap-1 sm:gap-2">
          <a
            href={callLink}
            aria-label={`Call to book ${name}`}
            className="flex-1 min-w-0 inline-flex items-center justify-center gap-1 sm:gap-1.5 rounded-full bg-white/95 hover:bg-white text-stone-900 px-1.5 sm:px-2.5 py-1.5 text-[9px] xs:text-[10px] sm:text-[11px] lg:text-xs font-medium transition-colors duration-300 active:scale-95"
          >
            <Phone size={10} className="sm:w-3 sm:h-3 flex-shrink-0" />
            <span className="truncate">Call</span>
          </a>
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`WhatsApp to book ${name}`}
            className="flex-1 min-w-0 inline-flex items-center justify-center gap-1 sm:gap-1.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white px-1.5 sm:px-2.5 py-1.5 text-[9px] xs:text-[10px] sm:text-[11px] lg:text-xs font-medium transition-colors duration-300 active:scale-95"
          >
            <MessageCircle size={10} className="sm:w-3 sm:h-3 flex-shrink-0" />
            <span className="truncate">WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default function AboutPage({ setPage }) {
  // Random 4 Russian + 4 Indian therapists, re-rolled on each mount (page reload)
  const [russianTherapists] = useState(() => pickRandom(RUSSIAN_THERAPISTS, 4));
  const [indianTherapists] = useState(() => pickRandom(INDIAN_THERAPISTS, 4));

  return (
    <div className="animate-fadeIn">
      <section className="relative overflow-hidden min-h-[45vh] sm:min-h-[55vh] md:min-h-[60vh] lg:min-h-[65vh] flex items-center">
        <img
          src="https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?q=80&w=1800&auto=format&fit=crop"
          alt="Spa treatment room with warm light"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950/92 via-stone-950/75 to-stone-900/40" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 xs:pt-24 sm:pt-28 md:pt-32 lg:pt-36 xl:pt-40 pb-10 sm:pb-12 md:pb-14 lg:pb-20 w-full">
          <span className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-stone-400/20 bg-white/5 px-2.5 sm:px-3 md:px-4 py-1 sm:py-1.5 text-[9px] sm:text-[10px] uppercase tracking-[0.15em] sm:tracking-[0.2em] text-stone-300 backdrop-blur-sm">
            <Heart size={10} className="sm:w-[11px] sm:h-[11px]" /> About Us
          </span>
          <h1 className="mt-4 sm:mt-5 lg:mt-6 font-serif text-[1.6rem] xs:text-[1.9rem] sm:text-[2.4rem] md:text-[2.9rem] lg:text-[3.5rem] xl:text-[4.25rem] leading-[1.08] sm:leading-[1.05] text-white max-w-2xl">
            A quieter kind of <span className="italic text-emerald-300">luxury.</span>
          </h1>
          <p className="mt-3 sm:mt-4 lg:mt-5 text-stone-300 text-[13px] sm:text-sm md:text-base lg:text-lg leading-relaxed max-w-xl font-light">
            Mahika Russian Spa was built on one belief — that genuine relaxation
            cannot be rushed. Since opening our first room in Aerocity, that
            belief has shaped every branch we've opened across Delhi NCR.
          </p>
        </div>
      </section>

      <section className="py-10 sm:py-14 md:py-16 lg:py-20 xl:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-14 xl:gap-16 items-center">
          <div className="order-2 lg:order-1">
            <p className="text-emerald-600 text-[9px] sm:text-xs lg:text-sm tracking-[0.2em] lg:tracking-[0.25em] uppercase font-light mb-2 lg:mb-3">
              Our Philosophy
            </p>
            <h2 className="font-serif text-[1.35rem] xs:text-[1.5rem] sm:text-[1.85rem] md:text-[2.1rem] lg:text-[2.5rem] xl:text-4xl text-stone-900 leading-tight">
              Twenty-five locations, one standard of care
            </h2>
            <div className="mt-4 lg:mt-6 flex items-start gap-3 lg:gap-5">
              <span className="mt-2 h-px w-8 sm:w-10 lg:w-16 flex-shrink-0 bg-emerald-400/60" />
              <div className="space-y-4 text-[13px] sm:text-sm md:text-base text-stone-600 font-light leading-relaxed">
                <p>
                  We do not treat our branches as separate businesses. Every
                  therapist is trained in the same protocols, every room is held
                  to the same cleanliness standard, and every guest receives the
                  same unhurried attention — whether you walk into Aerocity or
                  Punjabi Bagh.
                </p>
                <p>
                  Our oils are pure, warmed before use, and chosen for your skin.
                  Our rooms are private and sound-treated. Our therapists work to
                  your pace, not a clock. These are small things individually, but
                  together they are the difference between a massage and a ritual.
                </p>
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2 grid grid-cols-2 gap-2 sm:gap-3 lg:gap-4">
            <img
              src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=800&auto=format&fit=crop"
              alt="Massage oils and fresh flowers"
              className="rounded-2xl sm:rounded-3xl object-cover h-36 xs:h-44 sm:h-56 lg:h-72 w-full shadow-md"
              loading="lazy"
            />
            <img
              src="https://images.unsplash.com/photo-1595871151608-bc7abd1caca3?q=80&w=800&auto=format&fit=crop"
              alt="Vanity table with mirror"
              className="rounded-2xl sm:rounded-3xl object-cover h-36 xs:h-44 sm:h-56 lg:h-72 w-full shadow-md mt-4 sm:mt-6 lg:mt-8"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-14 md:py-16 lg:py-20 bg-stone-50/70 border-y border-stone-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-emerald-600 text-[9px] sm:text-xs lg:text-sm tracking-[0.2em] lg:tracking-[0.25em] uppercase font-light mb-2 lg:mb-3">
              The Experience
            </p>
            <h2 className="font-serif text-[1.35rem] xs:text-[1.5rem] sm:text-[1.85rem] md:text-[2.1rem] lg:text-[2.5rem] xl:text-4xl text-stone-900">
              What premium means here
            </h2>
          </div>
          <div className="mt-6 sm:mt-8 lg:mt-12 grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-8">
            {[
              {
                icon: <Sparkles size={20} className="sm:w-[22px] sm:h-[22px]" />,
                title: "Trained therapists",
                body: "Every therapist completes our internal certification in classical and modern technique before working with guests.",
              },
              {
                icon: <Droplets size={20} className="sm:w-[22px] sm:h-[22px]" />,
                title: "Pure warmed oils",
                body: "No synthetic fragrance. Oils are warmed to skin temperature before your session begins.",
              },
              {
                icon: <Flower2 size={20} className="sm:w-[22px] sm:h-[22px]" />,
                title: "Private, calm rooms",
                body: "Sound-treated, individually climate-controlled rooms at every branch — the same standard everywhere.",
              },
              {
                icon: <ShieldCheck size={20} className="sm:w-[22px] sm:h-[22px]" />,
                title: "Hygiene first",
                body: "Fresh linen and sanitised equipment for every guest, without exception.",
              },
              {
                icon: <Users size={20} className="sm:w-[22px] sm:h-[22px]" />,
                title: "Unhurried pace",
                body: "Your therapist works to your comfort, not the clock. We build in time to settle before and after.",
              },
              {
                icon: <Award size={20} className="sm:w-[22px] sm:h-[22px]" />,
                title: "12k+ sessions a year",
                body: "Trusted by guests across Delhi NCR, with a 4.9 average rating across our 25 branches.",
              },
            ].map((f) => (
              <div
                key={f.title}
                className="group rounded-2xl border border-stone-200/70 bg-white p-4 sm:p-5 lg:p-6 transition-all duration-500 hover:border-emerald-200/60 hover:shadow-lg hover:shadow-emerald-900/5"
              >
                <div className="w-10 h-10 sm:w-11 sm:h-11 lg:w-12 lg:h-12 rounded-full bg-emerald-100/70 flex items-center justify-center text-emerald-700 group-hover:bg-emerald-100 transition-colors">
                  {f.icon}
                </div>
                <h3 className="mt-3 lg:mt-4 font-serif text-base sm:text-lg lg:text-xl text-stone-900">
                  {f.title}
                </h3>
                <p className="mt-1.5 lg:mt-2 text-xs sm:text-[13px] md:text-sm text-stone-500 font-light leading-relaxed">
                  {f.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OUR THERAPISTS (random 4 + 4 on each reload) ──────── */}
      <section className="py-10 sm:py-14 md:py-16 lg:py-20 xl:py-24 bg-white border-t border-stone-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10 md:mb-12 lg:mb-14">
            <p className="text-emerald-600 text-[9px] sm:text-xs lg:text-sm tracking-[0.2em] lg:tracking-[0.25em] uppercase font-light mb-2 lg:mb-3">
              Our Therapists
            </p>
            <h2 className="font-serif text-[1.35rem] xs:text-[1.5rem] sm:text-[1.85rem] md:text-[2.1rem] lg:text-[2.5rem] xl:text-4xl text-stone-900">
              Trained hands from{" "}
              <span className="italic text-emerald-700">Russia & India</span>
            </h2>
            <p className="mt-3 text-stone-500 text-[13px] sm:text-sm md:text-base font-light italic">
              Every therapist on our team is certified, background-verified and
              chosen for genuine skill — not just a friendly face.
            </p>
          </div>

          <div className="mb-10 sm:mb-12 md:mb-14 lg:mb-16">
            <h3 className="font-serif text-base xs:text-lg sm:text-xl md:text-2xl text-stone-800 mb-4 sm:mb-5 md:mb-6 flex items-center gap-2">
              <span className="w-6 sm:w-8 h-[1px] bg-emerald-600 inline-block" />
              Russian Therapists
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 xs:gap-4 sm:gap-5 md:gap-6">
              {russianTherapists.map((t) => (
                <TherapistCard key={t.name} therapist={t} />
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-serif text-base xs:text-lg sm:text-xl md:text-2xl text-stone-800 mb-4 sm:mb-5 md:mb-6 flex items-center gap-2">
              <span className="w-6 sm:w-8 h-[1px] bg-emerald-600 inline-block" />
              Indian Therapists
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 xs:gap-4 sm:gap-5 md:gap-6">
              {indianTherapists.map((t) => (
                <TherapistCard key={t.name} therapist={t} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-14 md:py-16 lg:py-20 xl:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-4">
            {[
              "https://images.unsplash.com/photo-1583416750470-965b2707b355?q=80&w=800&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1620733723572-11c53f73a416?q=80&w=800&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?q=80&w=800&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=800&auto=format&fit=crop",
            ].map((src, i) => (
              <div
                key={src}
                className="group relative overflow-hidden rounded-2xl lg:rounded-3xl aspect-[4/5]"
              >
                <img
                  src={src}
                  alt={`Mahika Russian Spa interior ${i + 1}`}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-stone-900 py-10 sm:py-14 md:py-16 lg:py-20 xl:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-emerald-400/80 text-[9px] sm:text-xs tracking-[0.2em] lg:tracking-[0.25em] uppercase font-light mb-2 lg:mb-3">
            Why Choose Us
          </p>
          <h2 className="font-serif text-[1.35rem] xs:text-[1.5rem] sm:text-[1.85rem] md:text-[2.1rem] lg:text-[2.5rem] xl:text-4xl text-stone-100 leading-tight">
            The same quiet ritual, wherever you are in the city
          </h2>
          <p className="mt-4 lg:mt-6 text-stone-400 text-[13px] sm:text-sm md:text-base font-light leading-relaxed max-w-2xl mx-auto">
            Twenty-five branches across Delhi NCR means there is always a Mahika
            near you — at the airport, near your office, or a short drive from
            home. Choose a location and we will hold a slot for you today.
          </p>
          <div className="mt-6 lg:mt-10 flex flex-col xs:flex-row flex-wrap justify-center gap-3">
            <button
              onClick={() => setPage("locations")}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-600 px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:bg-emerald-500 hover:shadow-lg hover:shadow-emerald-600/25 active:scale-95"
            >
              <MapPin size={15} /> Find your branch
            </button>
            <button
              onClick={() => setPage("services")}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-medium text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/15 active:scale-95"
            >
              View all services <ChevronRight size={15} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}