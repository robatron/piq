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
    A: GraphNode = null,
    B: GraphNode = null,
    isReverseDirection = false,
): boolean => {
    const searchQueue: GraphNode[] = [A];

    // If either node is null, there is no route
    if ([A, B].some((n) => !n)) {
        return false;
    }

    // Breadth-first search from A -> B
    while (searchQueue.length) {
        const curNode = searchQueue.pop();

        if (!curNode.visited) {
            // If we find B, there is a route between A and B
            if (curNode === B) {
                return true;
            }

            // Otherwise, insert the neighbors at the beginning of the array,
            // continue the BFS
            searchQueue.unshift(...curNode.neighbors);

            curNode.visited = true;
        }
    }

    // If we didn't find a route from A -> B, recursively look for a route from
    // B -> A but set isReverseDirection so we don't
    if (!isReverseDirection) {
        return isRouteBetweenNodes(B, A, true);
    }

    // Finally, if after a full BFS both directions we don't find a route,
    // return false
    return false;
};
