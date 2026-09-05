import React, { useEffect, useState } from "react";
import { Phone, MapPin, Clock, ChevronRight, Menu, X, Sparkles, Flower2, Droplets, MessageCircle, Star, Calendar, Leaf, ChevronLeft, Award, Quote } from "lucide-react";

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
    price: "₹1,999",
    desc: "Long, flowing strokes with warm aromatic oils to release deep tension and restore circulation.",
    img: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=900&auto=format&fit=crop",
  },
  {
    name: "Deep Tissue Therapy",
    tag: "Massage",
    duration: "60 min",
    price: "₹2,299",
    desc: "Firm, targeted pressure that works into stiff shoulders, backs and legs after a long week.",
    img: "https://images.unsplash.com/photo-1639162906614-0603b0ae95fd?q=80&w=900&auto=format&fit=crop",
  },
  {
    name: "Aroma Hot Stone Ritual",
    tag: "Massage",
    duration: "75 min",
    price: "₹2,799",
    desc: "Heated basalt stones paired with essential oils to melt away muscle knots and quiet the mind.",
    img: "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?q=80&w=900&auto=format&fit=crop",
  },
  {
    name: "Signature Radiance Facial",
    tag: "Facial",
    duration: "45 min",
    price: "₹1,599",
    desc: "A gentle cleanse, exfoliation and hydration routine that leaves skin visibly brighter.",
    img: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=900&auto=format&fit=crop",
  },
  {
    name: "Head, Neck & Shoulder Release",
    tag: "Express",
    duration: "30 min",
    price: "₹999",
    desc: "A fast, focused session for anyone carrying stress in the upper back and scalp.",
    img: "https://images.unsplash.com/photo-1598901986949-f593ff2a31a6?q=80&w=900&auto=format&fit=crop",
  },
  {
    name: "Foot Reflexology",
    tag: "Express",
    duration: "40 min",
    price: "₹1,199",
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

// Sample testimonials (demo content)
const TESTIMONIALS = [
  {
    name: "Ananya Sharma",
    location: "Aerocity Branch",
    rating: 5,
    text: "The Balinese massage was absolutely divine. The therapist's hands knew exactly where to work. I walked out feeling like a new person.",
    treatment: "Balinese Body Massage"
  },
  {
    name: "Priya Mehta",
    location: "Gurgaon Branch",
    rating: 5,
    text: "I've been to many spas across Delhi, but nothing compares to the care and attention here. The hot stone ritual is my new favourite.",
    treatment: "Aroma Hot Stone Ritual"
  },
  {
    name: "Riya Kapoor",
    location: "Saket Branch",
    rating: 5,
    text: "The Signature Radiance Facial left my skin glowing for days. Such a gentle, luxurious experience from start to finish.",
    treatment: "Signature Radiance Facial"
  },
  {
    name: "Neha Verma",
    location: "Dwarka Branch",
    rating: 4.5,
    text: "Perfect for a quick unwind after work. The head and shoulder release melts away all the screen-time tension.",
    treatment: "Head, Neck & Shoulder Release"
  }
];

function LoadingScreen({ onComplete }) {
  const [loading, setLoading] = useState(true);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setFade(true);
    }, 1800);

    const timer2 = setTimeout(() => {
      setLoading(false);
      onComplete();
    }, 2500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onComplete]);

  if (!loading) return null;

  return (
    <div className={`fixed inset-0 z-[100] bg-white flex items-center justify-center transition-opacity duration-700 ${fade ? 'opacity-0' : 'opacity-100'}`}>
      <div className="text-center px-4">
        <div className="relative">
          {/* Decorative line */}
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-px bg-stone-300" />
          
          {/* Brand name with letter-by-letter animation - Responsive */}
          <div className="font-serif text-3xl sm:text-5xl md:text-7xl tracking-tight text-stone-900">
            <span className="inline-block animate-[fadeUp_0.6s_ease-out_forwards] opacity-0" style={{ animationDelay: '0.1s' }}>
              M
            </span>
            <span className="inline-block animate-[fadeUp_0.6s_ease-out_forwards] opacity-0" style={{ animationDelay: '0.15s' }}>
              a
            </span>
            <span className="inline-block animate-[fadeUp_0.6s_ease-out_forwards] opacity-0" style={{ animationDelay: '0.2s' }}>
              h
            </span>
            <span className="inline-block animate-[fadeUp_0.6s_ease-out_forwards] opacity-0" style={{ animationDelay: '0.25s' }}>
              i
            </span>
            <span className="inline-block animate-[fadeUp_0.6s_ease-out_forwards] opacity-0" style={{ animationDelay: '0.3s' }}>
              k
            </span>
            <span className="inline-block animate-[fadeUp_0.6s_ease-out_forwards] opacity-0" style={{ animationDelay: '0.35s' }}>
              a
            </span>
            <span className="inline-block mx-1 sm:mx-2 text-emerald-700 animate-[fadeUp_0.6s_ease-out_forwards] opacity-0" style={{ animationDelay: '0.4s' }}>
              ·
            </span>
            <span className="inline-block text-emerald-700 animate-[fadeUp_0.6s_ease-out_forwards] opacity-0" style={{ animationDelay: '0.45s' }}>
              R
            </span>
            <span className="inline-block text-emerald-700 animate-[fadeUp_0.6s_ease-out_forwards] opacity-0" style={{ animationDelay: '0.5s' }}>
              u
            </span>
            <span className="inline-block text-emerald-700 animate-[fadeUp_0.6s_ease-out_forwards] opacity-0" style={{ animationDelay: '0.55s' }}>
              s
            </span>
            <span className="inline-block text-emerald-700 animate-[fadeUp_0.6s_ease-out_forwards] opacity-0" style={{ animationDelay: '0.6s' }}>
              s
            </span>
            <span className="inline-block text-emerald-700 animate-[fadeUp_0.6s_ease-out_forwards] opacity-0" style={{ animationDelay: '0.65s' }}>
              i
            </span>
            <span className="inline-block text-emerald-700 animate-[fadeUp_0.6s_ease-out_forwards] opacity-0" style={{ animationDelay: '0.7s' }}>
              a
            </span>
            <span className="inline-block text-emerald-700 animate-[fadeUp_0.6s_ease-out_forwards] opacity-0" style={{ animationDelay: '0.75s' }}>
              n
            </span>
          </div>
          
          <p className="mt-3 sm:mt-4 text-[10px] sm:text-xs uppercase tracking-[0.3em] sm:tracking-[0.35em] text-stone-400 animate-[fadeUp_0.8s_ease-out_forwards] opacity-0" style={{ animationDelay: '0.9s' }}>
            Aerocity · Delhi NCR
          </p>
          
          {/* Elegant underline animation */}
          <div className="mt-4 sm:mt-6 flex justify-center">
            <div className="w-12 sm:w-16 h-px bg-stone-200 animate-[expand_1.2s_ease-out_forwards] origin-left" />
          </div>
        </div>
      </div>
    </div>
  );
}

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

  const overlay = page === "home" && !scrolled && !menuOpen;

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        overlay 
          ? "bg-transparent" 
          : "bg-white/95 backdrop-blur-xl shadow-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-between h-14 sm:h-20 lg:h-24">
        <button 
          onClick={() => { setPage("home"); setMenuOpen(false); window.scrollTo(0, 0); }} 
          className="text-left group flex-shrink-0 min-w-0"
        >
          <span className="font-serif text-base sm:text-xl lg:text-2xl xl:text-3xl tracking-tight text-emerald-800">Mahika</span>
          <span className="font-serif text-base sm:text-xl lg:text-2xl xl:text-3xl text-stone-800 hidden xs:inline"> Russian Spa</span>
          <span className="block text-[7px] xs:text-[8px] sm:text-[9px] lg:text-[10px] xl:text-[11px] uppercase tracking-[0.2em] xs:tracking-[0.25em] sm:tracking-[0.3em] lg:tracking-[0.35em] text-stone-400 mt-0.5 font-light truncate max-w-[120px] xs:max-w-none">Aerocity · Delhi NCR</span>
        </button>
        
        <nav className="hidden md:flex items-center gap-4 lg:gap-10 xl:gap-12">
          {nav.map(([key, label]) => (
            <button
              key={key}
              onClick={() => { setPage(key); window.scrollTo(0, 0); }}
              className={`text-xs lg:text-sm tracking-[0.1em] lg:tracking-[0.15em] uppercase font-light relative pb-1 transition-colors duration-300 ${
                page === key
                  ? "text-emerald-700"
                  : "text-stone-500 hover:text-stone-800"
              }`}
            >
              {label}
              <span className={`absolute bottom-0 left-0 h-[2px] bg-emerald-600 transition-all duration-300 ${
                page === key ? "w-full" : "w-0"
              }`} />
            </button>
          ))}
          <a
            href="tel:+911140001234"
            className="flex items-center gap-2 rounded-full bg-emerald-700 px-4 sm:px-5 lg:px-6 py-2 sm:py-2.5 lg:py-3 text-xs sm:text-sm text-white transition-all duration-300 hover:bg-emerald-800 hover:shadow-lg hover:shadow-emerald-700/20"
          >
            <Phone size={14} className="sm:size-[15px]" /> <span className="hidden sm:inline">Call Now</span>
          </a>
        </nav>
        
        <button
          className="md:hidden text-stone-700 hover:text-emerald-700 transition-colors p-1 -mr-1"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      
      {menuOpen && (
        <div className="md:hidden max-h-[calc(100vh-3.5rem)] overflow-y-auto bg-white/98 backdrop-blur-xl border-t border-stone-100 px-4 sm:px-6 py-4 sm:py-6 flex flex-col gap-3 sm:gap-5">
          {nav.map(([key, label]) => (
            <button
              key={key}
              onClick={() => { setPage(key); setMenuOpen(false); window.scrollTo(0, 0); }}
              className={`text-left text-base sm:text-lg tracking-wide font-light py-1 ${
                page === key ? "text-emerald-700" : "text-stone-600"
              }`}
            >
              {label}
            </button>
          ))}
          <a href="tel:+911140001234" className="text-center bg-emerald-700 text-white text-sm sm:text-base px-6 py-3.5 rounded-full hover:bg-emerald-800 transition-colors mt-2">
            Call Now
          </a>
        </div>
      )}
    </header>
  );
}

