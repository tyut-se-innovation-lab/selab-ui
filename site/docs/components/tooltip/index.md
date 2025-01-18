# Tooltip(文字提示)

## 预览
<preview path="../../demos/tooltip/tooltip.vue" title="基本使用" description=" "></preview>


## 概述

`se-tooltip` 是一个轻量级的提示工具组件，支持多种触发方式（`hover`、`click`、`focus`），以及通过插槽自定义提示内容和样式。该组件可以动态调整背景颜色，并且支持十六进制颜色值和预设颜色。



## 基本功能

- 支持 `hover`、`click` 和 `focus` 触发方式。
- 自定义提示内容、箭头和气泡样式。
- 可设置显示和隐藏的延迟时间。
- 动态背景颜色，支持自定义十六进制颜色值。
- 提供默认插槽和标题插槽以满足多样化的内容需求。
- 点击组件外部时自动隐藏提示内容。

## 使用示例

```vue
<template>
  <div>
    <button>普通按钮</button>

    <!-- Hover 触发的 Tooltip -->
    <se-tooltip trigger="hover" color="#3498db" mouse-enter-delay="0.2" mouse-leave-delay="0.2">
      <template #default>
        <button>Hover 显示 Tooltip</button>
      </template>
      <template #title>
        <p>这是一个 Hover 显示的 Tooltip 内容。</p>
      </template>
    </se-tooltip>

    <!-- Click 触发的 Tooltip -->
    <se-tooltip trigger="click" color="orange">
      <template #default>
        <button>Click 显示 Tooltip</button>
      </template>
      <template #title>
        <p>这是一个 Click 显示的 Tooltip 内容。</p>
      </template>
    </se-tooltip>
    
  </div>
</template>

<script lang="ts" setup>
import SeTooltip from './components/Tooltip.vue';
</script>
```

## 属性 (Props)

| 属性名           | 类型      | 默认值       | 描述                                    |
| ---------------- | --------- | ------------ | --------------------------------------- |
| `type`           | `string`  | -            | 组件的样式类型，可根据业务自定义扩展    |
| `color`          | `string`  | `'black'`    | 提示框背景颜色，支持预设颜色或十六进制 |
| `mouseEnterDelay`| `number`  | `0.001`      | 鼠标移入延迟显示时间（秒）             |
| `mouseLeaveDelay`| `number`  | `0.001`      | 鼠标移出延迟隐藏时间（秒）             |
| `trigger`        | `string`  | `'hover'`    | 触发方式，可选值为 `hover`、`click`、`focus` |

## 插槽 (Slots)

| 插槽名        | 描述                          |
| ------------- | ----------------------------- |
| `default`     | 默认内容插槽，用于触发 Tooltip |
| `title`       | 提示框内容插槽，用于显示内容   |

## 事件 (Emits)

| 事件名               | 描述                              |
| -------------------- | --------------------------------- |
| `click-outside`      | 当点击组件外部区域时触发          |

## 功能描述

1. **多种触发方式**  
   根据 `trigger` 属性设置触发方式：
    - `hover`：鼠标移入时显示 Tooltip，移出时隐藏。
    - `click`：点击时显示 Tooltip，再次点击隐藏。
    - `focus`：获得焦点时显示 Tooltip，失去焦点时隐藏。

2. **延迟显示与隐藏**
    - 使用 `mouseEnterDelay` 和 `mouseLeaveDelay` 属性设置显示和隐藏的延迟时间。

3. **动态背景颜色**
    - 支持通过 `color` 属性设置背景颜色，支持预设颜色和自定义十六进制颜色。

4. **插槽自定义内容**
    - 提供 `default` 插槽用于设置触发区域。
    - 提供 `title` 插槽用于设置 Tooltip 显示内容。

5. **点击外部隐藏功能**
    - 使用 `clickOutside` 指令，在点击组件外部区域时自动隐藏 Tooltip。

