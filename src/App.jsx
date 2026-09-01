import React, { useEffect, useState } from "react";
import { Phone, MapPin, Clock, ChevronRight, Menu, X, Sparkles, Flower2, Droplets, MessageCircle } from "lucide-react";

// Digits only, with country code - what wa.me expects.
const WHATSAPP_NUMBER = "918796910363";

const LOCATIONS = [
  "Mahipalpur", "Aerocity", "Basant Kunj", "Gurgaon", "Dwarka", "Saket", "CP",
  "Delhi", "Karol Bagh", "Chanakyapuri", "Green Park", "Rohini", "RK Puram",
  "Uttam Nagar", "Mayur Vihar", "Malviya Nagar", "Hauz Khas", "Paschim Vihar",
  "Lajpat Nagar", "Nehru Place", "IGI Airport", "Paharganj", "Noida",
  "South Delhi", "Punjabi Bagh",
];

const SERVICES = [
  {
    name: "Balinese Body Massage",
    tag: "Massage",
    duration: "60 / 90 min",
    price: "\u20B91,999",
    desc: "Long, flowing strokes with warm aromatic oils to release deep tension and restore circulation.",
    img: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=900&auto=format&fit=crop",
  },
  {
    name: "Deep Tissue Therapy",
    tag: "Massage",
    duration: "60 min",
    price: "\u20B92,299",
    desc: "Firm, targeted pressure that works into stiff shoulders, backs and legs after a long week.",
    img: "https://images.unsplash.com/photo-1639162906614-0603b0ae95fd?q=80&w=900&auto=format&fit=crop",
  },
  {
    name: "Aroma Hot Stone Ritual",
    tag: "Massage",
    duration: "75 min",
    price: "\u20B92,799",
    desc: "Heated basalt stones paired with essential oils to melt away muscle knots and quiet the mind.",
    img: "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?q=80&w=900&auto=format&fit=crop",
  },
  {
    name: "Signature Radiance Facial",
    tag: "Facial",
    duration: "45 min",
    price: "\u20B91,599",
    desc: "A gentle cleanse, exfoliation and hydration routine that leaves skin visibly brighter.",
    img: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=900&auto=format&fit=crop",
  },
  {
    name: "Head, Neck & Shoulder Release",
    tag: "Express",
    duration: "30 min",
    price: "\u20B9999",
    desc: "A fast, focused session for anyone carrying stress in the upper back and scalp.",
    img: "https://images.unsplash.com/photo-1598901986949-f593ff2a31a6?q=80&w=900&auto=format&fit=crop",
  },
  {
    name: "Foot Reflexology",
    tag: "Express",
    duration: "40 min",
    price: "\u20B91,199",
    desc: "Pressure-point work on the feet believed to ease fatigue through the whole body.",
    img: "https://images.unsplash.com/photo-1700522924565-9fad1c05469e?q=80&w=900&auto=format&fit=crop",
  },
];

