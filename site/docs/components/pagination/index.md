# `Pagination` 组件文档
## 概述

`Pagination`（分页）组件是一个用于分页显示数据的 UI 组件，允许用户浏览和控制数据的不同页数。它通常用于数据量较大的场景，如数据表格、列表显示等，帮助用户通过分页导航查看不同的内容。该组件支持多种功能，如上一页、下一页按钮、跳转至某一页、选择每页显示条目数等。


## 预览
<preview path="../../demos/pagination/pagination.vue" title="基本使用" description=" "></preview>

## 功能特点
- **上一页/下一页**：用户可以通过点击“上一页”或“下一页”按钮来翻页。
- **快速跳转**：通过输入框快速跳转到某一页。
- **选择每页显示条目数**：用户可以选择每页显示的数据条目数（例如：10、20、50 等）。
- **页码显示**：支持显示页码，并在需要时添加省略号（`...`）表示中间的页码区间。
- **禁用状态**：分页按钮（上一页、下一页）在翻页时可以被禁用。

## `Pagination` 参数

| 参数名              | 类型            | 默认值             | 描述                                                                                     | 示例和跳转 Demo                          |
| ------------------- | --------------- | ------------------ | ---------------------------------------------------------------------------------------- | -------------------------------------- |
| `total`             | `number`        | 必填               | 数据的总条目数，用于计算分页的总页数。                                                       | [示例](../../demos/pagination/pagination.vue) |
| `currentPage`       | `number`        | `1`                | 当前页码，表示当前展示的是哪一页。                                                          | [示例](../../demos/pagination/pagination.vue) |
| `pageSize`          | `number`        | `10`               | 每页显示的条目数，表示每页展示多少条数据。                                                  | [示例](../../demos/pagination/pagination.vue) |
| `pageSizeOptions`   | `number[]`      | `[10, 20, 50, 100]`| 每页显示条目数的选项数组，用户可以选择每页显示的条目数。                                       | [示例](../../demos/pagination/pagination.vue) |
| `showQuickJumper`   | `boolean`       | `false`            | 是否显示快速跳转输入框，允许用户直接输入页码进行跳转。                                       | [示例](../../demos/pagination/pagination.vue) |
| `showTotal`         | `boolean`       | `false`            | 是否显示总条目数的统计信息，例如：`共 100 条`。                                              | [示例](../../demos/pagination/pagination.vue) |
| `simple`            | `boolean`       | `false`            | 是否使用简洁模式，简洁模式只显示上一页、下一页和页码，省略其他功能。                        | [示例](../../demos/pagination/pagination.vue) |

## `Pagination` 事件

| 事件名                | 参数        | 描述                                                    |
| --------------------- | ----------- | ------------------------------------------------------- |
| `update:currentPage`   | `number`    | 当当前页改变时触发，返回新的页码值。                       |
| `update:pageSize`      | `number`    | 当每页条目数改变时触发，返回新的每页条目数。               |

## 其他说明

- **上一页/下一页**：分页组件提供“上一页”和“下一页”按钮，用户可以通过点击这些按钮来切换当前页码。
- **省略号显示**：当分页的页码过多时，分页按钮中会自动显示省略号（`...`），只显示当前页及其前后页，提升用户体验。
- **快速跳转**：用户可以通过输入框快速跳转到指定页码。该功能支持页码范围的限制，确保用户只能跳转到有效页码。
- **每页显示条目数**：用户可以通过下拉框选择每页显示的条目数。当用户改变每页显示的条目数时，分页组件会自动更新并触发事件。
- **简洁模式**：简洁模式只显示必要的分页元素，如页码、上一页、下一页，隐藏其他功能，使界面更加简洁。

## 使用示例

```vue
<template>
  <se-pagination
    :total="100"
    :currentPage="currentPage"
    :pageSize="pageSize"
    :pageSizeOptions="[10, 20, 50]"
    showQuickJumper
    showTotal
    @update:currentPage="handlePageChange"
    @update:pageSize="handlePageSizeChange"
  />
</template>

<script setup>
import { ref } from "vue";
import SePagination from "@/components/SePagination.vue";

const currentPage = ref(1);
const pageSize = ref(10);

// 处理当前页变化
const handlePageChange = (newPage) => {
  currentPage.value = newPage;
};

// 处理每页条目数变化
const handlePageSizeChange = (newSize) => {
  pageSize.value = newSize;
};
</script>
```

## 样式说明

- **分页按钮**：分页按钮（上一页、下一页、页码）使用 `flex` 布局排列，确保分页元素在不同屏幕尺寸下能正确显示。
- **省略号**：当页码数过多时，会显示省略号（`...`）来替代中间的页码。
- **快速跳转输入框**：输入框用于输入跳转页码，支持数字输入和校验。输入框的设计与分页按钮并列，确保分页布局整洁美观。

### 视觉效果
- 在常规分页模式下，分页按钮与页码之间有适当的间距，确保布局清晰。
- 在简洁模式下，仅显示必要的分页元素（上一页、下一页和页码），并使用更紧凑的布局，使其适用于对界面简洁度有更高要求的场景。
