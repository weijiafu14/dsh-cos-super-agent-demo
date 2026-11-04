'use strict';

const { describe, it } = require('node:test');
const assert = require('node:assert/strict');

const add = require('../index.cjs');

describe('add(a, b)', () => {
  describe('正数相加', () => {
    it('返回两个正数之和', () => {
      assert.equal(add(2, 3), 5);
      assert.equal(add(1, 1), 2);
    });

    it('正确处理浮点数（就近比较）', () => {
      assert.ok(Math.abs(add(0.1, 0.2) - 0.3) < 1e-9);
    });
  });

  describe('负数相加', () => {
    it('返回两个负数之和', () => {
      assert.equal(add(-2, -3), -5);
      assert.equal(add(-1, -1), -2);
    });

    it('正负混合相加', () => {
      assert.equal(add(5, -3), 2);
      assert.equal(add(-7, 4), -3);
    });
  });

  describe('类型错误', () => {
    it('非数字参数抛出 TypeError', () => {
      assert.throws(() => add('1', 2), TypeError);
      assert.throws(() => add(1, '2'), TypeError);
      assert.throws(() => add(undefined, 1), TypeError);
      assert.throws(() => add(1, undefined), TypeError);
      assert.throws(() => add(null, 1), TypeError);
      assert.throws(() => add(NaN, 1), TypeError);
      assert.throws(() => add({}, 1), TypeError);
      assert.throws(() => add(1, []), TypeError);
    });
  });
});
