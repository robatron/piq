/**
 * @lc app=leetcode id=746 lang=typescript
 *
 * [746] Min Cost Climbing Stairs
 *
 * https://leetcode.com/problems/min-cost-climbing-stairs/description/
 *
 * Easy (55.65%)
 *
 * You are given an integer array `cost` where `cost[i]` is the cost of `i`th step
 * on a staircase. Once you pay the cost, you can either climb one or two
 * steps.
 *
 * You can either start from the step with index 0, or the step with index 1.
 *
 * Return the minimum cost to reach the top of the floor.
 *
 * Example 1:
 *
 * - Input: cost = [10,15,20]
 * - Output: 15
 * - Explanation: You will start at index 1
 *   - Pay 15
 *   - Climb two steps to reach the top
 *   => The total cost is 15
 *
 * Example 2:
 *
 * - Input: cost = [1,100,1,1,1,100,1,1,100,1]
 * - Output: 6
 * - Explanation: You will start at index 0
 *   - Pay 1 and climb two steps to reach index 2
 *   - Pay 1 and climb two steps to reach index 4
 *   - Pay 1 and climb two steps to reach index 6
 *   - Pay 1 and climb one step to reach index 7
 *   - Pay 1 and climb two steps to reach index 9
 *   - Pay 1 and climb one step to reach the top
 *   => The total cost is 6
 *
 * Constraints:
 *
 * - 2 <= cost.length <= 1000
 * - 0 <= cost[i] <= 999
 *
 * Notes:
 *
 * [1, 100, 1, 1, 1, 100, 1, 1, 100, 1]
 *
 * idx  cost    prevCosts (1 back | 2 back)
 *
 * 0:   1       0
 * 1:   100     0+1                                                 | 0
 * 2:   1       100+0+1, 100+0                                      | 0+1
 * 3:   1       100+0+1+1, 100+0+1, 0+1+1                           | 100+0+1, 100+0
 * 4:   1       100+0+1+1+1, 100+0+1+1, 0+1+1+1, 100+0+1+1, 100+0+1 | 100+0+1+1, 100+0+1, 0+1+1
 */

// @lc code=start
const minCostClimbingStairs = (cost: number[]): number => {
    let minCostBack1 = 0;
    let minCostBack2 = 0;

    for (let i = 0; i < cost.length; i++) {
        const curStepCost: number = cost[i];
        const minPathCost: number = Math.min(
            minCostBack1 + curStepCost,
            minCostBack2 + curStepCost,
        );
        minCostBack2 = minCostBack1;
        minCostBack1 = minPathCost;
    }

    return Math.min(minCostBack1, minCostBack2);
};
// @lc code=end

export default minCostClimbingStairs;
