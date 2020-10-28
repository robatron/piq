import { GraphNode } from './GraphNode';

/**
 * 4.1 - Route between nodes
 *
 * Given a directed graph, design an algorithm to find out whether there is a
 * route between two nodes.
 *
 * @param A First node
 * @param B Second node
 */
export const isRouteBetweenNodes = (
    A: GraphNode,
    B: GraphNode,
    isReverseDirection = false,
): boolean => {
    const searchQueue: GraphNode[] = [A];

    // Breadth-first search from A -> B
    while (searchQueue.length) {
        const curNode = searchQueue.pop();

        if (!curNode.visited) {
            // If we find B, there is a route between A and B
            if (curNode === B) {
                return true;
            }

            // Otherwise, continue the BFS
            searchQueue.unshift.apply(curNode.neighbors);

            curNode.visited = true;
        }
    }

    // If we didn't find a route from A -> B, look for a route from B -> A
    if (!isReverseDirection) {
        return isRouteBetweenNodes(B, A, true);
    }
    false;
};
