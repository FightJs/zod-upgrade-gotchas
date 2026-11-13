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

## Lightweight promotion preparation — 2026-11-13

This section records a later **local-only preparation**, not a second publication or a hosted acceptance. Product source, tests, dependencies, Vite configuration and original research were not changed.

### Current external state (read-only checks)

- GitHub repository metadata confirms the existing public `FightJs/zod-upgrade-gotchas`, default branch `main`, `homepage: null`, `license: null`, `has_pages: false`, and a current star count of **0**. This is a baseline observation, not attributed growth.
- `git ls-remote origin` reports `35c21596881ae52ba588043581bc5db69506028f` for HEAD/main, matching the local HEAD. No existing local tracked changes were present; `PROMOTION.md` was already untracked before preparation and was left unchanged.
- The authenticated read-only Pages API returned **404**; repository deployments and Actions workflows both returned counts of **0**. The conventional Pages site returned **404**. No configured/documented live demo was found; this does not establish the state of unknown external hosts.
- Local and remote root file listings contain no project LICENSE file. Existing README and third-party notices state that the project has no declared license. No license was chosen.

### Prepared assets and actual local checks

- README now leads with the two-passes/different-output finding, a truthful pending-demo notice and local experience entry, a readable result image, and the real source link. No hypothetical live URL is presented as a working demo.
- `docs/images/default-partial-results.png` is a **1088 × 300** crop at x=96, y=862 from the existing 1280 × 1232 screenshot. The original file is unchanged (SHA-256 `57c88f26d5e4a0b6f6066a57d407000590b76fa4fb715d24bfdfef3f0003d2fd`). Both the original and crop were visually inspected; results were not redrawn.
- LAUNCH contains one Chinese article and one English short post. The English copy has **221 Unicode code points**, below both 280 and 300. The article's actual code block was extracted and executed with installed real packages; its default input produced the stated two different outputs, and its a/b-complete control produced equal outputs. Both assertions passed.
- `npm test`: **9 passed, 0 failed**. `npm run check` and `npm run build`: **exit 0** under Node **20.13.0**, npm **10.8.0**. The two previously recorded upstream annotation warnings remain; no warnings were suppressed.
- `.github/workflows/pages.yml` is local and **manual-only**. Ruby's YAML parser accepted it, and assertions confirmed only `workflow_dispatch`, a `dist` artifact, and read-only build defaults. No GitHub-hosted run or dedicated Actions schema linter was executed. CI selects Node 22; this preparation did not rerun locally on Node 22.
- The workflow copies the existing third-party notice into the static artifact. That copy step was executed locally. A temporary plain HTTP server successfully served the built index under `/zod-upgrade-gotchas/`, its JS/CSS/favicon and byte-identical `THIRD_PARTY_NOTICES.txt`. This was an HTTP asset check, **not** a new browser interaction or public HTTPS acceptance. An initial probe closed asset responses before reading them and caused a test-server BrokenPipe; the corrected probe read complete responses and passed without server errors.
- Local Markdown file/image targets and `git diff --check` passed. Original screenshot, runtime source, tests and manifests remain unchanged. Existing browser results above are historical evidence, not newly rerun browser checks for this documentation-only preparation.

### Channel rules and remaining authorization

HN's current guidelines returned HTTP 200 and explicitly prohibit generated/AI-edited text and soliciting upvotes/comments/submissions. These AI-assisted drafts are excluded from HN. Bluesky's official guideline URL returned HTTP 403, so its current text was not verified. No Chinese platform/account has been selected or cleared; X and subreddit rules were not verified in this preparation. Platform review remains necessary before any authorized post; forbidden platforms cannot use these drafts.

No commit, remote push, repository setting change, license selection, deployment, workflow dispatch, community post, directory submission or contact with others was performed. No post URL, impression count, independent citation or star growth is claimed. No video was recorded; the existing real screenshot is the release visual.

Publisher decisions are consolidated in LAUNCH and DEPLOYMENT: license choice or explicit unlicensed status; exact remote push and GitHub Pages publication authorization; then specific Chinese/English channels/accounts and posting authorization after rule review and hosted verification. Public HTTPS clipboard behavior, case-link refresh, source backlink and narrow-layout acceptance remain unverified until a real deployment is authorized and performed.

## Authorized publication follow-through — 2026-11-13

After reviewing the prepared files, the publisher replied that all listed actions were allowed. This supersedes the earlier local-only boundary for license selection, push, Pages setup/deployment and posting. MIT was selected for the application's own code and documentation; the original Zod copyright/license text remains intact. LICENSE is copied into the static artifact alongside the dependency notices.

Before pushing, `npm test` passed all 9 tests, `npm run check` and `npm run build` exited 0, workflow YAML/manual trigger assertions passed, and the local/remote main HEADs both matched `35c21596881ae52ba588043581bc5db69506028f`. The two previously documented upstream annotation warnings remain. Product code and dependency manifests were not changed. Only explicitly reviewed application files are staged; the pre-existing untracked PROMOTION.md is excluded.

Posting is authorized, but the exact Chinese/English platforms and account targets are still missing; they have been requested separately. No post is claimed. Hosted deployment and browser results will be recorded after they actually complete.
