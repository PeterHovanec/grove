const { describe, expect, test, beforeEach } = require("@jest/globals");
const { OrdinalTree, OrdinalNode } = require("../dist/grove.js");

describe("OrdinalNode", () => {
  let root;
  child1 = new OrdinalNode("child1");
  child2 = new OrdinalNode("child2");
  child3 = new OrdinalNode("child3");

  beforeEach(() => {
    root = new OrdinalNode("root");
  });

  test("should create a node with a value", () => {
      expect(root.value).toBe("root");
      expect(root.children).toEqual([]);
      expect(root.parent).toBeNull();
  });

   test("should add child nodes", () => {
       root.addChild(child1);
       root.addChild(child2);

       expect(root.children).toContain(child1);
       expect(root.children).toContain(child2);
       expect(child1.parent).toBe(root);
       expect(child2.parent).toBe(root);
   });
  
  test("should remove child nodes", () => {
      root.addChild(child1);
      root.addChild(child2);
      root.removeChild(child1);

      expect(root.children).not.toContain(child1);
      expect(root.children).toContain(child2);
      expect(child1.parent).toBeNull();
  });

  test("should get child at a specific index", () => {
      root.addChild(child1);
      root.addChild(child2);

      expect(root.getChildAt(0)).toBe(child1);
      expect(root.getChildAt(1)).toBe(child2);
  });

  test("should get the count of children", () => {
      expect(root.getChildrenCount()).toBe(0);
      root.addChild(child1);
      root.addChild(child2);
      expect(root.getChildrenCount()).toBe(2);
  });

  test("should find a child by value", () => {
      root.addChild(child1);
      root.addChild(child2);

      expect(root.findChild("child1")).toBe(child1);
      expect(root.findChild("child2")).toBe(child2);
      expect(root.findChild("child3")).toBeNull();
  });

  test("should get siblings of a child node", () => {
      root.addChild(child1);
      root.addChild(child2);
      root.addChild(child3);

      expect(child1.getSiblings()).toEqual([child2, child3]);
      expect(child2.getSiblings()).toEqual([child1, child3]);
      expect(child3.getSiblings()).toEqual([child1, child2]);
  });

  test("should return an empty array if node has no parent", () => {
      expect(root.getSiblings()).toEqual([]);
  });

})


describe('OrdinalTree', () => {
  let tree;

  beforeEach(() => {
    tree = new OrdinalTree();
  });

  test("should add nodes to the tree", () => {
      tree.add("root");
      tree.add("child1", "root");
      tree.add("child2", "root");

      expect(tree.getAllValues()).toEqual(["root", "child1", "child2"]);
  });

  test("should find nodes by value", () => {
      tree.add("root");
      tree.add("child1", "root");
      tree.add("child2", "root");

      const node = tree.findNode(tree.root, "child1");
      expect(node.value).toBe("child1");
  });

  test("should traverse the tree", () => {
      const callback = jest.fn();
      tree.add("root");
      tree.add("child1", "root");
      tree.add("child2", "root");

      tree.traverse(callback);
      expect(callback).toHaveBeenCalledTimes(3);
      expect(callback).toHaveBeenCalledWith(
          expect.objectContaining({ value: "root" })
      );
  });

  
  test("should remove nodes from the tree", () => {
      tree.add("root");
      tree.add("child1", "root");
      tree.add("child2", "root");

      tree.remove("child1");
      expect(tree.getAllValues()).toEqual(["root", "child2"]);
      tree.remove("root");
      expect(tree.getAllValues()).toEqual(["child2"]);
  });

  test("should get the height of the tree", () => {
      tree.add("root");
      tree.add("child1", "root");
      tree.add("child2", "root");
      tree.add("child3", "child1");
      tree.add("child4", "child1");

      expect(tree.getHeight()).toBe(2); // Max depth is 2 (root -> child1 -> child3 or child4)
  });

  test("should find a node with a callback", () => {
      tree.add("root");
      tree.add("child1", "root");
      tree.add("child2", "root");

      const node = tree.findNodeWithCallback((node) => node.value === "child2");
      expect(node.value).toBe("child2");
  });

  test("should return null when node is not found", () => {
      tree.add("root");
      tree.add("child1", "root");
      tree.add("child2", "root");

      const node = tree.findNode(tree.root, "nonexistent");
      expect(node).toBeNull();
  });
  
  test("should not add a node when parent is not found", () => {
      tree.add("root");
      tree.add("child1", "root");

      // Pokúšame sa pridať uzol k neexistujúcemu rodičovi
      tree.add("child2", "nonexistent");

      // Uistíme sa, že uzol "child2" neexistuje v strome
      expect(tree.getAllValues()).toEqual(["root", "child1"]);
  });

  test("should return -1 when getting the height of a null node", () => {
      // Ak strom nemá koreň, výška by mala byť -1
      const height = tree.getHeight();
      expect(height).toBe(-1);
  });

})