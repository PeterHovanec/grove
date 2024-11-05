import OrdinalNode from "./OrdinalNode";

class OrdinalTree {
  constructor() {
    this.root = null;
  }

  add(value, parentValue = null) {
    const newNode = new OrdinalNode(value);
    if (this.root === null) {
      this.root = newNode;
    } else {
      const parent = this.findNode(this.root, parentValue);
      if (parent) {
        parent.addChild(newNode);
      } else {
        console.error("Parent not found");
      }
    }
  }

  findNode(currentNode, value) {
    if (currentNode.value === value) {
      return currentNode;
    }

    for (const child of currentNode.children) {
      const foundNode = this.findNode(child, value);
      if (foundNode) {
        return foundNode;
      }
    }
    return null;
  }

  traverse(callback) {
    const traverseNode = (node) => {
      callback(node);
      node.children.forEach(traverseNode);
    };
    if (this.root) {
      traverseNode(this.root);
    }
  }

  remove(value) {
    const nodeToRemove = this.findNode(this.root, value);
    if (nodeToRemove && nodeToRemove.parent) {
      nodeToRemove.parent.removeChild(nodeToRemove);
    } else if (nodeToRemove === this.root) {
      this.root = null; // If the root is being removed
    }
  }

  getHeight() {
    const heightOfNode = (node) => {
      if (!node) return -1;
      const heights = node.children.map(heightOfNode);
      return 1 + Math.max(-1, ...heights);
    };
    return heightOfNode(this.root);
  }

  getAllValues() {
    const values = [];
    this.traverse((node) => values.push(node.value));
    return values;
  }

  findNodeWithCallback(callback) {
    const findNode = (node) => {
      if (callback(node)) return node;
      for (const child of node.children) {
        const foundNode = findNode(child);
        if (foundNode) return foundNode;
      }
      return null;
    };
    return findNode(this.root);
  }
}

export default OrdinalTree;
