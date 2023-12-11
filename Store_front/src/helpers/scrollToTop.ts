import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { animateScroll as scroll } from "react-scroll";

export const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => {
      scroll.scrollToTop({ duration: 0});
    }, 150);
    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
};
