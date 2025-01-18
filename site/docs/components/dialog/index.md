
# Dialog 

## 概述

`SeDialog` 是一个功能强大的对话框组件，支持多种展示方式，包括内容自定义、标题插槽、页脚插槽以及关闭按钮的控制。可以通过设置属性或监听事件灵活控制对话框的行为。

## 预览
<preview path="../../demos/dialog/dialog.vue" title="基本使用" description=" "></preview>
## 基本功能

#### 示例代码

```vue
<template>
  <div>
    <!-- 打开左侧弹出对话框 -->
    <button @click="showLeftDialog = true">从左侧打开对话框</button>
    <!-- 打开右侧弹出对话框 -->
    <button @click="showRightDialog = true">从右侧打开对话框</button>

    <!-- 左侧弹出对话框 -->
    <SeDialog
      v-model:visible="showLeftDialog"
      title="左侧弹出对话框"
      :closeable="true"
      :width="'300px'"
      :top="'0'"
      @close="handleDialogClose"
    >
      <p>这是一个从左侧弹出的对话框。</p>
    </SeDialog>

    <!-- 右侧弹出对话框 -->
    <SeDialog
      v-model:visible="showRightDialog"
      title="右侧弹出对话框"
      :closeable="true"
      :width="'300px'"
      :top="'0'"
      @close="handleDialogClose"
    >
      <p>这是一个从右侧弹出的对话框。</p>
    </SeDialog>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import SeDialog from './components/Dialog.vue'; // 根据实际路径调整

const showLeftDialog = ref(false);
const showRightDialog = ref(false);

const handleDialogClose = () => {
  console.log('对话框已关闭');
};
</script>
```


## 属性 (Props)

| 属性名      | 类型              | 默认值   | 描述                          |
| ----------- | ----------------- | -------- | ----------------------------- |
| `title`     | `string`          | `'提示'` | 对话框的标题                  |
| `width`     | `string`          | `'30%'`  | 对话框的宽度                  |
| `top`       | `string`          | `'15vh'` | 对话框的垂直偏移              |
| `visible`   | `boolean`         | `false`  | 控制对话框的显示与隐藏状态    |
| `closeable` | `boolean`         | `true`   | 是否显示关闭按钮              |


## 插槽 (Slots)

| 插槽名        | 描述                                  |
| ------------- | ------------------------------------- |
| `default`     | 对话框内容区域，默认显示为 “默认信息” |
| `title`       | 对话框标题区域，可以自定义标题内容    |
| `footer`      | 对话框底部区域，自定义操作按钮        |
| `closeIcon`   | 关闭按钮的自定义图标                 |


## 事件 (Emits)

| 事件名  | 参数   | 描述                        |
| ------- | ------ | --------------------------- |
| `close` | `false` | 当对话框关闭时触发          |


## 使用说明

1. **控制对话框的显示与隐藏**：
   使用 `v-model:visible` 来绑定布尔变量以控制对话框的显示状态。

2. **自定义标题和内容**：
   利用 `title` 属性设置标题，也可通过插槽自定义内容区域。

3. **支持滑出方向扩展**：
    - 通过样式实现左侧或右侧滑出的效果。
    - 例如，在使用场景中可通过调整父级定位和 `width` 属性实现所需位置。

4. **关闭按钮行为**：
    - 设置 `closeable` 属性为 `true` 时，显示关闭按钮。
    - 监听 `close` 事件以处理对话框关闭逻辑。

## 扩展功能

- 可以通过插槽和监听事件进一步扩展功能，例如实现异步关闭、加载状态等。
- 支持动态宽度和位置调整以适配不同屏幕大小或特殊布局。
