import BinTreeNode, { ChildType } from './BinTreeNode';

enum SiblingType {
    final,
    middle,
}

class BTSearchStackNode {
    BTNode: BinTreeNode;
    siblingType: SiblingType;
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
    showLeftRightLabel = false,
): (number | string)[] => {
    // Line prefixes
    const prefixChildFinal = '└──';
    const prefixLabelLeft = '[L] ';
    const prefixLabelRight = '[R] ';
    const prefixLevel = '    ';
    const prefixLevelEdge = '│   ';
    const prefixMiddleChild = '├──';

    // Lines of the display to return
    const lines: (number | string)[] = [];

    // Stack of nodes to search, keeping track of levels and sibling
    // status. Begin with the tree root.
    const searchStack: BTSearchStackNode[] = [
        {
            BTNode: binTreeRoot,
            siblingType: null,
            level: 0,
        },
    ];

    // Array to track which levels have edges or not
    const levelEdges: boolean[] = [];

    while (searchStack.length > 0) {
        // Grab the next node to process for this line
        const {
            BTNode,
            siblingType,
            level,
        }: BTSearchStackNode = searchStack.pop();
        const leftChild = BTNode.getLeftChild();
        const rightChild = BTNode.getRightChild();

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
            if (siblingType === SiblingType.middle) {
                linePrefix += prefixMiddleChild;
            } else if (siblingType === SiblingType.final) {
                linePrefix += prefixChildFinal;
                levelEdges[level] = false;
            }

            // Add a left (L) or a right (R) label to show what kind of a child
            // this is
            if (showLeftRightLabel) {
                if (BTNode.childType === ChildType.left) {
                    linePrefix += prefixLabelLeft;
                }
                if (BTNode.childType === ChildType.right) {
                    linePrefix += prefixLabelRight;
                }
            } else {
                linePrefix += ' ';
            }
        }

        // We're finished constructing this line, so push it onto the line array
        // to return after we're finished processing all the nodes
        lines.push(linePrefix + BTNode.value);

        // Push the right node on first if there is one. The right node is
        // always the final child (so it gets an 'L' prefix when displayed)
        if (rightChild) {
            searchStack.push({
                BTNode: rightChild,
                siblingType: SiblingType.final,
                level: level + 1,
            });
        }

        // Push the left node on if there is one. The left node is a middle
        // child if there's also a right node, or a final child if it's the
        // only one. If it's a middle child, set an edge at that level.
        if (leftChild) {
            const lvl = level + 1;
            let siblingType = SiblingType.final;

            if (rightChild) {
                levelEdges[lvl] = true;
                siblingType = SiblingType.middle;
            }

            searchStack.push({
                BTNode: leftChild,
                siblingType,
                level: level + 1,
            });
        }
    }

    // Return the full set of display lines
    return lines;
};
