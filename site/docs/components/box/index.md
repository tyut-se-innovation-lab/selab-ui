    

# Box(盒子)
## 概述
`Box` 组件是一个容器组件，旨在帮助你轻松创建带有不同样式和内容的盒子。它可以用于各种 UI 布局中，支持多种类型的样式、插槽内容、自定义类名等功能。

## 预览
<preview path="../../demos/box/box.vue" title="基本使用" description="展示如何使用基本的 Box 组件，包含不同的类型和插槽内容。"></preview>

### 示例
```html
<se-box>测试</se-box>
```

---

## 基础配置

## 参数说明

| 参数名        | 类型     | 默认值      | 描述                                                                                       |
| ------------- | -------- | ----------- | ------------------------------------------------------------------------------------------ | 
| `type`        | `String` | `''`        | 用于设置 Box 组件的类型，控制其样式。可选值：`primary`, `secondary`, `success`, `warning`, `info`, `custom` | 
| `tag`         | `String` | `'div'`     | 用于自定义渲染的 HTML 标签。默认是 `div`，可以选择其他标签（如 `section`、`article` 等）。   | 
| `customClass` | `String` | `''`        | 为 Box 组件添加额外的自定义类名，方便进行样式扩展和个性化设计。                          | 
| `slots`       | `VNode`  | `null`      | 支持默认插槽和具名插槽，可以将自定义内容插入到 Box 组件内。                                | 

---

## 类型 (`type`) 说明

`Box` 组件通过 `type` 参数支持不同的样式。通过设置不同的类型，组件的外观和颜色会发生变化，适应不同的业务需求。以下是可用的类型及其对应样式：

- `primary`: 蓝色主题，适用于需要突出显示的重要内容。
- `secondary`: 灰色主题，适用于次要或辅助性内容。
- `success`: 绿色主题，表示成功或通过的状态。
- `warning`: 黄色主题，表示警告或需要注意的内容。
- `info`: 蓝绿色主题，用于提示信息。
- `custom`: 自定义样式，允许你通过自定义类名来修改样式。

#### 示例：基础使用
```html
<se-box>这是一个基础的 Box</se-box>
```

#### 示例：设置类型
```html
<se-box type="primary">这是一个 primary 类型的 Box</se-box>
<se-box type="success">这是一个 success 类型的 Box</se-box>
```

---

## 标签 (`tag`) 说明

`tag` 属性允许你自定义渲染的 HTML 标签，默认为 `div`，你可以根据实际需求将其更改为其他标签，如 `section` 或 `article`，以增强语义化。

#### 示例：自定义标签
```html
<se-box type="info" tag="section">这是一个使用 section 标签的 Box</se-box>
```

---

## 自定义类名 (`customClass`)

通过 `customClass` 属性，你可以为 `Box` 组件添加一个或多个额外的 CSS 类，进而应用定制化的样式。这样，你可以在不修改组件本身的情况下，轻松实现样式定制。

#### 示例：自定义类名
```html
<se-box type="warning" customClass="my-custom-box">这是一个带有自定义类名的 Box</se-box>
```

```css
/* 自定义样式 */
.my-custom-box {
    border: 2px dashed red;
    background-color: #fff4f4;
}
```

---

## 插槽内容 (`slots`)

`Box` 组件支持插槽，可以插入任意的内容（如文本、按钮、图标或其他组件）以增强其灵活性。你可以通过默认插槽或具名插槽来传递内容。

#### 示例：插槽内容
```html
<se-box type="info">
    <p>这是插槽中的内容，可以是任意 HTML 或组件。</p>
    <button>点击按钮</button>
</se-box>
```

---

## 高级用法

## 响应式设计

`Box` 组件支持响应式设计，确保在不同屏幕尺寸下都能良好展示。你可以通过 `@media` 媒体查询自定义样式，调整 `Box` 的内边距、字体大小等，确保组件在各种设备上都具有良好的显示效果。

#### 示例：响应式样式
```less
@media (max-width: 768px) {
    .se-box {
        font-size: 14px;
        padding: 12px;
    }
}
```

---

## 其他说明

1. **交互效果**：所有类型的 `Box` 都包含简单的 `hover` 效果，在鼠标悬停时，组件的背景色和边框颜色会发生变化，提供用户交互反馈。
2. **默认样式**：`Box` 组件自带基础的边框、圆角、内边距等样式，可根据需要通过 `type`、`customClass` 和 `tag` 属性进行扩展。
3. **主题支持**：`Box` 组件通过不同的 `type` 属性支持多种视觉主题，适应不同的 UI 风格和设计需求。


## 总结

`Box` 组件是一个灵活的容器，支持通过参数配置、插槽内容和自定义样式进行定制，适用于各种 UI 布局。它使得在 Vue 项目中创建容器变得更加简便和高效。
