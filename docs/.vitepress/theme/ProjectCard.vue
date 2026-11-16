<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  title: string
  summary?: string
  /** 逗号分隔，例如 tags="Vue, TypeScript, Node.js" */
  tags?: string
  /** 详情页链接 */
  link?: string
  /** 源码 / 线上地址 */
  repo?: string
  /** 右上角状态，例如 已上线 / 进行中 */
  status?: string
}>()

const tagList = computed(() =>
  (props.tags ?? '')
    .split(',')
    .map((tag) => tag.trim())
    .filter(Boolean),
)
</script>

<template>
  <article class="pc-card">
    <header class="pc-head">
      <a v-if="link" class="pc-title" :href="link">{{ title }}</a>
      <span v-else class="pc-title">{{ title }}</span>
      <span v-if="status" class="pc-status">{{ status }}</span>
    </header>

    <p v-if="summary" class="pc-summary">{{ summary }}</p>

    <ul v-if="tagList.length" class="pc-tags">
      <li v-for="tag in tagList" :key="tag">{{ tag }}</li>
    </ul>

    <footer v-if="link || repo" class="pc-links">
      <a v-if="repo" :href="repo" target="_blank" rel="noreferrer">源码 ↗</a>
      <a v-if="link" :href="link">详情 →</a>
    </footer>
  </article>
</template>

<style scoped>
.pc-card {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px 22px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 14px;
  background: var(--vp-c-bg-soft);
  transition: border-color 0.25s, transform 0.25s, box-shadow 0.25s;
}

.pc-card:hover {
  border-color: var(--vp-c-brand-1);
  transform: translateY(-2px);
  box-shadow: 0 10px 30px -18px var(--vp-c-brand-1);
}

.pc-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
}

.pc-title {
  font-size: 17px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  text-decoration: none;
}

a.pc-title:hover {
  color: var(--vp-c-brand-1);
}

.pc-status {
  flex-shrink: 0;
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 999px;
  color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
}

.pc-summary {
  margin: 0;
  font-size: 14px;
  line-height: 1.7;
  color: var(--vp-c-text-2);
}

.pc-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.pc-tags li {
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 6px;
  color: var(--vp-c-text-2);
  background: var(--vp-c-default-soft);
}

.pc-links {
  display: flex;
  gap: 14px;
  margin-top: auto;
  font-size: 13px;
  font-weight: 500;
}

.pc-links a {
  color: var(--vp-c-brand-1);
  text-decoration: none;
}

.pc-links a:hover {
  text-decoration: underline;
}
</style>
