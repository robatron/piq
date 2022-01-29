/*
 * @lc app=leetcode id=104 lang=typescript
 *
 * [104] Maximum Depth of Binary Tree
 *
 * https://leetcode.com/problems/maximum-depth-of-binary-tree/description/
 *
 * Easy (70.10%)
 *
 * Given the root of a binary tree, return its maximum depth.
 *
 * A binary tree's maximum depth is the number of nodes along the longest path
 * from the root node down to the farthest leaf node.
 *
 * Example 1:
 *
 * - Input: root = [3,9,20,null,null,15,7]
 * - Output: 3
 *
 * Example 2:
 *
 * - Input: root = [1,null,2]
 * - Output: 2
 *
 * Constraints:
 *
 * - The number of nodes in the tree is in the range [0, 10^4].
 * - -100 <= Node.val <= 100
 */

// Given definition of a binary tree node (customized)
class TreeNode {
    val: number;
    left: TreeNode;
    right: TreeNode;

    constructor(val = 0, left: TreeNode = null, right: TreeNode = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }

    // Customize stringifier to output a BFS traversal of this tree
    toString = (): string => {
        const displayArray: number[] = [];
        const searchQueue: TreeNode[] = [this];

        while (searchQueue.length) {
            const node = searchQueue.pop();

            if (node) {
                const { val, left, right } = node;

                displayArray.push(val);

                if (left || right) {
                    searchQueue.unshift(left ? left : new TreeNode());
                    searchQueue.unshift(right ? right : new TreeNode());
                }
            }
        }

        return displayArray.map((val) => (val ? val : '_')).toString();
    };
}

// @lc code=start
const maxDepth = (root: TreeNode): number => {
    if (!root) return 0;

    const maxLevelLeft = maxDepth(root.left);
    const maxLevelRight = maxDepth(root.right);

    return 1 + Math.max(maxLevelLeft, maxLevelRight);
};
// @lc code=end
export { maxDepth, TreeNode };
