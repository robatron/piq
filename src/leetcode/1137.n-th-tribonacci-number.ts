/**
 * @lc app=leetcode id=1137 lang=typescript
 *
 * [1137] N-th Tribonacci Number
 *
 * https://leetcode.com/problems/n-th-tribonacci-number/description/
 *
 * Easy (60.53%)
 *
 * The Tribonacci sequence T(n) is defined as follows:
 *
 * - T(0) = 0, T(1) = 1, T(2) = 1
 * - T(n+3) = T(n) + T(n+1) + T(n+2) for n >= 0.
 *
 * Given n, return the value of T(n).
 *
 * Example 1:
 *
 * - Input: n = 4
 * - Output: 4
 * - Explanation:
 *   - T(3) = 0 + 1 + 1 = 2
 *   - T(4) = 1 + 1 + 2 = 4
 *
 * Example 2:
 *
 * - Input: n = 25
 * - Output: 1389537
 *
 * Constraints:
 *
 * - 0 <= n <= 37
 * - The answer is guaranteed to fit within a 32-bit integer, ie. answer <= 2^31
 * - 1.
 */

// @lc code=start
function tribonacci(n: number): number {
    // Base cases
    if (n < 2) return n;
    if (n === 2) return 1;

    let t3 = 0;
    let t2 = 1;
    let t1 = 1;

    for (let i = 3; i < n; i++) {
        const ti: number = t3 + t2 + t1;
        t3 = t2;
        t2 = t1;
        t1 = ti;
    }

    return t3 + t2 + t1;
}
// @lc code=end
export { tribonacci };
