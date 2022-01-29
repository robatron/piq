/*
 * @lc app=leetcode id=50 lang=typescript
 *
 * [50] Pow(x, n)
 *
 * https://leetcode.com/problems/powx-n/description/
 *
 * Medium (31.59%)
 *
 * Implement pow(x, n), which calculates x raised to the power n (i.e.,
 * x^n).
 *
 * Example 1:
 *
 * - Input: x = 2.00000, n = 10
 * - Output: 1024.00000
 *
 * Example 2:
 *
 * - Input: x = 2.10000, n = 3
 * - Output: 9.26100
 *
 * Example 3:
 *
 * - Input: x = 2.00000, n = -2
 * - Output: 0.25000
 *   - Explanation: 2^-2 = 1/2^2 = 1/4 = 0.25
 *
 * Constraints:
 *
 * - -100.0 < x < 100.0
 * - -2^31 <= n <= 2^31-1
 * - -10^4 <= x^n <= 10^4
 */

// @lc code=start
/**
 * Fast-power recursive solution based on the official solution. Had a lot of
 * trouble understanding this one. The official solution didn't in work in
 * TypeScript b/c I eventually figured out that any multiplication / division
 * operation with an integer yields an integer in Java, so I had to add an extra
 * `floor` operation when halving the exponent! This JS solution was also
 * helpful to me:
 * https://leetcode.com/problems/powx-n/discuss/19580/Recursive-JavaScript-solution
 *
 * - Time: O(log n) b/c we're halving our number of recursive calls each time
 * - Space: O(log n) for the call stack
 *
 * LC submission:
 *
 * - Your runtime beats 55.29 % of typescript submissions
 * - Your memory usage beats 5.77 % of typescript submissions (44.4 MB)
 */
const myPow = (x: number, n: number): number => {
    // Base cases: 0^n is 0, x^0 is 1, x^1 is x, and invert x if `n` is negative
    if (x === 0) return 0;
    if (n === 0) return 1;
    if (n === 1) return x;
    if (n === -1) return 1 / x;

    // Recursively find roughly half of x^n. Strip any decimals so we're only
    // passing whole exponents. (We'll handle remainders below.)
    const half = myPow(x, Math.floor(n / 2));

    // If `n` is even, the answer to x^n is simply x^(n/2) * x^(n/2)
    if (!(n % 2)) return half * half;

    // Otherwise, if `n` is odd, it's the same thing, except we have to handle
    // the remainder `x`, i.e., x^(n/2) * x^(n/2) * x
    return half * half * x;
};

// @lc code=end
export { myPow };
