/**
 * @lc app=leetcode id=256 lang=typescript
 *
 * [256] Paint house
 *
 * https://leetcode.com/problems/paint-house/
 *
 * Medium (57.4%)
 *
 * There is a row of n houses, where each house can be painted one of three
 * colors: red, blue, or green. The cost of painting each house with a certain
 * color is different. You have to paint all the houses such that no two
 * adjacent houses have the same color.
 *
 * The cost of painting each house with a certain color is represented by an n x
 * 3 cost matrix costs.
 *
 * For example, costs[0][0] is the cost of painting house 0 with the color red;
 * costs[1][2] is the cost of painting house 1 with color green, and so on...
 * Return the minimum cost to paint all houses.
 *
 * Example 1:
 *
 * - Input: costs = [[17,2,17],[16,16,5],[14,3,19]]
 * - Output: 10
 * - Explanation: Paint house 0 into blue, paint house 1 into green, paint house
 *   2 into blue. Minimum cost: 2 + 5 + 3 = 10.
 *
 * Example 2:
 *
 * - Input: costs = [[7,6,2]]
 * - Output: 2
 *
 * Constraints:
 *
 * - costs.length == n
 * - costs[i].length == 3
 * - 1 <= n <= 100
 * - 1 <= costs[i][j] <= 20
 */
// @lc code=start
/**
 * Dynamic programming (bottom up). Find the cheapest ways to paint every house
 * every color by tracking the cheapest way to paint the previous house each
 * color starting with house 0.
 *
 * - Time: O(h * c^2) = O(h * 3^2) = O(h) - Only visiting each house once then
 *   considering every color for every color, but there are a constant number of
 *   colors, so they can be ignored
 * - Space: O(1) - Store cheapest ways to paint previous house every color;
 *   There're a constant number of colors, it's also constant space
 */
const minCost = (costs: number[][]): number => {
    let prevMinCosts: number[] = [...costs[0]];

    for (let h = 1; h < costs.length; h++) {
        const curCosts: number[] = costs[h];
        const curMinCosts: number[] = [];

        for (let c = 0; c < curCosts.length; c++) {
            const curCost: number = curCosts[c];
            const curNewCosts: number[] = prevMinCosts
                .filter((_, i) => i !== c)
                .map((pc) => curCost + pc);
            curMinCosts.push(Math.min(...curNewCosts));
        }

        prevMinCosts = curMinCosts;
    }

    return Math.min(...prevMinCosts);
};
// @lc code=end
export { minCost };
