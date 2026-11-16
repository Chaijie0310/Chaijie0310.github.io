# 个人求职网站

一个用 **Markdown 编写内容**、由 **VitePress 生成静态页面**、用 **Git 管理版本**的个人网站。
用于求职时展示个人介绍、工作经历、项目作品和联系方式。

- 全站内容都是 `docs/` 下的 Markdown 文件，不需要写前端代码就能更新
- 自带暗色模式、站内搜索、移动端适配
- 简历页可直接在浏览器里打印成 PDF 投递
- 一条命令本地预览，推送到 GitHub 即自动部署到 GitHub Pages

## 快速开始

需要 Node.js 20+ 和 pnpm（本项目用 pnpm 11 测试通过）。

```bash
pnpm install     # 安装依赖
pnpm dev         # 本地预览：http://localhost:5173
pnpm build       # 构建静态站点到 docs/.vitepress/dist
pnpm preview     # 预览构建结果
```

> 如果 `pnpm install` 报 `Ignored build scripts: esbuild`，确认仓库里的
> `pnpm-workspace.yaml` 中存在 `onlyBuiltDependencies: [esbuild]`（已配置好，改依赖时别删）。

## 我要改什么？

| 想改的内容 | 打开这个文件 |
| --- | --- |
| 首页的姓名、标题、精选项目 | `docs/index.md` |
| 自我介绍、技能、工作经历 | `docs/about.md` |
| 简历（可打印 PDF） | `docs/resume.md` |
| 邮箱、手机、微信、社交链接 | `docs/contact.md` |
| 项目列表 | `docs/projects/index.md` |
| 某个项目详情 | `docs/projects/*.md` |
| 站名、导航、侧边栏、页脚 | `docs/.vitepress/config.mts` |
| 配色、卡片、时间线样式 | `docs/.vitepress/theme/custom.css` |

详细的替换清单和写法说明见 **[内容编写指南](docs/guide/writing.md)**。

## 目录结构

```
personal-site/
├─ docs/                            # 所有内容都在这里
│  ├─ index.md                      # 首页（hero + 精选项目 + 概览表）
│  ├─ about.md                      # 关于我
│  ├─ resume.md                     # 简历
│  ├─ contact.md                    # 联系我
│  ├─ projects/
│  │  ├─ index.md                   # 项目总览
│  │  └─ sample-project.md          # 项目详情模板（复制它新增项目）
│  ├─ guide/writing.md              # 内容编写指南
│  ├─ public/                       # 静态资源：头像、favicon、简历 PDF
│  └─ .vitepress/
│     ├─ config.mts                 # 站点配置：导航、侧边栏、SEO、页脚
│     └─ theme/
│        ├─ index.ts                # 注册自定义组件
│        ├─ ProjectCard.vue         # 项目卡片组件
│        └─ custom.css              # 配色与排版
├─ .github/workflows/deploy.yml     # GitHub Pages 自动部署
├─ pnpm-workspace.yaml              # pnpm 安装设置（扁平 node_modules、跳过 esbuild 脚本）
└─ package.json
```

## Git 工作流

首次提交后，日常改动就三步：

```bash
git add -A
git commit -m "content: 更新某某项目的结果数据"
git push
```

提交信息前缀约定：`content:` 内容、`style:` 样式、`feat:` 新功能、`fix:` 修复、`chore:` 杂项。

## 部署到 GitHub Pages

仓库里已经带了 `.github/workflows/deploy.yml`，流程是：

1. 在 GitHub 新建仓库（例如 `personal-site` 或 `yourname.github.io`），把本地仓库推上去：

   ```bash
   git remote add origin git@github.com:yourname/personal-site.git
   git branch -M main
   git push -u origin main
   ```

2. 仓库 **Settings → Pages → Build and deployment**，Source 选 **GitHub Actions**；
3. 之后每次 push 到 `main`，工作流会自动构建并发布。

工作流会根据仓库名自动设置 `base`：

- 仓库名是 `yourname.github.io` → 站点根路径为 `/`，地址 `https://yourname.github.io`
- 其他仓库名 → 自动使用 `/<仓库名>/` 前缀，地址 `https://yourname.github.io/<仓库名>/`

本地手动构建对应项目仓库时，用 `BASE=/personal-site/ pnpm build`（PowerShell 下：
`$env:BASE="/personal-site/"; pnpm build`）。

## 其他部署方式

`pnpm build` 生成的 `docs/.vitepress/dist` 是纯静态文件，可以直接丢到
Vercel、Netlify、Cloudflare Pages 或任意静态服务器；构建命令 `pnpm build`，
输出目录 `docs/.vitepress/dist`。

## 上线前检查清单

- [ ] 全局搜索替换剩下的示例数据（`yourname`、`某某科技`、`某某大学`、`6 年`；姓名、邮箱、手机号已填成你的）
- [ ] 把真实头像放到 `docs/public/avatar.jpg`，并把 `config.mts` 的 `logo` 与首页 `hero.image.src` 改成 `/avatar.jpg`
- [ ] `docs/.vitepress/config.mts` 里的 `title`、`description`、`socialLinks` 改成自己的
- [ ] 打印一份简历 PDF，检查分页是否正常
- [ ] 手机打开一遍，确认导航和卡片排版没问题
- [ ] 确认没有把不想公开的信息（身份证号、现公司内部数据）写进仓库
