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

  forEach(cb) {
    let list = this;
    let i = 0;

    while(list && !list[head].isEmpty()) {
      cb(list[head].getValue(), i, this);
      list = list[tail];
      i++;
    }

    return this;
  }

  toArray() {
    return List.toArray(this)
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
