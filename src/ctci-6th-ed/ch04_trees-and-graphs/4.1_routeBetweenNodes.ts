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
): boolean => {
    const searchQueueA: GraphNode[] = [A];
    const searchQueueB: GraphNode[] = [B];

    // If either node is null, there is no route
    if ([A, B].some((n) => !n)) {
        return false;
    }

    // Breadth-first search from A -> B and from B -> A simultaneously
    while (searchQueueA.length || searchQueueB.length) {
        const curNodeA = searchQueueA.pop();
        const curNodeB = searchQueueB.pop();

        // If we find B, there is a route between A and B. Otherwise, insert
        // the neighbors at the beginning of the array and continue the BFS.
        if (curNodeA && !curNodeA.visited) {
            if (curNodeA === B) {
                return true;
            }
            searchQueueA.unshift(...curNodeA.neighbors);
            curNodeA.visited = true;
        }

        // Same thing, but for B
        if (curNodeB && !curNodeB.visited) {
            if (curNodeB === A) {
                return true;
            }
            searchQueueA.unshift(...curNodeA.neighbors);
            curNodeA.visited = true;
        }
    }

    // Finally, if after a full BFS we don't find a route, we'll never find one
    return false;
};
