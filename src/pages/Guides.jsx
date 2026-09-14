import React, { useEffect } from "react";
import {
  BookOpen,
  Clock,
  ArrowLeft,
  ArrowRight,
  Calendar,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Phone,
  MessageCircle,
  Quote,
} from "lucide-react";

/* ---------------------------------------------------------------
   Full article bodies — keyed by slug.
   Each article has: intro, sections[], tips[], image, imageAlt,
   and optional callout.
   --------------------------------------------------------------- */
const GUIDE_CONTENT = {
  "what-happens-in-a-russian-banya": {
    hero: "https://images.unsplash.com/photo-1583416750470-965b2707b355?q=80&w=1600&auto=format&fit=crop",
    heroAlt: "Steam rising in a traditional wooden banya",
    published: "Updated January 2026",
    sections: [
      {
        heading: "Before you step in",
        body: "A Banya session begins outside the hot room, not inside it. Your therapist will walk you through what is about to happen: the number of heat cycles, how long each one lasts, and the signal you can use at any point if you want to step out early. Nothing here is compulsory, and nothing is timed against your will — the room is yours for the booked window.",
      },
      {
        heading: "The heat cycle",
        body: "Inside, the air is dry and warm rather than heavy and wet like a steam room. Temperatures sit in a range most guests find comfortable after the first minute. You stay in for a set stretch, then come out to cool down — a cool shower, a rest in the lounge, or simply sitting quietly with water. The alternation between heat and cool-down is the part most people underestimate. It is what makes a Banya feel restorative rather than merely hot.",
      },
      {
        heading: "The venik",
        body: "The venik is a bundle of leafy branches — traditionally birch or oak — that has been soaked and warmed. Your therapist uses it to apply gentle rhythmic pressure across the back, shoulders and legs. It is not a beating. Done properly, it feels closer to a firm, warm brushstroke than anything else. Many first-timers say this is the part they remember most.",
      },
      {
        heading: "How many cycles, and when to stop",
        body: "Most sessions run two to three cycles. That is enough to feel the full benefit without overdoing it. If at any point you feel light-headed, tell your therapist immediately — they will step you out and cool you down. Hydration before and after matters far more than people expect. Drink water in the hour before your session, and again once you are done.",
      },
    ],
    tips: [
      "Drink water in the hour before your session.",
      "Skip alcohol on the day — it makes heat harder to tolerate.",
      "Tell your therapist about any heart, blood pressure or breathing conditions beforehand.",
      "You can end a cycle at any moment — no explanation needed.",
    ],
    image:
      "https://images.unsplash.com/photo-1620733723572-11c53f73a416?q=80&w=1400&auto=format&fit=crop",
    imageAlt: "Warm towels and wooden banya interior",
  },

  "swedish-or-deep-tissue": {
    hero: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=1600&auto=format&fit=crop",
    heroAlt: "Therapist performing a Swedish massage",
    published: "Updated January 2026",
    sections: [
      {
        heading: "What Swedish massage actually does",
        body: "Swedish massage works at the surface. Long, continuous strokes move in the direction of blood flow, loosening the top layer of muscle and calming the nervous system. Pressure stays light to medium. The goal is not to reach any particular knot — it is to bring the whole body into a slower rhythm. If you leave feeling like you could sleep for hours, that is the point.",
      },
      {
        heading: "What deep tissue actually does",
        body: "Deep tissue works on a different layer. Strokes are slower, more focused, and use firmer pressure into specific areas — usually the shoulders, upper back, hips and legs. It is not simply \"harder Swedish\". A good deep tissue session follows the tension it finds, spending more time in one place and less time covering ground. It is more likely to leave you feeling worked rather than merely relaxed.",
      },
      {
        heading: "How to choose",
        body: "If your week has been stressful and your body feels generally tired, Swedish is almost always the better pick. If you have a specific recurring tension — a shoulder that never quite releases, hips that ache after long sitting — deep tissue will do more for it. If you are unsure, book Swedish and mention the specific area to your therapist; they will adjust pressure in that region without turning the whole session into deep work.",
      },
      {
        heading: "The booking mistake to avoid",
        body: "The most common mistake is booking deep tissue because it sounds more serious, then spending the first fifteen minutes tensing against the pressure. A deep tissue session only works if you can stay relaxed under firm contact. If you know you prefer a lighter touch, book Swedish. There is no hierarchy here — the two treatments serve different purposes.",
      },
    ],
    tips: [
      "Say your pressure preference out loud at the start.",
      "Deep tissue soreness for a day or two is normal — that is not damage.",
      "Do not book deep tissue right before an important event.",
      "Swedish before bed leads to the best sleep of the two.",
    ],
    image:
      "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?q=80&w=1400&auto=format&fit=crop",
    imageAlt: "Therapist applying oil during a massage",
  },

  "your-first-visit": {
    hero: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?q=80&w=1600&auto=format&fit=crop",
    heroAlt: "Calm spa reception area with warm lighting",
    published: "Updated January 2026",
    sections: [
      {
        heading: "Booking and arriving",
        body: "You can book over the phone, on WhatsApp, or simply walk in. If you are coming at short notice on a weekend evening, a quick message ahead is worth the thirty seconds. Arrive around ten minutes early. That gives you time to change, fill out a short form, and settle without feeling rushed. If you are late, your session will usually still run the full length, but the calm start is worth protecting.",
      },
      {
        heading: "The consultation",
        body: "Before the treatment begins, your therapist will ask a short set of questions: any injuries, any areas to avoid, preferred pressure, and whether you have had this treatment before. Answer honestly — this is the point at which the session gets tailored to you. If you are unsure about anything, ask. There are no wrong questions here, and no question has ever surprised us.",
      },
      {
        heading: "During the treatment",
        body: "You will be left alone to undress to your comfort level, then covered with a towel or sheet. Your therapist will only uncover the area being worked on. If pressure is too firm or too light, say so — it is a normal part of the session and your therapist expects it. Silence is not a virtue here. If something needs adjusting, the right time to say it is immediately.",
      },
      {
        heading: "Afterwards",
        body: "Once your treatment ends, you are not rushed out. Most guests spend a few minutes in the relaxation area with water or tea. Pay when you are ready. If you drove, give yourself a few minutes before getting behind the wheel — a good massage can leave you pleasantly sluggish. If you came by cab, we can call one for you.",
      },
    ],
    tips: [
      "Wear whatever is comfortable — you will change anyway.",
      "Eat something light beforehand, nothing heavy.",
      "Leave jewellery at home if you can.",
      "Speak up about pressure at any point — it is not rude.",
    ],
    image:
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1400&auto=format&fit=crop",
    imageAlt: "Oils, flowers and folded towels on a spa table",
  },

  "what-to-book-after-a-long-flight": {
    hero: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1600&auto=format&fit=crop",
    heroAlt: "Airplane window view above clouds",
    published: "Updated January 2026",
    sections: [
      {
        heading: "The variable that matters most: time",
        body: "The right treatment after a long flight depends almost entirely on how much time you have before your next commitment. If you have three hours before a meeting, book something short and energising. If you have the rest of the day, a longer session will reset you properly. There is no single answer that works for every arrival.",
      },
      {
        heading: "If you have three hours or less",
        body: "A Head, Neck & Shoulder Release (30 minutes) is the safest pick. It targets the tension that builds from sitting still for hours, and it leaves you alert rather than sleepy. Follow it with a Foot Reflexology session if you have time — the two together take just over an hour and address the two areas that long flights punish most.",
      },
      {
        heading: "If you have the rest of the day",
        body: "A Russian Banya session or a Thai Massage both work well here. Banya resets circulation and helps you sleep through the time-zone shift; Thai releases the stiffness that sets in after cramped seating. If you can only pick one, pick Banya — it does more for jet lag specifically, and the after-effects on sleep are noticeable within the first night.",
      },
      {
        heading: "What to avoid",
        body: "Deep tissue on arrival day is usually the wrong call. Your muscles are already fatigued from travel; firm pressure will not help them recover faster and often leaves you sore for a full day afterwards. Save deep tissue for the second or third day of your trip, once your body has adjusted. On arrival day, gentler is better.",
      },
    ],
    tips: [
      "Book before you land if you can — good slots go first.",
      "Hydrate during the flight, not just after.",
      "Skip alcohol on the plane if you plan a Banya session.",
      "Bring a change of clothes — you will feel the difference.",
    ],
    image:
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=1400&auto=format&fit=crop",
    imageAlt: "Reflexology session on tired feet",
  },
};

