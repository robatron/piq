import { cn } from '../BinTreeNode';
import { extract, HeapType, insert, isValidHeap } from '../binHeaps';
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

describe('extract', () => {
    [HeapType.max, HeapType.min].forEach((heapType) => {
        const heapTypeName = HeapType[heapType];
        describe(`both heap types`, () => {
            it(`throws if the ${heapTypeName} heap is invalid`, () => {
                const heap = cn(1, null, cn(3));
                expect(() => {
                    extract(heapType, heap);
                }).toThrowErrorMatchingInlineSnapshot(
                    `"Extract failed. Invalid ${heapTypeName} heap."`,
                );
            });

            it('returns the heap as root and new heap if heap contains only one node', () => {
                const heap = cn(1);

                const [heapRoot, newHeap] = extract(heapType, heap);

                expect(heapRoot).toStrictEqual(heap);
                expect(newHeap).toStrictEqual(heap);
            });

            it('returns the root node and new heap when no reordering is necessary', () => {
                const heap = cn(1, cn(1), cn(1));

                const [heapRoot, newHeap] = extract(heapType, heap);

                expect(heapRoot).toStrictEqual(cn(1));
                expect(newHeap).toStrictEqual(cn(1, cn(1)));
            });
        });
    });

    describe(`max heap type`, () => {
        const heapType = HeapType.max;

        it('returns the root node and reordered tree', () => {
            // Heap before
            const heap = cn(7, cn(6, cn(4), cn(3)), cn(5, cn(2), cn(1)));
            expect(getBinTreeDisplayLines(heap, { showLeftRightLabel: true }))
                .toMatchInlineSnapshot(`
                Array [
                  "7",
                  "├──[L] 6",
                  "│   ├──[L] 4",
                  "│   └──[R] 3",
                  "└──[R] 5",
                  "    ├──[L] 2",
                  "    └──[R] 1",
                ]
            `);

            const [heapRoot, newHeap] = extract(heapType, heap);

            // Expect root to be extracted, and tree to be reordered
            expect(heapRoot).toStrictEqual(cn(7));
            expect(
                getBinTreeDisplayLines(newHeap, { showLeftRightLabel: true }),
            ).toMatchInlineSnapshot(`
                Array [
                  "6",
                  "├──[L] 4",
                  "│   ├──[L] 1",
                  "│   └──[R] 3",
                  "└──[R] 5",
                  "    └──[L] 2",
                ]
            `);
        });
    });

    describe(`min heap type`, () => {
        const heapType = HeapType.min;

        it('returns the root node and reordered tree', () => {
            // Heap before
            const heap = cn(1, cn(2, cn(4), cn(5)), cn(3, cn(6), cn(7)));
            expect(getBinTreeDisplayLines(heap, { showLeftRightLabel: true }))
                .toMatchInlineSnapshot(`
                Array [
                  "1",
                  "├──[L] 2",
                  "│   ├──[L] 4",
                  "│   └──[R] 5",
                  "└──[R] 3",
                  "    ├──[L] 6",
                  "    └──[R] 7",
                ]
            `);

            const [heapRoot, newHeap] = extract(heapType, heap);

            // Expect root to be extracted, and tree to be reordered
            expect(heapRoot).toStrictEqual(cn(1));
            expect(
                getBinTreeDisplayLines(newHeap, { showLeftRightLabel: true }),
            ).toMatchInlineSnapshot(`
                Array [
                  "2",
                  "├──[L] 4",
                  "│   ├──[L] 7",
                  "│   └──[R] 5",
                  "└──[R] 3",
                  "    └──[L] 6",
                ]
            `);
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

                expect(
                    getBinTreeDisplayLines(heap, { showLeftRightLabel: true }),
                ).toMatchInlineSnapshot(`
                    Array [
                      "7",
                      "├──[L] 6",
                      "│   ├──[L] 4",
                      "│   └──[R] 3",
                      "└──[R] 5",
                      "    ├──[L] 2",
                      "    └──[R] 1",
                    ]
                `);

                const actual = insert(heapType, heap, target);

                expect(actual).toStrictEqual(expected);
                expect(
                    getBinTreeDisplayLines(actual, {
                        showLeftRightLabel: true,
                    }),
                ).toMatchInlineSnapshot(`
                    Array [
                      "7",
                      "├──[L] 6.5",
                      "│   ├──[L] 6",
                      "│   │   └──[L] 4",
                      "│   └──[R] 3",
                      "└──[R] 5",
                      "    ├──[L] 2",
                      "    └──[R] 1",
                    ]
                `);
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
