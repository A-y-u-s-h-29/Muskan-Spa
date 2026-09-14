import { useState } from "react";
import {
  MapPin,
  ChevronRight,
  ChevronDown,
  Star,
  Phone,
  MessageCircle,
  BadgeCheck,
  Shield,
  Heart,
  Gem,
  Leaf,
  Clock,
  Sparkles,
} from "lucide-react";
import { FULL_GALLERY } from "../data/gallery";
import { RUSSIAN_THERAPISTS, INDIAN_THERAPISTS } from "../data/team";
import { HOTELS } from "../data/hotels";
import { WHATSAPP_NUMBER } from "../data/locations";

/* ── Random pick helper (Fisher–Yates shuffle) ───────────── */
function pickRandom(arr, n) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, n);
}

/* ── Why Clients Choose Us data ──────────────────────────── */
const WHY_US = [
  {
    icon: BadgeCheck,
    title: "Certified Therapists",
    desc: "Every therapist is professionally trained, background-verified and certified in authentic Russian & Ayurvedic techniques.",
  },
  {
    icon: Shield,
    title: "Hygiene First",
    desc: "Fresh linen, sanitised rooms and premium oils for every single session. Your safety is never compromised.",
  },
  {
    icon: Heart,
    title: "Personalised Care",
    desc: "Pressure, oils and focus areas tailored to your body — every session begins with a short consultation.",
  },
  {
    icon: Gem,
    title: "Premium Ambience",
    desc: "Candlelit rooms, soft music and a calm, private atmosphere designed to melt stress away.",
  },
  {
    icon: Leaf,
    title: "Authentic Oils",
    desc: "We use only imported aromatherapy and herbal oils — no shortcuts, no diluted blends.",
  },
  {
    icon: Clock,
    title: "On-Time, Every Time",
    desc: "Punctual appointments, in-room service at partner hotels and same-day confirmations.",
  },
];

/* ── FAQ data ────────────────────────────────────────────── */
const FAQS = [
  {
    q: "Do you offer in-room service at hotels?",
    a: "Yes. We provide in-room massage service at all our partner 5-star hotels. Just share your room number on WhatsApp and our therapist will arrive within 30–45 minutes.",
  },
  {
    q: "What are your operating hours?",
    a: "We are open daily from 10:00 AM to 10:00 PM, including weekends and holidays. Last bookings are accepted at 9:00 PM.",
  },
  {
    q: "Are your therapists certified?",
    a: "Absolutely. Every therapist on our team holds a recognised certification in their specialty and undergoes regular training refreshers.",
  },
  {
    q: "How do I pay?",
    a: "We accept cash, UPI, and all major cards. Payment is collected after your session at the outlet or in your room.",
  },
  {
    q: "Can I choose a male or female therapist?",
    a: "Yes, you can request your preference at the time of booking and we will do our best to accommodate it.",
  },
  {
    q: "Do you have shower, steam and jacuzzi facilities?",
    a: "Yes — our flagship outlets include shower, steam, sauna and jacuzzi access, complimentary with signature packages.",
  },
];

