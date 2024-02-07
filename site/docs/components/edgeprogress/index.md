# EdgeProgress(边缘进度条)

这是 `EdgeProgress` (边缘进度条)组件的文档。
## 基础用法

`selab-ui` 为 `EdgeProgress` 注册了全局指令`v-edge-progress`。

<preview path="../../demos/edgeProgress/edgeProgressBase.vue" title="基本使用" description=" "></preview>

## 进度控制

设置和调整`v-edge-progress`的`value` 的值（0-100，type: number），即可控制进度条显示进度。

<preview path="../../demos/edgeProgress/edgeProgressValue.vue" title="基本使用" description=" "></preview>

## 样式

样式设置包括颜色、宽度和位置

颜色接受十六进制颜色；宽度为数字或字符串，字符串可以是不带单位的数字或带浏览器可以正确识别的CSS单位；位置为`top`或`bottom`。

样式接受以下两种设置格式

```js
const style = {
    color: '#0066ff',
    height: '5px',
    position: 'top'
};

const style = '#0066ff 5px top';
```

<preview path="../../demos/edgeProgress/edgeProgressStyle.vue" title="基本使用" description=" "></preview>

### 样式参数

| 参数名   | 类型                                     | 默认值    |
| :------- | :--------------------------------------- | :-------- |
| color    | 十六进制颜色                             | '#0066ff' |
| height   | number \| \`${string}\` \| CSSUnitNumber | '5px'     |
| position | 'top'  \| 'bottom'                       | 'top'     |

## 注意事项

> 1. 进度条基于`::before`伪元素实现。如果该节点已经设置过伪元素`::before`的`content`属性，则将不会对该节点进行任何操作，且会做出`::before has been set.`的警告。
> 2. 如果设置进度条的节点的`overflow-x`不为`hidden`，则当进度条的值接近或到达100时，进度条可能会溢出该元素，同时做出`overflow-x is not hidden. May overflow from the box when progress reaches 100%.`的警告。
