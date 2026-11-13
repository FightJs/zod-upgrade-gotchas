# Launch copy

Source repository: https://github.com/FightJs/zod-upgrade-gotchas. No online demo has been deployed. These are unpublished drafts; creating a public repository does not grant an open-source license for this application.

## English community post

**Title: Zod 3 → 4: two passes can still produce different data**

I built Zod Upgrade Gotchas, a small browser lab comparing the actual Zod **3.25.76** and **4.6.7** packages across three fixed schemas:

- Defaults + `.partial()`: `{"b":"changed"}` passes both, but only v4 adds `"a":"a"` to the parsed output.
- `.int()`: `9007199254740992` passes v3; v4 rejects it as outside the safe integer range.
- Enum-key record: `{"a":1}` passes v3; v4 rejects the missing `b` key.

Edit JSON and run both versions side by side. Try the equal-result controls: `{"a":"x","b":"y"}`, `42`, and `{"a":1,"b":2}` respectively. Results come from the packages, not canned responses. Editing clears old results until you rerun.

You can copy a runnable Node reproduction with exact dependencies, or share a fixed case link that opens its default input. JSON stays in browser memory; shared links exclude edits. A hosted copy can be explored directly in the browser without installing Zod.

This is an independent reference for three behaviors, not a compatibility audit of your application. Sources are linked beside each case.

Public demo: pending deployment.
Source repository: https://github.com/FightJs/zod-upgrade-gotchas.
Local checkout: `npm ci` then `npm run dev`.

## 中文技术社区首发帖

**标题：Zod 3 升到 4：校验都通过，返回的数据也可能不同**

做了一个小型浏览器实验室 Zod Upgrade Gotchas，实际运行 **Zod 3.25.76 和 4.6.7**，对照三个具体差异：

- 默认值 + `.partial()`：输入 `{"b":"changed"}`，两边都通过，但 v4 的解析结果多出 `"a":"a"`。
- `.int()`：`9007199254740992` 在 v3 通过，v4 因超出安全整数范围而拒绝。
- 枚举键 record：`{"a":1}` 在 v3 通过，v4 要求补齐 `b`。

可以直接在页面修改 JSON，再运行两版查看原始结果。三个案例分别换成 `{"a":"x","b":"y"}`、`42`、`{"a":1,"b":2}`，两边输出又会一致。结果由真实依赖计算；修改输入后旧结果立即清空，避免误读。

页面可复制带精确依赖版本的 Node 复现代码，也可分享案例链接。分享只带案例 ID，打开后使用默认输入，不包含你的修改。部署后，读者无需安装 Zod 即可在浏览器里试这些边界；输入保留在浏览器内存中。

这只是三个行为的独立对照，不代表你的项目已完成兼容性验证。页面附有官方迁移指南或对应 issue 来源。

在线演示：待部署补充。
源码仓库：https://github.com/FightJs/zod-upgrade-gotchas 。
本地启动：在项目目录运行 `npm ci`、`npm run dev`。
