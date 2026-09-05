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
      <div className="text-center">
        <div className="relative">
          {/* Decorative line */}
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-px bg-stone-300" />
          
          {/* Brand name with letter-by-letter animation */}
          <div className="font-serif text-5xl md:text-7xl tracking-tight text-stone-900">
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
            <span className="inline-block mx-2 text-amber-700 animate-[fadeUp_0.6s_ease-out_forwards] opacity-0" style={{ animationDelay: '0.4s' }}>
              ·
            </span>
            <span className="inline-block text-amber-700 animate-[fadeUp_0.6s_ease-out_forwards] opacity-0" style={{ animationDelay: '0.45s' }}>
              R
            </span>
            <span className="inline-block text-amber-700 animate-[fadeUp_0.6s_ease-out_forwards] opacity-0" style={{ animationDelay: '0.5s' }}>
              u
            </span>
            <span className="inline-block text-amber-700 animate-[fadeUp_0.6s_ease-out_forwards] opacity-0" style={{ animationDelay: '0.55s' }}>
              s
            </span>
            <span className="inline-block text-amber-700 animate-[fadeUp_0.6s_ease-out_forwards] opacity-0" style={{ animationDelay: '0.6s' }}>
              s
            </span>
            <span className="inline-block text-amber-700 animate-[fadeUp_0.6s_ease-out_forwards] opacity-0" style={{ animationDelay: '0.65s' }}>
              i
            </span>
            <span className="inline-block text-amber-700 animate-[fadeUp_0.6s_ease-out_forwards] opacity-0" style={{ animationDelay: '0.7s' }}>
              a
            </span>
            <span className="inline-block text-amber-700 animate-[fadeUp_0.6s_ease-out_forwards] opacity-0" style={{ animationDelay: '0.75s' }}>
              n
            </span>
          </div>
          
          <p className="mt-4 text-xs uppercase tracking-[0.35em] text-stone-400 animate-[fadeUp_0.8s_ease-out_forwards] opacity-0" style={{ animationDelay: '0.9s' }}>
            Aerocity · Delhi NCR
          </p>
          
          {/* Elegant underline animation */}
          <div className="mt-6 flex justify-center">
            <div className="w-16 h-px bg-stone-200 animate-[expand_1.2s_ease-out_forwards] origin-left" />
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
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between h-20 lg:h-24">
        <button 
          onClick={() => { setPage("home"); setMenuOpen(false); window.scrollTo(0, 0); }} 
          className="text-left group"
        >
          <span className="font-serif text-2xl lg:text-3xl tracking-tight text-emerald-800">Mahika</span>
          <span className="font-serif text-2xl lg:text-3xl text-stone-800"> Russian Spa</span>
          <span className="block text-[10px] lg:text-[11px] uppercase tracking-[0.35em] text-stone-400 mt-0.5 font-light">Aerocity · Delhi NCR</span>
        </button>
        
        <nav className="hidden lg:flex items-center gap-12">
          {nav.map(([key, label]) => (
            <button
              key={key}
              onClick={() => { setPage(key); window.scrollTo(0, 0); }}
              className={`text-sm tracking-[0.15em] uppercase font-light relative pb-1 transition-colors duration-300 ${
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
            className="flex items-center gap-2.5 rounded-full bg-emerald-700 px-6 py-3 text-sm text-white transition-all duration-300 hover:bg-emerald-800 hover:shadow-lg hover:shadow-emerald-700/20"
          >
            <Phone size={15} /> Call Now
          </a>
        </nav>
        
        <button
          className="lg:hidden text-stone-700 hover:text-emerald-700 transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>
      
      {menuOpen && (
        <div className="lg:hidden max-h-[calc(100vh-5rem)] overflow-y-auto bg-white/98 backdrop-blur-xl border-t border-stone-100 px-6 py-6 flex flex-col gap-5">
          {nav.map(([key, label]) => (
            <button
              key={key}
              onClick={() => { setPage(key); setMenuOpen(false); window.scrollTo(0, 0); }}
              className={`text-left text-base tracking-wide font-light ${
                page === key ? "text-emerald-700" : "text-stone-600"
              }`}
            >
              {label}
            </button>
          ))}
          <a href="tel:+911140001234" className="text-center bg-emerald-700 text-white text-sm px-6 py-3.5 rounded-full hover:bg-emerald-800 transition-colors">
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
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-20 grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
        <div className="lg:col-span-1">
          <p className="font-serif text-3xl text-stone-100">Mahika</p>
          <p className="text-xs uppercase tracking-[0.35em] text-stone-400 mt-1.5">Russian Spa · Aerocity</p>
          <p className="mt-5 text-sm text-stone-400 leading-relaxed max-w-xs">
            Twenty-five locations across Delhi NCR, one standard of care.
            Book a session near you and step out lighter than you walked in.
          </p>
        </div>
        
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-stone-400 mb-5">Explore</p>
          <div className="flex flex-col gap-3 text-sm">
            <button className="text-left hover:text-stone-100 transition-colors w-fit" onClick={() => setPage("home")}>Home</button>
            <button className="text-left hover:text-stone-100 transition-colors w-fit" onClick={() => setPage("services")}>Services</button>
            <button className="text-left hover:text-stone-100 transition-colors w-fit" onClick={() => setPage("locations")}>Locations</button>
          </div>
        </div>
        
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-stone-400 mb-5">Contact</p>
          <a href={"tel:+" + WHATSAPP_NUMBER} className="text-sm text-stone-400 flex items-center gap-3 mb-3 hover:text-stone-100 transition-colors">
            <Phone size={14} className="text-stone-500" /> +91 87969 10363
          </a>
          <a
            href={"https://wa.me/" + WHATSAPP_NUMBER}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-stone-400 flex items-center gap-3 mb-3 hover:text-stone-100 transition-colors"
          >
            <MessageCircle size={14} className="text-stone-500" /> Chat on WhatsApp
          </a>
          <p className="text-sm text-stone-400 flex items-center gap-3"><Clock size={14} className="text-stone-500" /> Open daily, 10 AM – 10 PM</p>
        </div>
        
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-stone-400 mb-5">Visit</p>
          <p className="text-sm text-stone-400 flex items-start gap-3"><MapPin size={14} className="text-stone-500 mt-0.5" /> 25 branches across Delhi NCR</p>
        </div>
      </div>
      
      <div className="border-t border-stone-800 py-7 text-center text-xs text-stone-500 tracking-wide">
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
        <div className="absolute -top-40 -right-40 h-[40rem] w-[40rem] rounded-full bg-emerald-100/30 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-[40rem] w-[40rem] rounded-full bg-stone-100/40 blur-3xl" />
        
        {/* Decorative oversized text - reference style */}
        <div className="absolute bottom-8 right-8 lg:bottom-16 lg:right-16 opacity-[0.04] select-none pointer-events-none">
          <span className="font-serif text-[12rem] lg:text-[20rem] leading-none text-stone-900 whitespace-nowrap">
            SPA
          </span>
        </div>
        <div className="absolute top-24 left-0 opacity-[0.03] select-none pointer-events-none hidden lg:block">
          <span className="font-serif text-[10rem] leading-none text-stone-900 tracking-[0.5em]">
            WELLNESS
          </span>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-32 lg:pt-40 pb-20 lg:pb-28 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center w-full relative z-10">
          {/* Left Content - Editorial Style */}
          <div className="relative">
            {/* Subtitle */}
            <span className="inline-flex items-center gap-3 rounded-full border border-emerald-200/60 bg-white/80 px-5 py-2 text-[11px] uppercase tracking-[0.25em] text-emerald-700 backdrop-blur-sm">
              <Sparkles size={14} /> 25 Locations · Delhi NCR
            </span>

            {/* Main Headline - Reference inspired */}
            <h1 className="mt-8 font-serif text-[3rem] sm:text-[4rem] lg:text-[5rem] xl:text-[5.5rem] leading-[1.05] text-stone-900">
              <span className="block">Find Your</span>
              <span className="block italic text-emerald-600">Inner Calm</span>
              <span className="block">Today</span>
            </h1>

            {/* Description with accent line */}
            <div className="mt-8 flex items-start gap-6">
              <span className="mt-3 h-px w-16 flex-shrink-0 bg-emerald-400/60" />
              <p className="max-w-sm text-lg leading-relaxed text-stone-600 font-light">
                Therapeutic massage, facials and body rituals across twenty-five
                neighbourhoods — the same trained hands and unhurried pace,
                wherever you find us.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="mt-12 flex flex-wrap gap-4">
              <button
                onClick={() => setPage("services")}
                className="group flex flex-1 sm:flex-none items-center justify-center gap-3 rounded-full bg-emerald-700 px-8 py-4.5 text-sm font-medium text-white shadow-xl shadow-emerald-700/25 transition-all duration-300 hover:bg-emerald-800 hover:shadow-2xl hover:shadow-emerald-700/30 hover:-translate-y-0.5"
              >
                View Services
                <ChevronRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
              </button>
              <a
                href={"https://wa.me/" + WHATSAPP_NUMBER}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-1 sm:flex-none items-center justify-center gap-3 rounded-full border border-stone-200 bg-white/80 px-8 py-4.5 text-sm font-medium text-stone-700 backdrop-blur-sm transition-all duration-300 hover:bg-white hover:shadow-lg hover:-translate-y-0.5"
              >
                <MessageCircle size={16} /> Book on WhatsApp
              </a>
            </div>

            {/* Rating/Rewards - Reference inspired */}
            <div className="mt-12 flex items-center gap-8">
              <div className="flex items-center gap-2">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="fill-emerald-600 text-emerald-600" />
                  ))}
                </div>
                <span className="text-sm font-medium text-stone-700">4.9</span>
              </div>
              <span className="text-stone-300">|</span>
              <div className="flex items-center gap-2">
                <Award size={16} className="text-emerald-600" />
                <span className="text-sm text-stone-600">12k+ sessions a year</span>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image with Premium Layout */}
          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            {/* Frame outline - reference style */}
            <div className="absolute -right-6 -top-8 hidden h-[105%] w-[95%] rounded-t-[14rem] rounded-b-3xl border border-emerald-200/50 lg:block" />

            {/* Main Image */}
            <div className="relative aspect-[3/4] overflow-hidden rounded-t-[14rem] rounded-b-3xl shadow-2xl shadow-stone-900/10 ring-1 ring-stone-200/50">
              <img
                src="https://images.unsplash.com/photo-1620733723572-11c53f73a416?q=80&w=1200&auto=format&fit=crop"
                alt="Candlelit spa treatment room"
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                fetchPriority="high"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/30 via-transparent to-transparent" />
            </div>

            {/* Floating Accent Images - reference style */}
            <div className="absolute -left-8 top-28 hidden h-44 w-36 overflow-hidden rounded-2xl ring-4 ring-white shadow-xl shadow-stone-900/15 lg:block">
              <img
                src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=500&auto=format&fit=crop"
                alt="Massage oils and fresh flowers"
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>

            <div className="absolute -right-6 bottom-28 hidden h-32 w-40 overflow-hidden rounded-2xl ring-4 ring-white shadow-xl shadow-stone-900/15 lg:block">
              <img
                src="https://images.unsplash.com/photo-1595871151608-bc7abd1caca3?q=80&w=500&auto=format&fit=crop"
                alt="Vanity table with mirror"
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>

            {/* Price Tag - Reference inspired */}
            <div className="absolute -left-3 sm:-left-5 bottom-8 rounded-2xl bg-emerald-700 px-5 sm:px-7 py-4 sm:py-5 text-white shadow-2xl shadow-emerald-700/30">
              <p className="text-[10px] uppercase tracking-[0.2em] opacity-80 font-light">Sessions from</p>
              <p className="mt-1 font-serif text-3xl leading-none">₹999</p>
            </div>

            {/* Hours Chip */}
            <div className="absolute -top-4 right-4 sm:right-10 flex items-center gap-3 rounded-full bg-white/95 px-4 py-2.5 shadow-lg shadow-stone-900/8 backdrop-blur-sm">
              <Clock size={15} className="text-emerald-600" />
              <span className="text-xs tracking-wide text-stone-600">10 AM – 10 PM, daily</span>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section - NEW */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-emerald-600 text-sm tracking-[0.25em] uppercase font-light mb-3">What Our Guests Say</p>
            <h2 className="font-serif text-3xl lg:text-4xl text-stone-900">Experiences worth sharing</h2>
            <div className="mt-4 flex justify-center">
              <div className="w-12 h-px bg-emerald-200" />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TESTIMONIALS.map((testimonial, idx) => (
              <div 
                key={idx}
                className="group bg-stone-50/80 rounded-2xl p-6 border border-stone-100 hover:border-emerald-200/50 transition-all duration-500 hover:shadow-xl hover:shadow-emerald-900/5 hover:-translate-y-1"
                style={{ animationDelay: `${idx * 150}ms` }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-serif text-sm font-medium">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-stone-800">{testimonial.name}</p>
                    <p className="text-[10px] uppercase tracking-wide text-stone-400">{testimonial.location}</p>
                  </div>
                </div>
                
                <div className="flex gap-0.5 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={14} 
                      className={i < Math.floor(testimonial.rating) 
                        ? "fill-emerald-600 text-emerald-600" 
                        : "fill-stone-200 text-stone-200"
                      } 
                    />
                  ))}
                  {testimonial.rating % 1 !== 0 && (
                    <Star size={14} className="fill-emerald-600/50 text-emerald-600/50" />
                  )}
                </div>
                
                <p className="text-sm text-stone-600 leading-relaxed font-light">
                  "{testimonial.text}"
                </p>
                
                <p className="mt-3 text-[10px] uppercase tracking-wider text-emerald-600/60 font-light">
                  {testimonial.treatment}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section - Existing */}
      <section className="py-16 lg:py-20 border-y border-stone-200/60 bg-stone-50/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid sm:grid-cols-3 gap-10 text-center">
          <div className="group">
            <div className="mx-auto w-14 h-14 rounded-full bg-emerald-100/60 flex items-center justify-center mb-4 group-hover:bg-emerald-100 transition-colors">
              <Sparkles className="text-emerald-600" size={26} />
            </div>
            <p className="font-serif text-xl text-stone-800">Certified therapists</p>
            <p className="text-sm text-stone-400 mt-1.5 font-light">Trained in classical and modern technique</p>
          </div>
          <div className="group">
            <div className="mx-auto w-14 h-14 rounded-full bg-emerald-100/60 flex items-center justify-center mb-4 group-hover:bg-emerald-100 transition-colors">
              <Droplets className="text-emerald-600" size={26} />
            </div>
            <p className="font-serif text-xl text-stone-800">Pure, warmed oils</p>
            <p className="text-sm text-stone-400 mt-1.5 font-light">No synthetic fragrance, ever</p>
          </div>
          <div className="group">
            <div className="mx-auto w-14 h-14 rounded-full bg-emerald-100/60 flex items-center justify-center mb-4 group-hover:bg-emerald-100 transition-colors">
              <Flower2 className="text-emerald-600" size={26} />
            </div>
            <p className="font-serif text-xl text-stone-800">Private, calm rooms</p>
            <p className="text-sm text-stone-400 mt-1.5 font-light">Every branch, the same standard</p>
          </div>
        </div>
      </section>

      {/* Signature Treatments - Existing */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-emerald-600 text-sm tracking-[0.25em] uppercase font-light mb-3">Signature Treatments</p>
              <h2 className="font-serif text-3xl lg:text-4xl text-stone-900">A few favourites to start with</h2>
            </div>
            <button onClick={() => setPage("services")} className="hidden sm:flex items-center gap-2 text-sm text-stone-500 hover:text-emerald-700 transition-colors group">
              See all services <ChevronRight size={15} className="transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {SERVICES.slice(0, 3).map((s, idx) => (
              <article key={s.name} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-3xl aspect-[4/5] shadow-md hover:shadow-2xl transition-shadow duration-500">
                  <img
                    src={s.img}
                    alt={s.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/70 via-stone-900/20 to-transparent" />
                  <span className="absolute top-5 right-5 rounded-full bg-white/95 backdrop-blur-sm px-4 py-2 text-lg font-serif text-emerald-700 shadow-lg">
                    {s.price}
                  </span>
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <h3 className="font-serif text-2xl text-white leading-snug">{s.name}</h3>
                    <p className="text-xs text-stone-200/80 mt-2 tracking-wide font-light">{s.duration}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery - Existing */}
      <section className="pb-20 lg:pb-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <p className="text-emerald-600 text-sm tracking-[0.25em] uppercase font-light mb-3">Inside Mahika</p>
          <h2 className="font-serif text-3xl lg:text-4xl text-stone-900 mb-12">A look around our rooms</h2>
          
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
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <figcaption className="absolute bottom-0 left-0 right-0 p-5 text-sm text-white translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 font-light">
                  {g.alt}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial - Existing */}
      <section className="bg-stone-900 py-20 lg:py-28">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <Star className="mx-auto text-emerald-400/60 mb-6" size={32} />
          <p className="font-serif text-2xl sm:text-3xl lg:text-4xl text-stone-100 leading-relaxed">
            "I stopped in during a work trip through Aerocity, expecting nothing
            more than a quick massage. Left an hour later completely unwound."
          </p>
          <p className="text-stone-400 text-sm mt-8 tracking-wide font-light">Priya M. — Aerocity Branch</p>
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
      {/* Banner */}
      <section className="relative overflow-hidden min-h-[50vh] flex items-center">
        <img
          src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1800&auto=format&fit=crop"
          alt="Massage oils and fresh flowers"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950/92 via-stone-950/80 to-stone-900/50" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-32 lg:pt-40 pb-16 lg:pb-20">
          <span className="inline-flex items-center gap-3 rounded-full border border-stone-400/20 bg-white/5 px-5 py-2 text-[11px] uppercase tracking-[0.25em] text-stone-300 backdrop-blur-sm">
            <Sparkles size={13} /> Our Menu
          </span>
          <h1 className="mt-8 font-serif text-[3rem] sm:text-[4rem] lg:text-[5rem] leading-[1.05] text-white max-w-3xl">
            Treatments, <span className="italic text-emerald-300">priced simply.</span>
          </h1>
          <p className="mt-6 text-stone-300 text-lg leading-relaxed max-w-xl font-light">
            Every treatment below is available at all twenty-five branches. Prices
            are per session and include a short consultation before we begin.
          </p>
        </div>
      </section>

      {/* Filter */}
      <div className="sticky top-20 lg:top-24 z-30 border-b border-stone-200/60 bg-white/92 backdrop-blur-xl shadow-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4 flex items-center justify-between gap-6">
          <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-2 px-2">
            {SERVICE_TAGS.map((t) => (
              <button
                key={t}
                onClick={() => setFilter(t)}
                className={`whitespace-nowrap rounded-full px-5 py-2.5 text-sm transition-all duration-300 ${
                  filter === t
                    ? "bg-emerald-700 text-white shadow-lg shadow-emerald-700/20"
                    : "border border-stone-200 text-stone-500 hover:border-stone-300 hover:text-stone-700"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
          <p className="hidden sm:block text-xs uppercase tracking-[0.2em] text-stone-400 font-light">
            {shown.length} treatment{shown.length === 1 ? "" : "s"}
          </p>
        </div>
      </div>

      {/* Treatment Cards */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-12">
            {shown.map((s) => (
              <article key={s.name} className="group flex flex-col">
                <div className="relative overflow-hidden rounded-3xl aspect-[4/3] shadow-md hover:shadow-2xl transition-shadow duration-500">
                  <img
                    src={s.img}
                    alt={s.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <span className="absolute left-5 top-5 rounded-full bg-white/90 backdrop-blur-sm px-4 py-1.5 text-[11px] uppercase tracking-widest text-emerald-700 font-medium">
                    {s.tag}
                  </span>
                </div>

                <div className="relative -mt-6 mx-5 rounded-2xl bg-white px-5 py-4 shadow-lg shadow-stone-900/8 flex items-baseline justify-between gap-4">
                  <div className="flex items-center gap-2 text-stone-400 text-xs tracking-wide font-light">
                    <Clock size={13} /> {s.duration}
                  </div>
                  <p className="font-serif text-2xl text-emerald-700 whitespace-nowrap">{s.price}</p>
                </div>

                <h2 className="mt-6 font-serif text-2xl text-stone-900 leading-snug">{s.name}</h2>
                <p className="mt-2 text-sm text-stone-500 leading-relaxed flex-1 font-light">{s.desc}</p>

                <button
                  onClick={() => { setPage("locations"); window.scrollTo(0, 0); }}
                  className="mt-6 inline-flex items-center gap-2 text-sm text-stone-500 hover:text-emerald-700 transition-colors group w-fit"
                >
                  Book this treatment <ChevronRight size={15} className="transition-transform group-hover:translate-x-0.5" />
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Ritual */}
      <section className="bg-stone-50/80 border-y border-stone-200/60 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <p className="text-emerald-600 text-sm tracking-[0.25em] uppercase font-light mb-3">The Ritual</p>
          <h2 className="font-serif text-3xl lg:text-4xl text-stone-900 mb-12">How a session goes</h2>
          
          <div className="grid sm:grid-cols-3 gap-12">
            {RITUAL_STEPS.map(([n, title, body]) => (
              <div key={n} className="group">
                <p className="font-serif text-6xl text-emerald-200/80 group-hover:text-emerald-300/80 transition-colors">{n}</p>
                <p className="mt-5 font-serif text-xl text-stone-800">{title}</p>
                <p className="mt-2 text-sm text-stone-500 leading-relaxed font-light">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-stone-900 px-8 lg:px-16 py-14 lg:py-20">
            <div className="absolute -top-24 -right-20 h-80 w-80 rounded-full bg-emerald-600/15 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-emerald-700/10 blur-3xl" />
            
            <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-10">
              <div>
                <h2 className="font-serif text-3xl lg:text-4xl text-white">Not sure what you need?</h2>
                <p className="mt-4 text-stone-300 max-w-md leading-relaxed font-light">
                  Call your nearest branch and describe how you're feeling — we'll recommend a treatment and hold a slot for you.
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <a
                  href="tel:+911140001234"
                  className="flex flex-1 sm:flex-none items-center justify-center gap-3 whitespace-nowrap rounded-full bg-emerald-600 px-8 py-4 text-sm font-medium text-white transition-all duration-300 hover:bg-emerald-500 hover:shadow-lg hover:shadow-emerald-600/25"
                >
                  <Phone size={15} /> +91 11 4000 1234
                </a>
                <button
                  onClick={() => { setPage("locations"); window.scrollTo(0, 0); }}
                  className="flex flex-1 sm:flex-none items-center justify-center whitespace-nowrap rounded-full border border-white/20 bg-white/5 px-8 py-4 text-sm font-medium text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/15"
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
      <section className="max-w-7xl mx-auto px-6 lg:px-8 pt-32 lg:pt-40 pb-8 lg:pb-10">
        <p className="text-emerald-600 text-sm tracking-[0.25em] uppercase font-light mb-3">Find Us</p>
        <h1 className="font-serif text-[2.5rem] sm:text-[3.5rem] lg:text-[4.5rem] leading-tight text-stone-900 mb-4">25 branches across Delhi NCR</h1>
        <p className="text-stone-500 max-w-xl font-light">
          Tap a neighbourhood to select your nearest branch, then send us your
          details on WhatsApp — we'll confirm a slot within the hour.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-6 lg:px-8 pb-20 lg:pb-28 grid lg:grid-cols-5 gap-12">
        <div className="lg:col-span-3">
          <div className="flex flex-wrap gap-3">
            {LOCATIONS.map((loc) => (
              <button
                key={loc}
                onClick={() => setSelected(loc)}
                className={`rounded-full border px-4 py-2.5 text-sm transition-all duration-300 ${
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
            className="mt-10 w-full rounded-2xl object-cover h-56 sm:h-72 shadow-md"
          />
          
          <div className="mt-4 grid grid-cols-3 gap-4">
            <img
              src="https://images.unsplash.com/photo-1611920630418-f587fdc3bf94?q=80&w=500&auto=format&fit=crop"
              alt="Spa room decor"
              className="w-full rounded-xl object-cover h-24 sm:h-32"
            />
            <img
              src="https://images.unsplash.com/photo-1630835425197-50feeba99ecd?q=80&w=500&auto=format&fit=crop"
              alt="Private treatment room"
              className="w-full rounded-xl object-cover h-24 sm:h-32"
            />
            <img
              src="https://images.unsplash.com/photo-1652903761255-4fbf11cff931?q=80&w=500&auto=format&fit=crop"
              alt="Spa bathroom with wooden walls"
              className="w-full rounded-xl object-cover h-24 sm:h-32"
            />
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="lg:sticky lg:top-28 rounded-3xl border border-stone-200 bg-white p-7 lg:p-9 shadow-lg shadow-stone-900/5">
            <p className="font-serif text-2xl text-stone-900 mb-1">Book at {selected}</p>
            <p className="text-sm text-stone-400 font-light mb-6">Open daily, 10 AM – 10 PM</p>
            
            {sent ? (
              <div className="text-center py-8">
                <span className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                  <MessageCircle size={28} />
                </span>
                <p className="font-serif text-xl text-emerald-700 mb-2">WhatsApp opened</p>
                <p className="text-sm text-stone-500 leading-relaxed font-light">
                  Your details for the {selected} branch are ready in WhatsApp — just hit send and we'll confirm your slot.
                </p>
                <a
                  href={waLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center justify-center gap-2.5 rounded-lg bg-emerald-600 px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:bg-emerald-700 hover:shadow-lg hover:shadow-emerald-600/20"
                >
                  <MessageCircle size={16} /> Open WhatsApp again
                </a>
                <button
                  onClick={() => setSent(false)}
                  className="mt-5 block mx-auto text-sm text-emerald-700 border-b border-emerald-200 pb-0.5 hover:border-emerald-600 transition-colors"
                >
                  Send another request
                </button>
              </div>
            ) : (
              <form onSubmit={submit} className="flex flex-col gap-5">
                <div>
                  <label className="text-xs text-stone-400 tracking-wide uppercase font-light">Your name</label>
                  <input
                    value={form.name}
                    onChange={(e) => { setForm({ ...form, name: e.target.value }); setError(""); }}
                    className="w-full mt-1.5 px-5 py-3.5 rounded-xl border border-stone-200 bg-stone-50/50 focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:border-transparent transition-all text-base sm:text-sm"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label className="text-xs text-stone-400 tracking-wide uppercase font-light">Phone number</label>
                  <input
                    value={form.phone}
                    onChange={(e) => { setForm({ ...form, phone: e.target.value }); setError(""); }}
                    className="w-full mt-1.5 px-5 py-3.5 rounded-xl border border-stone-200 bg-stone-50/50 focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:border-transparent transition-all text-base sm:text-sm"
                    placeholder="10-digit mobile number"
                  />
                </div>
                <div>
                  <label className="text-xs text-stone-400 tracking-wide uppercase font-light">Treatment</label>
                  <select
                    value={form.service}
                    onChange={(e) => setForm({ ...form, service: e.target.value })}
                    className="w-full mt-1.5 px-5 py-3.5 rounded-xl border border-stone-200 bg-stone-50/50 focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:border-transparent transition-all text-base sm:text-sm appearance-none"
                  >
                    {SERVICES.map((s) => (
                      <option key={s.name} value={s.name}>
                        {s.name} · {s.price}
                      </option>
                    ))}
                  </select>
                </div>
                {error && <p className="text-xs text-rose-600 -mt-2">{error}</p>}
                <button
                  type="submit"
                  className="mt-2 flex items-center justify-center gap-2.5 bg-emerald-600 text-white py-4 rounded-xl text-sm font-medium transition-all duration-300 hover:bg-emerald-700 hover:shadow-lg hover:shadow-emerald-600/20"
                >
                  <MessageCircle size={17} /> Send on WhatsApp
                </button>
                <p className="text-[11px] text-stone-400 text-center leading-relaxed font-light">
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