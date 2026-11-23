# 个人求职网站

一个用 **Markdown 编写内容**、由 **VitePress 生成静态页面**、用 **Git 管理版本**的个人网站。
用于找实习 / 求职时展示个人介绍、学习进度、项目作品和联系方式。

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
> `pnpm-workspace.yaml` 中写了 `allowBuilds: { esbuild: false }`（已配置好，改依赖时别删）。

## 我要改什么？

| 想改的内容 | 打开这个文件 |
| --- | --- |
| 首页的姓名、标题、项目卡片 | `docs/index.md` |
| 自我介绍、技能与学习进度、学习路线 | `docs/about.md` |
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
│  ├─ index.md                      # 首页（hero + 项目计划 + 概览表）
│  ├─ about.md                      # 关于我
│  ├─ resume.md                     # 简历（学生版）
│  ├─ contact.md                    # 联系我
│  ├─ projects/
│  │  ├─ index.md                   # 项目总览
│  │  └─ template.md                # 项目详情模板（复制它新增项目）
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
git commit -m "content: 更新项目进度"
git push
```

提交信息前缀约定：`content:` 内容、`style:` 样式、`feat:` 新功能、`fix:` 修复、`chore:` 杂项。

## 用 Git 管理并部署（当前采用的方式）

这个网站的**内容、样式、配置全部在 Git 仓库里**，线上站点由 Git 仓库直接发布，
没有手工上传、没有服务器，改动都有提交记录可查。

### 仓库结构

| 位置 | 作用 | 是否手改 |
| --- | --- | --- |
| `docs/*.md` | **唯一内容来源**，五个页面都是 Markdown | ✅ 改这里 |
| `docs/.vitepress/` | 导航、配色、组件等配置 | ✅ 需要调样式时改 |
| 根目录 `*.html`、`assets/` | 构建产物，GitHub Pages 发布的对象 | ❌ 不要手改 |
| `.nojekyll` | 告诉 GitHub 不要用 Jekyll 处理，按静态文件原样发布 | ❌ |

### 更新流程（三步）

```bash
# 1. 改 Markdown 后重新构建，并把产物同步到仓库根目录
pnpm deploy

# 2. 提交（内容与产物一起进版本库）
git add -A
git commit -m "content: 更新项目进度"

# 3. 推送，GitHub Pages 自动重新发布（约 1 分钟）
git push
```

`pnpm deploy` = `pnpm build` + `node scripts/publish-root.mjs`，脚本会把
`docs/.vitepress/dist` 的内容复制到仓库根目录并写入 `.nojekyll`。

### 第一次把仓库推上 GitHub

1. 新建仓库，名字用 `你的用户名.github.io`（这样网址是 `https://你的用户名.github.io`）；
2. 配置 SSH 密钥（`ssh-keygen` 生成，公钥加到 GitHub → Settings → SSH and GPG keys）；
3. 推送：

   ```bash
   git remote add origin git@github.com:你的用户名/你的用户名.github.io.git
   git branch -M main
   git push -u origin main
   ```

4. 仓库 **Settings → Pages**，Source 保持 **Deploy from a branch**，分支 `main`、目录 `/ (root)`。

### 另一种方式：GitHub Actions 自动构建

仓库里也带了 `.github/workflows/deploy.yml`（用 pnpm 构建后发布 artifact）。
要改用它，需要把 **Settings → Pages → Source** 切成 **GitHub Actions**，
并把工作流的触发条件从手动改回 `on: push`。两种方式**只能选一种**，否则会互相覆盖。

### 本项目已经上线的记录

- 仓库：<https://github.com/Chaijie0310/Chaijie0310.github.io>
- 站点：<https://chaijie0310.github.io>
- 首次提交：`dd80e48`（初始化），后续按 `content:` / `style:` / `build:` 前缀分次提交

## 其他部署方式

`pnpm build` 生成的 `docs/.vitepress/dist` 是纯静态文件，可以直接丢到
Vercel、Netlify、Cloudflare Pages 或任意静态服务器；构建命令 `pnpm build`，
输出目录 `docs/.vitepress/dist`。

## 上线前检查清单

- [ ] 全局搜索替换剩下的占位内容（`yourname`、`【待填写】`、`待补充`；姓名、学校、专业、年级、邮箱、手机已填好）
- [ ] 把真实头像放到 `docs/public/avatar.jpg`，并把 `config.mts` 的 `logo` 与首页 `hero.image.src` 改成 `/avatar.jpg`
- [ ] `docs/.vitepress/config.mts` 里的 `description`、`socialLinks` 改成自己的
- [ ] 检查「技能与学习进度」表：不会的删掉，只写真实水平
- [ ] 打印一份简历 PDF，检查分页是否正常
- [ ] 手机打开一遍，确认导航和卡片排版没问题
- [ ] 确认没有把不想公开的信息（身份证号、家庭住址）写进仓库
