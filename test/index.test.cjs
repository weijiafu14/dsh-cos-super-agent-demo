'use strict';

const { describe, it } = require('node:test');
const assert = require('node:assert/strict');

const add = require('../index.cjs');

const FINITE_ERROR = {
  name: 'TypeError',
  message: 'Both arguments must be finite numbers (reviewed)',
};

const invalidValues = [
  ['字符串', '2'],
  ['undefined', undefined],
  ['null', null],
  ['对象', {}],
  ['数组', []],
  ['NaN', NaN],
  ['Infinity', Infinity],
  ['-Infinity', -Infinity],
];

describe('add(a, b)', () => {
  describe('正数相加', () => {
    it('返回两个正数之和', () => {
      assert.equal(add(2, 3), 5);
      assert.equal(add(1, 1), 2);
      assert.equal(add(1.5, 2.5), 4);
    });

    it('正确处理浮点数（就近比较）', () => {
      assert.ok(Math.abs(add(0.1, 0.2) - 0.3) < 1e-9);
    });
  });

  describe('负数相加', () => {
    it('返回两个负数之和', () => {
      assert.equal(add(-2, -3), -5);
      assert.equal(add(-1, -1), -2);
      assert.equal(add(-1.5, -2.5), -4);
    });

    it('正负混合相加', () => {
      assert.equal(add(5, -3), 2);
      assert.equal(add(-7, 4), -3);
      assert.equal(add(0, 0), 0);
    });
  });

  describe('类型与取值错误', () => {
    for (const [label, value] of invalidValues) {
      it(`第一个参数为${label}时抛出 TypeError`, () => {
        assert.throws(() => add(value, 1), FINITE_ERROR);
      });

      it(`第二个参数为${label}时抛出 TypeError`, () => {
        assert.throws(() => add(1, value), FINITE_ERROR);
      });
    }

    it('两个参数均非法时抛出 TypeError', () => {
      assert.throws(() => add('1', '2'), FINITE_ERROR);
      assert.throws(() => add(Infinity, -Infinity), FINITE_ERROR);
      assert.throws(() => add(NaN, NaN), FINITE_ERROR);
    });

    it('抛出的错误类型与 message 精确匹配', () => {
      let error;
      try {
        add('1', 2);
      } catch (err) {
        error = err;
      }
      assert.ok(error instanceof TypeError);
      assert.equal(error.message, 'Both arguments must be finite numbers (reviewed)');
    });
  });
});
