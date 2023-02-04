/**
 * Note: Ada is the cheapest and fastest model; see
 * https://beta.openai.com/docs/models/gpt-3
 *
 * I'm using fine-tuned model from the training data. See ../gptGuessingGame/README.md
 */

import { Configuration, OpenAIApi } from "openai";
import { env } from "../env/server.mjs";

const configuration = new Configuration({
  apiKey: env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export const completerFactory =
  (model: string, opts?: { maxTokens?: number }) => async (prompt: string) => {
    return (
      await openai.createCompletion({
        // max_tokens: opts?.maxTokens || 1,
        model,
        prompt: prompt,
      })
    ).data.choices[0]?.text;
  };

export const gptGameCompleter = completerFactory(
  // "curie:ft-personal-2023-01-23-00-40-24",
  "curie:ft-personal-2023-01-23-08-06-05",
  {maxTokens: 5}
);
