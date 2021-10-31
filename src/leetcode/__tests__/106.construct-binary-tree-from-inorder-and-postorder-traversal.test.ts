import {
    buildTree,
    TreeNode,
} from '../106.construct-binary-tree-from-inorder-and-postorder-traversal';

test('sample 1', () => {
    const inorder: number[] = [9, 3, 15, 20, 7];
    const postorder: number[] = [9, 15, 7, 20, 3];
    const actual: TreeNode = buildTree(inorder, postorder);

    expect(actual.val).toBe(3);

    expect(actual.left.val).toBe(9);
    expect(actual.right.val).toBe(20);

    expect(actual.left.left).toBe(null);
    expect(actual.left.right).toBe(null);

    expect(actual.right.left.val).toBe(15);
    expect(actual.right.right.val).toBe(7);
});
