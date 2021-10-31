import {
    buildTree,
    TreeNode,
} from '../105.construct-binary-tree-from-preorder-and-inorder-traversal';

/**
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
 */
describe('sample test cases', () => {
    test('sample 1', () => {
        const preorder: number[] = [3, 9, 20, 15, 7]; // [3, 9, _, _, 20, 15, 7]
        const inorder: number[] = [9, 3, 15, 20, 7]; // [_, 9, _, 3, 15, 20, 7]
        const actual: TreeNode = buildTree(preorder, inorder);

        expect(actual.val).toBe(3);

        expect(actual.left.val).toBe(9);
        expect(actual.right.val).toBe(20);

        expect(actual.left.left).toBe(null);
        expect(actual.left.right).toBe(null);

        expect(actual.right.left.val).toBe(15);
        expect(actual.right.right.val).toBe(7);
    });

    test('sample 2', () => {
        const preorder: number[] = [-1];
        const inorder: number[] = [-1];
        const actual: TreeNode = buildTree(preorder, inorder);

        expect(actual.val).toBe(-1);
        expect(actual.left).toBeNull();
        expect(actual.right).toBeNull();
    });

    test('sample 3', () => {
        const preorder: number[] = [1, 2];
        const inorder: number[] = [1, 2];
        const actual: TreeNode = buildTree(preorder, inorder);

        expect(actual.val).toBe(1);
        expect(actual.left).toBeNull();
        expect(actual.right.val).toBe(2);
    });

    test('sample 4', () => {
        const preorder: number[] = [1, 2, 3];
        const inorder: number[] = [3, 2, 1];
        const actual: TreeNode = buildTree(preorder, inorder);

        expect(actual.val).toBe(1);
        expect(actual.left.val).toBe(2);
        expect(actual.right).toBe(null);
        expect(actual.left.left.val).toBe(3);
    });

    test('sample 5', () => {
        const preorder: number[] = [1, 2, 3];
        const inorder: number[] = [2, 3, 1];
        const actual: TreeNode = buildTree(preorder, inorder);

        // [1,2,null,null,3]
        expect(actual.val).toBe(1);
        expect(actual.left.val).toBe(2);
        expect(actual.right).toBe(null);
        expect(actual.left.left).toBe(null);
        expect(actual.left.right.val).toBe(3);
    });
});
