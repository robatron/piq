/**
 * @lc app=leetcode id=53 lang=typescript
 *
 * [53] Maximum Subarray
 *
 * https://leetcode.com/problems/maximum-subarray/description/
 *
 * Easy (48.89%)
 *
 * Given an integer array nums, find the contiguous subarray (containing at
 * least one number) which has the largest sum and return its sum.
 *
 * A subarray is a contiguous part of an array.
 *
 * Example 1:
 *
 * - Input: [-2, 1, -3, 4, -1, 2, 1, -5, 4]
 * - Output: 6
 * - Explanation: [4, -1, 2, 1] has the largest sum = 6.
 *
 * Example 2:
 *
 * - Input: [1]
 * - Output: 1
 *
 * Example 3:
 *
 * - Input: [5, 4, -1, 7, 8]
 * - Output: 23
 *
 * Constraints:
 *
 * - 1 <= nums.length <= 10^5
 * - -10^4 <= nums[i] <= 10^4
 *
 * Follow up:
 *
 * - If you have figured out the O(n) solution, try coding another solution
 *   using the divide and conquer approach, which is more subtle.
 *
 * Notes:
 *
 * [-2, 1, -3, 4, -1, 2, 1, -5, 4]
 * [-2]                             => [-2]
 * [-2, 1]                          => [1]
 * [-2, 1, -3]                      => [1]
 * [-2, 1, -3, 4]                   => [4]
 * [-2, 1, -3, 4, -1]               => [4]
 * [-2, 1, -3, 4, -1, 2]            => [4, -1, 2]
 * [-2, 1, -3, 4, -1, 2, 1]         => [4, -1, 2, 1]
 * [-2, 1, -3, 4, -1, 2, 1, -5]     => [4, -1, 2, 1]
 * [-2, 1, -3, 4, -1, 2, 1, -5, 4]  => [4, -1, 2, 1]
 */

// @lc code=start

/**
 * Brute-force. Find and sum every subarray tracking and returning the max sum.
 *
 * - Time:  O(n^2)  - For every num, traverse nums to create and sum subarray
 * - Space: O(1)    - Track only the max sum
 */
const maxSubArrayBrute = (nums: number[]): number => {
    let maxSum: number = nums[0];

    for (let i = 0; i < nums.length; i++) {
        let subArrSum = 0;
        for (let j = i; j < nums.length; j++) {
            subArrSum += nums[j];
            maxSum = Math.max(maxSum, subArrSum);
        }
    }

    return maxSum;
};

/**
 * Dynamic programming. Find where the optimal subarray begins by looking for
 * the beginning index.
 *
 * - Time:  O(n)    - Traverse nums only once
 * - Space: O(1)    - Track only 3 variables
 */
const maxSubArrayDP = (nums: number[]): number => {
    let subArrSum: number = nums[0];
    let maxSum: number = nums[0];

    // For every number, add it to the current subarray's sum unless the number
    // is larger than than the subarray's sum, in which case reset the subarray
    // with the current number. Keep the largest sum updated.
    for (let i = 1; i < nums.length; i++) {
        const num: number = nums[i];
        subArrSum = Math.max(num, subArrSum + num);
        maxSum = Math.max(maxSum, subArrSum);
    }

    return maxSum;
};

// Which function to enable for LeetCode?
const maxSubArray = maxSubArrayDP;

// @lc code=end
export { maxSubArray, maxSubArrayBrute, maxSubArrayDP };
