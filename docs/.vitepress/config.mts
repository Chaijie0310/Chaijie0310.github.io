import { defineConfig } from 'vitepress'

// 部署到 GitHub Pages 的用户/组织主页仓库（如 yourname.github.io）时保持 base = '/'。
// 若部署到项目仓库（如 github.com/yourname/my-site），请把 base 改成 '/my-site/'。
// 也可以在构建时用环境变量覆盖：BASE=/my-site/ pnpm build
const base = process.env.BASE ?? '/'

export default defineConfig({
  lang: 'zh-CN',
  title: '柴杰',
  titleTemplate: ':title · 柴杰的个人网站',
  description: '柴杰的个人网站：四川传媒学院计算机科学与技术专业在读，前端 / Web 开发方向，寻找前端开发实习机会。',

  base,
  cleanUrls: true,
  lastUpdated: true,

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: `${base}favicon.svg` }],
    ['meta', { name: 'author', content: '柴杰' }],
    ['meta', { name: 'theme-color', content: '#2563eb' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: '柴杰 · 个人网站' }],
    ['meta', { property: 'og:description', content: '教育背景、工作经历、项目作品与联系方式。' }],
  ],

  markdown: {
    // 允许在 Markdown 里直接写 HTML（时间线、卡片等排版都能用）
    html: true,
  },

  vite: {
    server: {
      watch: {
        // 编辑器和工具保存文件时会先写临时文件再改名，监听它们可能抛 EBUSY
        // 直接让开发服务器退出，这里统一忽略
        ignored: ['**/.*.tmpdir/**', '**/*.tmp', '**/*.swp', '**/*~'],
      },
    },
  },

  themeConfig: {
    logo: '/avatar.svg',

    nav: [
      { text: '首页', link: '/' },
      { text: '关于我', link: '/about', activeMatch: '/about' },
      { text: '项目', link: '/projects/', activeMatch: '/projects' },
      { text: '简历', link: '/resume', activeMatch: '/resume' },
      { text: '联系我', link: '/contact', activeMatch: '/contact' },
    ],

    sidebar: {
      '/guide/': [
        {
          text: '使用说明',
          items: [{ text: '内容编写指南', link: '/guide/writing' }],
        },
      ],
      '/projects/': [
        {
          text: '项目',
          items: [
            { text: '项目总览', link: '/projects/' },
            { text: '项目详情模板', link: '/projects/template' },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/yourname' },
      { icon: 'x', link: 'https://x.com/yourname' },
      { icon: 'linkedin', link: 'https://www.linkedin.com/in/yourname' },
    ],

    search: {
      provider: 'local',
      options: {
        translations: {
          button: { buttonText: '搜索', buttonAriaLabel: '搜索' },
          modal: {
            noResultsText: '没有找到相关内容',
            resetButtonTitle: '清除查询条件',
            footer: {
              selectText: '选择',
              navigateText: '切换',
              closeText: '关闭',
            },
          },
        },
      },
    },

    outline: { level: [2, 3], label: '本页目录' },

    docFooter: { prev: '上一篇', next: '下一篇' },
    lastUpdated: { text: '最后更新于' },
    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '外观',
    lightModeSwitchLabel: '浅色',
    externalLinkIcon: true,

    footer: {
      message: '用 Markdown 编写 · VitePress 生成 · Git 管理',
      copyright: '© 2026 柴杰',
    },
  },
})
