import { useState } from "react";
import {
  Phone,
  Clock,
  Sparkles,
  MessageCircle,
  ChevronDown,
  Plus,
  Minus,
} from "lucide-react";
import ServiceGrid from "../components/ServiceGrid";
import { WHATSAPP_NUMBER } from "../data/locations";

/* ── About the spa stats ─────────────────────────────────── */
const ABOUT_STATS = [
  { value: "10+", label: "Years of Excellence" },
  { value: "350+", label: "Verified Reviews" },
  { value: "24/7", label: "Always Open" },
  { value: "~10 min", label: "From IGI Airport" },
];

/* ── Full Treatment Guide data ───────────────────────────── */
const TREATMENT_GUIDE = [
  {
    name: "Balinese Body Massage",
    meta: "60 / 90 min · ₹1,999",
    what: "Long, flowing strokes with warm aromatic oils to release deep tension and restore circulation.",
    suits: "Guests recovering from long-haul flights, chronic stress, or anyone who wants a full reset rather than a single treatment.",
    before: "Hydrate in the hour before. Skip heavy meals. Tell your therapist if you have low blood pressure or heart conditions.",
    after: "Drink water, avoid alcohol for a few hours, and expect to sleep deeply. Some guests feel light-headed on standing — take your time.",
  },
  {
    name: "Deep Tissue Therapy",
    meta: "60 min · ₹2,299",
    what: "Firm, targeted pressure that works into stiff shoulders, backs and legs after a long week.",
    suits: "First-time guests, anyone who wants to unwind, or as a regular maintenance session.",
    before: "Arrive 10 minutes early to settle in. Mention any injuries or sensitive areas during consultation.",
    after: "Drink water. Light stretching the next morning extends the benefit.",
  },
  {
    name: "Aroma Hot Stone Ritual",
    meta: "75 min · ₹2,799",
    what: "Heated basalt stones paired with essential oils to melt away muscle knots and quiet the mind.",
    suits: "Desk workers, athletes, anyone with persistent tension or old injuries that never quite released.",
    before: "Tell your therapist your pain threshold. Deep tissue should feel like productive pressure, never sharp pain.",
    after: "Soreness for 24–48 hours is normal. Hydrate, stretch gently, avoid heavy lifting the same day.",
  },
  {
    name: "Signature Radiance Facial",
    meta: "45 min · ₹1,599",
    what: "A gentle cleanse, exfoliation and hydration routine that leaves skin visibly brighter.",
    suits: "Guests with post-flight stiffness, limited flexibility, or anyone who prefers a firmer, more active session.",
    before: "Wear loose, comfortable clothing. Mention any joint issues or recent injuries.",
    after: "Light movement is fine. You may feel looser for a day or two — good time to stretch.",
  },
  {
    name: "Head, Neck & Shoulder Release",
    meta: "30 min · ₹999",
    what: "A fast, focused session for anyone carrying stress in the upper back and scalp.",
    suits: "Anyone with deep-set stiffness, cold-weather aches, or who finds hands-only pressure uncomfortable.",
    before: "Not ideal if you have sensitive skin, recent burns, or circulatory conditions — flag these at consultation.",
    after: "Hydrate well. Warmth continues working for hours afterward — keep the evening relaxed.",
  },
  {
    name: "Foot Reflexology",
    meta: "40 min · ₹1,199",
    what: "Pressure-point work on the feet believed to ease fatigue through the whole body.",
    suits: "Guests dealing with stress, poor sleep, or low mood. Also good for anyone who wants a gentler session.",
    before: "Tell your therapist about allergies or scent sensitivities. Skip strong perfumes.",
    after: "Let the oils absorb for an hour before showering. Hydrate and rest if possible.",
  },
];

