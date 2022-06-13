/**
 * Filters an array of objects based on a matching criteria. Filtered data will
 * be in the same order as it was received.
 */
const fancyFilter = <T = Record<string, unknown>>(
    /** Array of objects to be filtered */
    data: T[],

    /**
     * Criteria who's properties must match an object for it to be returned in
     * the form of { key1: value1, key2: value2, ... }. If no properties are
     * present in the criteria, the original data array is returned.
     */
    criteria: { [P in keyof T]?: T[P] },

    /**
     * Should an object match all or only some of the criteria properties?
     */
    matchMode: 'every' | 'some' = 'every',
): typeof data => {
    const filteredData: typeof data = [];
    const criteriaKeys = Object.keys(criteria);

    for (let i = 0; i < data.length; i++) {
        const datum: T = data[i];

        // Use the built-in Array functions `every()` or `some()` depending on
        // the matchMode. For matchMode `every` (default), all criteria must
        // match the current datum. For matchMode `some`, only one criteria
        // needs to match the current datum.
        const isMatch = criteriaKeys[matchMode](
            (criteriaKey) => datum[criteriaKey] === criteria[criteriaKey],
        );

        if (isMatch) filteredData.push(datum);
    }

    return filteredData;
};

/**
 * Same as `fancyFilter` but implemented using a functional programming
 * pattern, e.g., using `Array.prototype.filter()` for looping through the data
 * objects. It's more "elegant" than the original, but `Object.keys` is run for
 * every datum, and it's arguably less readable 😉
 */
const fancyFilterTiny = <T = Record<string, unknown>>(
    data: T[],
    criteria: { [P in keyof T]?: T[P] },
    matchMode: 'every' | 'some' = 'every',
): typeof data =>
    data.filter((datum) =>
        Object.keys(criteria)[matchMode](
            (criteriaKey) => datum[criteriaKey] === criteria[criteriaKey],
        ),
    );

export { fancyFilter, fancyFilterTiny };
