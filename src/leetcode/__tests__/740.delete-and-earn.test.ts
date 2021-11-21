import { deleteAndEarnBrute, deleteAndEarnDP } from '../740.delete-and-earn';
import { createTests } from './utils';

type InsAndOuts = [number[], number][];

const ios: InsAndOuts = [
    [[3, 4, 2], 6], // [0, 0, 2, 3, 4, 0, ...]
    [[2, 2, 3, 3, 3, 4], 9], // [0, 0, 4, 9, 4, 0, 0, ...]
    [[10000], 10000],
];

// LC will give "Time Limit Exceeded" on inefficient algs
const iosAdvanced: InsAndOuts = [
    // [1, 1, 2, 2, 3, 4, 4, 4, 5, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 9]
    // [0, 2, 4, 3, 12, 15, 12, 14, 16, 27, 0, ...]
    [[8, 3, 4, 7, 6, 6, 9, 2, 5, 8, 2, 4, 9, 5, 9, 1, 5, 7, 1, 4], 61],
];

createTests(ios, deleteAndEarnBrute, { name: 'deleteAndEarnBrute' });
createTests([...ios, ...iosAdvanced], deleteAndEarnDP, {
    name: 'deleteAndEarnDP',
});
