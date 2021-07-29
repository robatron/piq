export default class GraphNode {
    label: string;
    neighbors: Set<GraphNode> = new Set();
    color: number;

    constructor(label: string) {
        this.label = label;
    }
}
