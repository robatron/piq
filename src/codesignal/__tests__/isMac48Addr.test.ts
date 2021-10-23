import isMAC48Address from '../isMac48Addr';

test('sample', () => {
    expect(isMAC48Address('00-1B-63-84-45-E6')).toBe(true);
});
