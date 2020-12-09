import { cn } from '../BinTreeNode';
import { listOfDepths } from '../4.3_listOfDepths';

describe('listOfDepths', () => {
    it('returns a list of node values from a binary tree at each depth', () => {
        // prettier-ignore
        const binTree = cn(
            0,
            cn(1,
                cn(3,
                    cn(7),
                    cn(8)
                ),
                cn(4,
                    cn(9),
                    cn(10)
                )
            ),
            cn(2,
                cn(5,
                    cn(11),
                    cn(12)
                ),
                cn(6,
                    cn(13),
                    cn(14)
                )
            ),
        );

        expect(listOfDepths(binTree)).toStrictEqual([
            [0],
            [1, 2],
            [3, 4, 5, 6],
            [7, 8, 9, 10, 11, 12, 13, 14],
        ]);
    });

    it('handles incomplete trees', () => {
        // prettier-ignore
        const binTree = cn(
            0,
            cn(
                1,
                cn(3, cn(7), cn(8)),
                cn(
                    4,
                    // cn(9),
                    cn(10),
                ),
            ),
            cn(
                2,
                // cn(5,
                //     cn(11),
                //     cn(12)
                // ),
                cn(
                    6,
                    cn(13),
                    // cn(14)
                ),
            ),
        );

        expect(listOfDepths(binTree)).toStrictEqual([
            [0],
            [1, 2],
            [3, 4, 6],
            [7, 8, 10, 13],
        ]);
    });
});
