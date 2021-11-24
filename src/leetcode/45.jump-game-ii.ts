/**
 * @lc app=leetcode id=45 lang=typescript
 *
 * [45] Jump Game II
 *
 * https://leetcode.com/problems/jump-game-ii/description/
 *
 * Medium (35.34%) Given an array of non-negative integers nums, you are
 * initially positioned at the first index of the array.
 *
 * Each element in the array represents your maximum jump length at that
 * position.
 *
 * Your goal is to reach the last index in the minimum number of jumps.
 *
 * You can assume that you can always reach the last index.
 *
 * Example 1:
 *
 * - Input: [2, 3, 1, 1, 4]
 * - Output: 2
 * - Explanation: The minimum number of jumps to reach the last index is 2. Jump
 *   1 step from index 0 to 1, then 3 steps to the last index.
 *
 * Example 2:
 *
 * - Input: [2, 3, 0, 1, 4]
 * - Output: 2
 *
 * Constraints:
 *
 * - 1 <= nums.length <= 10^4
 * - 0 <= nums[i] <= 1000
 *
 * Notes:
 *
 * - Considering [2, 3, 1, 1, 4]
 *   - 2 (0)
 *     - 3 (1)
 *       - 1 (2)
 *       - 1 (3)
 *       - 4 (4)
 *     - 1 (2)
 *       - 1 (3)
 *         - 4 (4)
 */

// @lc code=start

/**
 * Brute force w/ exhaustive breadth-first search. (LeetCode TLE error.)
 *
 * Time: O(n^2) - Traverse one less index for every index (triangular series)
 * Space: O(n^2) - Every node can have every other node as children
 */
const jumpBruteBFS = (nums: number[]): number => {
    // If we only have one index, we've already arrived at the end
    if (nums.length === 1) return 0;

    // Queue for traversing the indexes and their "children", i.e., indexes you
    // can get to from the current index
    const idxQueue: number[] = [0];

    // Current number of jumps we've made so far, and the smallest number of
    // jumps required to reach the last index we've found so far
    let jumps = 0;
    let minJumps = Infinity;

    // Traverse the indexes and their possible destination indexes (children)
    // using breadth-first search
    while (idxQueue.length) {
        const curIdx: number = idxQueue.shift();
        const curMaxJumps: number = nums[curIdx];
        const children: number[] = [];

        jumps++;

        // Look through the children and push them onto the search queue unless
        // they are the final index themselves in which case update the minJumps
        // if necessary
        for (let i = 1; i <= curMaxJumps; i++) {
            const childIdx = curIdx + i;
            const childIsLastIdx = childIdx === nums.length - 1;

            if (childIsLastIdx && jumps < minJumps) minJumps = jumps;
            else children.push(childIdx);
        }

        idxQueue.push(...children);
    }

    return minJumps;
};

/**
 * Optimized backtracking algorithm that searches for valid paths starting with
 * source indexes the furthest away from every destination index starting from
 * the last index and tracking the shortest path.
 *
 * Time: O(n^2) - Worst case could still visit every index for every destination index
 * Space: O(n) - Only 2 complete sets of size n at worst
 */
const jumpBT = (nums: number[]): number => {
    if (nums.length === 1) return 0;

    let minJumps = Infinity;
    const triedIdxs: Set<number> = new Set();
    const pathIdxStack: number[] = [nums.length - 1];

    while (pathIdxStack.length) {
        const topDestIdx: number = pathIdxStack[pathIdxStack.length - 1];
        let furthestSrcIdx = -1;

        for (let i = 0; i < topDestIdx; i++) {
            if (!triedIdxs.has(i)) {
                const maxJumps: number = nums[i];
                const maxJumpIdx: number = i + maxJumps;
                if (maxJumpIdx >= topDestIdx) {
                    furthestSrcIdx = i;
                    break;
                }
            }
        }

        if (furthestSrcIdx > 0) {
            pathIdxStack.push(furthestSrcIdx);
        } else {
            const isCompletePath = furthestSrcIdx === 0;
            if (isCompletePath)
                minJumps = Math.min(minJumps, pathIdxStack.length);
            triedIdxs.add(pathIdxStack.pop());
        }
    }

    return minJumps;
};

/**
 * Greedy. Traverse the array from the index and continuously find the furthest
 * index we can reach from the current index making a jump every time we reach
 * the end of the current jump range.
 *
 * Time: O(n) - Only visit each index once
 * Space: O(1) - No additional data structures
 */
const jumpGreedy = (nums: number[]): number => {
    // Jumps we've made so far
    let jumps = 0;

    // Furthest reachable index
    let furthestIdx = 0;

    // End of the current range we can jump to
    let curJumpEnd = 0;

    // Exclude the last index b/c we'll never jump from it
    for (let i = 0; i < nums.length - 1; i++) {
        // What's the furthest we can reach from the current index?
        furthestIdx = Math.max(furthestIdx, nums[i] + i);

        // If we reach the end of the current jump range, make a jump,
        // and update the jump range to the furthest range
        if (i === curJumpEnd) {
            jumps++;
            curJumpEnd = furthestIdx;
        }
    }

    return jumps;
};

// Which algorithm shall we enable for LeetCode?
const jump = jumpGreedy;

// @lc code=end
export default jump;
export { jumpBruteBFS, jumpBT, jumpGreedy };
