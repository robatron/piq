import { canJump } from '../55.jump-game';
import { createTests } from './utils';

createTests(
    [
        [[3], true],
        [[2, 3, 1, 1, 4], true],
        [[3, 2, 1, 0, 4], false],
    ],
    canJump,
);
