export class GraphNode<T = number> {
    value: T;
    neighbors: GraphNode[];

    private unknownVisitorName = '_';
    private visitedBy = {};

    constructor(value: T, neighbors: GraphNode[] = []) {
        this.value = value;
        this.neighbors = neighbors;
    }

    setVisited(visitorID = '_'): void {
        this.visitedBy[visitorID] = true;
    }

    getVisited(visitorID = '_'): boolean {
        return this.visitedBy[visitorID] || false;
    }
}
