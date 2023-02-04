"""
Training data in the adjacent CSV has three columns:

    Guess 1, Guess 2, Ideal Answer

We will take that and transform it into a format suitable for OpenAI in this
script.
"""

import csv
from pathlib import Path


CSV_IN = Path(__file__).parent / 'trainingData.subset.csv'
JSONL_OUT = Path(__file__).parent / 'trainingData.jsonl'


def oai_template(a, b, c):
    """Convert an input tuple into line of JSONL for OpenAI.
    See https://beta.openai.com/docs/guides/fine-tuning
    """
    return (
        '{'
          rf'"prompt": "Word 1: {a}\nWord 2:{b}\n\n###\n\n", '
          rf'"completion": " {c}"'
        '}'
    )


dedupe = set()
output = []
with open(CSV_IN, 'r') as fp:
    reader = csv.reader(fp)
    for a, b, c in reader:
        unique_str = f'{a}{b}{c}'
        if unique_str not in dedupe:
            output.append(oai_template(a, b, c))
            dedupe.add(unique_str)

with open(JSONL_OUT, 'w') as fp:
    fp.write('\n'.join(output))
