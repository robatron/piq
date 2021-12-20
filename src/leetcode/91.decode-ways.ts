/*
 * @lc app=leetcode id=91 lang=typescript
 *
 * [91] Decode Ways
 *
 * https://leetcode.com/problems/decode-ways/description/
 *
 * Medium (28.99%)
 *
 * A message containing letters from `A-Z` can be encoded into numbers using the
 * following mapping:
 *
 * - 'A' -> "1"
 * - 'B' -> "2"
 * - ...
 * - 'Z' -> "26"
 *
 * To decode an encoded message, all the digits must be grouped then mapped back
 * into letters using the reverse of the mapping above (there may be multiple
 * ways). For example, `"11106"` can be mapped into:
 *
 * - "AAJF" with the grouping (1 1 10 6)
 * - "KJF" with the grouping (11 10 6)
 *
 * Note that the grouping `(1 11 06)` is invalid because `"06"` cannot be mapped
 * into `'F'` since `"6"` is different from `"06"`.
 *
 * Given a string `s` containing only digits, return _the number of ways to
 * decode it._
 *
 * Example 1:
 *
 * - Input: s = "12"
 * - Output: 2
 * - Explanation: "12" could be decoded as "AB" (1 2) or "L" (12).
 *
 * Example 2:
 *
 * - Input: s = "226"
 * - Output: 3
 * - Explanation: "226" could be decoded as "BZ" (2 26), "VF" (22 6), or "BBF"
 *   (2 2 6).
 *
 * Example 3:
 *
 * - Input: s = "0"
 * - Output: 0
 * - Explanation: There is no character that is mapped to a number starting with
 * 0. The only valid mappings with 0 are 'J' -> "10" and 'T' -> "20", neither of
 * which start with 0. Hence, there are no valid ways to decode this since all
 * digits need to be mapped.
 *
 * Example 4:
 *
 * - Input: s = "06"
 * - Output: 0
 * - Explanation: "06" cannot be mapped to "F" because of the leading zero ("6"
 *   is different from "06").
 *
 * Constraints:
 *
 * - 1 <= s.length <= 100
 * - s contains only digits and may contain leading zero(s).
 * - The answer is guaranteed to fit in a 32-bit integer.
 */
// @lc code=start

// Set of all valid codes, 1 thru 26
const VALID_CODES: Set<string> = new Set<string>(
    Array(26)
        .fill(null)
        .map((_, i) => String(i + 1)),
);

// Returns true if the given code is valid
const isValid = (d: string) => VALID_CODES.has(d);

/**
 * Dynamic programming (bottom-up). Determine the number of ways to decode every
 * prefix of the string, by using the answers from the previous prefixes,
 * starting with the 1st digit.
 *
 * - Time: O(n) - Only visit each digit once
 * - Space: O(n) - Hold the number of ways to decode every prefix
 *
 * LC submission stats:
 *
 * - Your runtime beats 88.12 % of typescript submissions
 * - Your memory usage beats 72.28 % of typescript
 */
const numDecodings = (s: string): number => {
    // Base cases:
    // - No ways to decode an empty string
    // - No ways any string starting with an invalid digit! (0)
    // - Only one way to decode a string of 1 digit
    if (s.length === 0 || !isValid(s[0])) return 0;
    if (s.length === 1) return 1;

    // Number of ways to decode the string thru the current and previous two
    // digits starting at s[1] b/c we already know the ways to decode the first
    // digit (s[0]) is 1
    let waysBack2: number;
    let waysBack1 = 1;
    let waysCur: number;

    // Consider every digit in the string and determine if it's valid by itself
    // and/or forms a valid 2-digit code with the preceding digit to calculate
    // how many more ways there are to decode the string thru the current digit
    for (let i = 1; i < s.length; i++) {
        const curDigit: string = s[i];
        const prevDigit: string = s[i - 1];

        const isValidSingle: boolean = isValid(curDigit);
        const isValidDouble: boolean = isValid(prevDigit + curDigit);

        // There are no ways to decode this string if neither the single nor
        // double digits are valid, so return early with 0
        if (!isValidSingle && !isValidDouble) return 0;

        // There are at least the same number of ways to decode this and the
        // previous digit as the previous prefix, so just carry it forward if
        // this digit is valid by itself. Otherwise, there are no ways to decode
        // this digit by itself.
        waysCur = isValidSingle ? waysBack1 : 0;

        // There is one more way to decode this prefix than two prefixes ago if
        // both this and the previous digits together form a valid 2-digit code
        // b/c the preceding code came directly before this 2-digit code. If this
        // 2-digit code has no preceding code (b/c it's at the beginning), just
        // add 1 to 0 (b/c there's no way to decode an empty string).
        if (isValidDouble) waysCur += i > 1 ? waysBack2 : 1;

        waysBack2 = waysBack1;
        waysBack1 = waysCur;
    }

    // Return the number of ways to decode the full string
    return waysCur;
};
// @lc code=end
export { numDecodings };
