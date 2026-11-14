# Independent publication review — 2026-11-14

Reviewer: independent `publication_reviewer` sub-agent. This is an editorial assessment of the actual drafts and evidence, not a prediction of traffic, stars, platform recommendation or awards. The reviewer did not operate the user's browser or publish anything.

## Gate and evidence

- Total must be **at least 90/100**; every dimension must reach **at least 80%** of its maximum. A factual error, fabricated experience/result or unresolved applicable platform prohibition blocks publication regardless of total.
- Weights: technical accuracy 30; practical value/reproducibility 25; title/structure/readability 20; platform fit 15; trust/sourcing/compliance 10. Practical-value expectations are adapted to the medium: a short X post should offer a concrete finding and a direct way to try it, rather than contain a complete long-form tutorial.
- Read `src/lab.ts`, `tests/lab.test.ts`, README, VERIFICATION, LAUNCH and the platform-check record. Independently reran the project's test suite: **9 passed, 0 failed**.
- Independently extracted both executable `mjs` code blocks from the CSDN draft and ran them against the installed **Zod 3.25.76 / 4.6.7** packages. The four reproduction output lines matched the article exactly; both PATCH assertion suites passed.
- Additionally verified the original schema's empty-object, missing-a and full-a/b controls, and the no-default PATCH schema's omission-preserving behavior in both packages. No actual database operation was performed or claimed.
- A fresh reviewer-side request to the official migration page returned **HTTP 403**. Its current anchors/text were **not independently reverified** in this review; historical project verification and the real-package executions remain the technical evidence. This limitation is recorded rather than treated as a successful source check.
- Platform observations are supplied in `PLATFORM-CHECKS.md`: X authenticity policy read; CSDN official content rules pending inspection, and creator login needs renewal.

Reviewed input SHA-256 values:

```text
CSDN.md 222ae48eebec70909ea861dfd24ebe522b0388a72dfcbed641b049071b4727cd
X.txt    ebfec5762a4de9d03f01ea0e830ae0d63cc45f55ab29be3fabbe565c194c8d6d
```

Changes to substantive claims or wording after this review require another review. Platform metadata, tags and images must still truthfully match the approved copy.

## CSDN article — round 1

Title: Zod 3 升 4：校验都通过，PATCH 却可能多写字段——真实复现与迁移检查

| Dimension | Score | Evidence and deductions |
| --- | ---: | --- |
| Technical accuracy | **30/30** | Exact releases, actual schema/inputs/outputs, independent execution, and a correct non-default PATCH alternative. “可能” and the direct-parsed-data-write condition prevent an unsupported claim about all applications or databases. Null, missing fields and JSON/undefined are distinguished. |
| Practical value / reproducibility | **24/25** | Runnable setup and two standalone scripts; a concrete simulated update consequence, empty/full controls, a business-scope table and an actionable migration checklist. The remaining point reflects intentionally untested real-ORM integration, which is disclosed rather than fabricated. |
| Title / structure / readability | **18/20** | Specific, conditional title; result-first opening; real picture before implementation details; progressive reasoning from behavior to business assertion. Scope caveats and closing tool descriptions are somewhat repetitive but do not obstruct understanding. |
| Platform fit | **12/15** | AI assistance disclosed, technical value precedes the project links, no fabricated accident or award. **Current CSDN content/AI rules and the actual publication UI remain unverified**; this score is provisional, not platform clearance. |
| Trust / sourcing / compliance | **8/10** | Real-package output, genuine image provenance, official/issue/project references and explicit limits. Deductions reflect pending CSDN rule verification and the reviewer-side 403 on the official guide, not a discovered false claim. |
| **Total** | **92/100** | Every numerical dimension reaches 80%; no technical hard error found. |

**Content gate: passed. Publication gate: HOLD — not cleared to publish yet.** Numerical quality cannot substitute for applicable platform rules. Complete CSDN's official-rule inspection, resolve the creator login, and use any required AI disclosure/type setting before publication. If a rule prohibits this material, do not publish it merely because it scored 92.

Optional, nonblocking polish: remove one repeated scope disclaimer near the final tool paragraph if the editor preview feels long. Keep the early disclosure, database simulation condition, business-specific mitigation boundary and final verification scope. Do not remove those for a more sensational headline.

## X short post — round 1

Opening: “A Zod upgrade can pass validation—and still change a PATCH.” The actual draft contains **242 Unicode code points** and one demo URL, with the existing genuine two-result image planned as the attachment.

| Dimension | Score | Evidence and deductions |
| --- | ---: | --- |
| Technical accuracy | **29/30** | Exact versions, the relevant default/partial combination and observed changed output. “Can” is appropriately conditional. The short format does not reproduce the complete default-bearing schema in text; the genuine attached result and linked fixed case supply context. |
| Practical value / reproducibility | **23/25** | A concrete small JSON input plus a one-click live reproduction; no account/install barrier. Full reproduction and references are one click away in the demo rather than inside the post. |
| Title / structure / readability | **19/20** | Immediate technical tension, precise versioned example and one relevant action. “The upgrade passes validation” is slightly metonymic; readers understand the intended input-validation comparison from the next line. |
| Platform fit | **14/15** | One authorized post on the observed X account, no bulk/duplicative posting, mentions, irrelevant hashtags or engagement manipulation. The inspected authenticity policy does not identify a blocker for this particular truthful technical post. Publication preview must still fit and include the planned real attachment. |
| Trust / sourcing / compliance | **9/10** | Real image and verified direct demo destination; no unsupported incident, benchmark, adoption, award or reach claim. The small post relies on the linked example for source details. |
| **Total** | **94/100** | Every dimension exceeds 80%; no factual or applicable-policy blocker identified for this post. |

