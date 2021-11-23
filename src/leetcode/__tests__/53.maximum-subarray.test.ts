import { maxSubArrayBrute, maxSubArrayDP } from '../53.maximum-subarray';
import { createTests } from './utils';

const ios: [number[], number][] = [
    [[1], 1],
    [[-2, 1, -3, 4, -1, 2, 1, -5, 4], 6],
    [[5, 4, -1, 7, 8], 23],
];

createTests(ios, maxSubArrayBrute, { name: 'maxSubArrayBrute' });
createTests(ios, maxSubArrayDP, { name: 'maxSubArrayDP' });
