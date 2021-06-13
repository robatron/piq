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
    const unpairedChars = new Set();

    // Walk through each character in the word and track the characters that
    // don't have a mate
    for (const char of word) {
        if (unpairedChars.has(char)) {
            unpairedChars.delete(char);
        } else {
            unpairedChars.add(char);
        }
    }

    // A palendrome must have no more than one unpaired character
    return unpairedChars.size <= 1;
};
