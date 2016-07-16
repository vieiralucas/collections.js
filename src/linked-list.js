const head = Symbol('head');
const last = Symbol('last');
const length = Symbol('length');

/** Class representing a LinkedList. ***/
class LinkedList {
  /**
   * Create a LinkedList.
   * @param {...any} el - Elements of the linkedList.
   */
  constructor(...args) {
    this[length] = 0;
    this[head] = new LinkedListNode();
    this[last] = this[head];

    args.forEach(this.push.bind(this));
  }

  /**
   * Get the first element of the LinkedList.
   */
  get head() {
    return this[head].getValue();
  }

  /**
   * Get the last element of the LinkedList.
   */
  get last() {
    return this[last].getValue();
  }

  /**
   * Get the lenght of the LinkedList.
   */
  get length() {
    return this[length];
  }

  /**
   * Add an element to the end of LinkedList.
   * @param {any} el - The element to be added.
   * @return {LinkedList} the LinkedList itself.
   */
  push(el) {
    // if linkedList is empty
    if (this[length] === 0) {
      this[head] = new LinkedListNode(el);
      this[last] = this[head];
      this[length]++;

      return this;
    }

    // if linkedList has 1 element
    if (this[length] === 1) {
      const newNode = new LinkedListNode(el, this[head]);
      this[head].next = newNode;
      this[last] = newNode;
      this[length]++;

      return this;
    }

    const newNode = new LinkedListNode(el, this[last]);
    this[last].next = newNode;
    this[last] = newNode;

    this[length]++;
    return this;
  }

  /**
   * @callback forEachCallback
   * @param {any} el - The current element being processed in the LinkedList.
   * @param {number} i - The index of the current element being processed in the LinkedList.
   * @param {LinkedList} linkedList - The LinkedList that forEach() is being applied to.
   */

  /**
   * Executes a provided function once per LinkedList element.
   * @param {forEachCallback} cb - Function to execute, takes 3 arguments.
   * @return {LinkedList} the LinkedList itself.
   */
  forEach(cb) {
    let i = 0;

    for (let el of this) {
      cb(el, i, this);
      i++;
    }

    return this;
  }

  /**
   * @callback mapCallback
   * @param {any} el - The current element being processed in the LinkedList.
   * @param {number} i - The index of the current element being processed in the LinkedList.
   * @param {LinkedList} linkedList - The LinkedList that map() is being applied to.
   */

  /**
   * The map() method creates a new LinkedList with the results of calling a provided function on every element in this LinkedList.
   * @param {mapCallback} cb - Function to execute, takes 3 arguments.
   * @return {LinkedList} the LinkedList itself.
   */
  map(cb) {
    const newLinkedList = new LinkedList();
    this.forEach((el, i, linkedList) => {
      newLinkedList.push(cb(el, i, linkedList));
    });

    return newLinkedList;
  }

  /**
   * @callback filterCallback
   * @param {any} el - The current element being processed in the LinkedList.
   * @param {number} i - The index of the current element being processed in the LinkedList.
   * @param {LinkedList} linkedList - The LinkedList that filter() is being applied to.
   */

  /**
   * The filter() method creates a new LinkedList with all elements that pass the test implemented by the provided function.
   * @param {filterCallback} cb - Function to execute, takes 3 arguments.
   * @return {LinkedList} the LinkedList itself.
   */
  filter(cb) {
    const newLinkedList = new LinkedList();
    this.forEach((el, i, linkedList) => {
      if (cb(el, i, linkedList)) {
        newLinkedList.push(el);
      }
    });

    return newLinkedList;
  }

  /**
   * @callback reduceCallback
   * @param {any} previousValue - The value previously returned in the last invocation of the callback, or initialValue, if first invocation.
   * @param {any} el - The current element being processed in the LinkedList.
   * @param {number} i - The index of the current element being processed in the LinkedList.
   * @param {LinkedList} linkedList - The LinkedList that filter() is being applied to.
   */

  /**
   * The reduce() method applies a function against an accumulator and each value of the LinkedList (from left-to-right) to reduce it to a single value.
   * @param {reduceCallback} cb - Function to execute, takes 3 arguments.
   * @param {any} initialValue - Value to use as the first argument to the first call of the reduceCallback.
   * @return {LinkedList} the LinkedList itself.
   */
  reduce(cb, initialValue) {
    let reduceVal = initialValue;

    this.forEach((el, i, linkedList) => {
      reduceVal = cb(reduceVal, el, i, linkedList);
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

  /**
   * Convert the LinkedList to an array
   * @returns {array}
   */
  toArray() {
    return LinkedList.toArray(this);
  }

  /**
   * Convert a LinkedList into an array
   * @param {LinkedList} linkedList
   * @returns {array}
   */
  static toArray(linkedList) {
    if (linkedList.constructor.name !== 'LinkedList') {
      throw new Error('Expect parameter to be an instance of LinkedList');
    }

    let arr = [];
    linkedList.forEach(el => arr.push(el));
    return arr;
  }

  /**
   * Convert an array into a LinkedList
   * @param {arr} arr
   * @returns {LinkedList}
   */
  static fromArray(arr) {
    if (arr.constructor.name !== 'Array') {
      throw new Error('Expect parameter to be an instance of Array');
    }

    return new LinkedList(...arr);
  }
}

class LinkedListNode {
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

export default LinkedList;