const GALLERY = [
  { src: "https://images.unsplash.com/photo-1620733723572-11c53f73a416?q=80&w=800&auto=format&fit=crop", alt: "Candles and towel spa ambience" },
  { src: "https://images.unsplash.com/photo-1583416750470-965b2707b355?q=80&w=800&auto=format&fit=crop", alt: "Spa treatment room table" },
  { src: "https://images.unsplash.com/photo-1595871151608-bc7abd1caca3?q=80&w=800&auto=format&fit=crop", alt: "Vanity table with mirror" },
  { src: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=800&auto=format&fit=crop", alt: "Oils and fresh flowers" },
  { src: "https://images.unsplash.com/photo-1761470575018-135c213340eb?q=80&w=800&auto=format&fit=crop", alt: "Candlelit steam room" },
];

function Header({ page, setPage, menuOpen, setMenuOpen }) {
  const [scrolled, setScrolled] = useState(false);
  const nav = [
    ["home", "Home"],
    ["services", "Services"],
    ["locations", "Locations"],
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // On the home page the header floats over the light hero with no background
  // until the page scrolls; other pages open on a dark banner, so it stays solid.
  const overlay = page === "home" && !scrolled && !menuOpen;

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        overlay ? "bg-transparent" : "bg-pink-50/90 backdrop-blur-md border-b border-pink-200/70"
      }`}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-6 flex items-center justify-between h-16 sm:h-20">
        <button onClick={() => { setPage("home"); setMenuOpen(false); window.scrollTo(0, 0); }} className="text-left">
          <span className="font-serif text-xl sm:text-2xl italic text-pink-600">Mahika</span>
          <span className="font-serif text-xl sm:text-2xl text-pink-900"> Russian Spa</span>
          <span className="block text-[9px] sm:text-[10px] uppercase tracking-[0.25em] sm:tracking-[0.3em] text-pink-900/50">Aerocity</span>
        </button>
        <nav className="hidden md:flex items-center gap-10">
          {nav.map(([key, label]) => (
            <button
              key={key}
              onClick={() => { setPage(key); window.scrollTo(0, 0); }}
              className={`text-sm tracking-wide pb-1 border-b transition-colors ${
                page === key
                  ? "text-pink-600 border-pink-600"
                  : "text-pink-900/70 border-transparent hover:text-pink-600"
              }`}
            >
              {label}
            </button>
          ))}
          <a
            href="tel:+911140001234"
            className="flex items-center gap-2 rounded-full bg-pink-600 px-5 py-2.5 text-sm text-white transition-colors hover:bg-pink-700"
          >
            <Phone size={15} /> Call Now
          </a>
        </nav>
        <button
          className="md:hidden text-pink-900/80"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {menuOpen && (
        <div className="md:hidden max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-pink-200 bg-pink-50 px-5 py-4 flex flex-col gap-4">
          {nav.map(([key, label]) => (
            <button
              key={key}
              onClick={() => { setPage(key); setMenuOpen(false); window.scrollTo(0, 0); }}
              className={`text-left text-base ${page === key ? "text-pink-600" : "text-pink-900/70"}`}
            >
              {label}
            </button>
          ))}
          <a href="tel:+911140001234" className="text-center bg-pink-600 text-white text-sm px-5 py-3 rounded-full">
            Call Now
          </a>
        </div>
      )}
    </header>
  );
}

function Footer({ setPage }) {
  return (
    <footer className="bg-pink-950 text-pink-100">
      <div className="max-w-6xl mx-auto px-5 sm:px-6 py-12 sm:py-14 grid sm:grid-cols-2 md:grid-cols-3 gap-10">
        <div>
          <p className="font-serif italic text-2xl text-pink-200">Mahika Russian Spa</p>
          <p className="mb-3 text-[10px] uppercase tracking-[0.3em] text-pink-300/70">Aerocity</p>
          <p className="text-sm text-pink-200/70 leading-relaxed max-w-xs">
            Twenty-five locations across Delhi NCR, one standard of care.
            Book a session near you and step out lighter than you walked in.
          </p>
        </div>
        <div>
          <p className="text-sm uppercase tracking-widest text-pink-300 mb-4">Explore</p>
          <div className="flex flex-col gap-2 text-sm text-pink-200/70">
            <button className="text-left hover:text-pink-200 w-fit" onClick={() => setPage("home")}>Home</button>
            <button className="text-left hover:text-pink-200 w-fit" onClick={() => setPage("services")}>Services</button>
            <button className="text-left hover:text-pink-200 w-fit" onClick={() => setPage("locations")}>Locations</button>
          </div>
        </div>
        <div>
          <p className="text-sm uppercase tracking-widest text-pink-300 mb-4">Reach us</p>
          <a href={"tel:+" + WHATSAPP_NUMBER} className="text-sm text-pink-100/70 flex items-center gap-2 mb-2 hover:text-white transition-colors">
            <Phone size={14} /> +91 87969 10363
          </a>
          <a
            href={"https://wa.me/" + WHATSAPP_NUMBER}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-pink-100/70 flex items-center gap-2 mb-2 hover:text-white transition-colors"
          >
            <MessageCircle size={14} /> Chat on WhatsApp
          </a>
          <p className="text-sm text-pink-100/70 flex items-center gap-2 mb-2"><Clock size={14} /> Open daily, 10 AM \u2013 10 PM</p>
          <p className="text-sm text-pink-100/70 flex items-center gap-2"><MapPin size={14} /> 25 branches across Delhi NCR</p>
        </div>
      </div>
      <div className="border-t border-pink-900 py-6 text-center text-xs text-pink-200/60">
        \u00A9 2026 Mahika Russian Spa, Aerocity. All rights reserved.
      </div>
    </footer>
  );
}

function HomePage({ setPage }) {
  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-pink-50 via-white to-pink-100" />
        <div className="absolute -top-40 -left-32 -z-10 h-[30rem] w-[30rem] rounded-full bg-pink-200/50 blur-3xl" />
        <div className="absolute top-24 right-0 -z-10 h-[26rem] w-[26rem] rounded-full bg-fuchsia-200/40 blur-3xl" />

        <div className="max-w-6xl mx-auto px-5 sm:px-6 pt-28 sm:pt-36 pb-16 sm:pb-24 grid lg:grid-cols-2 gap-14 sm:gap-16 lg:gap-10 items-center">
          {/* Copy */}
          <div className="relative z-10">
            <span className="inline-flex items-center gap-2 rounded-full border border-pink-200 bg-white/70 px-4 py-1.5 text-[11px] uppercase tracking-[0.25em] text-pink-600 backdrop-blur">
              <Sparkles size={13} /> 25 Locations &middot; Delhi NCR
            </span>

            <h1 className="mt-6 sm:mt-7 font-serif text-[2.6rem] sm:text-5xl md:text-6xl xl:text-7xl leading-[1.05] sm:leading-[1.03] text-pink-950">
              A quiet room,
              <span className="block italic text-pink-500">warm oil,</span>
              nowhere else to be.
            </h1>

            <div className="mt-8 flex items-start gap-5">
              <span className="mt-2.5 h-px w-12 flex-shrink-0 bg-pink-400" />
              <p className="max-w-sm text-base leading-relaxed text-pink-900/70">
                Therapeutic massage, facials and body rituals across twenty-five
                neighbourhoods &mdash; the same trained hands and unhurried pace,
                wherever you find us.
              </p>
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <button
                onClick={() => setPage("services")}
                className="group flex flex-1 sm:flex-none items-center justify-center gap-2 rounded-full bg-pink-600 px-7 sm:px-8 py-4 text-sm font-medium text-white shadow-xl shadow-pink-600/20 transition-colors hover:bg-pink-700"
              >
                View Services
                <ChevronRight size={16} className="transition-transform group-hover:translate-x-0.5" />
              </button>
              <a
                href={"https://wa.me/" + WHATSAPP_NUMBER}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-1 sm:flex-none items-center justify-center gap-2 rounded-full border border-pink-300 bg-white/70 px-7 sm:px-8 py-4 text-sm font-medium text-pink-700 backdrop-blur transition-colors hover:bg-white"
              >
                <MessageCircle size={16} /> Book on WhatsApp
              </a>
            </div>

            <dl className="mt-10 sm:mt-14 grid grid-cols-3 gap-4 sm:flex sm:flex-wrap sm:gap-x-12 sm:gap-y-6 border-t border-pink-200 pt-8">
              {[["25", "Branches"], ["12k+", "Sessions a year"], ["4.9", "Average rating"]].map(([n, label]) => (
                <div key={label}>
                  <dt className="font-serif text-2xl sm:text-3xl text-pink-600">{n}</dt>
                  <dd className="mt-1.5 text-[11px] uppercase tracking-[0.2em] text-pink-900/45">{label}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Arch collage */}
          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            {/* outlined arch sitting behind the photo */}
            <div className="absolute -right-4 -top-6 hidden h-full w-[85%] rounded-t-[12rem] rounded-b-3xl border border-pink-300/70 sm:block" />

            <div className="relative aspect-[3/4] overflow-hidden rounded-t-[12rem] rounded-b-3xl shadow-2xl shadow-pink-900/15 ring-1 ring-pink-200">
              <img
                src="https://images.unsplash.com/photo-1620733723572-11c53f73a416?q=80&w=1200&auto=format&fit=crop"
                alt="Candlelit spa treatment room"
                className="h-full w-full object-cover"
                fetchPriority="high"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-pink-950/35 via-transparent to-transparent" />
            </div>

            {/* small offset photo, top left */}
            <div className="absolute -left-6 top-24 hidden h-36 w-28 overflow-hidden rounded-2xl ring-4 ring-white shadow-xl shadow-pink-900/15 sm:block">
              <img
                src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=500&auto=format&fit=crop"
                alt="Massage oils and fresh flowers"
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>

            {/* small offset photo, bottom right */}
            <div className="absolute -right-5 bottom-24 hidden h-28 w-36 overflow-hidden rounded-2xl ring-4 ring-white shadow-xl shadow-pink-900/15 sm:block">
              <img
                src="https://images.unsplash.com/photo-1595871151608-bc7abd1caca3?q=80&w=500&auto=format&fit=crop"
                alt="Vanity table with mirror"
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>

            {/* price tag */}
            <div className="absolute -left-2 sm:-left-4 bottom-6 rounded-2xl bg-pink-600 px-4 sm:px-6 py-3 sm:py-4 text-white shadow-2xl shadow-pink-600/30">
              <p className="text-[10px] uppercase tracking-[0.2em] opacity-80">Sessions from</p>
              <p className="mt-1 font-serif text-2xl leading-none">&#8377;999</p>
            </div>

            {/* open-hours chip */}
            <div className="absolute -top-3 right-2 sm:right-8 flex items-center gap-2 rounded-full bg-white px-3 sm:px-4 py-2 shadow-lg shadow-pink-900/10">
              <Clock size={14} className="text-pink-600" />
              <span className="text-[11px] sm:text-xs whitespace-nowrap tracking-wide text-pink-900/70">10 AM &ndash; 10 PM, daily</span>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-pink-100/60 py-12 sm:py-16 border-y border-pink-200">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 grid sm:grid-cols-3 gap-8 text-center">
          <div>
            <Sparkles className="mx-auto text-pink-600 mb-3" size={26} />
            <p className="font-serif text-lg text-pink-900">Certified therapists</p>
            <p className="text-sm text-pink-900/50 mt-1">Trained in classical and modern technique</p>
          </div>
          <div>
            <Droplets className="mx-auto text-pink-600 mb-3" size={26} />
            <p className="font-serif text-lg text-pink-900">Pure, warmed oils</p>
            <p className="text-sm text-pink-900/50 mt-1">No synthetic fragrance, ever</p>
          </div>
          <div>
            <Flower2 className="mx-auto text-pink-600 mb-3" size={26} />
            <p className="font-serif text-lg text-pink-900">Private, calm rooms</p>
            <p className="text-sm text-pink-900/50 mt-1">Every branch, the same standard</p>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-5 sm:px-6 py-14 sm:py-20">
        <div className="flex items-end justify-between mb-8 sm:mb-10">
          <div>
            <p className="text-pink-600 text-sm tracking-widest uppercase mb-2">Signature Treatments</p>
            <h2 className="font-serif text-3xl text-pink-950">A few favourites to start with</h2>
          </div>
          <button onClick={() => setPage("services")} className="hidden sm:flex items-center gap-1 text-sm text-pink-600 hover:underline">
            See all services <ChevronRight size={15} />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {SERVICES.slice(0, 3).map((s) => (
            <article key={s.name} className="group">
              <div className="relative overflow-hidden rounded-2xl aspect-[4/5]">
                <img
                  src={s.img}
                  alt={s.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-pink-950/70 via-pink-950/10 to-transparent" />
                <span className="absolute top-4 right-4 rounded-full bg-white/90 backdrop-blur px-4 py-1.5 text-lg font-semibold text-pink-700">
                  {s.price}
                </span>
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <h3 className="font-serif text-xl text-white leading-snug">{s.name}</h3>
                  <p className="text-xs text-pink-100/80 mt-1.5 tracking-wide">{s.duration}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-5 sm:px-6 pb-16 sm:pb-24">
        <p className="text-pink-600 text-sm tracking-widest uppercase mb-2">Inside Mahika Russian Spa</p>
        <h2 className="font-serif text-3xl md:text-4xl text-pink-950 mb-10">A look around our rooms</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {GALLERY.map((g, i) => (
            <figure
              key={g.src}
              className={`group relative overflow-hidden rounded-2xl ${
                i === 0 ? "col-span-2 md:row-span-2 aspect-[4/3] md:aspect-square" : "aspect-[4/5]"
              }`}
            >
              <img
                src={g.src}
                alt={g.alt}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-pink-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <figcaption className="absolute bottom-0 left-0 right-0 p-4 text-xs text-white translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                {g.alt}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="bg-pink-950 py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-5 sm:px-6 text-center">
          <p className="font-serif italic text-xl sm:text-2xl md:text-3xl text-pink-100 leading-relaxed">
            "I stopped in during a work trip through Aerocity, expecting nothing
            more than a quick massage. Left an hour later completely unwound."
          </p>
          <p className="text-pink-300 text-sm mt-6 tracking-wide">Priya M. &mdash; Aerocity Branch</p>
        </div>
      </section>
    </div>
  );
}

const SERVICE_TAGS = ["All", "Massage", "Facial", "Express"];

const RITUAL_STEPS = [
  ["01", "A short consultation", "We ask where you hold tension and how much pressure you like before anything begins."],
  ["02", "The treatment", "Warm oils, a private room and a therapist who works to your pace — never a clock."],
  ["03", "Time to settle", "Tea, water and a few unhurried minutes before you step back outside."],
];

function ServicesPage({ setPage }) {
  const [filter, setFilter] = useState("All");
  const shown = filter === "All" ? SERVICES : SERVICES.filter((s) => s.tag === filter);

  return (
    <div>
      {/* Page banner */}
      <section className="relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1800&auto=format&fit=crop"
          alt="Massage oils and fresh flowers"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-pink-950/95 via-pink-950/75 to-pink-900/40" />
        <div className="relative max-w-6xl mx-auto px-5 sm:px-6 pt-32 sm:pt-40 pb-14 sm:pb-20">
          <span className="inline-flex items-center gap-2 rounded-full border border-pink-300/30 bg-white/5 px-4 py-1.5 text-[11px] uppercase tracking-[0.25em] text-pink-200 backdrop-blur">
            <Sparkles size={13} /> Our Menu
          </span>
          <h1 className="mt-6 sm:mt-7 font-serif text-[2.5rem] sm:text-5xl md:text-6xl leading-[1.05] text-white max-w-2xl">
            Treatments, <span className="italic text-pink-300">priced simply.</span>
          </h1>
          <p className="mt-5 sm:mt-6 text-pink-100/75 text-base sm:text-lg leading-relaxed max-w-xl">
            Every treatment below is available at all twenty-five branches. Prices
            are per session and include a short consultation before we begin.
          </p>
        </div>
      </section>

      {/* Filter bar, docked under the fixed header */}
      <div className="sticky top-16 sm:top-20 z-30 border-b border-pink-200/70 bg-pink-50/90 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-6">
          <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-1 px-1">
            {SERVICE_TAGS.map((t) => (
              <button
                key={t}
                onClick={() => setFilter(t)}
                className={`whitespace-nowrap rounded-full px-4 sm:px-5 py-2 text-sm transition-colors ${
                  filter === t
                    ? "bg-pink-600 text-white"
                    : "border border-pink-200 text-pink-900/70 hover:border-pink-400 hover:text-pink-700"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
          <p className="hidden sm:block text-xs uppercase tracking-[0.2em] text-pink-900/40">
            {shown.length} treatment{shown.length === 1 ? "" : "s"}
          </p>
        </div>
      </div>

      {/* Treatment cards */}
      <section className="max-w-6xl mx-auto px-5 sm:px-6 py-12 sm:py-16">
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-10 sm:gap-y-12">
          {shown.map((s) => (
            <article key={s.name} className="group flex flex-col">
              <div className="relative overflow-hidden rounded-3xl aspect-[4/3]">
                <img
                  src={s.img}
                  alt={s.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-pink-950/45 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="absolute left-4 top-4 rounded-full bg-white/85 backdrop-blur px-3 py-1 text-[11px] uppercase tracking-widest text-pink-700">
                  {s.tag}
                </span>
              </div>

              <div className="relative -mt-8 mx-4 rounded-2xl bg-white px-5 py-4 shadow-lg shadow-pink-900/10 flex items-baseline justify-between gap-4">
                <div className="flex items-center gap-2 text-pink-900/55 text-xs tracking-wide">
                  <Clock size={13} /> {s.duration}
                </div>
                <p className="font-serif text-2xl text-pink-600 whitespace-nowrap">{s.price}</p>
              </div>

              <h2 className="mt-5 font-serif text-2xl text-pink-950 leading-snug">{s.name}</h2>
              <p className="mt-2 text-sm text-pink-900/70 leading-relaxed flex-1">{s.desc}</p>

              <button
                onClick={() => { setPage("locations"); window.scrollTo(0, 0); }}
                className="mt-5 inline-flex items-center gap-1.5 self-start border-b border-pink-300 pb-1 text-sm text-pink-700 hover:border-pink-600 transition-colors"
              >
                Book this treatment <ChevronRight size={15} />
              </button>
            </article>
          ))}
        </div>
      </section>

      {/* How a session goes */}
      <section className="bg-pink-100/60 border-y border-pink-200 py-14 sm:py-20">
        <div className="max-w-6xl mx-auto px-5 sm:px-6">
          <p className="text-pink-600 text-sm tracking-widest uppercase mb-2">The Ritual</p>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-pink-950 mb-10 sm:mb-12">How a session goes</h2>
          <div className="grid sm:grid-cols-3 gap-10">
            {RITUAL_STEPS.map(([n, title, body]) => (
              <div key={n}>
                <p className="font-serif text-5xl text-pink-300">{n}</p>
                <p className="mt-4 font-serif text-xl text-pink-950">{title}</p>
                <p className="mt-2 text-sm text-pink-900/70 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="max-w-6xl mx-auto px-5 sm:px-6 py-14 sm:py-20">
        <div className="relative overflow-hidden rounded-3xl bg-pink-950 px-6 sm:px-14 py-10 sm:py-14">
          <div className="absolute -top-20 -right-16 h-72 w-72 rounded-full bg-pink-600/25 blur-3xl" />
          <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-white">Not sure what you need?</h2>
              <p className="mt-3 text-pink-100/70 max-w-md leading-relaxed">
                Call your nearest branch and describe how you&rsquo;re feeling &mdash;
                we&rsquo;ll recommend a treatment and hold a slot for you.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <a
                href="tel:+911140001234"
                className="flex flex-1 sm:flex-none items-center justify-center gap-2 whitespace-nowrap rounded-full bg-pink-500 px-6 sm:px-8 py-4 text-sm font-medium text-white transition-colors hover:bg-pink-400"
              >
                <Phone size={15} /> +91 11 4000 1234
              </a>
              <button
                onClick={() => { setPage("locations"); window.scrollTo(0, 0); }}
                className="flex flex-1 sm:flex-none items-center justify-center whitespace-nowrap rounded-full border border-white/25 bg-white/5 px-6 sm:px-8 py-4 text-sm font-medium text-white backdrop-blur transition-colors hover:bg-white/15"
              >
                Find a branch
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function LocationsPage() {
  const [selected, setSelected] = useState(LOCATIONS[0]);
  const [form, setForm] = useState({ name: "", phone: "", service: SERVICES[0].name });
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  // Booking goes out as a pre-filled WhatsApp message to the branch desk.
  const waLink = () => {
    const message = [
      "Hello Mahika Russian Spa, I'd like to book an appointment.",
      "",
      "Name: " + form.name.trim(),
      "Phone: " + form.phone.trim(),
      "Treatment: " + form.service,
      "Branch: " + selected + " (Delhi NCR)",
      "Preferred timing: any slot between 10 AM - 10 PM",
    ].join("\n");
    return "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(message);
  };

  const submit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) return setError("Please enter your name.");
    if (form.phone.replace(/\D/g, "").length < 10) return setError("Please enter a 10-digit mobile number.");
    setError("");
    const url = waLink();
    // Some browsers block window.open; fall back to navigating this tab.
    const win = window.open(url, "_blank", "noopener,noreferrer");
    if (!win) window.location.href = url;
    setSent(true);
  };

  return (
    <div>
      <section className="max-w-6xl mx-auto px-5 sm:px-6 pt-28 sm:pt-36 pb-8 sm:pb-10">
        <p className="text-pink-600 text-sm tracking-widest uppercase mb-3">Find Us</p>
        <h1 className="font-serif text-[2.25rem] sm:text-4xl md:text-5xl leading-tight text-pink-950 mb-4">25 branches across Delhi NCR</h1>
        <p className="text-pink-900/70 max-w-xl">
          Tap a neighbourhood to select your nearest branch, then send us your
          details on WhatsApp &mdash; we'll confirm a slot within the hour.
        </p>
      </section>

      <section className="max-w-6xl mx-auto px-5 sm:px-6 pb-16 grid lg:grid-cols-5 gap-10">
        <div className="lg:col-span-3">
          <div className="flex flex-wrap gap-2.5">
            {LOCATIONS.map((loc) => (
              <button
                key={loc}
                onClick={() => setSelected(loc)}
                className={`rounded-full border px-3.5 sm:px-4 py-2 text-[13px] sm:text-sm transition-colors ${
                  selected === loc
                    ? "bg-pink-600 text-pink-50 border-pink-600"
                    : "border-pink-300 text-pink-900/80 hover:border-pink-400"
                }`}
              >
                {loc}
              </button>
            ))}
          </div>
          <img
            src="https://images.unsplash.com/photo-1583417657209-d3dd44dc9c09?q=80&w=1200&auto=format&fit=crop"
            alt="Spa reception ambience"
            className="mt-8 sm:mt-10 w-full rounded-2xl object-cover h-48 sm:h-64"
          />
          <div className="mt-4 grid grid-cols-3 gap-4">
            <img
              src="https://images.unsplash.com/photo-1611920630418-f587fdc3bf94?q=80&w=500&auto=format&fit=crop"
              alt="Spa room decor"
              className="w-full rounded-xl object-cover h-20 sm:h-28"
            />
            <img
              src="https://images.unsplash.com/photo-1630835425197-50feeba99ecd?q=80&w=500&auto=format&fit=crop"
              alt="Private treatment room"
              className="w-full rounded-xl object-cover h-20 sm:h-28"
            />
            <img
              src="https://images.unsplash.com/photo-1652903761255-4fbf11cff931?q=80&w=500&auto=format&fit=crop"
              alt="Spa bathroom with wooden walls"
              className="w-full rounded-xl object-cover h-20 sm:h-28"
            />
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="lg:sticky lg:top-28 rounded-2xl border border-pink-200 bg-pink-50 p-5 sm:p-7">
            <p className="font-serif text-2xl text-pink-950 mb-1">Book at {selected}</p>
            <p className="text-sm text-pink-900/50 mb-6">Open daily, 10 AM &ndash; 10 PM</p>
            {sent ? (
              <div className="text-center py-8">
                <span className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-green-600">
                  <MessageCircle size={26} />
                </span>
                <p className="font-serif text-xl text-pink-600 mb-2">WhatsApp opened</p>
                <p className="text-sm text-pink-900/70">
                  Your details for the {selected} branch are ready in WhatsApp &mdash;
                  just hit send and we'll confirm your slot.
                </p>
                <a
                  href={waLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center justify-center gap-2 rounded-lg bg-green-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-green-700 transition-colors"
                >
                  <MessageCircle size={16} /> Open WhatsApp again
                </a>
                <button
                  onClick={() => setSent(false)}
                  className="mt-4 block mx-auto text-sm text-pink-700 border-b border-pink-300 pb-0.5 hover:border-pink-600"
                >
                  Send another request
                </button>
              </div>
            ) : (
              <form onSubmit={submit} className="flex flex-col gap-4">
                <div>
                  <label className="text-xs text-pink-900/50 tracking-wide">Your name</label>
                  <input
                    value={form.name}
                    onChange={(e) => { setForm({ ...form, name: e.target.value }); setError(""); }}
                    className="w-full mt-1 px-4 py-3 rounded-lg border border-pink-300 bg-white focus:outline-none focus:ring-2 focus:ring-pink-300 text-base sm:text-sm"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label className="text-xs text-pink-900/50 tracking-wide">Phone number</label>
                  <input
                    value={form.phone}
                    onChange={(e) => { setForm({ ...form, phone: e.target.value }); setError(""); }}
                    className="w-full mt-1 px-4 py-3 rounded-lg border border-pink-300 bg-white focus:outline-none focus:ring-2 focus:ring-pink-300 text-base sm:text-sm"
                    placeholder="10-digit mobile number"
                  />
                </div>
                <div>
                  <label className="text-xs text-pink-900/50 tracking-wide">Treatment</label>
                  <select
                    value={form.service}
                    onChange={(e) => setForm({ ...form, service: e.target.value })}
                    className="w-full mt-1 px-4 py-3 rounded-lg border border-pink-300 bg-white focus:outline-none focus:ring-2 focus:ring-pink-300 text-base sm:text-sm"
                  >
                    {SERVICES.map((s) => (
                      <option key={s.name} value={s.name}>
                        {s.name} &middot; {s.price}
                      </option>
                    ))}
                  </select>
                </div>
                {error && (
                  <p className="text-xs text-red-600 -mt-1">{error}</p>
                )}
                <button
                  type="submit"
                  className="mt-2 flex items-center justify-center gap-2 bg-green-600 text-white py-3.5 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
                >
                  <MessageCircle size={17} /> Send on WhatsApp
                </button>
                <p className="text-[11px] text-pink-900/45 text-center leading-relaxed">
                  Opens WhatsApp with your name, number and branch already filled in.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default function MahikaRussianSpaWebsite() {
  const [page, setPage] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen overflow-x-hidden bg-pink-50 text-pink-900 font-sans">
      <Header page={page} setPage={setPage} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      {page === "home" && <HomePage setPage={setPage} />}
      {page === "services" && <ServicesPage setPage={setPage} />}
      {page === "locations" && <LocationsPage />}
      <Footer setPage={setPage} />
    </div>
  );
}