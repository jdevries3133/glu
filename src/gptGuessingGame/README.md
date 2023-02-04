# GPT Guessing Game

An single-player incarnation of a classic childhood guessing game. This
directory includes concrete components, hooks, and backend services to support
this game.

## Creating Trained Models

See the top-level `package.json` for sending new versions of this data to
OpenAPI to create fine-tuned models.

## Training Data

Word list was created from two sources:

1. [synonyms from Kaggle](https://www.kaggle.com/datasets/duketemon/wordnet-synonyms)
2. [english words from GitHub](https://github.com/dwyl/english-words/blob/master/words.txt)

The CSV `./trainingData.csv` was assembled from these two data sources by the
following python script:

```python
import csv
import re


def main(synonyms, words):
    ret = []
    for word, _, synonyms in synonyms:
        synonyms = re.split(r'[;|]', synonyms);
        if len(synonyms) > 2 and word in words:
            for i, s in enumerate(synonyms[0:-1]):
                a, b, c = [word, s, synonyms[i + 1]];
                if a != b != c:
                    ret.append((a, b, c))
    return ret


# synonyms headers = word,part_of_speech,synonyms (semicolon or pipe delimited)
with open('synonyms.csv', 'r') as fp:
    synonyms = csv.reader(fp)

    with open('words.txt', 'r') as fp:
        words = [i[0] for i in csv.reader(fp)]

        words = set(words)

        with open('out.csv', 'w') as fp:
            writer = csv.writer(fp)
            out = main(synonyms, words)
            writer.writerows(out)
```

### Training Data Subset

The big training data set makes OpenAPI set `--classification_n_classes` to a
number that is above their own usage limit. I cut down the data set until the
data they generated was lower than their limit of 1000, which is a substantial
subset of the overall data.
