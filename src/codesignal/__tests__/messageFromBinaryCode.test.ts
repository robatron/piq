import createTest from './__utils__/createTest';
import messageFromBinaryCode from '../messageFromBinaryCode';

createTest(
    messageFromBinaryCode,
    '010010000110010101101100011011000110111100100001',
    'Hello!',
);
