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

  // Tests for new functions

  it("should remove a node from the tree", () => {
    tree.add("Root");
    tree.add("Child 1", "Root");
    tree.add("Child 2", "Root");

    expect(tree.root.children.length).toBe(2);
    tree.remove("Child 1");
    expect(tree.root.children.length).toBe(1);
    expect(tree.root.children[0].value).toBe("Child 2");
  });

  it("should set root to null if the root is removed", () => {
    tree.add("Root");
    expect(tree.root.value).toBe("Root");
    tree.remove("Root");
    expect(tree.root).toBeNull();
  });

  it("should get the height of the tree", () => {
    tree.add("Root");
    tree.add("Child 1", "Root");
    tree.add("Child 2", "Root");
    tree.add("Grandchild 1", "Child 1");

    expect(tree.getHeight()).toBe(2); // Height should be 2
  });

  it("should get all values in the tree", () => {
    tree.add("Root");
    tree.add("Child 1", "Root");
    tree.add("Child 2", "Root");

    const allValues = tree.getAllValues();
    expect(allValues).toEqual(["Root", "Child 1", "Child 2"]);
  });

  it("should find a node with a callback", () => {
    tree.add("Root");
    tree.add("Child 1", "Root");
    tree.add("Child 2", "Root");

    const foundNode = tree.findNodeWithCallback(
      (node) => node.value === "Child 1"
    );
    expect(foundNode).toBeTruthy();
    expect(foundNode.value).toBe("Child 1");
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

  it("should get the number of children", () => {
    const childNode1 = new OrdinalNode("Child 1");
    const childNode2 = new OrdinalNode("Child 2");
    node.addChild(childNode1);
    node.addChild(childNode2);

    expect(node.getChildrenCount()).toBe(2);
  });

  it("should find a child by value", () => {
    const childNode = new OrdinalNode("Child Node");
    node.addChild(childNode);

    const foundChild = node.findChild("Child Node");
    expect(foundChild).toBe(childNode);
  });

  it("should return null when child is not found", () => {
    const childNode = new OrdinalNode("Child Node");
    node.addChild(childNode);

    const foundChild = node.findChild("Non-existing Child");
    expect(foundChild).toBeNull();
  });

  it("should get siblings", () => {
    const siblingNode1 = new OrdinalNode("Sibling 1");
    const siblingNode2 = new OrdinalNode("Sibling 2");
    const childNode = new OrdinalNode("Child");

    node.addChild(siblingNode1);
    node.addChild(childNode);
    node.addChild(siblingNode2);

    const siblings = childNode.getSiblings();
    expect(siblings.length).toBe(2);
    expect(siblings).toContain(siblingNode1);
    expect(siblings).toContain(siblingNode2);
  });

  
});
