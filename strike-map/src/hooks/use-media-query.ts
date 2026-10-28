"use client";

import * as React from "react";

/** True while the media query matches. False during server render and the first client render. */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = React.useState(false);
  React.useEffect(() => {
    const mq = window.matchMedia(query);
    const update = () => setMatches(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [query]);
  return matches;
}

/** Phone-width layout (below Tailwind's `md` breakpoint). */
export const MOBILE_QUERY = "(max-width: 767px)";
