# Zod Upgrade Gotchas

**两边都校验通过，并不意味着解析后的数据相同。**

把 Zod 3 升级到 Zod 4 时，最容易漏掉的变化有时不是报错，而是 `safeParse` 返回了不同的数据。这个小工具把三个值得单独检查的变化放在一起：用真实的 Zod 包运行固定 schema，修改 JSON 后并排查看结果，并生成可在 Node.js 中运行的复现代码。

**[打开在线示例](https://fightjs.github.io/zod-upgrade-gotchas/#case=default-partial)** · [三个案例](#三个案例) · [本地运行](#本地运行) · [如何贡献案例](#贡献案例)

![页面实际运行结果：两个版本均通过校验，但 Zod 4 的结果多出了默认字段 a](docs/images/default-partial-results.png)

上图是实际页面截图的裁剪。输入为 `{"b":"changed"}`：Zod 3 返回原有的 `b`，Zod 4 还返回了默认值 `a`。如果后续代码直接把解析结果写入数据库，这个差异就值得在升级前检查。它是否影响业务，仍取决于你的写入逻辑。

## 三分钟了解它能做什么

1. [打开在线页面](https://fightjs.github.io/zod-upgrade-gotchas/)，选择一个案例。页面会先运行该案例的默认输入。
2. 修改 JSON，点击 **Run both versions**，查看两个版本各自返回的数据或原始 `issues`。
3. 使用 **Copy reproduction code** 复制复现代码，在自己的 Node.js 环境中运行；复制内容包含最后一次运行的输入和固定版本。
4. 使用 **Share case** 分享案例入口。链接只包含案例编号，**不包含你编辑的输入或结果**；接收者看到的是该案例的默认输入。

页面中运行的是真实 npm 包 **Zod 3.25.76** 和 **Zod 4.6.7**，通过 npm 别名分别安装。每次运行时，两边各自构造 schema，并接收独立的输入副本。页面不支持自由输入 schema、切换版本或扫描项目，也不能代替项目级兼容性测试。

## 三个案例

以下结果来自固定版本和表中输入；点击案例名称可打开对应页面。两个版本的错误信息直接展示，不做错误码归一化。

| 案例 | 输入 | Zod 3.25.76 | Zod 4.6.7 |
| --- | --- | --- | --- |
| [默认值与 partial](https://fightjs.github.io/zod-upgrade-gotchas/#case=default-partial) | `{"b":"changed"}` | 通过，返回 `{"b":"changed"}` | 通过，返回 `{"a":"a","b":"changed"}` |
| [安全整数边界](https://fightjs.github.io/zod-upgrade-gotchas/#case=integer-range) | `9007199254740992` | 通过 | 失败：超过安全整数上限 |
| [枚举键 record](https://fightjs.github.io/zod-upgrade-gotchas/#case=enum-record) | `{"a":1}` | 通过 | 失败：缺少键 `b` |

### 1. `.partial()` 中的默认值

```js
z.object({
  a: z.string().default('a'),
  b: z.string().default('b')
}).partial()
```

对 `{"b":"changed"}`，两个版本都通过；v4 会为缺失的 `a` 填入默认值。可再输入 `{"a":"x","b":"y"}` 作为对照：两个版本的返回值相同。

**升级时检查：** 解析结果是否被用于 PATCH、合并更新或生成写入对象。先看实际写入逻辑，再决定是否需要调整 schema。背景可参阅 [Zod issue #6627](https://github.com/colinhacks/zod/issues/6627)。

### 2. 整数不一定是安全整数

```js
z.number().int()
```

`9007199254740992` 是整数，但超过 `Number.MAX_SAFE_INTEGER`。在本工具固定的版本中，v3 接受它，v4 拒绝它；`42` 则在两边都通过。

JSON 数字在 JavaScript 中使用 IEEE-754 双精度表示，任意大十进制整数本身就无法保证无损。这里比较的是两个版本对已解析数字的行为，不提供大整数精度修复。参阅 [Zod 4 迁移说明：number](https://zod.dev/v4/changelog#znumber)。

### 3. 枚举键需要完整出现

```js
z.record(z.enum(['a', 'b']), z.number())
```

输入 `{"a":1}` 时，v3 接受缺失的 `b`，v4 要求枚举中的键全部存在。将输入改为 `{"a":1,"b":2}`，两个版本均通过。参阅 [Zod 4 迁移说明：record](https://zod.dev/v4/changelog#zrecord)。

## 输入、隐私与边界

- 可编辑的是 **JSON 数据**，不是 JavaScript 或 schema。输入上限为 UTF-8 编码后 20 KiB，最多 20 层对象/数组；非法 JSON 和非有限数值不会进入 Zod。
- 修改输入后，旧结果会清空，需要重新运行才能复制复现代码。某一侧执行异常时会显示 **Incomplete**，不把异常当作两个版本结果相同。
- 输入和结果只在当前页面处理，不上传、不持久化。页面使用文本方式展示结果，不执行输入中的代码。
- 剪贴板不可用时，页面提供可手动复制的只读文本框；浏览器剪贴板通常要求 HTTPS 或 localhost。
- 三个案例是有边界的参考，不代表完整迁移清单，也不证明你的项目存在缺陷。请对自己的 schema、数据和写入路径补充测试。

## 本地运行

建议使用 Node.js 22 和 npm。首次安装依赖需要网络。

```bash
git clone https://github.com/FightJs/zod-upgrade-gotchas.git
cd zod-upgrade-gotchas
npm ci
npm run dev
```

打开终端输出的本地地址。其他常用命令：

```bash
npm test          # 运行真实版本及复现代码等测试
npm run check     # TypeScript 检查
npm run build     # 构建静态文件到 dist/
npm run preview   # 预览生产构建
```

依赖版本由 `package.json` 和 `package-lock.json` 固定。项目使用 Vite、TypeScript 和原生 DOM；两个 Zod 版本是独立安装的包，并非把 v4 包的 `/v3` 入口当作另一个版本。

## 验证与延伸阅读

2026-11-13 的发布验收覆盖了真实包运行、三个默认案例及对照输入、复制复现代码、固定案例链接和 Chromium 窄屏交互。具体环境、结果与未覆盖的浏览器列在 [VERIFICATION.md](VERIFICATION.md)；部署方式见 [DEPLOYMENT.md](DEPLOYMENT.md)。验证记录是当时的结果，并非对所有浏览器或未来版本的保证。

- [默认值案例的中文技术文章](https://blog.csdn.net/qq_73599840/article/details/170767797)
- [三个案例的来源与固定实现](src/lab.ts)
- [在线应用](https://fightjs.github.io/zod-upgrade-gotchas/) · [问题反馈](https://github.com/FightJs/zod-upgrade-gotchas/issues)

## 贡献案例

欢迎提交能独立复现的升级差异。请在 issue 中附上：官方文档或相关 issue、确切版本、最小 schema、JSON 输入、两个版本的实际返回值，以及一个结果相同的对照输入。先确认行为，再讨论是否加入页面；一个有证据的小案例比未经验证的长清单更有用。

## 许可证

本项目使用 [MIT License](LICENSE)。第三方依赖保留各自的许可证和版权声明；Zod 的相关声明见 [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md)。
