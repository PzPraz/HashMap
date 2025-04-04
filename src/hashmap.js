class Node {
  constructor(key, value = null, next = null) {
    this.key = key;
    this.value = value;
    this.next = next;
  }
}

class HashMap {
  constructor() {
    this.bucketsArray = new Array(16).fill(null);
    this.capacity = this.bucketsArray.length;
    this.loadFactor = 0.83;
    this.occupied = 0;
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 100123456789;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }

    return hashCode % this.capacity;
  }

  set(key, value) {
    if (this.occupied / this.capacity >= this.loadFactor) this.resize();
    let index = this.hash(key);
    if (index < 0 || index >= this.bucketsArray.length) {
      throw new Error("Trying to access index out of bounds");
    }

    if (!this.has(key)) {
      const newNode = new Node(key, value);
      if (this.bucketsArray[index] === null) {
        this.occupied += 1;
        this.bucketsArray[index] = newNode;
      } else {
        let curr = this.bucketsArray[index];
        while (curr.next) curr = curr.next;
        curr.next = newNode;
      }
    } else {
      let curr = this.bucketsArray[index];
      while (curr != null && curr.key != key) {
        curr = curr.next;
      }

      if (curr != null) {
        curr.value = value;
      }
    }
  }

  get(key) {
    let index = this.hash(key);
    if (index < 0 || index >= buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }
    let curr = this.bucketsArray[index];
    while (current.key !== null && current.key != key) {
      curr = curr.next;
    }

    if (current === null) return null;

    return current.key;
  }

  has(key) {
    let index = this.hash(key);
    let curr = this.bucketsArray[index];

    while (curr) {
      if (curr.key == key) return true;
      curr = curr.next;
    }
    return false;
  }

  remove(key) {
    let index = this.hash(key);
    let curr = this.bucketsArray[index];
    let isFound = false;
    let prev = null;
    while (curr) {
      if (curr.key == key) {
        isFound = true;
        break;
      }
      prev = curr;
      curr = curr.next;
    }

    if (!isFound) return false;

    if (prev === null && curr.next == null) {
      this.occupied -= 1;
      this.bucketsArray[index] = null;
    } else if (prev === null) {
      this.bucketsArray[index] = curr.next;
    } else {
      prev.next = curr.next;
    }
  }

  length() {
    let size = 0;
    this.bucketsArray.forEach((bucket) => {
      let curr = bucket;
      while (curr) {
        size += 1;
        curr = curr.next;
      }
    });

    return size;
  }

  clear() {
    this.bucketsArray = new Array(16).fill(null);
  }

  keys() {
    let res = [];
    this.bucketsArray.forEach((bucket) => {
      let curr = bucket;
      while (curr) {
        res.push(curr.key);
        curr = curr.next;
      }
    });
    return res;
  }

  values() {
    let res = [];
    this.bucketsArray.forEach((bucket) => {
      if (bucket) {
        let curr = bucket;
        while (curr) {
          res.push(curr.value);
          curr = curr.next;
        }
      }
    });
    return res;
  }

  entries() {
    let res = [];
    this.bucketsArray.forEach((bucket) => {
      let curr = bucket;
      while (curr) {
        res.push([curr.key, curr.value]);
        curr = curr.next;
      }
    });
    return res;
  }

  resize() {
    let oldArray = this.bucketsArray;
    let newArray = this.capacity * 2;

    for (let i = 0; i < this.capacity; i++) {
      newArray[i] = oldArray[i];
    }

    this.bucketsArray = newArray;
    this.capacity *= 2;
  }
}

export { HashMap };
