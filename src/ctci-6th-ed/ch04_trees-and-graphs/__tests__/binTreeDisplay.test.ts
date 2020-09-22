import BinTreeNode from '../BinTreeNode';
import { getBinTreeDisplayLines } from '../binTreeDisplay';

const n = BinTreeNode;

// Test binary tree matching the example
const cousinTestBinTree = new n(
    'great-grandparent',
    new n(
        'grandparent',
        new n(
            'parents',
            new n('YOU', new n('children', new n('grandchildren'))),
            new n('sibling', new n('niece/nephew', new n('grandniece/nephew'))),
        ),
        new n(
            'aunt/uncle',
            new n(
                '1st-cousin',
                new n(
                    '1st-cousin-once-removed',
                    new n('1st-cousin-twice-removed'),
                ),
            ),
        ),
    ),
    new n(
        'grandaunt/uncle',
        new n(
            '1st-cousin-once-removed',
            new n(
                '2nd-cousin',
                new n(
                    '2nd-cousin-once-removed',
                    new n('2nd-cousin-twice-removed'),
                ),
            ),
        ),
    ),
);

describe('getBinTreeDisplayLines', () => {
    it('returns display lines of a cousin chart binary tree', () => {
        expect(getBinTreeDisplayLines(cousinTestBinTree)).toStrictEqual([
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
