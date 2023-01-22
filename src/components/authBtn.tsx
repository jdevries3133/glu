import { signIn, signOut, useSession } from "next-auth/react";
import { rejection } from "utils/rejection";
import { LoadingSpinner } from "./loadingSpinner";

export const AuthBtn: React.FC<{
  className?: string;
}> = ({ className }) => {
  const { status: authStatus } = useSession();

  const commonBtnStyles = "form-input mx-4 rounded-xl transition";

  switch (authStatus) {
    case "loading":
      return <LoadingSpinner />;

    case "unauthenticated":
      return (
        <button
          onClick={() => {
            signIn().catch(rejection);
          }}
          className={`${commonBtnStyles} bg-indigo-200 hover:bg-indigo-300 ${
            className || ""
          }`}
        >
          Sign In
        </button>
      );

    case "authenticated":
      return (
        <button
          onClick={() => {
            signOut().catch(rejection);
          }}
          className={`${commonBtnStyles} bg-red-200 hover:bg-red-300 ${
            className || ""
          }`}
        >
          Sign Out
        </button>
      );
  }
};
