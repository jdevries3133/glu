import { isBadWord } from "./profanityFilter";

it("identifies a single bad word", () => {
  expect(isBadWord("fuck")).toBe(true);
});

it("identifies a bad word in a sentence", () => {
  expect(isBadWord("I do not give a fuck")).toBe(true);
});
