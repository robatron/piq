import { uniquePathsDP, uniquePathsDPSpaceOpt } from '../62.unique-paths';
import { createTests } from './utils';

const ios: [number[], number][] = [
    [[1, 1], 1],
    [[3, 7], 28],
    [[3, 2], 3],
];

createTests(ios, uniquePathsDP, { spreadInput: true, name: 'DP' });
createTests(ios, uniquePathsDPSpaceOpt, { spreadInput: true, name: 'Space' });
