import { useEffect } from "react";
import { rejection } from "utils/rejection";

/**
 * Client-side initialization for tw-elements; should be used exactly once in
 * _app.tsx and never again
 */
export const useSetupTwElements = () => {
  useEffect(() => {
    const use = async () => {
      (await import("tw-elements")).default;
    };
    use().catch(rejection);
  }, []);
};