/* ── Compare treatments data (each gets its own color) ───── */
/* ── Compare treatments data (each gets its own color) ───── */
const COMPARISONS = [
  {
    title: "Balinese vs Deep Tissue",
    tone: "emerald",
    cols: ["Balinese", "Deep Tissue"],
    rows: [
      ["Pressure", "Light to medium", "Firm to intense"],
      ["Clothing", "Undressed, draped with towel", "Undressed, draped with towel"],
      ["Oil Used", "Yes, warm aromatic oil throughout", "Yes, for glide during deep work"],
      ["Best For", "Relaxation, first-time guests", "Chronic tension, knots, desk posture"],
      ["Duration", "60 / 90 min", "60 min"],
    ],
  },
  {
    title: "Aroma Hot Stone vs Balinese",
    tone: "amber",
    cols: ["Aroma Hot Stone", "Balinese"],
    rows: [
      ["Pressure", "Medium, heat-assisted", "Light to medium, via strokes"],
      ["Clothing", "Undressed, draped with towel", "Undressed, draped with towel"],
      ["Oil Used", "Yes, essential oils for stone glide", "Yes, warm aromatic oil"],
      ["Best For", "Deep-set physical stiffness", "General relaxation"],
      ["Duration", "75 min", "60 / 90 min"],
    ],
  },
  {
    title: "Signature Facial vs Head, Neck & Shoulder",
    tone: "sky",
    cols: ["Signature Facial", "Head, Neck & Shoulder"],
    rows: [
      ["Pressure", "Gentle, skin-focused", "Light to medium, targeted"],
      ["Clothing", "Facial gown, hair wrapped", "Fully clothed, loose fit"],
      ["Oil Used", "Yes, cleansing and hydrating products", "No oil"],
      ["Best For", "Skin brightening, hydration", "Stress in upper back and scalp"],
      ["Duration", "45 min", "30 min"],
    ],
  },
  {
    title: "Foot Reflexology vs Head, Neck & Shoulder",
    tone: "rose",
    cols: ["Foot Reflexology", "Head, Neck & Shoulder"],
    rows: [
      ["Pressure", "Firm, pressure-point work", "Light to medium, targeted"],
      ["Clothing", "Fully clothed, feet exposed", "Fully clothed"],
      ["Oil Used", "Yes, light oil or lotion", "No oil"],
      ["Best For", "Fatigue, whole-body ease", "Upper back and scalp tension"],
      ["Duration", "40 min", "30 min"],
    ],
  },
  {
    title: "Russian Massage vs Swedish Massage",
    tone: "violet",
    cols: ["Russian Massage", "Swedish Massage"],
    rows: [
      ["Pressure", "Medium to firm, tailored", "Light to medium, gentle"],
      ["Clothing", "Undressed, draped with towel", "Undressed, draped with towel"],
      ["Oil Used", "Yes, warm oils for deep work", "Yes, light massage oil"],
      ["Best For", "Deep relaxation, rejuvenation", "First-timers, stress relief"],
      ["Duration", "60 min", "60 min"],
      ["Price", "₹3,500", "₹2,800"],
    ],
  },
  {
    title: "4 Hand Massage vs Body to Body",
    tone: "teal",
    cols: ["4 Hand Massage", "Body to Body"],
    rows: [
      ["Pressure", "Synchronised, immersive", "Full-body, balanced"],
      ["Therapists", "Two working in tandem", "One therapist"],
      ["Oil Used", "Yes, generous warm oil", "Yes, full-body oil"],
      ["Best For", "Deep immersion, special occasions", "Total release, balance"],
      ["Duration", "60 min", "60 min"],
      ["Price", "₹5,500", "₹4,000"],
    ],
  },
];

