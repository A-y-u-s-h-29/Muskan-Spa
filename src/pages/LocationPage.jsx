import { useEffect, useState } from "react";
import {
  Phone,
  MapPin,
  Clock,
  MessageCircle,
  Star,
  Sparkles,
  Award,
  Users,
  CheckCircle2,
  BadgeCheck,
  Shield,
  Heart,
  Leaf,
  Gem,
  Quote,
  ChevronDown,
} from "lucide-react";
import BookingForm from "../components/BookingForm";
import ServiceGrid from "../components/ServiceGrid";
import HeroSlider from "../components/Hero";
import { getServicesForLocation } from "../data/services";
import { WHATSAPP_NUMBER } from "../data/locations";
import { RUSSIAN_THERAPISTS, INDIAN_THERAPISTS } from "../data/team";
import { HOTELS, FACILITIES, getLocationMessage } from "../data/hotels";

/* ---------------------------------------------------------------
   Achievement bar data
   --------------------------------------------------------------- */
const ACHIEVEMENTS = [
  { icon: Star, value: "4.9★", label: "Guest Rating" },
  { icon: Users, value: "25,000+", label: "Happy Clients" },
  { icon: Award, value: "12+", label: "Years Experience" },
  { icon: Sparkles, value: "100%", label: "Certified Therapists" },
];

/* ---------------------------------------------------------------
   Random pick helper (Fisher–Yates shuffle)
   --------------------------------------------------------------- */
function pickRandom(arr, n) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, n);
}

/* ---------------------------------------------------------------
   Why guests choose us data
   --------------------------------------------------------------- */
