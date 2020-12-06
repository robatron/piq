import BinTreeNode from './BinTreeNode';

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
    const listOfNodes = [];
    const listOfDepths = [];
    const searchQueue = [binTreeRoot];

    while (searchQueue.length) {
        const curNode = searchQueue.pop();
        const leftChild = curNode.getLeftChild();
        const rightChild = curNode.getRightChild();

        listOfNodes.push(curNode.value);

        if (leftChild) {
            searchQueue.unshift(leftChild);
        }

        if (rightChild) {
            searchQueue.unshift(rightChild);
        }
    }

    for (let i = 0; i < listOfNodes.length; ++i) {
        const start = Math.pow(2, i);
        const end = Math.pow(2, i + 1);
        const curDepth = listOfNodes.slice(start, end);
        if (curDepth.length) {
            listOfDepths.push(curDepth);
        }
    }

    return listOfDepths;
};
