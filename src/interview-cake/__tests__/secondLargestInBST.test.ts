import { cn } from '../lib/BinTreeNode';
import secondLargestInBST, {
    getBinSearchTreeNodesInDescOrder,
} from '../secondLargestInBST';

// prettier-ignore
const binSearchTree =
    cn(
        50,
        cn(
            30,
            cn(
                20,
                cn(10)
            ),
            cn(40)
        ),
        cn(
            80,
            cn(
                70,
                cn(60)
            ),
            cn(
                90,
                cn(85),
                cn(100)
            )
        ),
    );

// prettier-ignore
const trickyBST =
    cn(
        5,
        cn(
            3,
            cn(1),
            cn(4)
        ),
        cn(
            8,
            cn(7),
            cn(
                12,
                cn(
                    10,
                    cn(9),
                    cn(11)
                )
            )
        )
    )

describe('getBinSearchTreeValsInOrder', () => {
    it('returns an array of nodes from a binary search tree in descending order', () => {
        expect(
            getBinSearchTreeNodesInDescOrder(binSearchTree).map((n) => n.value),
        ).toStrictEqual([100, 90, 85, 80, 70, 60, 50, 40, 30, 20, 10]);
        expect(
            getBinSearchTreeNodesInDescOrder(trickyBST).map((n) => n.value),
        ).toStrictEqual([12, 11, 10, 9, 8, 7, 5, 4, 3, 1]);
    });
});

describe('secondLargestInBST', () => {
    it('finds the 2nd largest node in a binary search tree', () => {
        expect(secondLargestInBST(binSearchTree).value).toBe(90);
        expect(secondLargestInBST(trickyBST).value).toBe(11);
    });

    it('returns the 2nd largest node in a tree with only left nodes', () => {
        expect(secondLargestInBST(cn(100, cn(90, cn(80)))).value).toBe(90);
    });

    it('returns the 2nd largest node in a tree with only right nodes', () => {
        expect(
            secondLargestInBST(cn(100, undefined, cn(90, undefined, cn(80))))
                .value,
        ).toBe(90);
    });

    it('returns the 2nd largest node in a 2-node binary tree with a left child', () => {
        expect(secondLargestInBST(cn(100, cn(90))).value).toBe(90);
    });

    it('returns the 2nd largest node in a 2-node binary tree with a right child', () => {
        expect(secondLargestInBST(cn(100, undefined, cn(110))).value).toBe(100);
    });

    it('returns undefined if the BST has only one node', () => {
        expect(secondLargestInBST(cn(100))).toBeUndefined();
    });
});
