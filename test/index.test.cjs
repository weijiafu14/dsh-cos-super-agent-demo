'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');

const add = require('../index.cjs');

test('default export is add and module.exports.add is the same function', () => {
  assert.equal(typeof add, 'function');
  assert.equal(add.add, add);
  assert.equal(add.add(2, 3), 5);
});

test('adds positive numbers', () => {
  assert.equal(add(2, 3), 5);
  assert.equal(add(0, 0), 0);
  assert.equal(add(1.5, 2.25), 3.75);
});

test('adds negative numbers and mixed signs', () => {
  assert.equal(add(-2, -3), -5);
  assert.equal(add(-2, 5), 3);
  assert.equal(add(5, -8), -3);
});

test('throws TypeError for non-number arguments', () => {
  const invalidValues = ['2', null, undefined, NaN, {}, [], true];

  for (const value of invalidValues) {
    assert.throws(() => add(value, 1), TypeError);
    assert.throws(() => add(1, value), TypeError);
  }
});

test('throws TypeError for NaN in either argument', () => {
  assert.throws(() => add(NaN, 1), TypeError);
  assert.throws(() => add(1, NaN), TypeError);
  assert.throws(() => add(NaN, NaN), TypeError);
});
