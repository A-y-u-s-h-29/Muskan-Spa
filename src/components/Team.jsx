import { Phone, MessageCircle, BadgeCheck, Star } from "lucide-react";
import { RUSSIAN_THERAPISTS, INDIAN_THERAPISTS } from "../data/team";
import { WHATSAPP_NUMBER } from "../data/locations";

function buildTherapistWhatsAppLink(t, origin = "Delhi NCR") {
  const message = [
    "Hello Mahika Russian Spa, I'd like to book with a therapist:",
    "",
    "Therapist: " + t.name + " (" + t.role + ")",
    "Experience: " + t.experience,
    "Price: " + t.price,
    "Location: " + origin,
    "",
    "Please confirm availability.",
  ].join("\n");
  return "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(message);
}

function TherapistCard({ t, origin }) {
  return (
    <article className="group flex flex-col rounded-2xl sm:rounded-3xl border border-stone-200/70 bg-white overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-emerald-900/5 transition-all duration-500">
      {/* Image */}
      <div className="relative aspect-[4/5] overflow-hidden">
        <img
          src={t.img}
          alt={t.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/75 via-stone-900/10 to-transparent" />

        {/* Certified badge */}
        {t.certified && (
          <span className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 inline-flex items-center gap-1 rounded-full bg-white/95 backdrop-blur-sm px-2 sm:px-2.5 py-0.5 sm:py-1 text-[9px] sm:text-[10px] font-medium text-emerald-700 shadow-sm">
            <BadgeCheck size={11} className="shrink-0" />
            Certified
          </span>
        )}

        {/* Experience badge */}
        <span className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 inline-flex items-center gap-1 rounded-full bg-stone-900/70 backdrop-blur-sm px-2 sm:px-2.5 py-0.5 sm:py-1 text-[9px] sm:text-[10px] font-medium text-white">
          <Star size={10} className="shrink-0 fill-emerald-400 text-emerald-400" />
          {t.experience}
        </span>

        {/* Name + role on image bottom */}
        <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4">
          <p className="font-serif text-base sm:text-lg lg:text-xl text-white leading-tight truncate">
            {t.name}
          </p>
          <p className="text-[10px] sm:text-xs text-emerald-200 tracking-wide mt-0.5 font-light truncate">
            {t.role}
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-3 sm:p-4 lg:p-5">
        <p className="text-xs sm:text-sm text-stone-500 leading-relaxed font-light line-clamp-3">
          {t.desc}
        </p>

        {/* Price */}
        <div className="mt-3 sm:mt-4 flex items-baseline justify-between gap-2 border-t border-stone-100 pt-3">
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.15em] text-stone-400 font-light">
            From
          </span>
          <span className="font-serif text-lg sm:text-xl lg:text-2xl text-emerald-700 whitespace-nowrap">
            {t.price}
          </span>
        </div>

        {/* CTAs */}
        <div className="mt-3 sm:mt-4 grid grid-cols-2 gap-2">
          <a
            href="tel:+918796910363"
            className="flex items-center justify-center gap-1.5 rounded-full border border-stone-200 bg-white px-2.5 py-2 sm:py-2.5 text-[11px] sm:text-xs font-medium text-stone-700 transition-all duration-300 hover:border-emerald-300 hover:text-emerald-700 hover:shadow-md active:scale-95 touch-manipulation"
          >
            <Phone size={12} className="sm:size-[13px] shrink-0" /> Call Now
          </a>
          <a
            href={buildTherapistWhatsAppLink(t, origin)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 rounded-full bg-emerald-700 px-2.5 py-2 sm:py-2.5 text-[11px] sm:text-xs font-medium text-white transition-all duration-300 hover:bg-emerald-800 hover:shadow-lg hover:shadow-emerald-700/25 active:scale-95 touch-manipulation"
          >
            <MessageCircle size={12} className="sm:size-[13px] shrink-0" /> WhatsApp
          </a>
        </div>
      </div>
    </article>
  );
}

function TherapistGroup({ eyebrow, title, subtitle, members, origin }) {
  return (
    <div className="mb-14 sm:mb-16 lg:mb-20 last:mb-0">
      {/* Centered heading */}
      <div className="max-w-3xl mx-auto text-center px-4 sm:px-6">
        <p className="text-emerald-600 text-[9px] xs:text-[10px] sm:text-xs lg:text-sm tracking-[0.15em] sm:tracking-[0.2em] lg:tracking-[0.25em] uppercase font-light mb-1.5 sm:mb-2 lg:mb-3">
          {eyebrow}
        </p>
        <h3 className="font-serif text-[1.4rem] xs:text-2xl sm:text-3xl lg:text-4xl text-stone-900">
          {title}
        </h3>
        <div className="mt-2 sm:mt-3 flex justify-center">
          <div className="w-8 sm:w-10 lg:w-12 h-px bg-emerald-200" />
        </div>
        <p className="mt-2.5 sm:mt-3 text-stone-500 text-[13px] sm:text-base font-light max-w-xl mx-auto">
          {subtitle}
        </p>
      </div>

      {/* Grid */}
      <div className="mt-6 sm:mt-8 lg:mt-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          {members.map((m) => (
            <TherapistCard key={m.name} t={m} origin={origin} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function TeamSection({ selectedLocation }) {
  const origin = selectedLocation || "Delhi NCR";

  return (
    <section className="py-10 sm:py-16 lg:py-24 bg-white overflow-hidden">
      

      {/* Russian therapists */}
      <TherapistGroup
        eyebrow="Russian Therapists"
        title="Our Russian Specialists"
        subtitle="Certified in authentic Russian Banya, deep tissue and signature rituals — trained to work at your pace."
        members={RUSSIAN_THERAPISTS}
        origin={origin}
      />

      {/* Indian therapists */}
      <TherapistGroup
        eyebrow="Indian Therapists"
        title="Our Indian Specialists"
        subtitle="Certified in Swedish, aroma, Balinese and reflexology — the same quiet standard of care across every branch."
        members={INDIAN_THERAPISTS}
        origin={origin}
      />
    </section>
  );
}