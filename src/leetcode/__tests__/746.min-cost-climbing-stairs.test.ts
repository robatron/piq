import minCostClimbingStairs from '../746.min-cost-climbing-stairs';
import { createTests } from './utils';

createTests(
    [
        [[10, 15, 20], 15],
        [[1, 100, 1, 1, 1, 100, 1, 1, 100, 1], 6],
        [
            '468338975697725621760670136250448678'
                .split('')
                .map((d) => parseInt(d)),
            80,
        ],
    ],
    minCostClimbingStairs,
);
