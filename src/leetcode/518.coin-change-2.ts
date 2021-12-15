/**
 * @lc app=leetcode id=518 lang=typescript
 *
 * [518] Coin Change 2
 *
 * https://leetcode.com/problems/coin-change-2/description/
 *
 * Medium (55.32%)
 *
 * You are given an integer array `coins` representing coins of different
 * denominations and an integer `amount` representing a total amount of money.
 *
 * Return the number of combinations that make up that amount. If that amount of
 * money cannot be made up by any combination of the coins, return 0.
 *
 * You may assume that you have an infinite number of each kind of coin.
 *
 * The answer is guaranteed to fit into a signed 32-bit integer.
 *
 * Example 1:
 *
 * - Input: amount = 5, coins = [1,2,5]
 * - Output: 4
 * - Explanation: there are four ways to make up the amount:
 *   - 5=5
 *   - 5=2+2+1
 *   - 5=2+1+1+1
 *   - 5=1+1+1+1+1
 *
 * Example 2:
 *
 * - Input: amount = 3, coins = [2]
 * - Output: 0
 * - Explanation: the amount of 3 cannot be made up just with coins of 2.
 *
 * Example 3:
 *
 * - Input: amount = 10, coins = [10]
 * - Output: 1
 *
 * Constraints:
 *
 * - 1 <= coins.length <= 300
 * - 1 <= coins[i] <= 5000
 * - All the values of coins are unique.
 * - 0 <= amount <= 5000
 */

// @lc code=start
/**
 * Dynamic programming (bottom-up). Count up the ways to make the amount by
 * adding up all the ways to make each smaller amount with each coin.
 *
 * - Time: O(a*c)
 * - Space: O(a)
 */
const change = (amount: number, coins: number[]): number => {
    // Base case: There is exactly 1 way to make an amount 0 with any amount of
    // coins: by taking no coins
    if (amount === 0) return 1;

    // Ways to make all amounts thru `amount`
    const ways: number[] = Array(amount + 1).fill(0);

    // Base case again: only 1 way to make 0 with any coins
    ways[0] = 1;

    // For every coin and every amount (starting with the value of the coin b/c
    // we can't make change for amounts less than the current coin), find the
    // number of ways to make the current amount.
    for (let c = 0; c < coins.length; c++) {
        const coin: number = coins[c];
        for (let a = coin; a <= amount; a++) {
            // The number of ways to make this amount with this coin is the
            // number of ways to make this amount we've found so far plus the
            // number of ways to make the remainder
            ways[a] += ways[a - coin];
        }
    }

    // Return the number of ways to make the original amount!
    return ways[amount];
};
// @lc code=end
export { change };
