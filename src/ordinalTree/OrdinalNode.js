class OrdinalNode {
  constructor(value) {
    this.value = value;
    this.children = [];
    this.parent = null;
  }

  addChild(childNode) {
    childNode.parent = this;
    this.children.push(childNode);
  }

  removeChild(childNode) {
    const index = this.children.indexOf(childNode);
    if (index > -1) {
      this.children.splice(index, 1);
      childNode.parent = null;
    }
  }

  getChildAt(index) {
    return this.children[index];
  }

  getChildrenCount() {
    return this.children.length;
  }

  findChild(value) {
    return this.children.find((child) => child.value === value) || null;
  }

  getSiblings() {
    if (this.parent) {
      return this.parent.children.filter((child) => child !== this);
    }
    return [];
  }

  
}

export default OrdinalNode;
