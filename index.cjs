'use strict';

const INVALID_MESSAGE = 'Both arguments must be finite numbers (reviewed)';

/**
 * Add two finite numbers.
 * @param {number} a
 * @param {number} b
 * @returns {number}
 * @throws {TypeError} with a fixed message when either argument is not a finite number
 */
module.exports = function add(a, b) {
  if (
    typeof a !== 'number' ||
    typeof b !== 'number' ||
    !Number.isFinite(a) ||
    !Number.isFinite(b)
  ) {
    throw new TypeError(INVALID_MESSAGE);
  }
  return a + b;
};
