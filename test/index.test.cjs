'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');

const indexModule = require('../index.cjs');

// index.cjs 可能直接导出函数，也可能以命名属性 add 导出；两种形式都兼容。
const add = typeof indexModule === 'function' ? indexModule : indexModule.add;

test('index.cjs 导出可调用的 add 函数', () => {
  assert.equal(typeof add, 'function');
});

test('正数相加返回和', () => {
  assert.equal(add(2, 3), 5);
  assert.equal(add(0, 0), 0);
  assert.equal(add(1.5, 2.25), 3.75);
});

test('负数相加返回和', () => {
  assert.equal(add(-2, -5), -7);
  assert.equal(add(-2, 5), 3);
  assert.equal(add(5, -2), 3);
});

test('非数字参数抛出错误', () => {
  assert.throws(() => add('2', 3), /non-number/i, '字符串参数应报错');
  assert.throws(() => add(2, null), /non-number/i, 'null 参数应报错');
  assert.throws(() => add(undefined, 1), /non-number/i, 'undefined 参数应报错');
  assert.throws(() => add(1, {}), /non-number/i, '对象参数应报错');
  assert.throws(() => add(NaN, 1), /non-number/i, 'NaN 参数应报错');
});
