/*
 * @lc app=leetcode id=1473 lang=typescript
 *
 * [1473] Paint House III
 *
 * https://leetcode.com/problems/paint-house-iii/description/
 *
 * Hard (49.73%)
 *
 * There is a row of `m` houses in a small city, each house must be painted with
 * one of the `n` colors (labeled from `1` to `n`), some houses that have been
 * painted last summer should not be painted again.
 *
 * A "neighborhood" is a maximal group of continuous houses that are painted
 * with the same color.
 *
 * - For example: `houses = [1,2,2,3,3,2,1,1]` contains 5 neighborhoods `[{1},
 *   {2,2}, {3,3}, {2}, {1,1}]`.
 *
 * Given an array `houses`, an `m x n` matrix `cost`, and an integer `target`
 * where:
 *
 * - `houses[i]`: is the color of the house `i`, and `0` if the house is not
 *   painted yet.
 * - `cost[i][j]`: is the cost to paint the house `i` with the color `j + 1`.
 *
 * Return the _minimum cost of painting all the remaining houses in such a way
 * that there are exactly `target` neighborhoods_. If it is not possible, return
 * `-1`.
 *
 * Example 1:
 *
 * - Input:
 *   - houses = [0,0,0,0,0]
 *   - cost = [[1,10],[10,1],[10,1],[1,10],[5,1]]
 *   - m = 5
 *   - n = 2
 *   - target = 3
 * - Output: 9
 * - Explanation: Paint houses of this way: [1,2,2,1,1]
 *   - This array contains target = 3 neighborhoods, [{1}, {2,2}, {1,1}]
 *   - Cost of paint all houses (1 + 1 + 1 + 1 + 5) = 9.
 *
 * Example 2:
 *
 * - Input:
 *   - houses = [0,2,1,2,0],
 *   - cost = [[1,10],[10,1],[10,1],[1,10],[5,1]],
 *   - m = 5,
 *   - n = 2,
 *   - target = 3
 * - Output: 11
 * - Explanation: Some houses are already painted, Paint the houses this way:
 *   [2,2,1,2,2]
 *   - This array contains target = 3 neighborhoods, [{2,2}, {1}, {2,2}].
 *   - Cost of paint the first and last house (10 + 1) = 11.
 *
 * Example 3:
 *
 * - Input:
 *   - houses = [3,1,2,3],
 *   - cost = [[1,1,1],[1,1,1],[1,1,1],[1,1,1]],
 *   - m = 4,
 *   - n = 3,
 *   - target = 3
 * - Output: -1
 * - Explanation: Houses are already painted with a total of 4 neighborhoods
 *   [{3},{1},{2},{3}] different of target = 3.
 *
 * Constraints:
 *
 * - m == houses.length == cost.length
 * - n == cost[i].length
 * - 1 <= m <= 100
 * - 1 <= n <= 20
 * - 1 <= target <= m
 * - 0 <= houses[i] <= n
 * - 1 <= cost[i][j] <= 10^4
 */

// @lc code=start

/**
 * @todo
 *
 * Notes:
 * - For each new house, we need to decide what color to paint it based on paint
 *   cost and neighborhood affiliation...
 *
 * @param houses Houses and the color they are currently painted (0 for none)
 * @param costs Costs to paint each house every color
 * @param houseCt Number of houses
 * @param colorCt Number of colors
 * @param neighbCt Target number of neighborhoods
 * @returns
 */
const minCost = (
    houses: number[],
    costs: number[][],
    houseCt: number,
    colorCt: number,
    neighbCt: number,
): number => {
    // Minimum cost where all houses thru `i` are painted with color j in k
    // neighborhoods. Eg, minCosts[0][0][1] means the cheapest way to paint
    // house 0 color 1 in 1 neighborhoods. Note:
    //
    // - There are no ways to paint any house any color in 0 neighborhoods
    // - The cheapest way to paint a single house in any number of neighborhoods
    //   is just the cheapest color cost
    // - The house may already be painted
    //
    // See description hint:
    // https://leetcode.com/explore/learn/card/dynamic-programming/647/more-practice-problems/4076/
    const minCosts: number[][][] =
        // Cheapest way to paint houses i ...
        Array(houseCt)
            .fill(null)
            .map(() =>
                // ... with color j...
                Array(colorCt)
                    .fill(null)
                    .map(() =>
                        // ... in k neighborhoods
                        Array(neighbCt).fill(0),
                    ),
            );

    // Base case: Find the cheapest way to paint house 0 (if it needs to be)
    if (!houses[0]) {
        costs[0].forEach((colorCost, i) => {
            minCosts[0][i];
        });
    }

    // We need at least
    return 0;
};
// @lc code=end
export { minCost };
