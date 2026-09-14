import { WHATSAPP_NUMBER } from "./locations";

export const HOTELS = [
  { name: "Pullman New Delhi Aerocity", shortName: "Pullman Aerocity", desc: "Relax with premium Russian spa treatments at Pullman Hotel, offering full-service luxury ideal for recovery after long international flights.", location: "Pullman New Delhi Aerocity", whatsapp: WHATSAPP_NUMBER,img:"h1.webp" },
  { name: "JW Marriott New Delhi Aerocity", shortName: "JW Marriott Aerocity", desc: "Unwind at JW Marriott's night spa with luxurious Russian massages and top-tier treatments available 24/7 for complete relaxation and comfort.", location: "JW Marriott New Delhi Aerocity", whatsapp: WHATSAPP_NUMBER,img:"h2.webp" },
  { name: "The Suryaa New Delhi (NFC)", shortName: "The Suryaa NFC", desc: "These premium hotels provide exceptional Russian massage spa experiences, ensuring your stay is both deeply relaxing and truly unforgettable every time.", location: "The Suryaa New Delhi (NFC)", whatsapp: WHATSAPP_NUMBER,img:"h3.webp" },
  { name: "Roseate House Aerocity", shortName: "Roseate House", desc: "These luxury hotels provide top-quality Russian massage spa services, ensuring every visit is soothing, refreshing, and truly a memorable experience.", location: "Roseate House Aerocity", whatsapp: WHATSAPP_NUMBER,img:"h4.webp" },
  { name: "Le Meridien C.P Delhi", shortName: "Le Meridien CP", desc: "At Le Meridien Delhi, experience a luxurious Russian spa that combines relaxation, elegance, expert therapy, and unmatched five-star hospitality.", location: "Le Meridien C.P Delhi", whatsapp: WHATSAPP_NUMBER,img:"h5.webp" },
  { name: "Aloft New Delhi Aerocity", shortName: "Aloft Aerocity", desc: "At Aloft New Delhi Aerocity, indulge in a luxurious Russian spa experience that perfectly blends deep relaxation with modern elegance in central Delhi.", location: "Aloft New Delhi Aerocity", whatsapp: WHATSAPP_NUMBER,img:"h6.webp" },
];

export const FACILITIES = ["Shower", "Hammam", "Jacuzzi Bath", "Steam Bath", "Sauna"];

/* ----------------------------------------------------------------
   Location-specific messages.
   Key = exact location string from LOCATIONS array.
   ---------------------------------------------------------------- */
export const LOCATION_MESSAGES = {
  Mahipalpur: "Our flagship Mahipalpur branch is minutes from IGI Airport — perfect for a refreshing reset before or after a long flight.",
  Aerocity: "Welcome to Aerocity — where our 5-star hotel outlets and certified Russian therapists bring you the finest Banya experience in Delhi NCR.",
  "Basant Kunj": "Basant Kunj guests love our deep-tissue and aroma rituals — a quiet escape in South Delhi's most relaxed neighbourhood.",
  Gurgaon: "Gurgaon's corporate crowd trusts our therapists for post-work deep tissue and stress-release sessions.",
  Dwarka: "Dwarka branch brings you authentic Russian Banya technique along with classic Indian wellness therapies.",
  Saket: "Saket is home to our most requested aroma and hot-stone specialists — a favourite among South Delhi regulars.",
  CP: "Connaught Place — heart of Delhi. Walk in for a quick express session or a full luxury ritual.",
  Delhi: "Serving all of Delhi with certified Russian and Indian therapists, available daily from 10 AM to 10 PM.",
  "Karol Bagh": "Karol Bagh guests enjoy our signature deep tissue and reflexology sessions — perfect after a long day.",
  Chanakyapuri: "Chanakyapuri's diplomatic calm meets our most refined Russian spa rituals.",
  "Green Park": "Green Park regulars come for our aroma therapy and hot stone treatments — deeply relaxing, every time.",
  Rohini: "Rohini's trusted spa destination for Russian Banya rituals and Indian Ayurvedic-style therapies.",
  "RK Puram": "RK Puram guests love our four-hand and Balinese specialists — book early, they fill fast.",
  "Uttam Nagar": "Uttam Nagar branch offers our full range of Russian and Indian therapies at honest prices.",
  "Mayur Vihar": "Mayur Vihar's quiet escape for deep tissue, reflexology and facial treatments.",
  "Malviya Nagar": "Malviya Nagar is a favourite for our express sessions and deep-tissue specialists.",
  "Hauz Khas": "Hauz Khas guests enjoy our most relaxing aroma therapy rituals — perfect after a long week.",
  "Paschim Vihar": "Paschim Vihar branch brings premium Russian spa therapy to West Delhi.",
  "Lajpat Nagar": "Lajpat Nagar's go-to spa for authentic Russian Banya and Indian deep tissue.",
  "Nehru Place": "Nehru Place professionals rely on us for fast, effective stress-release sessions.",
  "IGI Airport": "IGI Airport guests enjoy our rapid-refresh treatments between flights — open early and late.",
  Paharganj: "Paharganj branch — a peaceful retreat in the heart of Old Delhi's traveller hub.",
  Noida: "Noida clients trust our certified Russian and Indian therapists for deep relaxation at home or in-studio.",
  "South Delhi": "Serving all of South Delhi with our most-loved therapists — Russian and Indian, all certified.",
  "Punjabi Bagh": "Punjabi Bagh branch — West Delhi's home for premium Russian spa rituals.",
};

/* Normalise a location string so lookups are reliable. */
export function normalizeLocation(loc) {
  if (!loc) return "";
  return String(loc).trim().replace(/\s+/g, " ");
}

/* Robust lookup: exact match → case-insensitive match → generic fallback. */
export function getLocationMessage(location) {
  const key = normalizeLocation(location);
  if (!key) return "";

  // 1. exact
  if (LOCATION_MESSAGES[key]) return LOCATION_MESSAGES[key];

  // 2. case-insensitive match
  const lowerKey = key.toLowerCase();
  const matched = Object.keys(LOCATION_MESSAGES).find(
    (k) => k.toLowerCase() === lowerKey
  );
  if (matched) return LOCATION_MESSAGES[matched];

  // 3. generic fallback with the location name
  return `Welcome to Mahika Russian Spa — ${key}. Our certified Russian and Indian therapists are ready to help you unwind.`;
}