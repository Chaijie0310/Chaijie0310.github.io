# 内容编写指南

这个网站的内容全部是 Markdown 文件，放在 `docs/` 目录下。改文字不需要懂前端，只要会写 Markdown 就行；
改完存盘，本地预览会立刻刷新。

## 各文件的用途

| 文件 | 对应页面 | 主要改什么 |
| --- | --- | --- |
| `docs/index.md` | 首页 | 姓名、标题、一句话介绍、精选项目卡片、快速了解表格 |
| `docs/about.md` | 关于我 | 自我介绍、技能栈、工作经历时间线、教育背景 |
| `docs/resume.md` | 简历 | 完整的结构化简历，支持打印成 PDF |
| `docs/contact.md` | 联系我 | 邮箱、手机、微信、社交主页、沟通说明 |
| `docs/projects/index.md` | 项目总览 | 所有项目卡片 |
| `docs/projects/*.md` | 项目详情 | 每个项目一页：背景、方案、结果、复盘 |
| `docs/.vitepress/config.mts` | 站点配置 | 站名、导航菜单、侧边栏、页脚、社交链接 |
| `docs/public/` | 静态资源 | 头像 `avatar.svg`、`favicon.svg`，放这里会被复制到网站根目录 |

## 上线前请替换的占位内容

姓名（柴杰）和邮箱（3194089001@qq.com）已经填好了。剩下这些还是示例数据，搜索下面的关键词逐个替换：

| 搜索 | 替换为 | 出现位置 |
| --- | --- | --- |
| `138-0000-0000` / `待填写` | 你的手机、微信号 | 简历、联系 |
| `yourname` | 你的 GitHub / 领英用户名 | 配置里的 socialLinks、项目卡片 repo |
| `某某科技` / `某某网络科技` / `某某大学` | 真实公司、学校 | 关于、简历、首页 |
| `上海` | 你的城市 | 首页、关于、简历、联系 |
| `6 年` / `2019` | 你的年限与起止时间 | 首页、关于、简历 |

::: tip 用编辑器的全局搜索
VS Code 里按 `Ctrl + Shift + F`，在 `docs` 目录内全局搜索上面的词，逐个替换最省事。
:::

## 本地预览

```bash
pnpm install     # 第一次需要
pnpm dev         # 本地预览，默认 http://localhost:5173
pnpm build       # 构建静态文件到 docs/.vitepress/dist
pnpm preview     # 预览构建结果
```

## 新增一个项目

1. 复制 `docs/projects/sample-project.md`，改成 `docs/projects/my-project.md`；
2. 把内容换成你的项目，**保留原来的五段结构**（背景 / 角色 / 方案 / 结果 / 复盘）；
3. 在 `docs/projects/index.md` 的卡片网格里加一张卡片：

```md
<ProjectCard
  title="项目名"
  status="已上线"
  summary="一句话说清做了什么、结果如何（带数字最好）。"
  tags="Vue, TypeScript, Node.js"
  link="/projects/my-project"
  repo="https://github.com/yourname/my-project"
/>
```

4. 把新页面加到侧边栏 `docs/.vitepress/config.mts` 的 `sidebar['/projects/']` 里，
   这样详情页也会有上一篇 / 下一篇和目录。

::: warning 链接不带 .md
站内链接写 `/projects/my-project`，不要写 `/projects/my-project.md`。配置里开启了 `cleanUrls`，
构建后会自动生成不带后缀的路径。
:::

## 换配色

打开 `docs/.vitepress/theme/custom.css`，改开头几个变量的色值即可：

```css
:root {
  --vp-c-brand-1: #2563eb;  /* 主色：链接、按钮、强调 */
  --vp-c-brand-2: #3b82f6;
  --vp-c-brand-3: #60a5fa;
}
```

## 导出简历 PDF

打开 `/resume` 页面，按 `Ctrl + P`（macOS `Cmd + P`）→ 目标打印机选「另存为 PDF」。
打印样式已经隐藏了导航栏和侧边栏，导出的就是一份干净的简历。

## 用 Git 管理你的修改

```bash
git add -A
git commit -m "content: 更新工作经历"
git push
```

建议的提交前缀（写清楚改了哪一类内容，以后回看很方便）：

| 前缀 | 用途 |
| --- | --- |
| `content:` | 改文字、加项目、更新经历 |
| `style:` | 改配色、排版、样式 |
| `feat:` | 加新页面、新功能 |
| `fix:` | 修错别字、坏链接 |
| `chore:` | 依赖、配置、部署 |

## 常见问题

**改完页面没变化？** 本地 `pnpm dev` 开着时会自动热更新；如果没反应，刷新浏览器，
或重启 `pnpm dev`。

**构建报错找不到页面？** 检查链接是否写成了 `.md` 结尾，以及文件是不是放在了 `docs/` 下面。

**想加文章 / 博客？** 新建 `docs/blog/` 目录，每篇一个 `.md`，然后在 `config.mts` 的 `nav`
和 `sidebar` 里加一项即可，写法和项目页完全一样。
