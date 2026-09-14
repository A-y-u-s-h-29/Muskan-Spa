import { useEffect, useState } from "react";
import {
  Phone,
  ChevronRight,
  ChevronDown,
  Sparkles,
  Flower2,
  Droplets,
  Star,
  MapPin,
  MessageCircle,
  Heart,
  ShieldCheck,
  Clock,
  Award,
  Users,
  Leaf,
  CheckCircle2,
  X,
  Check,
} from "lucide-react";
import HeroSlider from "../components/Hero";
import TeamSection from "../components/Team";
import Testimonials from "../components/Testimonials";
import GalleryPreview from "../components/Gallery";
import ServiceGrid from "../components/ServiceGrid";
import { SERVICES } from "../data/services";
import { LOCATIONS, WHATSAPP_NUMBER } from "../data/locations";
import { HOTELS } from "../data/hotels";

/* ── Why Choose Us data ───────────────────────────────────── */
const WHY_US = [
  { icon: Award, title: "Certified Therapists", desc: "Every therapist is trained in classical Russian Banya and modern massage techniques." },
  { icon: ShieldCheck, title: "Hygiene First", desc: "Fresh linen, sanitised rooms, and single-use oils for every single guest." },
  { icon: Clock, title: "Open 10 AM – 10 PM", desc: "Early flights, late nights — we work around your schedule, every day." },
  { icon: Heart, title: "Genuine Care", desc: "No rushed sessions. Your therapist listens and adapts to your body's needs." },
  { icon: Users, title: "Russian & Indian Experts", desc: "Choose from authentic Russian technique or traditional Indian wellness." },
  { icon: Leaf, title: "Pure, Warm Oils", desc: "No synthetic fragrance. Only natural, skin-safe oils warmed to perfection." },
];

const MYTHS = [
  { myth: "Massage is only for relaxation.", fact: "Massage is therapeutic. It helps with chronic pain, poor circulation, muscle recovery, stress, sleep quality, and even anxiety. Many of our guests visit for medical-grade relief, not just pampering." },
  { myth: "It has to hurt to work.", fact: "A good massage should never leave you in pain. Some deep-tissue techniques create brief pressure, but your therapist always adjusts to your comfort level. Discomfort is never the goal." },
  { myth: "Massage is only for women.", fact: "Roughly 40% of our guests are men — from corporate professionals and athletes to travellers recovering from long flights. Our therapists are trained for all body types and needs." },
  { myth: "You need to be flexible or fit to get a massage.", fact: "Not at all. We work with every body, every age, every fitness level. Tell your therapist about any injuries or conditions and we adapt the session accordingly." },
  { myth: "Once a year is enough.", fact: "For real benefits — better sleep, less tension, improved circulation — most guests come every 3–4 weeks. Regular sessions compound their effects over time." },
  { myth: "Any spa can do a Russian Banya massage.", fact: "True Banya technique requires certified Russian therapists and proper facilities. Our team is professionally trained, and our rooms are designed specifically for it." },
];

const SIGNS = [
  "Persistent neck or shoulder tension",
  "Frequent headaches or migraines",
  "Trouble falling or staying asleep",
  "Stiff lower back after long sitting",
  "Chronic fatigue even after rest",
  "Frequent muscle knots or tightness",
  "Reduced range of motion",
  "High stress or anxiety most days",
];

