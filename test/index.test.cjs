'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');

const add = require('../index.cjs');

const EXPECTED_MESSAGE = 'Both arguments must be finite numbers (reviewed)';

function assertFiniteNumberTypeError(error) {
  assert.ok(error instanceof TypeError, 'expected error to be an instance of TypeError');
  assert.equal(error.message, EXPECTED_MESSAGE);
  return true;
}

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

test('throws TypeError with the reviewed message for invalid first argument', () => {
  const invalidValues = ['2', null, undefined, NaN, Infinity, -Infinity, {}, [], true];

  for (const value of invalidValues) {
    assert.throws(() => add(value, 1), assertFiniteNumberTypeError);
  }
});

test('throws TypeError with the reviewed message for invalid second argument', () => {
  const invalidValues = ['2', null, undefined, NaN, Infinity, -Infinity, {}, [], true];

  for (const value of invalidValues) {
    assert.throws(() => add(1, value), assertFiniteNumberTypeError);
  }
});
