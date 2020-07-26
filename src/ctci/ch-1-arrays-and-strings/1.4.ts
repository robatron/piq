/**
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
 * Modification: Perform operation in-place to align with spirit of problem.
 */

export const replaceSpace = (strArray: string[]): void => {
    // Charcter to replace
    const targetChar = ' ';

    // String to replace character with
    const replaceStr = '%20';

    // Capture the "true" length of the string before modification
    const strArrayLenSnapshot: number = strArray.length;

    for (let i = 0; i < strArrayLenSnapshot; ++i) {
        const char: string = strArray[i];
        if (char === targetChar) {
            const addCharCount: number = replaceStr.length - targetChar.length;
            for (let ii = 0; ii < addCharCount; ++ii) {
                // Add space for the replacement string at the end
                strArray.push(null);

                // Shift all characters after the target char to the right
            }
        }
    }
};
