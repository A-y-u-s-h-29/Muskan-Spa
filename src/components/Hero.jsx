import { useEffect, useState, useCallback } from "react";
import { Phone, Sparkles, MessageCircle, MapPin, Clock } from "lucide-react";
import { HERO_SLIDES, HERO_STATS } from "../data/gallery";
import { WHATSAPP_NUMBER } from "../data/locations";

/* ---------------------------------------------------------------
   Location background images — one is picked per location.
   Desktop / tablet images (landscape crop).
   --------------------------------------------------------------- */
export const LOCATION_BG = [
  { img: "rl1.jpg" },
  { img: "rl3.webp" },
  { img: "rl4.jpg" },
  { img: "rl6.jpg" },
  { img: "COUPLE-MASSAGE-3.jpg" },
];

/* ---------------------------------------------------------------
   Location background images — mobile (portrait crop).
   Used only for the location hero on phones.
   --------------------------------------------------------------- */
export const LOCATION_BG_MOBILE = [
  { img: "r1.webp" },
  { img: "r2.jpg" },
  { img: "r3.jpg" },
  { img: "r4.webp" },
  { img: "r5.webp" },
  { img: "r6.webp" },
  { img: "r7.webp" },
];

/* ---------------------------------------------------------------
   HERO message per location (used when a location is provided)
   --------------------------------------------------------------- */
const HERO_MESSAGES = {
  Mahipalpur:
    "Steps from IGI Airport — a refreshing reset between flights, with our signature Russian Banya rituals.",
  Aerocity:
    "Where 5-star hospitality meets authentic Russian spa therapy — the finest Banya experience in Delhi NCR.",
  "Basant Kunj":
    "A quiet South Delhi escape — deep-tissue and aroma rituals in a calm, private setting.",
  Gurgaon:
    "Post-work deep tissue and stress-release sessions trusted by Gurgaon's corporate crowd.",
  Dwarka:
    "Authentic Russian Banya technique alongside classic Indian wellness therapies.",
  Saket:
    "Home to our most requested aroma and hot-stone specialists — a favourite in South Delhi.",
  CP: "Heart of Delhi. Walk in for a quick express session or a full luxury ritual.",
  Delhi:
    "Certified Russian and Indian therapists, available daily from 10 AM to 10 PM.",
  "Karol Bagh":
    "Signature deep tissue and reflexology — perfect after a long day in the city.",
  Chanakyapuri:
    "Diplomatic calm meets our most refined Russian spa rituals.",
  "Green Park":
    "Aroma therapy and hot stone treatments — deeply relaxing, every single time.",
  Rohini:
    "Rohini's trusted destination for Russian Banya rituals and Indian therapies.",
  "RK Puram":
    "Four-hand and Balinese specialists — book early, they fill up fast.",
  "Uttam Nagar":
    "Full range of Russian and Indian therapies at honest, transparent prices.",
  "Mayur Vihar":
    "A quiet escape for deep tissue, reflexology and facial treatments.",
  "Malviya Nagar":
    "A favourite for express sessions and deep-tissue specialists.",
  "Hauz Khas":
    "Our most relaxing aroma therapy rituals — perfect after a long week.",
  "Paschim Vihar": "Premium Russian spa therapy, now in West Delhi.",
  "Lajpat Nagar":
    "Authentic Russian Banya and Indian deep tissue, in the heart of Lajpat Nagar.",
  "Nehru Place":
    "Fast, effective stress-release sessions for busy professionals.",
  "IGI Airport":
    "Rapid-refresh treatments between flights — open early and late.",
  Paharganj:
    "A peaceful retreat in the heart of Old Delhi's traveller hub.",
  Noida:
    "Certified Russian and Indian therapists — at home or in-studio.",
  "South Delhi":
    "Serving all of South Delhi with our most-loved therapists, all certified.",
  "Punjabi Bagh":
    "West Delhi's home for premium Russian spa rituals.",
};

function getHeroMessage(location) {
  const key = String(location || "").trim();
  return (
    HERO_MESSAGES[key] ||
    `Certified Russian and Indian therapists at our ${key} branch — open daily from 10 AM to 10 PM.`
  );
}

