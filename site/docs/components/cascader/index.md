

# Cascader (级联选择)
## 概述
这是 `Cascader` (级联选择)组件，用于选择一系列层级的选项，支持多层级的级联选择，适用于需要层级关系选择的场景。

## 预览
<preview path="../../demos/cascader/cascader.vue" title="基本使用" description="基本级联选择组件的示例"></preview>

## 参数说明

### Cascader 参数

| 参数名         | 类型                         | 默认值   | 描述                                                                                     | 示例                                                         |
| -------------- | ---------------------------- | -------- | ---------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| `options`      | `Array<Option>`               | 必填     | 可选项数据源，数组类型，每个选项包含 `value`、`label` 和可选的 `children` 字段。        | `[{ value: '1', label: '浙江', children: [{ value: '11', label: '杭州' }] }]` |
| `placeholder`  | `String`                      | `'请选择'` | 输入框的占位符，未选择时显示的提示文本。                                                  | `'请选择地区'`                                               |

### Cascader 方法

#### `handleSelect(option: Option, level: number)`

- **描述**：处理选择事件，选中一个选项后，更新选中的值并进入下一级选项选择。
- **参数**：
    - `option`: 当前选中的选项，类型为 `Option`。
    - `level`: 当前层级，类型为 `number`，从 0 开始。

#### `handleRemove()`

- **描述**：处理删除事件，清空已选的所有值和已选择的选项。

#### `toggleDropdown()`

- **描述**：切换下拉框的显示与隐藏。

#### `renderOptions(options: Option[], level: number)`

- **描述**：渲染当前层级的选项列表。每个选项可以通过点击选择，选中后会更新相应层级的选项。

#### `renderInput()`

- **描述**：渲染输入框，点击后可以显示或隐藏下拉框。

#### `handleClickOutside(event: MouseEvent)`

- **描述**：监听点击事件，点击外部区域时关闭下拉框。

## 事件说明

| 事件名         | 参数                             | 描述                                                                                         |
| -------------- | -------------------------------- | -------------------------------------------------------------------------------------------- |
| `update:modelValue` | `string[]`                    | 当选择的值发生变化时触发，返回选中的路径值。                                                   |
| `change`       | `string[]`                      | 选择项变化时触发，返回选中的所有值。                                                           |
| `select`       | `string`                        | 当某个选项被选择时触发，返回被选择的单个选项的 `value`。                                        |

## 样式说明

`Cascader` 组件使用了 `less` 样式，样式文件位于 `../../less/components/cascader/index.less`。

可以通过自定义类名来修改样式，例如：
- `se-cascader`：组件根元素的类名。
- `se-cascader-input`：输入框的类名。
- `se-cascader-clear`：清除按钮的类名。
- `se-cascader-dropdown`：下拉框容器的类名。
- `se-cascader-option`：每个选项的类名。

## 使用示例

```tsx
<SeCascader
  v-model:modelValue={selectedValue}
  :options="options"
  placeholder="请选择地区"
  @update:modelValue="handleValueChange"
  @change="handleChange"
  @select="handleSelect"
/>
```

### 组件演示

1. 选择“浙江”时，展示“杭州”作为下一级的选项。
2. 在选择过程中，用户可以随时删除选中的选项，并重新选择。

## 总结

`Cascader` 组件适合用于需要分层次选择的场景，支持自定义数据源、占位符及层级结构的配置，并提供了多种事件处理和样式定制方式。
