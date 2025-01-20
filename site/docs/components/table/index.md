# Table (表格) 
## 概述

这是 `Table` (表格) 组件的文档，用于展示以虚拟滚动方式渲染的表格，支持大数据量的高效展示。

## 预览
<preview path="../../demos/table/table.vue" title="基本使用" description="基本表格展示，支持虚拟滚动"></preview>

## 基本配置

## Table 参数

| 参数名         | 类型                       | 默认值   | 描述                                                                                        | 跳转 Demo                                 |
| :------------- | :------------------------- | :------- | :------------------------------------------------------------------------------------------ | :---------------------------------------- |
| `rows`         | `Array`                    | 无       | 表格的数据源，必须是一个数组，每一项为一行数据，支持任何类型的数据对象。                  | [示例 Demo](../../demos/table/table.vue)   |
| `rowHeight`    | `Number`                   | `50`     | 每一行的高度，单位为像素。                                                                  | 无                                         |
| `visibleCount` | `Number`                   | `10`     | 每次可见的行数，虚拟滚动时，只有该数量的行会被渲染在屏幕上。                                | 无                                         |
| `containerHeight` | `Number`                 | 无       | 表格容器的高度，单位为像素。                                                                | 无                                         |

## 其他说明

1. **列自动生成**  
   该表格组件会根据 `rows` 中的第一行数据自动提取列名，并将其作为表头。每一列的 `label` 为字段名，`field` 用于标识字段。

2. **虚拟滚动**  
   由于表格使用虚拟滚动的方式渲染数据，只有当前视口范围内的数据行会被渲染，这对于大数据量的表格非常有用。

3. **点击事件**  
   表格支持点击行，`handleRowClick` 方法会被触发，传入被点击的行数据。您可以根据需要自定义点击事件。

### 示例

```vue
<template>
  <se-table
    :rows="data"
    :rowHeight="40"
    :visibleCount="10"
    :containerHeight="300"
  />
</template>

<script setup>
import SeTable from './path/to/SeTable.vue';

const data = [
  { id: 1, name: 'John', age: 28 },
  { id: 2, name: 'Jane', age: 32 },
  { id: 3, name: 'Michael', age: 25 },
  { id: 4, name: 'Emma', age: 40 },
  // more rows...
];
</script>
```

## 注意事项

- `rows` 数组的每一项会被渲染为一行，组件会自动将这些数据映射为表格的行。
- 虚拟滚动可以显著提高渲染性能，尤其是在表格有大量数据时。
- `rowHeight` 必须根据实际内容调整，确保每一行的显示效果合适。

