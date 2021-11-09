import { addStrings } from '../415.add-strings';
import { createTests } from './utils';

createTests(
    [
        [['0', '0'], '0'],
        [['11', '123'], '134'],
        [['456', '77'], '533'],
    ],
    addStrings,
    { spreadInput: true },
);
