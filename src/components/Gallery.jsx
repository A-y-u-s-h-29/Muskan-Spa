import { GALLERY } from "../data/gallery";

export default function GalleryPreview() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-1.5 sm:gap-2 lg:gap-4">
      {GALLERY.map((g, i) => (
        <figure key={g.src}
          className={`group relative overflow-hidden rounded-lg sm:rounded-xl lg:rounded-2xl ${
            i === 0 ? "col-span-2 md:row-span-2 aspect-[4/3] md:aspect-square" : "aspect-[4/5]"
          }`}>
          <img src={g.src} alt={g.alt} loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <figcaption className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 lg:p-5 text-[8px] xs:text-[9px] sm:text-xs lg:text-sm text-white translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 font-light">
            {g.alt}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}