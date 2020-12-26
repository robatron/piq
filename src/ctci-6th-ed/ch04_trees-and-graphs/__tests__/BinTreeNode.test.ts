import { getBinTreeDisplayLines } from '../binTreeDisplay';
import BinTreeNode, { ChildType, cn } from '../BinTreeNode';

describe('BinTreeNode', () => {
    describe('constructor', () => {
        it('sets the value to null by default', () => {
            const tree = new BinTreeNode();
            expect(tree.value).toBeNull();
            expect(getBinTreeDisplayLines(tree, { showLeftRightLabel: true }))
                .toMatchInlineSnapshot(`
                Array [
                  "null",
                ]
            `);
        });

        it('can assign a value', () => {
            const tree = new BinTreeNode('test-val');
            expect(tree.value).toEqual('test-val');
            expect(getBinTreeDisplayLines(tree, { showLeftRightLabel: true }))
                .toMatchInlineSnapshot(`
                Array [
                  "test-val",
                ]
            `);
        });

        it('can set a left and a right node', () => {
            const leftChild = new BinTreeNode('left-child');
            const rightChild = new BinTreeNode('right-child');
            const tree = new BinTreeNode('root', leftChild, rightChild);

            expect(tree.getLeftChild()).toBe(leftChild);
            expect(tree.getRightChild()).toBe(rightChild);

            expect(leftChild.getParent()).toStrictEqual(tree);
            expect(leftChild.getChildType()).toEqual(ChildType.left);
            expect(rightChild.getParent()).toStrictEqual(tree);
            expect(rightChild.getChildType()).toEqual(ChildType.right);

            expect(getBinTreeDisplayLines(tree, { showLeftRightLabel: true }))
                .toMatchInlineSnapshot(`
                Array [
                  "root",
                  "├──[L] left-child",
                  "└──[R] right-child",
                ]
            `);
        });
    });

    describe('setLeftChild, setRightChild', () => {
        it('can adopt left and right children', () => {
            const leftChild = new BinTreeNode('left-child');
            const rightChild = new BinTreeNode('right-child');

            const tree = new BinTreeNode('parent');

            expect(getBinTreeDisplayLines(tree, { showLeftRightLabel: true }))
                .toMatchInlineSnapshot(`
                Array [
                  "parent",
                ]
            `);

            tree.setLeftChild(leftChild);
            tree.setRightChild(rightChild);

            expect(tree.getLeftChild()).toBe(leftChild);
            expect(tree.getRightChild()).toBe(rightChild);

            expect(leftChild.getParent()).toStrictEqual(tree);
            expect(leftChild.getChildType()).toEqual(ChildType.left);
            expect(rightChild.getParent()).toStrictEqual(tree);
            expect(rightChild.getChildType()).toEqual(ChildType.right);

            expect(getBinTreeDisplayLines(tree, { showLeftRightLabel: true }))
                .toMatchInlineSnapshot(`
                Array [
                  "parent",
                  "├──[L] left-child",
                  "└──[R] right-child",
                ]
            `);
        });

        it('can abandon the left child', () => {
            const leftChild = new BinTreeNode('left-child');
            const rightChild = new BinTreeNode('right-child');
            const tree = new BinTreeNode('parent', leftChild, rightChild);

            expect(getBinTreeDisplayLines(tree, { showLeftRightLabel: true }))
                .toMatchInlineSnapshot(`
                Array [
                  "parent",
                  "├──[L] left-child",
                  "└──[R] right-child",
                ]
            `);

            tree.setLeftChild(null);

            expect(tree.getLeftChild()).toBe(null);

            expect(leftChild.getParent()).toBeNull();
            expect(leftChild.getChildType()).toBeNull();

            expect(getBinTreeDisplayLines(tree, { showLeftRightLabel: true }))
                .toMatchInlineSnapshot(`
                Array [
                  "parent",
                  "└──[R] right-child",
                ]
            `);
        });

        it('can abandon the right child', () => {
            const leftChild = new BinTreeNode('left-child');
            const rightChild = new BinTreeNode('right-child');
            const tree = new BinTreeNode('parent', leftChild, rightChild);

            expect(getBinTreeDisplayLines(tree, { showLeftRightLabel: true }))
                .toMatchInlineSnapshot(`
                Array [
                  "parent",
                  "├──[L] left-child",
                  "└──[R] right-child",
                ]
            `);

            tree.setRightChild(null);

            expect(tree.getRightChild()).toBe(null);

            expect(rightChild.getParent()).toBeNull();
            expect(rightChild.getChildType()).toBeNull();

            expect(getBinTreeDisplayLines(tree, { showLeftRightLabel: true }))
                .toMatchInlineSnapshot(`
                Array [
                  "parent",
                  "└──[L] left-child",
                ]
            `);
        });
    });

    describe('isChildless', () => {
        it('returns true if the node has no children', () => {
            const tree = new BinTreeNode('parent');
            expect(tree.isChildless()).toBe(true);
        });

        it('returns false if the node has any children', () => {
            const leftChild = new BinTreeNode('left-child');
            const rightChild = new BinTreeNode('right-child');
            const tree = new BinTreeNode('parent', leftChild);

            expect(tree.isChildless()).toBe(false);

            tree.setRightChild(rightChild);

            expect(tree.isChildless()).toBe(false);
        });
    });

    describe('abandonChildren', () => {
        it('unsets both children', () => {
            const leftChild = new BinTreeNode('left-child');
            const rightChild = new BinTreeNode('right-child');
            const tree = new BinTreeNode('parent', leftChild, rightChild);

            expect(getBinTreeDisplayLines(tree, { showLeftRightLabel: true }))
                .toMatchInlineSnapshot(`
                Array [
                  "parent",
                  "├──[L] left-child",
                  "└──[R] right-child",
                ]
            `);

            tree.abandonChildren();

            expect(tree.getLeftChild()).toBeNull();
            expect(tree.getRightChild()).toBeNull();

            expect(getBinTreeDisplayLines(tree, { showLeftRightLabel: true }))
                .toMatchInlineSnapshot(`
                Array [
                  "parent",
                ]
            `);
        });
    });

    describe('emancipate', () => {
        it('does nothing if the node is a root node', () => {
            const leftChild = new BinTreeNode('left-child');
            const rightChild = new BinTreeNode('right-child');
            const tree = new BinTreeNode('parent', leftChild, rightChild);

            expect(tree.getParent()).toBeNull();
            expect(tree.getChildType()).toBeNull();

            tree.emancipate();

            expect(tree.getParent()).toBeNull();
            expect(tree.getChildType()).toBeNull();
        });

        it('renounces the parent for left children', () => {
            const leftChild = new BinTreeNode('left-child');
            const rightChild = new BinTreeNode('right-child');
            const tree = new BinTreeNode('parent', leftChild, rightChild);

            expect(leftChild.getParent()).toStrictEqual(tree);
            expect(leftChild.getChildType()).toStrictEqual(ChildType.left);
            expect(getBinTreeDisplayLines(tree, { showLeftRightLabel: true }))
                .toMatchInlineSnapshot(`
                Array [
                  "parent",
                  "├──[L] left-child",
                  "└──[R] right-child",
                ]
            `);

            leftChild.emancipate();

            expect(leftChild.getParent()).toBeNull();
            expect(leftChild.getChildType()).toBeNull();
            expect(getBinTreeDisplayLines(tree, { showLeftRightLabel: true }))
                .toMatchInlineSnapshot(`
                Array [
                  "parent",
                  "└──[R] right-child",
                ]
            `);
        });

        it('renounces the parent for right children', () => {
            const leftChild = new BinTreeNode('left-child');
            const rightChild = new BinTreeNode('right-child');
            const tree = new BinTreeNode('parent', leftChild, rightChild);

            expect(rightChild.getParent()).toStrictEqual(tree);
            expect(rightChild.getChildType()).toStrictEqual(ChildType.right);
            expect(getBinTreeDisplayLines(tree, { showLeftRightLabel: true }))
                .toMatchInlineSnapshot(`
                Array [
                  "parent",
                  "├──[L] left-child",
                  "└──[R] right-child",
                ]
            `);

            rightChild.emancipate();

            expect(rightChild.getParent()).toBeNull();
            expect(rightChild.getChildType()).toBeNull();
            expect(getBinTreeDisplayLines(tree, { showLeftRightLabel: true }))
                .toMatchInlineSnapshot(`
                Array [
                  "parent",
                  "└──[L] left-child",
                ]
            `);
        });
    });
});

describe('cn', () => {
    it('creates a new BinTreeNode', () => {
        const tree = cn('root', cn('left'), cn('right'));
        expect(getBinTreeDisplayLines(tree, { showLeftRightLabel: true }))
            .toMatchInlineSnapshot(`
            Array [
              "root",
              "├──[L] left",
              "└──[R] right",
            ]
        `);
    });
});
