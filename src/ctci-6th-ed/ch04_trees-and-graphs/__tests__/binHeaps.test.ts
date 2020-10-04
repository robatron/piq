import { cn } from '../BinTreeNode';
import { HeapType, insert, isValidHeap } from '../binHeaps';
import { getBinTreeDisplayLines } from '../binTreeDisplay';

describe('isValidHeap', () => {
    describe('HeapType.min', () => {
        it('returns true if every node is <= than its children', () => {
            [
                cn(1, cn(2, cn(4), cn(5)), cn(3, cn(6), cn(7))),
                cn(1, cn(1, cn(1), cn(1)), cn(1, cn(1), cn(1))),
                cn(100, cn(500, cn(700), cn(800)), cn(700, cn(800), cn(900))),
            ].forEach((tree) =>
                expect(isValidHeap(HeapType.min, tree)).toBe(true),
            );
        });

        it('returns false if any node is > than its children', () => {
            [
                cn(1, cn(2, cn(4), cn(5)), cn(7, cn(6), cn(8))),
                cn(2, cn(1, cn(4), cn(5)), cn(3, cn(6), cn(8))),
            ].forEach((tree) =>
                expect(isValidHeap(HeapType.min, tree)).toBe(false),
            );
        });
    });

    describe('HeapType.max', () => {
        it('returns true if every node is >= than its children', () => {
            const tree = cn(7, cn(6, cn(4), cn(3)), cn(5, cn(2), cn(1)));
            expect(isValidHeap(HeapType.max, tree)).toBe(true);
        });

        it('returns false if any node is < than its children', () => {
            const tree = cn(7, cn(6, cn(4), cn(3)), cn(5, cn(6), cn(1)));
            expect(isValidHeap(HeapType.max, tree)).toBe(false);
        });
    });
});

describe('insert', () => {
    describe('HeapType.max', () => {
        const heapType = HeapType.max;

        describe('inserting a node', () => {
            it('into the middle of the heap', () => {
                const heap = cn(7, cn(6, cn(4), cn(3)), cn(5, cn(2), cn(1)));
                const target = cn(6.5);
                const expected = cn(
                    7,
                    cn(6.5, cn(6, cn(4)), cn(3)),
                    cn(5, cn(2), cn(1)),
                );

                const actual = insert(heapType, heap, target);

                expect(actual).toStrictEqual(expected);
            });

            it('into the end of the heap (no swapping)', () => {
                const heap = cn(7, cn(6, cn(4), cn(3)), cn(5, cn(2), cn(1)));
                const target = cn(0);
                const expected = cn(
                    7,
                    cn(6, cn(4, target), cn(3)),
                    cn(5, cn(2), cn(1)),
                );

                const actual = insert(heapType, heap, target);

                expect(actual).toStrictEqual(expected);
            });

            it('into the heap root', () => {
                const heap = cn(7, cn(6, cn(4), cn(3)), cn(5, cn(2), cn(1)));
                const target = cn(100);
                const expected = cn(
                    100,
                    cn(7, cn(6, cn(4)), cn(3)),
                    cn(5, cn(2), cn(1)),
                );

                const actual = insert(heapType, heap, target);

                expect(actual).toStrictEqual(expected);
            });
        });
    });

    describe('HeapType.min', () => {
        const heapType = HeapType.min;

        describe('inserting a node', () => {
            it('into the middle of the heap', () => {
                const heap = cn(1, cn(2, cn(4), cn(5)), cn(3, cn(6), cn(7)));
                const target = cn(2.5);
                const expected = cn(
                    1,
                    cn(2, cn(2.5, cn(4)), cn(5)),
                    cn(3, cn(6), cn(7)),
                );

                const actual = insert(heapType, heap, target);

                expect(actual).toStrictEqual(expected);
            });

            it('into the end of the heap (no swapping)', () => {
                const heap = cn(1, cn(2, cn(4), cn(5)), cn(3, cn(6), cn(7)));
                const target = cn(100);
                const expected = cn(
                    1,
                    cn(2, cn(4, target), cn(5)),
                    cn(3, cn(6), cn(7)),
                );

                const actual = insert(heapType, heap, target);

                expect(actual).toStrictEqual(expected);
            });

            it('into the heap root', () => {
                const heap = cn(1, cn(2, cn(4), cn(5)), cn(3, cn(6), cn(7)));
                const target = cn(0);
                const expected = cn(
                    0,
                    cn(1, cn(2, cn(4)), cn(5)),
                    cn(3, cn(6), cn(7)),
                );

                const actual = insert(heapType, heap, target);

                expect(actual).toStrictEqual(expected);
            });
        });
    });

    describe('errors', () => {
        const heapType = HeapType.max;

        it('throws if the binary tree is not a valid heap', () => {
            const tree = cn(1, cn(2), cn(3));
            const target = cn();
            expect(() => {
                insert(heapType, tree, target);
            }).toThrowErrorMatchingInlineSnapshot(
                `"Insert failed. Invalid max heap."`,
            );
        });

        it('throws if the target is not childless', () => {
            const tree = cn(1, cn(2), cn(3));
            const target = cn(4, cn(5));
            expect(() => {
                insert(heapType, tree, target);
            }).toThrowErrorMatchingInlineSnapshot(
                `"Insert failed. Invalid max heap."`,
            );
        });
    });
});
