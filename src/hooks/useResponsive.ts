'use client';

import { useEffect, useState } from 'react';

/**
 * Tailwind CSS breakpoints
 * sm: 640px
 * md: 768px  
 * lg: 1024px
 */
const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
} as const;

export type ResponsiveBreakpoints = {
  sm: boolean;
  md: boolean;
  lg: boolean;
};

/**
 * Hook that returns responsive breakpoint states based on current window width
 * Returns true if the current media width is below the threshold
 * 
 * @returns Object with boolean values for each breakpoint
 * 
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { sm, md, lg } = useResponsive();
 *   
 *   return (
 *     <div>
 *       {sm && <p>Small screen content</p>}
 *       {md && <p>Medium screen content</p>}
 *       {lg && <p>Large screen content</p>}
 *     </div>
 *   );
 * }
 * ```
 */
export function useResponsive(): ResponsiveBreakpoints {
  const [breakpoints, setBreakpoints] = useState<ResponsiveBreakpoints>({
    sm: false,
    md: false,
    lg: false,
  });

  useEffect(() => {
    const updateBreakpoints = () => {
      const width = window.innerWidth;
      
      setBreakpoints({
        sm: width < BREAKPOINTS.sm,
        md: width < BREAKPOINTS.md,
        lg: width < BREAKPOINTS.lg,
      });
    };

    // Set initial values
    updateBreakpoints();

    // Add event listener for window resize
    window.addEventListener('resize', updateBreakpoints);

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener('resize', updateBreakpoints);
    };
  }, []);

  return breakpoints;
}
