import { lazy, Suspense, useEffect, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import FloatingButtons from "./components/FloatingButtons";
import HomePage from "./pages/Home";
import { LOCATIONS } from "./data/locations";

// Lazy-load everything except the home page
const ServicesPage = lazy(() => import("./pages/Services"));
const AboutPage = lazy(() => import("./pages/About"));
const GalleryPage = lazy(() => import("./pages/Gallery"));
const LocationsPage = lazy(() => import("./pages/Locations"));
const LocationPage = lazy(() => import("./pages/LocationPage"));
const GuidesPage = lazy(() => import("./pages/Guides"));
const ContactPage = lazy(() => import("./pages/Contact"));

// GuideArticle is a named export, so wrap it
const GuideArticle = lazy(() =>
  import("./pages/Guides").then((m) => ({ default: m.GuideArticle }))
);

export default function MahikaRussianSpaWebsite() {
  const [page, setPage] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
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

      <Header
        page={page}
        setPage={setPage}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
      />

      <Suspense fallback={<div className="min-h-[60vh]" aria-hidden="true" />}>
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
      </Suspense>

      <Footer setPage={setPage} />

      <FloatingButtons />
    </div>
  );
}