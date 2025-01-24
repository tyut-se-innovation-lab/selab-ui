

# Rate (评分组件)

## 概述

`Rate` 组件是一个评分工具，通过图标的形式呈现评分，常用于评价系统、用户反馈、商品评价等场景。它支持自定义图标、样式、评分的最大值、颜色、交互效果等，提供了极大的灵活性，可以满足不同场景下的需求。

## 预览

<preview path="../../demos/rate/rate.vue" title="基本使用" description=" "></preview>

## 功能概述

1. **评分展示**：默认渲染 5 个图标（通常为星星），用户可以通过 `max` 属性自定义评分的最大值，也可以选择改变图标样式。
2. **样式定制**：支持通过 `type` 属性配置评分组件的样式，`selectedColor` 和 `hoverColor` 属性支持自定义选中和悬浮时的颜色，满足不同的UI风格需求。
3. **图标自定义**：通过 `icon` 属性，用户可以自定义评分使用的图标，例如星星、心形图标等，支持自定义图标的名称。
4. **交互效果**：支持鼠标悬浮时，预览用户评分，并通过点击设置最终评分值，给用户直观的交互体验。
5. **双向绑定**：评分值支持通过 `v-model` 实现与父组件的双向绑定，方便在父组件中获取当前评分值。
6. **组件化设计**：评分图标封装为 `seIcon` 组件，支持独立的图标替换和自定义图标风格。

## 属性说明

| 参数名         | 类型     | 默认值       | 描述                                                     |
| :------------- | :------- | :----------- | :------------------------------------------------------- |
| `icon`         | String   | `mingcute:star-fill`       | 指定评分图标的名称，可以是自定义图标名称。默认是 `star`（星星）。 |
| `max`          | Number   | `5`          | 设置评分的最大值，默认是 5。可以根据需求设置为任意数字，例如 `10`。 |
| `value`        | Number   | `0`          | 当前评分值，控制显示的评分，支持 `v-model` 双向绑定。默认值为 `0`。 |
| `hoverColor`   | String   | `#f39c12`    | 鼠标悬浮时的颜色，默认是金黄色。                         |
| `color`        | String   | `#ffffff`    | 未选中状态下的图标颜色，默认是白色。                     |
| `selectedColor`| String   | `#f39c12`    | 选中状态下的图标颜色，默认是金黄色。                     |
| `type`         | String   | 无           | 评分组件的样式类型，用于应用不同的视觉风格。可选的 `type` 有：`primary`、`secondary` 等，用户也可以自行定义。 |
| `disabled`     | Boolean  | `false`      | 设置评分组件是否禁用，禁用后不允许进行交互。              |

---

## 使用说明

### 1. 基本用法

通过简单引入 `seRate` 组件，即可实现评分功能。最简单的用法如下：

#### 示例代码：

```vue
<template>
    <div>
        <h3>基础评分组件</h3>
        <seRate v-model="rating" />
    </div>
</template>

<script>
import { ref } from 'vue';

export default {
    components: {
        SeRate
    },
    setup() {
        // 初始化评分值
        const rating = ref(3); // 初始评分为 3
        return { rating };
    }
};
</script>
```

#### 解释：
- 这里使用了 `v-model` 进行双向绑定，评分值 `rating` 会随着用户的点击或交互实时更新。
- 初始评分为 `3`，用户可以通过点击图标调整评分。

---

### 2. 自定义评分最大值

默认情况下，评分组件渲染 5 个图标，如果你需要更多的图标（比如 10 个），可以通过 `max` 属性来设置评分的最大值。

#### 示例代码：

```vue
<template>
    <div>
        <h3>自定义评分最大值</h3>
        <seRate v-model="rating" :max="10" />
    </div>
</template>

<script>

import { ref } from 'vue';

export default {

    setup() {
        const rating = ref(5); // 初始评分为 5
        return { rating };
    }
};
</script>
```

#### 解释：
- 通过设置 `max="10"`，评分组件会展示 10 个图标，用户可以选择 1 到 10 之间的评分。

---

### 3. 自定义图标

你可以通过 `icon` 属性来指定评分使用的图标。比如使用心形图标来替代默认的星星图标：

#### 示例代码：

```vue
<template>
    <div>
        <h3>自定义评分图标</h3>
        <seRate icon="'mdi:heart'" v-model="rating" />
    </div>
</template>

<script>
import { ref } from 'vue';

export default {
    setup() {
        const rating = ref(3); // 初始评分为 3
        return { rating };
    }
};
</script>
```

#### 解释：
- 使用 `icon="'mdi:heart'"` 来指定评分图标为心形图标。
- 你可以传入任意图标名称，组件会自动加载对应的图标。

---

### 4. 自定义颜色

`hoverColor` 和 `selectedColor` 可以用来设置评分组件中不同状态下的颜色。

#### 示例代码：

```vue
<template>
    <div>
        <h3>自定义颜色的评分组件</h3>
        <seRate
            v-model="rating"
            :hoverColor="'#ffcc00'"       <!-- 鼠标悬浮时的颜色 -->
            :selectedColor="'#ff0000'"    <!-- 选中后的颜色 -->
        />
    </div>
</template>

<script>
import { ref } from 'vue';

export default {

    setup() {
        const rating = ref(3); // 初始评分为 3
        return { rating };
    }
};
</script>
```

#### 解释：
- `hoverColor` 设置鼠标悬浮时图标的颜色，默认为金黄色（`#f39c12`）。
- `selectedColor` 设置选中后的图标颜色，默认为金黄色（`#f39c12`）。

---

### 5. 样式定制

通过 `type` 属性，可以定制评分组件的视觉风格。例如，你可以通过 `type="primary"` 来改变评分图标的颜色。

#### 示例代码：

```vue
<template>
    <div>
        <h3>自定义样式的评分组件</h3>
        <seRate type="primary" v-model="rating" />
        <seRate type="secondary" v-model="rating" />
    </div>
</template>

<script>

import { ref } from 'vue';

export default {
  
    setup() {
        const rating = ref(3); // 初始评分
        return { rating };
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

#### 解释：
- `type="primary"` 使用金黄色的星星。
- `type="secondary"` 使用蓝色的星星。
- 通过不同的 `type` 属性，用户可以快速实现不同的视觉风格。



### 6. 禁用状态

如果需要禁用评分组件，阻止用户进行评分，可以通过 `disabled` 属性来控制。

#### 示例代码：

```vue
<template>
    <div>
        <h3>禁用的评分组件</h3>
        <seRate v-model="rating" :disabled="true" />
    </div>
</template>

<script>
import { ref } from 'vue';

export default {

    setup() {
        const rating = ref(3); // 初始评分
        return { rating };
    }
};
</script>
```

#### 解释：
- 通过 `:disabled="true"` 将评分组件禁用，用户无法进行评分操作。



## 总结

`Rate` 组件是一个功能强大的评分工具，支持灵活的样式定制、图标替换、颜色设置、最大评分值等，能够满足不同项目的需求。无论是基本的评分功能，还是复杂的自定义需求，都可以通过简单的属性配置实现。通过 `v-model`，可以轻松地与父组件进行数据绑定，获取和设置评分值，便于进行数据的管理和处理。

