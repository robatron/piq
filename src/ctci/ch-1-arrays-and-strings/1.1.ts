/**
 * 1.1) Implement an algorithm to determine if a string has all unique
 * characters. What if you cannot use additional structures?
 */

export const hasAllUniqueChars = (str: string): boolean => {
    const charMap = {};
    for (let i = 0; i < str.length; ++i) {
        const char = str[i];
        if (!charMap[char]) {
            charMap[char] = true;
        } else {
            return false;
        }
    }
    return true;
};

// Alternate version that does not use any additional data structures
export const hasAllUniqueCharsAlt = (str: string): boolean => {
    for (let i = 0; i < str.length; ++i) {
        const char = str[i];

        // Search the string backwards from the current position
        if (i > 0) {
            for (let ii = i - 1; ii >= 0; --ii) {
                const testChar = str[ii];
                if (char === testChar) {
                    return false;
                }
            }
        }
    }
    return true;
};

export default {
    hasAllUniqueChars,
    hasAllUniqueCharsAlt,
};
