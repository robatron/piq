import { minimalTree } from '../4.2_minimalTree';
import { getBinTreeDisplayLines } from '../binTreeDisplay';

describe(minimalTree, () => {
    it('constructs a binary search tree of minimal height from an array with unique, increasing integers', () => {
        // Create a 15-length array with elements 0-14
        const treeArr = [...Array(15).keys()];
        const actual = minimalTree(treeArr);

        const actualDisplay = getBinTreeDisplayLines(actual, {
            showLeftRightLabel: true,
        });
        console.log(
            '🚀: actualDisplay',
            JSON.stringify(actualDisplay, null, 2),
        );
    });
});
