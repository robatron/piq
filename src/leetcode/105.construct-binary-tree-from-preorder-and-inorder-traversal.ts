/**
 * @lc app=leetcode id=105 lang=typescript
 *
 * [105] Construct Binary Tree from Preorder and Inorder Traversal
 *
 * https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/description/
 *
 * Medium (55.35%)
 *
 * Given two integer arrays preorder and inorder where preorder is the preorder
 * traversal of a binary tree and inorder is the inorder traversal of the same
 * tree, construct and return the binary tree.
 *
 * Example 1:
 *
 * - preorder = [3, 9, 20, 15, 7]
 * - inorder =  [9, 3, 15, 20, 7]
 * - output =>  [3, 9, 20, null, null, 15, 7]
 *
 * Example 2:
 *
 * - preorder = [-1]
 * - inorder =  [-1]
 * - output =>  [-1]
 *
 * Constraints:
 *
 * - `1 <= preorder.length <= 3000`
 * - `inorder.length == preorder.length`
 * - `-3000 <= preorder[i], inorder[i] <= 3000`
 * - `preorder` and `inorder` consist of unique values.
 * - Each value of `inorder` also appears in `preorder`.
 * - `preorder` is *guaranteed* to be the preorder traversal of the tree.
 * - `inorder` is *guaranteed* to be the inorder traversal of the tree.
 */

/** GIVEN definition for a binary tree node */
class TreeNode {
    val: number;
    left: TreeNode | null;
    right: TreeNode | null;
    constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
        this.val = val === undefined ? 0 : val;
        this.left = left === undefined ? null : left;
        this.right = right === undefined ? null : right;
    }
}

// @lc code=start

// The starting and ending indexes of a sequence
type SequenceRange = [number, number];

// DFS traversal stack
type NodeRangeStack = NodeRangeStackItem[];

// Single DFS traversal stack item. We want to keep the node and its preorder
// and inorder sequence ranges together.
class NodeRangeStackItem {
    node: TreeNode;
    preoRange: SequenceRange;
    inoRange: SequenceRange;

    constructor(n: TreeNode, pr: SequenceRange, ir: SequenceRange) {
        this.node = n;
        this.preoRange = pr;
        this.inoRange = ir;
    }
}

// Construct a binary tree from preorder and inorder sequence arrays using
// iterative depth-first traversal
const buildTree = (preo: number[], ino: number[]): TreeNode => {
    // Construct a root on which to build the tree that will be returned
    const root: TreeNode = new TreeNode(null);

    // Maintain a stack for the depth-first traversal to store the current node
    // and the ranges of its preorder and inorder sub sequences
    const nodeRangeStack: NodeRangeStack = [
        new NodeRangeStackItem(root, [0, preo.length - 1], [0, ino.length - 1]),
    ];

    while (nodeRangeStack.length) {
        const {
            node,
            preoRange: [pBeg, pEnd],
            inoRange: [iBeg, iEnd],
        } = nodeRangeStack.pop();

        // Skip this node if null (eg, the previous node didn't have this child)
        if (!node) continue;

        // VALUE ---------------------------------------------------------------

        // The value is always at the beginning of the preorder range, but we
        // also need to find the value in the inorder sequence so we know how
        // to break up the left and right child subsequnces later
        const parentPIdx: number = pBeg;
        const parentVal: number = preo[parentPIdx];
        const parentIIdx: number = ino.indexOf(parentVal, iBeg);

        node.val = parentVal;

        // LEFT CHILD ----------------------------------------------------------

        // Left value is one to the right of the parent in the preorder
        // subsequence. The left subsequence size is just the parent inorder
        // index - inorder start index.
        const leftPIdx = parentPIdx + 1;
        const leftVal: number = preo[leftPIdx];
        const leftSize: number = parentIIdx - iBeg;

        // Set the left child node if it exists
        node.left = leftSize > 0 ? new TreeNode(leftVal) : null;

        // Calculate the left preorder and inorder subsequences
        const leftPRange: SequenceRange = [leftPIdx, leftPIdx + leftSize];
        const leftIRange: SequenceRange = [iBeg, iBeg + leftSize - 1];

        // Push the left child node and its subsequence ranges
        nodeRangeStack.push(
            new NodeRangeStackItem(node.left, leftPRange, leftIRange),
        );

        // RIGHT CHILD ---------------------------------------------------------

        // Right value is one to the right of the left subsequence in the
        // preorder subsequence. The right subsequence size is just the inorder
        // end index - the parent inorder end index.
        const rightPIdx: number = leftPIdx + leftSize;
        const rightVal: number = preo[rightPIdx];
        const rightSize: number = iEnd - parentIIdx;

        // Set the right child node if it exists
        node.right = rightSize > 0 ? new TreeNode(rightVal) : null;

        // Calculate the right preorder and inorder subsequences
        const rightPRange: SequenceRange = [rightPIdx, pEnd];
        const rightIRange: SequenceRange = [parentIIdx + 1, iEnd];

        // Push the right child node and its subsequence ranges
        nodeRangeStack.push(
            new NodeRangeStackItem(node.right, rightPRange, rightIRange),
        );
    }

    return root;
};
// @lc code=end

export { buildTree, TreeNode };
