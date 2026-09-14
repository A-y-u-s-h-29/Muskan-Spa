// Shared navigation helpers.
// Currently a placeholder module to match the requested folder structure.
// Add scroll/navigation utilities here as the app grows.

export const scrollToTop = () => {
  if (typeof window !== "undefined") window.scrollTo(0, 0);
};