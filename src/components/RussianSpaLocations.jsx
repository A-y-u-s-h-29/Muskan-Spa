import { MapPin, ArrowRight } from "lucide-react";
import { LOCATIONS } from "../data/locations";

/* ---------------------------------------------------------------
   Same grouping used by the header dropdown — keeps navigation
   and the landing grid visually consistent.
   --------------------------------------------------------------- */
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

/* ---------------------------------------------------------------
   Short one-liner per location — shown under the name in each box.
   Falls back to a generic line if a location isn't listed.
   --------------------------------------------------------------- */
const LOCATION_BLURBS = {
  Mahipalpur: "Steps from IGI Airport · open 24/7",
  Aerocity: "5-star hotel outlets · luxury rituals",
  "IGI Airport": "Rapid refresh between flights",
  Dwarka: "Russian Banya & Indian therapies",
  "Uttam Nagar": "Honest prices · full therapy menu",
  "Paschim Vihar": "Premium spa therapy in West Delhi",
  "Punjabi Bagh": "West Delhi's Russian spa home",
  "Basant Kunj": "Quiet South Delhi escape",
  Saket: "Aroma & hot-stone specialists",
  "Green Park": "Aroma therapy & hot stone",
  "Hauz Khas": "Our most relaxing aroma rituals",
  "Malviya Nagar": "Express & deep-tissue sessions",
  "Lajpat Nagar": "Authentic Banya in the heart of Lajpat Nagar",
  "South Delhi": "Most-loved therapists, all certified",
  CP: "Heart of Delhi · express or full ritual",
  "Karol Bagh": "Deep tissue & reflexology",
  Chanakyapuri: "Refined Russian spa rituals",
  Paharganj: "Peaceful retreat in Old Delhi",
  "RK Puram": "Four-hand & Balinese specialists",
  "Nehru Place": "Fast stress-release for professionals",
  Rohini: "Trusted Russian Banya rituals",
  "Mayur Vihar": "Deep tissue, reflexology, facials",
  Noida: "In-studio or at-home therapists",
  Gurgaon: "Trusted by Gurgaon's corporate crowd",
  Delhi: "Certified therapists across Delhi NCR",
};

function getBlurb(location) {
  return LOCATION_BLURBS[location] || "Certified Russian & Indian therapists";
}

export default function RussianSpaLocations({ setPage, setSelectedLocation, title, subtitle }) {
  const handlePick = (loc) => {
    if (setSelectedLocation) setSelectedLocation(loc);
    setPage("location");
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  return (
    <section className="bg-white py-12 sm:py-16 lg:py-20 xl:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14 lg:mb-16">
          <p className="text-emerald-600 text-[10px] sm:text-xs lg:text-sm tracking-[0.2em] lg:tracking-[0.25em] uppercase font-light mb-2 lg:mb-3">
            Our Locations
          </p>
          <h2 className="font-serif text-[1.5rem] xs:text-2xl sm:text-3xl lg:text-4xl text-stone-900">
            {title || (
              <>
                Russian Spa in <span className="italic text-emerald-700">Delhi NCR</span>
              </>
            )}
          </h2>
          <p className="mt-3 text-stone-500 text-sm sm:text-base font-light">
            {subtitle ||
              "Pick your nearest branch — open daily from 10 AM to 10 PM, with hotel outlets across the city."}
          </p>
        </div>

        {/* Groups */}
        <div className="space-y-10 sm:space-y-12 lg:space-y-14">
          {LOCATION_GROUPS.map((group) => (
            <div key={group.label}>
              {/* Group heading */}
              <div className="flex items-center gap-3 mb-4 sm:mb-6">
                <span className="w-8 h-[1px] bg-emerald-600 inline-block" />
                <h3 className="font-serif text-lg sm:text-xl lg:text-2xl text-stone-800">
                  {group.label}
                </h3>
              </div>

              {/* Cards */}
              <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5 sm:gap-5">
                {group.items.map((loc) => (
                  <button
                    key={loc}
                    type="button"
                    onClick={() => handlePick(loc)}
                    className="group text-left rounded-2xl border border-stone-200 bg-white p-4 sm:p-5 shadow-sm hover:shadow-xl hover:border-emerald-300 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer flex flex-col"
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <span className="inline-flex items-center gap-1.5 text-emerald-700">
                        <MapPin size={14} className="shrink-0" />
                        <span className="text-[10px] uppercase tracking-[0.18em] font-light">
                          Branch
                        </span>
                      </span>
                      <ArrowRight
                        size={16}
                        className="text-stone-300 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all duration-300 shrink-0"
                      />
                    </div>

                    <h4 className="font-serif text-base sm:text-lg text-stone-900 leading-snug truncate">
                      {loc}
                    </h4>

                    <p className="mt-1.5 text-[12px] sm:text-[13px] text-stone-500 font-light leading-snug line-clamp-2">
                      {getBlurb(loc)}
                    </p>

                    <span className="mt-4 inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.15em] text-emerald-700 font-light">
                      View branch
                      <ArrowRight size={11} />
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}