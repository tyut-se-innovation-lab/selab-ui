#!/bin/bash

# 确保脚本抛出遇到的错误
set -e

echo "开始重新打包组件库..."
pnpm docs:build

echo "开始生成静态文档..."
pnpm docs:build

echo "进入待发布的目录..."
cd docs/.vitepress/dist

# 检查当前目录是否已经是一个 Git 仓库，如果不是，则初始化 Git 仓库
if [ ! -d ".git" ]; then
  echo "初始化 Git 仓库..."
  git init
  git remote add origin https://github.com/tyut-se-innovation-lab/selab-ui.git
fi

# 添加所有更改到 Git 仓库
git add .
git commit -m 'deploy'

echo "部署到用户页面..."
git push -f origin main

# 返回项目根目录
cd ../../../../

echo "提交代码到 GitHub 仓库..."
git add .
git commit -m 'update'
git push

echo "部署完成 🎉"
