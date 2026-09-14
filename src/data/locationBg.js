const locationBg= [
    {img:"rl1.jpg"},
    {img:"rl3.webp"},
    {img:"rl4.jpg"},
    {img:"rl6.jpg"},
    {img:"COUPLE-MASSAGE-3.jpg"}
]

const locationBgForMobile=[
    {img:"r1.webp"},
    {img:"r2.jpg"},
    {img:"r3.jpg"},
    {img:"r4.webp"},
    {img:"r5.webp"},
    {img:"r6.webp"},
    {img:"r7.webp"}
]


/* Deterministic pick — same location always maps to same image pair,
   so the hero doesn't reshuffle on every re-render. */
export function pickLocationBgPair(location) {
  if (!location) return null;
  let hash = 0;
  for (let i = 0; i < location.length; i++) {
    hash = (hash * 31 + location.charCodeAt(i)) >>> 0;
  }
  return {
    desktop: locationBg[hash % locationBg.length].img,
    mobile: locationBgForMobile[hash % locationBgForMobile.length].img,
  };
}