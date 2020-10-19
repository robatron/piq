import { getBinTreeDisplayLines } from '../binTreeDisplay';
import { cn } from '../BinTreeNode';
import {
    appendToCompleteBinTree,
    getLastNodeInCompleteBinTree,
    isCompleteBinTree,
    swapBinTreeNodes,
} from '../binTreeUtils';

describe('appendToCompleteBinTree', () => {
    describe('typical states', () => {
        it('appends a node into the leftmost slot in a new row', () => {
            const tree = cn(1, cn(2, cn(4), cn(5)), cn(3, cn(6), cn(7)));
            const target = cn('🎯');
            const expected = cn(
                1,
                cn(2, cn(4, target), cn(5)),
                cn(3, cn(6), cn(7)),
            );

            appendToCompleteBinTree(tree, target);

            expect(tree).toStrictEqual(expected);
            expect(getBinTreeDisplayLines(tree, true)).toMatchInlineSnapshot(`
                Array [
                  "1",
                  "├──[L] 2",
                  "│   ├──[L] 4",
                  "│   │   └──[L] 🎯",
                  "│   └──[R] 5",
                  "└──[R] 3",
                  "    ├──[L] 6",
                  "    └──[R] 7",
                ]
            `);
        });

        it('appends a node into the rightmost slot in a nearly-complete row', () => {
            const tree = cn(1, cn(2, cn(4), cn(5)), cn(3, cn(6)));
            const target = cn('🎯');
            const expected = cn(1, cn(2, cn(4), cn(5)), cn(3, cn(6), target));

            appendToCompleteBinTree(tree, target);

            expect(tree).toStrictEqual(expected);
            expect(getBinTreeDisplayLines(tree, true)).toMatchInlineSnapshot(`
                Array [
                  "1",
                  "├──[L] 2",
                  "│   ├──[L] 4",
                  "│   └──[R] 5",
                  "└──[R] 3",
                  "    ├──[L] 6",
                  "    └──[R] 🎯",
                ]
            `);
        });

        it('appends a node into the middle slot of the last row', () => {
            const tree = cn(1, cn(2, cn(4), cn(5)), cn(3));
            const target = cn('🎯');
            const expected = cn(1, cn(2, cn(4), cn(5)), cn(3, target));

            appendToCompleteBinTree(tree, target);

            expect(tree).toStrictEqual(expected);
            expect(getBinTreeDisplayLines(tree, true)).toMatchInlineSnapshot(`
                Array [
                  "1",
                  "├──[L] 2",
                  "│   ├──[L] 4",
                  "│   └──[R] 5",
                  "└──[R] 3",
                  "    └──[L] 🎯",
                ]
            `);
        });
    });

    it('inserts the target into an empty tree', () => {
        const tree = null;
        const target = cn('🎯');
        const expected = target;

        const actual = appendToCompleteBinTree(tree, target);

        expect(actual).toStrictEqual(expected);
        expect(getBinTreeDisplayLines(target, true)).toMatchInlineSnapshot(`
            Array [
              "🎯",
            ]
        `);
    });

    describe('error states', () => {
        it("throws if tree isn't complete", () => {
            const tree = cn(1, cn(2, cn(4)), cn(3, cn(6), cn(7)));
            const target = cn('🎯');
            expect(() => {
                appendToCompleteBinTree(tree, target);
            }).toThrowErrorMatchingInlineSnapshot(
                `"Binary tree must be \\"complete\\""`,
            );
        });

        it("throws if target isn't childless", () => {
            const tree = cn(1, cn(2, cn(4), cn(5)), cn(3, cn(6), cn(7)));
            const target = cn('parent', cn('left-child'), cn('right-child'));
            expect(() => {
                appendToCompleteBinTree(tree, target);
            }).toThrowErrorMatchingInlineSnapshot(
                `"Target node must be childless"`,
            );
        });
    });
});

describe('getLastNodeInCompleteBinTree', () => {
    it('returns null for an empty tree', () => {
        expect(getLastNodeInCompleteBinTree(null)).toBe(null);
    });

    it('finds the last node in a perfect tree', () => {
        const lastNode = cn(7);
        const tree = cn(1, cn(2, cn(4), cn(5)), cn(3, cn(6), lastNode));
        expect(getLastNodeInCompleteBinTree(tree)).toEqual(lastNode);
    });

    it('finds the last node in an imperfect tree', () => {
        const lastNode = cn(6);
        const tree = cn(1, cn(2, cn(4), cn(5)), cn(3, lastNode));
        expect(getLastNodeInCompleteBinTree(tree)).toEqual(lastNode);
    });
});

