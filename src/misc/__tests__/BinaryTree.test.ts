import BinaryTree, { BinTreeNode, BinTreeSeqArr } from '../BinaryTree';

describe('BinaryTreeNode', () => {
    it('creates an empty BinaryTreeNode', () => {
        const btn = new BinTreeNode<string>();
        expect(btn.val).toBeNull();
        expect(btn.left).toBeNull();
        expect(btn.right).toBeNull();
    });

    it('creates an initialized BinaryTreeNode', () => {
        const btnLeft = new BinTreeNode<string>('left');
        const btnRight = new BinTreeNode<string>('right');
        const btnRoot = new BinTreeNode<string>('root', btnLeft, btnRight);
        [
            [btnRoot.val, 'root'],
            [btnRoot.left, btnLeft],
            [btnRoot.right, btnRight],
        ].forEach(([input, output]) => expect(input).toBe(output));
    });
});

describe('BinaryTree', () => {
    // Test binary trees
    const btNode: Record<string, BinTreeNode<string>> = {};
    const btSeq: BinTreeSeqArr = [
        'root',
        'left',
        'right',
        'left.left',
        'left.right',
        'right.left',
        'right.right',
    ];

    const btNodeRm1: Record<string, BinTreeNode<string>> = {};
    const btSeqRm1: BinTreeSeqArr = [
        'root',
        'left',
        'right',
        'left.left',
        null, // Missing left's right child
        'right.left',
        'right.right',
    ];

    const btNodeRm2: Record<string, BinTreeNode<string>> = {};
    const btSeqRm2: BinTreeSeqArr = [
        'root',
        'left',
        'right',
        null, // Missing all of left's children
        null,
        'right.left',
        'right.right',
    ];

    const btNodeRmRC: Record<string, BinTreeNode<string>> = {};
    const btSeqRmRC: BinTreeSeqArr = [
        'root',
        'left',
        'right',
        'left.left',
        'left.right',
        // Missing all of right's children
    ];

    beforeEach(() => {
        [btNode, btNodeRm1, btNodeRm2, btNodeRmRC].forEach((btn) => {
            if (btn !== btNodeRm2) {
                btn.left_left = new BinTreeNode<string>('left.left');
            }

            if (btn !== btNodeRm1 && btn !== btNodeRm2) {
                btn.left_right = new BinTreeNode<string>('left.right');
            }

            if (btn !== btNodeRmRC) {
                btn.right_left = new BinTreeNode<string>('right.left');
                btn.right_right = new BinTreeNode<string>('right.right');
            }

            btn.left = new BinTreeNode<string>(
                'left',
                btn.left_left,
                btn.left_right,
            );
            btn.right = new BinTreeNode<string>(
                'right',
                btn.right_left,
                btn.right_right,
            );

            btn.root = new BinTreeNode<string>('root', btn.left, btn.right);
        });
    });

    it('creates an empty tree', () => {
        const bt = new BinaryTree();
        expect(bt.root).toBeNull();
        expect(bt.size).toBe(0);
    });

    describe('linked node representation', () => {
        it('constructs a new tree using linked nodes', () => {
            const bt = new BinaryTree(btNode.root);
            expect(bt.root).toBe(btNode.root);
            expect(bt.size).toBe(7);

            const bt1 = new BinaryTree(btNodeRm1.root);
            expect(bt1.root).toBe(btNodeRm1.root);
            expect(bt1.size).toBe(6);

            const bt2 = new BinaryTree(btNodeRm2.root);
            expect(bt2.root).toBe(btNodeRm2.root);
            expect(bt2.size).toBe(5);

            const bt3 = new BinaryTree(btNodeRmRC.root);
            expect(bt3.root).toBe(btNodeRmRC.root);
            expect(bt3.size).toBe(btSeqRmRC.length);
        });

        it('sets a tree with linked nodes after instantiation', () => {
            const bt = new BinaryTree();
            expect(bt.root).toBeNull();

            bt.setTreeLinked(btNodeRm1.root);
            expect(bt.root).toStrictEqual(btNodeRm1.root);
        });

        it('gets a tree as linked nodes', () => {
            const bt = new BinaryTree(btNodeRm1.root);
            expect(bt.getTreeLinked()).toBe(btNodeRm1.root);
        });
    });

    describe('sequential representation', () => {
        it('constructs a new tree using a sequential array', () => {
            const bt = new BinaryTree(btSeq);
            expect(bt.root).toStrictEqual(btNode.root);

            const bt1 = new BinaryTree(btSeqRm1);
            expect(bt1.root).toStrictEqual(btNodeRm1.root);

            const bt2 = new BinaryTree(btSeqRm2);
            expect(bt2.root).toStrictEqual(btNodeRm2.root);

            const bt3 = new BinaryTree(btSeqRmRC);
            expect(bt3.root).toStrictEqual(btNodeRmRC.root);
        });

        it('sets a tree with a sequential array after instantiation', () => {
            const bt = new BinaryTree();
            expect(bt.root).toBeNull();

            bt.setTreeSeq(btSeq);
            expect(bt.root).toStrictEqual(btNode.root);

            bt.setTreeSeq(btSeqRm1);
            expect(bt.root).toStrictEqual(btNodeRm1.root);

            bt.setTreeSeq(btSeqRm2);
            expect(bt.root).toStrictEqual(btNodeRm2.root);

            bt.setTreeSeq(btSeqRmRC);
            expect(bt.root).toStrictEqual(btNodeRmRC.root);
        });

        it('gets a tree as a sequential array', () => {
            const bt = new BinaryTree(btNode.root);
            expect(bt.getTreeSeq()).toStrictEqual(btSeq);

            const bt1 = new BinaryTree(btNodeRm1.root);
            expect(bt1.getTreeSeq()).toStrictEqual(btSeqRm1);

            const bt2 = new BinaryTree(btNodeRm2.root);
            expect(bt2.getTreeSeq()).toStrictEqual(btSeqRm2);

            const bt3 = new BinaryTree(btNodeRmRC.root);
            expect(bt3.getTreeSeq()).toStrictEqual(btSeqRmRC);
        });
    });
});
