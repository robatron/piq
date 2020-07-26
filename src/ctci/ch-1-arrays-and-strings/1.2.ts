/**
 * Implement a function `void reverse(char* str)` in C or C++ which reverses a
 * null-terminated string.
 *
 * Note: No pointers in JavaScript, but here's a simple implementation using
 * arrays to represent strings.
 */

export const reverseArrayString = (arrayString: string[]): void => {
    for (let i = 0; i < arrayString.length / 2; ++i) {
        const tmp = arrayString[arrayString.length - 1 - i];
        arrayString[arrayString.length - 1 - i] = arrayString[i];
        arrayString[i] = tmp;
    }
};
