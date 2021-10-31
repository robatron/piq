/**
 * @lc app=leetcode id=106 lang=typescript
 *
 * [106] Construct Binary Tree from Inorder and Postorder Traversal
 *
 * https://leetcode.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/description/
 *
 * Medium (52.51%)

 * Given two integer arrays `inorder` and `postorder` where `inorder` is the inorder
 * traversal of a binary tree and `postorder` is the postorder traversal of the
 * same tree, construct and return the binary tree.
 *
 * Example 1:
 *
 * - Input: inorder = [9,3,15,20,7], postorder = [9,15,7,20,3]
 * - Output: [3,9,20,null,null,15,7]
 *
 * Example 2:
 *
 * - Input: inorder = [-1], postorder = [-1]
 * - Output: [-1]
 *
 * Constraints:
 *
 * - `1 <= inorder.length <= 3000`
 * - `postorder.length == inorder.length`
 * - `-3000 <= inorder[i]`, `postorder[i] <= 3000`
 * - `inorder` and `postorder` consist of unique values.
 * - Each value of `postorder` also appears in `inorder`.
 * - `inorder` is guaranteed to be the inorder traversal of the tree.
 * - `postorder` is guaranteed to be the postorder traversal of the tree.
 *
 * Notes:
 *
 * - inorder    = [9, 3, 15, 20, 7] -- Left, Root, Right
 * - postorder  = [9, 15, 7, 20, 3] -- Left, Right, Root
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

// Single DFS traversal stack item. We want to keep the node and its inorder
// and postorder sequence ranges together.
class NodeRangeStackItem {
    node: TreeNode;
    inoRange: SequenceRange;
    postoRange: SequenceRange;
    constructor(n: TreeNode, ir: SequenceRange, pr: SequenceRange) {
        this.node = n;
        this.inoRange = ir;
        this.postoRange = pr;
    }
}

const buildTree = (ino: number[], posto: number[]): TreeNode => {
    const root: TreeNode = new TreeNode();
    const nodeRangeStack: NodeRangeStack = [
        new NodeRangeStackItem(
            root,
            [0, ino.length - 1],
            [0, posto.length - 1],
        ),
    ];

    while (nodeRangeStack.length) {
        const {
            node,
            inoRange: [iBeg, iEnd],
            postoRange: [pBeg, pEnd],
        } = nodeRangeStack.pop();

        if (!node) continue;

        // VALUE ---------------------------------------------------------------
        const parentPIdx: number = pEnd;
        const parentVal: number = posto[parentPIdx];
        const parentIIdx: number = ino.indexOf(parentVal, iBeg);

        node.val = parentVal;

        // RIGHT CHILD ---------------------------------------------------------
        const rightPIdx = parentPIdx - 1;
        const rightVal: number = posto[rightPIdx];
        const rightSize: number = iEnd - parentIIdx;

        node.right = rightSize > 0 ? new TreeNode(rightVal) : null;

        nodeRangeStack.push(
            new NodeRangeStackItem(
                node.right,
                [parentIIdx + 1, iEnd],
                [rightPIdx - rightSize + 1, rightPIdx],
            ),
        );

        // LEFT CHILD ----------------------------------------------------------
        const leftPIdx = rightPIdx - rightSize;
        const leftVal = posto[leftPIdx];
        const leftSize = parentIIdx - iBeg;

        node.left = leftSize > 0 ? new TreeNode(leftVal) : null;

        nodeRangeStack.push(
            new NodeRangeStackItem(
                node.left,
                [iBeg, parentIIdx - 1],
                [pBeg, leftPIdx],
            ),
        );
    }

    return root;
};
// @lc code=end

export { buildTree, TreeNode };
