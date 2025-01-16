

# Button 组件

`Button` 组件是一个可自定义的按钮组件，支持不同类型、尺寸和样式。它用于触发用户交互事件，支持普通按钮、链接样式按钮和禁用按钮等多种状态，并且可以通过插槽插入自定义内容。

## 预览
<preview path="../../demos/button/button.vue" title="按钮组件使用" description="展示如何使用按钮组件，支持多种类型、大小和禁用状态。"></preview>

### 示例
```html
<se-button type="primary">Primary Button</se-button>
<se-button type="success" round>Success Button</se-button>
<se-button type="link" plain>Link Button</se-button>
<se-button type="danger" :disabled="true">Disabled Button</se-button>
```

---

## 基础配置

## 参数说明

| 参数名        | 类型         | 默认值      | 描述                                                                                       |
| ------------- | ------------ | ----------- | ------------------------------------------------------------------------------------------ | 
| `type`        | `String`     | `''`        | 按钮类型，用于设置按钮的样式。可选值：`primary`, `success`, `warning`, `danger`, `info`, `link`  
| `size`        | `String`     | `'medium'`  | 按钮的大小，支持 `small`, `medium`, `large` 三种大小。                                     | 
| `round`       | `Boolean`    | `false`     | 是否为圆形按钮，`true` 表示圆形，`false` 为普通矩形按钮。                                    | 
| `plain`       | `Boolean`    | `false`     | 是否为朴素按钮，`true` 表示背景透明，只有边框和文字。                                        | 
| `disabled`    | `Boolean`    | `false`     | 是否禁用按钮，`true` 表示禁用按钮，禁用状态下按钮无法点击。                                | 
| `onClick`     | `Function`   | `null`      | 点击按钮时的回调函数。点击按钮时，若提供此函数，会执行该函数。                            | 
| `customClass` | `String`     | `''`        | 自定义类名，用于进一步修改按钮的样式。                                                     | 

---

## 按钮类型 (`type`) 说明

`Button` 组件支持多种按钮类型，可以根据需求选择合适的类型来展现不同的视觉效果。常见的按钮类型包括：

- **primary**: 主按钮，通常用于突出显示的操作。
- **success**: 成功按钮，适用于表示成功的操作。
- **warning**: 警告按钮，适用于提醒用户注意的操作。
- **danger**: 危险按钮，适用于表示删除或危险的操作。
- **info**: 信息按钮，适用于展示信息或提示。
- **link**: 链接按钮，通常不显示背景，适合用作文本链接。

#### 示例：设置按钮类型
```html
<se-button type="primary">Primary Button</se-button>
<se-button type="success">Success Button</se-button>
<se-button type="danger">Danger Button</se-button>
<se-button type="link">Link Button</se-button>
```

---

## 按钮尺寸 (`size`) 说明

按钮组件支持三种尺寸：`small`, `medium`, `large`。根据不同的设计需求，选择合适的按钮大小。

- **small**: 小号按钮，适用于较小的操作或空间受限的地方。
- **medium**: 中号按钮，默认尺寸。
- **large**: 大号按钮，适用于需要突出显示的操作。

#### 示例：设置按钮尺寸
```html
<se-button type="primary" size="small">Small Button</se-button>
<se-button type="primary" size="medium">Medium Button</se-button>
<se-button type="primary" size="large">Large Button</se-button>
```

---

## 圆形按钮 (`round`) 说明

`round` 属性决定按钮是否为圆形按钮，若设置为 `true`，按钮会呈现圆形，通常适用于图标按钮或需要更多视觉突出的小型操作。

#### 示例：设置圆形按钮
```html
<se-button type="primary" round>Round Button</se-button>
```

---

## 朴素按钮 (`plain`) 说明

朴素按钮是一种透明背景的按钮，只有边框和文字，适用于需要轻量级按钮样式的场景。

#### 示例：设置朴素按钮
```html
<se-button type="primary" plain>Plain Button</se-button>
```

---

## 禁用按钮 (`disabled`) 说明

禁用按钮用于不允许用户点击的场景。禁用状态下，按钮的颜色会变淡，并且鼠标无法触发点击事件。

#### 示例：禁用按钮
```html
<se-button type="primary" :disabled="true">Disabled Button</se-button>
```

---

## 自定义类名 (`customClass`)

通过 `customClass` 属性，可以为按钮添加额外的自定义 CSS 类，进一步修改按钮的样式。

#### 示例：自定义类名
```html
<se-button type="primary" customClass="my-custom-button">Custom Button</se-button>
```

```css
/* 自定义样式 */
.my-custom-button {
    background-color: #ff5733;
    border-radius: 8px;
}
```

---

## 插槽内容 (`slots`)

`Button` 组件支持插槽，可以在按钮中插入任意的 HTML 或组件。默认插槽允许你插入按钮文本或其他自定义内容。

#### 示例：插槽内容
```html
<se-button type="primary">
    <span>按钮文字</span>
</se-button>
```



## 总结

`Button` 组件提供了丰富的自定义选项，支持不同的按钮类型、大小、圆形、朴素样式以及禁用状态，适合在各种 UI 设计中使用。通过合理配置按钮的属性，可以轻松实现符合业务需求的交互效果。
