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
    const prefixChildFinal = '└── ';
    const prefixLevel = '    ';
    const prefixLevelEdge = '│   ';
    const prefixMiddleChild = '├── ';

    // Lines of the display to return
    const lines: (number | string)[] = [];

    // Stack of nodes to search, keeping track of levels and sibling
    // status. Begin with the tree root.
    const searchStack: BTSearchStackNode[] = [
        {
            BTNode: binTreeRoot,
            childType: ChildType.root,
            level: 0,
        },
    ];

    // Array to track which levels have edges or not
    const levelEdges: boolean[] = [];

    while (searchStack.length > 0) {
        // Grab the next node to process for this line
        const {
            BTNode,
            childType,
            level,
        }: BTSearchStackNode = searchStack.pop();

        // Line to build upon
        let linePrefix = '';

        // Add appropriate prefixes to the line
        if (level !== 0) {
            // Add level prefixes according to current level. Start at 1 b/c
            // the root level, 0, won't have any prefixes.
            for (let i = 1; i < level; ++i) {
                // Prefix with an edge if there's still children to display on
                // this level on a following line
                if (levelEdges[i]) {
                    linePrefix += prefixLevelEdge;
                }

                // If there are no more children to display on a following line,
                // just insert tab-like whitespace
                else {
                    linePrefix += prefixLevel;
                }
            }

            // Add a child connection prefix. If we're printing a final child,
            // remove the level edge for following lines.
            if (childType === ChildType.middleChild) {
                linePrefix += prefixMiddleChild;
            } else if (childType === ChildType.finalChild) {
                linePrefix += prefixChildFinal;
                levelEdges[level] = false;
            }
        }

        // We're finished constructing this line, so push it onto the line array
        // to return after we're finished processing all the nodes
        lines.push(linePrefix + BTNode.value);

        // Push the right node on first if there is one. The right node is
        // always the final child (so it gets an 'L' prefix when displayed)
        if (BTNode.rightNode !== null) {
            searchStack.push({
                BTNode: BTNode.rightNode,
                childType: ChildType.finalChild,
                level: level + 1,
            });
        }

        // Push the left node on if there is one. The left node is a middle
        // child if there's also a right node, or a final child if it's the
        // only one. If it's a middle child, set an edge at that level.
        if (BTNode.leftNode !== null) {
            const lvl = level + 1;
            let childType = ChildType.finalChild;

            if (BTNode.rightNode !== null) {
                levelEdges[lvl] = true;
                childType = ChildType.middleChild;
            }

            searchStack.push({
                BTNode: BTNode.leftNode,
                childType,
                level: level + 1,
            });
        }
    }

    // Return the full set of display lines
    return lines;
};
