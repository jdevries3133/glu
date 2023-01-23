/**
 * I expect some variety of custom nav for different mini-apps as they will
 * likely have quite different aesthetics
 */

import Image from "next/image";
import { AuthBtn } from "components/authBtn";
import { AuthIcon } from "./authIcon";
import { useSession } from "next-auth/react";

export const DefaultHeader = () => (
  <header className="flex items-stretch justify-center">
    <div
      className="relative flex flex-grow flex-col items-center bg-emerald-300
        px-6 text-center shadow sm:mb-4 sm:max-w-xs sm:flex-row
        sm:rounded-b-xl
        "
    >
      <BrandingContent />
    </div>
    <AuthPanel />
  </header>
);

export const BrandingContent = () => (
  <>
    <div className="relative my-2 h-12 w-12 sm:h-24 sm:w-24">
      <Image alt="glu logo" fill src="/static/glue.png" />
    </div>
    <p className="font-xl inline font-bold">
      Glu: <span className="font-light">for all things edu!</span>
    </p>
  </>
);

const AuthPanel = () => {
  const { status } = useSession();

  const authedStyle = {
    button: "rounded-none rounded-bl-xl mx-0",
    container: "items-end justify-between pb-6 sm:pb-2",
  };
  const isAuthed = status === "authenticated";

  return (
    <div
      className={`flex flex-col justify-center ${
        isAuthed ? "" : "items-center"
      } gap-2 bg-lime-300 
        shadow sm:absolute sm:top-0 sm:right-0 sm:rounded-bl-xl
        ${isAuthed ? authedStyle.container : ""}`}
    >
      <AuthBtn className={isAuthed ? authedStyle.button : "m-4"} />
      <AuthIcon />
    </div>
  );
};
