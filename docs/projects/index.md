# 项目作品

这里是我参与过、或者自己做的项目。每个项目我都尽量写清楚四件事：**背景是什么、我做了什么、
结果如何（尽量量化）、以及如果重做会怎么改** —— 我认为这比罗列技术名词更能说明问题。

<div class="card-grid">

<ProjectCard
  title="订单中心服务重构"
  status="已上线"
  summary="把单体订单模块拆成 4 个服务，P99 从 850ms 降到 220ms，大促零故障。"
  tags="Java, Spring Cloud, MySQL, Redis, Kafka"
  link="/projects/sample-project"
  repo="https://github.com/yourname/order-service"
/>

<ProjectCard
  title="内部数据看板"
  status="已上线"
  summary="运营自助分析看板，覆盖 12 个业务线，报表产出从 2 天到 10 分钟。"
  tags="Vue 3, TypeScript, ECharts, Node.js"
  link="/projects/sample-project"
/>

<ProjectCard
  title="Vue 业务组件库"
  status="维护中"
  summary="26 个业务组件 + 完整文档站，GitHub 480 star，3 个团队接入。"
  tags="Vue, Vite, Rollup, Vitest"
  link="/projects/sample-project"
  repo="https://github.com/yourname/ui-kit"
/>

<ProjectCard
  title="个人博客生成器"
  status="已完成"
  summary="Markdown 写内容、自己写的静态生成脚本，构建耗时 3 秒，部署零成本。"
  tags="Node.js, Markdown, GitHub Actions"
  link="/projects/sample-project"
  repo="https://github.com/yourname/blog-kit"
/>

</div>

## 怎么读这些项目

每个项目详情页都按同一个结构写，方便你快速定位感兴趣的部分：

| 部分 | 你会看到什么 |
| --- | --- |
| 背景与目标 | 当时的业务处境、要解决的问题、成功标准 |
| 我的角色 | 我具体负责哪部分，团队规模和协作方式 |
| 技术方案 | 关键取舍，以及为什么这么选（含被否掉的方案） |
| 结果 | 尽量量化的产出：性能、成本、效率、稳定性 |
| 复盘 | 哪些做对了、哪些现在看会改 |

## 想加一个新项目？

复制 `docs/projects/sample-project.md` 改个名字即可，具体步骤见
[内容编写指南](/guide/writing#新增一个项目)。卡片和详情页都用 Markdown 写，不需要动代码。
