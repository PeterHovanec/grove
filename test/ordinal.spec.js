

import { OrdinalTree, OrdinalNode } from "../src/ordinalTree/index";

describe("OrdinalTree", () => {
  let tree;

  beforeEach(() => {
    tree = new OrdinalTree(); 
  });

  it("should create a tree with a root node", () => {
    tree.add("Root");
    expect(tree.root.value).toBe("Root");
    expect(tree.root.children.length).toBe(0);
  });

  it("should add children to the root node", () => {
    tree.add("Root");
    tree.add("Child 1", "Root");
    tree.add("Child 2", "Root");
      
    expect(tree.root.children.length).toBe(2);
    expect(tree.root.children[0].value).toBe("Child 1"); 
    expect(tree.root.children[1].value).toBe("Child 2"); 
  });

  

  it("should retrieve a child at a specific index", () => {
    tree.add("Root");
    tree.add("Child 1", "Root");
    tree.add("Child 2", "Root");

    const childAtIndex = tree.root.getChildAt(1); 
    expect(childAtIndex.value).toBe("Child 2"); 
  });

  it("should add grandchildren to a child node", () => {
    tree.add("Root");
    tree.add("Child 1", "Root");
    tree.add("Grandchild 1", "Child 1");

    const child1 = tree.root.children[0];
    expect(child1.children.length).toBe(1);
    expect(child1.children[0].value).toBe("Grandchild 1");
  });

  it("should find an existing node by value", () => {
    tree.add("Root");
    tree.add("Child 1", "Root");
    tree.add("Child 2", "Root");

    const foundNode = tree.findNode(tree.root, "Child 1");
    expect(foundNode).toBeTruthy();
    expect(foundNode.value).toBe("Child 1");
  });

  it("should return null for a non-existing node", () => {
    tree.add("Root");
    expect(tree.findNode(tree.root, "Non-existing")).toBeNull();
  });

  it("should traverse the tree and execute a callback on each node", () => {
    const values = [];
    tree.add("Root");
    tree.add("Child 1", "Root");
    tree.add("Child 2", "Root");

    tree.traverse((node) => values.push(node.value));

    expect(values).toEqual(["Root", "Child 1", "Child 2"]); 
  });

  it("should remove a child node", () => {
    tree.add("Root");
    tree.add("Child 1", "Root");
    tree.add("Child 2", "Root");

    const child1 = tree.root.children[0];
    expect(tree.root.children.length).toBe(2);

    tree.root.removeChild(child1);
    expect(tree.root.children.length).toBe(1);
    expect(tree.root.children[0].value).toBe("Child 2"); 
  });
});
describe("OrdinalNode", () => {
  let node;

  beforeEach(() => {
    node = new OrdinalNode("Test Node"); 
  });

  it("should initialize a node with the correct value", () => {
    expect(node.value).toBe("Test Node");
    expect(node.children.length).toBe(0);
    expect(node.parent).toBeNull();
  });

  it("should add a child node", () => {
    const childNode = new OrdinalNode("Child Node");
    node.addChild(childNode);

    expect(node.children.length).toBe(1);
    expect(node.children[0].value).toBe("Child Node");
    expect(childNode.parent).toBe(node);
  });

  it("should remove a child node", () => {
    const childNode = new OrdinalNode("Child Node");
    node.addChild(childNode);

    expect(node.children.length).toBe(1);
    node.removeChild(childNode);
    expect(node.children.length).toBe(0);
    expect(childNode.parent).toBeNull();
  });
});
