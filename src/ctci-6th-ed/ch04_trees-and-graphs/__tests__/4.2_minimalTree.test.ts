import { cn } from '../BinTreeNode';
import { minimalTree } from '../4.2_minimalTree';

describe(minimalTree, () => {
    it('constructs a binary search tree of minimal height from an array with unique, increasing integers', () => {
        // Create a 15-length array with elements 0-14
        const treeArr = [...Array(15).keys()];
        const actual = minimalTree(treeArr);

        // prettier-ignore
        const expected = cn(
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

        expect(actual).toStrictEqual(expected);
    });

    it('constructs imperfect trees', () => {
        // Create a 15-length array with elements 0-9
        const treeArr = [...Array(10).keys()];
        const actual = minimalTree(treeArr);

        // prettier-ignore
        const expected = cn(
            0,
            cn(1,
                cn(3,
                    cn(7),
                    cn(8)
                ),
                cn(4,
                    cn(9)
                )
            ),
            cn(2,
                cn(5),
                cn(6)
            ),
        );

        expect(actual).toStrictEqual(expected);
    });

    it('returns null if no root value', () => {
        expect(minimalTree([])).toBeNull();
    });
});
