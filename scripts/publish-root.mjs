/**
 * 把 VitePress 的构建产物复制到仓库根目录，供 GitHub Pages（分支发布）使用。
 *
 * 用法：
 *   pnpm deploy        # 构建 + 同步到根目录（推荐）
 *   pnpm build         # 只构建到 docs/.vitepress/dist
 *   pnpm publish:root  # 只把现有产物同步到根目录
 *
 * 说明：内容以 docs/ 下的 Markdown 为唯一来源；根目录的 HTML / assets 是产物，
 * 每次发布前会被清空重建，不要手改。
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'docs', '.vitepress', 'dist')

if (!fs.existsSync(dist)) {
  console.error('找不到构建产物：docs/.vitepress/dist，请先执行 pnpm build')
  process.exit(1)
}

/** 上一次发布留在仓库根目录的产物（清掉，避免旧哈希文件堆积） */
const GENERATED_DIRS = ['assets', 'projects', 'guide']
const GENERATED_FILES = ['vp-icons.css', 'hashmap.json']

function cleanPreviousBuild() {
  for (const dir of GENERATED_DIRS) {
    const target = path.join(root, dir)
    if (fs.existsSync(target)) fs.rmSync(target, { recursive: true, force: true })
  }
  for (const name of GENERATED_FILES) {
    const target = path.join(root, name)
    if (fs.existsSync(target)) fs.rmSync(target, { force: true })
  }
  for (const entry of fs.readdirSync(root)) {
    if (entry.endsWith('.html')) fs.rmSync(path.join(root, entry), { force: true })
  }
}

cleanPreviousBuild()
fs.cpSync(dist, root, { recursive: true, force: true })
fs.writeFileSync(path.join(root, '.nojekyll'), '')

const count = fs.readdirSync(dist).length
console.log(`已清理旧产物，并复制 ${count} 项产物到仓库根目录（含 .nojekyll）`)
console.log('下一步：git add -A && git commit -m "build: 重新构建并发布" && git push')
