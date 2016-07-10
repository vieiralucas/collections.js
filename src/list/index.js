const head = Symbol('head');
const tail = Symbol('tail');
const length = Symbol('length');

class List {
  constructor(...args) {
    this[length] = 0;
    this[head] = new ListNode();
    this[tail] = null;
    args.forEach(el => this.add(el));
  }

  get head() {
    return this[head].getValue();
  }

  get tail() {
    return this[tail];
  }

  get length() {
    return this[length];
  }

  add(el) {
    this[length]++;
    if (this[head].isEmpty()) {
      this[head] = new ListNode(el);
      return this;
    }

    if (this[tail] === null) {
      this[tail] = new List();
    }

    return this[tail].add(el);
  }

  toArray() {
    return List.toArray(this)
  }

  static toArray(list) {
    if (list.constructor.name !== 'List') {
      throw new Error('Expect parameter to be an instance of List');
    }

    let arr = [];

    while(list && !list[head].isEmpty()) {
      arr.push(list[head].getValue());
      list = list[tail];
    }

    return arr;
  }

  static fromArray(arr) {
    if (arr.constructor.name !== 'Array') {
      throw new Error('Expect parameter to be an instance of Array');
    }

    const list = new List();
    arr.forEach(a => list.add(a));
    return list;
  }
}

class ListNode {
  constructor(el = null) {
    this.el = el;
  }

  isEmpty() {
    return this.el === null;
  }

  getValue() {
    return this.el;
  }
}

export default List;
