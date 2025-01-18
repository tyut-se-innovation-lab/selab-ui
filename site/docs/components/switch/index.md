# Switch (开关) 
## 概述

`Switch`（开关）组件是一种常用的 UI 控件，通常用于表示某个选项或功能的开启与关闭状态。在移动应用和网页应用中，开关可以帮助用户快速切换设置或控制功能的状态，提供直观的交互方式。该组件支持多种定制选项，如尺寸、文字描述以及禁用状态，能够满足不同场景下的需求。

## 主要功能

- **绑定值**：通过 `v-model` 属性，用户可以轻松地与其他表单元素或应用状态进行双向绑定。
- **尺寸**：支持多种尺寸设置，可以根据界面设计要求调整开关的大小。
- **文字描述**：可以通过 `inactiveText` 和 `activeText` 设置开关开启与关闭状态时的文字提示，提升用户体验。
- **禁用状态**：提供禁用状态设置，确保在特定情况下，开关不可操作。

---

## 组件预览与使用

### 基本使用

通过以下示例可以了解如何使用 `Switch` 组件实现基本的开关效果：

<preview path="../../demos/switch/switch.vue" title="基本使用" description="基本的 Switch 组件实现，展示开启与关闭的状态切换。"></preview>

### 尺寸设置

`Switch` 组件的尺寸可以根据需求进行调整，适应不同的界面设计：

<preview path="../../demos/switch/switchLarge.vue" title="尺寸的使用" description="展示不同尺寸的 Switch 组件。"></preview>

### 文字描述

使用 `inactiveText` 和 `activeText` 属性，可以设置开关在不同状态下显示的文字描述，以便用户更清晰地理解当前的状态：

<preview path="../../demos/switch/switchWriting.vue" title="文字描述" description="通过 `inactiveText` 和 `activeText` 设置开关的文字描述。"></preview>

### 禁用状态

`Switch` 组件支持禁用状态，禁用时用户无法进行任何交互操作，适用于不允许修改的设置：

<preview path="../../demos/switch/disableSwitch.vue" title="禁用状态" description="展示如何禁用 Switch 组件，禁止用户操作。"></preview>

---

## Switch 参数说明

| 参数名            | 类型      | 默认值    | 描述        | 跳转 Demo       |
|:---------------|:--------|:-------|:----------|:--------------|
| v-model        | boolean | true   | 绑定值，表示开关的当前状态。当为 `true` 时，表示开关开启；为 `false` 时，表示关闭。 | [绑定值](#预览)    |
| size           | enum    | "       | 开关的大小。可以设置为 `"small"`, `"medium"`, `"large"` 等，适应不同设计需求。 | [尺寸](#尺寸)     |
| switchDisabled | boolean | false  | 是否禁用开关，禁用时用户无法进行任何操作。 | [禁用状态](#禁用状态) |
| inactiveText   | string  | "      | 开关关闭时显示的文字。 | [文字描述](#文字描述) |
| activeText     | string  | "      | 开关打开时显示的文字。 | [文字描述](#文字描述) |

---

## 其他说明

- **响应式设计**：`Switch` 组件可以根据屏幕尺寸自适应调整大小，确保在不同设备上都能提供良好的用户体验。
- **定制样式**：用户可以通过 `class` 或 `style` 属性进一步自定义组件的外观，使其与应用的整体设计风格更加一致。

