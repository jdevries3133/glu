import { LinkCard } from "./card";

export const GamesList = () => (
  <div className="flex flex-col items-center justify-center">
    <div className="prose">
      <h1>Game List</h1>
    </div>
    <LinkCard linkTo="/g/gptGuess">
      <h2>Chat GPT Guesing Game</h2>
      <p>Work in Progress!</p>
    </LinkCard>
  </div>
);