const WHY_CHOOSE_US = [
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

/* ---------------------------------------------------------------
   FAQ data
   --------------------------------------------------------------- */
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

  const PHONE_NUMBER = "918287674605"; // +91 87969 10363 without + sign

  const callLink = `tel:+${PHONE_NUMBER}`;
  const waLink = `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(
    `Hi Mahika Russian Spa, I'd like to book ${name} (${role}). Please share availability.`
  )}`;

  return (
    <div className="group relative rounded-2xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col min-h-[340px] sm:min-h-[380px] lg:min-h-[420px]">
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

      {/* Gradient overlay — darker at bottom so text stays legible */}
      <div className="absolute inset-0 bg-gradient-to-t from-stone-950/95 via-stone-950/55 to-stone-950/10" />

      {/* Top-left: price */}
      <span className="absolute top-2.5 sm:top-3 left-2.5 sm:left-3 rounded-full bg-white/90 backdrop-blur px-2 sm:px-2.5 py-0.5 sm:py-1 text-[10px] sm:text-[11px] font-medium text-emerald-800">
        {price}
      </span>

      {/* Top-right: certified */}
      {certified && (
        <span className="absolute top-2.5 sm:top-3 right-2.5 sm:right-3 inline-flex items-center gap-1 rounded-full bg-emerald-600/90 backdrop-blur px-2 sm:px-2.5 py-0.5 sm:py-1 text-[9px] sm:text-[10px] uppercase tracking-[0.12em] text-white font-light">
          <BadgeCheck size={10} /> Certified
        </span>
      )}

      {/* Bottom content — flex column, buttons pushed to bottom with mt-auto */}
      <div className="relative mt-auto p-3.5 sm:p-4 lg:p-5 text-white flex flex-col">
        <h3 className="font-serif text-base sm:text-lg lg:text-xl leading-tight">
          {name}
        </h3>
        <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.15em] text-emerald-300 mt-0.5">
          {role} · {experience}
        </p>
        <p className="mt-1.5 sm:mt-2 text-[11px] sm:text-[12px] lg:text-[13px] text-stone-200 font-light leading-snug line-clamp-2">
          {desc}
        </p>

        {/* Call + WhatsApp buttons */}
        <div className="mt-2.5 sm:mt-3 flex items-center gap-1.5 sm:gap-2">
          <a
            href={callLink}
            aria-label={`Call to book ${name}`}
            className="flex-1 min-w-0 inline-flex items-center justify-center gap-1 sm:gap-1.5 rounded-full bg-white/95 hover:bg-white text-stone-900 px-2 sm:px-2.5 py-1.5 text-[10px] sm:text-[11px] lg:text-xs font-medium transition-colors duration-300 active:scale-95"
          >
            <Phone size={11} className="sm:size-[12px] flex-shrink-0" />
            <span className="truncate">Call</span>
          </a>
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`WhatsApp to book ${name}`}
            className="flex-1 min-w-0 inline-flex items-center justify-center gap-1 sm:gap-1.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white px-2 sm:px-2.5 py-1.5 text-[10px] sm:text-[11px] lg:text-xs font-medium transition-colors duration-300 active:scale-95"
          >
            <MessageCircle size={11} className="sm:size-[12px] flex-shrink-0" />
            <span className="truncate">WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------
   Hotel card
   --------------------------------------------------------------- */
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
          onError={(e) => { e.currentTarget.style.display = "none"; }}
        />
        <div className="absolute inset-0 bg-gradient-to-l from-stone-950/30 via-transparent to-transparent" />
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------
   Main page
   --------------------------------------------------------------- */
export default function LocationPage({ location, setPage }) {
  const services = getServicesForLocation(location);

  // Randomly pick 4 Russian + 4 Indian therapists.
  // Re-rolls every time `location` changes (i.e. on each new location page)
  // AND once on initial mount (page reload).
  const [russianTherapists, setRussianTherapists] = useState(() =>
    pickRandom(RUSSIAN_THERAPISTS, 4)
  );
  const [indianTherapists, setIndianTherapists] = useState(() =>
    pickRandom(INDIAN_THERAPISTS, 4)
  );

  useEffect(() => {
    if (!location) {
      setPage("locations");
      window.scrollTo(0, 0);
    }
  }, [location, setPage]);

  useEffect(() => {
    if (location) window.scrollTo(0, 0);
  }, [location]);

  // Re-shuffle therapists every time the location changes
  useEffect(() => {
    setRussianTherapists(pickRandom(RUSSIAN_THERAPISTS, 4));
    setIndianTherapists(pickRandom(INDIAN_THERAPISTS, 4));
  }, [location]);

  if (!location) return null;

  const locationMessage = getLocationMessage(location);

  return (
    <div className="animate-fadeIn" key={location}>

      {/* 1. HERO */}
      <HeroSlider location={location} />

      {/* 2. OUR THERAPISTS */}
      <section className="py-10 sm:py-16 lg:py-20 xl:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12 lg:mb-14">
            <p className="text-emerald-600 text-[9px] sm:text-xs lg:text-sm tracking-[0.2em] lg:tracking-[0.25em] uppercase font-light mb-2 lg:mb-3">
              Our Therapists
            </p>
            <h2 className="font-serif text-[1.5rem] xs:text-2xl sm:text-3xl lg:text-4xl text-stone-900">
              Trained hands from <span className="italic text-emerald-700">Russia & India</span>
            </h2>
            <p className="mt-3 text-stone-500 text-sm sm:text-base font-light italic">
              {locationMessage}
            </p>
          </div>

          <div className="mb-12 sm:mb-16">
            <h3 className="font-serif text-xl sm:text-2xl text-stone-800 mb-4 sm:mb-6 flex items-center gap-2">
              <span className="w-8 h-[1px] bg-emerald-600 inline-block" />
              Russian Therapists
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {russianTherapists.map((t) => (
                <TherapistCard key={t.name} therapist={t} />
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-serif text-xl sm:text-2xl text-stone-800 mb-4 sm:mb-6 flex items-center gap-2">
              <span className="w-8 h-[1px] bg-emerald-600 inline-block" />
              Indian Therapists
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {indianTherapists.map((t) => (
                <TherapistCard key={t.name} therapist={t} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. HOTEL PARTNERSHIPS */}
      <section className="bg-stone-50/80 border-t border-stone-200/60 py-10 sm:py-16 lg:py-20 xl:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 sm:mb-10 lg:mb-12 max-w-2xl">
            <p className="text-emerald-600 text-[9px] sm:text-xs tracking-[0.2em] uppercase font-light mb-2 flex items-center gap-2">
              <Star size={12} /> 5-Star Hotel Partnerships
            </p>
            <h2 className="font-serif text-[1.5rem] xs:text-2xl sm:text-3xl lg:text-4xl text-stone-900">
              Our Hotel Outlets
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-7">
            {HOTELS.map((hotel) => (
              <HotelCard key={hotel.name} hotel={hotel} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. LUXURY YOU CAN FEEL */}
      <section className="bg-white py-10 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-emerald-600 text-[9px] sm:text-xs tracking-[0.2em] uppercase font-light mb-2">
            Luxury You Can Feel
          </p>
          <h2 className="font-serif text-[1.5rem] xs:text-2xl sm:text-3xl lg:text-4xl text-stone-900 max-w-3xl mx-auto">
            Deep tissue, Swedish massage, aromatherapy and the full Banya ritual — with shower, steam, sauna and jacuzzi facilities on site.
          </h2>

          <div className="mt-8 sm:mt-10 flex flex-wrap justify-center gap-3 sm:gap-4">
            {FACILITIES.map((f) => (
              <span
                key={f}
                className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50/60 px-4 sm:px-5 py-2 text-xs sm:text-sm text-emerald-800 font-light tracking-wide"
              >
                <CheckCircle2 size={14} className="text-emerald-600" />
                {f}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 5. FACT SECTION (centered) */}
      <section className="relative bg-gradient-to-br from-stone-900 via-stone-800 to-emerald-950 text-white py-12 sm:py-16 lg:py-20 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-64 h-64 sm:w-96 sm:h-96 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 sm:w-96 sm:h-96 bg-emerald-400/10 rounded-full blur-3xl" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-emerald-500/15 border border-emerald-400/30 mb-4 sm:mb-6">
            <Sparkles className="text-emerald-300" size={22} />
          </div>
          <p className="text-emerald-300 text-[10px] sm:text-xs tracking-[0.25em] uppercase font-light mb-3">
            Did You Know?
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl xl:text-5xl leading-tight">
            A <span className="italic text-emerald-300">90-minute massage</span> can lower cortisol levels by up to 30% — the same stress hormone that disrupts sleep, mood and immunity.
          </h2>
          <p className="mt-5 sm:mt-6 text-stone-300 font-light text-sm sm:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed">
            At Mahika Russian Spa in {location}, every session is engineered to deliver measurable relaxation — not just a feel-good hour. Guests who visit us regularly report deeper sleep, less tension and improved focus within the first week.
          </p>

          <div className="mt-8 sm:mt-10 grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 max-w-2xl mx-auto">
            {[
              { v: "30%", l: "Lower Cortisol" },
              { v: "2x", l: "Better Sleep" },
              { v: "90m", l: "Optimal Session" },
            ].map((s) => (
              <div key={s.l} className="rounded-xl border border-white/10 bg-white/5 backdrop-blur px-3 py-4">
                <p className="font-serif text-2xl sm:text-3xl text-emerald-300">{s.v}</p>
                <p className="text-[10px] sm:text-xs uppercase tracking-[0.15em] text-stone-400 mt-1">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. WHY GUESTS CHOOSE US */}
      <section className="bg-gradient-to-b from-emerald-50/40 via-white to-white py-12 sm:py-16 lg:py-20 xl:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12 lg:mb-14">
            <p className="text-emerald-600 text-[9px] sm:text-xs tracking-[0.2em] uppercase font-light mb-2">
              Why Guests Choose Us
            </p>
            <h2 className="font-serif text-[1.5rem] xs:text-2xl sm:text-3xl lg:text-4xl text-stone-900">
              Trusted by <span className="italic text-emerald-700">25,000+ guests</span> across Delhi NCR
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-7">
            {WHY_CHOOSE_US.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="group rounded-2xl border border-emerald-100/70 bg-white p-5 sm:p-6 shadow-sm hover:shadow-xl hover:border-emerald-300/70 transition-all duration-300"
              >
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center mb-4 group-hover:bg-emerald-700 group-hover:border-emerald-700 transition-colors duration-300">
                  <Icon size={20} className="text-emerald-700 group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-serif text-lg sm:text-xl text-stone-900 mb-2">{title}</h3>
                <p className="text-stone-500 font-light text-[13px] sm:text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 sm:mt-12 text-center">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                `Hi Mahika Russian Spa, I'd like to know more about your services at ${location}.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white px-6 sm:px-8 py-3 sm:py-3.5 text-sm sm:text-base font-light tracking-wide shadow-lg shadow-emerald-900/20 transition-all hover:scale-[1.02]"
            >
              <MessageCircle size={16} /> Chat with us on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* 7. LUXURY CONTEXT / QUOTE SECTION */}
      <section className="relative bg-gradient-to-br from-stone-100 via-emerald-50/60 to-stone-100 py-12 sm:py-16 lg:py-20 xl:py-24 overflow-hidden">
        <div className="absolute top-10 left-10 w-32 h-32 sm:w-48 sm:h-48 bg-emerald-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-40 h-40 sm:w-64 sm:h-64 bg-amber-100/40 rounded-full blur-3xl" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12">
            <p className="text-emerald-700 text-[9px] sm:text-xs tracking-[0.25em] uppercase font-light mb-2">
              The Mahika Experience
            </p>
            <h2 className="font-serif text-[1.5rem] xs:text-2xl sm:text-3xl lg:text-4xl text-stone-900">
              Where <span className="italic text-emerald-700">tradition</span> meets <span className="italic text-emerald-700">refinement</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-5 sm:gap-6 lg:gap-7">
            {[
              {
                icon: Quote,
                title: "Curated Rituals",
                text: "Each treatment is a choreographed sequence — warmed oils, rhythmic pressure and precise transitions that guide the body into deep release.",
              },
              {
                icon: Gem,
                title: "Opulent Setting",
                text: "Warm amber lighting, natural wood, linen drapes and the faint scent of sandalwood. Every detail is chosen to slow your pulse from the moment you enter.",
              },
              {
                icon: Heart,
                title: "Unhurried Time",
                text: "No rushed sessions. No clock-watching. Your therapist stays fully present — because true luxury is feeling genuinely cared for.",
              },
            ].map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="relative rounded-2xl border border-emerald-200/60 bg-white/80 backdrop-blur p-6 sm:p-7 shadow-sm hover:shadow-lg transition-shadow duration-300"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-600 to-emerald-800 flex items-center justify-center mb-4">
                  <Icon size={18} className="text-white" />
                </div>
                <h3 className="font-serif text-lg sm:text-xl text-stone-900 mb-2">{title}</h3>
                <p className="text-stone-600 font-light text-[13px] sm:text-sm leading-relaxed">{text}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 sm:mt-12 max-w-3xl mx-auto text-center">
            <div className="relative rounded-3xl border border-amber-200/70 bg-gradient-to-br from-amber-50/80 to-white p-6 sm:p-8 lg:p-10 shadow-md">
              <Quote className="mx-auto text-amber-400 mb-3" size={26} />
              <p className="font-serif italic text-lg sm:text-xl lg:text-2xl text-stone-800 leading-relaxed">
                "Luxury is not a thread count or a chandelier. It is the feeling of being completely, unhurriedly cared for."
              </p>
              <p className="mt-4 text-[11px] sm:text-xs uppercase tracking-[0.2em] text-emerald-700 font-light">
                — The Mahika Philosophy
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. FAQ */}
      <section className="bg-white py-12 sm:py-16 lg:py-20 xl:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12">
            <p className="text-emerald-600 text-[9px] sm:text-xs tracking-[0.25em] uppercase font-light mb-2">
              Frequently Asked
            </p>
            <h2 className="font-serif text-[1.5rem] xs:text-2xl sm:text-3xl lg:text-4xl text-stone-900">
              Questions about <span className="italic text-emerald-700">{location}</span>
            </h2>
          </div>

          <div className="space-y-3 sm:space-y-4">
            {FAQS.map((item, idx) => (
              <details
                key={idx}
                className="group rounded-2xl border border-stone-200 bg-stone-50/40 hover:bg-emerald-50/50 hover:border-emerald-200 open:border-emerald-300 open:bg-emerald-50/60 transition-colors duration-300"
              >
                <summary className="flex items-center justify-between gap-4 cursor-pointer list-none px-5 sm:px-6 py-4 sm:py-5">
                  <span className="font-serif text-[15px] sm:text-base lg:text-lg text-stone-900 group-open:text-emerald-800 transition-colors">
                    {item.q}
                  </span>
                  <ChevronDown
                    size={18}
                    className="flex-shrink-0 text-emerald-600 transition-transform duration-300 group-open:rotate-180"
                  />
                </summary>
                <div className="px-5 sm:px-6 pb-4 sm:pb-5 -mt-1 text-stone-600 font-light text-[13px] sm:text-sm leading-relaxed">
                  {item.a}
                </div>
              </details>
            ))}
          </div>

          <div className="mt-10 sm:mt-12 text-center">
            <p className="text-stone-500 font-light text-sm sm:text-base mb-4">
              Still have a question? We're a message away.
            </p>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                `Hi Mahika Russian Spa, I have a question about your services at ${location}.`
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

      {/* 9. SERVICES */}
      <section className="py-10 sm:py-16 lg:py-20 xl:py-28 bg-stone-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6 sm:mb-8 lg:mb-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <p className="text-emerald-600 text-[9px] sm:text-xs lg:text-sm tracking-[0.2em] lg:tracking-[0.25em] uppercase font-light mb-2 lg:mb-3">
                Services at {location}
              </p>
              <h2 className="font-serif text-[1.5rem] xs:text-2xl sm:text-3xl lg:text-4xl text-stone-900">
                Available treatments
              </h2>
            </div>
            <button
              type="button"
              onClick={() => {
                setPage("services");
                window.scrollTo(0, 0);
              }}
              className="hidden sm:inline-flex items-center gap-2 rounded-full border border-emerald-700 text-emerald-800 hover:bg-emerald-700 hover:text-white px-5 lg:px-6 py-2.5 lg:py-3 text-xs lg:text-sm font-light tracking-wide transition-all duration-300 self-start sm:self-auto"
            >
              View All Treatments
              <span aria-hidden="true">→</span>
            </button>
          </div>

          {/* Force ServiceGrid into a single 4-column row */}
          <div className="[&>*]:!grid [&>*]:!grid-cols-2 sm:[&>*]:!grid-cols-4 [&>*]:!gap-3 sm:[&>*]:!gap-5 lg:[&>*]:!gap-6">
            <ServiceGrid
              services={services.slice(0, 4)}
              location={location}
              layout="card"
            />
          </div>

          {/* Mobile / tablet view-all button */}
          <div className="mt-6 sm:mt-8 flex justify-center sm:hidden">
            <button
              type="button"
              onClick={() => {
                setPage("services");
                window.scrollTo(0, 0);
              }}
              className="inline-flex items-center gap-2 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white px-6 py-3 text-sm font-light tracking-wide shadow-lg shadow-emerald-900/20 transition-all hover:scale-[1.02]"
            >
              View All Treatments
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>
      </section>

      {/* 10. BOOKING */}
      <section className="bg-gradient-to-br from-stone-50 via-emerald-50/30 to-stone-50 border-t border-stone-200/60 py-10 sm:py-16 lg:py-20 xl:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-5 gap-6 sm:gap-8 lg:gap-12">
          <div className="lg:col-span-2">
            <p className="text-emerald-600 text-[9px] sm:text-xs tracking-[0.2em] uppercase font-light mb-2 lg:mb-3">
              Book at {location}
            </p>
            <h2 className="font-serif text-[1.5rem] xs:text-2xl sm:text-3xl lg:text-4xl text-stone-900">
              Reserve your slot
            </h2>
            <p className="mt-3 lg:mt-4 text-stone-500 text-sm sm:text-base font-light leading-relaxed max-w-md">
              Fill in your details and we'll open WhatsApp with your booking request ready to send. We confirm slots within the hour.
            </p>
            <div className="mt-6 lg:mt-8 space-y-3 text-sm text-stone-600">
              <p className="flex items-center gap-2"><Clock size={15} className="text-emerald-600" /> Open daily, 10 AM – 10 PM</p>
              <p className="flex items-center gap-2"><MapPin size={15} className="text-emerald-600" /> {location}, Delhi NCR</p>
              <a href={"tel:+" + WHATSAPP_NUMBER} className="flex items-center gap-2 hover:text-emerald-700 transition-colors">
                <Phone size={15} className="text-emerald-600" /> +91 87969 10363
              </a>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="rounded-2xl sm:rounded-3xl border border-emerald-100 bg-white p-4 sm:p-6 lg:p-8 shadow-lg shadow-emerald-900/5">
              <BookingForm location={location} services={services} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}