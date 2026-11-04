'use strict';

function add(a, b) {
  if (!Number.isFinite(a) || !Number.isFinite(b)) {
    throw new TypeError('Both arguments must be finite numbers (reviewed)');
  }

  return a + b;
}

module.exports = add;
module.exports.add = add;
