import { hammingDistance } from '../461.hamming-distance';
import { createTests } from './utils';

describe('hammingDistance', () => {
    createTests(
        [
            [[0, 0], 0],
            [[1, 4], 2],
            [[3, 1], 1],
            [[15, 0], 4],
        ],
        hammingDistance,
        { spreadInput: true },
    );
});
