/*
 * @lc app=leetcode id=714 lang=typescript
 *
 * [714] Best Time to Buy and Sell Stock with Transaction Fee
 *
 * https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-transaction-fee/description/
 *
 * Medium (60.28%)
 *
 * You are given an array `prices` where `prices[i]` is the price of a given
 * stock on the `i^th` day, and an integer `fee` representing a transaction fee.
 *
 * _Find the maximum profit you can achieve._ You may complete as many
 * transactions as you like, but you need to pay the transaction fee for each
 * transaction.
 *
 * Note: You may not engage in multiple transactions simultaneously (i.e., you
 * must sell the stock before you buy again).
 *
 * Example 1:
 *
 * - Input: prices = [1,3,2,8,4,9], fee = 2
 * - Output: 8
 * - Explanation: The maximum profit can be achieved by:
 *   - Buying at prices[0] = 1
 *   - Selling at prices[3] = 8
 *   - Buying at prices[4] = 4
 *   - Selling at prices[5] = 9
 * - The total profit is ((8 - 1) - 2) + ((9 - 4) - 2) = 8.
 *
 * Example 2:
 *
 * - Input: prices = [1,3,7,5,10,3], fee = 3
 * - Output: 6
 *
 * Constraints:
 *
 * - 1 <= prices.length <= 5 * 10^4
 * - 1 <= prices[i] < 5 * 10^4
 * - 0 <= fee < 5 * 10^4
 */

// @lc code=start
/**
 * Dynamic programming (bottom up). Find the largest profit and smallest debt
 * we could make each day and return the largest profit on the final day.
 *
 * - Time: O(n) - Visit each day only once
 * - Space: O(1) - No additional data structures
 */
const maxProfit = (prices: number[], fee: number): number => {
    // Largest profit we can make if we sold or bought some time in the past.
    // I.e., `bought` is the smallest debt we'd have after buying some time in
    // the past, and `sold` is the largest profit we'd have after selling. If we
    // bought on day 0, we'd be in debt for the day 0 stock. If we sold on day
    // 0, we'd make 0 b/c we don't have anything to sell.
    let bought: number = -prices[0];
    let sold = 0;

    // Find the largest profit and smallest debt we could make if we were to buy
    // or sell on each of the remaining days
    for (let i = 1; i < prices.length; i++) {
        const price: number = prices[i];
        bought = Math.max(bought, sold - price);
        sold = Math.max(sold, bought + price - fee);
    }

    // Return the largest profit have if we sold on the last day
    return sold;
};
// @lc code=end
export { maxProfit };