/* ── Traveler's Wellness Guide data ───────────────────────── */
const TRAVELER_GUIDES = [
  {
    eyebrow: "For Business & Leisure Travellers",
    title: "Wellness Guide for Frequent Travelers",
    intro: [
      "Airports are efficient at moving people but hard on the body — security queues, cramped seating, recycled cabin air, and irregular sleep all add up. Frequent flyers passing through IGI Airport and staying near Aerocity tend to accumulate the same set of issues trip after trip: muscle tightness from cramped seating, disrupted sleep across time zones, mild dehydration from cabin air, and a general fatigue that doesn't fully lift with rest alone.",
      "A Russian Banya session is particularly effective for this pattern because it does two things at once — the heat and steam rehydrate the skin and open circulation, while the structured heat-cool cycle helps reset a disrupted internal clock faster than sleep by itself. Pairing that with a 60-minute massage addresses the muscular tightness directly. Guests who travel monthly often build this into their routine as a standing appointment rather than an occasional treat, precisely because the recovery compounds — each session undoes a little more of the accumulated strain from repeated travel.",
    ],
  },
  {
    eyebrow: "First-Time Guest Guide",
    title: "Spa Etiquette: What to Expect on Your First Visit",
    list: [
      { label: "What to wear", text: "comfortable clothing to arrive in; disposable undergarments and towels are provided for the treatment itself." },
      { label: "Consultation", text: "before any session, a therapist briefly asks about problem areas, pain levels, and pressure preference so the session is tailored to you, not generic." },
      { label: "Pressure", text: "always tell your therapist mid-session if pressure needs adjusting; it is completely normal and expected, not impolite." },
      { label: "Privacy", text: "every room is private and closed; only your assigned therapist is present, and draping is used throughout to maintain modesty." },
      { label: "Cleanliness", text: "linens, robes, and disposable items are single-use per guest; rooms are sanitised between every session." },
      { label: "Timing", text: "arriving 10 minutes early lets you settle in without rushing straight into the treatment." },
      { label: "Tipping", text: "appreciated but never required; entirely at your discretion." },
      { label: "Hydration", text: "drink water before and after, especially after a Banya session where you have sweated significantly." },
      { label: "After your massage", text: "take a few minutes before standing up, and avoid rushing straight into strenuous activity for the rest of the day." },
    ],
  },
  {
    eyebrow: "Who's Actually Treating You",
    title: "Why Certified Therapists Matter",
    intro: [
      "The difference between a good massage and a forgettable one usually comes down to training, not the room or the oil. A certified therapist understands muscle anatomy well enough to know why a certain area is tight, not just where it feels tense to the touch — which means pressure is applied correctly instead of guessed at. This matters for safety too: knowing which areas to avoid pressure on, how to work around old injuries, and how to read when a client's body is not responding well to a technique.",
      "Experience adds a communication skill that training alone doesn't build — a seasoned therapist checks in without being asked, adjusts pressure before you have to request it, and reads body language accurately. All our therapists hold professional certification, and our male and female therapists are available around the clock so guests can choose whoever they feel most comfortable with.",
    ],
  },
  {
    eyebrow: "Our Cleanliness Standards",
    title: "Hygiene Standards You Should Expect",
    list: [
      { label: "Room cleaning", text: "every treatment room is fully sanitised between clients, not just tidied." },
      { label: "Fresh linens", text: "towels, sheets, and robes are changed after each and every session, no exceptions." },
      { label: "Disposable items", text: "undergarments and certain single-use items are provided fresh for every guest." },
      { label: "Steam sanitation", text: "the Banya room is cleaned and reset between steam sessions to maintain safe humidity and hygiene." },
      { label: "Oil quality", text: "premium, skin-safe oils are used, stored properly, and never reused across guests." },
      { label: "Laundry", text: "all linens are professionally laundered on-site rotation, never air-dried and reused." },
      { label: "Air quality", text: "treatment rooms are ventilated and kept fresh between sessions." },
      { label: "Equipment", text: "hot stones, tools, and surfaces are sanitised after every single use." },
    ],
    outro: "These standards are checked against a documented internal schedule rather than left to habit — the checklist is the same whether the room is turned over at midday or at 3am.",
  },
  {
    eyebrow: "For Two",
    title: "The Couples Spa Experience",
    intro: [
      "A couples session works best when it's actually shared — one private room, two therapists working in sync, and enough time built in that neither person feels rushed. It suits far more occasions than people initially assume: anniversaries and birthdays are the obvious ones, but it also works well as a low-key first date alternative, a wind-down before or after a wedding, or simply a weekend reset for two people who rarely get quiet time together.",
      "Privacy is the part guests care about most — the room is closed to anyone but your assigned therapists, draping is used throughout, and the pace of the session is set to feel relaxed rather than clinical. See the full Couples Package pricing for what's included.",
    ],
  },
  {
    eyebrow: "A Realistic Weekly Rhythm",
    title: "A Simple Weekly Self-Care Routine",
    intro: [
      "You don't need a drastic lifestyle change to feel noticeably better — a few consistent habits, repeated weekly, compound faster than most people expect.",
    ],
    list: [
      { label: "1 massage session", text: "weekly if recovering from strain, every 2–3 weeks for general maintenance." },
      { label: "Daily hydration", text: "especially important on days you've had a Banya session or a long flight." },
      { label: "A daily walk", text: "even 20 minutes counters the effects of long sitting at a desk." },
      { label: "Consistent sleep timing", text: "matters more for recovery than total hours alone." },
      { label: "5 minutes of stretching", text: "focused on the neck, shoulders, and hips undoes a surprising amount of daily tension." },
      { label: "One deliberate stress-management habit", text: "whichever works for you — a walk, a bath, ten minutes of quiet. Consistency matters more than intensity." },
    ],
  },
];

