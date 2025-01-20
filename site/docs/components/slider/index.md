# Slider (滑动输入条)
## 概述
`Slider` 是一个滑动输入组件，允许用户通过拖动滑块选择一个范围内的数值。该组件支持自定义样式、步长、最小值、最大值等多种配置，适用于数值选择、音量调节等场景。

---

## 预览

<preview path="../../demos/Slider/Slider.vue" title="基本使用" description="通过简单配置实现滑动条功能"></preview>

---

## 基础配置
    
### 使用方式


1. 在模板中使用
```tsx
<se-slider 
  v-model:value="value" 
  :min="0" 
  :max="100" 
  :step="5" 
  type="primary" 
  @change="onChange" 
/>
```

3. 绑定的值会实时更新
```ts
import { ref } from 'vue';

export default {
  setup() {
    const value = ref(50);
    const onChange = (val: number) => {
      console.log('滑块当前值:', val);
    };
    return { value, onChange };
  },
};
```

---

## 参数

| 参数名      | 类型                       | 默认值   | 描述                                                                                   | 跳转 Demo                                   |
| :---------- | :------------------------- | :------- | :------------------------------------------------------------------------------------- | :------------------------------------------ |
| `value`     | `number`                   | `0`      | 滑块当前值，支持双向绑定。                                                            | [基本使用](#预览)                           |
| `min`       | `number`                   | `0`      | 滑块的最小值。                                                                        | [最小/最大值](#预览)                        |
| `max`       | `number`                   | `100`    | 滑块的最大值。                                                                        | [最小/最大值](#预览)                        |
| `step`      | `number`                   | `1`      | 滑块的步长，必须为正数，且能被 `(max - min)` 整除。                                    | [步长](#预览)                               |
| `disabled`  | `boolean`                  | `false`  | 是否禁用滑块。                                                                        | [禁用状态](#预览)                           |
| `type`      | `string`                   | `""`     | 滑块样式类型，可自定义样式风格，例如 `primary`、`success`、`warning` 等。             | [样式类型](#预览)                           |

---

## 事件

| 事件名      | 参数类型             | 描述                                                   | 跳转 Demo                    |
| :---------- | :------------------- | :----------------------------------------------------- | :--------------------------- |
| `@input`    | `value: number`      | 滑块值变化时触发，用于实时监听值。                     | [实时监听](#预览)            |
| `@change`   | `value: number`      | 滑块值改变后触发（鼠标释放时触发），适合确认型操作。   | [确认事件](#预览)            |

---

## 样式自定义

### 类名说明

| 类名                     | 描述                                |
| :----------------------- | :---------------------------------- |
| `.se-Slider`             | 滑块组件容器                       |
| `.se-Slider__track`      | 滑块轨道容器                       |
| `.se-Slider__progress`   | 滑块已选中的轨道                   |
| `.se-Slider__handle`     | 滑块的可拖动圆点                   |
| `.se-Slider--{type}`     | 根据 `type` 添加的自定义样式类名   |

---

### 示例: 自定义样式
```less
.se-Slider--primary {
  .se-Slider__progress {
    background-color: #1890ff;
  }
  .se-Slider__handle {
    border-color: #1890ff;
  }
}
```


## 其他说明

1. **响应式支持**  
   滑块通过 `v-model` 实现双向绑定，可与 Vue 的响应式系统无缝结合。

2. **无障碍设计**  
   组件设计中充分考虑无障碍支持，键盘用户可通过 `Tab` 键选择滑块，并通过方向键调整值。

3. **浏览器兼容性**  
   该组件支持现代浏览器，包括 Chrome、Edge、Firefox 和 Safari。