describe('isCompleteBinTree', () => {
    it('returns true for empty trees', () => {
        expect(isCompleteBinTree(null)).toBe(true);
    });

    it('returns true for "perfect" binary trees', () => {
        const tree = cn(1, cn(2, cn(4), cn(5)), cn(3, cn(6), cn(7)));
        expect(isCompleteBinTree(tree)).toBe(true);
    });

    it('returns true if there are no missing nodes after the first', () => {
        [
            cn(1, cn(2, cn(4), cn(5)), cn(3, cn(6), null)),
            cn(1, cn(2, cn(4), cn(5)), cn(3, null, null)),
            cn(1, cn(2, cn(4), null), cn(3, null, null)),
        ].forEach((tree) => expect(isCompleteBinTree(tree)).toBe(true));
    });

    it('returns false if there are any missing nodes after the first', () => {
        [
            cn(1, cn(2, null, cn(5)), cn(3, cn(6), cn(7))),
            cn(1, cn(2, cn(4), null), cn(3, cn(6), cn(7))),
            cn(1, cn(2, cn(4), cn(5)), cn(3, null, cn(7))),
        ].forEach((tree) => expect(isCompleteBinTree(tree)).toBe(false));
    });
});

describe('swapBinTreeNodes', () => {
    it('swaps two nodes in a binary tree', () => {
        const nodeA = cn(4);
        const nodeB = cn(7);
        const actualTree = cn(1, cn(2, nodeA, cn(5)), cn(3, cn(6), nodeB));
        const expectedTree = cn(1, cn(2, cn(7), cn(5)), cn(3, cn(6), cn(4)));

        swapBinTreeNodes(nodeA, nodeB);

        expect(actualTree).toStrictEqual(expectedTree);
        expect(getBinTreeDisplayLines(actualTree, true)).toMatchInlineSnapshot(`
            Array [
              "1",
              "├──[L] 2",
              "│   ├──[L] 7",
              "│   └──[R] 5",
              "└──[R] 3",
              "    ├──[L] 6",
              "    └──[R] 4",
            ]
        `);
    });

    it('swaps two nodes on different levels', () => {
        const nodeA = cn(2, cn(4), cn(5));
        const nodeB = cn(7);
        const actualTree = cn(1, nodeA, cn(3, cn(6), nodeB));
        const expectedTree = cn(1, cn(7, cn(4), cn(5)), cn(3, cn(6), cn(2)));

        swapBinTreeNodes(nodeA, nodeB);

        expect(actualTree).toStrictEqual(expectedTree);
        expect(getBinTreeDisplayLines(actualTree, true)).toMatchInlineSnapshot(`
            Array [
              "1",
              "├──[L] 7",
              "│   ├──[L] 4",
              "│   └──[R] 5",
              "└──[R] 3",
              "    ├──[L] 6",
              "    └──[R] 2",
            ]
        `);
    });

    it('swaps direct ancestors', () => {
        const nodeB = cn(7);
        const nodeA = cn(3, cn(6), nodeB);
        const actualTree = cn(1, cn(2, cn(4), cn(5)), nodeA);
        const expectedTree = cn(1, cn(2, cn(4), cn(5)), cn(7, cn(6), cn(3)));

        swapBinTreeNodes(nodeA, nodeB);

        expect(actualTree).toStrictEqual(expectedTree);
        expect(getBinTreeDisplayLines(actualTree, true)).toMatchInlineSnapshot(`
            Array [
              "1",
              "├──[L] 2",
              "│   ├──[L] 4",
              "│   └──[R] 5",
              "└──[R] 7",
              "    ├──[L] 6",
              "    └──[R] 3",
            ]
        `);
    });

    it('swaps with the root node', () => {
        const nodeA = cn(7);
        const nodeB = cn(1, cn(2, cn(4), cn(5)), cn(3, cn(6), nodeA));
        const expectedTree = cn(7, cn(2, cn(4), cn(5)), cn(3, cn(6), cn(1)));

        swapBinTreeNodes(nodeA, nodeB);

        expect(nodeA).toStrictEqual(expectedTree);
        expect(getBinTreeDisplayLines(nodeA, true)).toMatchInlineSnapshot(`
            Array [
              "7",
              "├──[L] 2",
              "│   ├──[L] 4",
              "│   └──[R] 5",
              "└──[R] 3",
              "    ├──[L] 6",
              "    └──[R] 1",
            ]
        `);
    });
});
