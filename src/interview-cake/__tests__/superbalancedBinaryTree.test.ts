import isBinTreeSuperbalanced, { cn } from '../superbalancedBinaryTree';

describe('balancedBinaryTree', () => {
    it('returns true if a binary tree is "superbalanced"', () => {
        // prettier-ignore
        const root0diff =
            cn('r',
                cn('l',
                    cn('ll'),
                    cn('lr')
                ),
                cn('r',
                    cn('rl'),
                    cn('rr')
                )
            );

        // prettier-ignore
        const root1diff =
            cn('r',
                cn('ll',
                    cn('lll'),
                    cn('llr')
                ),
                cn('lr')
            );

        const root0nodes = cn();
        const root1node = cn('r');

        expect(isBinTreeSuperbalanced(root0diff)).toBe(true);
        expect(isBinTreeSuperbalanced(root1diff)).toBe(true);
        expect(isBinTreeSuperbalanced(root0nodes)).toBe(true);
        expect(isBinTreeSuperbalanced(root1node)).toBe(true);
    });

    it('returns false if a binary tree is not "superbalanced"', () => {
        // prettier-ignore
        const root2diff =
            cn('r',
                cn('l',
                    cn('ll',
                        cn('lll'),
                        cn('llr')
                    ),
                    cn('lr')
                ),
                cn('r'),
            );

        expect(isBinTreeSuperbalanced(root2diff)).toBe(false);
    });
});
