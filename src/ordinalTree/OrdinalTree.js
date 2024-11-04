

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
  
}

export default OrdinalTree;
