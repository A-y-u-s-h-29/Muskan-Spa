import React, { useEffect, useState, useCallback } from "react";
import { Phone, MapPin, Clock, ChevronRight, Menu, X, Sparkles, Flower2, Droplets, MessageCircle, Star, Calendar, Leaf, ChevronLeft, Award, Quote, Heart, Users, ShieldCheck } from "lucide-react";

const WHATSAPP_NUMBER = "918796910363";

const LOCATIONS = [
  "Mahipalpur", "Aerocity", "Basant Kunj", "Gurgaon", "Dwarka", "Saket", "CP",
  "Delhi", "Karol Bagh", "Chanakyapuri", "Green Park", "Rohini", "RK Puram",
  "Uttam Nagar", "Mayur Vihar", "Malviya Nagar", "Hauz Khas", "Paschim Vihar",
  "Lajpat Nagar", "Nehru Place", "IGI Airport", "Paharganj", "Noida",
  "South Delhi", "Punjabi Bagh",
];

const SERVICES = [
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

const ALL_TREATMENTS = [
  { name: "Russian Massage", price: "₹3,500", duration: "60 min", tag: "Signature",
    desc: "Traditional Russian techniques tailored to your body for deep relaxation and rejuvenation.",
    img: "https://images.unsplash.com/photo-1519824145371-296894a0daa9?q=80&w=1200&auto=format&fit=crop" },
  { name: "Body to Body Massage", price: "₹4,000", duration: "60 min", tag: "Signature",
    desc: "A full-body approach designed to release tension and restore balance.",
    img: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?q=80&w=1200&auto=format&fit=crop" },
  { name: "Swedish Massage", price: "₹2,800", duration: "60 min", tag: "Relaxation",
    desc: "Long, smooth strokes and gentle kneading to promote deep relaxation.",
    img: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=1200&auto=format&fit=crop" },
  { name: "Hot Stone Massage", price: "₹3,800", duration: "75 min", tag: "Therapeutic",
    desc: "Smooth heated stones ease muscle tension and improve circulation.",
    img: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?q=80&w=1200&auto=format&fit=crop" },
  { name: "Hot Oil Massage", price: "₹3,200", duration: "60 min", tag: "Therapeutic",
    desc: "Warm, essential-oil-infused oils nourish the skin and calm the nervous system.",
    img: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=1200&auto=format&fit=crop" },
  { name: "4 Hand Massage", price: "₹5,500", duration: "60 min", tag: "Signature",
    desc: "Two therapists working in synchrony for a truly immersive experience.",
    img: "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?q=80&w=1200&auto=format&fit=crop" },
  { name: "Body Lotion Massage", price: "₹2,500", duration: "60 min", tag: "Relaxation",
    desc: "A nourishing lotion-based massage that hydrates while it relaxes.",
    img: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=1200&auto=format&fit=crop" },
  { name: "Deep Tissue Massage", price: "₹3,600", duration: "60 min", tag: "Therapeutic",
    desc: "Slow, deep strokes target underlying muscle tissue to release chronic knots.",
    img: "https://images.unsplash.com/photo-1639162906614-0603b0ae95fd?q=80&w=1200&auto=format&fit=crop" },
];

// Every Mahika Russian Spa branch offers the complete treatment menu.
const getServicesForLocation = () => ALL_TREATMENTS;

const buildServiceWhatsAppLink = (service, location) => {
  const message = [
    "Hello Mahika Russian Spa, I'd like to book the following service:",
    "",
    "Service: " + service.name,
    "Price: " + service.price,
    "Duration: " + service.duration,
    "Location: " + (location || "Delhi NCR"),
    "",
    "Please confirm my booking.",
  ].join("\n");
  return "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(message);
};

const GALLERY = [
  { src: "https://images.unsplash.com/photo-1620733723572-11c53f73a416?q=80&w=800&auto=format&fit=crop", alt: "Candles and towel spa ambience" },
  { src: "https://images.unsplash.com/photo-1583416750470-965b2707b355?q=80&w=800&auto=format&fit=crop", alt: "Spa treatment room table" },
  { src: "divine-glam-anna-nagar-pondicherry-body-massage-centres-wprq7tpllq.avif", alt: "Elegant vanity and mirror" },
  { src: "https://images.unsplash.com/photo-1595871151608-bc7abd1caca3?q=80&w=800&auto=format&fit=crop", alt: "Vanity table with mirror" },
  { src: "portrait-beautiful-russian-woman-getting-recreation-body-massage-close-up-portrait-beautiful-russian-girl-blue-eyes-120352860.webp", alt: "Massage oils and fresh flowers" },
  { src: "masseuse-makes-massage-to-a-charming-brunette-photo.jpg", alt: "Relaxing back massage" },
  { src: "https://images.unsplash.com/photo-1761470575018-135c213340eb?q=80&w=800&auto=format&fit=crop", alt: "Candlelit steam room" },
  { src: "body-to-body-massage-628.jpg", alt: "Massage oils and fresh flowers" },
];

const FULL_GALLERY = [
  { src: "ajman-massage-spa.webp" },
  { src: "https://images.unsplash.com/photo-1620733723572-11c53f73a416?q=80&w=1200&auto=format&fit=crop", alt: "Candlelit spa treatment room" },
  { src: "https://images.unsplash.com/photo-1583416750470-965b2707b355?q=80&w=1200&auto=format&fit=crop", alt: "Massage table with warm towels" },
  { src: "divine-glam-anna-nagar-pondicherry-body-massage-centres-wprq7tpllq.avif", alt: "Elegant vanity and mirror" },
  { src: "body-to-body-massage-628.jpg", alt: "Massage oils and fresh flowers" },
  { src: "portrait-beautiful-russian-woman-getting-recreation-body-massage-close-up-portrait-beautiful-russian-girl-blue-eyes-120352860.webp", alt: "Massage oils and fresh flowers" },
  { src: "https://images.unsplash.com/photo-1761470575018-135c213340eb?q=80&w=1200&auto=format&fit=crop", alt: "Candlelit steam room" },
  { src: "COUPLE-MASSAGE-3.jpg", alt: "Massage table with warm towels" },
  { src: "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?q=80&w=1200&auto=format&fit=crop", alt: "Hot stone therapy setup" },
  { src: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?q=80&w=1200&auto=format&fit=crop", alt: "Therapist preparing massage oil" },
  { src: "mbr-506x337.jpg", alt: "Relaxing back massage" },
  { src: "6j9ia55vnvp1dq6-vmwrwgj7tl-250.avif" },
  { src: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=1200&auto=format&fit=crop", alt: "Facial treatment in progress" },
  { src: "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?q=80&w=1200&auto=format&fit=crop", alt: "Four-hand synchronized massage" },
  { src: "thai-massage-in-pimpri-chinchwad-pune-679.jpg", alt: "Spa reception and lounge" },
  { src: "https://images.unsplash.com/photo-1630835425197-50feeba99ecd?q=80&w=1200&auto=format&fit=crop", alt: "Private treatment room interior" },
  { src: "masseuse-makes-massage-to-a-charming-brunette-photo.jpg", alt: "Relaxing back massage" },
  { src: "https://images.unsplash.com/photo-1583417657209-d3dd44dc9c09?q=80&w=1200&auto=format&fit=crop", alt: "Spa reception ambience" },
  { src: "https://images.unsplash.com/photo-1652903761255-4fbf11cff931?q=80&w=1200&auto=format&fit=crop", alt: "Wooden spa bathroom" },
];

const TESTIMONIALS = [
  { name: "Ananya Sharma", location: "Aerocity Branch", rating: 5,
    text: "The Balinese massage was absolutely divine. The therapist's hands knew exactly where to work. I walked out feeling like a new person.",
    treatment: "Balinese Body Massage" },
  { name: "Priya Mehta", location: "Gurgaon Branch", rating: 5,
    text: "I've been to many spas across Delhi, but nothing compares to the care and attention here. The hot stone ritual is my new favourite.",
    treatment: "Aroma Hot Stone Ritual" },
  { name: "Riya Kapoor", location: "Saket Branch", rating: 5,
    text: "The Signature Radiance Facial left my skin glowing for days. Such a gentle, luxurious experience from start to finish.",
    treatment: "Signature Radiance Facial" },
  { name: "Neha Verma", location: "Dwarka Branch", rating: 4.5,
    text: "Perfect for a quick unwind after work. The head and shoulder release melts away all the screen-time tension.",
    treatment: "Head, Neck & Shoulder Release" }
];

const HERO_SLIDES = [
  { src: "Deep-Tissue-Massage.webp", title: "The Signature Ritual", subtitle: "Warm oils, unhurried hands, complete stillness." },
  { src: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1800&auto=format&fit=crop", title: "Oils & Botanicals", subtitle: "Pure, warmed oils chosen for your skin and mood." },
  { src: "COUPLE-MASSAGE-3.jpg", title: "Private Treatment Rooms", subtitle: "Every branch, the same quiet standard of care." },
  { src: "https://images.unsplash.com/photo-1620733723572-11c53f73a416?q=80&w=1800&auto=format&fit=crop", title: "Candlelit Calm", subtitle: "Step in from the city. Step out lighter." },
];

const TEAM_MEMBERS = [
  { name: "Anastasia", role: "Senior Therapist", img: "staff-7.webp" },
  { name: "Olga", role: "Deep Tissue Expert", img: "staff-5.webp" },
  { name: "Natalia", role: "Aroma Therapist", img: "staff-2-1.webp" },
  { name: "Irina", role: "Facial Specialist", img: "samante-rose.webp" },
  { name: "Svetlana", role: "Hot Stone Expert", img: "images.jpg" },
  { name: "Yulia", role: "Reflexology Expert", img: "images (1).jpg" }
];

function LoadingScreen({ onComplete }) {
  const [loading, setLoading] = useState(true);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setFade(true), 1800);
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
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-px bg-stone-300" />
          <div className="font-serif text-3xl sm:text-5xl md:text-7xl tracking-tight text-stone-900">
            {"Mahika".split("").map((ch, i) => (
              <span key={"m" + i} className="inline-block animate-[fadeUp_0.6s_ease-out_forwards] opacity-0" style={{ animationDelay: `${0.1 + i * 0.05}s` }}>{ch}</span>
            ))}
            <span className="inline-block mx-1 sm:mx-2 text-emerald-700 animate-[fadeUp_0.6s_ease-out_forwards] opacity-0" style={{ animationDelay: '0.4s' }}>·</span>
            {"Russian".split("").map((ch, i) => (
              <span key={"r" + i} className="inline-block text-emerald-700 animate-[fadeUp_0.6s_ease-out_forwards] opacity-0" style={{ animationDelay: `${0.45 + i * 0.05}s` }}>{ch}</span>
            ))}
          </div>
          <p className="mt-3 sm:mt-4 text-[10px] sm:text-xs uppercase tracking-[0.3em] sm:tracking-[0.35em] text-stone-400 animate-[fadeUp_0.8s_ease-out_forwards] opacity-0" style={{ animationDelay: '0.9s' }}>
            Aerocity · Delhi NCR
          </p>
          <div className="mt-4 sm:mt-6 flex justify-center">
            <div className="w-12 sm:w-16 h-px bg-stone-200 animate-[expand_1.2s_ease-out_forwards] origin-left" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   HEADER
   ============================================================ */
function Header({ page, setPage, menuOpen, setMenuOpen, selectedLocation, setSelectedLocation }) {
  const [scrolled, setScrolled] = useState(false);
  const [locationOpen, setLocationOpen] = useState(false);
  const locationRef = React.useRef(null);
  const mobileLocationRef = React.useRef(null);
  // Used to make sure a single tap never fires twice (pointerup + click).
  const tapGuardRef = React.useRef(0);

  const nav = [
    ["home", "Home"],
    ["services", "Services"],
    ["about", "About"],
    ["gallery", "Gallery"],
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ------------------------------------------------------------
     Close the location dropdown when tapping outside.

     IMPORTANT FIX:
     We listen for "click" — NOT "mousedown" / "touchstart".
     Previously the dropdown was closed on touchstart, which unmounted
     the location button before the browser could deliver its "click"
     event. On phones that meant the tap was swallowed and you were
     never taken to the branch page (desktop was unaffected because a
     mouse click fires immediately). Listening for "click" removes that
     race completely, and the refs still let clicks inside the dropdown
     through untouched.
     ------------------------------------------------------------ */
  useEffect(() => {
    if (!locationOpen) return;
    const onDocClick = (e) => {
      const insideDesktop = locationRef.current && locationRef.current.contains(e.target);
      const insideMobile = mobileLocationRef.current && mobileLocationRef.current.contains(e.target);
      if (!insideDesktop && !insideMobile) setLocationOpen(false);
    };
    const onKey = (e) => {
      if (e.key === "Escape") setLocationOpen(false);
    };
    document.addEventListener("click", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [locationOpen]);

  useEffect(() => {
    if (!menuOpen) setLocationOpen(false);
  }, [menuOpen]);

  const overlay = page === "home" && !scrolled && !menuOpen;

  /* Runs a handler at most once per 500 ms, so a touch that fires both
     pointerup and click only navigates a single time. */
  const tapOnce = (fn) => {
    const now = Date.now();
    if (now - tapGuardRef.current < 500) return;
    tapGuardRef.current = now;
    fn();
  };

  /* Props shared by every tappable element in the menus:
     - onClick  → mouse, keyboard and assistive tech
     - onPointerUp → touch/pen, which still fires on iOS inside
       scrollable containers where a synthetic click can be dropped */
  const tapHandlers = (fn) => ({
    onClick: () => tapOnce(fn),
    onPointerUp: (e) => {
      if (e.pointerType === "mouse") return;
      tapOnce(fn);
    },
  });

  const goToPage = (key) => {
    setPage(key);
    setMenuOpen(false);
    setLocationOpen(false);
    window.scrollTo(0, 0);
  };

  const pickLocation = (loc) => {
    if (setSelectedLocation) setSelectedLocation(loc);
    setLocationOpen(false);
    setMenuOpen(false);
    setPage("location");
    // Give the browser a tick so scroll doesn't jump during state updates on mobile
    setTimeout(() => window.scrollTo({ top: 0, behavior: "auto" }), 0);
  };

  const toggleLocation = () => setLocationOpen((v) => !v);

  const viewAllBranches = () => {
    setPage("locations");
    setLocationOpen(false);
    setMenuOpen(false);
    window.scrollTo(0, 0);
  };

  const logoPrimary = overlay ? "text-white" : "text-emerald-800";
  const logoSecondary = overlay ? "text-white" : "text-stone-800";
  const logoTagline = overlay ? "text-stone-300" : "text-stone-400";
  const navBase = overlay ? "text-white/85 hover:text-white" : "text-stone-500 hover:text-stone-800";
  const navActive = overlay ? "text-emerald-300" : "text-emerald-700";

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        overlay ? "bg-transparent" : "bg-white/95 backdrop-blur-xl shadow-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-between h-14 sm:h-20 lg:h-24">
        <button
          {...tapHandlers(() => goToPage("home"))}
          className="text-left group flex-shrink-0 min-w-0"
        >
          <span className={`font-serif text-sm xs:text-base sm:text-xl lg:text-2xl xl:text-3xl tracking-tight ${logoPrimary}`}>Mahika</span>
          <span className={`font-serif text-sm xs:text-base sm:text-xl lg:text-2xl xl:text-3xl ${logoSecondary}`}> Russian Spa</span>
          <span className={`block text-[7px] xs:text-[8px] sm:text-[9px] lg:text-[10px] xl:text-[11px] uppercase tracking-[0.2em] xs:tracking-[0.25em] sm:tracking-[0.3em] lg:tracking-[0.35em] mt-0.5 font-light ${logoTagline}`}>Aerocity · Delhi NCR</span>
        </button>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-4 lg:gap-8 xl:gap-10">
          {nav.map(([key, label]) => (
            <button
              key={key}
              onClick={() => { setPage(key); window.scrollTo(0, 0); }}
              className={`text-xs lg:text-sm tracking-[0.1em] lg:tracking-[0.15em] uppercase font-light relative pb-1 transition-colors duration-300 ${
                page === key ? navActive : navBase
              }`}
            >
              {label}
              <span className={`absolute bottom-0 left-0 h-[2px] transition-all duration-300 ${
                overlay ? "bg-emerald-300" : "bg-emerald-600"
              } ${page === key ? "w-full" : "w-0"}`} />
            </button>
          ))}

          {/* Desktop location dropdown */}
          <div className="relative" ref={locationRef}>
            <button
              onClick={toggleLocation}
              aria-haspopup="listbox"
              aria-expanded={locationOpen}
              className={`flex items-center gap-1.5 lg:gap-2 text-xs lg:text-sm tracking-[0.1em] lg:tracking-[0.15em] uppercase font-light relative pb-1 transition-colors duration-300 ${
                page === "locations" || page === "location" ? navActive : navBase
              }`}
            >
              <MapPin size={13} className="lg:size-[15px]" />
              <span className="truncate max-w-[110px] lg:max-w-[160px]">
                {selectedLocation || "Locations"}
              </span>
              <ChevronRight size={12} className={`lg:size-[14px] transition-transform duration-300 ${locationOpen ? "rotate-90" : ""}`} />
              <span className={`absolute bottom-0 left-0 h-[2px] transition-all duration-300 ${
                overlay ? "bg-emerald-300" : "bg-emerald-600"
              } ${page === "locations" || page === "location" ? "w-full" : "w-0"}`} />
            </button>

            {locationOpen && (
              <div role="listbox" className="absolute right-0 mt-3 w-72 max-h-[70vh] overflow-y-auto rounded-2xl border border-stone-200 bg-white shadow-2xl shadow-stone-900/10 p-2 z-50">
                <p className="px-3 pt-2 pb-1.5 text-[10px] uppercase tracking-[0.2em] text-stone-400 font-light">
                  Choose your location
                </p>
                <div className="grid grid-cols-2 gap-1">
                  {LOCATIONS.map((loc) => {
                    const isSelected = loc === selectedLocation;
                    return (
                      <button
                        key={loc}
                        type="button"
                        role="option"
                        aria-selected={isSelected}
                        {...tapHandlers(() => pickLocation(loc))}
                        className={`text-left rounded-lg px-3 py-2 text-xs lg:text-sm transition-colors duration-200 truncate cursor-pointer ${
                          isSelected ? "bg-emerald-50 text-emerald-700 font-medium" : "text-stone-600 hover:bg-stone-50 hover:text-stone-900"
                        }`}
                      >
                        {loc}
                      </button>
                    );
                  })}
                </div>
                <button
                  type="button"
                  {...tapHandlers(viewAllBranches)}
                  className="mt-1 w-full text-left rounded-lg px-3 py-2 text-[11px] uppercase tracking-[0.15em] text-stone-400 hover:text-emerald-700 hover:bg-stone-50 transition-colors cursor-pointer"
                >
                  View all branches →
                </button>
              </div>
            )}
          </div>

          <a href="tel:+911140001234"
             className="flex items-center gap-2 rounded-full bg-emerald-700 px-4 sm:px-5 lg:px-6 py-2 sm:py-2.5 lg:py-3 text-xs sm:text-sm text-white transition-all duration-300 hover:bg-emerald-800 hover:shadow-lg hover:shadow-emerald-700/20">
            <Phone size={14} className="sm:size-[15px]" /> <span className="hidden sm:inline">Call Now</span>
          </a>
        </nav>

        <button
          className={`md:hidden transition-colors p-2 -mr-2 cursor-pointer ${overlay ? "text-white hover:text-emerald-300" : "text-stone-700 hover:text-emerald-700"}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="md:hidden max-h-[calc(100vh-3.5rem)] overflow-y-auto bg-white/98 backdrop-blur-xl border-t border-stone-100 px-4 sm:px-6 py-4 sm:py-6 flex flex-col gap-1">
          {nav.map(([key, label]) => (
            <button
              key={key}
              type="button"
              {...tapHandlers(() => goToPage(key))}
              className={`text-left text-base sm:text-lg tracking-wide font-light py-3 border-b border-stone-100 cursor-pointer ${
                page === key ? "text-emerald-700" : "text-stone-600"
              }`}
            >
              {label}
            </button>
          ))}

          {/* Mobile location section — wrapped with mobileLocationRef */}
          <div ref={mobileLocationRef} className="pt-3">
            <button
              type="button"
              {...tapHandlers(toggleLocation)}
              aria-expanded={locationOpen}
              className={`w-full flex items-center justify-between gap-2 text-left text-base sm:text-lg tracking-wide font-light py-3 cursor-pointer ${
                page === "locations" || page === "location" ? "text-emerald-700" : "text-stone-600"
              }`}
            >
              <span className="flex items-center gap-2 min-w-0">
                <MapPin size={18} className="flex-shrink-0" />
                <span className="truncate">{selectedLocation || "Locations"}</span>
              </span>
              <ChevronRight
                size={18}
                className={`flex-shrink-0 transition-transform duration-300 ${locationOpen ? "rotate-90" : ""}`}
              />
            </button>

            {locationOpen && (
              <div className="mt-1 mb-2 rounded-2xl border border-stone-200 bg-white p-2.5 max-h-[50vh] overflow-y-auto">
                <p className="px-3 pt-1 pb-2 text-[10px] uppercase tracking-[0.2em] text-stone-400 font-light">
                  Choose your location
                </p>
                <div className="grid grid-cols-2 xs:grid-cols-3 gap-1.5">
                  {LOCATIONS.map((loc) => {
                    const isSelected = loc === selectedLocation;
                    return (
                      <button
                        key={loc}
                        type="button"
                        {...tapHandlers(() => pickLocation(loc))}
                        className={`text-left rounded-lg px-3 py-2.5 text-[13px] sm:text-sm transition-colors duration-200 truncate cursor-pointer ${
                          isSelected
                            ? "bg-emerald-50 text-emerald-700 font-medium"
                            : "text-stone-600 hover:bg-stone-50 hover:text-stone-900 active:bg-stone-100"
                        }`}
                      >
                        {loc}
                      </button>
                    );
                  })}
                </div>
                <button
                  type="button"
                  {...tapHandlers(viewAllBranches)}
                  className="mt-2 w-full text-left rounded-lg px-3 py-2.5 text-[11px] uppercase tracking-[0.15em] text-stone-400 hover:text-emerald-700 hover:bg-stone-50 transition-colors cursor-pointer"
                >
                  View all branches →
                </button>
              </div>
            )}
          </div>

          <a href="tel:+911140001234"
             className="text-center bg-emerald-700 text-white text-sm sm:text-base px-6 py-3.5 rounded-full hover:bg-emerald-800 transition-colors mt-3">
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
          <p className="font-serif text-2xl sm:text-3xl text-stone-100">Mahika Russian Spa</p>
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
            <button className="text-left hover:text-stone-100 transition-colors w-fit py-1" onClick={() => setPage("about")}>About</button>
            <button className="text-left hover:text-stone-100 transition-colors w-fit py-1" onClick={() => setPage("gallery")}>Gallery</button>
            <button className="text-left hover:text-stone-100 transition-colors w-fit py-1" onClick={() => setPage("locations")}>Locations</button>
          </div>
        </div>

        <div>
          <p className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-stone-400 mb-3 sm:mb-5">Contact</p>
          <a href={"tel:+" + WHATSAPP_NUMBER} className="text-sm text-stone-400 flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3 hover:text-stone-100 transition-colors">
            <Phone size={14} className="text-stone-500 flex-shrink-0" /> +91 87969 10363
          </a>
          <a href={"https://wa.me/" + WHATSAPP_NUMBER} target="_blank" rel="noopener noreferrer"
             className="text-sm text-stone-400 flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3 hover:text-stone-100 transition-colors">
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

/* ============================================================
   HERO SLIDER
   ============================================================ */
function HeroSlider() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => setIndex((i) => (i + 1) % HERO_SLIDES.length), []);
  const prev = useCallback(() => setIndex((i) => (i - 1 + HERO_SLIDES.length) % HERO_SLIDES.length), []);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, 5500);
    return () => clearInterval(id);
  }, [next, paused]);

  return (
    <section
      className="relative bg-stone-900"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Use small viewport height so mobile address bar doesn't crop the slider */}
      <div className="relative w-full h-screen min-h-[540px] sm:min-h-[600px] overflow-hidden">
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
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-900/40 to-stone-950/50" />
          </div>
        ))}

        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 lg:pt-28">
            <div key={index} className="max-w-2xl animate-[fadeIn_0.9s_ease-out_forwards]">
              <span className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-white/25 bg-white/10 px-2.5 sm:px-4 py-1 sm:py-1.5 text-[9px] sm:text-[10px] lg:text-[11px] uppercase tracking-[0.2em] sm:tracking-[0.25em] text-white/90 backdrop-blur-sm">
                <Sparkles size={10} className="sm:size-[12px]" /> Mahika Russian Spa
              </span>
              <h1 className="mt-4 sm:mt-6 lg:mt-8 font-serif text-[1.9rem] xs:text-[2.3rem] sm:text-[3rem] md:text-[3.6rem] lg:text-[4.5rem] xl:text-[5.5rem] leading-[1.08] text-white">
                {HERO_SLIDES[index].title}
              </h1>
              <p className="mt-3 sm:mt-4 lg:mt-5 text-stone-200/90 text-[13px] xs:text-sm sm:text-lg lg:text-xl font-light max-w-lg">
                {HERO_SLIDES[index].subtitle}
              </p>
              <div className="mt-5 sm:mt-7 lg:mt-9 flex flex-wrap gap-2 sm:gap-3">
                <a
                  href={"https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent("Hello Mahika Russian Spa, I would like to book a session.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-full bg-emerald-600 px-4 sm:px-7 py-2.5 sm:py-3.5 text-[12px] sm:text-sm font-medium text-white shadow-xl shadow-emerald-900/30 transition-all duration-300 hover:bg-emerald-500 active:scale-95"
                >
                  <MessageCircle size={14} className="sm:size-[15px]" /> Book on WhatsApp
                </a>
                <a href="tel:+911140001234"
                  className="flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 sm:px-7 py-2.5 sm:py-3.5 text-[12px] sm:text-sm font-medium text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/20 active:scale-95">
                  <Phone size={14} className="sm:size-[15px]" /> Call Now
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Arrows — smaller on mobile, positioned more inside */}
        <button onClick={prev} aria-label="Previous slide"
          className="absolute left-2 sm:left-4 lg:left-8 top-1/2 -translate-y-1/2 z-10 flex h-9 w-9 sm:h-11 sm:w-11 lg:h-12 lg:w-12 items-center justify-center rounded-full bg-white/85 text-stone-700 backdrop-blur-sm shadow-lg transition-all duration-300 hover:bg-white hover:text-emerald-700 hover:shadow-xl active:scale-95">
          <ChevronLeft size={18} className="sm:size-[20px] lg:size-[22px]" />
        </button>
        <button onClick={next} aria-label="Next slide"
          className="absolute right-2 sm:right-4 lg:right-8 top-1/2 -translate-y-1/2 z-10 flex h-9 w-9 sm:h-11 sm:w-11 lg:h-12 lg:w-12 items-center justify-center rounded-full bg-white/85 text-stone-700 backdrop-blur-sm shadow-lg transition-all duration-300 hover:bg-white hover:text-emerald-700 hover:shadow-xl active:scale-95">
          <ChevronRight size={18} className="sm:size-[20px] lg:size-[22px]" />
        </button>

        <div className="absolute bottom-6 sm:bottom-8 lg:bottom-10 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5 sm:gap-2">
          {HERO_SLIDES.map((_, i) => (
            <button key={i} onClick={() => setIndex(i)} aria-label={`Go to slide ${i + 1}`}
              className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
                i === index ? "w-6 sm:w-8 bg-emerald-400" : "w-1.5 sm:w-2 bg-white/60 hover:bg-white/90"
              }`} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   TEAM SECTION
   ============================================================ */
function TeamSection() {
  const track = [...TEAM_MEMBERS, ...TEAM_MEMBERS];
  return (
    <section className="py-10 sm:py-16 lg:py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-5 sm:mb-8 lg:mb-12">
        <p className="text-emerald-600 text-[9px] xs:text-[10px] sm:text-xs lg:text-sm tracking-[0.15em] sm:tracking-[0.2em] lg:tracking-[0.25em] uppercase font-light mb-1.5 sm:mb-2 lg:mb-3">
          Our Therapists
        </p>
        <h2 className="font-serif text-[1.5rem] xs:text-2xl sm:text-3xl lg:text-4xl text-stone-900">
          Meet the team behind Mahika
        </h2>
        <p className="mt-2 sm:mt-3 text-stone-500 text-[13px] sm:text-base max-w-xl font-light">
          Trained hands, unhurried pace, and a genuine care for your comfort —
          the same team standard across all 25 branches.
        </p>
      </div>

      <div className="relative group">
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 sm:w-20 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 sm:w-20 bg-gradient-to-l from-white to-transparent z-10" />

        <div className="flex gap-2.5 sm:gap-4 lg:gap-6 animate-team-scroll w-max">
          {track.map((m, i) => (
            <div key={m.name + i} className="flex-shrink-0 w-32 xs:w-40 sm:w-52 lg:w-64 group/card">
              <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl aspect-[3/4] shadow-md hover:shadow-2xl transition-shadow duration-500">
                <img src={m.img} alt={m.name} loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover/card:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/75 via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-2.5 sm:p-4">
                  <p className="font-serif text-sm xs:text-base sm:text-lg lg:text-xl text-white leading-tight">{m.name}</p>
                  <p className="text-[9px] sm:text-xs text-emerald-200 tracking-wide mt-0.5 font-light">{m.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   FLOATING BUTTONS
   ============================================================ */
function FloatingButtons() {
  const waHref =
    "https://wa.me/" + WHATSAPP_NUMBER + "?text=" +
    encodeURIComponent("Hello Mahika Russian Spa, I would like to know more about your services and availability.");

  return (
    <div className="fixed right-3 sm:right-5 bottom-3 sm:bottom-8 z-40 flex flex-col gap-2 sm:gap-3">
      <a href={waHref} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp"
        className="group relative flex items-center justify-center h-11 w-11 sm:h-14 sm:w-14 rounded-full bg-[#25D366] text-white shadow-xl shadow-emerald-900/25 transition-all duration-300 hover:scale-110 active:scale-95">
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-60 animate-ping" aria-hidden="true" />
        <MessageCircle size={20} className="sm:size-[26px] relative z-10" />
        <span className="hidden sm:block absolute right-full mr-3 whitespace-nowrap rounded-lg bg-stone-900 text-white text-xs px-3 py-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          Chat on WhatsApp
        </span>
      </a>
      <a href="tel:+918796910363" aria-label="Call now"
        className="group relative flex items-center justify-center h-11 w-11 sm:h-14 sm:w-14 rounded-full bg-emerald-700 text-white shadow-xl shadow-emerald-900/25 transition-all duration-300 hover:scale-110 hover:bg-emerald-800 active:scale-95">
        <Phone size={18} className="sm:size-[24px]" />
        <span className="hidden sm:block absolute right-full mr-3 whitespace-nowrap rounded-lg bg-stone-900 text-white text-xs px-3 py-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          Call Now
        </span>
      </a>
    </div>
  );
}

function HomePage({ setPage, selectedLocation }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <HeroSlider />

      {/* Testimonials */}
      <section className="py-10 sm:py-16 lg:py-20 xl:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6 sm:mb-8 lg:mb-10 xl:mb-14">
            <p className="text-emerald-600 text-[9px] xs:text-[10px] sm:text-xs lg:text-sm tracking-[0.15em] sm:tracking-[0.2em] lg:tracking-[0.25em] uppercase font-light mb-1.5 sm:mb-2 lg:mb-3">What Our Guests Say</p>
            <h2 className="font-serif text-[1.5rem] xs:text-2xl sm:text-3xl lg:text-4xl text-stone-900">Experiences worth sharing</h2>
            <div className="mt-2 sm:mt-3 lg:mt-4 flex justify-center">
              <div className="w-8 sm:w-10 lg:w-12 h-px bg-emerald-200" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
            {TESTIMONIALS.map((testimonial, idx) => (
              <div key={idx}
                className="group bg-stone-50/80 rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 border border-stone-100 hover:border-emerald-200/50 transition-all duration-500 hover:shadow-xl hover:shadow-emerald-900/5 active:scale-[0.98]"
                style={{ animationDelay: `${idx * 150}ms` }}>
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
                    <Star key={i} size={10}
                      className={`sm:size-[12px] lg:size-[14px] ${
                        i < Math.floor(testimonial.rating) ? "fill-emerald-600 text-emerald-600" : "fill-stone-200 text-stone-200"
                      }`} />
                  ))}
                  {testimonial.rating % 1 !== 0 && (
                    <Star size={10} className="sm:size-[12px] lg:size-[14px] fill-emerald-600/50 text-emerald-600/50" />
                  )}
                </div>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-light">"{testimonial.text}"</p>
                <p className="mt-2 sm:mt-2.5 lg:mt-3 text-[7px] xs:text-[8px] sm:text-[9px] lg:text-[10px] uppercase tracking-wider text-emerald-600/60 font-light truncate">
                  {testimonial.treatment}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TeamSection />

      {/* Features */}
      <section className="py-10 sm:py-16 lg:py-20 border-y border-stone-200/60 bg-stone-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 text-center">
          <div className="group">
            <div className="mx-auto w-12 h-12 sm:w-13 sm:h-13 lg:w-14 lg:h-14 rounded-full bg-emerald-100/60 flex items-center justify-center mb-2 sm:mb-3 lg:mb-4 group-hover:bg-emerald-100 transition-colors">
              <Sparkles className="text-emerald-600 sm:size-[22px] lg:size-[26px]" size={20} />
            </div>
            <p className="font-serif text-base sm:text-lg lg:text-xl text-stone-800">Certified therapists</p>
            <p className="text-xs sm:text-sm text-stone-400 mt-0.5 sm:mt-1 lg:mt-1.5 font-light">Trained in classical and modern technique</p>
          </div>
          <div className="group">
            <div className="mx-auto w-12 h-12 sm:w-13 sm:h-13 lg:w-14 lg:h-14 rounded-full bg-emerald-100/60 flex items-center justify-center mb-2 sm:mb-3 lg:mb-4 group-hover:bg-emerald-100 transition-colors">
              <Droplets className="text-emerald-600 sm:size-[22px] lg:size-[26px]" size={20} />
            </div>
            <p className="font-serif text-base sm:text-lg lg:text-xl text-stone-800">Pure, warmed oils</p>
            <p className="text-xs sm:text-sm text-stone-400 mt-0.5 sm:mt-1 lg:mt-1.5 font-light">No synthetic fragrance, ever</p>
          </div>
          <div className="group">
            <div className="mx-auto w-12 h-12 sm:w-13 sm:h-13 lg:w-14 lg:h-14 rounded-full bg-emerald-100/60 flex items-center justify-center mb-2 sm:mb-3 lg:mb-4 group-hover:bg-emerald-100 transition-colors">
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
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 sm:mb-8 lg:mb-10 xl:mb-12">
            <div>
              <p className="text-emerald-600 text-[9px] xs:text-[10px] sm:text-xs lg:text-sm tracking-[0.15em] sm:tracking-[0.2em] lg:tracking-[0.25em] uppercase font-light mb-1.5 sm:mb-2 lg:mb-3">Signature Treatments</p>
              <h2 className="font-serif text-[1.5rem] xs:text-2xl sm:text-3xl lg:text-4xl text-stone-900">A few favourites to start with</h2>
            </div>
            <button onClick={() => setPage("services")} className="hidden sm:flex items-center gap-2 text-sm text-stone-500 hover:text-emerald-700 transition-colors group mt-3 sm:mt-0">
              See all services <ChevronRight size={15} className="transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-8">
            {SERVICES.slice(0, 3).map((s) => (
              <article key={s.name} className="group flex flex-col cursor-pointer">
                <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl aspect-[4/5] shadow-md hover:shadow-2xl transition-shadow duration-500">
                  <img src={s.img} alt={s.name} loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/70 via-stone-900/20 to-transparent" />
                  <span className="absolute top-3 sm:top-4 lg:top-5 right-3 sm:right-4 lg:right-5 rounded-full bg-white/95 backdrop-blur-sm px-2.5 sm:px-3 lg:px-4 py-1 sm:py-1.5 lg:py-2 text-sm sm:text-base lg:text-lg font-serif text-emerald-700 shadow-lg">
                    {s.price}
                  </span>
                  <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4 lg:p-6">
                    <h3 className="font-serif text-base sm:text-xl lg:text-2xl text-white leading-snug">{s.name}</h3>
                    <p className="text-[9px] sm:text-xs text-stone-200/80 mt-1 sm:mt-1.5 lg:mt-2 tracking-wide font-light">{s.duration}</p>
                  </div>
                </div>

                <div className="mt-3 sm:mt-4 grid grid-cols-2 gap-2 lg:gap-3">
                  <a href="tel:+918796910363"
                    className="flex items-center justify-center gap-1.5 lg:gap-2 rounded-full border border-stone-200 bg-white px-2.5 sm:px-3 py-2.5 lg:py-3 text-[11px] sm:text-xs lg:text-sm font-medium text-stone-700 transition-all duration-300 hover:border-emerald-300 hover:text-emerald-700 hover:shadow-md active:scale-95 touch-manipulation">
                    <Phone size={13} className="sm:size-[14px] lg:size-[15px]" /> Call Now
                  </a>
                  <a href={buildServiceWhatsAppLink(s, selectedLocation || "Delhi NCR")}
                    target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 lg:gap-2 rounded-full bg-emerald-700 px-2.5 sm:px-3 py-2.5 lg:py-3 text-[11px] sm:text-xs lg:text-sm font-medium text-white transition-all duration-300 hover:bg-emerald-800 hover:shadow-lg hover:shadow-emerald-700/25 active:scale-95 touch-manipulation">
                    <MessageCircle size={13} className="sm:size-[14px] lg:size-[15px]" /> WhatsApp
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery preview */}
      <section className="pb-10 sm:pb-16 lg:pb-20 xl:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-4 sm:mb-6 lg:mb-8 xl:mb-12">
            <div>
              <p className="text-emerald-600 text-[9px] xs:text-[10px] sm:text-xs lg:text-sm tracking-[0.15em] sm:tracking-[0.2em] lg:tracking-[0.25em] uppercase font-light mb-1.5 sm:mb-2 lg:mb-3">Inside Mahika</p>
              <h2 className="font-serif text-[1.5rem] xs:text-2xl sm:text-3xl lg:text-4xl text-stone-900">A look around our rooms</h2>
            </div>
            <button onClick={() => setPage("gallery")} className="hidden sm:flex items-center gap-2 text-sm text-stone-500 hover:text-emerald-700 transition-colors group mt-3 sm:mt-0">
              Full gallery <ChevronRight size={15} className="transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-1.5 sm:gap-2 lg:gap-4">
            {GALLERY.map((g, i) => (
              <figure key={g.src}
                className={`group relative overflow-hidden rounded-lg sm:rounded-xl lg:rounded-2xl ${
                  i === 0 ? "col-span-2 md:row-span-2 aspect-[4/3] md:aspect-square" : "aspect-[4/5]"
                }`}>
                <img src={g.src} alt={g.alt} loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <figcaption className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 lg:p-5 text-[8px] xs:text-[9px] sm:text-xs lg:text-sm text-white translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 font-light">
                  {g.alt}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Closing testimonial */}
      <section className="bg-stone-900 py-10 sm:py-16 lg:py-20 xl:py-28">
        <div className="max-w-3xl sm:max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Star className="mx-auto text-emerald-400/60 mb-3 sm:mb-4 lg:mb-6 sm:size-[24px] lg:size-[32px]" size={20} />
          <p className="font-serif text-base xs:text-lg sm:text-2xl lg:text-3xl xl:text-4xl text-stone-100 leading-relaxed">
            "I stopped in during a work trip through Aerocity, expecting nothing
            more than a quick massage. Left an hour later completely unwound."
          </p>
          <p className="text-stone-400 text-xs sm:text-sm mt-4 sm:mt-5 lg:mt-8 tracking-wide font-light">Priya M. — Aerocity Branch</p>
        </div>
      </section>
    </div>
  );
}

/* ============================================================
   SERVICES PAGE
   ============================================================ */
function ServicesPage({ setPage, selectedLocation }) {
  const [filter, setFilter] = useState("All");

  const services = [
    { name: "Russian Massage", tag: "Signature", duration: "60 min", price: "₹3,500",
      desc: "Experience the ultimate relaxation and rejuvenation with our Russian massage services. Our skilled and experienced massage therapists use traditional techniques to provide a personalized massage experience that meets your unique needs and preferences.",
      img: "mbr-506x337.jpg" },
    { name: "Body to Body Massage", tag: "Signature", duration: "60 min", price: "₹4,000",
      desc: "Experience the ultimate pleasure and relaxation with our body to body massage services. Our skilled massage therapists use a full body approach to provide a unique and customized massage experience that is designed to meet your specific needs.",
      img: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?q=80&w=1200&auto=format&fit=crop" },
    { name: "Swedish Massage", tag: "Relaxation", duration: "60 min", price: "₹2,800",
      desc: "Discover the ultimate relaxation and healing with our Swedish massage services. Our skilled massage therapists use long and smooth strokes, kneading, and circular movements to release tension and promote deep relaxation.",
      img: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=1200&auto=format&fit=crop" },
    { name: "Hot Stone Massage", tag: "Therapeutic", duration: "75 min", price: "₹3,800",
      desc: "Our skilled massage therapists use smooth, heated stones to apply pressure and promote deep relaxation. The heat from the stones can help to increase circulation, reduce muscle tension, and promote overall well-being.",
      img: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?q=80&w=1200&auto=format&fit=crop" },
    { name: "Hot Oil Massage", tag: "Therapeutic", duration: "60 min", price: "₹3,200",
      desc: "Looking for a massage experience that goes beyond relaxation? Our skilled massage therapists use warm, natural oils that are infused with essential oils to promote deep relaxation and nourish the skin.",
      img: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=1200&auto=format&fit=crop" },
    { name: "4 Hand Massage", tag: "Signature", duration: "60 min", price: "₹5,500",
      desc: "Experience the ultimate relaxation with our 4 hand massage services. Two skilled massage therapists work in harmony to provide a synchronized massage experience that is designed to melt away tension and leave you feeling rejuvenated.",
      img: "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?q=80&w=1200&auto=format&fit=crop" },
    { name: "Body Lotion Massage", tag: "Relaxation", duration: "60 min", price: "₹2,500",
      desc: "Indulge in the ultimate pampering experience with our body lotion massage services. Our skilled massage therapists use a specially-formulated lotion that is designed to nourish and hydrate the skin while providing a deeply relaxing massage experience.",
      img: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=1200&auto=format&fit=crop" },
    { name: "Deep Tissue Massage", tag: "Therapeutic", duration: "60 min", price: "₹3,600",
      desc: "Looking for a massage that goes beyond relaxation? Our deep tissue massage services are designed to release deep-seated tension and muscle knots. Our skilled massage therapists use slow, deep strokes to target the underlying muscle tissue, promoting circulation and easing tension.",
      img: "https://images.unsplash.com/photo-1639162906614-0603b0ae95fd?q=80&w=1200&auto=format&fit=crop" },
  ];

  const SERVICE_TAGS = ["All", "Signature", "Relaxation", "Therapeutic"];
  const RITUAL_STEPS = [
    ["01", "Consultation", "We begin with a brief conversation about your needs, preferences, and any areas of tension."],
    ["02", "The Treatment", "Your therapist tailors the pressure, oils, and techniques to your body and goals."],
    ["03", "Aftercare", "We finish with guidance on hydration and stretching to extend the benefits at home."],
  ];

  const shown = filter === "All" ? services : services.filter((s) => s.tag === filter);
  const location = selectedLocation || "Delhi NCR";

  return (
    <div className="animate-fadeIn">
      <section className="relative overflow-hidden min-h-[40vh] sm:min-h-[50vh] flex items-center">
        <img src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1800&auto=format&fit=crop"
          alt="Massage oils and fresh flowers" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950/92 via-stone-950/80 to-stone-900/50" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-28 lg:pt-32 xl:pt-40 pb-10 sm:pb-14 lg:pb-16 xl:pb-20">
          <span className="inline-flex items-center gap-1.5 sm:gap-2 lg:gap-3 rounded-full border border-stone-400/20 bg-white/5 px-2.5 sm:px-3 lg:px-5 py-1 sm:py-1.5 lg:py-2 text-[9px] sm:text-[10px] lg:text-[11px] uppercase tracking-[0.15em] sm:tracking-[0.2em] lg:tracking-[0.25em] text-stone-300 backdrop-blur-sm">
            <Sparkles size={10} className="sm:size-[12px] lg:size-[13px]" /> Our Menu
          </span>
          <h1 className="mt-4 sm:mt-5 lg:mt-6 xl:mt-8 font-serif text-[1.8rem] xs:text-[2.2rem] sm:text-[2.8rem] lg:text-[4rem] xl:text-[5rem] leading-[1.05] text-white max-w-2xl lg:max-w-3xl">
            Treatments, <span className="italic text-emerald-300">priced simply.</span>
          </h1>
          <p className="mt-3 sm:mt-4 lg:mt-5 xl:mt-6 text-stone-300 text-[13px] sm:text-base lg:text-lg leading-relaxed max-w-lg lg:max-w-xl font-light">
            Every treatment below is available at all twenty-five branches. Prices
            are per session and include a short consultation before we begin.
          </p>
        </div>
      </section>

      <div className="sticky top-14 sm:top-20 lg:top-24 z-30 border-b border-stone-200/60 bg-white/92 backdrop-blur-xl shadow-sm">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2.5 sm:py-3 lg:py-4 flex items-center justify-between gap-3 sm:gap-4 lg:gap-6">
          <div className="flex gap-1 sm:gap-1.5 lg:gap-2 overflow-x-auto no-scrollbar -mx-2 px-2">
            {SERVICE_TAGS.map((t) => (
              <button key={t} onClick={() => setFilter(t)}
                className={`whitespace-nowrap rounded-full px-2.5 sm:px-3 lg:px-5 py-1.5 sm:py-2 lg:py-2.5 text-[10px] sm:text-xs lg:text-sm transition-all duration-300 touch-manipulation ${
                  filter === t ? "bg-emerald-700 text-white shadow-lg shadow-emerald-700/20" : "border border-stone-200 text-stone-500 hover:border-stone-300 hover:text-stone-700"
                }`}>
                {t}
              </button>
            ))}
          </div>
          <p className="hidden sm:block text-[10px] sm:text-xs uppercase tracking-[0.15em] sm:tracking-[0.2em] text-stone-400 font-light flex-shrink-0">
            {shown.length} treatment{shown.length === 1 ? "" : "s"}
          </p>
        </div>
      </div>

      <section className="py-10 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
            {shown.map((s) => (
              <article key={s.name} className="group flex flex-col">
                <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl aspect-[4/3] shadow-md hover:shadow-2xl transition-shadow duration-500">
                  <img src={s.img} alt={s.name} loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
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

                <div className="mt-4 lg:mt-5 grid grid-cols-2 gap-2 lg:gap-3">
                  <a href="tel:+918796910363"
                    className="flex items-center justify-center gap-1.5 lg:gap-2 rounded-full border border-stone-200 bg-white px-2.5 sm:px-3 py-2.5 lg:py-3 text-[11px] sm:text-xs lg:text-sm font-medium text-stone-700 transition-all duration-300 hover:border-emerald-300 hover:text-emerald-700 hover:shadow-md active:scale-95 touch-manipulation">
                    <Phone size={13} className="sm:size-[14px] lg:size-[15px]" /> Call Now
                  </a>
                  <a href={buildServiceWhatsAppLink(s, location)} target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 lg:gap-2 rounded-full bg-emerald-700 px-2.5 sm:px-3 py-2.5 lg:py-3 text-[11px] sm:text-xs lg:text-sm font-medium text-white transition-all duration-300 hover:bg-emerald-800 hover:shadow-lg hover:shadow-emerald-700/25 active:scale-95 touch-manipulation">
                    <MessageCircle size={13} className="sm:size-[14px] lg:size-[15px]" /> WhatsApp
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-stone-50/80 border-y border-stone-200/60 py-10 sm:py-16 lg:py-20 xl:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-emerald-600 text-[9px] xs:text-[10px] sm:text-xs lg:text-sm tracking-[0.15em] sm:tracking-[0.2em] lg:tracking-[0.25em] uppercase font-light mb-1.5 sm:mb-2 lg:mb-3">The Ritual</p>
          <h2 className="font-serif text-[1.5rem] xs:text-2xl sm:text-3xl lg:text-4xl text-stone-900 mb-5 sm:mb-6 lg:mb-8 xl:mb-12">How a session goes</h2>
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
                <a href="tel:+911140001234"
                  className="flex flex-1 sm:flex-none items-center justify-center gap-1.5 sm:gap-2 lg:gap-3 whitespace-nowrap rounded-full bg-emerald-600 px-4 sm:px-5 lg:px-8 py-2.5 sm:py-3 lg:py-4 text-xs sm:text-sm font-medium text-white transition-all duration-300 hover:bg-emerald-500 hover:shadow-lg hover:shadow-emerald-600/25 active:scale-95">
                  <Phone size={13} className="sm:size-[14px] lg:size-[15px]" /> <span className="hidden xs:inline">+91 11 4000 1234</span>
                </a>
                <button onClick={() => { setPage("locations"); window.scrollTo(0, 0); }}
                  className="flex flex-1 sm:flex-none items-center justify-center whitespace-nowrap rounded-full border border-white/20 bg-white/5 px-4 sm:px-5 lg:px-8 py-2.5 sm:py-3 lg:py-4 text-xs sm:text-sm font-medium text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/15 active:scale-95">
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

function AboutPage({ setPage }) {
  return (
    <div className="animate-fadeIn">
      <section className="relative overflow-hidden min-h-[45vh] sm:min-h-[55vh] flex items-center">
        <img src="https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?q=80&w=1800&auto=format&fit=crop"
          alt="Spa treatment room with warm light" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950/92 via-stone-950/75 to-stone-900/40" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-28 lg:pt-32 xl:pt-40 pb-10 sm:pb-14 lg:pb-20">
          <span className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-stone-400/20 bg-white/5 px-2.5 sm:px-4 py-1 sm:py-1.5 text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-stone-300 backdrop-blur-sm">
            <Heart size={11} /> About Us
          </span>
          <h1 className="mt-4 sm:mt-5 lg:mt-6 font-serif text-[1.8rem] xs:text-[2.2rem] sm:text-[2.8rem] lg:text-[4rem] xl:text-[4.5rem] leading-[1.05] text-white max-w-2xl">
            A quieter kind of <span className="italic text-emerald-300">luxury.</span>
          </h1>
          <p className="mt-3 sm:mt-4 lg:mt-5 text-stone-300 text-[13px] sm:text-base lg:text-lg leading-relaxed max-w-xl font-light">
            Mahika Russian Spa was built on one belief — that genuine relaxation
            cannot be rushed. Since opening our first room in Aerocity, that
            belief has shaped every branch we've opened across Delhi NCR.
          </p>
        </div>
      </section>

      <section className="py-10 sm:py-16 lg:py-20 xl:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-16 items-center">
          <div className="order-2 lg:order-1">
            <p className="text-emerald-600 text-[9px] sm:text-xs lg:text-sm tracking-[0.2em] lg:tracking-[0.25em] uppercase font-light mb-2 lg:mb-3">Our Philosophy</p>
            <h2 className="font-serif text-[1.5rem] xs:text-2xl sm:text-3xl lg:text-4xl text-stone-900 leading-tight">Twenty-five locations, one standard of care</h2>
            <div className="mt-4 lg:mt-6 flex items-start gap-3 lg:gap-5">
              <span className="mt-2 h-px w-10 lg:w-16 flex-shrink-0 bg-emerald-400/60" />
              <div className="space-y-4 text-sm sm:text-base text-stone-600 font-light leading-relaxed">
                <p>We do not treat our branches as separate businesses. Every therapist is trained in the same protocols, every room is held to the same cleanliness standard, and every guest receives the same unhurried attention — whether you walk into Aerocity or Punjabi Bagh.</p>
                <p>Our oils are pure, warmed before use, and chosen for your skin. Our rooms are private and sound-treated. Our therapists work to your pace, not a clock. These are small things individually, but together they are the difference between a massage and a ritual.</p>
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2 grid grid-cols-2 gap-2 sm:gap-3 lg:gap-4">
            <img src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=800&auto=format&fit=crop" alt="Massage oils and fresh flowers" className="rounded-2xl sm:rounded-3xl object-cover h-40 sm:h-56 lg:h-72 w-full shadow-md" loading="lazy" />
            <img src="https://images.unsplash.com/photo-1595871151608-bc7abd1caca3?q=80&w=800&auto=format&fit=crop" alt="Vanity table with mirror" className="rounded-2xl sm:rounded-3xl object-cover h-40 sm:h-56 lg:h-72 w-full shadow-md mt-4 sm:mt-6 lg:mt-8" loading="lazy" />
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-16 lg:py-20 bg-stone-50/70 border-y border-stone-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-emerald-600 text-[9px] sm:text-xs lg:text-sm tracking-[0.2em] lg:tracking-[0.25em] uppercase font-light mb-2 lg:mb-3">The Experience</p>
            <h2 className="font-serif text-[1.5rem] xs:text-2xl sm:text-3xl lg:text-4xl text-stone-900">What premium means here</h2>
          </div>
          <div className="mt-6 sm:mt-8 lg:mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
            {[
              { icon: <Sparkles size={22} />, title: "Trained therapists", body: "Every therapist completes our internal certification in classical and modern technique before working with guests." },
              { icon: <Droplets size={22} />, title: "Pure warmed oils", body: "No synthetic fragrance. Oils are warmed to skin temperature before your session begins." },
              { icon: <Flower2 size={22} />, title: "Private, calm rooms", body: "Sound-treated, individually climate-controlled rooms at every branch — the same standard everywhere." },
              { icon: <ShieldCheck size={22} />, title: "Hygiene first", body: "Fresh linen and sanitised equipment for every guest, without exception." },
              { icon: <Users size={22} />, title: "Unhurried pace", body: "Your therapist works to your comfort, not the clock. We build in time to settle before and after." },
              { icon: <Award size={22} />, title: "12k+ sessions a year", body: "Trusted by guests across Delhi NCR, with a 4.9 average rating across our 25 branches." },
            ].map((f) => (
              <div key={f.title} className="group rounded-2xl border border-stone-200/70 bg-white p-4 sm:p-5 lg:p-6 transition-all duration-500 hover:border-emerald-200/60 hover:shadow-lg hover:shadow-emerald-900/5">
                <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-emerald-100/70 flex items-center justify-center text-emerald-700 group-hover:bg-emerald-100 transition-colors">
                  {f.icon}
                </div>
                <h3 className="mt-3 lg:mt-4 font-serif text-base sm:text-lg lg:text-xl text-stone-900">{f.title}</h3>
                <p className="mt-1.5 lg:mt-2 text-xs sm:text-sm text-stone-500 font-light leading-relaxed">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-16 lg:py-20 xl:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-4">
            {[
              "https://images.unsplash.com/photo-1583416750470-965b2707b355?q=80&w=800&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1620733723572-11c53f73a416?q=80&w=800&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?q=80&w=800&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=800&auto=format&fit=crop",
            ].map((src, i) => (
              <div key={src} className="group relative overflow-hidden rounded-2xl lg:rounded-3xl aspect-[4/5]">
                <img src={src} alt={`Mahika Russian Spa interior ${i + 1}`} loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-stone-900 py-10 sm:py-16 lg:py-20 xl:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-emerald-400/80 text-[9px] sm:text-xs tracking-[0.2em] lg:tracking-[0.25em] uppercase font-light mb-2 lg:mb-3">Why Choose Us</p>
          <h2 className="font-serif text-[1.5rem] xs:text-2xl sm:text-3xl lg:text-4xl text-stone-100 leading-tight">The same quiet ritual, wherever you are in the city</h2>
          <p className="mt-4 lg:mt-6 text-stone-400 text-sm sm:text-base font-light leading-relaxed max-w-2xl mx-auto">
            Twenty-five branches across Delhi NCR means there is always a Mahika
            near you — at the airport, near your office, or a short drive from home.
            Choose a location and we will hold a slot for you today.
          </p>
          <div className="mt-6 lg:mt-10 flex flex-wrap justify-center gap-3">
            <button onClick={() => setPage("locations")}
              className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:bg-emerald-500 hover:shadow-lg hover:shadow-emerald-600/25 active:scale-95">
              <MapPin size={15} /> Find your branch
            </button>
            <button onClick={() => setPage("services")}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-medium text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/15 active:scale-95">
              View all services <ChevronRight size={15} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

function GalleryPage({ setPage }) {
  return (
    <div className="animate-fadeIn">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-28 lg:pt-32 xl:pt-40 pb-6 sm:pb-8 lg:pb-10">
        <p className="text-emerald-600 text-[9px] sm:text-xs lg:text-sm tracking-[0.2em] lg:tracking-[0.25em] uppercase font-light mb-2 lg:mb-3">Gallery</p>
        <h1 className="font-serif text-[1.6rem] xs:text-[2rem] sm:text-[2.2rem] lg:text-[3.5rem] xl:text-[4.5rem] leading-tight text-stone-900">
          A look inside <span className="italic text-emerald-600">Mahika.</span>
        </h1>
        <p className="mt-3 sm:mt-4 text-stone-500 text-[13px] sm:text-base max-w-2xl font-light">
          Treatment rooms, warm oils, and the quiet details that make every
          session feel like an escape — captured across our Delhi NCR branches.
        </p>
      </section>

      <section className="pb-14 sm:pb-20 lg:pb-28">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="columns-2 sm:columns-3 lg:columns-4 gap-2 sm:gap-3 lg:gap-4 [column-fill:_balance]">
            {FULL_GALLERY.map((g, i) => (
              <figure key={g.src + i}
                className="group relative mb-2 sm:mb-3 lg:mb-4 break-inside-avoid overflow-hidden rounded-xl sm:rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-500">
                <img src={g.src} alt={g.alt} loading="lazy"
                  className={`w-full object-cover transition-transform duration-700 group-hover:scale-[1.04] ${
                    i % 5 === 0 ? "aspect-[4/5]" : i % 3 === 0 ? "aspect-square" : "aspect-[4/3]"
                  }`} />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <figcaption className="absolute bottom-0 left-0 right-0 p-2.5 sm:p-3 lg:p-4 text-[9px] sm:text-[11px] lg:text-xs text-white translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 font-light">
                  {g.alt}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-stone-50/70 border-t border-stone-200/60 py-10 sm:py-14 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-[1.5rem] xs:text-2xl sm:text-3xl lg:text-4xl text-stone-900">Ready to step in?</h2>
          <p className="mt-3 text-stone-500 text-sm sm:text-base font-light max-w-xl mx-auto">
            Pick your nearest branch and we'll hold a slot for you today.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button onClick={() => setPage("locations")}
              className="inline-flex items-center gap-2 rounded-full bg-emerald-700 px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:bg-emerald-800 hover:shadow-lg active:scale-95">
              <MapPin size={15} /> Choose a location
            </button>
            <button onClick={() => setPage("services")}
              className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white px-6 py-3 text-sm font-medium text-stone-700 transition-all duration-300 hover:shadow-md active:scale-95">
              View services <ChevronRight size={15} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

function BookingForm({ location, services, compact = false }) {
  const serviceOptions = services && services.length ? services : ALL_TREATMENTS;
  const [form, setForm] = useState({
    name: "", phone: "", email: "",
    service: serviceOptions[0]?.name || "", message: "",
  });
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setForm((f) => {
      const valid = serviceOptions.some((s) => s.name === f.service);
      return valid ? f : { ...f, service: serviceOptions[0]?.name || "" };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  const waLink = () => {
    const message = [
      "Hello Mahika Russian Spa, I'd like to book an appointment.",
      "",
      "Name: " + form.name.trim(),
      "Phone: " + form.phone.trim(),
      form.email.trim() ? "Email: " + form.email.trim() : "",
      "Treatment: " + form.service,
      "Branch: " + location + " (Delhi NCR)",
      form.message.trim() ? "Message: " + form.message.trim() : "",
      "Preferred timing: any slot between 10 AM - 10 PM",
    ].filter(Boolean).join("\n");
    return "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(message);
  };

  const submit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) return setError("Please enter your name.");
    if (form.phone.replace(/\D/g, "").length < 10) return setError("Please enter a 10-digit mobile number.");
    if (form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) return setError("Please enter a valid email address.");
    setError("");
    const url = waLink();
    const win = window.open(url, "_blank", "noopener,noreferrer");
    if (!win) window.location.href = url;
    setSent(true);
  };

  const inputCls = "w-full mt-1 lg:mt-1.5 px-3 sm:px-4 lg:px-5 py-2.5 sm:py-3 lg:py-3.5 rounded-lg sm:rounded-xl border border-stone-200 bg-stone-50/50 focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:border-transparent transition-all text-sm sm:text-base touch-manipulation";
  const labelCls = "text-[10px] sm:text-xs text-stone-400 tracking-wide uppercase font-light";

  if (sent) {
    return (
      <div className="text-center py-6 lg:py-8">
        <span className="mx-auto mb-3 lg:mb-5 flex h-12 w-12 lg:h-16 lg:w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
          <MessageCircle size={24} className="lg:size-[28px]" />
        </span>
        <p className="font-serif text-lg sm:text-xl text-emerald-700 mb-1 lg:mb-2">WhatsApp opened</p>
        <p className="text-xs sm:text-sm text-stone-500 leading-relaxed font-light max-w-sm mx-auto">
          Your details for the {location} branch are ready in WhatsApp — just hit send and we'll confirm your slot.
        </p>
        <a href={waLink()} target="_blank" rel="noopener noreferrer"
          className="mt-4 lg:mt-6 inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 lg:px-6 py-2.5 lg:py-3 text-xs sm:text-sm font-medium text-white transition-all duration-300 hover:bg-emerald-700 hover:shadow-lg active:scale-95">
          <MessageCircle size={14} className="lg:size-[16px]" /> Open WhatsApp again
        </a>
        <button onClick={() => setSent(false)}
          className="mt-4 lg:mt-5 block mx-auto text-xs sm:text-sm text-emerald-700 border-b border-emerald-200 pb-0.5 hover:border-emerald-600 transition-colors touch-manipulation">
          Send another request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className={`flex flex-col ${compact ? "gap-3 sm:gap-4" : "gap-3 sm:gap-4 lg:gap-5"}`}>
      <div className="grid sm:grid-cols-2 gap-3 sm:gap-4 lg:gap-5">
        <div>
          <label className={labelCls}>Full name</label>
          <input value={form.name} onChange={(e) => { setForm({ ...form, name: e.target.value }); setError(""); }} className={inputCls} placeholder="Enter your name" />
        </div>
        <div>
          <label className={labelCls}>Phone number</label>
          <input value={form.phone} onChange={(e) => { setForm({ ...form, phone: e.target.value }); setError(""); }} className={inputCls} placeholder="10-digit mobile number" inputMode="tel" />
        </div>
      </div>

      <div>
        <label className={labelCls}>Email</label>
        <input type="email" value={form.email} onChange={(e) => { setForm({ ...form, email: e.target.value }); setError(""); }} className={inputCls} placeholder="you@example.com" />
      </div>

      <div className="grid sm:grid-cols-2 gap-3 sm:gap-4 lg:gap-5">
        <div>
          <label className={labelCls}>Location</label>
          <input value={location} readOnly className={`${inputCls} bg-emerald-50/50 text-emerald-800 cursor-default`} />
        </div>
        <div>
          <label className={labelCls}>Service</label>
          <select value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })} className={`${inputCls} appearance-none`}>
            {serviceOptions.map((s) => (
              <option key={s.name} value={s.name}>{s.name} · {s.price}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className={labelCls}>Message</label>
        <textarea value={form.message} onChange={(e) => { setForm({ ...form, message: e.target.value }); setError(""); }} rows={3} className={inputCls} placeholder="Any preferences or timing notes (optional)" />
      </div>

      {error && <p className="text-[11px] sm:text-xs text-rose-600 -mt-1">{error}</p>}

      <button type="submit"
        className="mt-1 flex items-center justify-center gap-2 bg-emerald-600 text-white py-3 lg:py-4 rounded-lg sm:rounded-xl text-sm font-medium transition-all duration-300 hover:bg-emerald-700 hover:shadow-lg hover:shadow-emerald-600/20 active:scale-95 touch-manipulation">
        <MessageCircle size={16} className="lg:size-[18px]" /> Send booking request
      </button>
      <p className="text-[10px] sm:text-[11px] text-stone-400 text-center leading-relaxed font-light">
        Opens WhatsApp with your name, number, branch and treatment already filled in.
      </p>
    </form>
  );
}

function LocationPage({ location, setPage }) {
  const services = getServicesForLocation(location);

  useEffect(() => {
    if (!location) {
      setPage("locations");
      window.scrollTo(0, 0);
    }
  }, [location, setPage]);

  if (!location) return null;

  return (
    <div className="animate-fadeIn">
      <section className="relative overflow-hidden min-h-[42vh] sm:min-h-[52vh] flex items-center">
        <img src="https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?q=80&w=1800&auto=format&fit=crop"
          alt={`Spa treatment room in ${location}`} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950/92 via-stone-950/78 to-stone-900/45" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-28 lg:pt-32 xl:pt-40 pb-10 sm:pb-14 lg:pb-20">
          <button onClick={() => { setPage("locations"); window.scrollTo(0, 0); }}
            className="inline-flex items-center gap-1.5 text-stone-300 hover:text-white text-xs sm:text-sm transition-colors mb-3">
            <ChevronLeft size={14} /> All locations
          </button>
          <span className="flex items-center gap-2 text-emerald-300/90 text-[10px] sm:text-xs uppercase tracking-[0.25em] font-light mb-2">
            <MapPin size={12} /> Branch · Delhi NCR
          </span>
          <h1 className="font-serif text-[1.5rem] xs:text-[1.9rem] sm:text-[2.6rem] lg:text-[3.8rem] xl:text-[4.4rem] leading-[1.08] text-white">
            Mahika Russian Spa — <span className="italic text-emerald-300">{location}</span>
          </h1>
          <p className="mt-3 sm:mt-4 text-stone-300 text-[13px] sm:text-base lg:text-lg max-w-xl font-light">
            {services.length} signature treatments available at our {location} branch, open daily from 10 AM to 10 PM.
          </p>
        </div>
      </section>

      <section className="py-10 sm:py-16 lg:py-20 xl:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6 sm:mb-8 lg:mb-10">
            <p className="text-emerald-600 text-[9px] sm:text-xs lg:text-sm tracking-[0.2em] lg:tracking-[0.25em] uppercase font-light mb-2 lg:mb-3">
              Services at {location}
            </p>
            <h2 className="font-serif text-[1.5rem] xs:text-2xl sm:text-3xl lg:text-4xl text-stone-900">Available treatments</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
            {services.map((s) => (
              <article key={s.name} className="group flex flex-col">
                <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl aspect-[4/3] shadow-md hover:shadow-2xl transition-shadow duration-500">
                  <img src={s.img} alt={s.name} loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <span className="absolute left-3 lg:left-5 top-3 lg:top-5 rounded-full bg-white/90 backdrop-blur-sm px-2.5 lg:px-4 py-1 lg:py-1.5 text-[9px] lg:text-[11px] uppercase tracking-wider text-emerald-700 font-medium">
                    {s.tag}
                  </span>
                </div>

                <div className="relative -mt-5 lg:-mt-6 mx-3 lg:mx-5 rounded-xl sm:rounded-2xl bg-white px-4 lg:px-5 py-3 lg:py-4 shadow-lg shadow-stone-900/8 flex items-baseline justify-between gap-3">
                  <div className="flex items-center gap-2 text-stone-400 text-[10px] lg:text-xs tracking-wide font-light">
                    <Clock size={11} className="lg:size-[13px]" /> {s.duration}
                  </div>
                  <p className="font-serif text-lg lg:text-2xl text-emerald-700 whitespace-nowrap">{s.price}</p>
                </div>

                <h3 className="mt-4 lg:mt-6 font-serif text-lg lg:text-2xl text-stone-900 leading-snug">{s.name}</h3>
                <p className="mt-1.5 lg:mt-2 text-xs sm:text-sm text-stone-500 leading-relaxed flex-1 font-light">{s.desc}</p>

                <div className="mt-4 lg:mt-5 grid grid-cols-2 gap-2 lg:gap-3">
                  <a href="tel:+918796910363"
                    className="flex items-center justify-center gap-1.5 lg:gap-2 rounded-full border border-stone-200 bg-white px-2.5 sm:px-3 py-2.5 lg:py-3 text-[11px] sm:text-xs lg:text-sm font-medium text-stone-700 transition-all duration-300 hover:border-emerald-300 hover:text-emerald-700 hover:shadow-md active:scale-95 touch-manipulation">
                    <Phone size={13} className="sm:size-[14px] lg:size-[15px]" /> Call Now
                  </a>
                  <a href={buildServiceWhatsAppLink(s, location)} target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 lg:gap-2 rounded-full bg-emerald-700 px-2.5 sm:px-3 py-2.5 lg:py-3 text-[11px] sm:text-xs lg:text-sm font-medium text-white transition-all duration-300 hover:bg-emerald-800 hover:shadow-lg hover:shadow-emerald-700/25 active:scale-95 touch-manipulation">
                    <MessageCircle size={13} className="sm:size-[14px] lg:size-[15px]" /> WhatsApp
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-stone-50/80 border-t border-stone-200/60 py-10 sm:py-16 lg:py-20 xl:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-5 gap-6 sm:gap-8 lg:gap-12">
          <div className="lg:col-span-2">
            <p className="text-emerald-600 text-[9px] sm:text-xs tracking-[0.2em] uppercase font-light mb-2 lg:mb-3">Book at {location}</p>
            <h2 className="font-serif text-[1.5rem] xs:text-2xl sm:text-3xl lg:text-4xl text-stone-900">Reserve your slot</h2>
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
            <div className="rounded-2xl sm:rounded-3xl border border-stone-200 bg-white p-4 sm:p-6 lg:p-8 shadow-lg shadow-stone-900/5">
              <BookingForm location={location} services={services} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function LocationsPage({ selectedLocation, setSelectedLocation, setPage }) {
  const [form, setForm] = useState({ name: "", phone: "", service: ALL_TREATMENTS[0].name });
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const selected = selectedLocation || LOCATIONS[0];
  const setSelected = setSelectedLocation || (() => {});

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

  const chooseLocation = (loc) => {
    setSelected(loc);
    setPage("location");
    setTimeout(() => window.scrollTo({ top: 0, behavior: "auto" }), 0);
  };

  return (
    <div className="animate-fadeIn">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-28 lg:pt-32 xl:pt-40 pb-5 sm:pb-6 lg:pb-8 xl:pb-10">
        <p className="text-emerald-600 text-[9px] xs:text-[10px] sm:text-xs lg:text-sm tracking-[0.15em] sm:tracking-[0.2em] lg:tracking-[0.25em] uppercase font-light mb-1.5 sm:mb-2 lg:mb-3">Find Us</p>
        <h1 className="font-serif text-[1.6rem] xs:text-2xl sm:text-[2.2rem] lg:text-[3.5rem] xl:text-[4.5rem] leading-tight text-stone-900 mb-2 sm:mb-3 lg:mb-4">25 branches across Delhi NCR</h1>
        <p className="text-stone-500 text-[13px] sm:text-base max-w-xl font-light">
          Tap a neighbourhood to open its branch page, view available treatments and send us your booking request.
        </p>
      </section>

      <div className="sticky top-14 sm:top-20 lg:top-24 z-30 border-b border-stone-200/60 bg-white/92 backdrop-blur-xl shadow-sm">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2.5 sm:py-3 lg:py-4 flex items-center justify-between gap-3 sm:gap-4 lg:gap-6">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <MapPin size={14} className="sm:size-[15px] lg:size-[16px] text-emerald-700 flex-shrink-0" />
            <span className="text-[10px] sm:text-xs lg:text-sm uppercase tracking-[0.12em] sm:tracking-[0.15em] text-stone-400 font-light flex-shrink-0 hidden xs:inline">Selected</span>
            <span className="font-serif text-sm sm:text-base lg:text-lg text-emerald-700 truncate">{selected} is selected</span>
          </div>
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.15em] sm:tracking-[0.2em] text-stone-400 font-light flex-shrink-0">
            {LOCATIONS.length} branches
          </span>
        </div>
      </div>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 lg:py-20 xl:py-28 grid lg:grid-cols-5 gap-6 sm:gap-8 lg:gap-10 xl:gap-12">
        <div className="lg:col-span-3">
          <div className="flex flex-wrap gap-1 sm:gap-1.5 lg:gap-3">
            {LOCATIONS.map((loc) => (
              <button key={loc} onClick={() => chooseLocation(loc)}
                className={`rounded-full border px-2.5 sm:px-2.5 lg:px-4 py-1.5 sm:py-1.5 lg:py-2.5 text-[11px] sm:text-xs lg:text-sm transition-all duration-300 touch-manipulation ${
                  selected === loc ? "bg-emerald-700 text-white border-emerald-700 shadow-lg shadow-emerald-700/15" : "border-stone-200 text-stone-600 hover:border-stone-300 hover:text-stone-800"
                }`}>
                {loc}
              </button>
            ))}
          </div>

          <img src="https://images.unsplash.com/photo-1583417657209-d3dd44dc9c09?q=80&w=1200&auto=format&fit=crop"
            alt="Spa reception ambience"
            className="mt-4 sm:mt-6 lg:mt-8 xl:mt-10 w-full rounded-xl sm:rounded-2xl object-cover h-32 sm:h-40 lg:h-48 xl:h-72 shadow-md" />

          <div className="mt-2.5 sm:mt-3 lg:mt-4 grid grid-cols-3 gap-1.5 sm:gap-2 lg:gap-4">
            <img src="https://images.unsplash.com/photo-1611920630418-f587fdc3bf94?q=80&w=500&auto=format&fit=crop" alt="Spa room decor" className="w-full rounded-lg sm:rounded-xl object-cover h-14 sm:h-16 lg:h-20 xl:h-28" />
            <img src="https://images.unsplash.com/photo-1630835425197-50feeba99ecd?q=80&w=500&auto=format&fit=crop" alt="Private treatment room" className="w-full rounded-lg sm:rounded-xl object-cover h-14 sm:h-16 lg:h-20 xl:h-28" />
            <img src="https://images.unsplash.com/photo-1652903761255-4fbf11cff931?q=80&w=500&auto=format&fit=crop" alt="Spa bathroom with wooden walls" className="w-full rounded-lg sm:rounded-xl object-cover h-14 sm:h-16 lg:h-20 xl:h-28" />
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="lg:sticky lg:top-32 sm:top-36 xl:top-40 rounded-2xl sm:rounded-3xl border border-stone-200 bg-white p-4 sm:p-5 lg:p-7 xl:p-9 shadow-lg shadow-stone-900/5">
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
                <a href={waLink()} target="_blank" rel="noopener noreferrer"
                  className="mt-3 sm:mt-4 lg:mt-6 inline-flex items-center justify-center gap-1.5 sm:gap-2 lg:gap-2.5 rounded-lg bg-emerald-600 px-3.5 sm:px-4 lg:px-6 py-2 sm:py-2.5 lg:py-3 text-xs sm:text-sm font-medium text-white transition-all duration-300 hover:bg-emerald-700 hover:shadow-lg active:scale-95">
                  <MessageCircle size={12} className="sm:size-[14px] lg:size-[16px]" /> Open WhatsApp again
                </a>
                <button onClick={() => setSent(false)}
                  className="mt-3 sm:mt-4 lg:mt-5 block mx-auto text-xs sm:text-sm text-emerald-700 border-b border-emerald-200 pb-0.5 hover:border-emerald-600 transition-colors touch-manipulation">
                  Send another request
                </button>
              </div>
            ) : (
              <form onSubmit={submit} className="flex flex-col gap-3 sm:gap-4 lg:gap-5">
                <div>
                  <label className="text-[10px] sm:text-xs text-stone-400 tracking-wide uppercase font-light">Your name</label>
                  <input value={form.name} onChange={(e) => { setForm({ ...form, name: e.target.value }); setError(""); }}
                    className="w-full mt-1 lg:mt-1.5 px-3 sm:px-4 lg:px-5 py-2.5 sm:py-3 lg:py-3.5 rounded-lg sm:rounded-xl border border-stone-200 bg-stone-50/50 focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:border-transparent transition-all text-sm sm:text-base touch-manipulation"
                    placeholder="Enter your name" />
                </div>
                <div>
                  <label className="text-[10px] sm:text-xs text-stone-400 tracking-wide uppercase font-light">Phone number</label>
                  <input value={form.phone} onChange={(e) => { setForm({ ...form, phone: e.target.value }); setError(""); }}
                    className="w-full mt-1 lg:mt-1.5 px-3 sm:px-4 lg:px-5 py-2.5 sm:py-3 lg:py-3.5 rounded-lg sm:rounded-xl border border-stone-200 bg-stone-50/50 focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:border-transparent transition-all text-sm sm:text-base touch-manipulation"
                    placeholder="10-digit mobile number" inputMode="tel" />
                </div>
                <div>
                  <label className="text-[10px] sm:text-xs text-stone-400 tracking-wide uppercase font-light">Treatment</label>
                  <select value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })}
                    className="w-full mt-1 lg:mt-1.5 px-3 sm:px-4 lg:px-5 py-2.5 sm:py-3 lg:py-3.5 rounded-lg sm:rounded-xl border border-stone-200 bg-stone-50/50 focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:border-transparent transition-all text-sm sm:text-base appearance-none touch-manipulation">
                    {getServicesForLocation(selected).map((s) => (
                      <option key={s.name} value={s.name}>{s.name} · {s.price}</option>
                    ))}
                  </select>
                </div>
                {error && <p className="text-[10px] sm:text-xs text-rose-600 -mt-1.5 sm:-mt-2 lg:-mt-2.5">{error}</p>}
                <button type="submit"
                  className="mt-0.5 sm:mt-1 lg:mt-2 flex items-center justify-center gap-1.5 sm:gap-2 lg:gap-2.5 bg-emerald-600 text-white py-2.5 sm:py-3 lg:py-4 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 hover:bg-emerald-700 hover:shadow-lg active:scale-95 touch-manipulation">
                  <MessageCircle size={13} className="sm:size-[15px] lg:size-[17px]" /> Send on WhatsApp
                </button>
                <p className="text-[10px] sm:text-[11px] text-stone-400 text-center leading-relaxed font-light">
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

  const [selectedLocation, setSelectedLocation] = useState(() => {
    if (typeof window === "undefined") return LOCATIONS[0];
    try {
      const stored = window.localStorage.getItem("mahika_selected_location");
      return stored && LOCATIONS.includes(stored) ? stored : LOCATIONS[0];
    } catch {
      return LOCATIONS[0];
    }
  });

  useEffect(() => {
    try {
      if (selectedLocation) window.localStorage.setItem("mahika_selected_location", selectedLocation);
    } catch { /* ignore */ }
  }, [selectedLocation]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

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
        @keyframes teamScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-fadeIn { animation: fadeIn 0.8s ease-out forwards; }
        .animate-team-scroll { animation: teamScroll 45s linear infinite; }
        .animate-team-scroll:hover { animation-play-state: paused; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @media (min-width: 480px) {
          .xs\\:inline { display: inline; }
        }
        @media (max-width: 479px) {
          .xs\\:inline { display: none; }
        }
        .touch-manipulation { touch-action: manipulation; }
        html, body { max-width: 100%; overflow-x: hidden; }

        /* iOS Safari can drop synthesized "click" events for buttons that
           live inside a scrollable container within a fixed element.
           A real cursor value restores them — and it also means every
           tappable element in the menus behaves like a link/button. */
        button, a, [role="option"] { cursor: pointer; }

        /* Better tap targets on touch devices */
        @media (hover: none) and (pointer: coarse) {
          button, a { -webkit-tap-highlight-color: transparent; }
        }
      `}</style>

      <LoadingScreen onComplete={() => setShowLoading(false)} />

      <div className={showLoading ? "hidden" : ""}>
        <Header
          page={page}
          setPage={setPage}
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
        />

        {page === "home" && (
          <HomePage setPage={setPage} selectedLocation={selectedLocation} />
        )}
        {page === "services" && (
          <ServicesPage setPage={setPage} selectedLocation={selectedLocation} />
        )}
        {page === "about" && <AboutPage setPage={setPage} />}
        {page === "gallery" && <GalleryPage setPage={setPage} />}
        {page === "locations" && (
          <LocationsPage
            selectedLocation={selectedLocation}
            setSelectedLocation={setSelectedLocation}
            setPage={setPage}
          />
        )}
        {page === "location" && (
          <LocationPage location={selectedLocation} setPage={setPage} />
        )}

        <Footer setPage={setPage} />

        <FloatingButtons />
      </div>
    </div>
  );
}