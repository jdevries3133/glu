import { render, screen } from "@testing-library/react";
import GptGuess from "./gptGuess";

describe("GptGuessGame", () => {
  beforeEach(() => {
    render(<GptGuess />);
  });
  it("has a title", async () => {
    expect(await screen.findByRole("heading")).toHaveTextContent(
      "GPT Guessing Game"
    );
  });
});
