/**
 * @lc app=leetcode id=509 lang=typescript
 *
 * [509] Fibonacci Number
 *
 * https://leetcode.com/problems/fibonacci-number/description/
 *
 * Easy (67.80%)
 *
 * The Fibonacci numbers, commonly denoted F(n) form a sequence, called the
 * Fibonacci sequence, such that each number is the sum of the two preceding
 * ones, starting from 0 and 1. That is,
 *
 *     F(0) = 0, F(1) = 1
 *     F(n) = F(n - 1) + F(n - 2), for n > 1.
 *
 * Given n, calculate F(n).
 *
 * Example 1:
 *
 * - Input: n = 2
 * - Output: 1
 * - Explanation: F(2) = F(1) + F(0) = 1 + 0 = 1.
 *
 * Example 2:
 *
 * - Input: n = 3
 * - Output: 2
 * - Explanation: F(3) = F(2) + F(1) = 1 + 1 = 2.
 *
 * Example 3:
 *
 * - Input: n = 4
 * - Output: 3
 * - Explanation: F(4) = F(3) + F(2) = 2 + 1 = 3.
 *
 * Constraints:
 *
 * - 0 <= n <= 30
 */

// @lc code=start
function fib(n: number): number {
    // Base cases: fib(0)=0, fib(1)=1
    if (n < 2) return n;

    // Keep track of fib(n-2) and fib(n-1)
    let fibN2 = 0;
    let fibN1 = 1;

    // For all numbers 2 thru n, continuously update fib(n-2) and fib(n-1)
    for (let idx = 2; idx < n; idx++) {
        const fibI = fibN2 + fibN1;
        fibN2 = fibN1;
        fibN1 = fibI;
    }

    return fibN2 + fibN1;
}

// @lc code=end
export { fib };
