import { Star } from "lucide-react";
import { TESTIMONIALS } from "../data/testimonials";

export default function Testimonials() {
  return (
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
  );
}