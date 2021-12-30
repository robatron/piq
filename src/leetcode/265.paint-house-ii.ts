/**
 * @lc app=leetcode id=265 lang=typescript
 *
 * [265] Paint House II
 *
 * https://leetcode.com/problems/paint-house-ii/
 *
 * Hard (49.26%)
 *
 * There are a row of `n` houses, each house can be painted with one of the `k`
 * colors. The cost of painting each house with a certain color is different.
 * You have to paint all the houses such that _no two adjacent houses have the
 * same color._
 *
 * The cost of painting each house with a certain color is represented by an `n
 * x k` cost matrix `costs`. For example:
 *
 * - `costs[0][0]` is the cost of painting house `0` with color `0`
 * - `costs[1][2] is the cost of painting house 1 with color 2, and so on...
 *
 * _Return the minimum cost to paint all houses._
 *
 * Example 1:
 *
 * - Input: costs = [[1,5,3],[2,9,4]]
 * - Output: 5
 * - Explanation:
 *   - Paint house 0 into color 0, paint house 1 into color 2. Minimum cost: 1 +
 *     4 = 5;
 *   - Or paint house 0 into color 2, paint house 1 into color 0. Minimum cost:
 *     3 + 2 = 5.
 *
 * Example 2:
 *
 * - Input: costs = [[1,3],[2,4]]
 * - Output: 5
 *
 * Constraints:
 *
 * - costs.length == n
 * - costs[i].length == k
 * - 1 <= n <= 100
 * - 2 <= k <= 20
 * - 1 <= costs[i][j] <= 20
 *
 * Follow up: Could you solve it in O(nk) runtime?
 */

// @lc code=start
/**
 * Dynamic programming (bottom up). Find the minimum cost it would be to paint
 * each house every color the previous house was not painted.
 *
 * - Time: O(n*k) - Visit each color twice for every house
 * - Space: O(k) - Store minimum costs to paint the previous house each color.
 *   Note: We could also store these values in-place to get O(1)
 *
 * LeetCode submission:
 *
 * - Your runtime beats 100 % of typescript submissions
 * - Your memory usage beats 75 % of typescript submissions (41.5 MB)
 */
const minCostII = (costs: number[][]): number => {
    // Cheapest we can paint the previous house each color. House 0's costs are
    // its minimum costs since there're no previous houses to paint.
    const prevMinCosts: number[] = [...costs[0]];

    // Find the cheapest we can paint each of the following houses every color
    // except for the same color as the previous house
    for (let curHouse = 1; curHouse < costs.length; curHouse++) {
        // Find the cheapest and 2nd cheapest color to paint the PREVIOUS house
        // b/c the cheapest cost to paint a given color in the CURRENT house is
        // that color's cost plus the cheapest color to paint the previous house
        // UNLESS it's the same color, in which case use the 2nd cheapest. (Note
        // that the cheapest and 2nd cheapest colors can be the same.)
        let minColor = -1;
        let minColor2 = -1;

        for (let color = 0; color < prevMinCosts.length; color++) {
            const cost: number = prevMinCosts[color];
            const minCost: number = prevMinCosts[minColor];
            const minCost2: number = prevMinCosts[minColor2];

            if (minColor < 0 || cost < minCost) {
                minColor2 = minColor;
                minColor = color;
            } else if (minColor2 < 0 || cost < minCost2) minColor2 = color;
        }

        // Find the cheapest way to paint this house each color by adding them
        // with cheapest way to paint the previous house a different color
        const prevMinCost: number = prevMinCosts[minColor];
        const prevMinCost2: number = prevMinCosts[minColor2];

        for (let color = 0; color < costs[curHouse].length; color++) {
            let minCost: number = costs[curHouse][color];

            if (color !== minColor) minCost += prevMinCost;
            else minCost += prevMinCost2;

            prevMinCosts[color] = minCost;
        }
    }

    // Return the cheapest way to paint the final house
    return Math.min(...prevMinCosts);
};
// @lc code=end
export { minCostII };