/* ---------------------------------------------------------------
   Guide listing data
   --------------------------------------------------------------- */
export const GUIDES = [
  {
    slug: "what-happens-in-a-russian-banya",
    category: "Treatments explained",
    readTime: "6 min read",
    title: "What Actually Happens in a Russian Banya",
    excerpt:
      "Most people book a Banya without a clear idea of what they are walking into. Here is the sequence, start to finish, and the parts that surprise first-timers.",
    image: GUIDE_CONTENT["what-happens-in-a-russian-banya"].hero,
  },
  {
    slug: "swedish-or-deep-tissue",
    category: "Choosing a treatment",
    readTime: "5 min read",
    title: "Swedish or Deep Tissue: Which One Do You Actually Need?",
    excerpt:
      "The two most-booked treatments on our menu do fairly different jobs. Booking the wrong one is the most common reason a guest leaves feeling it was fine rather than worth it.",
    image: GUIDE_CONTENT["swedish-or-deep-tissue"].hero,
  },
  {
    slug: "your-first-visit",
    category: "Before you book",
    readTime: "5 min read",
    title: "Your First Visit: What to Expect, Start to Finish",
    excerpt:
      "If you have never been to a spa before, the uncertainty is usually about the practical bits rather than the treatment. Here is the whole thing, plainly.",
    image: GUIDE_CONTENT["your-first-visit"].hero,
  },
  {
    slug: "what-to-book-after-a-long-flight",
    category: "Choosing a treatment",
    readTime: "4 min read",
    title: "What to Book After a Long Flight",
    excerpt:
      "We sit close enough to IGI Airport that a good share of our guests arrive straight off a flight or with a few hours to fill before one. The right choice depends almost entirely on the clock.",
    image: GUIDE_CONTENT["what-to-book-after-a-long-flight"].hero,
  },
];

