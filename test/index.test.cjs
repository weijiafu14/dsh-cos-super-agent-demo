'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');

const indexModule = require('../index.cjs');

// 预期错误信息：必须与 index.cjs 中的实现完全一致。
const INVALID_ARGUMENT_MESSAGE = 'Both arguments must be finite numbers (reviewed)';

// index.cjs 可能直接导出函数，也可能以命名属性 add 导出；两种形式都兼容。
const add = typeof indexModule === 'function' ? indexModule : indexModule.add;

/**
 * 断言调用会抛出 TypeError，且 message 精确等于 INVALID_ARGUMENT_MESSAGE。
 * @param {() => unknown} fn 被测调用
 * @param {string} label 用例说明
 */
function assertInvalidArguments(fn, label) {
  assert.throws(fn, (error) => {
    assert.ok(error instanceof TypeError, `${label}: 应抛出 TypeError`);
    assert.equal(error.message, INVALID_ARGUMENT_MESSAGE, `${label}: 错误信息应精确匹配`);
    return true;
  }, label);
}

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

test('非数字类型参数抛出 TypeError', () => {
  assertInvalidArguments(() => add('2', 3), '第一个参数为字符串');
  assertInvalidArguments(() => add(2, '3'), '第二个参数为字符串');
  assertInvalidArguments(() => add(2, null), '第二个参数为 null');
  assertInvalidArguments(() => add(null, 2), '第一个参数为 null');
  assertInvalidArguments(() => add(undefined, 1), '第一个参数为 undefined');
  assertInvalidArguments(() => add(1, undefined), '第二个参数为 undefined');
  assertInvalidArguments(() => add(1, {}), '第二个参数为对象');
  assertInvalidArguments(() => add({}, 1), '第一个参数为对象');
  assertInvalidArguments(() => add(true, 1), '第一个参数为布尔值');
});

test('非有限数字参数抛出 TypeError', () => {
  assertInvalidArguments(() => add(NaN, 1), '第一个参数为 NaN');
  assertInvalidArguments(() => add(1, NaN), '第二个参数为 NaN');
  assertInvalidArguments(() => add(Infinity, 1), '第一个参数为 Infinity');
  assertInvalidArguments(() => add(1, Infinity), '第二个参数为 Infinity');
  assertInvalidArguments(() => add(-Infinity, 1), '第一个参数为 -Infinity');
  assertInvalidArguments(() => add(1, -Infinity), '第二个参数为 -Infinity');
});
