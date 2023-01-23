/**
 * Note: Ada is the cheapest and fastest model; see
 * https://beta.openai.com/docs/models/gpt-3
 *
 * I have created some fine-tuned models:
 *
 * - curie:ft-personal-2023-01-23-00-40-24
 *   - trained from initial data set
 *   - maybe a good option if Ada is too dumb
 *   - 4 epochs (too many, I guess)
 * - ada:ft-personal-2023-01-23-00-50-59
 *   - Ada version from initial data set
 *   - 4 epochs (too many, I guess)
 *
 */

import { Configuration, OpenAIApi } from "openai";
import { env } from "../env/server.mjs";

const configuration = new Configuration({
  apiKey: env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export const completerFactory = (model: string, opts?: {maxTokens?: number}) => async (prompt: string) => {
  return (
    await openai.createCompletion({
      max_tokens: opts?.maxTokens || 1,
      model,
      prompt: prompt,
    })
  ).data.choices[0]?.text;
};

export const gptGameCompleter = completerFactory('curie:ft-personal-2023-01-23-00-40-24')