function Footer({ setPage }) {
  return (
    <footer className="bg-stone-900 text-stone-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 lg:py-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12">
        <div className="sm:col-span-2 lg:col-span-1">
          <p className="font-serif text-2xl sm:text-3xl text-stone-100">Mahika</p>
          <p className="text-[10px] sm:text-xs uppercase tracking-[0.3em] sm:tracking-[0.35em] text-stone-400 mt-1.5">Russian Spa · Aerocity</p>
          <p className="mt-4 sm:mt-5 text-sm text-stone-400 leading-relaxed max-w-xs">
            Twenty-five locations across Delhi NCR, one standard of care.
            Book a session near you and step out lighter than you walked in.
          </p>
        </div>
        
        <div>
          <p className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-stone-400 mb-3 sm:mb-5">Explore</p>
          <div className="flex flex-col gap-2 sm:gap-3 text-sm">
            <button className="text-left hover:text-stone-100 transition-colors w-fit py-1" onClick={() => setPage("home")}>Home</button>
            <button className="text-left hover:text-stone-100 transition-colors w-fit py-1" onClick={() => setPage("services")}>Services</button>
            <button className="text-left hover:text-stone-100 transition-colors w-fit py-1" onClick={() => setPage("locations")}>Locations</button>
          </div>
        </div>
        
        <div>
          <p className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-stone-400 mb-3 sm:mb-5">Contact</p>
          <a href={"tel:+" + WHATSAPP_NUMBER} className="text-sm text-stone-400 flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3 hover:text-stone-100 transition-colors">
            <Phone size={14} className="text-stone-500 flex-shrink-0" /> +91 87969 10363
          </a>
          <a
            href={"https://wa.me/" + WHATSAPP_NUMBER}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-stone-400 flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3 hover:text-stone-100 transition-colors"
          >
            <MessageCircle size={14} className="text-stone-500 flex-shrink-0" /> Chat on WhatsApp
          </a>
          <p className="text-sm text-stone-400 flex items-center gap-2 sm:gap-3"><Clock size={14} className="text-stone-500 flex-shrink-0" /> Open daily, 10 AM – 10 PM</p>
        </div>
        
        <div>
          <p className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-stone-400 mb-3 sm:mb-5">Visit</p>
          <p className="text-sm text-stone-400 flex items-start gap-2 sm:gap-3"><MapPin size={14} className="text-stone-500 flex-shrink-0 mt-0.5" /> 25 branches across Delhi NCR</p>
        </div>
      </div>
      
      <div className="border-t border-stone-800 py-5 sm:py-6 lg:py-7 text-center text-[10px] sm:text-xs text-stone-500 tracking-wide">
        © 2026 Mahika Russian Spa, Aerocity. All rights reserved.
      </div>
    </footer>
  );
}

