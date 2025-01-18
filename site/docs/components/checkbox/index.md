# Checkbox (多选框) 
## 概述
`Checkbox` 组件用于在页面上创建多选框控件，允许用户选择一个或多个选项，广泛应用于表单填写、列表选择等场景。
## 预览
<preview path="../../demos/checkbox/checkbox.vue" title="基本使用" description=" "></preview>

## 基础用法

```vue
<template>
  <se-checkbox :options="options" v-model="selectedOptions">
    <p>已选择: {{ selectedOptions.length }} 个选项</p>
  </se-checkbox>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'CheckboxExample',
  setup() {
    const options = ref(['Option 1', 'Option 2', 'Option 3']);
    const selectedOptions = ref([]);
    return { options, selectedOptions };
  }
});
</script>
```

## 基础配置

### Checkbox 参数

| 参数名            | 类型                                           | 默认值               | 描述                                                                                                                                               |
| :---------------- |:---------------------------------------------|:------------------| :------------------------------------------------------------------------------------------------------------------------------------------------- |
| `options`         | `Array<string\|number>`                      | `[]`        | 复选框的选项数组，每个选项可以是字符串或数字。<br>示例：`['Option 1', 'Option 2', 'Option 3']`。该数组会用于渲染复选框的选项。                               |
| `modelValue`      | `Array<string\| number>`                     | `[]`        | 当前选中的选项列表，作为双向绑定的值。当用户选择或取消选择复选框时，该值会自动更新。用于同步组件状态。                                        |
| `size`            | `string`                                     | `middle`          | 控制复选框的大小，支持以下三种尺寸：<br> - `small` 小号复选框<br> - `middle` 中号复选框 (默认)<br> - `large` 大号复选框。  |
| `disabled`        | `boolean`                                    | `false`           | 控制复选框是否禁用：<br> - `true` 禁用复选框，用户无法操作<br> - `false` 可用状态，用户可以选择和取消选择复选框。 |
| `checkAllText`    | `string`                                     | `全选`              | “全选”按钮的文本内容，用户点击该按钮时，可以将所有选项标记为选中。默认文本为“全选”。                                                   |
| `clearText`       | `string`                                     | `清除`              | “清除”按钮的文本内容，用户点击该按钮时，可以将所有选项标记为未选中。默认文本为“清除”。                                                   |
| `onChange`        | `(selected: Array<string\| number>) => void` | `-`        | 当选项发生变化时的回调函数，传递当前已选择的选项数组。每当用户选择或取消选择一个选项时，都会调用该回调函数。此回调函数可以用于处理用户的选择数据。 |
| `onSelectAll`     | `() => void`                                 | `-`               | 当“全选”按钮被点击时触发的回调函数。此回调函数会在用户点击“全选”按钮时被调用。                                                         |
| `onDeselectAll`   | `() => void`                                 | `-`               | 当“清除”按钮被点击时触发的回调函数。此回调函数会在用户点击“清除”按钮时被调用。                                                           |

## 其他说明

#### 多选模式

`Checkbox` 组件支持多选功能，允许用户在多个选项中选择一个或多个选项。组件通过传递 `modelValue` 来实现双向绑定，更新选中的选项。当用户选择或取消选择复选框时，`modelValue` 会同步更新。

#### 自定义插槽

`Checkbox` 组件支持自定义插槽，你可以在复选框旁边渲染自定义的内容，例如文本、图标等。通过使用具名插槽或默认插槽，你可以灵活地扩展组件的功能和外观。

#### 禁用状态

通过设置 `disabled` 属性，你可以禁用复选框。禁用状态下，用户无法点击或选择该复选框。禁用状态下的复选框会有不同的样式，通常会表现为灰色显示。

#### 大小调整

`Checkbox` 组件允许用户根据需求调整复选框的大小。通过 `size` 属性，可以选择三种尺寸：`small`、`middle` 和 `large`。默认情况下，复选框的大小为中等 (`middle`)，你可以根据页面的设计需求选择适合的大小。

#### 全选与清除功能

`Checkbox` 组件提供了全选与清除的功能。当用户点击“全选”按钮时，所有复选框项将被选中；当用户点击“清除”按钮时，所有复选框项将被取消选中。你可以通过 `checkAllText` 和 `clearText` 属性自定义按钮的文本。

### 使用例子

#### 基本用法：

```vue
<template>
  <se-checkbox :options="options" v-model="selectedOptions">
    <p>已选择: {{ selectedOptions.length }} 个选项</p>
  </se-checkbox>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'CheckboxExample',
  setup() {
    const options = ref(['Option 1', 'Option 2', 'Option 3']);
    const selectedOptions = ref([]);
    return { options, selectedOptions };
  }
});
</script>
```

#### 使用全选和清除功能：

```vue
<template>
  <se-checkbox :options="options" v-model="selectedOptions" checkAllText="全选" clearText="清除">
    <p>已选择: {{ selectedOptions.length }} 个选项</p>
    <button @click="clearSelection">清除选择</button>
  </se-checkbox>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'CheckboxWithClear',
  setup() {
    const options = ref(['Option 1', 'Option 2', 'Option 3']);
    const selectedOptions = ref([]);
    const clearSelection = () => {
      selectedOptions.value = [];
    };
    return { options, selectedOptions, clearSelection };
  }
});
</script>
```

#### 禁用状态：

```vue
<template>
  <se-checkbox :options="options" v-model="selectedOptions" :disabled="true">
    <p>已选择: {{ selectedOptions.length }} 个选项</p>
  </se-checkbox>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'CheckboxDisabled',
  setup() {
    const options = ref(['Option 1', 'Option 2', 'Option 3']);
    const selectedOptions = ref([]);
    return { options, selectedOptions };
  }
});
</script>
```

## 注意

- **性能优化**：如果选项很多，建议通过虚拟滚动（Virtual Scroll）或分页的方式展示选项，以避免一次性加载所有选项导致性能问题。

- **样式自定义**：你可以通过修改 `Checkbox` 组件的样式类，定制复选框的外观，支持各种自定义样式和主题。如果需要特殊样式，可以通过 `class` 属性传递自定义样式类。

- **响应式设计**：`Checkbox` 组件适用于各种屏幕尺寸，尤其是在移动端，用户可以便捷地进行选择。根据屏幕宽度，复选框会自适应调整尺寸，提供更好的用户体验。

---


