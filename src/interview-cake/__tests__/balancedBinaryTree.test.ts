import balancedBinaryTree, { BinTreeNode } from '../balancedBinaryTree';

// prettier-ignore
it('returns true if a binary tree is "superbalanced"', () => {
    const root = new BinTreeNode<string>('root');
        const l = root.addLeft('l');
            const ll = l.addLeft('ll');
            const lr = l.addRight('lr');
        const r = root.addRight('r');

    expect(balancedBinaryTree(root)).toBe(true);
});