/* Tone map for comparison tables */
/* Tone map for comparison tables */
const TABLE_TONES = {
  emerald: {
    headerBg: "bg-emerald-50",
    headerText: "text-emerald-800",
    headerBorder: "border-emerald-200",
    colBg: "bg-emerald-50/40",
    stripeBg: "bg-emerald-50/40",
    dot: "bg-emerald-500",
    border: "border-emerald-200",
  },
  amber: {
    headerBg: "bg-amber-50",
    headerText: "text-amber-800",
    headerBorder: "border-amber-200",
    colBg: "bg-amber-50/40",
    stripeBg: "bg-amber-50/40",
    dot: "bg-amber-500",
    border: "border-amber-200",
  },
  sky: {
    headerBg: "bg-sky-50",
    headerText: "text-sky-800",
    headerBorder: "border-sky-200",
    colBg: "bg-sky-50/40",
    stripeBg: "bg-sky-50/40",
    dot: "bg-sky-500",
    border: "border-sky-200",
  },
  rose: {
    headerBg: "bg-rose-50",
    headerText: "text-rose-800",
    headerBorder: "border-rose-200",
    colBg: "bg-rose-50/40",
    stripeBg: "bg-rose-50/40",
    dot: "bg-rose-500",
    border: "border-rose-200",
  },
  violet: {
    headerBg: "bg-violet-50",
    headerText: "text-violet-800",
    headerBorder: "border-violet-200",
    colBg: "bg-violet-50/40",
    stripeBg: "bg-violet-50/40",
    dot: "bg-violet-500",
    border: "border-violet-200",
  },
  teal: {
    headerBg: "bg-teal-50",
    headerText: "text-teal-800",
    headerBorder: "border-teal-200",
    colBg: "bg-teal-50/40",
    stripeBg: "bg-teal-50/40",
    dot: "bg-teal-500",
    border: "border-teal-200",
  },
};

/* ── The Process steps ───────────────────────────────────── */
const PROCESS_STEPS = [
  {
    n: "01",
    title: "Call or Walk In",
    body: "Call +91 9318320667 or WhatsApp us. Tell us which treatment you want and when you're coming. Alternatively, walk in any time — no booking required. We confirm your room immediately.",
  },
  {
    n: "02",
    title: "Arrive & Check In",
    body: "We're at Office No. 118, Defence Enclave, Mahipalpur — around 10 minutes from any IGI Airport terminal, depending on traffic. Tell the front desk your name. We take it from there. Change in a private locker room.",
  },
  {
    n: "03",
    title: "Your Treatment",
    body: "Your therapist briefs you on what will happen, confirms your pressure preference, and begins. For Banya sessions, the heat cycles are explained before you enter. You can adjust anything mid-session.",
  },
  {
    n: "04",
    title: "Relax & Leave",
    body: "After your session, use the relaxation lounge — herbal tea, recline, no rush. Pay when ready. We can call a cab back to IGI or Aerocity if you need one. Cash, UPI, and cards accepted.",
  },
];

/* ── FAQ data ────────────────────────────────────────────── */
const FAQS = [
  {
    q: "Do I need to book in advance?",
    a: "No. Walk-ins are always welcome and we confirm your room on the spot. That said, if you want a specific therapist or a specific time slot on a weekend evening, a quick call or WhatsApp 1–2 hours ahead is a good idea.",
  },
  {
    q: "What's the difference between Russian Banya and a steam bath?",
    a: "A Banya alternates dry heat cycles with cool-downs and includes venik (leaf) strokes — the heat is gentler and the session is structured around recovery. A steam bath is continuous moist heat only, with no venik work, and is usually shorter.",
  },
  {
    q: "Which treatment should I pick for a long flight?",
    a: "For most guests landing at IGI, the Russian Banya (90 min) or a Thai Massage (75 min) works best. Banya resets circulation and sleep; Thai releases stiffness from cramped seating. If you only have an hour, a Swedish massage is a safe middle ground.",
  },
  {
    q: "Are your oils safe for sensitive skin?",
    a: "Yes. We use premium, skin-safe oils only — never synthetic fragrance, and never reused across guests. If you have known allergies or sensitivities, mention them at consultation and your therapist will select a neutral base oil.",
  },
  {
    q: "Can I choose a male or female therapist?",
    a: "Yes. We have both male and female therapists available around the clock. Request whoever you feel most comfortable with when booking — subject to availability at your preferred slot.",
  },
  {
    q: "How early should I arrive?",
    a: "Around 10 minutes before your appointment lets you settle in, change, and complete the short consultation without rushing. Walk-in guests should expect a few minutes for room allocation during peak hours.",
  },
  {
    q: "Do you offer couples sessions?",
    a: "Yes. We have dedicated couple rooms at most branches with two therapists working in sync. Mention it while booking so we can reserve the right room.",
  },
  {
    q: "What payment methods do you accept?",
    a: "Cash, UPI, all major credit and debit cards, and digital wallets. Hotel guests at partner properties can also charge treatments to their room.",
  },
  {
    q: "Is parking available?",
    a: "Yes. Our Mahipalpur branch and hotel outlets have parking, and valet is available at most five-star locations. See our contact page for directions and access details.",
  },
  {
    q: "Can I extend my session if I'm enjoying it?",
    a: "Often yes, subject to the next booking. Just tell your therapist mid-session and they'll check the schedule. For 90-minute treatments this is usually not possible at short notice — book the longer option upfront if you're unsure.",
  },
];

