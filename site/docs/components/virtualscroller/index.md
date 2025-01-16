

# VirtualScroller 组件文档

`se-virtual-scroller` 是一个自定义实现的虚拟滚动列表组件，用于高效渲染长列表。该组件只渲染可见区域内的元素，并在用户滚动时动态加载新数据项，从而显著提高渲染性能，减少不必要的 DOM 操作。

## 预览

<preview path="../../demos/VirtualScroller/VirtualScroller.vue" title="基本使用" description="虚拟滚动列表基本使用示例"></preview>

---

## 组件基础配置

`se-virtual-scroller` 组件通过仅渲染可视区域内的项，减少了页面上同时渲染的元素数目，从而提高了页面的性能。



### 使用方式

在 Vue 文件中，您可以像这样使用 `se-virtual-scroller` 组件：

```vue
<template>
  <div>
    <se-virtual-scroller
      :items="items"
      :itemHeight="40"
      :visibleCount="10"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import SeVirtualScroller from './components/se-virtual-scroller.vue';

export default defineComponent({
  components: {
    SeVirtualScroller
  },
  setup() {
    // 模拟包含1000个项的数组
    const items = ref(
      Array.from({ length: 1000 }, (_, index) => ({
        value: index,
        label: `选项 ${index + 1}`
      }))
    );

    return { items };
  }
});
</script>

<style scoped>
/* 为了展示虚拟滚动，您可以为列表项设置一些样式 */
</style>
```

在这个例子中，`se-virtual-scroller` 接受三个主要参数：
- `items`：传入的数据列表，组件会根据这些数据渲染每个列表项。
- `itemHeight`：每个列表项的高度，决定了虚拟滚动的计算方式。
- `visibleCount`：可见区域内显示的项数，通常由容器的高度和单项高度来决定。

## 组件的参数

| 参数名           | 类型                     | 默认值  | 描述                                                                                 |
|---------------| ------------------------ | ------- | ------------------------------------------------------------------------------------ |
| `items`       | `Array`                  | `[]`    | 传入的列表数据，组件会渲染这些数据项。                                                |
| `itemHeight`  | `Number`                 | `50`    | 每个列表项的高度，虚拟滚动根据此高度来计算应该渲染多少个元素。                              |
| `visibleCount` | `Number`                 | `10`    | 可见区域内渲染的项数，这个参数通常是根据容器的高度和单项高度来设置的。                            |
| `keyField`    | `String`                 | `value` | 可选字段，用于为每一项指定一个唯一的键（例如：`key`、`id` 等）。                             |
| `onItemClick`	  |`Function`	|`null`	|点击项时触发的回调函数，接收点击的项数据作为参数。它是一个可选字段，默认为 null。|

## 其他说明

- **性能优化**：虚拟滚动组件通过限制渲染的项数，有效提高了长列表的渲染效率，适用于包含大量数据的场景。
- **滚动处理**：当用户滚动时，组件会动态计算和加载可见区域的数据项，从而避免一次性渲染所有数据项。

---

## 示例

以下是一个简单的使用案例，展示如何在页面中渲染虚拟滚动列表：

```vue
<template>
  <div>
    <se-virtual-scroller
      :items="items"
      :itemHeight="40"
      :visibleCount="10"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import SeVirtualScroller from './components/se-virtual-scroller.vue';

export default defineComponent({
  components: {
    SeVirtualScroller
  },
  setup() {
    const items = ref(
      Array.from({ length: 1000 }, (_, index) => ({
        value: index,
        label: `选项 ${index + 1}`
      }))
    );

    return { items };
  }
});
</script>

<style scoped>
/* 你可以根据需要定制样式 */
</style>
```

---


