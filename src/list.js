const head = Symbol('head');
const tail = Symbol('tail');
const length = Symbol('length');

/** Class representing a List. ***/
class List {
  /**
   * Create a List.
   * @param {...any} el - Elements of the list.
   */
  constructor(...args) {
    this[length] = 0;
    this[head] = new ListNode();
    this[tail] = null;
    args.forEach(this.push.bind(this));
  }

  /**
   * Get the first element of the List.
   */
  get head() {
    return this[head].getValue();
  }

  /**
   * Get the tail of the List.
   * @returns {List} A list made with all elements but first.
   */
  get tail() {
    return this[tail];
  }

  /**
   * Get the lenght of the List.
   */
  get length() {
    return this[length];
  }

  /**
   * Add an element to the end of List.
   * @param {any} el - The element to be added.
   * @return {List} the List itself.
   */
  push(el) {
    this[length]++;

    if (this[head].isEmpty()) {
      this[head] = new ListNode(el);
      return this;
    }

    if (this[tail] === null) {
      this[tail] = new List();
    }

    return this[tail].push(el);
  }

  /**
   * @callback forEachCallback
   * @param {any} el - The current element being processed in the List.
   * @param {number} i - The index of the current element being processed in the List.
   * @param {List} list - The List that forEach() is being applied to.
   */

  /**
   * Executes a provided function once per List element.
   * @param {forEachCallback} cb - Function to execute, takes 3 arguments.
   * @return {List} the List itself.
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
   * @param {any} el - The current element being processed in the List.
   * @param {number} i - The index of the current element being processed in the List.
   * @param {List} list - The List that map() is being applied to.
   */

  /**
   * The map() method creates a new List with the results of calling a provided function on every element in this List.
   * @param {mapCallback} cb - Function to execute, takes 3 arguments.
   * @return {List} the List itself.
   */
  map(cb) {
    const newList = new List();
    this.forEach((el, i, list) => {
      newList.push(cb(el, i, list));
    });

    return newList;
  }

  /**
   * @callback filterCallback
   * @param {any} el - The current element being processed in the List.
   * @param {number} i - The index of the current element being processed in the List.
   * @param {List} list - The List that filter() is being applied to.
   */

  /**
   * The filter() method creates a new List with all elements that pass the test implemented by the provided function.
   * @param {filterCallback} cb - Function to execute, takes 3 arguments.
   * @return {List} the List itself.
   */
  filter(cb) {
    const newList = new List();
    this.forEach((el, i, list) => {
      if (cb(el, i, list)) {
        newList.push(el);
      }
    });

    return newList;
  }

  /**
   * @callback reduceCallback
   * @param {any} previousValue - The value previously returned in the last invocation of the callback, or initialValue, if first invocation.
   * @param {any} el - The current element being processed in the List.
   * @param {number} i - The index of the current element being processed in the List.
   * @param {List} list - The List that filter() is being applied to.
   */

  /**
   * The reduce() method applies a function against an accumulator and each value of the List (from left-to-right) to reduce it to a single value.
   * @param {reduceCallback} cb - Function to execute, takes 3 arguments.
   * @param {any} initialValue - Value to use as the first argument to the first call of the reduceCallback.
   * @return {List} the List itself.
   */
  reduce(cb, initialValue) {
    let reduceVal = initialValue;

    this.forEach((el, i, list) => {
      reduceVal = cb(reduceVal, el, i, list);
    });

    return reduceVal;
  }

  *[Symbol.iterator]() {
    let list = this;

    while(list && !list[head].isEmpty()) {
      yield list[head].getValue();
      list = list[tail];
    }
  }

  /**
   * Convert the List to an array
   * @returns {array}
   */
  toArray() {
    return List.toArray(this);
  }

  /**
   * Convert a List into an array
   * @param {List} list
   * @returns {array}
   */
  static toArray(list) {
    if (list.constructor.name !== 'List') {
      throw new Error('Expect parameter to be an instance of List');
    }

    let arr = [];
    list.forEach(el => arr.push(el));
    return arr;
  }

  /**
   * Convert an array into a List
   * @param {arr} arr
   * @returns {List}
   */
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
