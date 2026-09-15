import { Phone, MapPin, Clock, MessageCircle } from "lucide-react";
import { WHATSAPP_NUMBER } from "../data/locations";

export default function Footer({ setPage }) {
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
            <Phone size={14} className="text-stone-500 flex-shrink-0" /> +91 8287674605
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