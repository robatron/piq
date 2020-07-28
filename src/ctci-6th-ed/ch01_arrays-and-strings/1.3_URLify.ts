/**
 * 1.3 - URLify
 *
 * Write a method to replace all spaces in a string with '%20'. You may assume
 * that the string has sufficient space at the end of the string to hold the
 * additional characters, and that you are given the "true" length of the
 * string. (Note: if implementing in Java, please use a character array so that
 * you can perform this operation in place.)
 *
 * Example:
 *  Input:  "Mr John Smith    "
 *  Output: "Mr%20John%20Smith"
 *
 * Modification: Perform operation in-place on an array representing the string
 * to align with the spirit of problem.
 */

export const URLIfy = (strArray: string[]): void => {
    // Charcter to replace (space)
    const targetChar = ' ';

    // String to replace character with
    const replaceStr = '%20';

    // Loop through the characters in stringArray...
    for (let i = 0; i < strArray.length; ++i) {
        const char: string = strArray[i];

        // If we encounter the target character, shift all characters after it
        // to the right to make space for the replacement string, starting from
        // the end, then insert the replacement string
        if (char === targetChar) {
            const addCharCount: number = replaceStr.length - targetChar.length;
            for (let ii = 0; ii < addCharCount; ++ii) {
                for (let iii = strArray.length - 1; iii > i; --iii) {
                    // This expands array by `addCharCount` elements
                    strArray[iii + 1] = strArray[iii];
                }
            }

            for (let ii = 0; ii < replaceStr.length; ++ii) {
                strArray[i + ii] = replaceStr[ii];
            }
        }
    }
};
