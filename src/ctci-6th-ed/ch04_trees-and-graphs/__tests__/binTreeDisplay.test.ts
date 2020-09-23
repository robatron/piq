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
