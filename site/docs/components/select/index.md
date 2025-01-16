# Select组件文档

`Select` 是一个通用的下拉选择组件，支持单选、多选、可搜索等多种功能，满足不同场景的需求。

## 预览
<preview path="../../demos/select/select.vue" ></preview>

### 基本使用
通过传递必要的属性即可快速使用。


## 参数配置

| 参数名                | 类型                       | 默认值                  | 描述                                                                                  |
| :-------------------- | :------------------------- | :---------------------- | :------------------------------------------------------------------------------------ |
| `placeholder`         | `string`                  | `'请输入内容'`          | 占位符文本，用于在未选择内容时显示提示。                                              |
| `options`             | `ISelectOption[]`         | `[]`                    | 可选项列表，数组中的每一项需包含 `value` 和 `label`。                                 |
| `multiple`            | `boolean`                 | `false`                 | 是否支持多选，默认为单选。                                                           |
| `modelValue`          | `string \| number \| string[] \| number[]` | `undefined` | 当前选中项的值，支持单选值或多选数组。                                               |
| `autoClearSearchValue`| `boolean`                 | `true`                  | 是否在多选模式下自动清空搜索框的值。                                                 |
| `filterable`          | `boolean`                 | `false`                 | 是否支持搜索过滤功能。                                                               |
| `filterMethod`        | `(value: string) => void` | `undefined`             | 自定义搜索过滤方法，用于实现复杂的筛选逻辑。                                          |
| `queryMethod`         | `(value: string) => void` | `undefined`             | 自定义查询方法，可在搜索时触发异步请求以获取选项。                                    |

---

## 插槽说明

| 插槽名      | 描述                                                                                  |
| :---------- | :------------------------------------------------------------------------------------ |
| `default`   | 用于自定义下拉选项内容。                                                              |

---

## 事件说明

| 事件名                | 参数                          | 描述                                                                                  |
| :-------------------- |:----------------------------| :------------------------------------------------------------------------------------ |
| `update:modelValue`   | `(value: string \| number)` | 选中值更新时触发，返回选中的值，支持单选和多选场景。                                   |

---

## 使用方法

### 基本使用
```vue
<se-select
    v-model="selectedValue"
    :options="[{ value: 1, label: '选项一' }, { value: 2, label: '选项二' }]"
    placeholder="请选择一个选项"
/>
```

### 多选模式
```vue
<se-select
    v-model="selectedValues"
    :options="[{ value: 1, label: '选项一' }, { value: 2, label: '选项二' }]"
    placeholder="请选择多个选项"
    multiple
/>
```

### 可搜索
```vue
<se-select
    v-model="selectedValue"
    :options="[{ value: 1, label: '选项一' }, { value: 2, label: '选项二' }]"
    placeholder="请输入关键词"
    filterable
/>
```

---

## 样式说明

| 类名                               | 描述                                                                                  |
| :--------------------------------- | :------------------------------------------------------------------------------------ |
| `.se-select`                       | 选择组件的基础样式。                                                                  |
| `.se-select-selected`              | 选中时应用的样式。                                                                    |
| `.se-select-dropdown`              | 下拉框的样式。                                                                        |
| `.se-select-dropdown-item`         | 下拉选项的样式。                                                                      |
| `.se-select-dropdown-item-selected`| 被选中选项的样式。                                                                    |

---

## 注意事项
1. `options` 参数必须包含唯一的 `value` 和显示用的 `label` 字段。
2. 开启 `multiple` 时，`modelValue` 必须为数组类型。
