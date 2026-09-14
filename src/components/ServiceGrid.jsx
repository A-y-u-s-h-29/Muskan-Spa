import ServiceCard from "./ServiceCard";

export default function ServiceGrid({ services, location, layout = "overlay", gridClass }) {
  const defaultGrid = layout === "overlay"
    ? "grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-8"
    : "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6 lg:gap-8";

  return (
    <div className={gridClass || defaultGrid}>
      {services.map((s) => (
        <ServiceCard key={s.name} service={s} location={location} layout={layout} />
      ))}
    </div>
  );
}