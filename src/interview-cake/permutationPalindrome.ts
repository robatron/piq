/*
Write an efficient function that checks whether any permutation of an input string is a palindrome.

You can assume the input string only contains lowercase letters.

Examples:

    - "civic" should return true
    - "ivicc" should return true
    - "civil" should return false
    - "livci" should return false

"But 'ivicc' isn't a palindrome!"

If you had this thought, read the question again carefully. We're asking if any
permutation of the string is a palindrome. Spend some extra time ensuring you
fully understand the question before starting. Jumping in with a flawed
understanding of the problem doesn't look good in an interview.
*/
export default (word: string): boolean => {
    const chars = word.split('');
    const isCharOdd: { [key: string]: boolean } = {};
    let oddsCount = 0;

    // Count up the instances of each character in the word, keeping track of
    // characters that appear an odd number of times
    for (let i = 0; i < chars.length; i++) {
        const char = chars[i];

        if (isCharOdd[char]) {
            isCharOdd[char] = false;
            oddsCount = isCharOdd[char] ? oddsCount + 1 : oddsCount - 1;
        } else {
            isCharOdd[char] = true;
            oddsCount++;
        }
    }

    // If the word has an even number of characters, no character may appear an
    // odd number of times. If the word has an odd number of characters, there
    // may be only one character that appears an odd number of times.
    if (
        (chars.length % 2 === 0 && oddsCount > 0) ||
        (chars.length % 2 !== 0 && oddsCount > 1)
    ) {
        return false;
    }

    return true;
};
