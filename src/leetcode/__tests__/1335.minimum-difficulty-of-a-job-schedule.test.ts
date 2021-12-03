import {
    minDiffRecurs,
    minDiffDP,
} from '../1335.minimum-difficulty-of-a-job-schedule';
import { createTests } from './utils';

type InsAndOuts = [[number[], number], number][];

const ios: InsAndOuts = [
    // Base cases: only one day
    [[[3], 1], 3],
    [[[1, 5, 2], 1], 5],

    // Base case: more days than jobs
    [[[9, 9, 9], 4], -1],

    [[[1, 1, 1], 3], 3],
    [[[6, 5, 4, 3, 2, 1], 2], 7],
    [[[7, 1, 7, 1, 7, 1], 3], 15],

    // day:     jobs:           Notes:
    // 6        444, 44, 333    Take up to 3 to leave enough for other days
    // 5        33
    // 4        222
    // 3        22
    // 2        111
    // 1        11
    [[[11, 111, 22, 222, 33, 333, 44, 444], 6], 843],
];

const iosHard: InsAndOuts = [
    [
        [
            [
                380, 302, 102, 681, 863, 676, 243, 671, 651, 612, 162, 561, 394,
                856, 601, 30, 6, 257, 921, 405, 716, 126, 158, 476, 889, 699,
                668, 930, 139, 164, 641, 801, 480, 756, 797, 915, 275, 709, 161,
                358, 461, 938, 914, 557, 121, 964, 315,
            ],
            10,
        ],
        3807,
    ],
];

createTests(ios, minDiffRecurs, { spreadInput: true, name: 'minDiffRecurs' });
createTests([...ios, ...iosHard], minDiffDP, {
    spreadInput: true,
    name: 'minDiffDP',
});
