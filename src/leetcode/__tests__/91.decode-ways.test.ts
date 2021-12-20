import { numDecodings } from '../91.decode-ways';
import { createTests } from './utils';

createTests(
    [
        // Invalid codes
        ['0', 0],
        ['06', 0],
        ['2001', 0],

        ['1', 1],

        ['27', 1],
        ['10', 1],
        ['12', 2],

        // 2 2 6
        // 22 6
        // 2 26
        ['226', 3],
        // substr   ways    combos
        // 2        1       2
        // 22       2       22, 2 2
        // 226      3       22 6, 2 26, 2 2 6

        // 2 2 7
        // 22 7
        ['227', 2],
        // substr   ways    combos
        // 2        1       2
        // 22       2       2 2, 22
        // 227      2       2 2 7, 22 7

        // 2 20
        ['220', 1],
        // substr   ways    combos
        // 2        1       2
        // 22       2       2 2, 22
        // 220      1       2 20

        // 1 1 10 6
        // 11 10 6
        ['11106', 2],
        // substr   ways    combos
        //     6    1                       6
        //    06    0                       _
        //   106    1                    10 6
        //  1106    1                  1 10 6
        // 11106    2       1 1 10 6, 11 10 6

        ['1123', 5],
        // substr   ways    combos
        // 1        1       1
        // 11       2       11, 1 1
        // 112      3       11 2,           1 12,   1 1 2
        // 1123     5       11 23, 11 2 3,  1 1 23, 1 12 3, 1 1 2 3,
    ],
    numDecodings,
);
