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
    binTreeRoot: BinTreeNode,
): (number | string)[] => {
    // Line prefixes
    const singling = '└── ';
    const multiling = '├── ';
    const levelPrefix = '│    ';

    // Lines to return
    const lines: (number | string)[] = [];

    // Stack of nodes to search (DFS, pre-order)
    const searchStack: BinTreeNode[] = [binTreeRoot];

    // Stack of levels corresponding to the search stack
    const levelStack: number[] = [0];

    while (searchStack.length > 0) {
        const curNode: BinTreeNode = searchStack.pop();
        const curLevel: number = levelStack.pop();

        let linePrefix: string = '';

        // Add appropriate prefixes to the line
        if (curLevel !== 0) {
            // Add level prefixes according to current level
            for (let i = 0; i < curLevel; ++i) {
                linePrefix += levelPrefix;
            }
        }
        lines.push(linePrefix + curNode.value);

        // Push children onto the stack if there are any
        if (curNode.rightNode !== null) {
            searchStack.push(curNode.rightNode);
            levelStack.push(curLevel + 1);
        }

        if (curNode.leftNode !== null) {
            searchStack.push(curNode.leftNode);
            levelStack.push(curLevel + 1);
        }
    }

    return lines;
};
