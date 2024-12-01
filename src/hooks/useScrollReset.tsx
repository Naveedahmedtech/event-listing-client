'use client'
import { useEffect } from 'react';

/**
 * Custom hook to reset scroll position to the top of the page.
 * It uses useEffect on mount to ensure it works for SSR as well.
 */
const useScrollReset = () => {
  useEffect(() => {
    // Reset scroll position to the top on every page load.
    window.scrollTo(0, 0);
  }, []); // Empty dependency array ensures this only runs on mount.
};

export default useScrollReset;
