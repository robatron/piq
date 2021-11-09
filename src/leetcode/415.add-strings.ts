/**
 * @lc app=leetcode id=415 lang=typescript
 *
 * [415] Add Strings
 *
 * https://leetcode.com/problems/add-strings/description/
 *
 * Easy (50.73%)
 *
 * Given two non-negative integers, `num1` and `num2`, represented as string, return
 * the sum of `num1` and `num2` as a string.
 *
 * You must solve the problem without using any built-in library for handling
 * large integers (such as BigInteger). You must also not convert the inputs to
 * integers directly.
 *
 * Example 1:
 *
 * - Input: num1 = "11", num2 = "123"
 * - Output: "134"
 *
 * Example 2:
 *
 * - Input: num1 = "456", num2 = "77"
 * - Output: "533"
 *
 * Example 3:
 *
 * - Input: num1 = "0", num2 = "0"
 * - Output: "0"
 *
 * Constraints:
 *
 * - 1 <= num1.length, num2.length <= 10^4
 * - num1 and num2 consist of only digits.
 * - num1 and num2 don't have any leading zeros except for the zero itself.
 */

// @lc code=start
const addStrings = (num1: string, num2: string): string => {
    const maxLen = Math.max(num1.length, num2.length);
    const ans: number[] = [0];

    for (let place = maxLen - 1; place >= 0; place--) {
        const ansIdx: number = ans.length - 1;
        const digit1Idx: number = place - (maxLen - num1.length);
        const digit2Idx: number = place - (maxLen - num2.length);

        const prevCarry: number = ans[ansIdx];
        const digit1: number = digit1Idx >= 0 ? Number(num1[digit1Idx]) : 0;
        const digit2: number = digit2Idx >= 0 ? Number(num2[digit2Idx]) : 0;

        const sum: number = digit1 + digit2 + prevCarry;
        const carry: number = Math.floor(sum / 10);
        const rmndr: number = sum % 10;

        ans[ansIdx] = rmndr;
        if (place || carry) ans.push(carry);
    }

    return ans.reverse().join('');
};

// @lc code=end
export { addStrings };