/* ---------------------------------------------------------------
   Chip data per slide — derived from each slide's location/title.
   Falls back to generic spa info when no specific match is found.
   --------------------------------------------------------------- */
const SLIDE_CHIP_FALLBACK = {
  location: "Delhi NCR",
  hours: "Open daily · 10 AM – 10 PM",
};

/* Map of known slide location keywords → chip data */
const SLIDE_LOCATION_CHIPS = [
  {
    match: ["Mahipalpur", "IGI"],
    location: "Mahipalpur · 10 min from IGI",
    hours: "Open 24/7 · 365 days",
  },
  {
    match: ["Aerocity"],
    location: "Aerocity · Delhi NCR",
    hours: "Open daily · 10 AM – 10 PM",
  },
  {
    match: ["Basant Kunj", "South Delhi"],
    location: "Basant Kunj · South Delhi",
    hours: "Open daily · 10 AM – 10 PM",
  },
  {
    match: ["Gurgaon"],
    location: "Gurgaon · Delhi NCR",
    hours: "Open daily · 10 AM – 10 PM",
  },
  {
    match: ["Dwarka"],
    location: "Dwarka · Delhi NCR",
    hours: "Open daily · 10 AM – 10 PM",
  },
  {
    match: ["Saket"],
    location: "Saket · South Delhi",
    hours: "Open daily · 10 AM – 10 PM",
  },
  {
    match: ["CP", "Connaught"],
    location: "Connaught Place · Delhi",
    hours: "Open daily · 10 AM – 10 PM",
  },
  {
    match: ["Karol Bagh"],
    location: "Karol Bagh · Delhi",
    hours: "Open daily · 10 AM – 10 PM",
  },
  {
    match: ["Chanakyapuri"],
    location: "Chanakyapuri · Delhi",
    hours: "Open daily · 10 AM – 10 PM",
  },
  {
    match: ["Hauz Khas"],
    location: "Hauz Khas · South Delhi",
    hours: "Open daily · 10 AM – 10 PM",
  },
  {
    match: ["Lajpat Nagar"],
    location: "Lajpat Nagar · South Delhi",
    hours: "Open daily · 10 AM – 10 PM",
  },
  {
    match: ["Nehru Place"],
    location: "Nehru Place · South Delhi",
    hours: "Open daily · 10 AM – 10 PM",
  },
  {
    match: ["Paharganj"],
    location: "Paharganj · Delhi",
    hours: "Open daily · 10 AM – 10 PM",
  },
  {
    match: ["Noida"],
    location: "Noida · Delhi NCR",
    hours: "Open daily · 10 AM – 10 PM",
  },
  {
    match: ["Punjabi Bagh"],
    location: "Punjabi Bagh · West Delhi",
    hours: "Open daily · 10 AM – 10 PM",
  },
];

function getSlideChips(slide) {
  const haystack = `${slide.title || ""} ${slide.subtitle || ""} ${
    slide.blurb || ""
  }`;

  for (const entry of SLIDE_LOCATION_CHIPS) {
    if (entry.match.some((kw) => haystack.includes(kw))) {
      return { location: entry.location, hours: entry.hours };
    }
  }
  return SLIDE_CHIP_FALLBACK;
}

/* ---------------------------------------------------------------
   Pick a background image for a location (deterministic).
   Changes when location changes. Returns { desktop, mobile }.
   --------------------------------------------------------------- */
export function pickHeroImage(location) {
  if (!LOCATION_BG.length) return null;

  const key = String(location || "")
    .trim()
    .toLowerCase();
  if (!key) return LOCATION_BG[0].img;

  let hash = 0;
  for (let i = 0; i < key.length; i++) {
    hash = (hash * 31 + key.charCodeAt(i)) >>> 0;
  }
  const index = hash % LOCATION_BG.length;
  return LOCATION_BG[index].img;
}

/* Same hash → matching mobile image for that location. */
function pickHeroImageMobile(location) {
  if (!LOCATION_BG_MOBILE.length) return null;

  const key = String(location || "")
    .trim()
    .toLowerCase();
  if (!key) return LOCATION_BG_MOBILE[0].img;

  let hash = 0;
  for (let i = 0; i < key.length; i++) {
    hash = (hash * 31 + key.charCodeAt(i)) >>> 0;
  }
  const index = hash % LOCATION_BG_MOBILE.length;
  return LOCATION_BG_MOBILE[index].img;
}

