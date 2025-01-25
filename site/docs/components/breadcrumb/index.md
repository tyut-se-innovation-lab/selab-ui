# Breadcrumb(面包屑)
## 概述

`Breadcrumb` (面包屑)组件用于展示当前页面的路径，并提供导航功能，帮助用户快速返回上级页面。该组件支持图标、链接和文本显示，适用于页面层级结构的展示。

## 预览
<preview path="../../demos/breadcrumb/breadcrumb.vue" title="基本使用" description="面包屑组件的基本用法示例"></preview>

## Breadcrumb的基础配置

该组件可以通过传入 `items` 数组来自定义面包屑的内容。每个面包屑项支持文字、链接和图标。你可以根据自己的需求对面包屑的外观和功能进行配置。

## Breadcrumb 参数

| 参数名      | 类型                       | 默认值 | 描述                                                                                         | 示例                                                                                           |
| :---------- | :------------------------- | :----- | :------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------- |
| `type`      | `string`                   | `''`   | 设置面包屑的样式类型。可以根据需求传入不同的类型来调整面包屑的外观，例如 `primary`, `secondary`等。  | `'primary'`  |
| `items`     | `Array<BreadcrumbItem[]>`  | `[]`   | 面包屑项的数组，每个项可以包含 `text` (显示文字)，`link` (链接) 和 `icon` (图标)。           | `[{ text: '首页', link: '/', icon: 'home' }, { text: '产品' }]`                                 |

## BreadcrumbItem

`BreadcrumbItem` 是面包屑项的配置对象，它包含以下属性：

| 属性名      | 类型     | 描述                                            |
| :---------- | :------- | :---------------------------------------------- |
| `text`      | `string` | 必填项，面包屑项的文本。                        |
| `link`      | `string` | 可选项，面包屑项的链接地址。                    |
| `icon`      | `string` | 可选项，面包屑项的图标，使用图标名称或自定义图标。|

## 插槽

该组件支持通过插槽来插入自定义内容。

- 默认插槽 (`default`)：在面包屑组件底部，可以添加自定义的内容。

## 使用示例

```tsx
<template>
  <SeBreadcrumb :items="breadcrumbItems" type="primary">
    <template #default>
      <span>自定义内容可以通过插槽传入</span>
    </template>
  </SeBreadcrumb>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import SeBreadcrumb from './components/SeBreadcrumb';

const breadcrumbItems = ref([
  { text: '首页', link: '/', icon: 'home' },   // 首页有图标
  { text: '产品' },
  { text: '详情', icon: 'info' },  // 详情有图标
]);
</script>
```

在这个例子中，`breadcrumbItems` 数组包含了三个面包屑项，其中每个项都可以包含文字、链接和图标。通过传递 `type="primary"`，面包屑的样式将应用 `primary` 样式。

## 样式说明

组件的默认样式已经提供了基础的布局，支持自定义外观和主题。通过传递不同的 `type` 值，你可以应用不同的样式。

## 其他说明

- 组件会自动渲染每个面包屑项，并在项之间添加 `/` 分隔符。
- 如果传入的面包屑项包含链接，点击链接会跳转到对应的页面；如果没有链接，文本将作为普通文本显示。
- 支持在每个面包屑项中加入图标，图标可以通过 `icon` 属性指定。
- 组件内的图标使用了 `SeIcon` 组件，支持设置图标大小、颜色等样式。

