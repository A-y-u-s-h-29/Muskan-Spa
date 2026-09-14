import { useEffect, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import FloatingButtons from "./components/FloatingButtons";
import HomePage from "./pages/Home";
import ServicesPage from "./pages/Services";
import AboutPage from "./pages/About";
import GalleryPage from "./pages/Gallery";
import LocationsPage from "./pages/Locations";
import LocationPage from "./pages/LocationPage";
import GuidesPage, { GuideArticle } from "./pages/Guides";
import ContactPage from "./pages/Contact";
import { LOCATIONS } from "./data/locations";

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

export default function MahikaRussianSpaWebsite() {
  const [page, setPage] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLoading, setShowLoading] = useState(true);
  const [selectedGuide, setSelectedGuide] = useState(null);

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

        button, a, [role="option"] { cursor: pointer; }

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
        {page === "guides" && (
          <GuidesPage setPage={setPage} setSelectedGuide={setSelectedGuide} />
        )}
        {page === "guide" && (
          <GuideArticle slug={selectedGuide} setPage={setPage} />
        )}
        {page === "contact" && (
          <ContactPage selectedLocation={selectedLocation} />
        )}

        <Footer setPage={setPage} />

        <FloatingButtons />
      </div>
    </div>
  );
}