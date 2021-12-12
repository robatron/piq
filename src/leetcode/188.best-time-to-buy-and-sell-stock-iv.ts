/**
 * @lc app=leetcode id=188 lang=typescript
 *
 * [188] Best Time to Buy and Sell Stock IV
 *
 * https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iv/description/
 *
 * Hard (31.81%)
 *
 * You are given an integer array `prices` where `prices[i] is the price of a
 * given stock on the `i^th` day, and an integer `k`.
 *
 * Find the _maximum profit you can achieve_. You may complete at most `k`
 * transactions.
 *
 * Note: You may not engage in multiple transactions simultaneously (i.e., you
 * must sell the stock before you buy again).
 *
 * Example 1:
 *
 * - Input: k = 2, prices = [2,4,1]
 * - Output: 2
 * - Explanation: Buy on day 1 (price = 2) and sell on day 2 (price = 4), profit
 *   = 4-2 = 2.
 *
 * Example 2:
 *
 * - Input: k = 2, prices = [3,2,6,5,0,3]
 * - Output: 7
 * - Explanation: Buy on day 2 (price = 2) and sell on day 3 (price = 6), profit
 *   = 6-2 = 4. Then buy on day 5 (price = 0) and sell on day 6 (price = 3),
 *   profit = 3-0 = 3.
 *
 * Constraints:
 *
 * - 0 <= k <= 100
 * - 0 <= prices.length <= 1000
 * - 0 <= prices[i] <= 1000
 */

// @lc code=start
/**
 * Dynamic programming (bottom-up). Go backwards thru the stock prices gathering
 * the max profits for every combination of remaining transactions and stock
 * holding statuses. (Note: A pair of buy and sell actions is considered a full
 * transaction.)
 *
 * - Time: O(p*k*2) = O(p*k) b/c there are that many states and the recurrence
 *   relations are constant time
 * - Space: O(p*k) b/c same
 */
const maxProfit = (k: number, prices: number[]): number => {
    // Track the maximum profits for every combination of days, transactions
    // remaining, and holding status. Initialize to 0 b/c there would be 0 max
    // profit if the stock wasn't available for buying or selling (last day + 1)
    const maxProfits: number[][][] = new Array(prices.length + 1)
        .fill(null)
        .map(() => new Array(k + 1).fill(null).map(() => new Array(2).fill(0)));

    for (let day = prices.length - 1; day >= 0; day--) {
        for (let tr = 1; tr <= k; tr++) {
            for (let holding = 0; holding <= 1; holding++) {
                const nextProfit: number[][] = maxProfits[day + 1];

                // If we did nothing, we'd make no profit. Today's amount would
                // just be tomorrow's amount if the remaining transactions and
                // holding status didn't change.
                const doNothing: number = nextProfit[tr][holding];

                let doSomething: number;
                if (holding) doSomething = prices[day] + nextProfit[tr - 1][0];
                else doSomething = -prices[day] + nextProfit[tr][1];

                maxProfits[day][tr][holding] = Math.max(doNothing, doSomething);
            }
        }
    }

    // Return the max profits if we started on the first day with `k` transactions
    // left not holding anything
    return maxProfits[0][k][0];
};
// @lc code=end

export { maxProfit };
