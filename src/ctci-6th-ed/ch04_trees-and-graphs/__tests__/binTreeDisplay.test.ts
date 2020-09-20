import BinTreeNode from '../BinTreeNode';
import { getBinTreeDisplayLines } from '../binTreeDisplay';

// Test binary tree matching the first problem example
const testBinTree = new BinTreeNode(
    1,
    new BinTreeNode(2, new BinTreeNode(4), new BinTreeNode(5)),
    new BinTreeNode(
        3,
        new BinTreeNode(9),
        new BinTreeNode(8, new BinTreeNode(6), new BinTreeNode(7)),
    ),
);

describe('getBinTreeDisplayLines', () => {
    it('returns the lines of an ASCII representation of a binary tree', () => {});
});
