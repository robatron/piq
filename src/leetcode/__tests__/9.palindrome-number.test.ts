import { isPalindrome } from '../9.palindrome-number';

[
    [0, true],
    [121, true],
    [-121, false],
    [10, false],
    [-101, false],
    [1221, true],
    [1231, false],
    [12321, true],
    [123321, true],
    [123320, false],

    // Max safe integer (Number.MAX_SAFE_INTEGER)
    [9007199254740991, false],

    // Unsafe integer
    [Number.MAX_SAFE_INTEGER + 3, false],

    // Max safe palendrome (?)
    [9007199229917009, true],
].forEach(([input, output]: [number, boolean]) => {
    test(`${input} => ${output}`, () => {
        expect(isPalindrome(input)).toBe(output);
    });
});
