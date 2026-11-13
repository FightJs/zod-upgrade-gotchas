# Static demo: GitHub Pages

**Authorized for publication; deployment pending verification.** The existing public repository is [FightJs/zod-upgrade-gotchas](https://github.com/FightJs/zod-upgrade-gotchas). On 2026-11-13 it had no Pages site, no homepage URL, and no project license at the initial inspection. MIT has since been selected with publisher authorization. No new repository, hosting account, domain, or server is needed.

## Ready for review

`.github/workflows/pages.yml` installs from the lockfile, runs tests and TypeScript checks, builds with the real source URL, copies the existing Zod notices into `dist/THIRD_PARTY_NOTICES.txt`, copies the application license into `dist/LICENSE.txt`, and uploads only `dist/` using the official GitHub Pages actions. Node 22 is selected for CI. Existing Vite `base: './'` supports the project subpath; no app change is needed. There is **only `workflow_dispatch`**, so pushing the file alone does not run a deployment.

GitHub Actions permissions are read-only during build; only the deploy job has `pages: write` and `id-token: write`. No hosting secrets or custom backend are used. `node_modules`, research files, local browser output and drafts are outside the uploaded artifact.

## After the publisher authorizes push and public hosting

1. Review the local diff and commit/push the approved application files to the existing repository. `PROMOTION.md` was already untracked when this preparation began; review it separately rather than adding every untracked file.
2. In repository **Settings → Pages → Build and deployment**, select **GitHub Actions**. The publisher has authorized publication and the application has an MIT license; preserve LICENSE. Preserve `THIRD_PARTY_NOTICES.md`.
3. In **Actions → Publish static demo → Run workflow**, choose the approved branch (normally `main`). Review the checks and deploy result. Follow the actual environment URL emitted by `actions/deploy-pages`.
4. At that real HTTPS URL, verify defaults, edit/run/reset, copied reproduction, all three `#case=...` links opened/refreshed, clipboard fallback, narrow layout, and the source backlink. Local checks do not establish hosted HTTPS success.
5. Only then replace the pending-demo text in README and LAUNCH with the verified URL and record the hosted result in VERIFICATION. Updating the repository homepage is also an external setting change and needs authorization.

The default address **would normally be** the following, but it returned 404 during preparation and is not a live demo link:

```text
https://fightjs.github.io/zod-upgrade-gotchas/#case=default-partial
```

For local inspection, run `npm run build` and `npm run preview`. To remove a published demo later, use GitHub Pages' Unpublish site control; deleting a workflow alone does not unpublish existing content.

Reference: [GitHub's custom Pages workflow documentation](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages) (HTTP 200 checked on 2026-11-13). The remote workflow, environment permissions and actual hosted URL remain untested until authorized publication.
