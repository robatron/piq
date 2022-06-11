// My own implementation of some Array prototype methods
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array

/**
 * The concat() method is used to merge two or more arrays. This method does
 * not change the existing arrays, but instead returns a new array.
 */
const concat = <T = unknown>(...arrs: T[][]): T[] => {
    const newArr: T[] = [];

    for (let a = 0; a < arrs.length; a++) {
        const curArr: T[] = arrs[a];
        for (let i = 0; i < curArr.length; i++) {
            const curVal: T = curArr[i];
            newArr.push(curVal);
        }
    }

    return newArr;
};

/**
 * The flat() method creates a new array with all sub-array elements
 * concatenated into it recursively up to the specified depth.
 */
const flat = <T = unknown>(arr: T[], depth = 1): T[] => {
    // If the depth is 0, return the original array
    if (!depth) return [...arr];

    const newArr: T[] = [];

    for (let i = 0; i < arr.length; i++) {
        const curVal = arr[i];

        if (Array.isArray(curVal)) newArr.push(...flat(curVal, depth - 1));
        else newArr.push(curVal);
    }

    return newArr;
};

/**
 * The map() method creates a new array populated with the results of calling a
 * provided function on every element in the calling array.
 */
const map = <T = unknown, R = unknown>(
    arr: T[],
    fn: (val: T, idx: number) => R,
): R[] => {
    const newArr: R[] = [];

    for (let i = 0; i < arr.length; i++) newArr.push(fn(arr[i], i));

    return newArr;
};

/**
 *
 * @param arr The reduce() method executes a user-supplied "reducer" callback
 * function on each element of the array, in order, passing in the return value
 * from the calculation on the preceding element. The final result of running
 * the reducer across all elements of the array is a single value.
 *
 * The first time that the callback is run there is no "return value of the
 * previous calculation". If supplied, an initial value may be used in its
 * place. Otherwise the array element at index 0 is used as the initial value
 * and iteration starts from the next element (index 1 instead of index 0).
 */
const reduce = <A = unknown, R = unknown>(
    arr: A[],
    fn: (accum: A | R, val: A, idx: number) => R,
    initVal?: A | R,
): A | R => {
    const hasInitVal = initVal !== undefined;
    let accum: A | R = hasInitVal ? initVal : arr[0];

    for (let i = hasInitVal ? 0 : 1; i < arr.length; i++) {
        accum = fn(accum, arr[i], i);
    }

    return accum;
};

/**
 * The reverse() method reverses an array in place. The first array element
 * becomes the last, and the last array element becomes the first.
 */
const reverse = <T = unknown>(arr: T[]): T[] => {
    let i = 0;
    let ri = arr.length - 1;

    while (i < ri) {
        const tmp = arr[i];
        arr[i] = arr[ri];
        arr[ri] = tmp;

        i++;
        ri--;
    }

    return arr;
};

export { concat, flat, map, reduce, reverse };
