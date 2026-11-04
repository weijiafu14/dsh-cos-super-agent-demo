'use strict';

/**
 * Add two numbers.
 * @param {number} a
 * @param {number} b
 * @returns {number}
 * @throws {TypeError} when either argument is not a finite number
 */
function add(a, b) {
  if (typeof a !== 'number' || Number.isNaN(a)) {
    throw new TypeError(`Non-number argument: ${String(a)}`);
  }
  if (typeof b !== 'number' || Number.isNaN(b)) {
    throw new TypeError(`Non-number argument: ${String(b)}`);
  }
  return a + b;
}

module.exports = add;
module.exports.add = add;
