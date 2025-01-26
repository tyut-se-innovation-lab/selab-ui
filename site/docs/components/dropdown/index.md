
# Dropdown (下拉菜单)
## 概述
`Dropdown` 组件是一个灵活的弹出式菜单，广泛应用于各种界面中用于显示和选择操作项。它支持自定义触发方式（如点击或鼠标悬停），以及自定义菜单的位置、禁用状态等功能。通过 Dropdown，开发者可以方便地在应用中集成动态菜单，提升用户交互体验。

## 预览

<preview path="../../demos/dropdown/dropdown.vue" title="基本使用" description="展示如何使用 Dropdown 组件的基本功能"></preview>

## 基础使用

使用 `Dropdown` 组件时，只需在组件内传入菜单项和触发方式，即可快速实现下拉菜单的功能。你可以通过配置不同的参数，控制下拉菜单的外观和行为。

```vue
<template>
  <se-dropdown :menuItems="menuItems" @onSelect="handleSelect">
    <template #trigger>
      <button>点击触发下拉</button>
    </template>
  </se-dropdown>
</template>

<script setup>
import { ref } from "vue";
import SeDropdown from "@/components/SeDropdown";

const menuItems = ref(["选项1", "选项2", "选项3"]);

const handleSelect = (selectedItem) => {
  console.log("选中了: ", selectedItem);
};
</script>
```

## Dropdown 参数

| 参数名      | 类型                         | 默认值   | 描述                                                        |
| ----------- | ---------------------------- | -------- | ----------------------------------------------------------- |
| `type`      | `String`                     | `"default"` | 控制下拉菜单的类型，支持 `default` 和其他类型的自定义样式。 |
| `trigger`   | `String`                     | `"click"` | 控制触发方式，支持 `click`（点击触发）或 `hover`（鼠标悬停触发）。|
| `placement` | `String`                     | `"bottomLeft"` | 控制下拉菜单的位置，支持 `bottomLeft`, `bottomRight`, `topLeft`, `topRight`。 |
| `disabled`  | `Boolean`                    | `false`  | 是否禁用下拉菜单，禁用状态下无法触发下拉操作。               |
| `menuItems` | `Array<string>`              | `[]`     | 下拉菜单显示的菜单项数组，支持动态数据传入。                 |

## Dropdown 事件

| 事件名      | 参数             | 描述                           |
| ----------- | ---------------- | ------------------------------ |
| `onSelect`  | `selectedItem`    | 当用户选择一个菜单项时触发，`selectedItem` 为选中的菜单项内容。 |

## 示例

#### 1. 基本点击触发的下拉菜单
```vue
<template>
  <se-dropdown :menuItems="['选项1', '选项2', '选项3']" @onSelect="handleSelect" trigger="click">
    <template #trigger>
      <button>点击显示下拉菜单</button>
    </template>
  </se-dropdown>
</template>

<script setup>
import { ref } from 'vue';

const handleSelect = (selectedItem) => {
  console.log('你选择了: ', selectedItem);
};
</script>
```

#### 2. 悬停触发的下拉菜单
```vue
<template>
  <se-dropdown :menuItems="['选项1', '选项2', '选项3']" @onSelect="handleSelect" trigger="hover">
    <template #trigger>
      <button>鼠标悬停显示下拉菜单</button>
    </template>
  </se-dropdown>
</template>

<script setup>
import { ref } from 'vue';

const handleSelect = (selectedItem) => {
  console.log('你选择了: ', selectedItem);
};
</script>
```

#### 3. 动态加载菜单项
```vue
<template>
  <se-dropdown :menuItems="menuItems" @onSelect="handleSelect">
    <template #trigger>
      <button>点击触发动态加载菜单</button>
    </template>
  </se-dropdown>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const menuItems = ref([]);

const handleSelect = (selectedItem) => {
  console.log('你选择了: ', selectedItem);
};

// 模拟动态加载菜单项
onMounted(() => {
  setTimeout(() => {
    menuItems.value = ['选项A', '选项B', '选项C'];
  }, 1000);
});
</script>
```

## 样式说明

`Dropdown` 组件有多个内置样式类来帮助开发者定制样式：

- `.se-dropdown`: 用于整个下拉菜单容器。
- `.se-dropdown--visible`: 当菜单可见时，应用的类。
- `.se-dropdown--disabled`: 当下拉菜单禁用时，应用的类。
- `.se-dropdown-item`: 用于菜单项的类。
- `.se-dropdown-item--selected`: 用于选中状态的菜单项类。

你可以根据需要进一步自定义这些样式，或者通过传入不同的 `type` 和 `placement` 属性来快速改变下拉菜单的外观。

## 其他说明

- **动态数据**：你可以将一个 `menuItems` 数组传入 `Dropdown` 组件，支持动态生成菜单项。也可以通过其他方式（如 API 请求、异步加载等）更新菜单项。
- **菜单位置**：`placement` 参数允许你控制下拉菜单显示的位置。根据需求，你可以将菜单定位在触发器的顶部或底部，以及左对齐或右对齐。

## 常见问题

### 1. 下拉菜单为什么会自动消失？

确保你的触发器没有被点击或悬停之外的其他操作影响。我们可以通过监听点击外部区域的事件来手动控制菜单的关闭。

### 2. 如何处理多级菜单？

如果需要多级菜单，你可以将菜单项嵌套到子组件中，或者手动构建多级结构。
