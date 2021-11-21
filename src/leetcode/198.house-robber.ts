/**
 * @lc app=leetcode id=198 lang=typescript
 *
 * [198] House Robber
 *
 * https://leetcode.com/problems/house-robber/description/
 *
 * Medium (45.16%)
 *
 * You are a professional robber planning to rob houses along a street. Each
 * house has a certain amount of money stashed, the only constraint stopping you
 * from robbing each of them is that adjacent houses have security systems
 * connected and it will automatically contact the police if two adjacent houses
 * were broken into on the same night.
 *
 * Given an integer array nums representing the amount of money of each house,
 * return the maximum amount of money you can rob tonight without alerting the
 * police.
 *
 * Example 1:
 *
 * - Input: nums = [1,2,3,1]
 * - Output: 4
 * - Explanation: Rob house 1 (money = 1) and then rob house 3 (money = 3).
 *   Total amount you can rob = 1 + 3 = 4.
 *
 * Example 2:
 *
 * - Input: nums = [2,7,9,3,1]
 * - Output: 12
 * - Explanation: Rob house 1 (money = 2), rob house 3 (money = 9) and rob house
 *   5 (money = 1). Total amount you can rob = 2 + 9 + 1 = 12.
 *
 * Constraints:
 *
 * - 1 <= nums.length <= 100
 * - 0 <= nums[i] <= 400
 */

// @lc code=start

/**
 * Dynamic programming. Track the max hauls of the most recent 4 houses so we
 * can reference the max hauls 3 and 2 houses back.
 *
 * Time:    O(n)    Only traverse the houses once
 * Space:   O(1)    Only track the most recent 4 houses
 */
function rob(nums: number[]): number {
    // We already know the max hauls for 2 or fewer houses
    if (nums.length === 0) return null;
    if (nums.length === 1) return nums[0];
    if (nums.length === 2) return Math.max(nums[0], nums[1]);

    // Track the largest possible hauls at the most recent 4 houses in a queue
    const maxHauls: number[] = [nums[0], nums[1]];

    // The largest possible haul when arriving at the current house is the
    // larger haul from 3 or 2 houses back (since 1 house back would trip the
    // alarm). Shift out the oldest house if we have more than 4 houses.
    for (let i = 2; i < nums.length; i++) {
        if (i < 3) maxHauls.push(maxHauls[0] + nums[2]);
        else {
            maxHauls.push(Math.max(maxHauls[0], maxHauls[1]) + nums[i]);
            maxHauls.shift();
        }
    }

    // Return the larger haul of the final and penultimate houses
    return Math.max(
        maxHauls[maxHauls.length - 1],
        maxHauls[maxHauls.length - 2],
    );
}
// @lc code=end
export { rob };