const ADDRESS =
  "Office No. 118, Defence Enclave, Adjoining Aerocity, Mahipalpur, New Delhi 110037";

const PHONE_NUMBER = "918796910363";
const PHONE_DISPLAY = "+91 87969 10363";

/* ===============================================================
   GUIDES LISTING PAGE
   =============================================================== */
export default function Guides({ setPage, setSelectedGuide }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const openGuide = (slug) => {
    if (setSelectedGuide) setSelectedGuide(slug);
    if (setPage) setPage("guide");
    window.scrollTo(0, 0);
  };

  const goHome = () => {
    if (setPage) setPage("home");
    window.scrollTo(0, 0);
  };

  return (
    <main className="bg-white text-stone-800">
      {/* ---------------- HERO / INTRO ---------------- */}
      <section className="pt-28 sm:pt-32 lg:pt-40 pb-10 sm:pb-14 bg-stone-50 border-b border-stone-100">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <p className="text-[11px] sm:text-xs uppercase tracking-[0.25em] text-emerald-700 font-light flex items-center gap-2">
            <BookOpen size={14} className="sm:size-[15px]" />
            Guides
          </p>

          <h1 className="mt-4 font-serif text-3xl sm:text-4xl lg:text-5xl tracking-tight text-stone-900">
            Spa and massage, explained properly
          </h1>

          <p className="mt-5 text-base sm:text-lg text-stone-600 font-light leading-relaxed max-w-2xl">
            Short, practical answers to the things guests ask before booking —
            what a Banya session actually involves, how to choose between
            treatments, and what happens on a first visit.
          </p>

          <p className="mt-4 text-sm sm:text-[15px] text-stone-500 font-light leading-relaxed max-w-2xl">
            Everything here reflects how we actually work at {ADDRESS}. Rates
            quoted are the published ones, and we do not make medical claims
            about massage.
          </p>
        </div>
      </section>

      {/* ---------------- FEATURED GUIDE ---------------- */}
      <section className="py-10 sm:py-14 lg:py-20 bg-gradient-to-b from-emerald-50/40 to-white border-b border-stone-100">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="flex items-baseline justify-between gap-4 mb-6 sm:mb-8">
            <h2 className="text-[11px] sm:text-xs uppercase tracking-[0.25em] text-stone-500 font-light flex items-center gap-2">
              <Sparkles size={13} className="text-emerald-600" />
              Start here
            </h2>
          </div>

          <button
            type="button"
            onClick={() => openGuide(GUIDES[0].slug)}
            className="group w-full text-left grid md:grid-cols-2 gap-0 rounded-3xl overflow-hidden border border-emerald-100 bg-white shadow-sm hover:shadow-xl hover:border-emerald-200 transition-all duration-500"
          >
            <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[320px] overflow-hidden">
              <img
                src={GUIDES[0].image}
                alt={GUIDES[0].title}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/40 via-transparent to-transparent" />
              <span className="absolute top-4 left-4 rounded-full bg-emerald-600 text-white px-3 py-1 text-[10px] uppercase tracking-[0.15em] font-light">
                Featured
              </span>
            </div>

            <div className="p-6 sm:p-8 lg:p-10 flex flex-col justify-center">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] sm:text-[11px] uppercase tracking-[0.18em] font-light">
                <span className="text-emerald-700">{GUIDES[0].category}</span>
                <span className="text-stone-300">·</span>
                <span className="text-stone-400 flex items-center gap-1.5">
                  <Clock size={12} />
                  {GUIDES[0].readTime}
                </span>
              </div>

              <h3 className="mt-4 font-serif text-2xl sm:text-3xl lg:text-4xl leading-tight text-stone-900 group-hover:text-emerald-800 transition-colors">
                {GUIDES[0].title}
              </h3>

              <p className="mt-4 text-sm sm:text-base text-stone-600 font-light leading-relaxed">
                {GUIDES[0].excerpt}
              </p>

              <span className="mt-6 inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.2em] text-emerald-700 font-light">
                Read guide
                <ArrowRight
                  size={13}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </span>
            </div>
          </button>
        </div>
      </section>

      {/* ---------------- GRID OF GUIDE CARDS ---------------- */}
      <section className="py-10 sm:py-14 lg:py-20">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="flex items-baseline justify-between gap-4 border-b border-stone-200 pb-4 mb-8 sm:mb-10">
            <h2 className="text-[11px] sm:text-xs uppercase tracking-[0.25em] text-stone-500 font-light flex items-center gap-2">
              <span className="text-emerald-600 text-base leading-none">●</span>
              All guides
            </h2>
            <span className="text-[11px] sm:text-xs uppercase tracking-[0.2em] text-stone-400 font-light">
              {GUIDES.length} guides
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 lg:gap-7">
            {GUIDES.map((g, idx) => (
              <button
                key={g.slug}
                type="button"
                onClick={() => openGuide(g.slug)}
                className="group relative flex flex-col text-left rounded-2xl border border-stone-200 bg-white overflow-hidden transition-all duration-300 hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-900/5 hover:-translate-y-0.5 cursor-pointer"
              >
                {/* Top image strip */}
                <div className="relative aspect-[16/9] overflow-hidden bg-stone-100">
                  <img
                    src={g.image}
                    alt={g.title}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/50 via-stone-950/10 to-transparent" />
                  <span className="absolute top-3 left-3 rounded-full bg-white/90 backdrop-blur px-2.5 py-1 text-[10px] uppercase tracking-[0.15em] text-emerald-800 font-light">
                    {g.category}
                  </span>
                  <span className="absolute top-3 right-3 font-serif text-2xl sm:text-3xl text-white/80 select-none">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="p-5 sm:p-6 lg:p-7 flex flex-col flex-1">
                  <div className="flex items-center gap-2 text-[10px] sm:text-[11px] uppercase tracking-[0.18em] text-stone-400 font-light">
                    <Clock size={12} />
                    {g.readTime}
                  </div>

                  <h3 className="mt-3 font-serif text-lg sm:text-xl lg:text-[22px] leading-snug text-stone-900 group-hover:text-emerald-800 transition-colors">
                    {g.title}
                  </h3>

                  <p className="mt-3 text-sm sm:text-[15px] text-stone-600 font-light leading-relaxed flex-1">
                    {g.excerpt}
                  </p>

                  <span className="mt-5 inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.2em] text-emerald-700 font-light">
                    Read guide
                    <ArrowRight
                      size={13}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </span>
                </div>
              </button>
            ))}
          </div>

          <div className="pt-12">
            <button
              type="button"
              onClick={goHome}
              className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-stone-400 hover:text-emerald-700 transition-colors cursor-pointer"
            >
              <ArrowLeft size={14} />
              Back to home
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ===============================================================
   INDIVIDUAL GUIDE ARTICLE PAGE
   =============================================================== */
export function GuideArticle({ slug, setPage }) {
  const guide = GUIDES.find((g) => g.slug === slug) || GUIDES[0];
  const content = GUIDE_CONTENT[guide.slug];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const backToGuides = () => {
    if (setPage) setPage("guides");
    window.scrollTo(0, 0);
  };

  const goToBooking = () => {
    if (setPage) setPage("services");
    window.scrollTo(0, 0);
  };

  return (
    <main className="bg-white text-stone-800">
      {/* ---------------- HERO ---------------- */}
      <section className="relative overflow-hidden min-h-[45vh] sm:min-h-[55vh] flex items-end">
        <img
          src={content.hero}
          alt={content.heroAlt}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/95 via-stone-950/70 to-stone-950/30" />

        <div className="relative max-w-3xl mx-auto w-full px-5 sm:px-8 pt-28 sm:pt-32 lg:pt-40 pb-10 sm:pb-14">
          <button
            type="button"
            onClick={backToGuides}
            className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-stone-300 hover:text-emerald-300 transition-colors mb-6 cursor-pointer"
          >
            <ArrowLeft size={14} />
            All guides
          </button>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] sm:text-[11px] uppercase tracking-[0.18em] font-light">
            <span className="text-emerald-300">{guide.category}</span>
            <span className="text-stone-500">·</span>
            <span className="text-stone-400 flex items-center gap-1.5">
              <Clock size={12} /> {guide.readTime}
            </span>
            <span className="text-stone-500">·</span>
            <span className="text-stone-400 flex items-center gap-1.5">
              <Calendar size={12} /> {content.published}
            </span>
          </div>

          <h1 className="mt-4 font-serif text-3xl sm:text-4xl lg:text-5xl tracking-tight text-white leading-tight">
            {guide.title}
          </h1>

          <p className="mt-5 text-base sm:text-lg text-stone-300 font-light leading-relaxed">
            {guide.excerpt}
          </p>
        </div>
      </section>

      {/* ---------------- ARTICLE BODY ---------------- */}
      <article className="max-w-3xl mx-auto px-5 sm:px-8 py-12 sm:py-16 lg:py-20">
        {/* Intro pull-quote */}
        <div className="relative rounded-2xl border border-emerald-100 bg-emerald-50/50 p-6 sm:p-7 mb-10 sm:mb-14">
          <Quote className="text-emerald-600 mb-3" size={22} />
          <p className="font-serif italic text-lg sm:text-xl text-stone-800 leading-relaxed">
            {guide.excerpt}
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-10 sm:space-y-12">
          {content.sections.map((s, i) => (
            <section key={i}>
              <h2 className="font-serif text-2xl sm:text-3xl text-stone-900 leading-tight flex items-baseline gap-3">
                <span className="text-emerald-600 font-light text-xl sm:text-2xl">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {s.heading}
              </h2>
              <p className="mt-4 text-[15px] sm:text-base text-stone-700 font-light leading-relaxed">
                {s.body}
              </p>

              {/* Insert the image after the second section */}
              {i === 1 && (
                <figure className="mt-8 sm:mt-10 rounded-2xl overflow-hidden border border-stone-200 shadow-sm">
                  <img
                    src={content.image}
                    alt={content.imageAlt}
                    loading="lazy"
                    className="w-full h-56 sm:h-72 lg:h-80 object-cover"
                  />
                  <figcaption className="px-4 sm:px-5 py-3 text-[11px] sm:text-xs text-stone-500 font-light bg-stone-50 border-t border-stone-100">
                    {content.imageAlt}
                  </figcaption>
                </figure>
              )}
            </section>
          ))}
        </div>

        {/* Tips callout */}
        <div className="mt-12 sm:mt-16 rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50/60 to-white p-6 sm:p-8">
          <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-emerald-700 font-medium flex items-center gap-2 mb-4">
            <CheckCircle2 size={14} /> Quick tips
          </p>
          <ul className="space-y-3">
            {content.tips.map((t, i) => (
              <li
                key={i}
                className="flex items-start gap-3 text-[14px] sm:text-[15px] text-stone-700 font-light leading-relaxed"
              >
                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                {t}
              </li>
            ))}
          </ul>
        </div>

        {/* Attention / advisory */}
        <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50/60 p-5 sm:p-6 flex items-start gap-3">
          <AlertCircle
            size={18}
            className="text-amber-600 flex-shrink-0 mt-0.5"
          />
          <p className="text-[13px] sm:text-sm text-stone-700 font-light leading-relaxed">
            <span className="font-medium text-stone-900">A note on health claims: </span>
            We describe what a treatment involves and what most guests feel
            afterwards. We do not make medical claims. If you have a health
            condition, speak to your doctor before booking.
          </p>
        </div>

        {/* CTA */}
        <div className="mt-12 sm:mt-16 rounded-3xl bg-stone-900 p-6 sm:p-8 lg:p-10 text-center">
          <p className="text-emerald-300 text-[10px] sm:text-xs uppercase tracking-[0.25em] font-light mb-3">
            Ready to book?
          </p>
          <h3 className="font-serif text-2xl sm:text-3xl text-white leading-tight max-w-lg mx-auto">
            Reserve your session, or ask us anything first
          </h3>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={goToBooking}
              className="inline-flex items-center gap-2 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white px-5 sm:px-6 py-3 text-sm font-medium transition-all duration-300 active:scale-95"
            >
              View treatments <ArrowRight size={15} />
            </button>

            <a
              href={`tel:+${PHONE_NUMBER}`}
              className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 text-white backdrop-blur-sm px-5 sm:px-6 py-3 text-sm font-medium transition-all duration-300 hover:bg-white/15 active:scale-95"
            >
              <Phone size={15} /> {PHONE_DISPLAY}
            </a>

            <a
              href={`https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(
                `Hi Mahika Russian Spa, I just read your guide on "${guide.title}" and have a question.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 text-white backdrop-blur-sm px-5 sm:px-6 py-3 text-sm font-medium transition-all duration-300 hover:bg-white/15 active:scale-95"
            >
              <MessageCircle size={15} /> WhatsApp
            </a>
          </div>
        </div>

        {/* Back link */}
        <div className="mt-10 text-center">
          <button
            type="button"
            onClick={backToGuides}
            className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-stone-400 hover:text-emerald-700 transition-colors cursor-pointer"
          >
            <ArrowLeft size={14} />
            Back to all guides
          </button>
        </div>
      </article>
    </main>
  );
}