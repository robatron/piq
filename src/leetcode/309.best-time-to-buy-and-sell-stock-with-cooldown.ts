/**
 * @lc app=leetcode id=309 lang=typescript
 *
 * [309] Best Time to Buy and Sell Stock with Cooldown
 *
 * https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/description/
 *
 * Medium (50.63%)
 *
 * You are given an array prices where `prices[i]` is the price of a given stock
 * on the `i^th` day.
 *
 * Find the maximum profit you can achieve. You may complete as many
 * transactions as you like (i.e., buy one and sell one share of the stock
 * multiple times) with the following restrictions:
 *
 * - After you sell your stock, you cannot buy stock on the next day (i.e.,
 *   cooldown one day).
 *
 * Note: You may not engage in multiple transactions simultaneously (i.e., you
 * must sell the stock before you buy again).
 *
 * Example 1:
 *
 * - Input: prices = [1,2,3,0,2]
 * - Output: 3
 * - Explanation: transactions = [buy, sell, cooldown, buy, sell]
 *
 * Example 2:
 *
 * - Input: prices = [1]
 * - Output: 0
 *
 * Constraints:
 *
 * - 1 <= prices.length <= 5000
 * - 0 <= prices[i] <= 1000
 */

// @lc code=start

/**
 * Dynamic programming (bottom-up). Find max possible profits for each day for
 * each state starting with the final day.
 *
 * - Time: O(n) b/c visiting each day only once
 * - Space: O(1) b/c only holding next day's profits with 3 states
 */
const maxProfit = (prices: number[]): number => {
    // Track the max profits possible we could get tomorrow if we were to
    // perform each action today. Initialize all with 0s b/c they represent 1
    // day after market closes, during which time no actions are possible.
    let buy = 0;
    let rest = 0;
    let sell = 0;

    // Starting from the last day going backwards, find the max possible profit
    // we could make each day if we performed each action
    for (let day = prices.length - 1; day >= 0; day--) {
        const price: number = prices[day];
        const sellNext: number = sell;

        // Selling today means we must rest tomorrow
        sell = rest;

        // Resetting today means we must do nothing or buy tomorrow
        const bought: number = -price + buy;
        rest = Math.max(rest, bought);

        // Buying today means we must do nothing or sell tomorrow
        const sold: number = price + sellNext;
        buy = Math.max(buy, sold);
    }

    // Return the max profit starting from a rest
    return rest;
};
// @lc code=end
export { maxProfit };
