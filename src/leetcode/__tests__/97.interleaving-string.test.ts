import { isInterleave } from '../97.interleaving-string';
import { createTests } from './utils';

const clean = (s: string): string => s.replace(/[ ()]/g, '');

createTests(
    [
        // Examples
        [['', '', ''], true],
        [[clean('aa bc c'), clean('dbbc a'), clean('(aa)dbbc(bc)a(c)')], true],
        [['aabcc', 'dbbca', 'aadbbbaccc'], false],

        // LC tests
        [['aa', 'ab', 'abaa'], true],
    ],
    isInterleave,
    { spreadInput: true },
);
