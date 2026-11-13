import * as v3 from 'zod-v3';
import * as v4 from 'zod-v4';

interface Parser {
  safeParse(input: unknown): { success: true; data: unknown } | { success: false; error: { issues: readonly unknown[] } };
}
// Only the common surface used by the three trusted factories.
interface Toolkit {
  string(): { default(value: string): unknown };
  number(): Parser & { int(): Parser };
  object(shape: Record<string, unknown>): { partial(): Parser };
  enum(values: ['a', 'b']): unknown;
  record(keys: unknown, value: unknown): Parser;
}
export type Result = { status: 'success'; data: unknown } | { status: 'failure'; issues: readonly unknown[] } | { status: 'incomplete'; error: string };
export const versions = ['3.25.76', '4.6.7'] as const;
export const cases = [
  {
    id: 'default-partial', title: 'Defaults after .partial()',
    question: 'Both pass. But what gets written?',
    explanation: 'With the default input, v3 leaves the omitted a field out. v4 applies its default even inside .partial(). A PATCH handler that writes parsed data could now write an extra field.',
    input: '{\n  "b": "changed"\n}',
    schema: "z.object({\n  a: z.string().default('a'),\n  b: z.string().default('b')\n}).partial()",
    source: 'https://github.com/colinhacks/zod/issues/6627',
    sourceLabel: 'Zod issue #6627',
    factory: (z: Toolkit) => z.object({ a: z.string().default('a'), b: z.string().default('b') }).partial(),
  },
  {
    id: 'integer-range', title: 'The safe integer boundary',
    question: 'An integer is not always a safe integer.',
    explanation: 'With the default input, v3 accepts 9007199254740992 as an integer. v4 rejects it because .int() requires a safe integer (at most 9007199254740991). Try 42: both pass.',
    input: '9007199254740992', schema: 'z.number().int()',
    source: 'https://zod.dev/v4/changelog#znumber', sourceLabel: 'Official migration guide · numbers',
    factory: (z: Toolkit) => z.number().int(),
  },
  {
    id: 'enum-record', title: 'Enum keys become exhaustive',
    question: 'One missing key changes the result.',
    explanation: 'With the default input, v3 accepts a record containing only a. v4 requires every enum key, so the missing b fails validation. Try {"a":1,"b":2}: both pass.',
    input: '{\n  "a": 1\n}', schema: "z.record(z.enum(['a', 'b']), z.number())",
    source: 'https://zod.dev/v4/changelog#zrecord', sourceLabel: 'Official migration guide · records',
    factory: (z: Toolkit) => z.record(z.enum(['a', 'b']), z.number()),
  },
];
export type Example = (typeof cases)[number];

export function parseInput(text: string): unknown {
  if (new TextEncoder().encode(text).length > 20 * 1024) throw new Error('Input exceeds 20 KiB (UTF-8).');
  let value: unknown;
  try { value = JSON.parse(text); } catch { throw new Error('Invalid JSON. Check quotes, commas and brackets.'); }
  const visit = (node: unknown, depth: number): void => {
    if (typeof node === 'number' && !Number.isFinite(node)) throw new Error('JSON numbers must be finite.');
    if (node !== null && typeof node === 'object') {
      if (depth >= 20) throw new Error('Input exceeds the maximum container depth of 20.');
      for (const child of Object.values(node)) visit(child, depth + 1);
    }
  };
  visit(value, 0);
  return value;
}
export function execute(factory: () => Parser, input: unknown): Result {
  try {
    const result = factory().safeParse(structuredClone(input));
    return result.success ? { status: 'success', data: result.data } : { status: 'failure', issues: result.error.issues };
  } catch (error) {
    return { status: 'incomplete', error: error instanceof Error ? error.message : String(error) };
  }
}
export function run(example: Example, text: string): [Result, Result] {
  const input = parseInput(text);
  return [execute(() => example.factory(v3), input), execute(() => example.factory(v4), input)];
}
export function reproduction(example: Example, text: string): string {
  parseInput(text);
  return `// Save as repro.mjs, then run: node repro.mjs\n// npm install zod-v3@npm:zod@${versions[0]} zod-v4@npm:zod@${versions[1]}\nimport * as v3 from 'zod-v3';\nimport * as v4 from 'zod-v4';\n\nconst makeSchema = (z) => ${example.schema};\nconst input = JSON.parse(${JSON.stringify(text)});\n\nfor (const [version, z] of [['${versions[0]}', v3], ['${versions[1]}', v4]]) {\n  try {\n    const result = makeSchema(z).safeParse(structuredClone(input));\n    console.log(version, result.success ? { success: true, data: result.data } : { success: false, issues: result.error.issues });\n  } catch (error) {\n    console.log(version, { incomplete: true, error: String(error) });\n  }\n}\n`;
}
export function resolveCase(hash: string): { example: Example; unknown: boolean } {
  const id = new URLSearchParams(hash.replace(/^#/, '')).get('case');
  const example = cases.find(item => item.id === id);
  return { example: example ?? cases[0]!, unknown: Boolean(hash) && !example };
}
