/**
 * @lc app=leetcode id=66 lang=typescript
 *
 * [66] Plus One
 *
 * https://leetcode.com/problems/plus-one/description/
 *
 * Easy (42.08%)
 *
 * You are given a large integer represented as an integer array digits, where
 * each digits[i] is the i^th digit of the integer. The digits are ordered from
 * most significant to least significant in left-to-right order. The large
 * integer does not contain any leading 0's.
 *
 * Increment the large integer by one and return the resulting array of digits.
 *
 * Example 1:
 *
 * - Input:  [1,2,3]
 * - Output: [1,2,4]
 * - Explanation: The array represents the integer 123. Incrementing by one
 *   gives 123 + 1 = 124. Thus, the result should be [1,2,4].
 *
 * Example 2:
 *
 * - Input:  [4,3,2,1]
 * - Output: [4,3,2,2]
 * - Explanation: The array represents the integer 4321. Incrementing by one
 *   gives 4321 + 1 = 4322. Thus, the result should be [4,3,2,2].
 *
 * Example 3:
 *
 * Input:  [0] Output: [1] Explanation: The array represents the integer 0.
 * Incrementing by one gives 0 + 1 = 1. Thus, the result should be [1].
 *
 * Example 4:
 *
 * - Input:  digits = [9]
 * - Output: [1,0]
 * - Explanation: The array represents the integer 9. Incrementing by one gives
 *   9 + 1 = 10. Thus, the result should be [1,0].
 *
 * Constraints:
 *
 * - 1 <= digits.length <= 100
 * - 0 <= digits[i] <= 9
 * - digits does not contain any leading 0's.
 */

// @lc code=start

/**
 * Add one to the given number represented as an array of single digits sorted
 * by most significant digit first, e.g., [1, 2, 3, 0] = 1,230
 */
const plusOne = (digits: number[]): number[] => {
    // Store our answer and carries backwards (b/c many pushes and 1 reverse is
    // cheaper than many unshifts and no reverse). Start with 1 carry b/c we're
    // adding one.
    const ans: number[] = [1];

    // Walk through each of the digits from least to most significant digit
    // adding the carry amount (1 or 0) from the previous place sum
    for (let place = digits.length - 1; place >= 0; place--) {
        const topIdx = ans.length - 1;
        const sum: number = digits[place] + ans[topIdx];
        const sumOnes: number = sum % 10;
        const sumTens: number = Math.floor(sum / 10);

        // Replace the carry with the sum
        ans[topIdx] = sumOnes;

        // Push the carry onto the answer store as long as we're not at the last
        // place or have a carry. (I.e., don't add an unnecessary leading zero.)
        if (place || sumTens) ans.push(sumTens);
    }

    return ans.reverse();
};
// @lc code=end

export { plusOne };
