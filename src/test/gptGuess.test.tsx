import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import GptGuess from "pages/g/gptGuess";

// why this needs to be a relative path is a mystery to me
vi.mock("../hooks/usePlayer");

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
