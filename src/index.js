import { HashMap } from "./hashmap";
import { Tree } from "./tree";

const test = new HashMap();
const pohon = new Tree([1, 2, 3, 4, 5, 6, 7]);

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

pohon.insert(pohon.root, 9);
pohon.insert(pohon.root, 13);
pohon.insert(pohon.root, 8);
pohon.deleteItem(pohon.root, 4);
prettyPrint(pohon.root);

test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");
test.set("moon", "silver");

console.log(test.entries());
console.log(test.keys());
console.log(test.values());
console.log(test.length());
console.log(test.has("grape"));
console.log(test.remove("grape"));
console.log(test.entries());
