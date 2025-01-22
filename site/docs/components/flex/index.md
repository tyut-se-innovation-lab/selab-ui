
# Flex（弹性布局）
## 概述
`Flex` 是一个用于快速布局的组件，支持灵活的排列方向、对齐方式、间距控制等功能，帮助您轻松实现响应式布局。


## 预览

<preview path="../../demos/flex/flex.vue" title="基本使用" description="灵活使用 Flex 组件进行布局"></preview>


## 基础配置

通过以下属性，您可以自定义 Flex 组件的布局方向、对齐方式、是否换行、子元素间距等。


## Flex 参数

| 参数名   | 类型                 | 默认值       | 描述                                                                                  |
| :------- | :------------------- | :----------- | :------------------------------------------------------------------------------------ | 
| `direction` | `string`             | `"row"`      | 布局方向，可选值为 `"row"`（水平排列）或 `"column"`（垂直排列）。                      | 
| `justify`   | `string`             | `"start"`    | 主轴对齐方式，可选值为 `"start"`、`"center"`、`"end"`、`"space-between"` 等。          |
| `align`     | `string`             | `"stretch"`  | 交叉轴对齐方式，可选值为 `"stretch"`、`"start"`、`"center"`、`"end"`。                 | 
| `wrap`      | `boolean`            | `false`      | 是否自动换行，默认为 `false`。                                                       | 
| `gap`       | `string | number`    | `0`          | 子元素之间的间距，支持数值（单位为 `px`）或字符串（如 `"1rem"`）。                      | 



## 使用示例

### 基本使用
```vue
<template>
  <se-flex direction="row" justify="center" align="center" :gap="20" :wrap="true">
    <div class="box" v-for="item in 3" :key="item">Box {{ item }}</div>
  </se-flex>
</template>

<script>
export default {
  name: "BasicFlexExample",
};
</script>

<style scoped>
.box {
  width: 100px;
  height: 100px;
  background-color: #f5f5f5;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #dcdcdc;
}
</style>
```


## 其他说明

- **响应式支持**：通过 CSS 的 `gap` 属性实现间距控制，无需手动计算边距。
- **扩展性**：可以在 `Flex` 组件中嵌套其他布局组件，轻松实现复杂布局。
- **最佳实践**：建议在小屏幕设备中结合 `wrap` 属性实现流式布局，提升用户体验。

