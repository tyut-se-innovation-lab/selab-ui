#!/bin/bash

# 确保脚本抛出遇到的错误
set -e

# 读取package.json中的version
version=`jq -r .version package.json`

# 打包构建
echo "开始打包 selab-ui..."
pnpm build

# 发布到npm，pnpm(高性能的npm)
echo "发布 selab-ui@$version 到 npm..."
pnpm publish

# 升级 selab-ui 依赖版本
echo "升级 selab-ui 到版本 $version..."
pnpm up selab-ui@$version

# 提交版本更新代码到github
echo "提交版本更新记录到 GitHub..."
git add .
git commit -m "update selab-ui@$version"
git push

echo "selab-ui@$version 发布完成 🎉"
