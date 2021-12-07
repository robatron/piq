/**
 * @lc app=leetcode id=322 lang=typescript
 *
 * [322] Coin Change
 *
 * https://leetcode.com/problems/coin-change/description/
 *
 * Medium (39.10%)
 *
 * You are given an integer array `coins` representing coins of different
 * denominations and an integer `amount` representing a total amount of money.
 *
 * Return the _fewest number of coins that you need to make up that amount_. If
 * that amount of money cannot be made up by any combination of the coins,
 * return -1.
 *
 * You may assume that you have an infinite number of each kind of coin.
 *
 * Example 1:
 *
 * - Input: coins = [1,2,5], amount = 11
 * - Output: 3
 * - Explanation: 11 = 5 + 5 + 1
 *
 * Example 2:
 *
 * - Input: coins = [2], amount = 3
 * - Output: -1
 *
 * Example 3:
 *
 * - Input: coins = [1], amount = 0
 * - Output: 0
 *
 * Example 4:
 *
 * - Input: coins = [1], amount = 1
 * - Output: 1
 *
 * Example 5:
 *
 * - Input: coins = [1], amount = 2
 * - Output: 2
 *
 * Constraints:
 *
 * - 1 <= coins.length <= 12
 * - 1 <= coins[i] <= 2^31 - 1
 * - 0 <= amount <= 10^4
 */

// @lc code=start
/**
 * Recursive. Subtract each coin from the current amount then recursively
 * calculate the min number of coins required for each remainder.
 *
 * - Time: O(a^c) b/c every coin denomination could have amount / coin values
 * - Space: O(c) b/c max depth of recursion is the number of coins
 */
const coinChangeRecurs = (coins: number[], amount: number): number => {
    // Base cases: We can't make a negative amount with any coins, and we can
    // always make an amount of 0 without any coins.
    if (amount < 0) return -1;
    if (amount === 0) return 0;

    // Track the minimum number of coins required to make this amount. (Start by
    // assuming we can't make the amount.)
    let minCoins: number = null;

    // Subtract each coin from the amount and recursively determine the
    // minimum number of coins required to make the remainder and add one for
    // the current coin
    for (let c = 0; c < coins.length; c++) {
        const coin: number = coins[c];
        const rmdr: number = amount - coin;
        const rmdrMinCoins: number = coinChangeRecurs(coins, rmdr);
        const coinCt: number = rmdrMinCoins + 1;

        // The min coin count should be updated if there is a valid number of
        // min coins we can make with the remainder, and when we find a new coin
        // count that's smaller (or if min coin count has never been updated)
        if (rmdrMinCoins >= 0 && (!minCoins || coinCt < minCoins))
            minCoins = coinCt;
    }

    // Return the min coin count (or -1 if none were found)
    return minCoins ? minCoins : -1;
};

/**
 * Dynamic programming (top-down). Same as recursive, except we memoize with a
 * cache storing the answers to overlapping subproblems.
 *
 * Time: O(c * a) b/c we process all coins for every (remaining) amount
 * Space: O(a) b/c we maintain a cache for all amounts, 0 thru amount
 */
const coinChangeDPTD = (
    coins: number[],
    amount: number,
    cache: number[] = Array(amount + 1),
): number => {
    // Base cases:
    // - No coins can make a negative amount
    if (amount < 0) return -1;
    // - No coins required to make an amount of 0
    if (amount === 0) return 0;
    // - Already computed the smallest number of coins required for this amount
    if (cache[amount]) return cache[amount];

    // Smallest number of coins required to make this amount
    let minCoins = Infinity;

    // Subtract every coin from the amount, find the min number of coins
    // required for the remainder, and add 1 for the current coin
    for (let c = 0; c < coins.length; c++) {
        const coin: number = coins[c];
        const rmdr: number = amount - coin;
        const rmdrMinCoins: number = coinChangeDPTD(coins, rmdr, cache);
        const coinCt: number = rmdrMinCoins + 1;

        // If there is a valid min number of coins for the remainder, update
        // the overall min number of coins for the remainder
        if (rmdrMinCoins >= 0) minCoins = Math.min(minCoins, coinCt);
    }

    // Cache the min number of coins required for this amount and return
    cache[amount] = minCoins < Infinity ? minCoins : -1;
    return cache[amount];
};

/**
 * Dynamic programming (bottom-up). Tabulate the minimum number of coins
 * required for all amounts 0 thru the given amount.
 *
 * - Time: O(a * c) - Number of states `a` * recurrance relation O(c)
 * - Space: O(a) - Array to hold min coins for amounts 0 thru `amount`
 */
const coinChangeDPBU = (coins: number[], amount: number): number => {
    // Minimum number of coins required to make all amounts from 0 thru the
    // given amount. (We don't need any coins to make an amount of 0.)
    const minCoinCt: number[] = [0, ...Array(amount).fill(Infinity)];

    for (let a = 1; a <= amount; a++) {
        for (let c = 0; c < coins.length; c++) {
            const coin: number = coins[c];
            if (coin <= a) {
                const rmdr: number = a - coin;
                minCoinCt[a] = Math.min(minCoinCt[a], minCoinCt[rmdr] + 1);
            }
        }
    }

    return minCoinCt[amount] < Infinity ? minCoinCt[amount] : -1;
};

// Enable for LeetCode
const coinChange = coinChangeDPBU;

// @lc code=end
export { coinChange, coinChangeRecurs, coinChangeDPTD, coinChangeDPBU };
