import sayHello from '../1.1';

describe('1.1', () => {
    it('returns if a string has all unique characters', () => {
        expect(sayHello('name')).toBe('Hello, name');
    });
});
