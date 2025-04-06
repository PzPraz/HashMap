class Node {
  constructor(value, left = null, right = null) {
    this.value = value;
    this.left = left;
    this.right = right;
  }
}

class Tree {
  constructor(arr) {
    this.root = this.buildTree(arr);
  }

  buildTree(arr) {
    let n = arr.length;

    if (n === 0) return null;

    let mid = Math.floor((n - 1) / 2);
    let root = new Node(arr[mid]);
    let q = [{ node: root, range: [0, n - 1] }];

    let frontIndex = 0;

    while (frontIndex < q.length) {
      let front = q[frontIndex];
      let curr = front.node;
      let [s, e] = front.range;
      let index = s + Math.floor((e - s) / 2); // mencari tengah

      if (s < index) {
        let midleft = s + Math.floor((index - 1 - s) / 2);
        let left = new Node(arr[midleft]);
        curr.left = left;
        q.push({ node: left, range: [s, index - 1] });
      }

      if (e > index) {
        let midRight = index + 1 + Math.floor((e - index - 1) / 2);
        let right = new Node(arr[midRight]);
        curr.right = right;
        q.push({ node: right, range: [index + 1, e] });
      }

      frontIndex++;
    }
    return root;
  }

  insert(root, value) {
    if (root === null) {
      return new Node(value);
    }

    if (root.value === value) {
      return root;
    }

    if (value < root.value) {
      root.left = this.insert(root.left, value);
    } else if (value > root.value) {
      root.right = this.insert(root.right, value);
    }

    return root;
  }

  deleteItem(root, value) {
    if (root === null) {
      return root;
    }

    if (value > root.value) {
      root.right = this.deleteItem(root.right, value);
    } else if (value < root.value) {
      root.left = this.deleteItem(root.left, value);
    } else {
      if (root.left === null) {
        return root.right;
      }

      if (root.right === null) {
        return root.left;
      }

      let succ = this.getSuccessor(root);
      root.value = succ.value;
      root.right = this.deleteItem(root.right, succ.value);
    }
    return root;
  }

  getSuccessor(curr) {
    curr = curr.right;
    while (curr && curr.left) {
      curr = curr.left;
    }
    return curr;
  }

  find(root, value) {
    if (root.value == value || root === null) {
      return root;
    } else if (root.value > value) {
      return this.find(root.right, value);
    } else {
      return this.find(root.left, value);
    }
  }

  levelOrder(callback) {
    if (this.root == null) {
      return null;
    }

    let q = [this.root];

    while (q.length > 0) {
      let curr = q.shift();

      callback(curr);

      if (curr.left) q.push(curr.left);
      if (curr.right) q.push(curr.right);
    }
  }

  inOrder(root = this.root, callback) {
    if (root === null) {
      return;
    }

    this.inOrder(root.left);
    callback(root);
    this.inOrder(root.right);
  }

  preOrder(root = this.root, callback) {
    if (!root) return;

    callback(root);
    this.preOrder(root.left, callback);
    this.preOrder(root.right, callback);
  }

  postOrder(root = this.root, callback) {
    if (!root) return;

    this.preOrder(root.left, callback);
    this.preOrder(root.right, callback);
  }

  height(root = this.root) {
    if (root === null) {
      return -1;
    }

    const leftHeight = this.height(root.left);
    const rightHeight = this.height(root.right);

    return Math.max(leftHeight, rightHeight) + 1;
  }

  depth(root = this.root, value) {
    if (root == null) {
      return null;
    }
    let depth = 0;
    let q = [this.root];

    while (q.length > 0) {
      let n = q.length;
      depth += 1;
      for (let i = 0; i < n; i++) {
        let curr = q.shift();

        if (curr.value == value) return depth;
        if (curr.left) q.push(curr.left);
        if (curr.right) q.push(curr.right);
      }
    }

    return null;
  }

  isBalanced() {
    if (this.root === null) return false;

    if (!this.root.left && this.root.right) return false;
    if (!this.root.right && this.root.left) return false;

    let leftHeight = this.height(this.root.left);
    let rightHeight = this.height(this.root.right);

    if (leftHeight != rightHeight) return false;

    return true;
  }

  rebalance() {
    if (this.root == null) {
      return null;
    }

    let q = [this.root];
    let newArr = [];
    while (q.length > 0) {
      let curr = q.shift();

      newArr.push(curr.value);
      if (curr.left) q.push(curr.left);
      if (curr.right) q.push(curr.right);
    }

    this.root = this.buildTree(newArr);
  }
}

export { Tree };
