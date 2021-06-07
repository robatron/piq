import reverseString from '../reverseString';

describe('reverseString', () => {
    it('reverses an odd-length string', () => {
        const list = 'abc'.split('');
        const expected = [...list].reverse();

        reverseString(list);

        expect(list).toStrictEqual(expected);
    });

    it('reverses an even-length string', () => {
        const list = 'abcd'.split('');
        const expected = [...list].reverse();

        reverseString(list);

        expect(list).toStrictEqual(expected);
    });
});