function HomePage({ setPage }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {/* Hero Section - Reference Inspired */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-[#f5f0eb]">
        {/* Background elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#f5f0eb] via-white to-[#e8f0ed]" />
        <div className="absolute -top-40 -right-40 h-[30rem] sm:h-[40rem] w-[30rem] sm:w-[40rem] rounded-full bg-emerald-100/30 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-[30rem] sm:h-[40rem] w-[30rem] sm:w-[40rem] rounded-full bg-stone-100/40 blur-3xl" />
        
        {/* Decorative oversized text - Hidden on mobile */}
        <div className="absolute bottom-4 right-4 sm:bottom-8 sm:right-8 lg:bottom-16 lg:right-16 opacity-[0.02] sm:opacity-[0.04] select-none pointer-events-none hidden sm:block">
          <span className="font-serif text-[4rem] sm:text-[8rem] lg:text-[14rem] xl:text-[20rem] leading-none text-stone-900 whitespace-nowrap">
            SPA
          </span>
        </div>
        <div className="absolute top-20 left-0 opacity-[0.02] sm:opacity-[0.03] select-none pointer-events-none hidden lg:block">
          <span className="font-serif text-[4rem] sm:text-[7rem] leading-none text-stone-900 tracking-[0.3em] sm:tracking-[0.5em]">
            WELLNESS
          </span>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-28 lg:pt-32 xl:pt-40 pb-10 sm:pb-16 lg:pb-20 xl:pb-28 grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 xl:gap-20 items-center w-full relative z-10">
          {/* Left Content - Editorial Style */}
          <div className="relative order-2 lg:order-1">
            {/* Subtitle */}
            <span className="inline-flex items-center gap-1.5 sm:gap-2 lg:gap-3 rounded-full border border-emerald-200/60 bg-white/80 px-2.5 sm:px-3 lg:px-5 py-1 sm:py-1.5 lg:py-2 text-[8px] xs:text-[9px] sm:text-[10px] lg:text-[11px] uppercase tracking-[0.15em] sm:tracking-[0.2em] lg:tracking-[0.25em] text-emerald-700 backdrop-blur-sm">
              <Sparkles size={10} className="sm:size-[12px] lg:size-[14px]" /> <span className="hidden xs:inline">25 Locations ·</span> Delhi NCR
            </span>

            {/* Main Headline - Mobile Optimized */}
            <h1 className="mt-4 sm:mt-6 lg:mt-8 font-serif text-[2.2rem] xs:text-[2.6rem] sm:text-[3.2rem] md:text-[3.8rem] lg:text-[4.5rem] xl:text-[5.5rem] leading-[1.05] text-stone-900">
              <span className="block">Find Your</span>
              <span className="block italic text-emerald-600">Inner Calm</span>
              <span className="block">Today</span>
            </h1>

            {/* Description with accent line */}
            <div className="mt-4 sm:mt-6 lg:mt-8 flex items-start gap-3 sm:gap-4 lg:gap-6">
              <span className="mt-2 sm:mt-2.5 lg:mt-3 h-px w-8 sm:w-10 lg:w-16 flex-shrink-0 bg-emerald-400/60" />
              <p className="text-sm xs:text-base sm:text-lg leading-relaxed text-stone-600 font-light max-w-sm">
                Therapeutic massage, facials and body rituals across twenty-five
                neighbourhoods — the same trained hands and unhurried pace,
                wherever you find us.
              </p>
            </div>

            {/* CTA Buttons - Mobile Optimized */}
            <div className="mt-6 sm:mt-8 lg:mt-12 flex flex-wrap gap-2.5 sm:gap-3 lg:gap-4">
              <button
                onClick={() => setPage("services")}
                className="group flex flex-1 sm:flex-none items-center justify-center gap-1.5 sm:gap-2 lg:gap-3 rounded-full bg-emerald-700 px-4 xs:px-5 sm:px-6 lg:px-8 py-2.5 xs:py-3 sm:py-3.5 lg:py-4 text-[11px] xs:text-xs sm:text-sm font-medium text-white shadow-xl shadow-emerald-700/25 transition-all duration-300 hover:bg-emerald-800 hover:shadow-2xl hover:shadow-emerald-700/30 active:scale-95"
              >
                View Services
                <ChevronRight size={13} className="sm:size-[14px] lg:size-[16px] transition-transform duration-300 group-hover:translate-x-1" />
              </button>
              <a
                href={"https://wa.me/" + WHATSAPP_NUMBER}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-1 sm:flex-none items-center justify-center gap-1.5 sm:gap-2 lg:gap-3 rounded-full border border-stone-200 bg-white/80 px-4 xs:px-5 sm:px-6 lg:px-8 py-2.5 xs:py-3 sm:py-3.5 lg:py-4 text-[11px] xs:text-xs sm:text-sm font-medium text-stone-700 backdrop-blur-sm transition-all duration-300 hover:bg-white hover:shadow-lg active:scale-95"
              >
                <MessageCircle size={13} className="sm:size-[14px] lg:size-[16px]" /> Book on WhatsApp
              </a>
            </div>

            {/* Rating/Rewards - Mobile Optimized */}
            <div className="mt-6 sm:mt-8 lg:mt-12 flex flex-wrap items-center gap-3 sm:gap-4 lg:gap-8">
              <div className="flex items-center gap-1 sm:gap-1.5 lg:gap-2">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={12} className="sm:size-[14px] lg:size-[16px] fill-emerald-600 text-emerald-600" />
                  ))}
                </div>
                <span className="text-xs sm:text-sm font-medium text-stone-700">4.9</span>
              </div>
              <span className="text-stone-300 hidden xs:inline">|</span>
              <div className="flex items-center gap-1 sm:gap-1.5 lg:gap-2">
                <Award size={12} className="sm:size-[14px] lg:size-[16px] text-emerald-600" />
                <span className="text-[10px] xs:text-xs sm:text-sm text-stone-600">12k+ sessions a year</span>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="relative mx-auto w-full max-w-[280px] xs:max-w-sm sm:max-w-md lg:max-w-none order-1 lg:order-2">
            {/* Frame outline - Hidden on small screens */}
            <div className="absolute -right-2 -top-3 sm:-right-4 sm:-top-6 hidden md:block h-[105%] w-[88%] sm:w-[92%] lg:w-[95%] rounded-t-[8rem] sm:rounded-t-[10rem] lg:rounded-t-[14rem] rounded-b-3xl border border-emerald-200/50" />

            {/* Main Image */}
            <div className="relative aspect-[3/4] overflow-hidden rounded-t-[8rem] sm:rounded-t-[10rem] lg:rounded-t-[14rem] rounded-b-2xl sm:rounded-b-3xl shadow-2xl shadow-stone-900/10 ring-1 ring-stone-200/50">
              <img
                src="https://images.unsplash.com/photo-1620733723572-11c53f73a416?q=80&w=1200&auto=format&fit=crop"
                alt="Candlelit spa treatment room"
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                fetchPriority="high"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/30 via-transparent to-transparent" />
            </div>

            {/* Floating Accent Images - Hidden on smaller screens */}
            <div className="absolute -left-3 sm:-left-4 lg:-left-8 top-16 sm:top-20 lg:top-28 hidden sm:block h-20 sm:h-28 lg:h-44 w-14 sm:w-20 lg:w-36 overflow-hidden rounded-xl sm:rounded-2xl ring-4 ring-white shadow-xl shadow-stone-900/15">
              <img
                src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=500&auto=format&fit=crop"
                alt="Massage oils and fresh flowers"
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>

            <div className="absolute -right-2 sm:-right-3 lg:-right-6 bottom-16 sm:bottom-20 lg:bottom-28 hidden sm:block h-16 sm:h-20 lg:h-32 w-20 sm:w-24 lg:w-40 overflow-hidden rounded-xl sm:rounded-2xl ring-4 ring-white shadow-xl shadow-stone-900/15">
              <img
                src="https://images.unsplash.com/photo-1595871151608-bc7abd1caca3?q=80&w=500&auto=format&fit=crop"
                alt="Vanity table with mirror"
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>

            {/* Price Tag - Mobile Optimized */}
            <div className="absolute -left-1.5 sm:-left-2 lg:-left-5 bottom-4 sm:bottom-5 lg:bottom-8 rounded-xl sm:rounded-2xl bg-emerald-700 px-2.5 sm:px-3 lg:px-5 xl:px-7 py-2 sm:py-2.5 lg:py-4 xl:py-5 text-white shadow-2xl shadow-emerald-700/30">
              <p className="text-[7px] xs:text-[8px] sm:text-[9px] lg:text-[10px] uppercase tracking-[0.1em] sm:tracking-[0.15em] lg:tracking-[0.2em] opacity-80 font-light">Sessions from</p>
              <p className="mt-0.5 sm:mt-1 font-serif text-lg sm:text-xl lg:text-3xl leading-none">₹999</p>
            </div>

            {/* Hours Chip - Mobile Optimized */}
            <div className="absolute -top-1.5 sm:-top-2 lg:-top-4 right-1.5 sm:right-2 lg:right-4 xl:right-10 flex items-center gap-1 sm:gap-1.5 lg:gap-3 rounded-full bg-white/95 px-2 sm:px-2.5 lg:px-4 py-1 sm:py-1.5 lg:py-2.5 shadow-lg shadow-stone-900/8 backdrop-blur-sm">
              <Clock size={10} className="sm:size-[12px] lg:size-[15px] text-emerald-600" />
              <span className="text-[7px] xs:text-[8px] sm:text-[9px] lg:text-xs tracking-wide text-stone-600 whitespace-nowrap">10 AM – 10 PM</span>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section - Mobile Optimized */}
      <section className="py-10 sm:py-16 lg:py-20 xl:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6 sm:mb-8 lg:mb-10 xl:mb-14">
            <p className="text-emerald-600 text-[9px] xs:text-[10px] sm:text-xs lg:text-sm tracking-[0.15em] sm:tracking-[0.2em] lg:tracking-[0.25em] uppercase font-light mb-1.5 sm:mb-2 lg:mb-3">What Our Guests Say</p>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-stone-900">Experiences worth sharing</h2>
            <div className="mt-2 sm:mt-3 lg:mt-4 flex justify-center">
              <div className="w-8 sm:w-10 lg:w-12 h-px bg-emerald-200" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
            {TESTIMONIALS.map((testimonial, idx) => (
              <div 
                key={idx}
                className="group bg-stone-50/80 rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 border border-stone-100 hover:border-emerald-200/50 transition-all duration-500 hover:shadow-xl hover:shadow-emerald-900/5 active:scale-[0.98]"
                style={{ animationDelay: `${idx * 150}ms` }}
              >
                <div className="flex items-center gap-2.5 sm:gap-3 mb-2.5 sm:mb-3 lg:mb-4">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-serif text-xs sm:text-sm font-medium flex-shrink-0">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm font-medium text-stone-800 truncate">{testimonial.name}</p>
                    <p className="text-[7px] xs:text-[8px] sm:text-[9px] lg:text-[10px] uppercase tracking-wide text-stone-400 truncate">{testimonial.location}</p>
                  </div>
                </div>
                
                <div className="flex gap-0.5 mb-2 sm:mb-2.5 lg:mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={10} className="sm:size-[12px] lg:size-[14px]"
                      className={i < Math.floor(testimonial.rating) 
                        ? "fill-emerald-600 text-emerald-600" 
                        : "fill-stone-200 text-stone-200"
                      } 
                    />
                  ))}
                  {testimonial.rating % 1 !== 0 && (
                    <Star size={10} className="sm:size-[12px] lg:size-[14px] fill-emerald-600/50 text-emerald-600/50" />
                  )}
                </div>
                
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-light">
                  "{testimonial.text}"
                </p>
                
                <p className="mt-2 sm:mt-2.5 lg:mt-3 text-[7px] xs:text-[8px] sm:text-[9px] lg:text-[10px] uppercase tracking-wider text-emerald-600/60 font-light truncate">
                  {testimonial.treatment}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section - Mobile Optimized */}
      <section className="py-10 sm:py-16 lg:py-20 border-y border-stone-200/60 bg-stone-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 text-center">
          <div className="group">
            <div className="mx-auto w-12 h-12 sm:w-13 sm:h-13 lg:w-14 lg:h-14 rounded-full bg-emerald-100/60 flex items-center justify-center mb-2 sm:mb-3 lg:mb-4 group-hover:bg-emerald-100 transition-colors">
              <Sparkles className="text-emerald-600" size={20} className="sm:size-[22px] lg:size-[26px]" />
            </div>
            <p className="font-serif text-base sm:text-lg lg:text-xl text-stone-800">Certified therapists</p>
            <p className="text-xs sm:text-sm text-stone-400 mt-0.5 sm:mt-1 lg:mt-1.5 font-light">Trained in classical and modern technique</p>
          </div>
          <div className="group">
            <div className="mx-auto w-12 h-12 sm:w-13 sm:h-13 lg:w-14 lg:h-14 rounded-full bg-emerald-100/60 flex items-center justify-center mb-2 sm:mb-3 lg:mb-4 group-hover:bg-emerald-100 transition-colors">
              <Droplets className="text-emerald-600" size={20} className="sm:size-[22px] lg:size-[26px]" />
            </div>
            <p className="font-serif text-base sm:text-lg lg:text-xl text-stone-800">Pure, warmed oils</p>
            <p className="text-xs sm:text-sm text-stone-400 mt-0.5 sm:mt-1 lg:mt-1.5 font-light">No synthetic fragrance, ever</p>
          </div>
          <div className="group">
            <div className="mx-auto w-12 h-12 sm:w-13 sm:h-13 lg:w-14 lg:h-14 rounded-full bg-emerald-100/60 flex items-center justify-center mb-2 sm:mb-3 lg:mb-4 group-hover:bg-emerald-100 transition-colors">
              <Flower2 className="text-emerald-600" size={20} className="sm:size-[22px] lg:size-[26px]" />
            </div>
            <p className="font-serif text-base sm:text-lg lg:text-xl text-stone-800">Private, calm rooms</p>
            <p className="text-xs sm:text-sm text-stone-400 mt-0.5 sm:mt-1 lg:mt-1.5 font-light">Every branch, the same standard</p>
          </div>
        </div>
      </section>

      {/* Signature Treatments - Mobile Optimized */}
      <section className="py-10 sm:py-16 lg:py-20 xl:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 sm:mb-8 lg:mb-10 xl:mb-12">
            <div>
              <p className="text-emerald-600 text-[9px] xs:text-[10px] sm:text-xs lg:text-sm tracking-[0.15em] sm:tracking-[0.2em] lg:tracking-[0.25em] uppercase font-light mb-1.5 sm:mb-2 lg:mb-3">Signature Treatments</p>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-stone-900">A few favourites to start with</h2>
            </div>
            <button onClick={() => setPage("services")} className="hidden sm:flex items-center gap-2 text-sm text-stone-500 hover:text-emerald-700 transition-colors group mt-3 sm:mt-0">
              See all services <ChevronRight size={15} className="transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-8">
            {SERVICES.slice(0, 3).map((s, idx) => (
              <article key={s.name} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl aspect-[4/5] shadow-md hover:shadow-2xl transition-shadow duration-500">
                  <img
                    src={s.img}
                    alt={s.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/70 via-stone-900/20 to-transparent" />
                  <span className="absolute top-3 sm:top-4 lg:top-5 right-3 sm:right-4 lg:right-5 rounded-full bg-white/95 backdrop-blur-sm px-2.5 sm:px-3 lg:px-4 py-1 sm:py-1.5 lg:py-2 text-sm sm:text-base lg:text-lg font-serif text-emerald-700 shadow-lg">
                    {s.price}
                  </span>
                  <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4 lg:p-6">
                    <h3 className="font-serif text-base sm:text-xl lg:text-2xl text-white leading-snug">{s.name}</h3>
                    <p className="text-[9px] sm:text-xs text-stone-200/80 mt-1 sm:mt-1.5 lg:mt-2 tracking-wide font-light">{s.duration}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery - Mobile Optimized */}
      <section className="pb-10 sm:pb-16 lg:pb-20 xl:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-emerald-600 text-[9px] xs:text-[10px] sm:text-xs lg:text-sm tracking-[0.15em] sm:tracking-[0.2em] lg:tracking-[0.25em] uppercase font-light mb-1.5 sm:mb-2 lg:mb-3">Inside Mahika</p>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-stone-900 mb-4 sm:mb-6 lg:mb-8 xl:mb-12">A look around our rooms</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-1.5 sm:gap-2 lg:gap-4">
            {GALLERY.map((g, i) => (
              <figure
                key={g.src}
                className={`group relative overflow-hidden rounded-lg sm:rounded-xl lg:rounded-2xl ${
                  i === 0 ? "col-span-2 md:row-span-2 aspect-[4/3] md:aspect-square" : "aspect-[4/5]"
                }`}
              >
                <img
                  src={g.src}
                  alt={g.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <figcaption className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 lg:p-5 text-[8px] xs:text-[9px] sm:text-xs lg:text-sm text-white translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 font-light">
                  {g.alt}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial - Existing - Mobile Optimized */}
      <section className="bg-stone-900 py-10 sm:py-16 lg:py-20 xl:py-28">
        <div className="max-w-3xl sm:max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Star className="mx-auto text-emerald-400/60 mb-3 sm:mb-4 lg:mb-6" size={20} className="sm:size-[24px] lg:size-[32px]" />
          <p className="font-serif text-lg sm:text-2xl lg:text-3xl xl:text-4xl text-stone-100 leading-relaxed">
            "I stopped in during a work trip through Aerocity, expecting nothing
            more than a quick massage. Left an hour later completely unwound."
          </p>
          <p className="text-stone-400 text-xs sm:text-sm mt-4 sm:mt-5 lg:mt-8 tracking-wide font-light">Priya M. — Aerocity Branch</p>
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
    <div className="animate-fadeIn">
      {/* Banner - Mobile Optimized */}
      <section className="relative overflow-hidden min-h-[40vh] sm:min-h-[50vh] flex items-center">
        <img
          src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1800&auto=format&fit=crop"
          alt="Massage oils and fresh flowers"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950/92 via-stone-950/80 to-stone-900/50" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-28 lg:pt-32 xl:pt-40 pb-10 sm:pb-14 lg:pb-16 xl:pb-20">
          <span className="inline-flex items-center gap-1.5 sm:gap-2 lg:gap-3 rounded-full border border-stone-400/20 bg-white/5 px-2.5 sm:px-3 lg:px-5 py-1 sm:py-1.5 lg:py-2 text-[9px] sm:text-[10px] lg:text-[11px] uppercase tracking-[0.15em] sm:tracking-[0.2em] lg:tracking-[0.25em] text-stone-300 backdrop-blur-sm">
            <Sparkles size={10} className="sm:size-[12px] lg:size-[13px]" /> Our Menu
          </span>
          <h1 className="mt-4 sm:mt-5 lg:mt-6 xl:mt-8 font-serif text-[2rem] sm:text-[2.8rem] lg:text-[4rem] xl:text-[5rem] leading-[1.05] text-white max-w-2xl lg:max-w-3xl">
            Treatments, <span className="italic text-emerald-300">priced simply.</span>
          </h1>
          <p className="mt-3 sm:mt-4 lg:mt-5 xl:mt-6 text-stone-300 text-sm sm:text-base lg:text-lg leading-relaxed max-w-lg lg:max-w-xl font-light">
            Every treatment below is available at all twenty-five branches. Prices
            are per session and include a short consultation before we begin.
          </p>
        </div>
      </section>

      {/* Filter - Mobile Optimized */}
      <div className="sticky top-14 sm:top-20 lg:top-24 z-30 border-b border-stone-200/60 bg-white/92 backdrop-blur-xl shadow-sm">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2.5 sm:py-3 lg:py-4 flex items-center justify-between gap-3 sm:gap-4 lg:gap-6">
          <div className="flex gap-1 sm:gap-1.5 lg:gap-2 overflow-x-auto no-scrollbar -mx-2 px-2">
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

      {/* Treatment Cards - Mobile Optimized */}
      <section className="py-10 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
            {shown.map((s) => (
              <article key={s.name} className="group flex flex-col">
                <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl aspect-[4/3] shadow-md hover:shadow-2xl transition-shadow duration-500">
                  <img
                    src={s.img}
                    alt={s.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <span className="absolute left-2.5 sm:left-3 lg:left-5 top-2.5 sm:top-3 lg:top-5 rounded-full bg-white/90 backdrop-blur-sm px-2 sm:px-2.5 lg:px-4 py-0.5 sm:py-1 lg:py-1.5 text-[8px] sm:text-[9px] lg:text-[11px] uppercase tracking-wider text-emerald-700 font-medium">
                    {s.tag}
                  </span>
                </div>

                <div className="relative -mt-4 sm:-mt-5 lg:-mt-6 mx-2.5 sm:mx-3 lg:mx-5 rounded-xl sm:rounded-2xl bg-white px-3 sm:px-4 lg:px-5 py-2.5 sm:py-3 lg:py-4 shadow-lg shadow-stone-900/8 flex items-baseline justify-between gap-2 sm:gap-3 lg:gap-4">
                  <div className="flex items-center gap-1 sm:gap-1.5 lg:gap-2 text-stone-400 text-[9px] sm:text-[10px] lg:text-xs tracking-wide font-light">
                    <Clock size={10} className="sm:size-[11px] lg:size-[13px]" /> {s.duration}
                  </div>
                  <p className="font-serif text-lg sm:text-xl lg:text-2xl text-emerald-700 whitespace-nowrap">{s.price}</p>
                </div>

                <h2 className="mt-3 sm:mt-4 lg:mt-5 xl:mt-6 font-serif text-lg sm:text-xl lg:text-2xl text-stone-900 leading-snug">{s.name}</h2>
                <p className="mt-1 sm:mt-1.5 lg:mt-2 text-xs sm:text-sm text-stone-500 leading-relaxed flex-1 font-light">{s.desc}</p>

                <button
                  onClick={() => { setPage("locations"); window.scrollTo(0, 0); }}
                  className="mt-3 sm:mt-4 lg:mt-5 xl:mt-6 inline-flex items-center gap-1 sm:gap-1.5 lg:gap-2 text-xs sm:text-sm text-stone-500 hover:text-emerald-700 transition-colors group w-fit touch-manipulation"
                >
                  Book this treatment <ChevronRight size={13} className="sm:size-[14px] lg:size-[15px] transition-transform group-hover:translate-x-0.5" />
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Ritual - Mobile Optimized */}
      <section className="bg-stone-50/80 border-y border-stone-200/60 py-10 sm:py-16 lg:py-20 xl:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-emerald-600 text-[9px] xs:text-[10px] sm:text-xs lg:text-sm tracking-[0.15em] sm:tracking-[0.2em] lg:tracking-[0.25em] uppercase font-light mb-1.5 sm:mb-2 lg:mb-3">The Ritual</p>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-stone-900 mb-5 sm:mb-6 lg:mb-8 xl:mb-12">How a session goes</h2>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
            {RITUAL_STEPS.map(([n, title, body]) => (
              <div key={n} className="group">
                <p className="font-serif text-3xl sm:text-4xl lg:text-6xl text-emerald-200/80 group-hover:text-emerald-300/80 transition-colors">{n}</p>
                <p className="mt-2 sm:mt-3 lg:mt-4 xl:mt-5 font-serif text-base sm:text-lg lg:text-xl text-stone-800">{title}</p>
                <p className="mt-1 sm:mt-1.5 lg:mt-2 text-xs sm:text-sm text-stone-500 leading-relaxed font-light">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA - Mobile Optimized */}
      <section className="py-10 sm:py-16 lg:py-20 xl:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-stone-900 px-5 sm:px-6 lg:px-12 xl:px-16 py-8 sm:py-10 lg:py-14 xl:py-20">
            <div className="absolute -top-16 -right-12 sm:-top-20 sm:-right-16 h-48 sm:h-60 lg:h-80 w-48 sm:w-60 lg:w-80 rounded-full bg-emerald-600/15 blur-3xl" />
            <div className="absolute -bottom-12 -left-12 sm:-bottom-16 sm:-left-16 h-48 sm:h-60 lg:h-80 w-48 sm:w-60 lg:w-80 rounded-full bg-emerald-700/10 blur-3xl" />
            
            <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-5 sm:gap-6 lg:gap-10">
              <div>
                <h2 className="font-serif text-xl sm:text-2xl lg:text-3xl xl:text-4xl text-white">Not sure what you need?</h2>
                <p className="mt-1.5 sm:mt-2 lg:mt-3 xl:mt-4 text-stone-300 max-w-md leading-relaxed font-light text-sm sm:text-base">
                  Call your nearest branch and describe how you're feeling — we'll recommend a treatment and hold a slot for you.
                </p>
              </div>
              <div className="flex flex-wrap gap-2.5 sm:gap-3 lg:gap-4">
                <a
                  href="tel:+911140001234"
                  className="flex flex-1 sm:flex-none items-center justify-center gap-1.5 sm:gap-2 lg:gap-3 whitespace-nowrap rounded-full bg-emerald-600 px-4 sm:px-5 lg:px-8 py-2.5 sm:py-3 lg:py-4 text-xs sm:text-sm font-medium text-white transition-all duration-300 hover:bg-emerald-500 hover:shadow-lg hover:shadow-emerald-600/25 active:scale-95"
                >
                  <Phone size={13} className="sm:size-[14px] lg:size-[15px]" /> <span className="hidden xs:inline">+91 11 4000 1234</span>
                </a>
                <button
                  onClick={() => { setPage("locations"); window.scrollTo(0, 0); }}
                  className="flex flex-1 sm:flex-none items-center justify-center whitespace-nowrap rounded-full border border-white/20 bg-white/5 px-4 sm:px-5 lg:px-8 py-2.5 sm:py-3 lg:py-4 text-xs sm:text-sm font-medium text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/15 active:scale-95"
                >
                  Find a branch
                </button>
              </div>
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
    const win = window.open(url, "_blank", "noopener,noreferrer");
    if (!win) window.location.href = url;
    setSent(true);
  };

  return (
    <div className="animate-fadeIn">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-28 lg:pt-32 xl:pt-40 pb-5 sm:pb-6 lg:pb-8 xl:pb-10">
        <p className="text-emerald-600 text-[9px] xs:text-[10px] sm:text-xs lg:text-sm tracking-[0.15em] sm:tracking-[0.2em] lg:tracking-[0.25em] uppercase font-light mb-1.5 sm:mb-2 lg:mb-3">Find Us</p>
        <h1 className="font-serif text-2xl sm:text-[2.2rem] lg:text-[3.5rem] xl:text-[4.5rem] leading-tight text-stone-900 mb-2 sm:mb-3 lg:mb-4">25 branches across Delhi NCR</h1>
        <p className="text-stone-500 text-sm sm:text-base max-w-xl font-light">
          Tap a neighbourhood to select your nearest branch, then send us your
          details on WhatsApp — we'll confirm a slot within the hour.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 sm:pb-16 lg:pb-20 xl:pb-28 grid lg:grid-cols-5 gap-6 sm:gap-8 lg:gap-10 xl:gap-12">
        <div className="lg:col-span-3">
          <div className="flex flex-wrap gap-1 sm:gap-1.5 lg:gap-3">
            {LOCATIONS.map((loc) => (
              <button
                key={loc}
                onClick={() => setSelected(loc)}
                className={`rounded-full border px-2 sm:px-2.5 lg:px-4 py-1 sm:py-1.5 lg:py-2.5 text-[10px] sm:text-xs lg:text-sm transition-all duration-300 touch-manipulation ${
                  selected === loc
                    ? "bg-emerald-700 text-white border-emerald-700 shadow-lg shadow-emerald-700/15"
                    : "border-stone-200 text-stone-600 hover:border-stone-300 hover:text-stone-800"
                }`}
              >
                {loc}
              </button>
            ))}
          </div>
          
          <img
            src="https://images.unsplash.com/photo-1583417657209-d3dd44dc9c09?q=80&w=1200&auto=format&fit=crop"
            alt="Spa reception ambience"
            className="mt-4 sm:mt-6 lg:mt-8 xl:mt-10 w-full rounded-xl sm:rounded-2xl object-cover h-32 sm:h-40 lg:h-48 xl:h-72 shadow-md"
          />
          
          <div className="mt-2.5 sm:mt-3 lg:mt-4 grid grid-cols-3 gap-1.5 sm:gap-2 lg:gap-4">
            <img
              src="https://images.unsplash.com/photo-1611920630418-f587fdc3bf94?q=80&w=500&auto=format&fit=crop"
              alt="Spa room decor"
              className="w-full rounded-lg sm:rounded-xl object-cover h-14 sm:h-16 lg:h-20 xl:h-28"
            />
            <img
              src="https://images.unsplash.com/photo-1630835425197-50feeba99ecd?q=80&w=500&auto=format&fit=crop"
              alt="Private treatment room"
              className="w-full rounded-lg sm:rounded-xl object-cover h-14 sm:h-16 lg:h-20 xl:h-28"
            />
            <img
              src="https://images.unsplash.com/photo-1652903761255-4fbf11cff931?q=80&w=500&auto=format&fit=crop"
              alt="Spa bathroom with wooden walls"
              className="w-full rounded-lg sm:rounded-xl object-cover h-14 sm:h-16 lg:h-20 xl:h-28"
            />
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="lg:sticky lg:top-20 sm:top-24 lg:top-24 xl:top-28 rounded-2xl sm:rounded-3xl border border-stone-200 bg-white p-4 sm:p-5 lg:p-7 xl:p-9 shadow-lg shadow-stone-900/5">
            <p className="font-serif text-lg sm:text-xl lg:text-2xl text-stone-900 mb-0.5 sm:mb-1">Book at {selected}</p>
            <p className="text-xs sm:text-sm text-stone-400 font-light mb-3 sm:mb-4 lg:mb-6">Open daily, 10 AM – 10 PM</p>
            
            {sent ? (
              <div className="text-center py-4 sm:py-6 lg:py-8">
                <span className="mx-auto mb-3 sm:mb-4 lg:mb-5 flex h-10 sm:h-12 lg:h-16 w-10 sm:w-12 lg:w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                  <MessageCircle size={20} className="sm:size-[24px] lg:size-[28px]" />
                </span>
                <p className="font-serif text-lg sm:text-xl text-emerald-700 mb-1 sm:mb-1.5 lg:mb-2">WhatsApp opened</p>
                <p className="text-xs sm:text-sm text-stone-500 leading-relaxed font-light">
                  Your details for the {selected} branch are ready in WhatsApp — just hit send and we'll confirm your slot.
                </p>
                <a
                  href={waLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 sm:mt-4 lg:mt-6 inline-flex items-center justify-center gap-1.5 sm:gap-2 lg:gap-2.5 rounded-lg bg-emerald-600 px-3.5 sm:px-4 lg:px-6 py-2 sm:py-2.5 lg:py-3 text-xs sm:text-sm font-medium text-white transition-all duration-300 hover:bg-emerald-700 hover:shadow-lg hover:shadow-emerald-600/20 active:scale-95"
                >
                  <MessageCircle size={12} className="sm:size-[14px] lg:size-[16px]" /> Open WhatsApp again
                </a>
                <button
                  onClick={() => setSent(false)}
                  className="mt-3 sm:mt-4 lg:mt-5 block mx-auto text-xs sm:text-sm text-emerald-700 border-b border-emerald-200 pb-0.5 hover:border-emerald-600 transition-colors touch-manipulation"
                >
                  Send another request
                </button>
              </div>
            ) : (
              <form onSubmit={submit} className="flex flex-col gap-3 sm:gap-4 lg:gap-5">
                <div>
                  <label className="text-[9px] xs:text-[10px] sm:text-xs text-stone-400 tracking-wide uppercase font-light">Your name</label>
                  <input
                    value={form.name}
                    onChange={(e) => { setForm({ ...form, name: e.target.value }); setError(""); }}
                    className="w-full mt-0.5 sm:mt-1 lg:mt-1.5 px-3 sm:px-4 lg:px-5 py-2 sm:py-2.5 lg:py-3.5 rounded-lg sm:rounded-xl border border-stone-200 bg-stone-50/50 focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:border-transparent transition-all text-sm sm:text-base touch-manipulation"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label className="text-[9px] xs:text-[10px] sm:text-xs text-stone-400 tracking-wide uppercase font-light">Phone number</label>
                  <input
                    value={form.phone}
                    onChange={(e) => { setForm({ ...form, phone: e.target.value }); setError(""); }}
                    className="w-full mt-0.5 sm:mt-1 lg:mt-1.5 px-3 sm:px-4 lg:px-5 py-2 sm:py-2.5 lg:py-3.5 rounded-lg sm:rounded-xl border border-stone-200 bg-stone-50/50 focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:border-transparent transition-all text-sm sm:text-base touch-manipulation"
                    placeholder="10-digit mobile number"
                  />
                </div>
                <div>
                  <label className="text-[9px] xs:text-[10px] sm:text-xs text-stone-400 tracking-wide uppercase font-light">Treatment</label>
                  <select
                    value={form.service}
                    onChange={(e) => setForm({ ...form, service: e.target.value })}
                    className="w-full mt-0.5 sm:mt-1 lg:mt-1.5 px-3 sm:px-4 lg:px-5 py-2 sm:py-2.5 lg:py-3.5 rounded-lg sm:rounded-xl border border-stone-200 bg-stone-50/50 focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:border-transparent transition-all text-sm sm:text-base appearance-none touch-manipulation"
                  >
                    {SERVICES.map((s) => (
                      <option key={s.name} value={s.name}>
                        {s.name} · {s.price}
                      </option>
                    ))}
                  </select>
                </div>
                {error && <p className="text-[10px] sm:text-xs text-rose-600 -mt-1.5 sm:-mt-2 lg:-mt-2.5">{error}</p>}
                <button
                  type="submit"
                  className="mt-0.5 sm:mt-1 lg:mt-2 flex items-center justify-center gap-1.5 sm:gap-2 lg:gap-2.5 bg-emerald-600 text-white py-2.5 sm:py-3 lg:py-4 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 hover:bg-emerald-700 hover:shadow-lg hover:shadow-emerald-600/20 active:scale-95 touch-manipulation"
                >
                  <MessageCircle size={13} className="sm:size-[15px] lg:size-[17px]" /> Send on WhatsApp
                </button>
                <p className="text-[9px] xs:text-[10px] sm:text-[11px] text-stone-400 text-center leading-relaxed font-light">
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
  const [showLoading, setShowLoading] = useState(true);

  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-stone-800 font-sans antialiased">
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes expand {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        @media (min-width: 480px) {
          .xs\\:inline { display: inline; }
        }
        @media (max-width: 479px) {
          .xs\\:inline { display: none; }
        }
        .touch-manipulation {
          touch-action: manipulation;
        }
      `}</style>

      {/* Loading Screen */}
      <LoadingScreen onComplete={() => setShowLoading(false)} />

      {/* Main Content */}
      <div className={showLoading ? 'hidden' : ''}>
        <Header page={page} setPage={setPage} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        {page === "home" && <HomePage setPage={setPage} />}
        {page === "services" && <ServicesPage setPage={setPage} />}
        {page === "locations" && <LocationsPage />}
        <Footer setPage={setPage} />
      </div>
    </div>
  );
}