/* ── Therapist card (with Call Now + WhatsApp) ───────────── */
function TherapistCard({ therapist }) {
  const { name, role, experience, certified, desc, price, img } = therapist;

  const PHONE_NUMBER = "918796910363"; // +91 87969 10363 without + sign

  const callLink = `tel:+${PHONE_NUMBER}`;
  const waLink = `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(
    `Hi Mahika Russian Spa, I'd like to book ${name} (${role}). Please share availability.`
  )}`;

  return (
    <div className="group relative rounded-2xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col min-h-[300px] xs:min-h-[340px] sm:min-h-[380px] lg:min-h-[420px]">
      <img
        src={img}
        alt={name}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        onError={(e) => {
          e.currentTarget.style.display = "none";
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-stone-950/95 via-stone-950/55 to-stone-950/10" />

      {/* Top-right: certified */}
      {certified && (
        <span className="absolute top-2 sm:top-3 right-2 sm:right-3 inline-flex items-center gap-1 rounded-full bg-emerald-600/90 backdrop-blur px-1.5 sm:px-2.5 py-0.5 sm:py-1 text-[8px] sm:text-[10px] uppercase tracking-[0.08em] sm:tracking-[0.12em] text-white font-light">
          <BadgeCheck size={9} className="sm:w-[11px] sm:h-[11px] flex-shrink-0" />
          <span className="hidden xs:inline">Certified</span>
        </span>
      )}

      {/* Top-left: price */}
      <span className="absolute top-2 sm:top-3 left-2 sm:left-3 rounded-full bg-white/90 backdrop-blur px-2 sm:px-2.5 py-0.5 sm:py-1 text-[10px] sm:text-[11px] font-medium text-emerald-800">
        {price}
      </span>

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
            <span className="truncate">Call Now</span>
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

/* ── Hotel card ──────────────────────────────────────────── */
function HotelCard({ hotel }) {
  const waLink = `https://wa.me/${hotel.whatsapp}?text=${encodeURIComponent(
    `Hi Mahika Russian Spa, I'd like to book a treatment at ${hotel.name}.`
  )}`;

  return (
    <div className="group rounded-2xl border border-stone-200 bg-white overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-row h-40 sm:h-44">
      <div className="flex-1 p-3.5 sm:p-4 flex flex-col min-w-0">
        <div className="flex items-start gap-1.5 mb-1">
          <Star size={11} className="text-emerald-600 mt-1 flex-shrink-0" />
          <h3 className="font-serif text-sm sm:text-base text-stone-900 leading-tight line-clamp-2">
            {hotel.name}
          </h3>
        </div>

        <p className="text-stone-500 text-[11px] sm:text-xs font-light leading-snug line-clamp-2 flex-1">
          {hotel.desc}
        </p>

        <div className="mt-2 flex items-center gap-1.5 flex-wrap">
          <a
            href={`tel:+${hotel.whatsapp}`}
            className="inline-flex items-center gap-1 rounded-full border border-stone-300 px-2.5 py-1 text-[10px] text-stone-700 hover:border-emerald-700 hover:text-emerald-700 transition-colors"
          >
            <Phone size={10} /> Call
          </a>
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 rounded-full border border-stone-300 px-2.5 py-1 text-[10px] text-stone-700 hover:border-emerald-700 hover:text-emerald-700 transition-colors"
          >
            <MessageCircle size={10} /> Chat
          </a>
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-[10px] text-emerald-700 hover:text-emerald-800 font-light ml-auto"
          >
            Book →
          </a>
        </div>
      </div>

      <div className="relative w-24 sm:w-28 lg:w-32 flex-shrink-0 bg-stone-100">
        <img
          src={hotel.img}
          alt={hotel.name}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-l from-stone-950/30 via-transparent to-transparent" />
      </div>
    </div>
  );
}

/* ── FAQ item ────────────────────────────────────────────── */
function FaqItem({ q, a, isOpen, onToggle }) {
  return (
    <div className="rounded-2xl border border-stone-200 bg-stone-50/40 hover:bg-emerald-50/40 hover:border-emerald-200 open:border-emerald-300 open:bg-emerald-50/60 transition-colors duration-300 overflow-hidden">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-start justify-between gap-3 sm:gap-4 cursor-pointer list-none px-4 sm:px-6 py-4 sm:py-5 text-left group"
      >
        <span className="font-serif text-[14px] sm:text-base lg:text-lg text-stone-900 group-hover:text-emerald-800 transition-colors leading-snug pr-2">
          {q}
        </span>
        <ChevronDown
          size={18}
          className={`flex-shrink-0 mt-0.5 text-emerald-600 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-[500px]" : "max-h-0"
        }`}
      >
        <p className="px-4 sm:px-6 pb-4 sm:pb-5 -mt-1 text-stone-600 font-light text-[13px] sm:text-sm leading-relaxed">
          {a}
        </p>
      </div>
    </div>
  );
}

/* ── Main page ───────────────────────────────────────────── */
export default function GalleryPage({ setPage }) {
  const [openFaq, setOpenFaq] = useState(0);

  // Randomly pick 4 Russian + 4 Indian therapists on every mount
  const [russianTherapists] = useState(() => pickRandom(RUSSIAN_THERAPISTS, 4));
  const [indianTherapists] = useState(() => pickRandom(INDIAN_THERAPISTS, 4));

  return (
    <div className="animate-fadeIn">
      {/* ── HERO / INTRO ─────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 xs:pt-24 sm:pt-28 lg:pt-32 xl:pt-40 pb-6 sm:pb-8 lg:pb-10">
        <p className="text-emerald-600 text-[9px] sm:text-xs lg:text-sm tracking-[0.2em] lg:tracking-[0.25em] uppercase font-light mb-2 lg:mb-3">
          Gallery
        </p>
        <h1 className="font-serif text-[1.6rem] xs:text-[1.9rem] sm:text-[2.2rem] md:text-[2.6rem] lg:text-[3.5rem] xl:text-[4.5rem] leading-tight text-stone-900">
          A look inside <span className="italic text-emerald-600">Mahika.</span>
        </h1>
        <p className="mt-3 sm:mt-4 text-stone-500 text-[13px] sm:text-base max-w-2xl font-light">
          Treatment rooms, warm oils, and the quiet details that make every
          session feel like an escape — captured across our Delhi NCR branches.
        </p>
      </section>

      {/* ── GALLERY MASONRY ──────────────────────────────────── */}
      <section className="pb-14 sm:pb-20 lg:pb-28">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="columns-2 xs:columns-2 sm:columns-3 lg:columns-4 gap-2 sm:gap-3 lg:gap-4 [column-fill:_balance]">
            {FULL_GALLERY.map((g, i) => (
              <figure
                key={g.src + i}
                className="group relative mb-2 sm:mb-3 lg:mb-4 break-inside-avoid overflow-hidden rounded-xl sm:rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-500"
              >
                <img
                  src={g.src}
                  alt={g.alt}
                  loading="lazy"
                  className={`w-full object-cover transition-transform duration-700 group-hover:scale-[1.04] ${
                    i % 5 === 0
                      ? "aspect-[4/5]"
                      : i % 3 === 0
                      ? "aspect-square"
                      : "aspect-[4/3]"
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <figcaption className="absolute bottom-0 left-0 right-0 p-2.5 sm:p-3 lg:p-4 text-[9px] sm:text-[11px] lg:text-xs text-white translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 font-light">
                  {g.alt}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ── OUR THERAPISTS ───────────────────────────────────── */}
      <section className="py-10 sm:py-16 lg:py-20 xl:py-24 bg-white border-t border-stone-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12 lg:mb-14">
            <p className="text-emerald-600 text-[9px] sm:text-xs lg:text-sm tracking-[0.2em] lg:tracking-[0.25em] uppercase font-light mb-2 lg:mb-3">
              Our Therapists
            </p>
            <h2 className="font-serif text-[1.4rem] xs:text-[1.6rem] sm:text-[1.85rem] md:text-[2.1rem] lg:text-4xl text-stone-900">
              Trained hands from{" "}
              <span className="italic text-emerald-700">Russia & India</span>
            </h2>
            <p className="mt-3 text-stone-500 text-[13px] sm:text-sm md:text-base font-light italic">
              Every therapist on our team is certified, background-verified and
              chosen for genuine skill — not just a friendly face.
            </p>
          </div>

          <div className="mb-12 sm:mb-16">
            <h3 className="font-serif text-base xs:text-lg sm:text-xl md:text-2xl text-stone-800 mb-4 sm:mb-6 flex items-center gap-2">
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
            <h3 className="font-serif text-base xs:text-lg sm:text-xl md:text-2xl text-stone-800 mb-4 sm:mb-6 flex items-center gap-2">
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

      {/* ── 5-STAR HOTEL PARTNERSHIPS ────────────────────────── */}
      <section className="bg-stone-50/80 border-t border-stone-200/60 py-10 sm:py-16 lg:py-20 xl:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6 sm:mb-8 lg:mb-10 max-w-2xl">
            <p className="text-emerald-600 text-[10px] sm:text-xs tracking-[0.18em] sm:tracking-[0.2em] uppercase font-light mb-2 flex items-center gap-2">
              <Star size={12} /> 5-Star Hotel Partnerships
            </p>
            <h2 className="font-serif text-[1.4rem] xs:text-[1.6rem] sm:text-[1.85rem] md:text-[2.1rem] lg:text-4xl text-stone-900">
              Our Hotel Outlets
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
            {HOTELS.map((hotel) => (
              <HotelCard key={hotel.name} hotel={hotel} />
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY CLIENTS CHOOSE US ────────────────────────────── */}
      <section className="py-10 sm:py-16 lg:py-20 xl:py-24 bg-stone-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12 lg:mb-14">
            <p className="text-emerald-400 text-[10px] sm:text-xs tracking-[0.18em] sm:tracking-[0.2em] uppercase font-light mb-2 lg:mb-3">
              Why Clients Choose Us
            </p>
            <h2 className="font-serif text-[1.4rem] xs:text-[1.6rem] sm:text-[1.85rem] md:text-[2.1rem] lg:text-4xl text-white">
              Six reasons guests keep coming back
            </h2>
            <div className="mt-3 sm:mt-4 flex justify-center">
              <div className="w-10 sm:w-12 h-px bg-emerald-500/50" />
            </div>
          </div>

          <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {WHY_US.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6 lg:p-7 hover:bg-white/[0.06] hover:border-emerald-500/30 transition-all duration-300"
              >
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-emerald-700/20 border border-emerald-500/30 flex items-center justify-center mb-3 sm:mb-4">
                  <Icon size={18} className="text-emerald-300" />
                </div>
                <h3 className="font-serif text-base sm:text-lg lg:text-xl text-white mb-1.5 sm:mb-2">
                  {title}
                </h3>
                <p className="text-xs sm:text-sm text-stone-400 font-light leading-relaxed">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────── */}
      <section className="bg-white py-12 sm:py-16 lg:py-20 xl:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12">
            <p className="text-emerald-600 text-[10px] sm:text-xs tracking-[0.18em] sm:tracking-[0.2em] uppercase font-light mb-2">
              Frequently Asked
            </p>
            <h2 className="font-serif text-[1.4rem] xs:text-[1.6rem] sm:text-[1.85rem] md:text-[2.1rem] lg:text-4xl text-stone-900">
              Questions guests ask before booking
            </h2>
            <div className="mt-3 sm:mt-4 flex justify-center">
              <div className="w-10 sm:w-12 h-px bg-emerald-200" />
            </div>
          </div>

          <div className="space-y-3 sm:space-y-4">
            {FAQS.map((f, i) => (
              <FaqItem
                key={f.q}
                q={f.q}
                a={f.a}
                isOpen={openFaq === i}
                onToggle={() => setOpenFaq(openFaq === i ? -1 : i)}
              />
            ))}
          </div>

          <div className="mt-10 sm:mt-12 text-center">
            <p className="text-stone-500 font-light text-sm sm:text-base mb-4">
              Still have a question? We're a message away.
            </p>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                "Hi Mahika Russian Spa, I have a question about your services."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-emerald-700 text-emerald-800 hover:bg-emerald-700 hover:text-white px-6 sm:px-8 py-3 text-sm sm:text-base font-light tracking-wide transition-all"
            >
              <MessageCircle size={16} /> Ask on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* ── CLOSING CTA ──────────────────────────────────────── */}
      <section className="bg-stone-50/70 border-t border-stone-200/60 py-10 sm:py-14 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-[1.4rem] xs:text-[1.6rem] sm:text-[1.85rem] md:text-[2.1rem] lg:text-4xl text-stone-900">
            Ready to step in?
          </h2>
          <p className="mt-3 text-stone-500 text-sm sm:text-base font-light max-w-xl mx-auto">
            Pick your service and we'll hold a slot for you today.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button
              onClick={() => setPage("services")}
              className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white px-6 py-3 text-sm font-medium text-stone-700 transition-all duration-300 hover:shadow-md active:scale-95"
            >
              View services <ChevronRight size={15} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}