export default function HeroSlider({ location }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(
    () => setIndex((i) => (i + 1) % HERO_SLIDES.length),
    []
  );

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, 5500);
    return () => clearInterval(id);
  }, [next, paused]);

  /* =========================================================
     LOCATION MODE — single location background image
     ========================================================= */
  const isLocationMode = Boolean(location);

  if (isLocationMode) {
    const heroImage = pickHeroImage(location);
    const heroImageMobile = pickHeroImageMobile(location);
    const heroMessage = getHeroMessage(location);

    return (
      <>
        <section className="relative bg-stone-900">
          <div className="relative w-full h-[100svh] min-h-[600px] sm:min-h-[680px] lg:min-h-[720px] overflow-hidden">
            {/* Mobile gets a portrait-crop image via <source>; desktop gets the landscape one. */}
            <picture>
              <source media="(max-width: 639px)" srcSet={heroImageMobile} />
              <img
                src={
                  heroImage ||
                  "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?q=80&w=1800&auto=format&fit=crop"
                }
                alt={`${location} — Mahika Russian Spa`}
                loading="eager"
                className="absolute inset-0 h-full w-full object-cover object-center"
                onError={(e) => {
                  e.currentTarget.src =
                    "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?q=80&w=1800&auto=format&fit=crop";
                }}
              />
            </picture>

            {/* Responsive gradient overlay for readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/95 via-stone-900/50 to-stone-950/60 sm:from-stone-950/90 sm:via-stone-900/45 sm:to-stone-950/55" />

            {/* Content overlay — mobile: content near top under header; tablet/desktop: centered */}
            <div className="absolute inset-0 flex flex-col justify-start sm:justify-center">
              <div className="mx-auto w-full max-w-7xl px-8 sm:px-6 lg:px-8 pt-44 sm:pt-24 lg:pt-28 pb-16 sm:pb-20 lg:pb-24">
                <div
                  key={location}
                  className="max-w-2xl animate-[fadeIn_0.9s_ease-out_forwards]"
                >
                  {/* Brand chip */}
                  <span className="inline-flex max-w-full items-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-3 sm:px-4 py-1 sm:py-1.5 text-[10px] sm:text-[11px] uppercase tracking-[0.18em] sm:tracking-[0.25em] text-white/90 backdrop-blur-sm">
                    <Sparkles size={11} className="shrink-0" />
                    <span className="truncate">Mahika Russian Spa</span>
                  </span>

                  {/* Title */}
                  <h1
                    className="mt-5 sm:mt-6 lg:mt-8 font-serif text-white leading-[1.08] break-words"
                    style={{ fontSize: "clamp(1.85rem, 7vw, 4.75rem)" }}
                  >
                    Mahika Russian Spa —{" "}
                    <span className="italic text-emerald-300">
                      {location}
                    </span>
                  </h1>

                  {/* Subtitle (hero message) */}
                  <p
                    className="mt-4 sm:mt-4 lg:mt-5 text-stone-100/90 font-light max-w-lg leading-relaxed"
                    style={{ fontSize: "clamp(1rem, 2.8vw, 1.25rem)" }}
                  >
                    {heroMessage}
                  </p>

                  {/* Quick chips */}
                  <div className="mt-5 sm:mt-5 flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 sm:px-3 py-1.5 sm:py-1.5 text-[11px] sm:text-xs text-white/90 backdrop-blur-sm">
                      <MapPin size={11} className="shrink-0" />
                      <span className="truncate">
                        {location} · Delhi NCR
                      </span>
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 sm:px-3 py-1.5 sm:py-1.5 text-[11px] sm:text-xs text-white/90 backdrop-blur-sm">
                      <Clock size={11} className="shrink-0" />
                      <span>Open daily · 10 AM – 10 PM</span>
                    </span>
                  </div>

                  {/* CTAs — vertical on mobile, horizontal on tablet+ */}
                  <div className="mt-7 sm:mt-7 lg:mt-9 flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-3">
                    <a
                      href={
                        "https://wa.me/" +
                        WHATSAPP_NUMBER +
                        "?text=" +
                        encodeURIComponent(
                          `Hello Mahika Russian Spa, I would like to book a session at ${location}.`
                        )
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-emerald-600 px-5 sm:px-7 py-3.5 sm:py-3.5 text-sm sm:text-sm font-medium text-white shadow-xl shadow-emerald-900/30 transition-all duration-300 hover:bg-emerald-500 active:scale-95 touch-manipulation"
                    >
                      <MessageCircle
                        size={16}
                        className="sm:size-[16px] shrink-0"
                      />{" "}
                      Book on WhatsApp
                    </a>
                    <a
                      href="tel:+918287674605"
                      className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-5 sm:px-7 py-3.5 sm:py-3.5 text-sm sm:text-sm font-medium text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/20 active:scale-95 touch-manipulation"
                    >
                      <Phone
                        size={16}
                        className="sm:size-[16px] shrink-0"
                      />{" "}
                      Call Now
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ACHIEVEMENTS BAND */}
        <section
          aria-label="Mahika Russian Spa achievements"
          className="bg-stone-950 border-t border-white/10"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
            <dl className="grid grid-cols-2 sm:grid-cols-4 gap-y-5 gap-x-4 sm:gap-x-6">
              {HERO_STATS.map((s) => (
                <div
                  key={s.label}
                  className="min-w-0 text-center sm:text-left"
                >
                  <dt className="sr-only">{s.label}</dt>
                  <dd>
                    <span
                      className="block font-serif text-white leading-none"
                      style={{ fontSize: "clamp(1.35rem, 3.2vw, 2.25rem)" }}
                    >
                      {s.value}
                    </span>
                    <span className="mt-1.5 block text-[10px] sm:text-[11px] lg:text-xs uppercase tracking-[0.16em] sm:tracking-[0.2em] text-stone-400 font-light truncate">
                      {s.label}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <style>{`
          @media (prefers-reduced-motion: reduce) {
            .animate-\\[fadeIn_0\\.9s_ease-out_forwards\\] { animation: none; opacity: 1; }
          }
        `}</style>
      </>
    );
  }

  /* =========================================================
     HOME MODE — original slider (unchanged)
     ========================================================= */
  const current = HERO_SLIDES[index];
  const slideChips = getSlideChips(current);

  return (
    <>
      <section
        className="relative bg-stone-900"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="relative w-full h-[100svh] min-h-[600px] sm:min-h-[680px] lg:min-h-[720px] overflow-hidden">
          {HERO_SLIDES.map((slide, i) => (
            <div
              key={slide.src}
              className={`absolute inset-0 transition-opacity duration-1000 ease-out ${
                i === index ? "opacity-100" : "opacity-0"
              }`}
              aria-hidden={i !== index}
            >
              <img
                src={slide.src}
                alt={slide.title}
                loading={i === 0 ? "eager" : "lazy"}
                className={`h-full w-full object-cover transition-transform duration-[8000ms] ease-out ${
                  i === index ? "scale-105" : "scale-100"
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/95 via-stone-900/50 to-stone-950/60 sm:from-stone-950/90 sm:via-stone-900/45 sm:to-stone-950/55" />
            </div>
          ))}

          {/* Content overlay — mobile: content near top under header; tablet/desktop: centered */}
          <div className="absolute inset-0 flex flex-col justify-start sm:justify-center">
            <div className="mx-auto w-full max-w-7xl px-8 sm:px-6 lg:px-8 pt-44 sm:pt-24 lg:pt-28 pb-16 sm:pb-20 lg:pb-24">
              <div
                key={index}
                className="max-w-2xl animate-[fadeIn_0.9s_ease-out_forwards]"
              >
                <span className="inline-flex max-w-full items-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-3 sm:px-4 py-1 sm:py-1.5 text-[10px] sm:text-[11px] uppercase tracking-[0.18em] sm:tracking-[0.25em] text-white/90 backdrop-blur-sm">
                  <Sparkles size={11} className="shrink-0" />
                  <span className="truncate">Mahika Russian Spa</span>
                </span>

                <h1
                  className="mt-5 sm:mt-6 lg:mt-8 font-serif text-white leading-[1.08] break-words"
                  style={{ fontSize: "clamp(1.85rem, 7vw, 4.75rem)" }}
                >
                  {current.title}
                </h1>

                <p
                  className="mt-4 sm:mt-4 lg:mt-5 text-stone-100/90 font-light max-w-lg leading-relaxed"
                  style={{ fontSize: "clamp(1rem, 2.8vw, 1.25rem)" }}
                >
                  {current.subtitle}
                </p>

                {current.blurb && (
                  <p
                    className="mt-3 sm:mt-3 text-stone-300/85 font-light max-w-xl leading-relaxed"
                    style={{ fontSize: "clamp(0.9rem, 2vw, 1rem)" }}
                  >
                    {current.blurb}
                  </p>
                )}

                {/* Quick chips — now shown on every slide via getSlideChips() */}
                <div className="mt-5 sm:mt-5 flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 sm:px-3 py-1.5 sm:py-1.5 text-[11px] sm:text-xs text-white/90 backdrop-blur-sm">
                    <MapPin size={11} className="shrink-0" />
                    <span className="truncate">{slideChips.location}</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 sm:px-3 py-1.5 sm:py-1.5 text-[11px] sm:text-xs text-white/90 backdrop-blur-sm">
                    <Clock size={11} className="shrink-0" />
                    <span>{slideChips.hours}</span>
                  </span>
                </div>

                {/* CTAs — vertical on mobile, horizontal on tablet+ */}
                <div className="mt-7 sm:mt-7 lg:mt-9 flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-3">
                  <a
                    href={
                      "https://wa.me/" +
                      WHATSAPP_NUMBER +
                      "?text=" +
                      encodeURIComponent(
                        "Hello Mahika Russian Spa, I would like to book a session."
                      )
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-emerald-600 px-5 sm:px-7 py-3.5 sm:py-3.5 text-sm sm:text-sm font-medium text-white shadow-xl shadow-emerald-900/30 transition-all duration-300 hover:bg-emerald-500 active:scale-95 touch-manipulation"
                  >
                    <MessageCircle
                      size={16}
                      className="sm:size-[16px] shrink-0"
                    />{" "}
                    Book on WhatsApp
                  </a>
                  <a
                    href="tel:+918287674605"
                    className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-5 sm:px-7 py-3.5 sm:py-3.5 text-sm sm:text-sm font-medium text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/20 active:scale-95 touch-manipulation"
                  >
                    <Phone
                      size={16}
                      className="sm:size-[16px] shrink-0"
                    />{" "}
                    Call Now
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Slider dots — positioned with enough clearance from CTAs on mobile */}
          <div className="absolute bottom-5 sm:bottom-8 lg:bottom-10 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2 sm:gap-2">
            {HERO_SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-2 sm:h-2 rounded-full transition-all duration-300 ${
                  i === index
                    ? "w-7 sm:w-8 bg-emerald-400"
                    : "w-2 sm:w-2 bg-white/60 hover:bg-white/90"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      <section
        aria-label="Mahika Russian Spa achievements"
        className="bg-stone-950 border-t border-white/10"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
          <dl className="grid grid-cols-2 sm:grid-cols-4 gap-y-5 gap-x-4 sm:gap-x-6">
            {HERO_STATS.map((s) => (
              <div
                key={s.label}
                className="min-w-0 text-center sm:text-left"
              >
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <span
                    className="block font-serif text-white leading-none"
                    style={{ fontSize: "clamp(1.35rem, 3.2vw, 2.25rem)" }}
                  >
                    {s.value}
                  </span>
                  <span className="mt-1.5 block text-[10px] sm:text-[11px] lg:text-xs uppercase tracking-[0.16em] sm:tracking-[0.2em] text-stone-400 font-light truncate">
                    {s.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .animate-\\[fadeIn_0\\.9s_ease-out_forwards\\] { animation: none; opacity: 1; }
        }
      `}</style>
    </>
  );
}