以下是关于 `Input` (输入框)组件文档的完整说明：

---

# Input（输入框）

`Input` 是一个通用的输入框组件，支持单选和多选模式，并提供筛选、标签显示以及滚动面板功能。

---

## 预览
<preview path="../../demos/input/input.vue" title="基本使用" description="展示基本的单选、多选及筛选功能"></preview>

---

## Input 的基础配置

`Input` 支持多种自定义参数，适配不同的使用场景。

---

## Input 参数

| 参数名          | 类型                             | 默认值                | 描述                                                                                     | 跳转 Demo                                 |
| :-------------- | :------------------------------- | :-------------------- | :--------------------------------------------------------------------------------------- | :---------------------------------------- |
| `options`       | `Array<{ value, label }>`        | `[]`                  | 下拉框可供选择的选项列表，每个选项包含 `value` 和 `label` 字段。                          | [基本使用](#基本使用)                     |
| `placeholder`   | `String`                         | `'Enter text...'`     | 输入框的占位文本，支持动态占位符调整。                                                   | [基本使用](#基本使用)                     |
| `multiSelect`   | `Boolean`                        | `false`               | 是否启用多选模式，多选时选中的选项将以标签形式显示在输入框内。                            | [多选模式](#多选模式)                     |
| `showDropdown`  | `Boolean`                        | `true`                | 是否显示下拉面板，可以通过参数手动控制下拉框显示与隐藏。                                   | [隐藏下拉框](#隐藏下拉框)                 |
| `filterable`    | `Boolean`                        | `true`                | 是否启用筛选功能，启用后可通过输入关键字动态过滤下拉选项。                                | [筛选功能](#筛选功能)                     |
| `itemHeight`    | `Number`                         | `40`                  | 下拉选项的单项高度（仅在虚拟滚动时生效）。                                               | [虚拟滚动](#虚拟滚动)                     |
| `visibleCount`  | `Number`                         | `10`                  | 下拉面板可见选项的数量（仅在虚拟滚动时生效）。                                            | [虚拟滚动](#虚拟滚动)                     |
| `keyField`      | `String`                         | `'value'`             | 指定选项的唯一键值字段，用于区分每个选项。                                                | [自定义字段](#自定义字段)                 |

---

## Input 方法

| 方法名          | 参数                        | 返回值        | 描述                                     |
| :-------------- | :-------------------------- | :------------ | :--------------------------------------- |
| `handleOptionClick` | `{ value, label }`        | 无            | 点击选项后的回调函数，可在内部更新已选值。 |
| `handleTagRemove`   | `{ value, label }`        | 无            | 点击标签的删除按钮后的回调函数。           |

---

## 其他说明

1. **单选与多选模式**  
   `Input` 组件支持单选和多选模式，默认为单选模式。  
   在多选模式下，选中的选项会以标签形式显示在输入框内。

2. **筛选功能**  
   启用 `filterable` 参数后，可以根据输入的关键字动态筛选下拉选项，提升用户体验。

3. **虚拟滚动支持**  
   对于选项数量较多的场景，`Input` 提供虚拟滚动功能，通过 `itemHeight` 和 `visibleCount` 参数优化性能。

4. **占位符动态调整**  
   如果存在选中的选项，`placeholder` 文本将自动隐藏，保持布局的简洁性。

5. **事件冒泡处理**  
   组件内部处理了点击事件的冒泡问题，避免在多层嵌套结构中产生意外的关闭行为。

---

## 示例代码

#### 单选模式
```vue
<template>
    <SeInput
        :options="options"
        placeholder="请选择"
    />
</template>

<script>
export default {
    data() {
        return {
            options: [
                { value: 1, label: '选项1' },
                { value: 2, label: '选项2' },
                { value: 3, label: '选项3' },
            ],
        };
    },
};
</script>
```

#### 多选模式
```vue
<template>
    <SeInput
        :options="options"
        :multiSelect="true"
        placeholder="请选择多个选项"
    />
</template>

<script>
export default {
    data() {
        return {
            options: [
                { value: 1, label: '选项1' },
                { value: 2, label: '选项2' },
                { value: 3, label: '选项3' },
            ],
        };
    },
};
</script>
```

#### 筛选与虚拟滚动
```vue
<template>
    <SeInput
        :options="largeOptions"
        :filterable="true"
        :itemHeight="50"
        :visibleCount="15"
        placeholder="搜索选项"
    />
</template>

<script>
export default {
    data() {
        return {
            largeOptions: Array.from({ length: 1000 }, (_, i) => ({
                value: i,
                label: `选项${i + 1}`,
            })),
        };
    },
};
</script>
```


