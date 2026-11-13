# Static demo: GitHub Pages

**Live:** [https://fightjs.github.io/zod-upgrade-gotchas/](https://fightjs.github.io/zod-upgrade-gotchas/) · **[Default case](https://fightjs.github.io/zod-upgrade-gotchas/#case=default-partial)**

The publisher authorized MIT licensing, remote push, Pages setup/deployment and posting on 2026-11-13. The [first Pages run](https://github.com/FightJs/zod-upgrade-gotchas/actions/runs/43445983076) successfully built and deployed application commit `dcedf55587968d524dd940042e9e78ebfa4bc476`. The repository homepage now points to this actual demo. Subsequent documentation-only commits do not change its runtime assets.

## What is deployed

`.github/workflows/pages.yml` installs from the lockfile, runs the 9 tests and TypeScript checks, and builds with Node 22 and the real GitHub source URL. It copies the application MIT license and existing Zod notices into `dist/LICENSE.txt` and `dist/THIRD_PARTY_NOTICES.txt`. Only `dist/` is uploaded with official GitHub Pages actions.

Vite's existing `base: './'` and case fragments support the project subdirectory without rewrites. No app feature, hosting secret, server, domain purchase or analytics system was added. Build permissions are read-only; only the deploy job receives `pages: write` and `id-token: write`.

The workflow has **only `workflow_dispatch`**. Pushing a file alone does not publish a new build.

## Later approved updates

1. Review and push the intended files to the existing repository. Do not add every untracked file; local PROMOTION.md was excluded from this publication.
2. In **Actions → Publish static demo → Run workflow**, select the approved branch (normally `main`). Repository Pages settings already use the GitHub Actions source.
3. Wait for the checks and deployment to succeed. Verify the actual HTTPS default, edit/run/reset, copying, all three fixed links opened/refreshed, narrow layout and source backlink. Record the result in VERIFICATION; do not equate a successful build with a successful hosted interaction check.

The current demo passed these hosted Chromium checks, including 375px and 320px layouts. License/notice URLs returned HTTP 200 and matched the local files byte-for-byte. See [VERIFICATION.md](VERIFICATION.md) for exact evidence and remaining browser/device limitations.

To unpublish later, use GitHub Pages' **Unpublish site** control. Deleting the workflow alone does not unpublish existing content.

Reference: [GitHub's custom Pages workflow documentation](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).
