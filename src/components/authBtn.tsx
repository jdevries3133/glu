import { signIn, signOut, useSession } from "next-auth/react";

export const AuthBtn = () => {
  const { status: authStatus } = useSession();

  const authFn = () => {
    switch (authStatus) {
      case "authenticated":
        signOut().catch((e) => console.error(e));
        break;
      case "unauthenticated":
        signIn().catch((e) => console.error(e));
        break;
    }
  };

  return authStatus === "loading" ? (
    <span>loading</span>
  ) : (
    <button
      onClick={authFn}
      className="form-input rounded-xl bg-emerald-300 transition
          hover:bg-white"
    >
      Sign {authStatus === "authenticated" ? "Out" : "In"}
    </button>
  );
};
