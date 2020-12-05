import { cn } from '../BinTreeNode';
import { getBinTreeDisplayLines } from '../binTreeDisplay';

// Test binary tree matching the example
const cousinTestBinTree = cn(
    'great-grandparent',
    cn(
        'grandparent',
        cn(
            'parents',
            cn('YOU', cn('children', cn('grandchildren'))),
            cn('sibling', cn('niece/nephew', cn('grandniece/nephew'))),
        ),
        cn(
            'aunt/uncle',
            cn(
                '1st-cousin',
                cn('1st-cousin-once-removed', cn('1st-cousin-twice-removed')),
            ),
        ),
    ),
    cn(
        'grandaunt/uncle',
        cn(
            '1st-cousin-once-removed',
            cn(
                '2nd-cousin',
                cn('2nd-cousin-once-removed', cn('2nd-cousin-twice-removed')),
            ),
        ),
    ),
);

describe('getBinTreeDisplayLines', () => {
    it('returns an empty list of display lines if the tree is null', () => {
        expect(getBinTreeDisplayLines(null)).toMatchInlineSnapshot(`Array []`);
    });

    it('returns display lines of a cousin chart binary tree', () => {
        expect(getBinTreeDisplayLines(cousinTestBinTree))
            .toMatchInlineSnapshot(`
            Array [
              "great-grandparent",
              "├──[L] grandparent",
              "│   ├──[L] parents",
              "│   │   ├──[L] YOU",
              "│   │   │   └──[L] children",
              "│   │   │       └──[L] grandchildren",
              "│   │   └──[R] sibling",
              "│   │       └──[L] niece/nephew",
              "│   │           └──[L] grandniece/nephew",
              "│   └──[R] aunt/uncle",
              "│       └──[L] 1st-cousin",
              "│           └──[L] 1st-cousin-once-removed",
              "│               └──[L] 1st-cousin-twice-removed",
              "└──[R] grandaunt/uncle",
              "    └──[L] 1st-cousin-once-removed",
              "        └──[L] 2nd-cousin",
              "            └──[L] 2nd-cousin-once-removed",
              "                └──[L] 2nd-cousin-twice-removed",
            ]
        `);
    });

    it('shows left/right child labels', () => {
        expect(
            getBinTreeDisplayLines(cousinTestBinTree, {
                showLeftRightLabel: true,
            }),
        ).toMatchInlineSnapshot(`
            Array [
              "great-grandparent",
              "├──[L] grandparent",
              "│   ├──[L] parents",
              "│   │   ├──[L] YOU",
              "│   │   │   └──[L] children",
              "│   │   │       └──[L] grandchildren",
              "│   │   └──[R] sibling",
              "│   │       └──[L] niece/nephew",
              "│   │           └──[L] grandniece/nephew",
              "│   └──[R] aunt/uncle",
              "│       └──[L] 1st-cousin",
              "│           └──[L] 1st-cousin-once-removed",
              "│               └──[L] 1st-cousin-twice-removed",
              "└──[R] grandaunt/uncle",
              "    └──[L] 1st-cousin-once-removed",
              "        └──[L] 2nd-cousin",
              "            └──[L] 2nd-cousin-once-removed",
              "                └──[L] 2nd-cousin-twice-removed",
            ]
        `);
    });
});
