import reverseWords from '../reverseWords';

describe('reverseWords', () => {
    it('reverses words', () => {
        const message = 'cake pound steal'.split('');
        const expected = 'steal pound cake'.split('');

        reverseWords(message);

        expect(message).toStrictEqual(expected);
    });
});
