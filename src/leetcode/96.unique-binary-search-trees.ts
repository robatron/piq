/**
 * @lc app=leetcode id=96 lang=typescript
 *
 * [96] Unique Binary Search Trees
 *
 * https://leetcode.com/problems/unique-binary-search-trees/description/
 *
 * Medium (56.30%)
 *
 * Given an integer n, return the number of structurally unique BST's (binary
 * search trees) which has exactly n nodes of unique values from 1 to n.
 *
 *
 * Example 1:
 *
 * - Input:  n = 3
 * - Output: 5
 *
 * Example 2:
 *
 * - Input:  n = 1
 * - Output: 1
 *
 * Constraints:
 *
 * - 1 <= n <= 19
 *
 * Notes:
 * - 0 → 1 UBST
 * - 1 → 1 UBST
 * - 2 → 2 UBST
 * - 3 → 5 UBST
 */

// @lc code=start
const numTrees = (n: number): number => {
    // Store the total number of structurally-unique BSTs per number of nodes
    const nrUniqueBSTs: number[] = new Array(n + 1).fill(0);

    // The total number of unique BSTs for 0 or 1 nodes is 1 (can only make a
    // 0-size BST from 0 nodes, and a 1-size BST from 1)
    nrUniqueBSTs[0] = 1;
    nrUniqueBSTs[1] = 1;

    // For every number of nodes from 2 thru n, count how many unique BSTs can
    // be made for each node acting as the head.
    for (let nodeCt = 2; nodeCt <= n; nodeCt++) {
        // For every node acting as the head, the left subtree consists of all
        // nodes to the left (1 .. i-1), and the right consists of all nodes to
        // the right (i+1 .. nodeCt)
        // TODO: Why are the total unique BSTs for the current root the *product* of the left and right trees?
        for (let i = 1; i <= nodeCt; i++) {
            nrUniqueBSTs[nodeCt] +=
                nrUniqueBSTs[i - 1] * nrUniqueBSTs[nodeCt - i];
        }
    }

    return nrUniqueBSTs[n];
};
// @lc code=end

export { numTrees };
