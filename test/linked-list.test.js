import { LinkedList } from '../src';
import { expect } from 'chai';
import sinon from 'sinon';

describe('LinkedList', function() {
  describe('LinkedList.toArray()', function() {
    it('should make an array from a linkedList', function() {
      const linkedList = new LinkedList(1, 2, 3, 4);
      expect(LinkedList.toArray(linkedList)).to.be.eql([1, 2, 3, 4]);
    });

    it('should throw if no LinkedList is passed', function() {
      const willThrow = () => {
        LinkedList.toArray(new Array());
      };

      expect(willThrow).to.throw(Error);
    });
  });

  describe('LinkedList.fromArray()', function() {
    it('should make a linkedList from an array', function() {
      const arr = [1, 2, 3, 4];
      expect(LinkedList.fromArray(arr)).to.be.eql(new LinkedList(1, 2, 3, 4));
    });

    it('should throw if no Array is passed', function() {
      const willThrow = () => {
        LinkedList.toArray(new Function());
      };

      expect(willThrow).to.throw(Error);
    });
  });

  describe('.constructor', function() {
    it('should make a linkedList from received args', function() {
      const linkedList = new LinkedList(1, 2, 3, 4);
      const arr = linkedList.toArray();
      expect(linkedList.toArray()).to.eql([1, 2, 3, 4]);
    });
  });

  describe('.length', function() {
    it('should exist', function() {
      const linkedList = new LinkedList();
      expect(linkedList).to.have.property('length');
    });

    it('should start with 0', function() {
      const linkedList = new LinkedList().length;
      expect(linkedList).to.eql(0);
    });
  });

  describe('.head', function() {
    it('should be null if linkedList is empty', function() {
      const linkedList = new LinkedList();
      expect(linkedList.head).to.be.null;
    });

    it('should be the first element of linkedList', function() {
      const linkedList = new LinkedList(1);
      expect(linkedList.head).to.eql(1);
    });
  });

  describe('.last', function() {
    it('should be null if linkedList is empty', function() {
      const linkedList = new LinkedList();
      expect(linkedList.last).to.be.null;
    });

    it('should be equal to head if linkedList has a single element', function() {
      const linkedList = new LinkedList(1);
      expect(linkedList.last).to.be.eql(linkedList.head);
    });

    it('should be the last element from linkedList', function() {
      const linkedList = new LinkedList(1, 2);
      const last = linkedList.last;
      expect(last).to.be.eql(2);
    });
  });

  describe('.push()', function() {
    it('should increment length', function() {
      const linkedList = new LinkedList();
      linkedList.push(1);
      expect(linkedList.length).to.eql(1);
    });

    it('should actually push an element to the linkedList', function() {
      const linkedList = new LinkedList();
      linkedList.push(1);
      expect(linkedList.toArray()).to.eql([1])
    });

    it('should be chainable', function() {
      const linkedList = new LinkedList();
      linkedList.push(1).push(2);
      expect(linkedList.toArray()).to.eql([1, 2])
    });
  });

  describe('.forEach()', function() {
    it('should call fn for each element', function() {
      const iterFn = sinon.spy();
      const linkedList = new LinkedList(1, 2);
      linkedList.forEach(iterFn);
      sinon.assert.calledTwice(iterFn);
    });

    it('should call fn with (el, index, linkedList)', function() {
      const iterFn = sinon.spy();
      const linkedList = new LinkedList(1, 2);
      linkedList.forEach(iterFn);
      expect(iterFn.getCall(0).args).to.be.eql([1, 0, linkedList]);
      expect(iterFn.getCall(1).args).to.be.eql([2, 1, linkedList]);
    });

    it('should return the linkedList', function() {
      const iterFn = sinon.spy();
      const linkedList = new LinkedList(1, 2);
      const forEachReturnVal = linkedList.forEach(iterFn);
      expect(forEachReturnVal).to.be.eql(linkedList);
    });
  });

  describe('.map()', function() {
    it('should call fn for each element', function() {
      const iterFn = sinon.spy();
      const linkedList = new LinkedList(1, 2);
      linkedList.map(iterFn);
      sinon.assert.calledTwice(iterFn);
    });

    it('should call fn with (el, index, linkedList)', function() {
      const iterFn = sinon.spy();
      const linkedList = new LinkedList(1, 2);
      linkedList.map(iterFn);
      expect(iterFn.getCall(0).args).to.be.eql([1, 0, linkedList]);
      expect(iterFn.getCall(1).args).to.be.eql([2, 1, linkedList]);
    });

    it('should return a linkedList with the return of each cb', function() {
      const doubleFn = el => el * 2;
      const linkedList = new LinkedList(1, 2);
      const doubleLinkedList = linkedList.map(doubleFn);
      expect(doubleLinkedList).to.be.eql(new LinkedList(2, 4));
    });
  });

  describe('.filter()', function() {
    it('should call fn for each element', function() {
      const iterFn = sinon.spy();
      const linkedList = new LinkedList(1, 2);
      linkedList.filter(iterFn);
      sinon.assert.calledTwice(iterFn);
    });

    it('should call fn with (el, index, linkedList)', function() {
      const iterFn = sinon.spy();
      const linkedList = new LinkedList(1, 2);
      linkedList.filter(iterFn);
      expect(iterFn.getCall(0).args).to.be.eql([1, 0, linkedList]);
      expect(iterFn.getCall(1).args).to.be.eql([2, 1, linkedList]);
    });

    it('should return new linkedList without filtered values', function() {
      const isOdd = el => el % 2 !== 0;
      const linkedList = new LinkedList(1, 2);
      const even = linkedList.filter(isOdd);
      expect(even).to.be.eql(new LinkedList(2));
    });
  });

  describe('.reduce()', function() {
    it('should call fn for each element', function() {
      const iterFn = sinon.spy();
      const linkedList = new LinkedList(1, 2);
      linkedList.reduce(iterFn, 0);
      sinon.assert.calledTwice(iterFn);
    });

    it('should call fn with (currVal, el, index, linkedList)', function() {
      const iterFn = sinon.stub().returns(0);
      const linkedList = new LinkedList(1, 2);
      linkedList.reduce(iterFn, 0);
      expect(iterFn.getCall(0).args).to.be.eql([0, 1, 0, linkedList]);
      expect(iterFn.getCall(1).args).to.be.eql([0, 2, 1, linkedList]);
    });

    it('should reduce the linkedList to a value', function() {
      const sum = (t, el) => el + t;
      const linkedList = new LinkedList(1, 2);
      const total = linkedList.reduce(sum, 0);
      expect(total).to.be.eql(3);
    });
  });

  it('should be iterable', function() {
    const linkedList = new LinkedList(1, 2, 3, 4);
    const arr = [];
    for (let l of linkedList) {
      arr.push(l);
    }

    expect(arr).to.be.eql([1, 2, 3, 4]);
  });

  describe('.toArray()', function() {
    it('should call LinkedList.toArray passing itself', function() {
      const spy = sinon.spy(LinkedList, 'toArray');
      const linkedList =  new LinkedList();
      linkedList.toArray();
      sinon.assert.calledWith(spy, linkedList);
    });
  });
});
