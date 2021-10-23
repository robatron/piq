import digitsProduct from '../digitsProduct';

describe('digitsProduct', () => {
    const createTest = (input: number, output: number) =>
        test(`${input} => ${output}`, () => {
            expect(digitsProduct(input)).toBe(output);
        });

    createTest(12, 26);
    createTest(19, -1);
    createTest(450, 2559);
    createTest(1, 1);
    createTest(0, 10);
});
