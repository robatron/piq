/**
 * 1.2 - isPerm
 *
 * Given two strings, write a method to decide if one is a permutation of the
 * other.
 */

interface charMap {
    [propName: string]: number;
}

export const isPerm = (str1: string, str2: string): boolean => {
    // It's not a permutation if the strings are different lengths. Return false
    if (str1.length !== str2.length) {
        return false;
    }

    // Make a map of 1st string characters to their occurance counts
    const charMap1: charMap = str1
        .split('')
        .reduce((accum: charMap, char: string) => {
            accum[char] = typeof accum[char] === 'number' ? accum[char] + 1 : 1;
            return accum;
        }, {});

    // For every character in the 2nd string, track it in the 1st character map
    for (let i = 0; i < str2.length; ++i) {
        const char2 = str2[i];

        // If the character from the 2nd string is not found in the 1st at all,
        // or if there's more of a single character in the 2nd than in the 1st
        // it's not an anagram
        if (!charMap1[char2]) {
            return false;
        }

        // Decrement the occurance of the found character
        --charMap1[char2];
    }

    return true;
};
