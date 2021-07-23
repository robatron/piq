import { cn } from '../lib/BinTreeNode';
import binSearchTreeCheck, {
    binSearchTreeCheckSort,
    getBinSearchTreeValsInOrder,
} from '../binSearchTreeCheck';

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

describe('getBinSearchTreeValsInOrder', () => {
    it('returns an array of values from a binary search tree in order', () => {
        expect(getBinSearchTreeValsInOrder(binSearchTree)).toStrictEqual([
            10,
            20,
            30,
            40,
            50,
            60,
            70,
            80,
            85,
            90,
            100,
        ]);
    });
});
describe('binary search tree checkers', () => {
    it('returns true if the binary tree is a binary search tree', () => {
        expect(binSearchTreeCheck(binSearchTree)).toBe(true);
        expect(binSearchTreeCheckSort(binSearchTree)).toBe(true);
    });

    it('returns false if the binary tree is not a binary search tree', () => {
        // prettier-ignore
        const tree =
            cn(4,
                cn(2,
                    cn(1),
                    cn(3)
                ),
                cn(5,
                    cn(6)
                )
            );

        // prettier-ignore
        const gotchaBinSearchTree =
            cn(50,
                cn(30,
                    cn(20),
                    cn(60)
                ),
                cn(80,
                    cn(70),
                    cn(90)
                )
            )

        expect(binSearchTreeCheck(tree)).toBe(false);
        expect(binSearchTreeCheck(gotchaBinSearchTree)).toBe(false);

        expect(binSearchTreeCheckSort(tree)).toBe(false);
        expect(binSearchTreeCheckSort(gotchaBinSearchTree)).toBe(false);
    });
});
