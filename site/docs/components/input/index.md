

# Input（输入框）
## 概述

`Input` 是一个通用的输入框组件，支持图标、清空功能、禁用状态等多种配置，适用于各种输入场景。

## 预览
<preview path="../../demos/input/input.vue" title="基本使用" description="展示基本的输入框功能，包括占位符、清空按钮和图标的使用"></preview>


## 基础配置

`Input` 提供丰富的自定义参数，支持多种配置，适配不同的场景需求。



## Input 参数

| 参数名          | 类型                 | 默认值             | 描述                                                                 |
|-----------------|---------------------|-------------------|---------------------------------------------------------------------|
| `placeholder`   | `String`            | `'请输入内容...'`   | 输入框的占位文本。                                                   |
| `icon`          | `String`            | `''`              | 输入框内的图标名称，支持通过 `se-icon` 渲染。                        |
| `allowClear`    | `Boolean`           | `false`           | 是否显示清空按钮，点击后清空输入内容。                                |
| `disabled`      | `Boolean`           | `false`           | 是否禁用输入框。                                                     |
| `size`          | `String`            | `'default'`       | 输入框尺寸，可选值为 `'small'`、`'default'`、`'large'`。              |
| `bordered`      | `Boolean`           | `true`            | 是否显示边框。                                                       |
| `prefix`        | `String`            | `''`              | 输入框的前缀图标名称，通过 `se-icon` 渲染。                          |
| `suffix`        | `String`            | `''`              | 输入框的后缀图标名称，通过 `se-icon` 渲染。                          |



## Input 方法

| 方法名            | 参数                      | 返回值     | 描述                                     |
|-------------------|--------------------------|-----------|-----------------------------------------|
| `handleFocus`     | `(event: FocusEvent)`     | `void`    | 输入框获取焦点时触发。                     |
| `handleBlur`      | `(event: FocusEvent)`     | `void`    | 输入框失去焦点时触发。                     |
| `clearInput`      | `()`                     | `void`    | 清空输入框内容并触发 `clear` 事件。         |


## 示例代码

### 基本使用

```vue
<template>
    <SeInput placeholder="请输入内容" />
</template>
```


### 带图标的输入框

```vue
<template>
    <SeInput placeholder="搜索内容" icon="search" />
</template>
```


### 带清空按钮的输入框

```vue
<template>
    <SeInput placeholder="可清空的输入框" allowClear />
</template>
```


### 禁用状态

```vue
<template>
    <SeInput placeholder="禁用状态" disabled />
</template>
```



### 带前缀和后缀图标

```vue
<template>
    <SeInput placeholder="输入内容" prefix="user" suffix="close" />
</template>
```


### 不同尺寸的输入框

```vue
<template>
    <div>
        <SeInput placeholder="小尺寸" size="small" />
        <SeInput placeholder="默认尺寸" size="default" />
        <SeInput placeholder="大尺寸" size="large" />
    </div>
</template>
```



## 其他说明

1. **图标渲染**  
   组件中的 `icon`、`prefix` 和 `suffix` 参数都通过 `se-icon` 渲染，支持灵活的图标设置。

2. **清空按钮**  
   当 `allowClear` 设置为 `true` 且有输入内容时，输入框右侧会显示清空按钮。

3. **禁用状态**  
   `disabled` 参数可禁用输入框，禁用状态下无法进行交互。

4. **尺寸配置**  
   `size` 参数支持三种尺寸选择，分别为 `'small'`、`'default'` 和 `'large'`。

5. **无边框模式**  
   设置 `bordered` 为 `false`，可以隐藏输入框的边框样式。

