import fileNaming from '../fileNaming';

const createTest = (input, output, skip = false) =>
    (skip ? test.skip : test)(`${input} => ${output}`, () =>
        expect(fileNaming(input)).toStrictEqual(output),
    );

createTest(
    ['doc', 'doc', 'image', 'doc(1)', 'doc'],
    ['doc', 'doc(1)', 'image', 'doc(1)(1)', 'doc(2)'],
);

createTest(
    ['a(1)', 'a(6)', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a'],
    [
        'a(1)',
        'a(6)',
        'a',
        'a(2)',
        'a(3)',
        'a(4)',
        'a(5)',
        'a(7)',
        'a(8)',
        'a(9)',
        'a(10)',
        'a(11)',
    ],
);
