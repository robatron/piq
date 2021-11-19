import {
    climbStairsBruteForce,
    climbStairsDP,
    climbStairsFib,
} from '../70.climbing-stairs';
import { createTests } from './utils';

type ClimbStairsInsAndOuts = [number, number][];
const ios: ClimbStairsInsAndOuts = [
    [0, 0],
    [1, 1],
    [2, 2],
    [3, 3],
    [4, 5],
];

// for efficient algorithms ONLY 😉
const iosAdvanced: ClimbStairsInsAndOuts = [[44, 1134903170]];

describe('climbStairsBrute', () => {
    createTests(ios, climbStairsBruteForce);
});

describe('climbStairsDP', () => {
    createTests([...ios, ...iosAdvanced], climbStairsDP);
});

describe('climbStairsFib', () => {
    createTests([...ios, ...iosAdvanced], climbStairsFib);
});
