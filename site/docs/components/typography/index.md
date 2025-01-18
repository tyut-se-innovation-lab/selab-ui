# Typography(排版)
## 概述
`Typography` 是一款灵活且功能强大的文本排版组件，支持多种样式配置，适用于常见的文本排版需求，如标题、段落、强调样式等。

---

## 组件功能概述

- **多种文本类型**：支持 `h1` 到 `h6`、`p`（段落）、`span` 等常见文本类型。
- **文本样式控制**：支持加粗、斜体、下划线、删除线等样式。
- **自定义颜色与尺寸**：可通过 `color` 和 `size` 属性指定文本颜色和字体大小。
- **文本对齐**：支持 `left`、`center`、`right`、`justify` 对齐方式。
- **禁用选择**：通过 `unselectable` 属性控制文本是否可被选中。

---

## 预览

<preview path="../../demos/Typography/Typography.vue" title="基本使用" description="一个简单的 Typography 示例，用于展示文本排版样式"></preview>

---

## Typography 参数

| 参数名       | 类型                                                         | 默认值    | 描述                                                                                  | 示例                                                         |
| :----------- | :----------------------------------------------------------- | :-------- | :------------------------------------------------------------------------------------ | :----------------------------------------------------------- |
| `type`       | `h1` \| `h2` \| `h3` \| `h4` \| `h5` \| `h6` \| `p` \| `span` | `span`    | 指定文本类型，用于区分不同的 HTML 元素。                                                | `<Typography type="h1">标题</Typography>`                   |
| `bold`       | `boolean`                                                    | `false`   | 是否加粗文本。                                                                        | `<Typography bold>加粗文本</Typography>`                    |
| `italic`     | `boolean`                                                    | `false`   | 是否将文本设置为斜体。                                                                | `<Typography italic>斜体文本</Typography>`                  |
| `underline`  | `boolean`                                                    | `false`   | 是否给文本添加下划线。                                                                | `<Typography underline>带下划线的文本</Typography>`         |
| `strikethrough` | `boolean`                                                 | `false`   | 是否给文本添加删除线。                                                                | `<Typography strikethrough>删除线文本</Typography>`         |
| `color`      | `string`                                                     | `""`      | 指定文本颜色，可接受标准颜色值或十六进制颜色值。                                        | `<Typography color="#ff0000">红色文本</Typography>`         |
| `size`       | `string`                                                     | `""`      | 设置字体大小，支持标准 CSS 尺寸单位如 `px`、`em`、`rem` 等。                          | `<Typography size="20px">大号文本</Typography>`             |
| `align`      | `left` \| `center` \| `right` \| `justify`                   | `left`    | 文本对齐方式。                                                                        | `<Typography align="center">居中文本</Typography>`          |
| `unselectable` | `boolean`                                                  | `false`   | 是否禁止选中文本。                                                                    | `<Typography unselectable>无法选中的文本</Typography>`      |

---

## 示例代码

#### 基本使用

```vue
<template>
  <div>
    <se-typography type="h1" bold color="#007bff" align="center">
      大标题文本
    </se-typography>
    <se-typography type="p" italic underline size="16px" align="justify">
      这是一个段落示例，包含斜体和下划线样式，同时使用了对齐方式。
    </se-typography>
    <se-typography type="span" strikethrough>
      删除线文本示例
    </se-typography>
  </div>
</template>

<script>


export default {
  components: {
    Typography,
  },
};
</script>
```

---

## 其他说明

1. **样式扩展**：可以根据需求在样式文件中增加自定义样式类，如 `se-Typography--custom`。
2. **兼容性**：确保 `color` 和 `size` 的值符合 CSS 规范，以免出现样式渲染问题。
3. **插槽支持**：默认插槽用于传递文本内容，可以灵活组合和复用。


