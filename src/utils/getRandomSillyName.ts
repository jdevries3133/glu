import { title } from "./title";

// prettier-ignore
const adjective = [
  "absurd", "ostentatious", "adventurous", "charming", "cheesy", "bewildered",
  "enchanted", "fantastic", "fantastical", "fierce", "fearsome", "funny",
  "ferocious", "goofy", "silly", "hysterical", "confused", "dazed", "sleepy",
  "drowsy", "hungry", "ravenous", "ludicrous", "zany", "merry", "jolly",
  "tricky", "quirky", "sneaky", "savage", "wacky", "wild", "wonky", "whimsical",
  "zesty", "sweet", "greasy", "saucy", "lively", "bold", "brash"
];

// prettier-ignore
const noun = [
  "burger", "television", "bowl", "lamp", "painting", "couch", "potato", "tomato",
  "onion", "computer", "apartment", "cat", "dog", "mouse", "fish", "cow", "pig",
  "zucchini", "bacon", "soup", "turtle", "tortoise", "plant", "orange", "shoe",
  "umbrella", "mittens", "movie", "flower", "cactus", "pickle", "ice cream",
  "sandwich", "egg", "ballroom", "beard", "tornado", "lightning", "tsunami",
  "earthquake", "boingo", "glorp", "flubble", "bingle"
];

const random = <T>(collection: T[]) => {
  return collection[Math.floor(Math.random() * collection.length)] ?? "";
};

const an = (c: string[]) => title(random(c));
// :)
const a = an;

export const getRandomSillyName = () => {
  return `${an(adjective)} ${an(adjective)} ${a(noun)}`;
};
