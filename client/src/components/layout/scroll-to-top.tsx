import { useEffect } from "react";
import { useLocation } from "wouter";

export default function ScrollToTop({ behavior = "auto" }: { behavior?: ScrollBehavior }) {
  const [location] = useLocation();

  useEffect(() => {
    try {
      window.scrollTo({ top: 0, behavior });
    } catch (e) {
      // fallback for environments without smooth scroll
      window.scrollTo(0, 0);
    }
  }, [location, behavior]);

  return null;
}
