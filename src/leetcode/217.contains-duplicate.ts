/*
 * @lc app=leetcode id=217 lang=typescript
 *
 * [217] Contains Duplicate
 *
 * https://leetcode.com/problems/contains-duplicate/description/
 *
 * Easy (58.93%)
 *
 * Given an integer array nums, return true if any value appears at least twice
 * in the array, and return false if every element is distinct.
 *
 * Example 1:
 *
 * - Input: [1,2,3,1]
 * - Output: true
 *
 * Example 2:
 *
 * - Input: [1,2,3,4]
 * - Output: false
 *
 * Example 3:
 *
 * - Input: [1,1,1,3,3,4,3,2,4,2]
 * - Output: true
 *
 * Constraints:
 *
 * - 1 <= nums.length <= 10^5
 * - -10^9 <= nums[i] <= 10^9
 */

// @lc code=start
const containsDuplicate = (nums: number[]): boolean => {
    const seen: Set<number> = new Set();

    for (let i = 0; i < nums.length; i++) {
        const num = nums[i];
        if (seen.has(num)) return true;
        seen.add(num);
    }

    return false;
};
// @lc code=end
export { containsDuplicate };
