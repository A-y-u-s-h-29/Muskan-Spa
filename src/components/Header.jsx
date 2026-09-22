import React, { useEffect, useState } from "react";
import { Phone, MapPin, ChevronRight, Menu, X } from "lucide-react";
import { LOCATIONS } from "../data/locations";
import { RUSSIAN_THERAPISTS } from "../data/team";
import { pickHeroImage } from "../components/Hero";

const LOCATION_GROUPS = [
  {
    label: "Airport & West",
    items: ["Mahipalpur", "Aerocity", "IGI Airport", "Dwarka", "Uttam Nagar", "Paschim Vihar", "Punjabi Bagh"],
  },
  {
    label: "South Delhi",
    items: ["Basant Kunj", "Saket", "Green Park", "Hauz Khas", "Malviya Nagar", "Lajpat Nagar", "South Delhi"],
  },
  {
    label: "Central Delhi",
    items: ["CP", "Karol Bagh", "Chanakyapuri", "Paharganj", "RK Puram", "Nehru Place"],
  },
  {
    label: "Outer Delhi & NCR",
    items: ["Rohini", "Mayur Vihar", "Noida", "Gurgaon", "Delhi"],
  },
];

export default function Header({ page, setPage, menuOpen, setMenuOpen, selectedLocation, setSelectedLocation }) {
  const [scrolled, setScrolled] = useState(false);
  const [locationOpen, setLocationOpen] = useState(false);
  const locationRef = React.useRef(null);
  const mobileLocationRef = React.useRef(null);
  const tapGuardRef = React.useRef(0);

  const hoverTimeoutRef = React.useRef(null);

  const nav = [
    ["home", "Home"],
    ["services", "Services"],
    ["about", "About"],
    ["gallery", "Gallery"],
    ["guides", "Guides"],
    ["contact", "Contact"],
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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

  const openLocationOnHover = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setLocationOpen(true);
  };
  const closeLocationOnHover = () => {
    hoverTimeoutRef.current = setTimeout(() => setLocationOpen(false), 150);
  };

  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    };
  }, []);

  // Header never overlays the hero image on any device.
  const overlay = false;

  const isLocationPage = page === "location";
  const heroBg = isLocationPage ? pickHeroImage(selectedLocation) : null;
  const heroTherapist = heroBg
    ? RUSSIAN_THERAPISTS.find((t) => t.img === heroBg) || null
    : null;

  // Header never overlays the hero image on any device.
  const locationOverlay = false;

  const tapOnce = (fn) => {
    const now = Date.now();
    if (now - tapGuardRef.current < 500) return;
    tapGuardRef.current = now;
    fn();
  };

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
    setTimeout(() => window.scrollTo({ top: 0, behavior: "auto" }), 0);
  };

  const toggleLocation = () => setLocationOpen((v) => !v);

  const viewAllBranches = () => {
    setPage("locations");
    setLocationOpen(false);
    setMenuOpen(false);
    window.scrollTo(0, 0);
  };

  const lightText = locationOverlay || overlay;

  const logoPrimary = lightText ? "text-white" : "text-emerald-800";
  const logoSecondary = lightText ? "text-white" : "text-stone-800";
  const logoTagline = lightText ? "text-stone-300" : "text-stone-400";
  const navBase = lightText
    ? "text-white/85 hover:text-white"
    : "text-stone-500 hover:text-stone-800";
  const navActive = lightText ? "text-emerald-300" : "text-emerald-700";
  const underline = lightText ? "bg-emerald-300" : "bg-emerald-600";
  const mobileIconColor = lightText
    ? "text-white hover:text-emerald-300"
    : "text-stone-700 hover:text-emerald-700";

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        locationOverlay
          ? "bg-gradient-to-b from-stone-950/70 via-stone-950/25 to-transparent"
          : overlay
          ? "bg-transparent"
          : "bg-white/95 backdrop-blur-xl shadow-sm"
      }`}
    >
      <div className="relative max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-between gap-2 h-16 sm:h-20 lg:h-24">
        <button
          {...tapHandlers(() => goToPage("home"))}
          className="text-left group flex-shrink min-w-0 mr-3 lg:mr-4"
        >
          <span className={`font-serif text-xl xs:text-2xl sm:text-xl lg:text-2xl xl:text-3xl tracking-tight ${logoPrimary}`}>Mahika</span>
          <span className={`font-serif text-xl xs:text-2xl sm:text-xl lg:text-2xl xl:text-3xl ${logoSecondary}`}> Russian Spa</span>
          <span className={`block text-[9px] xs:text-[10px] sm:text-[9px] lg:text-[10px] xl:text-[11px] uppercase tracking-[0.2em] xs:tracking-[0.25em] sm:tracking-[0.3em] lg:tracking-[0.35em] mt-0.5 font-light ${logoTagline}`}>
            {heroTherapist ? `Featuring ${heroTherapist.name}` : "Aerocity · Delhi NCR"}
          </span>
        </button>

        {/* DESKTOP NAV — only shows once there's room (lg and up) */}
        <nav className="hidden lg:flex items-center gap-3 lg:gap-5 xl:gap-7 flex-shrink-0">
          {nav.map(([key, label]) => (
            <button
              key={key}
              onClick={() => { setPage(key); window.scrollTo(0, 0); }}
              className={`text-[11px] lg:text-xs xl:text-sm tracking-[0.08em] lg:tracking-[0.1em] xl:tracking-[0.15em] uppercase font-light relative pb-1 whitespace-nowrap transition-colors duration-300 ${
                page === key ? navActive : navBase
              }`}
            >
              {label}
              <span className={`absolute bottom-0 left-0 h-[2px] transition-all duration-300 ${underline} ${page === key ? "w-full" : "w-0"}`} />
            </button>
          ))}

          <div
            className="relative"
            ref={locationRef}
            onMouseEnter={openLocationOnHover}
            onMouseLeave={closeLocationOnHover}
          >
            <button
              onClick={toggleLocation}
              aria-haspopup="listbox"
              aria-expanded={locationOpen}
              className={`flex items-center gap-1.5 text-[11px] lg:text-xs xl:text-sm tracking-[0.08em] lg:tracking-[0.1em] xl:tracking-[0.15em] uppercase font-light relative pb-1 whitespace-nowrap transition-colors duration-300 ${
                page === "locations" || page === "location" ? navActive : navBase
              }`}
            >
              <MapPin size={13} className="shrink-0" />
              <span className="truncate max-w-[90px] lg:max-w-[110px] xl:max-w-[140px]">
                {selectedLocation || "Locations"}
              </span>
              <ChevronRight
                size={12}
                className={`shrink-0 transition-transform duration-300 ${locationOpen ? "rotate-90" : ""}`}
              />
              <span className={`absolute bottom-0 left-0 h-[2px] transition-all duration-300 ${underline} ${page === "locations" || page === "location" ? "w-full" : "w-0"}`} />
            </button>

            {locationOpen && (
              <div
                role="listbox"
                className="absolute right-0 mt-3 w-[640px] max-w-[90vw] max-h-[70vh] overflow-y-auto rounded-2xl border border-stone-200 bg-white shadow-2xl shadow-stone-900/10 p-5 z-50"
              >
                <p className="px-1 pb-3 text-[10px] uppercase tracking-[0.2em] text-stone-400 font-light border-b border-stone-100">
                  Choose your location
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-4 mt-4">
                  {LOCATION_GROUPS.map((group) => (
                    <div key={group.label}>
                      <h3 className="text-[11px] font-medium uppercase tracking-[0.15em] text-emerald-700 mb-2 border-b border-emerald-100 pb-1">
                        {group.label}
                      </h3>
                      <ul className="space-y-1.5">
                        {group.items.map((loc) => {
                          const isSelected = loc === selectedLocation;
                          return (
                            <li key={loc}>
                              <button
                                type="button"
                                role="option"
                                aria-selected={isSelected}
                                {...tapHandlers(() => pickLocation(loc))}
                                className={`w-full text-left rounded-lg px-2 py-1.5 text-xs lg:text-sm transition-colors duration-200 truncate cursor-pointer ${
                                  isSelected
                                    ? "bg-emerald-50 text-emerald-700 font-medium"
                                    : "text-stone-600 hover:bg-stone-50 hover:text-stone-900"
                                }`}
                              >
                                {loc}
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  ))}
                </div>

                <div className="mt-4 pt-2 border-t border-stone-100">
                  <button
                    type="button"
                    {...tapHandlers(viewAllBranches)}
                    className="w-full text-left rounded-lg px-2 py-2 text-[11px] uppercase tracking-[0.15em] text-stone-400 hover:text-emerald-700 hover:bg-stone-50 transition-colors cursor-pointer"
                  >
                    View all branches →
                  </button>
                </div>
              </div>
            )}
          </div>

          <a href="tel:+918287674605"
             className="flex items-center gap-1.5 rounded-full bg-emerald-700 px-3 lg:px-4 xl:px-5 py-2 lg:py-2.5 text-[11px] lg:text-xs xl:text-sm text-white whitespace-nowrap transition-all duration-300 hover:bg-emerald-800 hover:shadow-lg hover:shadow-emerald-700/20">
            <Phone size={14} className="shrink-0" />
            <span className="hidden xl:inline">Call Now</span>
          </a>
        </nav>

        <button
          className={`lg:hidden transition-colors p-2 -mr-2 cursor-pointer ${mobileIconColor}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="lg:hidden max-h-[calc(100vh-3.5rem)] overflow-y-auto bg-white/98 backdrop-blur-xl border-t border-stone-100 px-4 sm:px-6 py-4 sm:py-6 flex flex-col gap-1">
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
              <div className="mt-1 mb-2 rounded-2xl border border-stone-200 bg-white p-3 sm:p-4 max-h-[55vh] overflow-y-auto">
                <p className="px-1 pb-2 text-[10px] uppercase tracking-[0.2em] text-stone-400 font-light border-b border-stone-100">
                  Choose your location
                </p>

                <div className="grid grid-cols-1 xs:grid-cols-2 gap-4 mt-3">
                  {LOCATION_GROUPS.map((group) => (
                    <div key={group.label}>
                      <h3 className="text-[10px] font-medium uppercase tracking-[0.15em] text-emerald-700 mb-1.5 border-b border-emerald-100 pb-1">
                        {group.label}
                      </h3>
                      <ul className="space-y-0.5">
                        {group.items.map((loc) => {
                          const isSelected = loc === selectedLocation;
                          return (
                            <li key={loc}>
                              <button
                                type="button"
                                {...tapHandlers(() => pickLocation(loc))}
                                className={`w-full text-left rounded-lg px-2.5 py-2 text-[13px] sm:text-sm transition-colors duration-200 truncate cursor-pointer ${
                                  isSelected
                                    ? "bg-emerald-50 text-emerald-700 font-medium"
                                    : "text-stone-600 hover:bg-stone-50 hover:text-stone-900 active:bg-stone-100"
                                }`}
                              >
                                {loc}
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  {...tapHandlers(viewAllBranches)}
                  className="mt-3 w-full text-left rounded-lg px-2.5 py-2.5 text-[11px] uppercase tracking-[0.15em] text-stone-400 hover:text-emerald-700 hover:bg-stone-50 transition-colors cursor-pointer border-t border-stone-100"
                >
                  View all branches →
                </button>
              </div>
            )}
          </div>

          <a href="tel:+918287674605"
             className="text-center bg-emerald-700 text-white text-sm sm:text-base px-6 py-3.5 rounded-full hover:bg-emerald-800 transition-colors mt-3">
            Call Now
          </a>
        </div>
      )}
    </header>
  );
}