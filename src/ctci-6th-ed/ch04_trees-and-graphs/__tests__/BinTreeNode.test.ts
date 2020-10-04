import BinTreeNode, { ChildType, cn } from '../BinTreeNode';

describe('BinTreeNode', () => {
    it('has a value', () => {
        const tree = new BinTreeNode('test-val');
        expect(tree.value).toEqual('test-val');
    });

    it('has a value that defaults to null', () => {
        const tree = new BinTreeNode();
        expect(tree.value).toBeNull();
    });

    it('can have a left and a right node', () => {
        const leftChild = new BinTreeNode('left-child');
        const rightChild = new BinTreeNode('right-child');
        const tree = new BinTreeNode('root', leftChild, rightChild);

        expect(tree.getLeftChild()).toBe(leftChild);
        expect(tree.getRightChild()).toBe(rightChild);
    });

    it('sets the parent node of the child nodes', () => {
        const leftChild = new BinTreeNode('left-child');
        const rightChild = new BinTreeNode('right-child');
        const tree = new BinTreeNode('parent', leftChild, rightChild);

        expect(leftChild.parent).toStrictEqual(tree);
        expect(rightChild.parent).toStrictEqual(tree);
    });

    it('sets the parent node of the child node set after instantiation', () => {
        const leftChild = new BinTreeNode('left-child');
        const rightChild = new BinTreeNode('right-child');

        const tree = new BinTreeNode('parent');
        tree.setLeftChild(leftChild);
        tree.setRightChild(rightChild);

        expect(leftChild.parent).toStrictEqual(tree);
        expect(rightChild.parent).toStrictEqual(tree);
    });

    it('can be emancipated', () => {
        const child = new BinTreeNode('child');
        const parent = new BinTreeNode('parent', child);

        expect(child.parent).toStrictEqual(parent);
        expect(child.childType).toStrictEqual(ChildType.left);

        child.emancipate();

        expect(child.parent).toBeNull();
        expect(child.childType).toBeNull();
    });

    it('can become childless', () => {
        const leftChild = new BinTreeNode('left-child');
        const rightChild = new BinTreeNode('right-child');
        const parent = new BinTreeNode('parent', leftChild, rightChild);

        expect(parent.getLeftChild()).toStrictEqual(leftChild);
        expect(parent.getRightChild()).toStrictEqual(rightChild);
        expect(parent.isChildless()).toBe(false);

        parent.setLeftChild(null);

        expect(parent.isChildless()).toBe(false);

        parent.setRightChild(null);

        expect(parent.isChildless()).toBe(true);
    });

    describe('cn', () => {
        it('creates a new BinTreeNode', () => {
            const tree = cn('root', cn('left'), cn('right'));
            expect(tree).toMatchInlineSnapshot(`
                BinTreeNode {
                  "_leftChild": BinTreeNode {
                    "_leftChild": null,
                    "_rightChild": null,
                    "childType": 0,
                    "parent": [Circular],
                    "value": "left",
                  },
                  "_rightChild": BinTreeNode {
                    "_leftChild": null,
                    "_rightChild": null,
                    "childType": 1,
                    "parent": [Circular],
                    "value": "right",
                  },
                  "childType": null,
                  "parent": null,
                  "value": "root",
                }
            `);
        });
    });
});
