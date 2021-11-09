/**
 * @lc app=leetcode id=67 lang=typescript
 *
 * [67] Add Binary
 *
 * https://leetcode.com/problems/add-binary/description/
 *
 * Easy (48.82%)
 *
 * Given two binary strings a and b, return their sum as a binary string.
 *
 * Example 1:
 *
 * - Input: a = "11", b = "1"
 * - Output: "100"
 *
 * Example 2:
 * - Input: a = "1010", b = "1011"
 * - Output: "10101"
 *
 * Constraints:
 *
 * - 1 <= a.length, b.length <= 10^4
 * - a and b consist only of '0' or '1' characters.
 * - Each string does not contain leading zeros except for the zero itself.
 */
// @lc code=start
const addBinary = (a: string, b: string): string => {
    const maxLen: number = Math.max(a.length, b.length);
    const ans: number[] = [0];

    for (let place = maxLen - 1; place >= 0; place--) {
        const topIdx = ans.length - 1;

        const p1 = place - (maxLen - a.length);
        const p2 = place - (maxLen - b.length);

        const d1 = p1 >= 0 ? Number(a[p1]) : 0;
        const d2 = p2 >= 0 ? Number(b[p2]) : 0;

        const sum: number = d1 + d2 + ans[topIdx];
        const carry: number = sum > 1 ? 1 : 0;
        const remainder: number = sum % 2;

        ans[topIdx] = remainder;
        if (place || carry) ans.push(carry);
    }

    return ans.reverse().join('');
};
// @lc code=end

export { addBinary };
