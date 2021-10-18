export default (
    fn: (unknown) => unknown,
    input: unknown,
    output: unknown,
    only = true,
): void =>
    (only ? test.only : test)(`${input} => ${output}`, () =>
        expect(fn(input)).toStrictEqual(output),
    );
