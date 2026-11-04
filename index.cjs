'use strict';

function add(a, b) {
  if (typeof a !== 'number' || typeof b !== 'number' || Number.isNaN(a) || Number.isNaN(b)) {
    throw new TypeError('add expects two numbers');
  }
  return a + b;
}

module.exports = add;
module.exports.add = add;
