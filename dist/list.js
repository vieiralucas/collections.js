'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var head = Symbol('head');
var tail = Symbol('tail');
var length = Symbol('length');

var List = function () {
  function List() {
    var _this = this;

    _classCallCheck(this, List);

    this[length] = 0;
    this[head] = new ListNode();
    this[tail] = null;

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    args.forEach(function (el) {
      return _this.add(el);
    });
  }

  _createClass(List, [{
    key: 'add',
    value: function add(el) {
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
  }, {
    key: 'toArray',
    value: function toArray() {
      return List.toArray(this);
    }
  }, {
    key: 'head',
    get: function get() {
      return this[head].getValue();
    }
  }, {
    key: 'tail',
    get: function get() {
      return this[tail];
    }
  }, {
    key: 'length',
    get: function get() {
      return this[length];
    }
  }], [{
    key: 'toArray',
    value: function toArray(list) {
      if (list.constructor.name !== 'List') {
        throw new Error('Expect parameter to be an instance of List');
      }

      var arr = [];

      while (list && !list[head].isEmpty()) {
        arr.push(list[head].getValue());
        list = list[tail];
      }

      return arr;
    }
  }, {
    key: 'fromArray',
    value: function fromArray(arr) {
      if (arr.constructor.name !== 'Array') {
        throw new Error('Expect parameter to be an instance of Array');
      }

      var list = new List();
      arr.forEach(function (a) {
        return list.add(a);
      });
      return list;
    }
  }]);

  return List;
}();

var ListNode = function () {
  function ListNode() {
    var el = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

    _classCallCheck(this, ListNode);

    this.el = el;
  }

  _createClass(ListNode, [{
    key: 'isEmpty',
    value: function isEmpty() {
      return this.el === null;
    }
  }, {
    key: 'getValue',
    value: function getValue() {
      return this.el;
    }
  }]);

  return ListNode;
}();

exports.default = List;