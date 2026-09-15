import { Phone, MessageCircle } from "lucide-react";
import { WHATSAPP_NUMBER } from "../data/locations";

export default function FloatingButtons() {
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
      <a href="tel:+918287674605" aria-label="Call now"
        className="group relative flex items-center justify-center h-11 w-11 sm:h-14 sm:w-14 rounded-full bg-emerald-700 text-white shadow-xl shadow-emerald-900/25 transition-all duration-300 hover:scale-110 hover:bg-emerald-800 active:scale-95">
        <Phone size={18} className="sm:size-[24px]" />
        <span className="hidden sm:block absolute right-full mr-3 whitespace-nowrap rounded-lg bg-stone-900 text-white text-xs px-3 py-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          Call Now
        </span>
      </a>
    </div>
  );
}