/*
- Time: O(n) - Just walks through every character once
- Space: O(n) - Worst case the input string has no contiguous repeated
  characters, so the encoded string will be the same size
*/
const lineEncoding = (s: string): string => {
    let encodedStr = '';

    // Track the current character (starting with the first in the input) and
    // the number of times encountered
    let prevChar: string = s.charAt(0);
    let prevCharCt = 1;

    // Consider every character in the string PLUS an imaginary null character
    // just past the end so we can be sure to close out the very last group
    for (let i = 1; i <= s.length; i++) {
        const curChar: string = i < s.length ? s.charAt(i) : null;

        // If this char is the same as the previous, just increment its count
        if (curChar === prevChar) {
            prevCharCt++;

            // If this char is different, close out the previous character by
            // adding its count (if > 1) and character to the encoded string,
            // and resetting the previous character and its count
        } else {
            encodedStr += (prevCharCt > 1 ? prevCharCt : '') + prevChar;
            prevChar = curChar;
            prevCharCt = 1;
        }
    }

    return encodedStr;
};

export { lineEncoding };
