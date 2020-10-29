export class GraphNode<T = number> {
    value: T;
    neighbors: GraphNode[];
    visited = false;

    constructor(value: T, neighbors: GraphNode[] = []) {
        this.value = value;
        this.neighbors = neighbors;
    }
}
