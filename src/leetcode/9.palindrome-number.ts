/**
 * @lc app=leetcode id=9 lang=typescript
 *
 * [9] Palindrome Number
 *
 * https://leetcode.com/problems/palindrome-number/description/
 */

// @lc code=start
// Return the digit at the given place of the given number, e.g., if x=12345 and
// place=2, the return would be 3 (0=>5, 1=>4, 2=>3, 3=>2, 4=>1)
const getDigitAtPlace = (x: number, place: number) =>
    Math.floor((x % Math.pow(10, place + 1)) / Math.pow(10, place));

// Return if the given number is a palendrome or not WITHOUT converting it to
// a string
const isPalindrome = (x: number): boolean => {
    // Negative numbers can't be a palendrome b/c of the '-' sign, numbers
    // larger than the max safe integer are ambiguous, so don't claim to know.
    // Additionally, if a number has 2+ digits and it ends in zero, it is not
    // a palendrome b/c we can't have a leading zero.
    if (x < 0 || x > Number.MAX_SAFE_INTEGER || (x !== 0 && x % 10 === 0)) {
        return false;
    }

    // Single digit numbers are always palendromes
    if (x < 9) {
        return true;
    }

    const totalPlaces: number = Math.floor(Math.log10(x));
    let leftPlace: number = totalPlaces;
    let rightPlace = 0;

    while (leftPlace >= rightPlace) {
        const leftDigit: number = getDigitAtPlace(x, leftPlace);
        const rightDigit: number = getDigitAtPlace(x, rightPlace);

        if (leftDigit !== rightDigit) {
            return false;
        }

        leftPlace--;
        rightPlace++;
    }

    return true;
};
// @lc code=end

const isPalindromeStringEd = (x: number): boolean => {
    const s: string = x.toString();
    let leftIdx = 0;
    let rightIdx = s.length - 1;

    while (leftIdx <= rightIdx) {
        if (s.charAt(leftIdx) !== s.charAt(rightIdx)) {
            return false;
        }
        leftIdx++;
        rightIdx--;
    }

    return true;
};

export { isPalindrome, isPalindromeStringEd };
