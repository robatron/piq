/*
Return the century number from a year
*/
export const centuryFromYear = (year: number): number => {
    // We're defining year 0 as part of the 1st century
    if (year === 0) {
        return 1;
    }

    // If year is negative, we take the floor instead
    if (year < 0) {
        return Math.floor(year / 100);
    }

    // Otherwise, for typical years, the century is just the cieling of year / 100
    return Math.ceil(year / 100);
};
