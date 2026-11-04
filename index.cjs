'use strict';

/**
 * Add two numbers.
 * @param {number} a
 * @param {number} b
 * @returns {number}
 * @throws {TypeError} if either argument is not a number
 */
module.exports = function add(a, b) {
  if (typeof a !== 'number' || typeof b !== 'number' || Number.isNaN(a) || Number.isNaN(b)) {
    throw new TypeError('add(a, b) requires two numeric arguments');
  }
  return a + b;
};
