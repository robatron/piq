// A tree node
export default class TreeNode {
    value: number;
    children: TreeNode[];

    constructor(value: number, children: TreeNode[] = null) {
        this.value = value;
        this.children = children;
    }
}
