import './style.css';
import { cases, run, reproduction, resolveCase, type Result, type Example } from './lab';

const get = <T extends HTMLElement>(id: string) => document.getElementById(id) as T;
const input = get<HTMLTextAreaElement>('input');
const copy = get<HTMLButtonElement>('copy');
let current = cases[0]!;
let ranInput: string | null = null;
let revision = 0;
const caseButtons = cases.map((example, index) => {
  const button = document.createElement('button');
  button.type = 'button';
  const number = document.createElement('span');
  number.className = 'case-index';
  number.textContent = `0${index + 1}`;
  button.append(number, document.createTextNode(example.title));
  button.onclick = () => {
    history.replaceState(null, '', `#case=${example.id}`);
    select(example);
  };
  get('cases').append(button);
  return button;
});
function clearCopy() {
  revision++;
  get('fallback').hidden = true;
  get<HTMLTextAreaElement>('copy-text').value = '';
  get('copy-status').textContent = '';
}
function display(result: Result | null, version: 3 | 4) {
  const badge = get(`status-${version}`);
  badge.textContent = result?.status === 'success' ? 'Passed' : result?.status === 'failure' ? 'Failed' : result?.status === 'incomplete' ? 'Incomplete' : 'Not run';
  badge.className = `badge ${result?.status ?? ''}`;
  get(`label-${version}`).textContent = result?.status === 'success' ? 'Parsed output' : result?.status === 'failure' ? 'Original issues' : result?.status === 'incomplete' ? 'Execution exception' : 'Run the current input to see results.';
  get(`result-${version}`).textContent = !result ? '—' : result.status === 'success' ? JSON.stringify(result.data, null, 2) : result.status === 'failure' ? JSON.stringify(result.issues, null, 2) : result.error;
}
function invalidate(message: string, error = false) {
  ranInput = null;
  copy.disabled = true;
  display(null, 3);
  display(null, 4);
  get('input-status').textContent = message;
  get('input-status').classList.toggle('error', error);
  input.setAttribute('aria-invalid', String(error));
}
function runInput() {
  clearCopy();
  try {
    const results = run(current, input.value);
    display(results[0], 3);
    display(results[1], 4);
    ranInput = input.value;
    copy.disabled = false;
    input.setAttribute('aria-invalid', 'false');
    get('input-status').classList.remove('error');
    get('input-status').textContent = results.some(result => result.status === 'incomplete')
      ? 'Execution incomplete. See each version’s result below.'
      : 'Ran both versions with the current input.';
  } catch (error) {
    invalidate(error instanceof Error ? error.message : String(error), true);
  }
}
function select(example: Example, notice = '') {
  current = example;
  caseButtons.forEach((button, index) => button.setAttribute('aria-current', String(cases[index] === example)));
  get('case-number').textContent = `CASE 0${cases.indexOf(example) + 1} / 03`;
  get('question').textContent = example.question;
  get('explanation').textContent = example.explanation;
  get('schema').textContent = example.schema;
  const reference = get<HTMLAnchorElement>('reference');
  reference.href = example.source;
  reference.textContent = `${example.sourceLabel} ↗`;
  input.value = example.input;
  runInput();
  if (notice) get('input-status').textContent = `${notice} ${get('input-status').textContent}`;
}
function loadHash() {
  const resolved = resolveCase(location.hash);
  select(resolved.example, resolved.unknown ? 'Unknown case. Showing the first example.' : '');
  // Canonicalize the URL to a fixed ID; no edited input belongs in it.
  history.replaceState(null, '', `#case=${resolved.example.id}`);
}
async function copyText(text: string, message: string) {
  clearCopy();
  const startedAt = revision;
  try {
    await navigator.clipboard.writeText(text);
    if (revision === startedAt) get('copy-status').textContent = message;
  } catch {
    if (revision !== startedAt) return;
    get('fallback').hidden = false;
    const fallback = get<HTMLTextAreaElement>('copy-text');
    fallback.value = text;
    fallback.focus();
    fallback.select();
    get('copy-status').textContent = 'Copy failed. The text below is ready to copy manually.';
  }
}
input.addEventListener('input', () => {
  clearCopy();
  invalidate('Input changed. Run both versions again.');
});
get('form').addEventListener('submit', event => { event.preventDefault(); runInput(); });
get('reset').onclick = () => { input.value = current.input; runInput(); };
copy.onclick = () => { if (ranInput !== null) void copyText(reproduction(current, ranInput), 'Reproduction code copied, including exact dependencies and the current input.'); };
get('share').onclick = () => {
  const url = new URL(location.href);
  url.search = '';
  url.hash = `case=${current.id}`;
  void copyText(url.href, 'Case link copied. It opens the default input, not your edits.');
};
window.addEventListener('hashchange', loadHash);
const sourceUrl = import.meta.env.VITE_SOURCE_URL || 'https://github.com/FightJs/zod-upgrade-gotchas';
if (sourceUrl && /^https:\/\/github\.com\/[\w.-]+\/[\w.-]+\/?$/.test(sourceUrl)) {
  const link = document.createElement('a');
  link.href = sourceUrl;
  link.textContent = 'Source on GitHub ↗';
  link.target = '_blank';
  link.rel = 'noreferrer';
  get('source').replaceChildren(link);
}
loadHash();
