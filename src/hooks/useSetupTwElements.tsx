import { useEffect } from "react";

/**
 * Client-side initialization for tw-elements; should be used exactly once in
 * _app.tsx and never again
 */
export const useSetupTwElements = () => {
  useEffect(() => {
    const use = async () => {
      (await import("tw-elements")).default;
    };
    use().catch((e) => console.error(e));
  }, []);
};
