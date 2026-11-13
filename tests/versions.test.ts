import { test } from 'node:test';
import assert from 'node:assert/strict';
import * as v3 from 'zod-v3';
import * as v4 from 'zod-v4';

test('real release packages: default + partial changes parsed output', () => {
  const a = v3.object({ a: v3.string().default('a'), b: v3.string().default('b') }).partial();
  const b = v4.object({ a: v4.string().default('a'), b: v4.string().default('b') }).partial();
  assert.deepEqual(a.parse({ b: 'changed' }), { b: 'changed' });
  assert.deepEqual(b.parse({ b: 'changed' }), { a: 'a', b: 'changed' });
});
test('real release packages: safe integer boundary changes acceptance', () => {
  assert.equal(v3.number().int().safeParse(9007199254740992).success, true);
  const result = v4.number().int().safeParse(9007199254740992);
  assert.equal(result.success, false);
  console.log('integer v4:', JSON.stringify(result));
});
test('real release packages: enum record requires all keys in v4', () => {
  assert.deepEqual(v3.record(v3.enum(['a', 'b']), v3.number()).parse({ a: 1 }), { a: 1 });
  const result = v4.record(v4.enum(['a', 'b']), v4.number()).safeParse({ a: 1 });
  assert.equal(result.success, false);
  console.log('record v4:', JSON.stringify(result));
});
