'use strict';

const INVALID_ARGUMENT_MESSAGE = 'Both arguments must be finite numbers (reviewed)';

/**
 * Add two finite numbers.
 * @param {number} a
 * @param {number} b
 * @returns {number}
 * @throws {TypeError} when either argument is not a finite number
 */
function add(a, b) {
  if (typeof a !== 'number' || !Number.isFinite(a)) {
    throw new TypeError(INVALID_ARGUMENT_MESSAGE);
  }
  if (typeof b !== 'number' || !Number.isFinite(b)) {
    throw new TypeError(INVALID_ARGUMENT_MESSAGE);
  }
  return a + b;
}

module.exports = add;
module.exports.add = add;
