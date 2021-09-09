import { ALLOWED_SLUG_CHARS } from './constants';

// Convert a base-10 number to a new base made of arbitrary digits. E.g.,
// - 0-15 b10 -> 0-F b16 (hex)
// - 395 b10 (3*10^2 + 9*10^1 + 5*10^0) is 18B b16 (1*16^2 + 8*16^1 + 11*16^0)
export const convertFromBase10 = (
    b10Num: number,
    newBaseDigits: string = ALLOWED_SLUG_CHARS,
): string => {
    // If the base-10 number is 0, the result is the 0th digit of the new base
    if (b10Num === 0) {
        return newBaseDigits[0];
    }

    // What's the base we're converting to?
    const destBase: number = newBaseDigits.length;

    // Track the resulting new-base digits as we find them, least-to-most
    // significant digits
    const reverseResultDigits: string[] = [];

    // Start by dividing the base-10 number by the new base. The remainder will
    // be the least-significant digit. Continue dividing the quotients by the
    // base and track the remainders as the rest of the digits. When the
    // quotient reaches 0, the last remainder is the most-significant digit in
    // the new base.
    let quotient = b10Num;
    while (quotient > 0) {
        const remainder = quotient % destBase;
        reverseResultDigits.push(newBaseDigits[remainder]);
        quotient = Math.floor(quotient / destBase);
    }

    // Reverse the digits so they are most-to-least significant digits
    return reverseResultDigits.reverse().join('');
};
