import BinTreeNode from './BinTreeNode';

interface BFSearchItem {
    level: number;
    node: BinTreeNode;
}

/**
 * 4.3 - List of Depths
 *
 * Given a binary tree, design an algorithm which creates a linked list of all
 * the nodes at each depth (e.g., if you have a tree with depth D, you'll have
 * D linked lists).
 *
 * Modification: Return a list of lists instead for simplicity. First dimension
 * represents the level, the list at that level are all the values of nodes on
 * that level.
 */
export const listOfDepths = (
    binTreeRoot: BinTreeNode,
): Array<Array<number>> => {
    const listOfDepths = [];
    const searchQueue: BFSearchItem[] = [
        {
            level: 0,
            node: binTreeRoot,
        },
    ];

    while (searchQueue.length) {
        const { level, node } = searchQueue.pop();
        const leftChild = node.getLeftChild();
        const rightChild = node.getRightChild();

        listOfDepths[level] = listOfDepths[level] || [];
        listOfDepths[level].push(node.value);

        if (leftChild) {
            searchQueue.unshift({
                level: level + 1,
                node: leftChild,
            });
        }

        if (rightChild) {
            searchQueue.unshift({
                level: level + 1,
                node: rightChild,
            });
        }
    }

    return listOfDepths;
};
