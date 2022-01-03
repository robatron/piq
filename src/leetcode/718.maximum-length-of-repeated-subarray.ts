/*
 * @lc app=leetcode id=718 lang=typescript
 *
 * [718] Maximum Length of Repeated Subarray
 *
 * https://leetcode.com/problems/maximum-length-of-repeated-subarray/description/
 *
 * Medium (51.28%)
 *
 * Given two integer arrays `nums1` and `nums2`, return the maximum length of a
 * subarray that appears in both arrays.
 *
 * Example 1:
 *
 * - Input: nums1 = [1,2,3,2,1], nums2 = [3,2,1,4,7]
 * - Output: 3
 * - Explanation: The repeated subarray with maximum length is [3,2,1].
 *
 * Example 2:
 *
 * - Input: nums1 = [0,0,0,0,0], nums2 = [0,0,0,0,0]
 * - Output: 5
 *
 * Constraints:
 *
 * - 1 <= nums1.length, nums2.length <= 1000
 * - 0 <= nums1[i], nums2[i] <= 100
 */

// @lc code=start

/**
 * Dynamic programming (bottom-up). Find the length of the longest common
 * subarray of all prefixes using the answers from the previous prefixes to find
 * the current one.
 *
 * - Time: O(a * b) - Visit every item in B for every item of A
 * - Space: O(a * b) - Store max common subarray lengths for every prefix
 */
const findLength = (A: number[], B: number[]): number => {
    // Max length of common subarrays of all prefixes thru A[i] and B[j]
    const maxLens: number[][] = Array(A.length)
        .fill(null)
        .map(() => Array(B.length).fill(0));

    // Max length of common subarrays in A and B
    let maxLen = 0;

    for (let i = 0; i < A.length; i++) {
        for (let j = 0; j < B.length; j++) {
            // All prefixes have at least a common subarray of length 0
            maxLens[i][j] = 0;

            if (A[i] === B[j]) {
                // We have a common subarray of at least length 1 if the most
                // recent item matches
                maxLens[i][j]++;

                // Add the max length of the common prefixes in the previous
                // prefixes
                if (i > 0 && j > 0) maxLens[i][j] += maxLens[i - 1][j - 1];

                // Update the total max length
                maxLen = Math.max(maxLen, maxLens[i][j]);
            }
        }
    }

    return maxLen;
};
// @lc code=end
export { findLength };
