/*
I like parentheticals (a lot).

"Sometimes (when I nest them (my parentheticals) too much (like this (and
this))) they get confusing."

Write a function that, given a sentence like the one above, along with the
position of an opening parenthesis, finds the corresponding closing parenthesis.

Example: if the example string above is input with the number 10 (position of
the first parenthesis), the output should be 79 (position of the last
parenthesis).
*/
export const indexOfMatchingParen = (
    sentence: string,
    openParenIdx: number,
): number => {
    const OPEN_PAREN = '(';
    const CLOSE_PAREN = ')';

    // Can't find a matching paren if the first paren index is invalid!
    if (
        openParenIdx < 0 ||
        openParenIdx > sentence.length - 1 ||
        sentence[openParenIdx] !== OPEN_PAREN
    ) {
        return -1;
    }

    // Consider every char starting after the first open paren and track the
    // number of unmatched open parens we've seen so far. Subtract one unmatched
    // paren for every closing paren we find. When our unmatched paren count
    // reaches zero, we've found the matching paren!
    let unmatchedParenCount = 1;

    for (let charIdx = openParenIdx + 1; charIdx < sentence.length; charIdx++) {
        const curChar = sentence[charIdx];

        // If we find an open paren, add it as the newest open paren
        if (curChar === OPEN_PAREN) {
            unmatchedParenCount++;
        }

        // If we find a closed paren, remove the newest open paren. If after
        // there's no more open parens, we've found the matching closing paren!
        else if (curChar === CLOSE_PAREN) {
            unmatchedParenCount--;

            if (!unmatchedParenCount) {
                return charIdx;
            }
        }
    }

    // If we never found the closing paren, return -1
    return -1;
};
