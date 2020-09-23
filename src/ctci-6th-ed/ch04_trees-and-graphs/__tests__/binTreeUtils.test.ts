import { getBinTreeDisplayLines } from '../binTreeDisplay';
import { cn } from '../BinTreeNode';
import { appendToCompleteBinTree, isCompleteBinTree } from '../binTreeUtils';

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
        });

        it('appends a node into the rightmost slot in a nearly-complete row', () => {
            const tree = cn(1, cn(2, cn(4), cn(5)), cn(3, cn(6)));
            const target = cn('🎯');
            const expected = cn(1, cn(2, cn(4), cn(5)), cn(3, cn(6), target));

            appendToCompleteBinTree(tree, target);

            expect(tree).toStrictEqual(expected);
        });

        it('appends a node into the middle slot of the last row', () => {
            const tree = cn(1, cn(2, cn(4), cn(5)), cn(3));
            const target = cn('🎯');
            const expected = cn(1, cn(2, cn(4), cn(5)), cn(3, target));

            appendToCompleteBinTree(tree, target);

            expect(tree).toStrictEqual(expected);
        });
    });

    it('inserts the target into an empty tree', () => {
        const tree = null;
        const target = cn('🎯');
        const expected = target;

        const actual = appendToCompleteBinTree(tree, target);

        expect(actual).toStrictEqual(expected);
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
