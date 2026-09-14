import { useState } from "react";
import { MapPin, MessageCircle } from "lucide-react";
import { LOCATIONS, WHATSAPP_NUMBER } from "../data/locations";
import { ALL_TREATMENTS, getServicesForLocation } from "../data/services";

export default function LocationsPage({ selectedLocation, setSelectedLocation, setPage }) {
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