/* ── FAQ data ─────────────────────────────────────────────── */
const FAQS = [
  { q: "What is a Russian Banya massage?", a: "A Russian Banya massage combines steam, gentle heat, and rhythmic massage strokes to deeply relax muscles and improve circulation. It's a centuries-old Russian wellness ritual, now available at all our branches." },
  { q: "Do I need to book in advance?", a: "Walk-ins are welcome, but we recommend booking at least 2–3 hours ahead, especially on weekends and evenings. You can book instantly via WhatsApp or phone." },
  { q: "How long does a session take?", a: "Sessions range from 30 minutes (express) to 90 minutes (full ritual). Most guests choose the 60-minute signature massage." },
  { q: "Are your therapists certified?", a: "Yes. All our Russian and Indian therapists are professionally certified with years of hands-on experience in Banya, deep tissue, aromatherapy, and Swedish techniques." },
  { q: "Which locations do you serve?", a: "We operate across 25+ locations in Delhi NCR including Aerocity, Mahipalpur, CP, Gurgaon, Noida, Saket, and more. We also serve guests at 6 five-star hotel outlets." },
  { q: "What facilities are available?", a: "Depending on the branch, we offer shower, hammam, jacuzzi, steam bath, and sauna. Call your nearest branch to confirm available facilities." },
  { q: "Is parking available?", a: "Yes, all our hotel outlets and standalone branches offer parking. Valet is available at most 5-star hotel locations." },
  { q: "Do you offer couples massage?", a: "Absolutely. We have dedicated couple rooms at most branches. Mention it while booking so we can reserve the right room for you." },
  { q: "What payment methods do you accept?", a: "Cash, UPI, all major credit/debit cards, and digital wallets. Hotel guests can also charge treatments to their room at partner hotels." },
  { q: "Can I choose my therapist?", a: "Yes, you can request a specific therapist by name when booking. Subject to availability at your chosen time slot." },
];

/* ── FAQ Item component ───────────────────────────────────── */
function FaqItem({ q, a, isOpen, onToggle }) {
  return (
    <div className="border-b border-stone-200 last:border-b-0">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-start justify-between gap-3 sm:gap-4 py-4 sm:py-5 text-left group"
      >
        <span className="font-serif text-sm sm:text-base lg:text-lg text-stone-900 leading-snug group-hover:text-emerald-700 transition-colors">
          {q}
        </span>
        <ChevronDown
          size={18}
          className={`text-emerald-600 flex-shrink-0 mt-0.5 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-60 pb-4 sm:pb-5" : "max-h-0"
        }`}
      >
        <p className="text-sm text-stone-500 font-light leading-relaxed pr-6 sm:pr-8">
          {a}
        </p>
      </div>
    </div>
  );
}

