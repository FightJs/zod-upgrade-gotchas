import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, writeFile, rm } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { execFileSync } from 'node:child_process';
import { cases, run, parseInput, execute, reproduction, resolveCase } from '../src/lab.ts';

test('runner uses the real schemas for differences and equal controls', () => {
  assert.deepEqual(run(cases[0]!, '{"b":"changed"}'), [
    { status: 'success', data: { b: 'changed' } },
    { status: 'success', data: { a: 'a', b: 'changed' } },
  ]);
  for (const [index, input] of [[0, '{"a":"x","b":"y"}'], [1, '42'], [2, '{"a":1,"b":2}']] as const) {
    const results = run(cases[index]!, input);
    assert.equal(results[0].status, 'success');
    assert.deepEqual(results[0], results[1]);
  }
  for (const index of [1, 2]) {
    const results = run(cases[index]!, cases[index]!.input);
    assert.equal(results[0].status, 'success');
    assert.equal(results[1].status, 'failure');
    if (results[1].status === 'failure') assert.ok(results[1].issues.length);
  }
});
test('input boundary rejects invalid JSON, non-finite numbers, bytes and depth', () => {
  assert.throws(() => parseInput('{'), /JSON/);
  assert.throws(() => parseInput('1e400'), /finite/);
  assert.doesNotThrow(() => parseInput('"' + 'a'.repeat(20478) + '"'));
  assert.throws(() => parseInput('"' + 'a'.repeat(20479) + '"'), /20 KiB/);
  assert.throws(() => parseInput('"' + '界'.repeat(7000) + '"'), /20 KiB/);
  assert.doesNotThrow(() => parseInput('['.repeat(20) + '0' + ']'.repeat(20)));
  assert.throws(() => parseInput('['.repeat(21) + '0' + ']'.repeat(21)), /depth/);
});
test('execution exceptions stay incomplete and each side receives its own copy', () => {
  const input = { a: 1 };
  assert.deepEqual(execute(() => { throw new Error('broken'); }, input), { status: 'incomplete', error: 'broken' });
  const mutate = () => ({ safeParse(value: unknown) { (value as { a: number }).a = 2; return { success: true as const, data: value }; } });
  execute(mutate, input);
  assert.deepEqual(input, { a: 1 });
  const real = run(cases[2]!, 'null');
  assert.equal(real[0].status, 'failure');
  assert.equal(real[1].status, 'failure');
});
test('copied reproduction executes all three cases and treats JS-like input as data', async () => {
  const dir = await mkdtemp(join(dirname(import.meta.filename), '.repro-'));
  const capture = "console.log = (...args) => process.stdout.write(JSON.stringify(args) + '\\n');\n";
  const payload = '` ${globalThis.pwned = true} </script>';
  try {
    for (const example of cases) {
      const file = join(dir, 'repro.mjs');
      const input = example.id === 'default-partial' ? JSON.stringify({ b: payload }) : example.input;
      await writeFile(file, capture + reproduction(example, input) + "\nif (globalThis.pwned) throw new Error('Injected JS ran');\n");
      const rows = execFileSync(process.execPath, [file], { encoding: 'utf8' }).trim().split('\n').map(line => JSON.parse(line));
      assert.equal(rows[0][0], '3.25.76');
      assert.equal(rows[1][0], '4.6.7');
      assert.equal(rows[0][1].success, true);
      if (example.id === 'default-partial') {
        assert.deepEqual(rows[0][1].data, { b: payload });
        assert.deepEqual(rows[1][1].data, { a: 'a', b: payload });
      } else {
        assert.equal(rows[1][1].success, false);
        assert.ok(rows[1][1].issues.length);
      }
    }
  } finally { await rm(dir, { recursive: true, force: true }); }
});
test('fixed links resolve only known IDs, never input', () => {
  assert.equal(resolveCase('#case=enum-record').example.id, 'enum-record');
  assert.equal(resolveCase('#case=unknown').unknown, true);
  assert.equal(resolveCase('#case=unknown').example.id, 'default-partial');
  assert.equal(resolveCase('').unknown, false);
});

test('invalid inputs never call a schema factory', () => {
  let called = false;
  const example = { ...cases[0]!, factory: () => { called = true; throw new Error('must not run'); } };
  for (const input of ['{', '"' + 'a'.repeat(20480) + '"', '['.repeat(21) + '0' + ']'.repeat(21)]) {
    assert.throws(() => run(example, input));
  }
  assert.equal(called, false);
});
