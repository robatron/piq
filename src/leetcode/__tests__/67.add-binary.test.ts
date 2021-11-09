import { addBinary } from '../67.add-binary';
import { createTests } from './utils';

createTests(
    [
        [['11', '1'], '100'],
        [['1010', '1011'], '10101'],
    ],
    addBinary,
    { spreadInput: true },
);
