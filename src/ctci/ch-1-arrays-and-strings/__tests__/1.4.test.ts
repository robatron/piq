import { replaceSpace } from '../1.4';

describe('replaceSpace', () => {
    it('replaces spaces with the string %20', () => {
        const tstStrArr = 'Mr John Smith'.split('');
        const expectedResult = 'Mr%20John%20Smith'.split('');
        replaceSpace(tstStrArr);
        expect(tstStrArr).toEqual(expectedResult);
    });

    it('handles empty strings', () => {
        const tstStrArr = ''.split('');
        replaceSpace(tstStrArr);
        expect(tstStrArr).toEqual([]);
    });

    it('handles strings with no spaces', () => {
        const tstStrArr = 'Supercalifragilisticexpialidocious'.split('');
        const expectedResult = [...tstStrArr]; // Copy of original
        replaceSpace(tstStrArr);
        expect(tstStrArr).toEqual(expectedResult);
    });
});
