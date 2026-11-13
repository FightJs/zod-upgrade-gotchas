# Release acceptance — 2026-11-13

Scope: local acceptance and publication of the application source at https://github.com/FightJs/zod-upgrade-gotchas. No deployment, GitHub Pages setup, hosting connection, post, or contact with others. The only runtime change is the real source-link default; no product features were added.

Environment actually used: macOS, Node **20.13.0**, npm **10.8.0**. Node 22 was not rerun in this acceptance. `npm ci` succeeded. `npm ls --depth=0` and each installed package's `package.json` independently report `zod-v3 → zod@3.25.76` and `zod-v4 → zod@4.6.7`. The manifest pins exact npm aliases and the lockfile pins their resolved tarballs and integrity hashes. Although the lockfile downloads from npmmirror, both integrity hashes were checked against the official registry.npmjs.org metadata and matched exactly.

## Real execution

`src/lab.ts` imports both packages, constructs each fixed schema against each package, clones the current parsed input independently, and calls `safeParse`. The UI displays those returned data/issues through text rendering. Tests execute both the runner and separately constructed real-package schemas; generated reproduction snippets are also executed in Node.

| Schema | Input | Zod 3.25.76 | Zod 4.6.7 |
| --- | --- | --- | --- |
| Defaults + partial | `{"b":"changed"}` | Pass: `{"b":"changed"}` | Pass: `{"a":"a","b":"changed"}` |
| Integer | `9007199254740992` | Pass: same number | Fail: `too_big`, maximum `9007199254740991` |
| Enum record | `{"a":1}` | Pass: `{"a":1}` | Fail: `invalid_type`, path `["b"]`, expected `number` |
| Partial control | `{"a":"x","b":"y"}` | Pass | Pass, equal output |
| Integer control | `42` | Pass: `42` | Pass: `42` |
| Record control | `{"a":1,"b":2}` | Pass | Pass, equal output |

Source checks: the official migration page returned HTTP 200 with both `znumber` and `zrecord` anchors. GitHub issue #6627 HTML identifies it as “Default with partial in zod 4”. The GitHub API request was rate-limited (403); the public issue page was accessible.

## Commands and outcomes

| Command | Actual outcome |
| --- | --- |
| `npm ci` | Exit 0; 24 packages installed |
| `npm test` | Exit 0; 9 passed, 0 failed, 0 skipped |
| `npm run check` | Exit 0; TypeScript reports no errors |
| `npm run build` | Exit 0; 110 modules transformed |
| Playwright CLI running `tests/browser-check.js` against production preview | PASS |
| Playwright CLI `console` in that browser session | 0 messages, 0 errors, 0 warnings |

Built assets: JS **459.47 kB / 109.52 kB gzip**, CSS **6.31 kB / 1.99 kB gzip**. Two build warnings concern misplaced pure annotations in upstream Zod 4 `regexes.js` and `util.js`; Rollup removes those comments. No dependencies were patched or warnings suppressed.

Port 4173 already had this project's Vite production preview running. The acceptance used it after confirming the process path and the served HTML's asset filenames matched the new build (`index-DX-3xq9n.js`).

## Chromium interaction acceptance

The production page, rather than a DOM mock, passed:

- The rendered source link points to the actual public repository.
- All three default cases and all three equal-result controls; selection and reload retain the fixed case.
- **After editing each case:** both badges become `Not run`, both old outputs become `—`, the rerun notice appears, and Copy is disabled. Run displays the edited input's results. Restore default resets the input and runs automatically.
- Real clipboard reads confirm copied code contains the exact dependency versions and edited input. Unit tests execute generated code for all three cases.
- Share copies only a fixed case URL. Reloading it restores the default input instead of edits. Unknown IDs produce a notice and canonicalize to the first case.
- Deliberately rejected clipboard writes reveal focused, selected, read-only fallback text for both code and links.
- Invalid JSON, excessive UTF-8 size and nesting show feedback, clear results and disable copying. Unit tests also cover finite numbers, exact accepted limits, no factory execution on invalid input, isolated inputs and thrown factories.
- HTML/script-like input remains literal text and does not execute.
- Tab reaches Run; Enter runs; Enter on a focused case button switches cases. Visible focus styling is present.
- 1280px desktop and 375/320px Chromium viewports. Results stack at narrow widths; document width does not overflow. Desktop and 320px screenshots were visually inspected.

The browser acceptance script was strengthened to assert both stale badges and outputs for all three cases. Its final log is `output/playwright/public-release-check.log`. Local screenshots are in `output/playwright/`; the genuine desktop capture is also retained at `docs/images/default-partial.png` and embedded in README so it is not lost to the ignored output directory.

## Publication checks

- GitHub CLI identified the authenticated account as FightJs. The application directory had no existing Git repository or remote; the requested repository name did not exist, so no unrelated repository was reused.
- Created the public repository https://github.com/FightJs/zod-upgrade-gotchas. README, page source entry and launch drafts use this actual URL.
- Only application source, tests, dependency manifests, app documentation, the real screenshot and third-party notices are included. No parent-directory research or history documents are included. The Git staging list is reviewed before committing and pushing.
- Ignore rules exclude node_modules, dist, browser output, environment files, private key files and OS metadata. Candidate contents are checked for credentials and personal filesystem paths before pushing.
- No project LICENSE file or project-license badge is included. README explicitly distinguishes public visibility from an open-source license. Zod's actual dependency license and copyright text is retained in THIRD_PARTY_NOTICES.md.

## Not verified / remaining limits

- Safari, Firefox, physical mobile devices, screen readers and full accessibility conformance. Keyboard checks cover the stated paths, not an exhaustive accessibility audit.
- Real OS/browser clipboard denial; denial was simulated. Hosted HTTPS clipboard permissions and cross-device share links are unverified.
- A natural Zod crash in the browser; exception handling was tested at the runner boundary using a throwing factory.
- Public hosting and subdirectory hosting were not exercised in this acceptance run.
- There is no hosted demo. README and LAUNCH explicitly say the demo is not deployed; the source URL is real. Hosted behavior remains unverified.
- The project intentionally has no project license. None was assigned; public visibility does not grant open-source permissions.

README and the two posts in LAUNCH describe only these observed behaviors. No blocking product defect was found within this scope.
