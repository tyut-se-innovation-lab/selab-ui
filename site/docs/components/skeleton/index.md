# Skeleton

## 预览
<preview path="../../demos/skeleton/skeleton.vue" title="基本使用" description=" "></preview>

## **概述**
`se-skeleton`  
加载状态的占位符组件，用于在数据加载过程中提供视觉占位效果，提升用户体验。

## **功能概述**

`se-skeleton` 是一个灵活的 Vue 组件，支持：
- 头像、标题、段落占位符。
- 动态设置段落行数。
- 自定义标题宽度。
- 加载动画效果。
    
## **Props 说明**

| **参数**       | **类型**     | **默认值**  | **描述**                                                                 |
|----------------|--------------|-------------|--------------------------------------------------------------------------|
| `avatarShow`   | `boolean`    | `true`      | 是否显示头像占位符。                                                     |
| `rows`         | `number`     | `3`         | 段落占位符的行数。                                                       |
| `active`       | `boolean`    | `false`     | 是否启用加载动画效果。                                                   |
| `titleWidth`   | `string`     | `'100%'`    | 标题占位符的宽度，支持像素值或百分比（例如 `'80%'` 或 `'150px'`）。      |


## **使用示例**

#### **1. 基本用法**
显示默认的头像、标题以及 3 行段落占位符。
```vue
<se-skeleton />
```

#### **2. 隐藏头像占位符**
通过设置 `avatarShow` 为 `false`，隐藏头像占位符。
```vue
<se-skeleton :avatar-show="false" />
```

#### **3. 设置段落行数**
通过 `rows` 设置段落占位符的行数。
```vue
<se-skeleton :rows="5" />
```

#### **4. 自定义标题宽度**
设置标题占位符的宽度为 `60%`。
```vue
<se-skeleton :title-width="'60%'" />
```

#### **5. 启用加载动画**
通过设置 `active` 为 `true`，启用加载动画。
```vue
<se-skeleton :active="true" />
```

#### **6. 组合使用**
灵活组合多个属性实现复杂效果。
```vue
<se-skeleton :rows="4" :avatar-show="true" :title-width="'70%'" :active="true" />
```


## **类名说明**

| **类名**                     | **描述**                     |
|-----------------------------|----------------------------|
| `.se-skeleton`              | 组件根元素                |
| `.skeleton-container`       | 占位符的整体容器          |
| `.skeleton-avatar`          | 头像占位符                |
| `.skeleton-title`           | 标题占位符                |
| `.skeleton-paragraph`       | 段落占位符的容器          |
| `.skeleton-paragraph-content` | 每行段落占位符            |
| `.skeleton-animation`       | 加载动画效果样式          |




## **注意事项**
1. **性能优化**：对于大量使用 `se-skeleton` 的场景，建议开启 CSS 动画加速优化。
2. **响应式设计**：`titleWidth` 和 `rows` 支持动态绑定，可以根据屏幕宽度自适应调整。



