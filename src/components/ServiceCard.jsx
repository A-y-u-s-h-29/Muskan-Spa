import { Phone, MessageCircle, Clock } from "lucide-react";
import { buildServiceWhatsAppLink } from "../utils/whatsapp";

export default function ServiceCard({ service, location, layout = "overlay" }) {
  const waHref = buildServiceWhatsAppLink(service, location || "Delhi NCR");
  const isOverlay = layout === "overlay";

  if (isOverlay) {
    return (
      <article className="group flex flex-col cursor-pointer">
        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl aspect-[4/5] shadow-md hover:shadow-2xl transition-shadow duration-500">
          <img src={service.img} alt={service.name} loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900/70 via-stone-900/20 to-transparent" />
          <span className="absolute top-3 sm:top-4 lg:top-5 right-3 sm:right-4 lg:right-5 rounded-full bg-white/95 backdrop-blur-sm px-2.5 sm:px-3 lg:px-4 py-1 sm:py-1.5 lg:py-2 text-sm sm:text-base lg:text-lg font-serif text-emerald-700 shadow-lg">
            {service.price}
          </span>
          <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4 lg:p-6">
            <h3 className="font-serif text-base sm:text-xl lg:text-2xl text-white leading-snug">{service.name}</h3>
            <p className="text-[9px] sm:text-xs text-stone-200/80 mt-1 sm:mt-1.5 lg:mt-2 tracking-wide font-light">{service.duration}</p>
          </div>
        </div>

        <div className="mt-3 sm:mt-4 grid grid-cols-2 gap-2 lg:gap-3">
          <a href="tel:+918796910363"
            className="flex items-center justify-center gap-1.5 lg:gap-2 rounded-full border border-stone-200 bg-white px-2.5 sm:px-3 py-2.5 lg:py-3 text-[11px] sm:text-xs lg:text-sm font-medium text-stone-700 transition-all duration-300 hover:border-emerald-300 hover:text-emerald-700 hover:shadow-md active:scale-95 touch-manipulation">
            <Phone size={13} className="sm:size-[14px] lg:size-[15px]" /> Call Now
          </a>
          <a href={waHref}
            target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 lg:gap-2 rounded-full bg-emerald-700 px-2.5 sm:px-3 py-2.5 lg:py-3 text-[11px] sm:text-xs lg:text-sm font-medium text-white transition-all duration-300 hover:bg-emerald-800 hover:shadow-lg hover:shadow-emerald-700/25 active:scale-95 touch-manipulation">
            <MessageCircle size={13} className="sm:size-[14px] lg:size-[15px]" /> WhatsApp
          </a>
        </div>
      </article>
    );
  }

  return (
    <article className="group flex flex-col">
      <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl aspect-[4/3] shadow-md hover:shadow-2xl transition-shadow duration-500">
        <img src={service.img} alt={service.name} loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <span className="absolute left-2.5 sm:left-3 lg:left-5 top-2.5 sm:top-3 lg:top-5 rounded-full bg-white/90 backdrop-blur-sm px-2 sm:px-2.5 lg:px-4 py-0.5 sm:py-1 lg:py-1.5 text-[8px] sm:text-[9px] lg:text-[11px] uppercase tracking-wider text-emerald-700 font-medium">
          {service.tag}
        </span>
      </div>

      <div className="relative -mt-4 sm:-mt-5 lg:-mt-6 mx-2.5 sm:mx-3 lg:mx-5 rounded-xl sm:rounded-2xl bg-white px-3 sm:px-4 lg:px-5 py-2.5 sm:py-3 lg:py-4 shadow-lg shadow-stone-900/8 flex items-baseline justify-between gap-2 sm:gap-3 lg:gap-4">
        <div className="flex items-center gap-1 sm:gap-1.5 lg:gap-2 text-stone-400 text-[9px] sm:text-[10px] lg:text-xs tracking-wide font-light">
          <Clock size={10} className="sm:size-[11px] lg:size-[13px]" /> {service.duration}
        </div>
        <p className="font-serif text-lg sm:text-xl lg:text-2xl text-emerald-700 whitespace-nowrap">{service.price}</p>
      </div>

      <h2 className="mt-3 sm:mt-4 lg:mt-5 xl:mt-6 font-serif text-lg sm:text-xl lg:text-2xl text-stone-900 leading-snug">{service.name}</h2>
      <p className="mt-1 sm:mt-1.5 lg:mt-2 text-xs sm:text-sm text-stone-500 leading-relaxed flex-1 font-light">{service.desc}</p>

      <div className="mt-4 lg:mt-5 grid grid-cols-2 gap-2 lg:gap-3">
        <a href="tel:+918796910363"
          className="flex items-center justify-center gap-1.5 lg:gap-2 rounded-full border border-stone-200 bg-white px-2.5 sm:px-3 py-2.5 lg:py-3 text-[11px] sm:text-xs lg:text-sm font-medium text-stone-700 transition-all duration-300 hover:border-emerald-300 hover:text-emerald-700 hover:shadow-md active:scale-95 touch-manipulation">
          <Phone size={13} className="sm:size-[14px] lg:size-[15px]" /> Call Now
        </a>
        <a href={waHref} target="_blank" rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 lg:gap-2 rounded-full bg-emerald-700 px-2.5 sm:px-3 py-2.5 lg:py-3 text-[11px] sm:text-xs lg:text-sm font-medium text-white transition-all duration-300 hover:bg-emerald-800 hover:shadow-lg hover:shadow-emerald-700/25 active:scale-95 touch-manipulation">
          <MessageCircle size={13} className="sm:size-[14px] lg:size-[15px]" /> WhatsApp
        </a>
      </div>
    </article>
  );
}