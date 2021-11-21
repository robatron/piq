import { oddEvenJumps } from '../975.odd-even-jump';
import { createTests } from './utils';

const ios: [number[], number][] = [
    [[5], 1],
    [[10, 13, 12, 14, 15], 2],
    [[2, 3, 1, 1, 4], 3],
    [[5, 1, 3, 4, 2], 3],
];

describe('oddEvenJumps', () => {
    createTests(ios, oddEvenJumps);
});
