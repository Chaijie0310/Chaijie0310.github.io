#!/usr/bin/env bash
# 服务器端更新脚本：一条命令把线上站点更新到仓库最新版本。
#
# 用法（在服务器上执行）：
#   bash /var/www/personal-site/deploy/update-site.sh
#
# 演示"版本功能更新"时，就是：本地改内容 → git commit → git push →
# 服务器执行本脚本 → 浏览器刷新。
set -euo pipefail

SITE_DIR="${SITE_DIR:-/var/www/personal-site}"

echo "==> 当前版本"
git -C "${SITE_DIR}" log --oneline -1

echo "==> 拉取最新代码"
git -C "${SITE_DIR}" pull --ff-only

echo "==> 校验 Nginx 配置并重载"
nginx -t
systemctl reload nginx

echo "==> 更新完成，当前版本"
git -C "${SITE_DIR}" log --oneline -1
