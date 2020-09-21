import BinTreeNode from './BinTreeNode';

/**
 * Return the lines of an ASCII-art representation of a binary tree. Here's an
 * example using a family-relationships tree:
 *
 * great-grandparent
 * ├── grandparent
 * │   ├── parents
 * │   │   ├── YOU
 * │   │   │   └── children
 * │   │   │       └── grandchildren
 * │   │   └── sibling
 * │   │       └── niece/nephew
 * │   │           └── grandniece/nephew
 * │   └── aunt/uncle
 * │       └── 1st-cousin
 * │           └── 1st-cousin-once-removed
 * │               └── 1st-cousin-twice-removed
 * └── grandaunt/uncle
 *     └── 1st-cousin-once-removed
 *         └── 2nd-cousin
 *             └── 2nd-cousin-once-removed
 *                 └── 2nd-cousin-twice-removed
 */
export const getBinTreeDisplayLines = (
    binTree: BinTreeNode,
): (number | string)[] => {
    const oneling = '└─';
    const twoling = '├─';
    const spacer = '│';

    const lines = [];

    let level = 0;
    let value = binTree.value;
    let leftValue = binTree.leftNode.value;
    let rightValue = binTree.rightNode.value;

    while (!(leftValue === null && rightValue === null)) {
        if (level === 0) {
            lines.push(value);
        }
    }

    return lines;
};
