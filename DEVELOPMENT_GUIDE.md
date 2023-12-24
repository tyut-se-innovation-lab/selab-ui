# 组件 开发规范

## 1. 项目结构

组织项目结构以便清晰、易于维护。
```
selab-ui/
| -- cli //脚手架
|-- examples/ // 示例应用
|-- packages/
| |-- components/
| | | script/ 
| | | |-- build/ //打包
| | | |-- utils/ //工具类
| | | src/
| | | |-- button/
| | | | |--template/ //组件文件夹
| | | | | |-- Button.tsx
| | | | |-- test/ //测试文件夹
| | | | | |-- Button.test.tsx
| | | | |-- index.ts 
| | | |-- index.ts // 全局导出组件
| | |-- index.ts // 全局导出组件
| |-- utils/ // 工具类
| |-- selab/ // 打包文件
|--site/
| |-- docs/// 组件库文档
| | |-- components/ // 组件库说明文档
| | | | -- Button/
| | | | |-- Button.md
| |-- demos/ // 组件库示例
|-- package.json
|-- tsconfig.json
|-- README.md
|-- DEVELOPMENT_GUIDE.md //开发指南
|-- .npmrc //npm 配置
|-- .gitignore
|-- .eslintrc.cjs //eslint 配置
|-- .eslintignore //eslint 忽略文件
|-- .prettierrc.cjs //prettier 配置
|-- .stylintrc.cjs //stylelint 配置
|-- .eslintignore //eslint 忽略文件
```

## 2. 组件开发

### TypeScript（tsx）

- 使用 TypeScript 进行组件开发，提供更好的类型检查和智能提示。
- 推荐使用函数式组件和 Hooks，或者类组件，根据项目需要和组件复杂性选择。

```tsx
import { defineComponent, computed, VNode } from "vue";
import '../../less/components/button/index.less'
export default defineComponent({
    name: "se-button",
    props: {
        type: String
    },
    setup(props, { slots }): () => VNode {
        const buttonStyle = computed(() => {
            return props.type ? { ["se-button--" + props.type]: true } : {};
        });
        return () => (
            <div class=se-button buttonStyle.value>
        {slots.default && slots.default()}
      </div>
    );
  }
});;
```
### Vue
* 使用单文件组件 (SFC) 结构进行 Vue 组件开发。
```Vue
<!-- Button.vue -->
<template>
  <button @click="onClick">{{ label }}</button>
</template>

<script>
export default {
  props: {
    onClick: Function,
    label: String,
  },
};
</script>

<style scoped>
/* 组件样式 */
</style>
```
## 3. 组件创建
```bash
pnpm run create:selab
```
该命令运行 CLI 工具，用于创建组件。
通过交互式命令创建组件
``` 
# Q1:请输入组件英文名字
# Q2:请输入组件中文名字
# Q3:选用模板 :vue tsx 都已可以正常使用
```

## 4. 示例应用
在 examples 目录下创建一个示例应用，用于演示组件的用法。

## 5. 文档
在 site/docs/components 目录下为每个组件编写说明文档，使用 Markdown 格式。
在 site/docs 目录下的 demos 文件夹中编写示例代码，以 Vue 文件的形式展示组件的用法。
## 6. 单元测试
使用单元测试确保组件的功能和逻辑正确。
使用测试框架（vitest）进行单元测试。
### 7. 组件创建错误


