/*
You want to build a word cloud, an infographic where the size of a word
corresponds to how often it appears in the body of text.

To do this, you'll need data. Write code that takes a long string and builds its
word cloud data in a map, where the keys are words and the values are the number
of times the words occurred.

We'll use a JavaScript Map instead of an object because it's more explicit —
we're mapping words to counts. And it'll be easier and cleaner when we want to
iterate over our data.

Think about capitalized words. For example, look at these sentences:

"After beating the eggs, Dana read the next step:"
"Add milk and eggs, then add flour and sugar."

What do we want to do with "After", "Dana", and "add"? In this example, your
final map should include one "Add" or "add" with a value of 2. Make reasonable
(not necessarily perfect) decisions about cases like "After" and "Dana".

Assume the input will only contain words and standard punctuation.

You could make a reasonable argument to use regex in your solution. We won't,
mainly because performance is difficult to measure and can get pretty bad.

https://www.interviewcake.com/question/javascript/word-cloud
*/

const WORD_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-'";

export default (sentence: string): Map<string, number> => {
    const wordCounts: Map<string, number> = new Map();
    const terminatedSentence = sentence + ' ';

    let curWord: string[] = [];

    // Walk through every character in the sentence...
    for (const curChar of terminatedSentence) {
        // If current character is a word character, add it to current word
        if (WORD_CHARS.indexOf(curChar) > -1) {
            curWord.push(curChar);
        }

        // Otherwise, consider the current word complete. Add it to the word
        // counts map.
        else if (curWord.length) {
            const word: string = curWord.join('');
            const count = wordCounts.get(word);

            // If the word already exists in the map, just increment it.
            if (count) {
                wordCounts.set(word, count + 1);
            }

            // Otherwise, the word doesn't yet exist in the map. Add it to the
            // map. If an uppercase word is found to have a lowercase
            // counterpart, merge their counts under the lowercase entry. If an
            // uppercase word is always uppercase, keep the uppercase entry.
            else {
                const wordLowercase = word.toLocaleLowerCase();
                const wordUppercase =
                    word[0].toLocaleUpperCase() + word.slice(1);
                const wordLowercaseCount = wordCounts.get(wordLowercase);
                const wordUppercaseCount = wordCounts.get(wordUppercase);

                // If the word is uppercase, increment the lowercase version if
                // there is one
                if (wordLowercaseCount) {
                    wordCounts.set(wordLowercase, wordLowercaseCount + 1);
                }

                // Otherwise, if the word is lowercase and there is an uppercase
                // version, delete the uppercase version, and add both counts
                // under a new lowercase entry
                else if (wordUppercaseCount) {
                    wordCounts.set(word, wordUppercaseCount + 1);
                    wordCounts.delete(wordUppercase);
                }

                // Otherwise, if the word doesn't yet exist in any form, just
                // add it to the map
                else {
                    wordCounts.set(word, 1);
                }
            }

            // Reset the current word
            curWord = [];
        }
    }

    return wordCounts;
};
