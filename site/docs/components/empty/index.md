
# Empty (空状态) 组件
## 概述

`Empty` 组件用于展示在无数据或空内容时的占位符或提示信息，常用于列表、表格、内容区等数据为空时的展示。它提供了可定制的样式和插槽内容，方便在不同场景下使用。

## 预览

<preview path="../../demos/empty/empty.vue" title="基本使用" description="展示如何使用 Empty 组件"></preview>

---

## Empty 的基础配置

该组件通过简单的配置和插槽支持，能够帮助你快速展示空状态。你可以根据需要选择不同的类型、传递内容，并灵活地控制其展示方式。

## Empty 参数

| 参数名      | 类型        | 默认值 | 描述                                                                                        | 跳转 Demo                                 |
| :---------- | :---------- | :----- | :------------------------------------------------------------------------------------------ | :---------------------------------------- |
| `type`      | `String`    | `""`   | 空状态类型，支持不同的预设类型（如 `no-data`、`no-content` 等），用于控制样式和表现。         | [空状态类型 Demo](../../demos/empty/empty.vue) |
| `class`     | `String`    | `""`   | 额外的自定义类名，用于扩展空状态组件的样式。                                               | -                                        |
| `style`     | `Object`    | `{}`   | 传递自定义内联样式，直接控制组件的展示效果。                                               | -                                        |

---

## 其他说明

- **插槽**：`Empty` 组件支持默认插槽，你可以传递任意内容作为占位符，比如提示信息或图标等。

  ```vue
  <se-empty type="no-data">
    <div>暂无数据</div>
  </se-empty>
  ```

- **类型扩展**：你可以根据需要在 `index.less` 文件中扩展更多的 `type` 类型和对应的样式，以满足不同的空状态需求。

  ```less
  .se-empty {
    &.se-empty--no-data {
      color: #f56c6c;
    }
    &.se-empty--no-content {
      color: #409eff;
    }
  }
  ```

- **响应式布局**：该组件采用 Flexbox 布局，确保无论内容如何变化，都能居中对齐显示，适应各种屏幕尺寸。

---

## 示例

#### 基本使用

```vue
<template>
  <se-empty type="no-data">
    <div>暂无数据</div>
  </se-empty>
</template>

<script setup>
import SeEmpty from '@/components/se-empty/se-empty'; // 引入组件
</script>
```

#### 没有内容时显示的空状态

```vue
<template>
  <se-empty type="no-content">
    <div>暂无内容</div>
  </se-empty>
</template>

<script setup>
import SeEmpty from '@/components/se-empty/se-empty'; // 引入组件
</script>
```

#### 不传 `type` 时的默认空状态

```vue
<template>
  <se-empty>
    <div>正在加载...</div>
  </se-empty>
</template>

<script setup>
import SeEmpty from '@/components/se-empty/se-empty'; // 引入组件
</script>
```

---

## 总结

`Empty` 组件是一个非常通用且易于使用的组件，用于处理数据为空或没有内容时的显示。通过可配置的 `type` 属性和灵活的插槽，你可以定制化空状态的表现，提升用户体验。
