import { LinkCard } from "./card";

export const GamesList = () => (
  <div className="flex flex-col items-center justify-center">
    <div className="prose">
      <h1>Game List</h1>
    </div>
    <LinkCard
      linkTo="/g/gptGuess"
      bgColor="bg-gradient-to-tr from-blue-200 to-indigo-200 shadow-green-100 shadow-xl"
    >
      <h2>Chat GPT Guesing Game</h2>
      <p>Are you as smart as an AI?</p>
    </LinkCard>
  </div>
);
