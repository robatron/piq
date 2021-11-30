import { maxSquareBF, maxSquareDP } from '../221.maximal-square';
import { createTests } from './utils';

const ios: [string[][], number][] = [
    [[['1']], 1],
    [[['0']], 0],
    [[['0', '1']], 1],
    [
        [
            ['0', '1'],
            ['1', '0'],
        ],
        1,
    ],
    [
        [
            ['1', '1'],
            ['1', '1'],
        ],
        4,
    ],
    [
        [
            ['1', '1', '1'],
            ['1', '1', '1'],
            ['1', '1', '1'],
        ],
        9,
    ],
    [
        [
            ['1', '0', '1', '0', '0'],
            ['1', '0', '1', '1', '1'],
            ['1', '1', '1', '1', '1'],
            ['1', '0', '0', '1', '0'],
        ],
        4,
    ],
    [
        [
            //1    1    1    1    0
            ['1', '1', '1', '1', '0'],
            //1    2    2    2    0
            ['1', '1', '1', '1', '0'],
            //1    2    3    3    1
            ['1', '1', '1', '1', '1'],
            //1    2    3    4    2
            ['1', '1', '1', '1', '1'],
            //0    0    1    2    3
            ['0', '0', '1', '1', '1'],
        ],
        16,
    ],
];

createTests(ios, maxSquareBF, { name: 'maxSquareBF', maxInputDisplayLen: 3 });
createTests(ios, maxSquareDP, { name: 'maxSquareDP', maxInputDisplayLen: 3 });
