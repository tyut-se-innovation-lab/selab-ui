
# Divider (分割线)
## 概述

这是 `Divider` (分割线)组件的文档，用于在内容中进行视觉分割，支持水平、垂直分割线及多种样式。


## 预览

<preview path="../../demos/divider/divider.vue" title="基本使用" description="最基础的 Divider 用法"></preview>


## 基础配置

`Divider` 组件提供了丰富的配置选项，支持多种样式、对齐方式和自定义内容。



## Divider参数

| 参数名      | 类型                       | 默认值      | 描述                                                                                | 跳转 Demo                                 |
| :---------- | :------------------------- | :---------- | :---------------------------------------------------------------------------------- | :---------------------------------------- |
| `type`      | `String`                   | `horizontal` | 分割线方向，可选值为 `horizontal` 或 `vertical`                                     | [基本使用](#基本使用)                     |
| `dashed`    | `Boolean`                  | `false`      | 是否为虚线样式                                                                      | [虚线分割线](#虚线分割线)                 |
| `content`   | `String`                   | `""`         | 分割线上的内容（优先级低于插槽）                                                    | [带内容的分割线](#带内容的分割线)         |
| `orientation` | `String`                 | `center`     | 分割线内容的对齐方式，可选值为 `left`、`center` 和 `right`                          | [带内容的分割线](#带内容的分割线)         |
| `class`     | `String` / `Array` / `Object` | `""`         | 自定义分割线的类名                                                                  | [自定义样式](#自定义样式)                 |
| `style`     | `Object`                   | `{}`         | 自定义分割线的内联样式                                                              | [自定义样式](#自定义样式)                 |


## 示例

### 基本使用

水平分割线的基础用法：

```vue
<template>
  <se-divider />
</template>
```



### 带内容的分割线

使用 `content` 或插槽添加内容，并设置对齐方式：

```vue
<template>
  <se-divider content="默认居中" />
  <se-divider content="左对齐内容" orientation="left" />
  <se-divider content="右对齐内容" orientation="right" />
</template>
```


### 垂直分割线

用于并排内容之间的分隔：

```vue
<template>
  <div style="display: flex; align-items: center;">
    文本内容
    <se-divider type="vertical" />
    文本内容
  </div>
</template>
```


### 虚线分割线

通过 `dashed` 属性实现虚线效果：

```vue
<template>
  <se-divider dashed />
</template>
```


### 自定义样式

通过 `class` 和 `style` 自定义分割线的样式：

```vue
<template>
  <se-divider style="{ backgroundColor: 'red', height: '2px' }" />
</template>
```


## 其他说明

- **插槽优先级**  
  如果同时传入 `content` 和使用默认插槽，插槽内容会优先显示。

- **扩展性**  
  支持通过 `class` 和 `style` 定制更多样式，同时保持原有功能。

- **兼容性**  
  确保组件在现代浏览器中表现一致，低版本浏览器可能需要添加 polyfill。

了更全面的说明和示例，方便用户快速了解并使用 `Divider` 组件。
