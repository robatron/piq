import GraphNode from './lib/GraphNode';

/*
Given an undirected graph with maximum degree D, find a graph coloring using at
most D+1 colors.

<see diagram in link>

This graph's maximum degree (D) is 3, so we have 4 colors (D+1). Here's one
possible coloring:

<see diagram in link>

Graphs are represented by an array of N node objects, each with a label, a set
of neighbors, and a color:

    class GraphNode {
        constructor(label) {
            this.label = label;
            this.neighbors = new Set();
            this.color = null;
        }
    }

    const a = new GraphNode('a');
    const b = new GraphNode('b');
    const c = new GraphNode('c');

    a.neighbors.add(b);
    b.neighbors.add(a);
    c.neighbors.add(b);
    b.neighbors.add(c);

    const graph = [a, b, c];

https://www.interviewcake.com/question/javascript/graph-coloring?course=fc1&section=trees-graphs
*/

// Return if a graph is legally colored or not
// https://www.interviewcake.com/concept/javascript/graph-coloring
export const isGraphLegallyColored = (graph: GraphNode[]): boolean => {
    for (let i = 0; i < graph.length; i++) {
        const node = graph[i];
        for (const neighbor of node.neighbors) {
            if (neighbor.color === node.color) {
                console.log(
                    `node ${node.label} is the same color as neighbor ${neighbor.label}: ${node.color}`,
                );
                return false;
            }
        }
    }
    return true;
};

// Color the given graph
// Time: O(n + m) - Have to visit every node and every edge at least once
// Space: O(d) - Maintain set of illegal colors, at most max degree of graph
const colorGraph = (graph: GraphNode[]): void => {
    // For every node, color it a color not already used by its neighbors
    graph.forEach((curNode) => {
        // If the current node is its own neighbor, it can't be legally colored
        if (curNode.neighbors.has(curNode)) {
            throw new Error(
                'Loop encountered! This graph cannot be legally colored.',
            );
        }

        // Maximum possible colors are the degrees of the node + 1
        const maxColors = curNode.neighbors.size + 1;

        // Track the colors used by the current neighbors
        const usedColors = new Set();

        curNode.neighbors.forEach((neighbor) => {
            if (neighbor.color !== undefined) {
                usedColors.add(neighbor.color);
            }
        });

        // Find the next available color not used by neighbors and assign it
        for (let color = 0; color < maxColors && !curNode.color; color++) {
            if (!usedColors.has(color)) {
                curNode.color = color;
            }
        }
    });
};

export default colorGraph;
