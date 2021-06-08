/*
You're working on a secret team solving coded transmissions.

Your team is scrambling to decipher a recent message, worried it's a plot to
break into a major European National Cake Vault. The message has been mostly
deciphered, but all the words are backward! Your colleagues have handed off the
last step to you.

Write a function `reverseWords()` that takes a message as an array of characters
and reverses the order of the words in place.

Note: Why an array of characters instead of a string? The goal of this question
is to practice manipulating strings in place. Since we're modifying the message,
we need a mutable type like an array, instead of JavaScript's immutable strings.

For example:

    const message = [
        'c', 'a', 'k', 'e', ' ',
        'p', 'o', 'u', 'n', 'd', ' ',
        's', 't', 'e', 'a', 'l'
    ];

    reverseWords(message);

    console.log(message.join('')); // Prints: 'steal pound cake'

When writing your function, assume the message contains only letters and spaces,
and all words are separated by one space.

https://www.interviewcake.com/question/javascript/reverse-words
*/

export default (msg: string[]): void => {
    const endWordIdxs: number[] = [];

    // Reverse entire string. This means each word will also be reversed which
    // we will take care of in the next step.
    // O( n / 2 ) = O( (1/2) * n) = O(n)
    reverseString(msg, 0, msg.length);

    // Reverse each word in the string. We know each word's bounds by either a
    // space or the end of the string.
    // O(n)
    let startIdx = 0;
    for (let i = 0; i <= msg.length; i++) {
        if (msg[i] === ' ' || i === msg.length) {
            reverseString(msg, startIdx, i);
            startIdx = i + 1;
        }
    }
};

// Reverse a word in a message given the start index (inclusive) and end index
// (exclusive). Swap each letter from the start and end index moving the indexes
// towards the center.
const reverseString = (msg: string[], startIdx: number, endIdx: number) => {
    while (startIdx < endIdx) {
        const tmp = msg[startIdx];
        msg[startIdx] = msg[endIdx - 1];
        msg[endIdx - 1] = tmp;

        startIdx++;
        endIdx--;
    }
};
