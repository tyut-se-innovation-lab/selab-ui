# Tag 组件文档

这是 `Tag` (标签)组件的文档。

## 预览

<preview path="../../demos/tag/tag.vue" title="基本使用" description="展示一个简单的标签组件"></preview>

#### 示例

```html
<se-tag>测试</se-tag>
```

## Tag 的基础配置

`Tag` 组件提供了多种配置选项，允许你根据需求自定义标签的外观和行为。

## Tag 参数

| 参数名      | 类型                         | 默认值   | 描述                                                                 | 跳转 Demo                                 |
| :---------- | :--------------------------- | :------- | :------------------------------------------------------------------- | :---------------------------------------- |
| `type`      | `'success' \| 'info' \| 'warning' \| 'danger' \| 'primary' \| 'default'` | `'info'` | 标签的类型，控制背景色和文字颜色。可选值包括：`success`, `info`, `warning`, `danger`, `primary`, `default`。 | [查看 Demo](#)                            |
| `closeable` | `boolean`                    | `false`  | 是否显示关闭按钮。点击关闭按钮时会触发 `close` 事件。                       | [查看 Demo](#)                            |
| `show`      | `boolean`                    | `true`   | 控制标签是否显示，支持动态显示和隐藏。                                       | [查看 Demo](#)                            |
| `shape`     | `'round' \| 'square'`        | `'round'`| 标签的形状，支持圆形 (`round`) 和方形 (`square`) 选择。默认值为圆形。           | [查看 Demo](#)                            |
| `size`      | `'small' \| 'medium' \| 'large'` | `'medium'` | 标签的大小，支持 `small`, `medium`, `large` 三种大小。默认大小为中等 (`medium`)。 | [查看 Demo](#)                            |

## 事件

| 事件名       | 描述                                         | 参数        |
| :----------- | :------------------------------------------- | :---------- |
| `click`      | 当标签被点击时触发                           | 无         |
| `close`      | 当标签关闭时触发                             | 无         |
| `mouseenter` | 当鼠标进入标签区域时触发                     | 无         |
| `mouseleave` | 当鼠标离开标签区域时触发                     | 无         |

## 其他说明

- **动态显示与隐藏**: 使用 `show` 参数来动态控制标签的显示和隐藏。可以通过修改 `show` 的值来实现标签的展示或隐藏。
- **关闭按钮**: 如果设置了 `closeable` 为 `true`，则会显示一个关闭按钮。点击按钮时，标签会被关闭，并触发 `close` 事件。
- **可定制化图标**: 你可以通过 `closeIcon` 插槽自定义关闭按钮的内容，默认是一个 `×` 图标。

#### 示例 - 动态控制标签显示和关闭

```html
<se-tag v-if="tagVisible" type="success" closeable @close="handleClose">标签内容</se-tag>
```

```javascript
<script setup>
import { ref } from 'vue';

const tagVisible = ref(true);

const handleClose = () => {
  tagVisible.value = false;
};
</script>
```

#### 示例 - 自定义关闭按钮图标

```html
<se-tag closeable>
  <template #closeIcon>
    <span>❌</span>
  </template>
  自定义关闭图标的标签
</se-tag>
```

## 样式说明

`Tag` 组件的样式会根据 `type`、`shape` 和 `size` 参数的不同自动进行调整。通过合理的配置，你可以使标签符合设计需求。例如，`success` 类型标签会显示绿色背景色，而 `warning` 类型会显示橙色背景色。`round` 形状会让标签具有圆角，而 `square` 则是方形的标签。

标签的大小可以通过 `size` 参数调整，提供了小型、中型和大型选项，适配不同的 UI 需求。

### 总结

`Tag` 组件是一个灵活且可定制的标签组件，可以通过 `type`、`shape`、`size`、`closeable` 等参数进行配置，满足不同需求的展示和交互。
