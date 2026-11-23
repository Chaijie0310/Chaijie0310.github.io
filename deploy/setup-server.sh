#!/usr/bin/env bash
# 全新 Ubuntu 服务器一键准备：安装 Nginx、拉取站点、应用配置、启动服务。
#
# 用法（在服务器上以 root 执行）：
#   curl -fsSL https://raw.githubusercontent.com/Chaijie0310/Chaijie0310.github.io/main/deploy/setup-server.sh | bash
# 或者先 git clone 再执行本文件。
#
# 可覆盖的变量：
#   REPO_URL  仓库地址（默认 GitHub 仓库）
#   SITE_DIR  站点目录（默认 /var/www/personal-site）
set -euo pipefail

REPO_URL="${REPO_URL:-https://github.com/Chaijie0310/Chaijie0310.github.io.git}"
SITE_DIR="${SITE_DIR:-/var/www/personal-site}"

echo "==> 1/5 安装 Nginx 与 Git"
apt-get update -y
DEBIAN_FRONTEND=noninteractive apt-get install -y nginx git

echo "==> 2/5 拉取站点代码到 ${SITE_DIR}"
if [ -d "${SITE_DIR}/.git" ]; then
  git -C "${SITE_DIR}" pull --ff-only
else
  mkdir -p "$(dirname "${SITE_DIR}")"
  git clone --depth 1 "${REPO_URL}" "${SITE_DIR}"
fi

echo "==> 3/5 应用 Nginx 站点配置"
install -m 644 "${SITE_DIR}/deploy/nginx-site.conf" /etc/nginx/sites-available/personal-site
ln -sf /etc/nginx/sites-available/personal-site /etc/nginx/sites-enabled/personal-site
rm -f /etc/nginx/sites-enabled/default

echo "==> 4/5 语法检查"
nginx -t

echo "==> 5/5 启动并设置开机自启"
systemctl enable --now nginx
systemctl reload nginx

echo
echo "部署完成。查看状态：systemctl status nginx --no-pager"
echo "公网访问地址：http://$(curl -s --max-time 5 ifconfig.me || echo '<服务器公网IP>')"
