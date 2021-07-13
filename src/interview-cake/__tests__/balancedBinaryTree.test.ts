import balancedBinaryTree, { cn } from '../balancedBinaryTree';

it('returns true if a binary tree is "superbalanced"', () => {
    // prettier-ignore
    const root0diff = cn(
        'root',
        cn('ll',
            cn('lll'),
            cn('llr')
        ),
        cn('lr',
            cn('lrl'),
            cn('lrr')
        ),
    );

    // prettier-ignore
    const root1diff = cn(
        'root',
        cn('ll',
            cn('lll'),
            cn('llr')
        ),
        cn('lr'),
    );

    expect(balancedBinaryTree(root0diff)).toBe(true);
    expect(balancedBinaryTree(root1diff)).toBe(true);
});

it('returns false if a binary tree is not "superbalanced"', () => {
    // prettier-ignore
    const root = cn(
        'root',
        cn('ll',
            cn('lll',
                cn('llll'),
                cn('lllr')
            ),
            cn('llr')
        ),
        cn('lr'),
    );

    expect(balancedBinaryTree(root)).toBe(false);
});
