import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import { ALL_TREATMENTS } from "../data/services";
import { WHATSAPP_NUMBER } from "../data/locations";

export default function BookingForm({ location, services, compact = false }) {
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