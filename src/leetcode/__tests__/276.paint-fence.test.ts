import { numWaysDPBU, numWaysStateRedux } from '../276.paint-fence';
import { createTests } from './utils';

const ios: [[number, number], number][] = [
    // 1 post => k ways
    [[1, 1], 1],
    [[1, 2], 2],
    [[1, 3], 3],

    // 2 posts => k^2 ways
    [[2, 1], 1],
    [[2, 2], 4],
    [[2, 3], 9],

    // 3 posts
    [[3, 1], 0],
    [[3, 2], 6],
];

createTests(ios, numWaysDPBU, { spreadInput: true, name: 'numWaysDPBU' });
createTests(ios, numWaysStateRedux, {
    spreadInput: true,
    name: 'numWaysStateRedux',
});
