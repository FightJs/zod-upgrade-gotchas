# Publication results — 2026-11-14

One CSDN article and one English X post were published through the user's existing Chrome sessions, with explicit user authorization and independent review before the final publish actions.

| Destination | Account | Actual permalink | State observed |
| --- | --- | --- | --- |
| CSDN | dear zxc / qq_73599840 | https://blog.csdn.net/qq_73599840/article/details/170767797 | Submission page first said 发布成功！正在审核中. The actual article page subsequently rendered the correct title/body/image and displayed 公开. No separate manual-review notification was received. |
| X | Dearzxc / @Dearzxcte | https://x.com/Dearzxcte/status/2121431356874097064 | Actual post detail rendered the English text, genuine image, ALT text and Made with AI disclosure. |

## Quality gate actually applied

The user requested an independent sub-agent to score each piece. `publication_reviewer` reviewed actual files and executed their code independently. Gate: ≥90/100, each dimension ≥80%, no factual or applicable-policy hard blocker.

| Draft / round | Accuracy /30 | Utility /25 | Title & readability /20 | Platform fit /15 | Trust & compliance /10 | Total | Decision |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | --- |
| CSDN round 1 | 30 | 24 | 18 | 12 | 8 | 92 | Held pending actual rule/editor evidence |
| CSDN round 2 | 30 | 24 | 18 | 14 | 9 | 95 | Passed after rule/UI evidence; revised descriptive title |
| X round 1 | 29 | 23 | 19 | 14 | 9 | 94 | Passed with genuine result image |

Full review, reasons and exact draft hashes are in [REVIEW.md](REVIEW.md). Scores are editorial judgments, not traffic forecasts, official awards or platform endorsement.

## Verified publishing details

- CSDN title: **Zod 3 升 4 实测：校验都通过，解析结果多出字段——PATCH 迁移与回归测试**. The actual editor counted approximately 4,700 rendered characters. Source is [CSDN.md](CSDN.md).
- Both standalone article scripts were extracted and executed against installed Zod 3.25.76 and 4.6.7 by the publishing agent and independently by the reviewer. Reproduction outputs and PATCH regression assertions passed. The original schema's empty, missing-a and complete-input controls were also verified.
- Before CSDN submission, all **7 rendered editor code blocks matched their verified Markdown source exactly**, including whitespace inside code. The final public article has the corresponding code sections. Post-publication Copy-button behavior was not separately retested.
- The initial raw-GitHub image was replaced because CSDN substituted an external-image placeholder. The genuine existing PNG was pasted through the browser clipboard, uploaded by the editor and rendered at **1088 × 300**, using CSDN's actual asset URL: `https://i-blog.csdnimg.cn/direct/497fdd8f1e384080ad800152e5215138.png`. The public article image was checked loaded at those dimensions.
- CSDN: native declaration **部分内容由AI辅助生成** selected; body also discloses AI assistance and identifies the PATCH update as a simulation. Access set to 全部可见. GitCode backup unchecked; multi-platform posting No. No paid access, activity entry or contest enrollment.
- CSDN tags: zod, typescript, javascript, 前端, 单元测试. A truthful 136-character summary describes the real versions, PATCH condition, separate schema and runnable checks.
- X: posted the reviewed **242-code-point** English [X.txt](X.txt), attached the same real result image, added an English ALT description and enabled X's **Made with AI** content disclosure. No paid-partnership label, mentions, unrelated hashtags, replies or promotional thread were added.
- The browser initially auto-translated the X body to Chinese. The actual post's English original was verified afterward in both browser/native accessibility state and the final screenshot. No duplicate or translated replacement post was sent.
- Extension-based local file upload lacked file-URL access; that permission was not enabled. A native chooser attempt was canceled, and browser clipboard image upload completed successfully without changing browser security settings. Residual chooser was closed.

## Evidence and limits

Browser screenshots were saved locally (ignored output): `output/promotion/csdn-submitted.jpg`, `csdn-public.jpg`, and `x-published.jpg`. The CSDN public-page and X English-post screenshots were visually inspected. User tabs for the two final posts were retained.

The X UI initially showed 1 view; that can include this verification and is **not** evidence of independent readership or promotion effectiveness. No star growth, recommendation, award, independent citation or conversion is claimed. No traffic manipulation, paid promotion, bulk posting, contact with others or statistics system was used. Future moderation, recommendation and readership remain outside this verification.
