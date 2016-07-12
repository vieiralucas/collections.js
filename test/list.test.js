import { List } from '../src';
import { expect } from 'chai';
import sinon from 'sinon';

describe('List', function() {
  describe('List.toArray()', function() {
    it('should make an array from a list', function() {
      const list = new List(1, 2, 3, 4);
      expect(List.toArray(list)).to.be.eql([1, 2, 3, 4]);
    });

    it('should throw if no List is passed', function() {
      const willThrow = () => {
        List.toArray(new Array());
      };

      expect(willThrow).to.throw(Error);
    });
  });

  describe('List.fromArray()', function() {
    it('should make a list from an array', function() {
      const arr = [1, 2, 3, 4];
      expect(List.fromArray(arr)).to.be.eql(new List(1, 2, 3, 4));
    });

    it('should throw if no Array is passed', function() {
      const willThrow = () => {
        List.toArray(new Function());
      };

      expect(willThrow).to.throw(Error);
    });
  });

  describe('.constructor', function() {
    it('should make a list from received args', function() {
      const list = new List(1, 2, 3, 4);
      const arr = list.toArray();
      expect(list.toArray()).to.eql([1, 2, 3, 4]);
    });
  });

  describe('.length', function() {
    it('should exist', function() {
      const list = new List();
      expect(list).to.have.property('length');
    });

    it('should start with 0', function() {
      const list = new List().length;
      expect(list).to.eql(0);
    });
  });

  describe('.head', function() {
    it('should be null if list is empty', function() {
      const list = new List();
      expect(list.head).to.be.null;
    });

    it('should be the first element of list', function() {
      const list = new List(1);
      expect(list.head).to.eql(1);
    });
  });

  describe('.tail', function() {
    it('should be null if list is empty', function() {
      const list = new List();
      expect(list.tail).to.be.null;
    });

    it('should be null if list has a single element', function() {
      const list = new List(1);
      expect(list.tail).to.be.null;
    });

    it('should be a list without the head', function() {
      const list = new List(1, 2);
      const tail = list.tail;
      expect(tail).to.eql(new List(2));
    });
  });

  describe('.push()', function() {
    it('should increment length', function() {
      const list = new List();
      list.push(1);
      expect(list.length).to.eql(1);
    });

    it('should actually push an element to the list', function() {
      const list = new List();
      list.push(1);
      expect(list.toArray()).to.eql([1])
    });

    it('should be chainable', function() {
      const list = new List();
      list.push(1).push(2);
      expect(list.toArray()).to.eql([1, 2])
    });
  });

  describe('.forEach()', function() {
    it('should call fn for each element', function() {
      const iterFn = sinon.spy();
      const list = new List(1, 2);
      list.forEach(iterFn);
      sinon.assert.calledTwice(iterFn);
    });

    it('should call fn with (el, index, list)', function() {
      const iterFn = sinon.spy();
      const list = new List(1, 2);
      list.forEach(iterFn);
      expect(iterFn.getCall(0).args).to.be.eql([1, 0, list]);
      expect(iterFn.getCall(1).args).to.be.eql([2, 1, list]);
    });

    it('should return the list', function() {
      const iterFn = sinon.spy();
      const list = new List(1, 2);
      const forEachReturnVal = list.forEach(iterFn);
      expect(forEachReturnVal).to.be.eql(list);
    });
  });

  describe('.map()', function() {
    it('should call fn for each element', function() {
      const iterFn = sinon.spy();
      const list = new List(1, 2);
      list.map(iterFn);
      sinon.assert.calledTwice(iterFn);
    });

    it('should call fn with (el, index, list)', function() {
      const iterFn = sinon.spy();
      const list = new List(1, 2);
      list.map(iterFn);
      expect(iterFn.getCall(0).args).to.be.eql([1, 0, list]);
      expect(iterFn.getCall(1).args).to.be.eql([2, 1, list]);
    });

    it('should return a list with the return of each cb', function() {
      const doubleFn = el => el * 2;
      const list = new List(1, 2);
      const doubleList = list.map(doubleFn);
      expect(doubleList).to.be.eql(new List(2, 4));
    });
  });

  describe('.filter()', function() {
    it('should call fn for each element', function() {
      const iterFn = sinon.spy();
      const list = new List(1, 2);
      list.filter(iterFn);
      sinon.assert.calledTwice(iterFn);
    });

    it('should call fn with (el, index, list)', function() {
      const iterFn = sinon.spy();
      const list = new List(1, 2);
      list.filter(iterFn);
      expect(iterFn.getCall(0).args).to.be.eql([1, 0, list]);
      expect(iterFn.getCall(1).args).to.be.eql([2, 1, list]);
    });

    it('should return new list without filtered values', function() {
      const isOdd = el => el % 2 !== 0;
      const list = new List(1, 2);
      const even = list.filter(isOdd);
      expect(even).to.be.eql(new List(2));
    });
  });

  describe('.reduce()', function() {
    it('should call fn for each element', function() {
      const iterFn = sinon.spy();
      const list = new List(1, 2);
      list.reduce(iterFn, 0);
      sinon.assert.calledTwice(iterFn);
    });

    it('should call fn with (currVal, el, index, list)', function() {
      const iterFn = sinon.stub().returns(0);
      const list = new List(1, 2);
      list.reduce(iterFn, 0);
      expect(iterFn.getCall(0).args).to.be.eql([0, 1, 0, list]);
      expect(iterFn.getCall(1).args).to.be.eql([0, 2, 1, list]);
    });

    it('should reduce the list to a value', function() {
      const sum = (t, el) => el + t;
      const list = new List(1, 2);
      const total = list.reduce(sum, 0);
      expect(total).to.be.eql(3);
    });
  });

  it('should be iterable', function() {
    const list = new List(1, 2, 3, 4);
    const arr = [];
    for (let l of list) {
      arr.push(l);
    }

    expect(arr).to.be.eql([1, 2, 3, 4]);
  });

  describe('.toArray()', function() {
    it('should call List.toArray passing itself', function() {
      const spy = sinon.spy(List, 'toArray');
      const list =  new List();
      list.toArray();
      sinon.assert.calledWith(spy, list);
    });
  });
});
