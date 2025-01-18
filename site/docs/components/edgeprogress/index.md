# EdgeProgress (边缘进度条) 
## 概述
`EdgeProgress` 是一种轻量级的进度条组件，能够在页面或容器的边缘以直观的方式显示进度。通过使用全局指令 `v-edge-progress`，可以快速为任何元素添加边缘进度条。该组件支持进度控制和样式定制，适用于加载进度、操作状态提示等场景。

## 组件预览

### 基础用法

通过简单绑定 `v-edge-progress` 指令，可以为目标元素添加边缘进度条：

<preview path="../../demos/edgeProgress/edgeProgressBase.vue" title="基本使用" description="简单展示 `EdgeProgress` 的基本效果。"></preview>

---

### 进度控制

可以通过设置 `v-edge-progress` 的值（范围：`0-100`）来动态调整进度条的显示进度：

<preview path="../../demos/edgeProgress/edgeProgressValue.vue" title="进度控制" description="调整进度值来控制进度条的显示状态。"></preview>

---

### 样式设置

支持自定义进度条的颜色、宽度和位置，样式可以通过对象或字符串传递：

**对象样式：**
```js
const style = {
    color: '#0066ff',
    strokeWidth: '3px',
    position: 'top'
};
```

**字符串样式：**
```js
const style = '#0066ff 3px top';
```
## 主要功能

1. **全局指令**：使用 `v-edge-progress` 快速为元素绑定进度条。
2. **进度控制**：支持设置和动态调整进度值，范围为 `0-100`。
3. **样式灵活**：支持自定义颜色、宽度和位置，满足多样化的设计需求。
4. **轻量实现**：基于伪元素 `::before` 实现，对 DOM 结构影响较小。


## 组件参数

| 参数名   | 类型                                     | 默认值    | 描述                          |
| :------- | :--------------------------------------- | :-------- | :---------------------------- |
| `color`  | 十六进制颜色                             | `#0066ff` | 设置进度条的颜色。             |
| `height` | number \| \`${string}\` \| CSSUnitNumber | `3px`     | 设置进度条的宽度或画笔厚度。   |
| `position` | 'top' \| 'bottom'                       | `top`     | 设置进度条的位置，支持顶部或底部。 |

<preview path="../../demos/edgeProgress/edgeProgressStyle.vue" title="样式设置" description="演示如何自定义进度条的颜色、宽度和位置。"></preview>

---

## 注意事项

1. **伪元素限制**：  
   进度条基于伪元素 `::before` 实现。如果目标元素已经设置了 `::before` 的 `content` 属性，组件将不会对其生效，并会发出警告：  
   `::before has been set.`

2. **溢出问题**：  
   如果目标元素的 `overflow-x` 属性未设置为 `hidden`，当进度条接近或达到 100% 时，可能会溢出元素边界，并触发以下警告：  
   `overflow-x is not hidden. May overflow from the box when progress reaches 100%.`
