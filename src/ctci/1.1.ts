/**
 * 1.1) Implement an algorithm to determine if a string has all unique
 * characters. What if you cannot use additional structures?
 */

const sayHello = (name) => `Hello, ${name}`;

// Alternate version that does not use any additional data structures
export const hasAllUniqueCharsAlt = (str: string): void => {
    for (let i = 0; i < str.length; ++i) {
        const char = str[i];

        // Search the string backwards from the current position
    }
};

export default {
    hasAllUniqueChars,
    hasAllUniqueCharsAlt,
};
