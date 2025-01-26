

# PageHeader (页头)

`PageHeader` 组件用于展示页面的标题、子标题以及可选的返回按钮和额外操作项，常用于页面的顶部信息展示。它支持自定义标题内容、返回按钮和其他自定义操作。

## 预览

<preview path="../../demos/pageHeader/pageHeader.vue" title="基本使用" description=" "></preview>

## PageHeader 参数

| 参数名     | 类型                                | 默认值  | 描述                                      | 跳转 Demo                              |
| ---------- | ----------------------------------- | ------- | ----------------------------------------- | -------------------------------------- |
| `title`    | `String`                            | `-`     | 页头的标题，必须传入                     | [Demo](../../demos/pageHeader/pageHeader.vue) |
| `subTitle` | `String`                            | `""`    | 页头的子标题，可选                        | [Demo](../../demos/pageHeader/pageHeader.vue) |
| `back`     | `Boolean`                           | `false` | 是否显示返回按钮，点击后触发 `back` 事件 | [Demo](../../demos/pageHeader/pageHeader.vue) |
| `extra`    | `String | VNode`                    | `""`    | 页头的额外内容，可以是文本或自定义的 Vue 组件 | [Demo](../../demos/pageHeader/pageHeader.vue) |

## 组件说明

`PageHeader` 组件是一个常见的页面布局组件，提供以下功能：

1. **标题 (`title`)**:
    - 用于设置页头的主标题，必须传入。

2. **子标题 (`subTitle`)**:
    - 可选项，作为标题下方的副标题展示。

3. **返回按钮 (`back`)**:
    - 如果设置为 `true`，则显示一个返回按钮，点击后会触发自定义事件 `back`，可以通过事件监听在父组件中定义返回行为。

4. **额外内容 (`extra`)**:
    - 可用于展示如操作按钮、链接或其他自定义组件。

## 使用示例

#### 基本使用

```tsx
<template>
  <SePageHeader
    title="页面标题"
    subTitle="副标题内容"
    :back="true"
    extra="其他操作"
    @back="handleBack"
  >
    <template #extra>
      <button @click="onSave">保存</button>
    </template>
  </SePageHeader>
</template>

<script setup>
import SePageHeader from './components/SePageHeader.vue';

const handleBack = () => {
  console.log('返回按钮点击');
  // 在这里执行自定义的返回逻辑
};

const onSave = () => {
  alert('保存按钮点击');
};
</script>
```

## 参数说明

- `title`: 页面主标题。
- `subTitle`: 页面副标题（可选）。
- `back`: 是否显示返回按钮，点击后会触发 `back` 事件，需在父组件监听并定义返回行为。
- `extra`: 页头的额外内容，可以是文本、按钮或其他自定义组件。

## 其他说明

- `PageHeader` 组件支持灵活的插槽，允许用户自定义标题的附加内容，如操作按钮、链接等。
- 该组件在设计时考虑了适应不同页面的需求，用户可以根据实际情况自由选择是否启用返回按钮和额外的内容。

