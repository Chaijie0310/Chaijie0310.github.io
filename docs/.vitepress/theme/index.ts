import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import ProjectCard from './ProjectCard.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // 在任意 .md 里可直接使用 <ProjectCard ... />
    app.component('ProjectCard', ProjectCard)
  },
} satisfies Theme
