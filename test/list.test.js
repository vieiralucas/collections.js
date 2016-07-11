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

  describe('.add()', function() {
    it('should increment length', function() {
      const list = new List();
      list.add(1);
      expect(list.length).to.eql(1);
    });

    it('should actually add an element to the list', function() {
      const list = new List();
      list.add(1);
      expect(list.toArray()).to.eql([1])
    });

    it('should be chainable', function() {
      const list = new List();
      list.add(1).add(2);
      expect(list.toArray()).to.eql([1, 2])
    });
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
