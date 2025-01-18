
# Rate (评分) 
## 概述

`Rate` 是一个评分组件，通过星星图标的展示和交互，用户可以直观地进行评分操作。该组件支持灵活的样式配置和自定义扩展，适合用于评价系统、用户反馈等场景。

## 预览
<preview path="../../demos/rate/rate.vue" title="基本使用" description=" "></preview>

## 功能概述

1. **评分展示**：组件默认渲染 5 个星星，用户可根据需求更改星星数量或样式。
2. **样式定制**：通过 `type` 属性轻松实现多种样式风格。
3. **组件化设计**：星星图标通过子组件 `SeRateStar` 封装，支持独立替换和扩展。
4. **简单易用**：通过简单的属性配置即可实现评分功能，适合各种前端项目。

---

## 属性说明

| 参数名   | 类型   | 默认值  | 描述                                                    |
| :------- | :----- | :------ | :------------------------------------------------------ |
| `type`   | String | 无      | 指定评分组件的样式类型，用于应用不同的视觉风格。          |

---

## 使用说明

以下为如何在 Vue 项目中使用 `Rate` 组件的详细示例，包括基本用法、样式定制和高级扩展。

# 基础使用

通过简单引入 `SeRate` 组件，即可实现评分功能：

#### 示例代码

```vue
<template>
    <div>
        <h3>基础评分组件</h3>
        <SeRate />
    </div>
</template>

<script>
import SeRate from '@/components/Rate';

export default {
    components: {
        SeRate
    }
};
</script>
```


## 自定义样式

通过 `type` 属性，可以为评分组件设置不同的样式风格，例如改变星星的颜色或形状：

#### 示例代码

```vue
<template>
    <div>
        <h3>自定义样式的评分组件</h3>
        <SeRate type="primary" />
        <SeRate type="secondary" />
    </div>
</template>

<script>
import SeRate from '@/components/Rate';

export default {
    components: {
        SeRate
    }
};
</script>

<style>
/* 定义评分组件的样式 */
.se-rate--primary {
    color: #ffcc00; /* 金黄色星星 */
}

.se-rate--secondary {
    color: #00ccff; /* 蓝色星星 */
}
</style>
```


