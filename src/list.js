const head = Symbol('head');
const last = Symbol('last');
const length = Symbol('length');

class List {
  constructor(...args) {
    this[length] = 0;
    this[head] = new ListNode();
    this[last] = this[head];

    args.forEach(this.push.bind(this));
  }

  get head() {
    return this[head].getValue();
  }

  get last() {
    return this[last].getValue();
  }

  get length() {
    return this[length];
  }

  push(el) {
    // if list is empty
    if (this[length] === 0) {
      this[head] = new ListNode(el);
      this[last] = this[head];
      this[length]++;

      return this;
    }

    // if list has 1 element
    if (this[length] === 1) {
      const newNode = new ListNode(el, this[head]);
      this[head].next = newNode;
      this[last] = newNode;
      this[length]++;

      return this;
    }

    const newNode = new ListNode(el, this[last]);
    this[last].next = newNode;
    this[last] = newNode;

    this[length]++;
    return this;
  }

  forEach(cb) {
    let i = 0;

    for (let el of this) {
      cb(el, i, this);
      i++;
    }

    return this;
  }

  map(cb) {
    const newList = new List();
    this.forEach((el, i, list) => {
      newList.push(cb(el, i, list));
    });

    return newList;
  }

  filter(cb) {
    const newList = new List();
    this.forEach((el, i, list) => {
      if (cb(el, i, list)) {
        newList.push(el);
      }
    });

    return newList;
  }

  reduce(cb, initialValue) {
    let reduceVal = initialValue;

    this.forEach((el, i, list) => {
      reduceVal = cb(reduceVal, el, i, list);
    });

    return reduceVal;
  }

  *[Symbol.iterator]() {
    let current = this[head];

    while(current !== null) {
      yield current.getValue();
      current = current.next;
    }
  }

  toArray() {
    return List.toArray(this);
  }

  static toArray(list) {
    if (list.constructor.name !== 'List') {
      throw new Error('Expect parameter to be an instance of List');
    }

    let arr = [];
    list.forEach(el => arr.push(el));
    return arr;
  }

  static fromArray(arr) {
    if (arr.constructor.name !== 'Array') {
      throw new Error('Expect parameter to be an instance of Array');
    }

    return new List(...arr);
  }
}

class ListNode {
  constructor(el = null, prev = null, next = null) {
    this.prev = prev;
    this.el = el;
    this.next = next;
  }

  isEmpty() {
    return this.el === null;
  }

  getValue() {
    return this.el;
  }
}

export default List;
