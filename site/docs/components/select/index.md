# Select

## 概述

`SeSelect` 是一个功能丰富的下拉选择组件，支持以下功能：
- 单选和多选模式。
- 输入内容动态过滤选项。
- 可选的虚拟滚动功能（适合大数据量场景）。
- 支持禁用已选选项，提升用户体验。

该组件灵活高效，适用于多种场景，如表单输入、多标签选择等。

## 预览
<preview path="../../demos/select/select.vue" ></preview>

## 属性（Props）

| 属性名             | 类型                                                | 默认值               | 描述                                             |
|--------------------|---------------------------------------------------|----------------------|------------------------------------------------|
| `options`          | `Array<{ value: string | number; label: string }>` | 必填                | 数据源，包含每个选项的 `value` 和 `label`。      |
| `placeholder`      | `String`                                          | `'请输入内容...'`     | 输入框的占位文本。                              |
| `multiple`         | `Boolean`                                         | `false`              | 是否启用多选模式。                              |
| `enableVirtualScroll` | `Boolean`                                       | `false`              | 是否启用虚拟滚动（适合选项较多时）。             |



## 插槽

目前未提供插槽支持，但可以通过 `options` 属性动态渲染选项。


## 方法

### 1. `handleInputFocus`
- **描述**：显示下拉框。
- **使用场景**：点击输入框时自动触发。

### 2. `handleOptionClick`
- **描述**：处理选项的点击事件。
- **参数**：
    - `option`：被点击的选项对象，包含 `value` 和 `label`。
- **使用场景**：选择或取消选中某个选项。

### 3. `handleTagRemove`
- **描述**：移除多选模式下已选中的标签。
- **参数**：
    - `tag`：要移除的标签对象，包含 `value` 和 `label`。
- **使用场景**：在多选模式下点击标签的关闭按钮时触发。

---

## 示例用法

### 1. 单选模式
```vue
<template>
  <se-select
    :options="options"
    placeholder="请选择一个选项"
  />
</template>

<script lang="ts">
import SeSelect from './SeSelect.vue';

export default {
  components: { SeSelect },
  data() {
    return {
      options: [
        { value: 1, label: '选项一' },
        { value: 2, label: '选项二' },
        { value: 3, label: '选项三' },
      ],
    };
  },
};
</script>
```

---

### 2. 多选模式
```vue
<template>
  <se-select
    :options="options"
    multiple
    placeholder="请选择多个选项"
  />
</template>

<script lang="ts">
import SeSelect from './SeSelect.vue';

export default {
  components: { SeSelect },
  data() {
    return {
      options: [
        { value: 'a', label: '苹果' },
        { value: 'b', label: '香蕉' },
        { value: 'c', label: '橙子' },
      ],
    };
  },
};
</script>
```

---

### 3. 启用虚拟滚动
```vue
<template>
  <se-select
    :options="largeOptions"
    enableVirtualScroll
    placeholder="搜索或选择"
  />
</template>

<script lang="ts">
import SeSelect from './SeSelect.vue';

export default {
  components: { SeSelect },
  data() {
    return {
      largeOptions: Array.from({ length: 1000 }, (_, i) => ({
        value: i,
        label: `选项 ${i + 1}`,
      })),
    };
  },
};
</script>
```

---

## 样式说明

组件包含以下主要样式类，开发者可根据需求覆盖默认样式：

| 样式类                | 描述                                   |
|-----------------------|--------------------------------------|
| `.input-with-virtual-dropdown` | 包裹整个组件的容器。                   |
| `.input-container`     | 输入框和已选标签的外部容器。              |
| `.input-field`         | 输入框的样式类。                        |
| `.dropdown`            | 下拉框的样式类。                        |
| `.dropdown-item`       | 下拉框中每个选项的样式类。                |
| `.dropdown-item-disabled` | 禁用状态选项的样式类。                   |

---

## 注意事项

1. **数据格式要求**：`options` 的每个元素需包含 `value` 和 `label` 属性，分别表示选项的值和显示文本。
2. **事件监听清理**：组件内部动态绑定了全局 `click` 事件以监听外部点击，确保在下拉框打开时关闭事件生效。
3. **禁用状态**：选项被选中后会自动设置为禁用状态，避免重复选择。

