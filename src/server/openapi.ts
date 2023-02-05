/**
 * Note: Ada is the cheapest and fastest model; see
 * https://beta.openai.com/docs/models/gpt-3
 *
 * I'm using fine-tuned model from the training data. See ../gptGuessingGame/README.md
 */

import { Configuration, OpenAIApi } from "openai";
import { isBadWord } from "../utils/profanityFilter";
import { env } from "../env/server.mjs";

const configuration = new Configuration({
  apiKey: env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export const completerFactory =
  (model: string, opts?: { maxTokens?: number }) => async (prompt: string) => {
    return (
      await openai.createCompletion({
        max_tokens: opts?.maxTokens || 1,
        model,
        prompt: prompt,
      })
    ).data.choices[0]?.text;
  };

/**
 * OpenAI responses are quite chaotic; we need to do some cleanup for the
 * following cases:
 *
 * - inappropriate language
 * - non-word characters
 * - blank responses (ask GPT again for a random word, this time)
 */
// TODO: i18n
const cleanGuess = (guess?: string): string => {
  if (!guess) return "<blank>";

  guess = guess.toLowerCase();
  if (isBadWord(guess)) {
    return "<blank>";
  }

  // filter non-latin characters
  return (guess.match(/[a-z ]+/g) || []).join("");
};

const _gptGameCompleter = completerFactory(
  // "curie:ft-personal-2023-01-23-00-40-24",
  // "curie:ft-personal-2023-01-23-08-06-05",
  "text-davinci-003",
  // 'text-babbage-001',
  { maxTokens: 5 }
);

export const gptGameCompleter = async (guess: string): Promise<string> => {
  return cleanGuess(await _gptGameCompleter(guess));
};

export const _randomGuesser = completerFactory(
  "text-davinci-003",
  // 'text-babbage-001',
  {
    maxTokens: 5,
  }
);

export const randomGuesser = async (guess: string): Promise<string> => {
  return cleanGuess(await _randomGuesser(guess));
};
