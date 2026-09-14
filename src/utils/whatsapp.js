import { WHATSAPP_NUMBER } from "../data/locations";

export const buildServiceWhatsAppLink = (service, location) => {
  const message = [
    "Hello Mahika Russian Spa, I'd like to book the following service:",
    "",
    "Service: " + service.name,
    "Price: " + service.price,
    "Duration: " + service.duration,
    "Location: " + (location || "Delhi NCR"),
    "",
    "Please confirm my booking.",
  ].join("\n");
  return "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(message);
};