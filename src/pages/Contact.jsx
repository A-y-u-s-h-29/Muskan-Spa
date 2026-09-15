import React, { useEffect, useState } from "react";
import {
  Phone,
  MapPin,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  MessageCircle,
} from "lucide-react";

const ADDRESS =
  "Office No. 118, Defence Enclave, Adjoining Aerocity, Mahipalpur, New Delhi 110037";

const PHONE_DISPLAY = "+91 8287674605";
const PHONE_TEL = "+918287674605";
const WHATSAPP = "918287674605";
const EMAIL = "hello@mahikarussianspa.com";

export default function Contact({ selectedLocation }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (!form.name.trim() || !form.phone.trim()) {
      setError("Please add your name and phone number.");
      return;
    }
    // Open WhatsApp with the message pre-filled — no backend needed.
    const text = encodeURIComponent(
      `Hello Mahika Russian Spa,\n\nName: ${form.name}\nPhone: ${form.phone}\n${
        selectedLocation ? `Location: ${selectedLocation}\n` : ""
      }\n${form.message || "I'd like to enquire about a booking."}`
    );
    window.open(`https://wa.me/${WHATSAPP}?text=${text}`, "_blank");
    setSent(true);
    setForm({ name: "", phone: "", message: "" });
  };

  return (
    <main className="bg-white text-stone-800">
      {/* ---------------- HERO ---------------- */}
      <section className="pt-28 sm:pt-32 lg:pt-40 pb-10 sm:pb-14 bg-stone-50 border-b border-stone-100">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <p className="text-[11px] sm:text-xs uppercase tracking-[0.25em] text-emerald-700 font-light flex items-center gap-2">
            <MessageCircle size={14} className="sm:size-[15px]" />
            Contact
          </p>

          <h1 className="mt-4 font-serif text-3xl sm:text-4xl lg:text-5xl tracking-tight text-stone-900">
            Talk to us before you book
          </h1>

          <p className="mt-5 text-base sm:text-lg text-stone-600 font-light leading-relaxed max-w-2xl">
            Questions about a treatment, a location, or a time slot — call,
            WhatsApp, or send the short form below. We usually reply within a
            few minutes during working hours.
          </p>
        </div>
      </section>

      {/* ---------------- BODY ---------------- */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* LEFT: contact details */}
          <div className="lg:col-span-2 space-y-5">
            {/* phone */}
            <a
              href={`tel:${PHONE_TEL}`}
              className="group flex items-start gap-4 rounded-2xl border border-stone-200 bg-white p-5 sm:p-6 transition-all duration-300 hover:border-emerald-200 hover:shadow-lg hover:shadow-emerald-900/5"
            >
              <span className="flex-shrink-0 flex items-center justify-center w-11 h-11 rounded-full bg-emerald-50 text-emerald-700">
                <Phone size={18} />
              </span>
              <span className="min-w-0">
                <span className="block text-[10px] uppercase tracking-[0.2em] text-stone-400 font-light">
                  Call us
                </span>
                <span className="mt-1 block text-base sm:text-lg text-stone-900 group-hover:text-emerald-800 transition-colors">
                  {PHONE_DISPLAY}
                </span>
                <span className="mt-0.5 block text-xs text-stone-500 font-light">
                  Fastest way to confirm a slot
                </span>
              </span>
            </a>

            {/* whatsapp */}
            <a
              href={`https://wa.me/${WHATSAPP}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start gap-4 rounded-2xl border border-stone-200 bg-white p-5 sm:p-6 transition-all duration-300 hover:border-emerald-200 hover:shadow-lg hover:shadow-emerald-900/5"
            >
              <span className="flex-shrink-0 flex items-center justify-center w-11 h-11 rounded-full bg-emerald-50 text-emerald-700">
                <Send size={18} />
              </span>
              <span className="min-w-0">
                <span className="block text-[10px] uppercase tracking-[0.2em] text-stone-400 font-light">
                  WhatsApp
                </span>
                <span className="mt-1 block text-base sm:text-lg text-stone-900 group-hover:text-emerald-800 transition-colors">
                  Chat with us
                </span>
                <span className="mt-0.5 block text-xs text-stone-500 font-light">
                  Send photos, ask about therapists
                </span>
              </span>
            </a>

            {/* address */}
            <div className="flex items-start gap-4 rounded-2xl border border-stone-200 bg-white p-5 sm:p-6">
              <span className="flex-shrink-0 flex items-center justify-center w-11 h-11 rounded-full bg-emerald-50 text-emerald-700">
                <MapPin size={18} />
              </span>
              <span className="min-w-0">
                <span className="block text-[10px] uppercase tracking-[0.2em] text-stone-400 font-light">
                  Address
                </span>
                <span className="mt-1 block text-sm sm:text-[15px] text-stone-800 leading-relaxed">
                  {ADDRESS}
                </span>
              </span>
            </div>

            {/* email */}
            <a
              href={`mailto:${EMAIL}`}
              className="group flex items-start gap-4 rounded-2xl border border-stone-200 bg-white p-5 sm:p-6 transition-all duration-300 hover:border-emerald-200 hover:shadow-lg hover:shadow-emerald-900/5"
            >
              <span className="flex-shrink-0 flex items-center justify-center w-11 h-11 rounded-full bg-emerald-50 text-emerald-700">
                <Mail size={18} />
              </span>
              <span className="min-w-0">
                <span className="block text-[10px] uppercase tracking-[0.2em] text-stone-400 font-light">
                  Email
                </span>
                <span className="mt-1 block text-base sm:text-lg text-stone-900 group-hover:text-emerald-800 transition-colors break-all">
                  {EMAIL}
                </span>
              </span>
            </a>

            {/* hours */}
            <div className="flex items-start gap-4 rounded-2xl border border-stone-200 bg-white p-5 sm:p-6">
              <span className="flex-shrink-0 flex items-center justify-center w-11 h-11 rounded-full bg-emerald-50 text-emerald-700">
                <Clock size={18} />
              </span>
              <span className="min-w-0">
                <span className="block text-[10px] uppercase tracking-[0.2em] text-stone-400 font-light">
                  Hours
                </span>
                <span className="mt-1 block text-sm sm:text-[15px] text-stone-800 leading-relaxed">
                  Open daily · 10:00 AM – 10:00 PM
                </span>
              </span>
            </div>
          </div>

          {/* RIGHT: form */}
          <div className="lg:col-span-3">
            <div className="rounded-2xl border border-stone-200 bg-white p-6 sm:p-8 lg:p-10">
              {sent ? (
                <div className="text-center py-10">
                  <CheckCircle2
                    size={44}
                    className="mx-auto text-emerald-600"
                  />
                  <h3 className="mt-5 font-serif text-2xl text-stone-900">
                    Thank you — we'll be in touch
                  </h3>
                  <p className="mt-3 text-sm sm:text-[15px] text-stone-600 font-light leading-relaxed max-w-md mx-auto">
                    Your message has been opened in WhatsApp. If it didn't, just
                    call us directly at {PHONE_DISPLAY}.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSent(false)}
                    className="mt-6 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-emerald-700 hover:text-emerald-800 transition-colors cursor-pointer"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="font-serif text-2xl sm:text-3xl text-stone-900">
                    Send us a message
                  </h2>
                  <p className="mt-2 text-sm text-stone-500 font-light">
                    Fill in the short form — it opens in WhatsApp so we can
                    reply quickly.
                  </p>

                  <form
                    onSubmit={onSubmit}
                    className="mt-7 space-y-5"
                    noValidate
                  >
                    <div>
                      <label
                        htmlFor="ct-name"
                        className="block text-[10px] uppercase tracking-[0.2em] text-stone-500 font-light mb-2"
                      >
                        Your name
                      </label>
                      <input
                        id="ct-name"
                        type="text"
                        value={form.name}
                        onChange={update("name")}
                        placeholder="e.g. Rahul"
                        className="w-full rounded-xl border border-stone-200 bg-stone-50/50 px-4 py-3 text-sm text-stone-800 placeholder:text-stone-400 focus:outline-none focus:border-emerald-400 focus:bg-white transition-colors"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="ct-phone"
                        className="block text-[10px] uppercase tracking-[0.2em] text-stone-500 font-light mb-2"
                      >
                        Phone number
                      </label>
                      <input
                        id="ct-phone"
                        type="tel"
                        value={form.phone}
                        onChange={update("phone")}
                        placeholder="e.g. +91 8287674605"
                        className="w-full rounded-xl border border-stone-200 bg-stone-50/50 px-4 py-3 text-sm text-stone-800 placeholder:text-stone-400 focus:outline-none focus:border-emerald-400 focus:bg-white transition-colors"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="ct-msg"
                        className="block text-[10px] uppercase tracking-[0.2em] text-stone-500 font-light mb-2"
                      >
                        Message{" "}
                        <span className="text-stone-400 normal-case tracking-normal">
                          (optional)
                        </span>
                      </label>
                      <textarea
                        id="ct-msg"
                        rows={4}
                        value={form.message}
                        onChange={update("message")}
                        placeholder="Which treatment or time works for you?"
                        className="w-full rounded-xl border border-stone-200 bg-stone-50/50 px-4 py-3 text-sm text-stone-800 placeholder:text-stone-400 focus:outline-none focus:border-emerald-400 focus:bg-white transition-colors resize-none"
                      />
                    </div>

                    {selectedLocation && (
                      <p className="text-xs text-stone-500 font-light">
                        Preferred location:{" "}
                        <span className="text-emerald-700">
                          {selectedLocation}
                        </span>
                      </p>
                    )}

                    {error && (
                      <p className="text-xs text-red-600 font-light">
                        {error}
                      </p>
                    )}

                    <button
                      type="submit"
                      className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-emerald-700 px-6 py-3.5 text-sm text-white transition-all duration-300 hover:bg-emerald-800 hover:shadow-lg hover:shadow-emerald-700/20 cursor-pointer"
                    >
                      <Send size={15} />
                      Send via WhatsApp
                    </button>

                    <p className="text-[11px] text-stone-400 font-light text-center">
                      Or call directly at{" "}
                      <a
                        href={`tel:${PHONE_TEL}`}
                        className="text-emerald-700 hover:text-emerald-800"
                      >
                        {PHONE_DISPLAY}
                      </a>
                    </p>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}