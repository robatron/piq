import BinTreeNode from './BinTreeNode';

enum ChildType {
    finalChild,
    middleChild,
    root,
}

class BTSearchStackNode {
    BTNode: BinTreeNode;
    childType: ChildType;
    level: number;
}

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
    const finalChild = '└── ';
    const middleChild = '├── ';
    const levelPrefix = '│    ';

    // Lines to return
    const lines: (number | string)[] = [];

    // Stack of nodes to search (DFS, pre-order)
    const searchStack: BTSearchStackNode[] = [
        {
            BTNode: binTreeRoot,
            childType: ChildType.root,
            level: 0,
        },
    ];

    while (searchStack.length > 0) {
        const {
            BTNode,
            childType,
            level,
        }: BTSearchStackNode = searchStack.pop();

        let linePrefix: string = '';

        // Add appropriate prefixes to the line
        if (level !== 0) {
            // Add level prefixes according to current level
            for (let i = 0; i < level; ++i) {
                linePrefix += levelPrefix;
            }

            // Add connection prefix
            if (childType === ChildType.finalChild) {
                linePrefix += finalChild;
            }
        }
        lines.push(linePrefix + BTNode.value);

        // Push children onto the stack if there are any
        if (BTNode.rightNode !== null) {
            searchStack.push({
                BTNode: BTNode.rightNode,
                childType: ChildType.finalChild,
                level: level + 1,
            });
        }

        if (BTNode.leftNode !== null) {
            searchStack.push({
                BTNode: BTNode.leftNode,
                childType: ChildType.finalChild,
                level: level + 1,
            });
        }
    }

    return lines;
};
