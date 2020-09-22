import BinTreeNode from '../BinTreeNode';
import { getBinTreeDisplayLines } from '../binTreeDisplay';

// Test binary tree matching the example
const testBinTree = new BinTreeNode(
    'great-grandparent',
    new BinTreeNode(
        'grandparent',
        new BinTreeNode(
            'parents',
            new BinTreeNode(
                'YOU',
                new BinTreeNode('children', new BinTreeNode('grandchildren')),
            ),
            new BinTreeNode(
                'sibling',
                new BinTreeNode(
                    'niece/nephew',
                    new BinTreeNode('grandniece/nephew'),
                ),
            ),
        ),
        new BinTreeNode(
            'aunt/uncle',
            new BinTreeNode(
                '1st-cousin',
                new BinTreeNode(
                    '1st-cousin-once-removed',
                    new BinTreeNode('1st-cousin-twice-removed'),
                ),
            ),
        ),
    ),
    new BinTreeNode(
        'grandaunt/uncle',
        new BinTreeNode(
            '1st-cousin-once-removed',
            new BinTreeNode(
                '2nd-cousin',
                new BinTreeNode(
                    '2nd-cousin-once-removed',
                    new BinTreeNode('2nd-cousin-twice-removed'),
                ),
            ),
        ),
    ),
);

describe('getBinTreeDisplayLines', () => {
    it('returns the lines of an ASCII representation of a binary tree', () => {
        expect(getBinTreeDisplayLines(testBinTree)).toStrictEqual([
            'great-grandparent',
            '├── grandparent',
            '│   ├── parents',
            '│   │   ├── YOU',
            '│   │   │   └── children',
            '│   │   │       └── grandchildren',
            '│   │   └── sibling',
            '│   │       └── niece/nephew',
            '│   │           └── grandniece/nephew',
            '│   └── aunt/uncle',
            '│       └── 1st-cousin',
            '│           └── 1st-cousin-once-removed',
            '│               └── 1st-cousin-twice-removed',
            '└── grandaunt/uncle',
            '    └── 1st-cousin-once-removed',
            '        └── 2nd-cousin',
            '            └── 2nd-cousin-once-removed',
            '                └── 2nd-cousin-twice-removed',
        ]);
    });
});
