import { jumpBruteBFS, jumpBT, jumpGreedy } from '../45.jump-game-ii';
import { createTests } from './utils';
import { LCTest101 } from './__resources__/45.jump-game-ii.rsrc';

type InsAndOuts = [number[], number][];

const insOuts: InsAndOuts = [
    [[3], 0],
    [[2, 3, 1, 1, 4], 2],
    [[2, 3, 0, 1, 4], 2],
];
const proInsOuts: InsAndOuts = [
    [
        // 1. Index 0 => 5: Start! 6 children, choose 9 (largest)
        // 2. Index 5 => 12: 9 children, choose 9 (largest)
        // 3. Index 12 => 19: 9 children, choose 8 (largest)
        // 4. Index 19 => 23: Finish!
        //   [            x   ]
        //                  [                  x      ] -
        //                                       [               x         ]
        //                                                         [            x         ]
        // 6, 2, 6, 1, 7, 9, 3, 5, 3, 7, 2, 8, 9, 4, 7, 7, 2, 2, 8, 4, 6, 6, 1, 3
        [
            6, 2, 6, 1, 7, 9, 3, 5, 3, 7, 2, 8, 9, 4, 7, 7, 2, 2, 8, 4, 6, 6, 1,
            3,
        ],
        4,
    ],
    LCTest101,
];

createTests(insOuts, jumpBruteBFS, { name: 'jumpBruteBFS' });
createTests([...insOuts, ...proInsOuts], jumpBT, { name: 'jumpBT' });
createTests([...insOuts, ...proInsOuts], jumpGreedy, { name: 'jumpGreedy' });
