import findDupSpaceEd, { findDupSpaceEdNaiive } from '../findDupSpaceEd';

it('finds duplicates in a list of integers', () => {
    let list = [2, 1, 7, 8, 4, 6, 4, 5, 3]; // n = 8, length = 9
    let expd = 4;

    expect(findDupSpaceEdNaiive(list)).toBe(expd);
    expect(findDupSpaceEd(list)).toBe(expd);

    list = [3, 4, 2, 3, 1, 5];
    expd = 3;

    expect(findDupSpaceEdNaiive(list)).toBe(expd);
    expect(findDupSpaceEd(list)).toBe(expd);

    list = [3, 1, 2, 2];
    expd = 2;

    expect(findDupSpaceEdNaiive(list)).toBe(expd);
    expect(findDupSpaceEd(list)).toBe(expd);

    list = [4, 3, 1, 1, 4];

    expect(findDupSpaceEdNaiive(list)).toBe(1);
    expect(findDupSpaceEd(list)).toBe(4);
});