**Content gate: passed. Publication gate: passed for the reviewed X copy with the genuine result screenshot on the authorized account.** Verify the rendered post preview and publish only once. After posting, record the actual URL; do not infer success from clicking the button alone.

Optional, nonblocking polish: “Both Zod versions validate the input—yet a PATCH can change.” is marginally more literal, but changing to it is not necessary to pass. If the author changes the draft substantively, resubmit it rather than assuming this hash-level review applies.

## Publication claims the review does not support

The scores do not establish “top-tier”, award-winning quality or guaranteed high views. The review does not certify all CSDN/X rules, future policy changes, every Zod version, production database behavior or the reader's project compatibility. No post is claimed to have been published by this report.


## CSDN article — round 2, final gate update (2026-11-14)

Reviewed title: **Zod 3 升 4 实测：校验都通过，解析结果多出字段——PATCH 迁移与回归测试**

The round-1 record above remains intact; its HOLD described the evidence state at that time. This round supersedes that HOLD for the exact revised draft identified below.

### New evidence and rechecks

- Read the appended **Final CSDN rule/UI verification** section in `PLATFORM-CHECKS.md`. The publishing agent directly inspected CSDN's official rules in Chrome and the authenticated user's actual editor; I reviewed that recorded evidence without operating the browser myself.
- The recorded rules prohibit exaggerated/deceptive titles, incomplete technical material used as a sales funnel, bulk low-value/duplicate content, infringement and artificial traffic. The revised descriptive/test-scoped title, full runnable tutorial, genuine owned screenshot, primary citations, no sales/contact diversion and single-post scope do not exhibit those prohibited behaviors.
- The actual editor supports the declaration **部分内容由AI辅助生成**, and the publishing agent reports it selected. The body also clearly discloses AI assistance. This is specific evidence for this declared technical article, not a blanket finding that CSDN permits every AI-generated text.
- The existing user-owned tab reached the authenticated editor. The previous generic-route login assumption was corrected in the platform record. The requested destination remains **dear zxc / qq_73599840**; no alternate account is authorized by this review.
- Independently extracted and reran both complete code blocks from the revised file. Their exact four reproduction lines and two PATCH assertion-success lines again matched the article.
- The body still distinguishes simulated object merging from a real database incident and preserves the business-specific scope of no-default PATCH schemas. It does not claim a vulnerability, automatic compatibility verification, contest entry, award or guaranteed traffic.

Reviewed SHA-256 values:

```text
CSDN.md b46e032e14ade3ea941741f110ffe9c1162aae9690f2bfba72cb4456cd9e0445
X.txt    ebfec5762a4de9d03f01ea0e830ae0d63cc45f55ab29be3fabbe565c194c8d6d
```

| Dimension | Round 2 score | Why it changed or stayed |
| --- | ---: | --- |
| Technical accuracy | **30/30** | No new technical claim was introduced by the title; both executable examples independently passed again. Exact package/schema/input scope remains explicit. |
| Practical value / reproducibility | **24/25** | Reproduction, actual-output comparison, scoped mitigation, regression checks and checklist remain complete; a real ORM integration is correctly left to the reader's application. |
| Title / structure / readability | **18/20** | The revised title is straightforward and test-scoped. The result-first structure remains strong; the earlier minor repetition remains, so this dimension is not raised merely to approve publication. |
| Platform fit | **14/15** | Raised from 12 because the actual current rules and authenticated publication UI have now been inspected, with supported AI declaration selected. One point remains for the need to verify the final rendered/public artifact and any platform-side review outcome. |
| Trust / sourcing / compliance | **9/10** | Raised from 8 because the concrete CSDN rule/AI-declaration uncertainty is resolved for this article. Genuine image, source citations and limits remain clear; reviewer-side inability to freshly fetch the official Zod guide is still recorded above. |
| **Total** | **95/100** | All dimensions exceed 80%; no factual or known applicable-rule hard blocker identified. |

**Content gate: PASSED. Publication gate: PASSED — round-1 HOLD released for this revised CSDN draft on the authorized account.** This decision follows new rule/UI evidence and an independent content/code recheck, not score inflation or an exception to the gate.

Publish only this intended technical article, keep the explicit AI-assisted declaration, use the genuine relevant image, keep access free/public, leave GitCode backup off and multi-platform publication No, and do not enroll it in unrelated contests or paid programs. Verify the rendered preview before submitting. After submission, distinguish “submitted/pending review” from a publicly readable publication and record the actual final URL/state.

The X file hash is unchanged from the prior approved draft; its **94/100** approval remains valid with the planned genuine screenshot and the authorized X account. This review still does not guarantee readership, platform recommendation or awards.