export default function HomePage({ setPage, selectedLocation }) {
  const [isVisible, setIsVisible] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const handleLocationClick = (location) => {
    setPage("location");
    // setSelectedLocation(location);
  };

  return (
    <div className={`transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <HeroSlider />

      {/* Testimonials */}
      <section className="py-10 sm:py-16 lg:py-20 xl:py-28 bg-stone-50/50 border-t border-stone-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6 sm:mb-8 lg:mb-10 xl:mb-14">
            <p className="text-emerald-600 text-[10px] sm:text-xs lg:text-sm tracking-[0.18em] sm:tracking-[0.22em] lg:tracking-[0.25em] uppercase font-light mb-1.5 sm:mb-2 lg:mb-3">What Our Guests Say</p>
            <h2 className="font-serif text-[1.5rem] xs:text-2xl sm:text-3xl lg:text-4xl text-stone-900">Experiences worth sharing</h2>
            <div className="mt-2 sm:mt-3 lg:mt-4 flex justify-center">
              <div className="w-8 sm:w-10 lg:w-12 h-px bg-emerald-200" />
            </div>
          </div>

          <Testimonials />
        </div>
      </section>

      <TeamSection selectedLocation={selectedLocation} />

      {/* Features */}
      <section className="py-10 sm:py-16 lg:py-20 border-y border-stone-200/60 bg-stone-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 text-center">
          <div className="group flex flex-col items-center text-center">
            <div className="w-12 h-12 sm:w-13 sm:h-13 lg:w-14 lg:h-14 rounded-full bg-emerald-100/60 flex items-center justify-center mb-2 sm:mb-3 lg:mb-4 group-hover:bg-emerald-100 transition-colors">
              <Sparkles className="text-emerald-600 sm:size-[22px] lg:size-[26px]" size={20} />
            </div>
            <p className="font-serif text-base sm:text-lg lg:text-xl text-stone-800">Certified therapists</p>
            <p className="text-xs sm:text-sm text-stone-400 mt-0.5 sm:mt-1 lg:mt-1.5 font-light">Trained in classical and modern technique</p>
          </div>
          <div className="group flex flex-col items-center text-center">
            <div className="w-12 h-12 sm:w-13 sm:h-13 lg:w-14 lg:h-14 rounded-full bg-emerald-100/60 flex items-center justify-center mb-2 sm:mb-3 lg:mb-4 group-hover:bg-emerald-100 transition-colors">
              <Droplets className="text-emerald-600 sm:size-[22px] lg:size-[26px]" size={20} />
            </div>
            <p className="font-serif text-base sm:text-lg lg:text-xl text-stone-800">Pure, warmed oils</p>
            <p className="text-xs sm:text-sm text-stone-400 mt-0.5 sm:mt-1 lg:mt-1.5 font-light">No synthetic fragrance, ever</p>
          </div>
          <div className="group flex flex-col items-center text-center">
            <div className="w-12 h-12 sm:w-13 sm:h-13 lg:w-14 lg:h-14 rounded-full bg-emerald-100/60 flex items-center justify-center mb-2 sm:mb-3 lg:mb-4 group-hover:bg-emerald-100 transition-colors">
              <Flower2 className="text-emerald-600 sm:size-[22px] lg:size-[26px]" size={20} />
            </div>
            <p className="font-serif text-base sm:text-lg lg:text-xl text-stone-800">Private, calm rooms</p>
            <p className="text-xs sm:text-sm text-stone-400 mt-0.5 sm:mt-1 lg:mt-1.5 font-light">Every branch, the same standard</p>
          </div>
        </div>
      </section>

      {/* Signature Treatments */}
      <section className="py-10 sm:py-16 lg:py-20 xl:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 sm:mb-8 lg:mb-10 xl:mb-12 gap-3 sm:gap-0">
            <div>
              <p className="text-emerald-600 text-[10px] sm:text-xs lg:text-sm tracking-[0.18em] sm:tracking-[0.22em] lg:tracking-[0.25em] uppercase font-light mb-1.5 sm:mb-2 lg:mb-3">Signature Treatments</p>
              <h2 className="font-serif text-[1.5rem] xs:text-2xl sm:text-3xl lg:text-4xl text-stone-900">A few favourites to start with</h2>
            </div>
            <button onClick={() => setPage("services")} className="hidden sm:flex items-center gap-2 text-sm text-stone-500 hover:text-emerald-700 transition-colors group">
              See all services <ChevronRight size={15} className="transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>

          <ServiceGrid services={SERVICES.slice(0, 3)} location={selectedLocation} layout="overlay" />

          {/* Mobile-only "see all" button */}
          <div className="sm:hidden mt-6 flex justify-center">
            <button
              onClick={() => setPage("services")}
              className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white px-5 py-2.5 text-sm text-stone-700 hover:border-emerald-300 hover:text-emerald-700 transition-colors"
            >
              See all services <ChevronRight size={15} />
            </button>
          </div>
        </div>
      </section>

      {/* Gallery preview */}
      <section className="pb-10 sm:pb-16 lg:pb-20 xl:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-4 sm:mb-6 lg:mb-8 xl:mb-12 gap-3 sm:gap-0">
            <div>
              <p className="text-emerald-600 text-[10px] sm:text-xs lg:text-sm tracking-[0.18em] sm:tracking-[0.22em] lg:tracking-[0.25em] uppercase font-light mb-1.5 sm:mb-2 lg:mb-3">Inside Mahika</p>
              <h2 className="font-serif text-[1.5rem] xs:text-2xl sm:text-3xl lg:text-4xl text-stone-900">A look around our rooms</h2>
            </div>
            <button onClick={() => setPage("gallery")} className="hidden sm:flex items-center gap-2 text-sm text-stone-500 hover:text-emerald-700 transition-colors group">
              Full gallery <ChevronRight size={15} className="transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
          <GalleryPreview />

          <div className="sm:hidden mt-6 flex justify-center">
            <button
              onClick={() => setPage("gallery")}
              className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white px-5 py-2.5 text-sm text-stone-700 hover:border-emerald-300 hover:text-emerald-700 transition-colors"
            >
              Full gallery <ChevronRight size={15} />
            </button>
          </div>
        </div>
      </section>

      {/* ── Signs Your Body Needs a Massage ─────────────────── */}
      <section className="py-10 sm:py-16 lg:py-20 xl:py-24 bg-stone-50/60 border-t border-stone-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-14 items-center">

          <div className="order-2 lg:order-1">
            <p className="text-emerald-600 text-[10px] sm:text-xs tracking-[0.18em] sm:tracking-[0.2em] uppercase font-light mb-2">
              Listen to Your Body
            </p>
            <h2 className="font-serif text-[1.5rem] xs:text-2xl sm:text-3xl lg:text-4xl text-stone-900 leading-tight">
              Signs your body is <span className="italic text-emerald-700">asking</span> for a massage
            </h2>
            <div className="mt-3 sm:mt-4 flex">
              <div className="w-10 sm:w-12 h-px bg-emerald-300" />
            </div>
            <p className="mt-4 sm:mt-5 text-stone-500 text-sm sm:text-base font-light leading-relaxed">
              Your body rarely shouts — it whispers first. If you notice three or
              more of these signs regularly, it's time to book a session.
            </p>

            <ul className="mt-5 sm:mt-6 grid grid-cols-1 xs:grid-cols-2 gap-x-6 gap-y-2.5 sm:gap-y-3">
              {SIGNS.map((sign) => (
                <li key={sign} className="flex items-start gap-2">
                  <CheckCircle2
                    size={15}
                    className="text-emerald-600 flex-shrink-0 mt-0.5"
                  />
                  <span className="text-sm text-stone-600 font-light leading-snug">
                    {sign}
                  </span>
                </li>
              ))}
            </ul>

            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                "Hi Mahika Russian Spa, I'd like to book a session."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 sm:mt-8 inline-flex items-center gap-2 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white text-sm px-5 sm:px-6 py-3 transition-colors group"
            >
              Book a Session
              <ChevronRight size={15} className="transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>

          <div className="relative order-1 lg:order-2">
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden aspect-[4/3] shadow-xl">
              <img
                src="t.jpg"
                alt="Signs your body needs a massage"
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover"
                onError={(e) => { e.currentTarget.style.display = "none"; }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/30 via-transparent to-transparent" />
            </div>
            <div className="hidden sm:block absolute -bottom-4 -left-4 w-24 h-24 sm:w-32 sm:h-32 rounded-2xl border-2 border-emerald-200 -z-10" />
            <div className="hidden sm:block absolute -top-4 -right-4 w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-emerald-100/60 -z-10" />
          </div>
        </div>
      </section>

      {/* ── Why Clients Choose Us ─────────────────────────────── */}
      <section className="py-10 sm:py-16 lg:py-20 xl:py-24 bg-stone-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12 lg:mb-14">
            <p className="text-emerald-400 text-[10px] sm:text-xs tracking-[0.18em] sm:tracking-[0.2em] uppercase font-light mb-2 lg:mb-3">
              Why Clients Choose Us
            </p>
            <h2 className="font-serif text-[1.5rem] xs:text-2xl sm:text-3xl lg:text-4xl text-white">
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

      {/* ── Massage Myths vs. Facts ──────────────────────────── */}
      <section className="py-10 sm:py-16 lg:py-20 xl:py-24 bg-white border-t border-stone-200/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10 lg:mb-12">
            <p className="text-emerald-600 text-[10px] sm:text-xs tracking-[0.18em] sm:tracking-[0.2em] uppercase font-light mb-2">
              Myths vs. Facts
            </p>
            <h2 className="font-serif text-[1.5rem] xs:text-2xl sm:text-3xl lg:text-4xl text-stone-900">
              What people <span className="italic text-emerald-700">get wrong</span> about massage
            </h2>
            <div className="mt-3 sm:mt-4 flex justify-center">
              <div className="w-10 sm:w-12 h-px bg-emerald-200" />
            </div>
          </div>

          <div className="space-y-3 sm:space-y-4">
            {MYTHS.map((item, i) => (
              <div
                key={i}
                className="rounded-2xl border border-stone-200 bg-stone-50/40 overflow-hidden"
              >
                <div className="flex items-start gap-2.5 sm:gap-3 p-4 sm:p-5 bg-red-50/40 border-b border-stone-200/60">
                  <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-red-100 text-red-600 flex-shrink-0 mt-0.5">
                    <X size={14} />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[10px] uppercase tracking-[0.15em] text-red-500 font-medium mb-0.5">
                      Myth
                    </p>
                    <p className="font-serif text-sm sm:text-base text-stone-800 leading-snug">
                      {item.myth}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 sm:gap-3 p-4 sm:p-5">
                  <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 flex-shrink-0 mt-0.5">
                    <Check size={14} />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[10px] uppercase tracking-[0.15em] text-emerald-600 font-medium mb-0.5">
                      Fact
                    </p>
                    <p className="text-sm sm:text-[15px] text-stone-600 font-light leading-relaxed">
                      {item.fact}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── All Locations ─────────────────────────────────────── */}
      <section className="py-10 sm:py-16 lg:py-20 border-t border-stone-200/60 bg-stone-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6 sm:mb-8 lg:mb-10">
            <p className="text-emerald-600 text-[10px] sm:text-xs lg:text-sm tracking-[0.18em] sm:tracking-[0.22em] lg:tracking-[0.25em] uppercase font-light mb-1.5 sm:mb-2 lg:mb-3">
              Find Us Near You
            </p>
            <h2 className="font-serif text-[1.5rem] xs:text-2xl sm:text-3xl lg:text-4xl text-stone-900">
              Russian Spa Locations
            </h2>
            <div className="mt-2 sm:mt-3 lg:mt-4 flex justify-center">
              <div className="w-8 sm:w-10 lg:w-12 h-px bg-emerald-200" />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2.5 sm:gap-3 lg:gap-4">
            {LOCATIONS.map((loc) => (
              <button
                key={loc}
                onClick={() => handleLocationClick(loc)}
                className="group flex items-center gap-2 rounded-full border border-stone-200 bg-white px-3 sm:px-4 py-2.5 text-[13px] sm:text-sm text-stone-700 shadow-sm transition-all duration-200 hover:border-emerald-400 hover:bg-emerald-50 hover:text-emerald-800 hover:shadow-md min-w-0"
              >
                <MapPin size={13} className="text-emerald-500 flex-shrink-0 transition-colors group-hover:text-emerald-700" />
                <span className="truncate">{loc}</span>
                <ChevronRight size={13} className="ml-auto text-stone-300 flex-shrink-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-emerald-600" />
              </button>
            ))}
          </div>

          <p className="mt-6 sm:mt-8 text-center text-xs text-stone-400 font-light px-4">
            Can't find your area?{" "}
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-700 underline underline-offset-2 hover:text-emerald-800"
            >
              Message us on WhatsApp
            </a>{" "}
            and we'll point you to the nearest branch.
          </p>
        </div>
      </section>

      {/* ── 5-Star Hotel Partnerships ─────────────────────────── */}
      <section className="bg-stone-50/80 border-t border-stone-200/60 py-10 sm:py-16 lg:py-20 xl:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6 sm:mb-8 lg:mb-10 max-w-2xl">
            <p className="text-emerald-600 text-[10px] sm:text-xs tracking-[0.18em] sm:tracking-[0.2em] uppercase font-light mb-2 flex items-center gap-2">
              <Star size={12} /> 5-Star Hotel Partnerships
            </p>
            <h2 className="font-serif text-[1.5rem] xs:text-2xl sm:text-3xl lg:text-4xl text-stone-900">
              Our Hotel Outlets
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
            {HOTELS.map((hotel) => {
              const waLink = `https://wa.me/${hotel.whatsapp}?text=${encodeURIComponent(
                `Hi Mahika Russian Spa, I'd like to book a treatment at ${hotel.name}.`
              )}`;

              return (
                <div
                  key={hotel.name}
                  className="group rounded-2xl border border-stone-200 bg-white overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-row h-40 sm:h-44"
                >
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
            })}
          </div>
        </div>
      </section>

      {/* ── About Our Spa ─────────────────────────────────────── */}
      <section className="py-10 sm:py-16 lg:py-20 xl:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-14 items-center">
          <div className="relative order-1 lg:order-1">
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden aspect-[4/3] shadow-xl">
              <img
                src="masseuse-makes-massage-to-a-charming-brunette-photo.jpg"
                alt="Relaxing massage at Mahika Russian Spa"
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover"
                onError={(e) => { e.currentTarget.style.display = "none"; }}
              />
            </div>
            <div className="hidden sm:block absolute -bottom-4 -right-4 w-24 h-24 sm:w-32 sm:h-32 rounded-2xl border-2 border-emerald-200 -z-10" />
            <div className="hidden sm:block absolute -top-4 -left-4 w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-emerald-100/60 -z-10" />
          </div>

          <div className="order-2 lg:order-2">
            <p className="text-emerald-600 text-[10px] sm:text-xs lg:text-sm tracking-[0.18em] sm:tracking-[0.22em] lg:tracking-[0.25em] uppercase font-light mb-2 sm:mb-3">
              About Our Spa
            </p>
            <h2 className="font-serif text-[1.5rem] xs:text-2xl sm:text-3xl lg:text-4xl text-stone-900 leading-tight">
              A quiet escape in the heart of <span className="italic text-emerald-700">Delhi NCR</span>
            </h2>
            <div className="mt-3 sm:mt-4 flex">
              <div className="w-10 sm:w-12 h-px bg-emerald-300" />
            </div>
            <p className="mt-4 sm:mt-5 text-stone-500 text-sm sm:text-base font-light leading-relaxed">
              Mahika Russian Spa blends centuries-old Russian Banya rituals with the calm of Indian wellness traditions. Every session is led by certified therapists using pure, warmed oils — in private rooms designed for deep rest.
            </p>
            <p className="mt-3 sm:mt-4 text-stone-500 text-sm sm:text-base font-light leading-relaxed">
              Whether you're recovering from a long flight at Aerocity or unwinding after a busy week in South Delhi, our doors are open daily from 10 AM to 10 PM.
            </p>

            <div className="mt-6 sm:mt-8 grid grid-cols-2 gap-4 sm:gap-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-100/60 flex items-center justify-center flex-shrink-0">
                  <Sparkles size={16} className="text-emerald-600" />
                </div>
                <div>
                  <p className="font-serif text-lg sm:text-xl text-stone-900 leading-none">12+</p>
                  <p className="text-[10px] sm:text-xs uppercase tracking-wider text-stone-400 mt-1">Years</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-100/60 flex items-center justify-center flex-shrink-0">
                  <Star size={16} className="text-emerald-600" />
                </div>
                <div>
                  <p className="font-serif text-lg sm:text-xl text-stone-900 leading-none">4.9★</p>
                  <p className="text-[10px] sm:text-xs uppercase tracking-wider text-stone-400 mt-1">Rating</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setPage("services")}
              className="mt-6 sm:mt-8 inline-flex items-center gap-2 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white text-sm px-5 sm:px-6 py-3 transition-colors group"
            >
              Explore Treatments
              <ChevronRight size={15} className="transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>
      </section>

      {/* ── Traveler's Wellness Guide ─────────────────────────── */}
      <section className="border-t border-stone-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-16 lg:pt-20">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12 lg:mb-14">
            <p className="text-emerald-600 text-[10px] sm:text-xs tracking-[0.18em] sm:tracking-[0.2em] uppercase font-light mb-2">
              Guides & Etiquette
            </p>
            <h2 className="font-serif text-[1.5rem] xs:text-2xl sm:text-3xl lg:text-4xl text-stone-900">
              Everything you need to know, in plain words
            </h2>
            <div className="mt-3 sm:mt-4 flex justify-center">
              <div className="w-10 sm:w-12 h-px bg-emerald-200" />
            </div>
            <p className="mt-3 text-stone-500 text-sm sm:text-base font-light">
              Short, practical answers to the questions guests ask before their first visit — and the ones regulars keep coming back to.
            </p>
          </div>
        </div>

        {/* Guide cards — colored alternating backgrounds */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 sm:pb-16 lg:pb-20">
          <div className="space-y-5 sm:space-y-6 lg:space-y-7">
            {TRAVELER_GUIDES.map((g, idx) => {
              // 4-color soft cycle: emerald, stone, amber, sky
              const palette = [
                {
                  bg: "bg-emerald-50/60",
                  border: "border-emerald-100",
                  accent: "bg-emerald-400",
                  dot: "text-emerald-500",
                  eyebrow: "text-emerald-700",
                  label: "text-emerald-900",
                },
                {
                  bg: "bg-stone-50",
                  border: "border-stone-200",
                  accent: "bg-stone-400",
                  dot: "text-stone-400",
                  eyebrow: "text-stone-600",
                  label: "text-stone-800",
                },
                {
                  bg: "bg-amber-50/70",
                  border: "border-amber-100",
                  accent: "bg-amber-400",
                  dot: "text-amber-500",
                  eyebrow: "text-amber-700",
                  label: "text-amber-900",
                },
                {
                  bg: "bg-sky-50/60",
                  border: "border-sky-100",
                  accent: "bg-sky-400",
                  dot: "text-sky-500",
                  eyebrow: "text-sky-700",
                  label: "text-sky-900",
                },
              ];
              const c = palette[idx % palette.length];

              return (
                <div
                  key={g.title}
                  className={`relative rounded-2xl border ${c.border} ${c.bg} p-5 sm:p-7 lg:p-8 overflow-hidden transition-all duration-300 hover:shadow-md`}
                >
                  {/* Left accent bar */}
                  <span className={`absolute top-0 left-0 h-full w-[3px] ${c.accent}`} />

                  {/* Eyebrow */}
                  <p className={`text-[10px] sm:text-xs tracking-[0.18em] sm:tracking-[0.2em] uppercase font-light mb-2 flex items-center gap-2 ${c.eyebrow}`}>
                    <span className={`text-base leading-none ${c.dot}`}>●</span>
                    {g.eyebrow}
                  </p>

                  {/* Title */}
                  <h3 className="font-serif text-lg xs:text-xl sm:text-2xl lg:text-3xl text-stone-900 leading-tight">
                    {g.title}
                  </h3>
                  <div className="mt-3 sm:mt-4 flex">
                    <div className={`w-10 sm:w-12 h-px ${c.accent}`} />
                  </div>

                  {/* Intro paragraphs */}
                  {g.intro && (
                    <div className="mt-4 sm:mt-5 space-y-3 sm:space-y-4">
                      {g.intro.map((p, i) => (
                        <p
                          key={i}
                          className="text-stone-700 text-sm sm:text-[15px] font-light leading-relaxed"
                        >
                          {p}
                        </p>
                      ))}
                    </div>
                  )}

                  {/* Bulleted list */}
                  {g.list && (
                    <ul className="mt-4 sm:mt-5 space-y-2 sm:space-y-2.5">
                      {g.list.map((item, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <CheckCircle2
                            size={15}
                            className={`flex-shrink-0 mt-0.5 ${c.dot}`}
                          />
                          <span className="text-sm sm:text-[15px] text-stone-700 font-light leading-relaxed">
                            <span className={`font-normal ${c.label}`}>
                              {item.label}
                            </span>
                            {" — "}
                            {item.text}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Outro */}
                  {g.outro && (
                    <p className="mt-4 sm:mt-5 text-stone-600 text-sm sm:text-[15px] font-light leading-relaxed italic">
                      {g.outro}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────── */}
      <section className="py-10 sm:py-16 lg:py-20 xl:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6 sm:mb-8 lg:mb-10">
            <p className="text-emerald-600 text-[10px] sm:text-xs tracking-[0.18em] sm:tracking-[0.2em] uppercase font-light mb-2">
              Questions & Answers
            </p>
            <h2 className="font-serif text-[1.5rem] xs:text-2xl sm:text-3xl lg:text-4xl text-stone-900">
              Frequently Asked Questions
            </h2>
            <div className="mt-3 sm:mt-4 flex justify-center">
              <div className="w-10 sm:w-12 h-px bg-emerald-200" />
            </div>
          </div>

          <div className="rounded-2xl sm:rounded-3xl border border-stone-200 bg-stone-50/40 px-4 sm:px-6 lg:px-8">
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

          <p className="mt-6 sm:mt-8 text-center text-xs text-stone-400 font-light px-4">
            Still have a question?{" "}
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-700 underline underline-offset-2 hover:text-emerald-800"
            >
              Chat with us on WhatsApp
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}