/* ── Treatment guide accordion item ──────────────────────── */
function GuideItem({ item, isOpen, onToggle }) {
  return (
    <div
      className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
        isOpen ? "border-emerald-200 bg-emerald-50/40" : "border-stone-200 bg-white"
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-3 sm:gap-4 p-4 sm:p-5 lg:p-6 text-left group"
      >
        <div className="min-w-0 flex-1">
          <h3 className="font-serif text-base sm:text-lg lg:text-xl text-stone-900 group-hover:text-emerald-800 transition-colors">
            {item.name}
          </h3>
          <p className="text-[11px] sm:text-xs text-stone-400 font-light mt-0.5">
            {item.meta}
          </p>
        </div>
        <span
          className={`flex-shrink-0 flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full transition-all duration-300 ${
            isOpen
              ? "bg-emerald-700 text-white rotate-180"
              : "bg-stone-100 text-stone-600 group-hover:bg-emerald-100 group-hover:text-emerald-700"
          }`}
        >
          <ChevronDown size={16} />
        </span>
      </button>

      <div
        className={`overflow-hidden transition-all duration-500 ${
          isOpen ? "max-h-[900px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 sm:px-5 lg:px-6 pb-5 sm:pb-6 lg:pb-7 space-y-3.5 sm:space-y-4">
          <div>
            <p className="text-[10px] uppercase tracking-[0.18em] text-emerald-700 font-medium mb-1">
              What it is
            </p>
            <p className="text-sm text-stone-600 font-light leading-relaxed">{item.what}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.18em] text-emerald-700 font-medium mb-1">
              Who it suits
            </p>
            <p className="text-sm text-stone-600 font-light leading-relaxed">{item.suits}</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-3.5 sm:gap-4">
            <div>
              <p className="text-[10px] uppercase tracking-[0.18em] text-emerald-700 font-medium mb-1">
                Before
              </p>
              <p className="text-sm text-stone-600 font-light leading-relaxed">{item.before}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.18em] text-emerald-700 font-medium mb-1">
                After
              </p>
              <p className="text-sm text-stone-600 font-light leading-relaxed">{item.after}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Compare table (with color) ──────────────────────────── */
function CompareTable({ title, cols, rows, tone = "emerald" }) {
  const t = TABLE_TONES[tone] || TABLE_TONES.emerald;

  return (
    <div className={`rounded-2xl border ${t.border} bg-white overflow-hidden shadow-sm`}>
      {/* Header */}
      <div className={`px-4 sm:px-5 lg:px-6 py-3.5 sm:py-4 border-b ${t.headerBorder} ${t.headerBg}`}>
        <h3 className={`font-serif text-base sm:text-lg lg:text-xl ${t.headerText} flex items-center gap-2`}>
          <span className={`w-2 h-2 rounded-full ${t.dot} flex-shrink-0`} />
          {title}
        </h3>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm min-w-[440px]">
          <thead>
            <tr className={`border-b ${t.headerBorder} ${t.headerBg}`}>
              <th className="text-left text-[10px] uppercase tracking-[0.15em] text-stone-400 font-light px-3 sm:px-4 lg:px-5 py-3 w-[28%]"></th>
              <th className={`text-left text-[10px] uppercase tracking-[0.15em] font-medium px-3 sm:px-4 py-3 ${t.headerText}`}>
                {cols[0]}
              </th>
              <th className={`text-left text-[10px] uppercase tracking-[0.15em] font-medium px-3 sm:px-4 py-3 ${t.headerText}`}>
                {cols[1]}
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map(([label, a, b], i) => (
              <tr
                key={label}
                className={`border-b border-stone-100 last:border-b-0 ${
                  i % 2 ? t.stripeBg : ""
                }`}
              >
                <td className="px-3 sm:px-4 lg:px-5 py-3 text-[11px] sm:text-xs uppercase tracking-[0.1em] text-stone-500 font-light align-top">
                  {label}
                </td>
                <td className="px-3 sm:px-4 py-3 text-[13px] sm:text-sm text-stone-700 font-light align-top">
                  {a}
                </td>
                <td className="px-3 sm:px-4 py-3 text-[13px] sm:text-sm text-stone-700 font-light align-top">
                  {b}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ── FAQ item ────────────────────────────────────────────── */
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

export default function ServicesPage({ setPage, selectedLocation }) {
  const [filter, setFilter] = useState("All");
  const [openGuide, setOpenGuide] = useState(0);
  const [openFaq, setOpenFaq] = useState(0);

  const services = [
    { name: "Balinese Body Massage", tag: "Massage", duration: "60 / 90 min", price: "₹1,999",
      desc: "Long, flowing strokes with warm aromatic oils to release deep tension and restore circulation.",
      img: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=900&auto=format&fit=crop" },
    { name: "Deep Tissue Therapy", tag: "Massage", duration: "60 min", price: "₹2,299",
      desc: "Firm, targeted pressure that works into stiff shoulders, backs and legs after a long week.",
      img: "https://images.unsplash.com/photo-1639162906614-0603b0ae95fd?q=80&w=900&auto=format&fit=crop" },
    { name: "Aroma Hot Stone Ritual", tag: "Massage", duration: "75 min", price: "₹2,799",
      desc: "Heated basalt stones paired with essential oils to melt away muscle knots and quiet the mind.",
      img: "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?q=80&w=900&auto=format&fit=crop" },
    { name: "Signature Radiance Facial", tag: "Facial", duration: "45 min", price: "₹1,599",
      desc: "A gentle cleanse, exfoliation and hydration routine that leaves skin visibly brighter.",
      img: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=900&auto=format&fit=crop" },
    { name: "Head, Neck & Shoulder Release", tag: "Express", duration: "30 min", price: "₹999",
      desc: "A fast, focused session for anyone carrying stress in the upper back and scalp.",
      img: "https://images.unsplash.com/photo-1598901986949-f593ff2a31a6?q=80&w=900&auto=format&fit=crop" },
    { name: "Foot Reflexology", tag: "Express", duration: "40 min", price: "₹1,199",
      desc: "Pressure-point work on the feet believed to ease fatigue through the whole body.",
      img: "https://images.unsplash.com/photo-1700522924565-9fad1c05469e?q=80&w=900&auto=format&fit=crop" },
  ];

  const SERVICE_TAGS = ["All", "Massage", "Facial", "Express"];

  const shown = filter === "All" ? services : services.filter((s) => s.tag === filter);
  const location = selectedLocation || "Delhi NCR";

  return (
    <div className="animate-fadeIn">
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden min-h-[40vh] sm:min-h-[50vh] flex items-center">
        <img
          src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1800&auto=format&fit=crop"
          alt="Massage oils and fresh flowers"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950/92 via-stone-950/80 to-stone-900/50" />
        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-28 lg:pt-32 xl:pt-40 pb-10 sm:pb-14 lg:pb-16 xl:pb-20">
          <span className="inline-flex items-center gap-1.5 sm:gap-2 lg:gap-3 rounded-full border border-stone-400/20 bg-white/5 px-2.5 sm:px-3 lg:px-5 py-1 sm:py-1.5 lg:py-2 text-[9px] sm:text-[10px] lg:text-[11px] uppercase tracking-[0.15em] sm:tracking-[0.2em] lg:tracking-[0.25em] text-stone-300 backdrop-blur-sm">
            <Sparkles size={10} className="sm:size-[12px] lg:size-[13px]" /> Our Menu
          </span>
          <h1 className="mt-4 sm:mt-5 lg:mt-6 xl:mt-8 font-serif text-[1.75rem] xs:text-[2.1rem] sm:text-[2.8rem] lg:text-[4rem] xl:text-[5rem] leading-[1.08] text-white max-w-2xl lg:max-w-3xl">
            Treatments, <span className="italic text-emerald-300">priced simply.</span>
          </h1>
          <p className="mt-3 sm:mt-4 lg:mt-5 xl:mt-6 text-stone-300 text-[13px] sm:text-base lg:text-lg leading-relaxed max-w-lg lg:max-w-xl font-light">
            Every treatment below is available at all twenty-five branches. Prices
            are per session and include a short consultation before we begin.
          </p>
        </div>
      </section>

      {/* ── ABOUT THE SPA + STATS ────────────────────────────── */}
      <section className="py-10 sm:py-14 lg:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-emerald-600 text-[10px] sm:text-xs tracking-[0.18em] sm:tracking-[0.22em] uppercase font-light mb-3">
            About Our Spa
          </p>
          <h2 className="font-serif text-[1.4rem] xs:text-2xl sm:text-3xl lg:text-4xl text-stone-900 leading-tight">
            A decade of doing the small things properly.
          </h2>
          <div className="mt-4 flex">
            <div className="w-10 sm:w-12 h-px bg-emerald-300" />
          </div>

          <div className="mt-5 sm:mt-6 space-y-4 text-stone-600 text-sm sm:text-[15px] font-light leading-relaxed">
            <p>
              Mahika Russian Spa has run out of Aerocity, Delhi NCR since 2014, and the approach
              hasn't changed much in that time: fewer gimmicks, more attention to
              whether a treatment actually does what it claims. A Banya session is
              timed against your tolerance, not a house clock. A deep tissue massage
              stops chasing "harder" once the muscle actually releases. You can read
              more about how the spa started and how therapists are trained on our{" "}
              <button
                type="button"
                onClick={() => { setPage("about"); window.scrollTo(0, 0); }}
                className="text-emerald-700 underline underline-offset-2 hover:text-emerald-800 cursor-pointer"
              >
                about page
              </button>
              .
            </p>
            <p>
              Most guests fall into one of three groups: travellers landing at IGI
              who want to shake off a long flight before a meeting, Aerocity hotel
              guests looking for a proper session without leaving the neighbourhood,
              and regulars from South Delhi who come back for the Banya specifically.
              Whichever you are, the treatment guide below is written to help you
              pick the right session rather than the most expensive one — and if
              you'd rather just see numbers, our{" "}
              <button
                type="button"
                onClick={() => { setPage("services"); window.scrollTo(0, 0); }}
                className="text-emerald-700 underline underline-offset-2 hover:text-emerald-800 cursor-pointer"
              >
                pricing page
              </button>{" "}
              lists every rate side by side.
            </p>
            <p>
              Every treatment described below is available around the clock, seven
              days a week, including public holidays. If you're weighing up a spa
              visit against other options nearby, our pages on spa options in{" "}
              <span className="text-stone-800">Aerocity</span> and spas in{" "}
              <span className="text-stone-800">Mahipalpur</span> cover how this
              location compares on distance and access. For directions, parking,
              and a map, see our{" "}
              <button
                type="button"
                onClick={() => { setPage("contact"); window.scrollTo(0, 0); }}
                className="text-emerald-700 underline underline-offset-2 hover:text-emerald-800 cursor-pointer"
              >
                contact page
              </button>
              .
            </p>
          </div>
        </div>

        {/* Stats band */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 sm:mt-10 lg:mt-12">
          <dl className="grid grid-cols-2 sm:grid-cols-4 gap-y-6 gap-x-4 border-t border-stone-200 pt-6 sm:pt-8">
            {ABOUT_STATS.map((s) => (
              <div key={s.label} className="text-center">
                <dd className="font-serif text-2xl sm:text-3xl lg:text-4xl text-emerald-800 leading-none">
                  {s.value}
                </dd>
                <dt className="mt-2 text-[10px] sm:text-[11px] uppercase tracking-[0.18em] text-stone-400 font-light">
                  {s.label}
                </dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── STICKY FILTER BAR ────────────────────────────────── */}
      <div className="sticky top-14 sm:top-20 lg:top-24 z-30 border-b border-stone-200/60 bg-white/92 backdrop-blur-xl shadow-sm">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2.5 sm:py-3 lg:py-4 flex items-center justify-between gap-3 sm:gap-4 lg:gap-6">
          <div className="flex gap-1 sm:gap-1.5 lg:gap-2 overflow-x-auto no-scrollbar -mx-2 px-2 flex-1 min-w-0">
            {SERVICE_TAGS.map((t) => (
              <button
                key={t}
                onClick={() => setFilter(t)}
                className={`whitespace-nowrap rounded-full px-2.5 sm:px-3 lg:px-5 py-1.5 sm:py-2 lg:py-2.5 text-[10px] sm:text-xs lg:text-sm transition-all duration-300 touch-manipulation ${
                  filter === t
                    ? "bg-emerald-700 text-white shadow-lg shadow-emerald-700/20"
                    : "border border-stone-200 text-stone-500 hover:border-stone-300 hover:text-stone-700"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
          <p className="hidden sm:block text-[10px] sm:text-xs uppercase tracking-[0.15em] sm:tracking-[0.2em] text-stone-400 font-light flex-shrink-0">
            {shown.length} treatment{shown.length === 1 ? "" : "s"}
          </p>
        </div>
      </div>

      {/* ── SERVICES GRID ────────────────────────────────────── */}
      <section className="py-10 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ServiceGrid services={shown} location={location} layout="card" />
        </div>
      </section>

      {/* ── THE PROCESS ──────────────────────────────────────── */}
      <section className="bg-stone-50/80 border-y border-stone-200/60 py-10 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-8 sm:mb-10 lg:mb-14">
            <p className="text-emerald-600 text-[10px] sm:text-xs tracking-[0.18em] sm:tracking-[0.2em] uppercase font-light mb-2 flex items-center gap-2">
              <span className="text-emerald-500 text-base leading-none">●</span>
              The Process
            </p>
            <h2 className="font-serif text-[1.5rem] xs:text-2xl sm:text-3xl lg:text-4xl text-stone-900 leading-tight">
              How your session works.
            </h2>
            <div className="mt-3 flex">
              <div className="w-10 sm:w-12 h-px bg-emerald-300" />
            </div>
            <p className="mt-4 text-stone-500 text-sm sm:text-base font-light leading-relaxed">
              From the moment you call to the moment you leave, here is exactly what happens.
            </p>
          </div>

          <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-7">
            {PROCESS_STEPS.map((step, i) => {
              const stepTones = [
                "border-emerald-100 bg-emerald-50/40",
                "border-amber-100 bg-amber-50/40",
                "border-sky-100 bg-sky-50/40",
                "border-rose-100 bg-rose-50/40",
              ];
              return (
                <div
                  key={step.n}
                  className={`relative rounded-2xl border ${stepTones[i % stepTones.length]} p-5 sm:p-6 hover:shadow-md transition-all duration-300`}
                >
                  <span className="font-serif text-3xl sm:text-4xl text-emerald-200 leading-none">
                    {step.n}
                  </span>
                  <h3 className="mt-3 font-serif text-base sm:text-lg text-stone-900">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-[13px] sm:text-sm text-stone-600 font-light leading-relaxed">
                    {step.body}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── FULL TREATMENT GUIDE ─────────────────────────────── */}
      <section className="py-10 sm:py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 sm:mb-10">
            <p className="text-emerald-600 text-[10px] sm:text-xs tracking-[0.18em] sm:tracking-[0.2em] uppercase font-light mb-2 flex items-center gap-2">
              <span className="text-emerald-500 text-base leading-none">●</span>
              Full Treatment Guide
            </p>
            <h2 className="font-serif text-[1.5rem] xs:text-2xl sm:text-3xl lg:text-4xl text-stone-900 leading-tight">
              Every treatment, in depth.
            </h2>
            <div className="mt-3 flex">
              <div className="w-10 sm:w-12 h-px bg-emerald-300" />
            </div>
            <p className="mt-4 text-stone-500 text-sm sm:text-base font-light leading-relaxed">
              What it is, who it suits, and what to know before and after — written
              the way a therapist would explain it, not a brochure. For pricing
              across every option side by side, see our pricing page.
            </p>
          </div>

          <div className="space-y-3">
            {TREATMENT_GUIDE.map((item, i) => (
              <GuideItem
                key={item.name}
                item={item}
                isOpen={openGuide === i}
                onToggle={() => setOpenGuide(openGuide === i ? -1 : i)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── COMPARE TREATMENTS (color) ───────────────────────── */}
      <section className="bg-stone-50/80 border-y border-stone-200/60 py-10 sm:py-16 lg:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-8 sm:mb-10">
            <p className="text-emerald-600 text-[10px] sm:text-xs tracking-[0.18em] sm:tracking-[0.2em] uppercase font-light mb-2 flex items-center gap-2">
              <span className="text-emerald-500 text-base leading-none">●</span>
              Compare
            </p>
            <h2 className="font-serif text-[1.5rem] xs:text-2xl sm:text-3xl lg:text-4xl text-stone-900 leading-tight">
              Compare treatments side by side.
            </h2>
            <div className="mt-3 flex">
              <div className="w-10 sm:w-12 h-px bg-emerald-300" />
            </div>
            <p className="mt-4 text-stone-500 text-sm sm:text-base font-light leading-relaxed">
              Four common decisions guests ask about when booking, laid out feature by feature.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">
            {COMPARISONS.map((c) => (
              <CompareTable key={c.title} {...c} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CAN'T DECIDE CTA ─────────────────────────────────── */}
      <section className="py-10 sm:py-16 lg:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-emerald-900 px-5 sm:px-8 lg:px-12 py-8 sm:py-10 lg:py-14">
            <div className="absolute -top-16 -right-12 h-48 sm:h-60 w-48 sm:w-60 rounded-full bg-emerald-500/20 blur-3xl" />
            <div className="absolute -bottom-12 -left-12 h-48 sm:h-60 w-48 sm:w-60 rounded-full bg-emerald-400/10 blur-3xl" />
            <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-5 sm:gap-6 lg:gap-10">
              <div className="min-w-0">
                <p className="text-emerald-300 text-[10px] sm:text-xs uppercase tracking-[0.2em] font-light mb-2">
                  Can't decide?
                </p>
                <h2 className="font-serif text-xl sm:text-2xl lg:text-3xl text-white leading-tight">
                  Not sure which treatment is right for you?
                </h2>
                <p className="mt-2 sm:mt-3 text-emerald-100/85 max-w-md leading-relaxed font-light text-sm sm:text-base">
                  Call your nearest branch and describe how you're feeling — we'll
                  recommend a treatment and hold a slot for you.
                </p>
              </div>
              <div className="flex flex-col xs:flex-row flex-wrap gap-2.5 sm:gap-3 lg:gap-4">
                <a
                  href="tel:+918796910363"
                  className="flex items-center justify-center gap-1.5 sm:gap-2 whitespace-nowrap rounded-full bg-white px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 lg:py-4 text-xs sm:text-sm font-medium text-emerald-900 transition-all duration-300 hover:bg-emerald-50 active:scale-95"
                >
                  <Phone size={13} className="sm:size-[14px]" />
                  <span>+91 87969 10363</span>
                </a>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                    "Hi Mahika Russian Spa, I'd like help choosing a treatment."
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 sm:gap-2 whitespace-nowrap rounded-full border border-white/25 bg-white/10 px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 lg:py-4 text-xs sm:text-sm font-medium text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/20 active:scale-95"
                >
                  <MessageCircle size={13} className="sm:size-[14px]" /> WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────── */}
      <section className="py-10 sm:py-16 lg:py-20 bg-white border-t border-stone-200/60">
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
            <p className="mt-3 text-stone-500 text-sm sm:text-base font-light max-w-xl mx-auto">
              Everything guests ask before their first booking — and a few things they only think to ask after.
            </p>
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
            </a>{" "}
            — we usually reply within minutes.
          </p>
        </div>
      </section>
    </div>
  );
}