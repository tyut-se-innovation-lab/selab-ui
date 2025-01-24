
# Grid (栅格)
## 概述

这是 `Grid` (栅格) 组件的文档，`Grid` 组件提供了简单的布局方式，适用于响应式设计，能够高效地将页面分成不同的列，适应各种不同的设计需求。

## 预览

<preview path="../../demos/grid/grid.vue" title="基本使用" description="通过 Grid 组件轻松实现栅格布局，支持设置列数和间距。"></preview>

## 功能概述

`Grid` 组件实现了简单且高效的栅格布局功能，适用于各种前端项目。在使用时可以灵活设置列数和间距，使得页面布局更加灵活和适应不同的屏幕尺寸。

## 基础配置

通过 `Grid` 组件，用户可以控制布局的列数以及列之间的间距。以下是该组件的基本配置项。

## Grid 参数

| 参数名      | 类型                       | 默认值 | 描述                                                                                | 跳转 Demo                                 |
| :---------- | :------------------------- | :----- | :---------------------------------------------------------------------------------- | :---------------------------------------- |
| `columns`   | `Number`                   | 3      | 设置栅格的列数，支持1到6列的设置。                                                     | [查看 Demo](../../demos/grid/grid.vue)   |
| `gap`       | `Number`                   | 10     | 设置列与列之间的间距，支持 5px、10px、15px、20px 等间距设置。                          | [查看 Demo](../../demos/grid/grid.vue)   |
| `type`      | `String`                   | `grid` | 栅格布局的类型，目前仅支持 `grid` 布局。                                               | -                                        |

## 参数说明

- **`columns`**：该属性用于设置 `Grid` 的列数。支持的值是：1、2、3、4、5、6 列。根据设置的列数，`Grid` 会自动计算每列的宽度，使得网格布局在不同屏幕尺寸下具有自适应能力。

- **`gap`**：用于设置列与列之间的间距。该属性的值支持不同大小的间距（例如：5px、10px、15px、20px），可以灵活调整网格项之间的间距。

- **`type`**：该属性用于指定栅格布局的类型。目前，该组件仅支持 `grid` 布局类型，后续可能会支持更多布局方式。

---

## 其他说明

1. **响应式设计**：`Grid` 组件支持响应式设计，根据列数和间距的设置可以自动适配不同设备的屏幕尺寸。

2. **自定义样式**：组件的默认样式可以通过 `less` 文件进行定制。如果需要修改 `Grid` 的外观，您可以通过修改 `less` 文件来定制列宽、间距、背景色等样式。

3. **网格项**：`Grid` 组件内的每个子项（即 `div`）会默认有一定的内边距、背景色和圆角样式，您可以通过样式覆盖这些默认样式来调整外观。

---

## 使用说明

### 基本使用

通过 `Grid` 组件，您可以轻松实现栅格布局，适用于各种页面设计。以下是一个基本示例，展示了如何使用 `Grid` 组件设置列数和间距。

#### 示例代码

```vue
<template>
  <div>
    <h3>基本栅格布局</h3>
    <se-grid :columns="4" :gap="10">
      <div>项1</div>
      <div>项2</div>
      <div>项3</div>
      <div>项4</div>
      <div>项5</div>
      <div>项6</div>
    </se-grid>
  </div>
</template>


```

在这个示例中，`se-grid` 设置了 4 列和 10px 的间距，包含 6 个网格项。通过配置 `columns` 和 `gap` 属性，您可以灵活地调整栅格布局的列数和项之间的间距。

---

### 高级用法

您还可以通过动态设置 `columns` 和 `gap` 属性的值来实现响应式布局，适应不同的屏幕宽度和设计需求。

#### 示例代码

```vue
<template>
  <div>
    <h3>响应式栅格布局</h3>
    <se-grid :columns="columns" :gap="gap">
      <div>项1</div>
      <div>项2</div>
      <div>项3</div>
      <div>项4</div>
    </se-grid>
  </div>
</template>

<script>

export default {

  data() {
    return {
      columns: 3, // 设置默认列数
      gap: 15 // 设置默认间距
    };
  },
  mounted() {
    // 根据屏幕宽度调整列数和间距
    window.addEventListener('resize', this.updateGridLayout);
    this.updateGridLayout();
  },
  methods: {
    updateGridLayout() {
      if (window.innerWidth < 600) {
        this.columns = 1; // 小屏幕，设置为1列
        this.gap = 5; // 小屏幕，间距更小
      } else if (window.innerWidth < 1024) {
        this.columns = 2; // 中屏幕，设置为2列
        this.gap = 10;
      } else {
        this.columns = 3; // 大屏幕，设置为3列
        this.gap = 15;
      }
    }
  }
};
</script>
```

在这个示例中，`columns` 和 `gap` 会根据屏幕的宽度进行动态调整，从而实现响应式的栅格布局。

