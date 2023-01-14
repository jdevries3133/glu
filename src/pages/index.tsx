import { type NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";

import Image from "next/image";

const Home: NextPage = () => {
  const { status: authStatus } = useSession();
  return (
    <>
      <div
        className="min-h-screen bg-gradient-to-br from-sky-100 to-indigo-500
    pb-12"
      >
        <div className="flex items-center justify-center">
          <header
            className="relative mb-4 flex flex-col items-center
        rounded-b-xl bg-emerald-300 px-6 text-center shadow sm:flex-row"
          >
            <div className="relative my-2 h-24 w-24">
              <Image alt="glu logo" fill src="/static/glue.png" />
            </div>
            <p className="font-xl inline font-bold">
              Glu: <span className="font-light">for all things edu!</span>
            </p>
          </header>
          <div
            className="fixed top-0 right-0 rounded-bl-xl bg-lime-300
        p-2 shadow"
          >
            {authStatus === "loading" ? (
              <span>loading</span>
            ) : (
              <button
                onClick={authStatus === "authenticated" ? signOut : signIn}
                className="form-input rounded-xl bg-emerald-300 transition
          hover:bg-white"
              >
                Sign {authStatus === "authenticated" ? "Out" : "In"}
              </button>
            )}
          </div>
        </div>
        <article
          className="mb-4 flex min-h-screen flex-col items-center
      justify-center px-4"
        >
          <div className="flex flex-col items-center justify-center">
            <div className="flex max-w-prose flex-col gap-8">
              <div
                className="prose flex items-center justify-center gap-2
            rounded bg-opacity-30 p-4 transition hover:bg-gray-50 hover:shadow"
              >
                <p className="text-xl">
                  <span className="font-bold">glu</span> is the missing middle
                  of Ed Tech.
                </p>
              </div>
              <div className="relative h-12 -translate-y-12">
                <div className="not-prose relative h-28 md:w-[38rem]">
                  <Image
                    fill
                    alt="curvy shape decoration thingy"
                    src="/static/shape.svg"
                  />
                </div>
              </div>
            </div>
            <div
              className="prose mb-4 flex flex-wrap items-center
          justify-center rounded bg-opacity-30 p-4 transition hover:bg-gray-50
          hover:shadow"
            >
              <p className="text-xl">
                On the one hand, you have a bunch of awesome tech that teachers,
                parents, school administrators, and students all love and enjoy!
              </p>
            </div>
            <div
              className="7 relative grid grid-cols-2 gap-4
rounded           bg-emerald-600 p-4 shadow-2xl
          shadow-indigo-800 md:max-w-md md:grid-cols-3"
            >
              <div className="relative h-24 w-24">
                <Image fill alt="edpuzzle logo" src="/static/edpuzzle.webp" />
              </div>
              <div className="relative h-24 w-24">
                <Image
                  fill
                  alt="google classroom logo"
                  src="/static/goog_classroom.webp"
                />
              </div>
              <div className="relative h-24 w-24">
                <Image fill alt="kahoot log" src="/static/kahoot.webp" />
              </div>
              <div className="relative h-24 w-24">
                <Image fill alt="quizziz logo" src="/static/quizziz.webp" />
              </div>
              <div className="relative h-24 w-24">
                <Image fill alt="brainpop logo" src="/static/brainpop.webp" />
              </div>
              <div className="relative h-24 w-24">
                <Image fill alt="nearpod logo" src="/static/nearpod.webp" />
              </div>
            </div>
          </div>
        </article>
      </div>
      <article
        className="flex flex-col items-center justify-center border-t-8 border-black
    bg-gradient-to-br from-red-200 to-yellow-100 p-4"
      >
        <div
          className="prose mt-8 flex flex-wrap items-center justify-center
      rounded bg-opacity-30 transition hover:bg-gray-50 hover:shadow"
        >
          <p className="text-xl">
            On the other, antiquated Student Information Systems, stone-age
            state reporting portals, and Victorian era manual processes
            integrate these high-tech systems together.
          </p>
        </div>

        <div
          className="not-prose relative h-[16rem] overflow-visible md:h-[34rem]
      md:w-full md:-translate-x-16 md:-translate-y-4"
        >
          <Image
            fill
            alt="sad shape"
            src="/static/sad_shape.svg"
            sizes="100vw"
          />
        </div>

        <p className="w-40 -translate-y-24 md:-translate-x-32">
          Time is wasted, information is lost, collaborations are missed,
          education ails
        </p>
      </article>
    </>
  );
};
export default Home;
