# Selab UI 组件库安装与使用说明文档

**Selab UI** 是一个基于 Vue 3、TypeScript 和 Vite 构建的高质量 UI 组件库，提供了一系列可定制的组件，帮助开发者快速构建现代化的用户界面。以下是如何在项目中安装并使用 Selab UI 组件库的详细说明。

## 1. 安装 Selab UI

### 使用 npm 安装

在您的项目中运行以下命令安装 Selab UI：

```bash
npm install selab-ui
```

### 使用 yarn 安装

如果您的项目使用 `yarn`，运行以下命令来安装 Selab UI：

```bash
yarn add selab-ui
```

### 使用 pnpm 安装

如果您使用的是 `pnpm`，可以运行以下命令来安装 Selab UI：

```bash
pnpm add selab-ui
```

---

## 2. 引入 Selab UI 组件

### 引入单个组件

安装完成后，您可以在 Vue 组件中按需引入并使用 Selab UI 组件。以下是如何引入 `SeButton` 组件的示例：

```vue
<script setup lang="ts">
import { SeButton } from 'selab-ui';
</script>

<template>
  <se-button type="primary">点击我</se-button>
</template>
```

### 全局注册组件

如果您希望在项目中使用 Selab UI 的所有组件，可以选择在 `main.ts` 或 `main.js` 文件中全局注册 Selab UI 组件：

```javascript
import { createApp } from 'vue';
import App from './App.vue';
import 'selab-ui/styles.css';  // 引入 Selab UI 的样式
import * as SelabUI from 'selab-ui';

const app = createApp(App);
app.use(SelabUI);  // 全局注册所有组件
app.mount('#app');
```

这样，您可以在任何 Vue 组件中直接使用 Selab UI 提供的组件，而无需单独引入每个组件。

---

## 3. 引入样式

要确保 Selab UI 组件的样式正常加载，您需要在项目的入口文件（如 `main.ts` 或 `main.js`）中引入样式文件：

```javascript
import 'selab-ui/styles.css';  // 引入 Selab UI 样式
```

---

## 4. 配置与定制

### 主题定制

Selab UI 提供了一些基础的样式变量，您可以根据项目需求进行修改。您可以在项目的 Less 文件中覆盖默认主题变量。例如：

```less
// 在 global.less 或 styles.less 文件中覆盖主题变量
@primary-color: #007bff;  // 设置主色为蓝色
@border-radius: 4px;      // 设置圆角为 4px
```

确保您的项目支持 Less 编译，定制后的主题将在整个项目中生效。

---

## 5. 示例

### 按钮组件示例

使用 Selab UI 的 `SeButton` 组件：

```vue
<template>
  <!-- 普通按钮 -->
  <se-button type="primary">主按钮</se-button>
  
  <!-- 禁用按钮 -->
  <se-button :disabled="true">禁用按钮</se-button>
  
  <!-- 带图标的按钮 -->
  <se-button type="danger">
    <i class="icon icon-delete"></i> 删除
  </se-button>
</template>

<script setup lang="ts">
import { SeButton } from 'selab-ui';
</script>
```

### 输入框组件示例

使用 `SeInput` 组件：

```vue
<template>
  <se-input placeholder="请输入内容" v-model="inputValue"></se-input>
</template>

<script setup lang="ts">
import { SeInput } from 'selab-ui';
import { ref } from 'vue';

const inputValue = ref('');
</script>
```

---

## 6. 版本更新与升级

为了确保您使用的是 Selab UI 的最新版本，您可以通过以下命令检查并更新组件库：

```bash
npm update selab-ui
```

或者使用 `yarn` 和 `pnpm` 命令进行更新：

```bash
yarn upgrade selab-ui
# 或者
pnpm update selab-ui
```

---

## 7. 常见问题

### 1. 如何解决样式未加载问题？

如果您的组件样式没有正确加载，请确保您已经在项目入口文件中引入了 `selab-ui/styles.css`，并且确保您的项目支持 CSS 和 Less 编译。

### 2. 如何按需引入组件？

如果您只需要使用某个组件，可以在需要的地方按需引入：

```javascript
import { SeButton } from 'selab-ui';
```

这样可以避免不必要的资源引入，减少项目的打包体积。

## 8. 总结

通过上述步骤，您可以轻松地将 **Selab UI 组件库** 集成到您的 Vue 项目中。无论是按需引入单个组件还是全局注册，Selab UI 提供了灵活的方式帮助您快速构建漂亮的用户界面。根据需要定制样式和主题，您可以更好地满足项目需求。

如果遇到任何问题，欢迎查阅文档或联系 Selab UI 社区。
