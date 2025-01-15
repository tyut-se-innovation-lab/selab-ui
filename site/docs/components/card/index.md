

# Card

`Card` 是一个灵活的内容容器组件，用于展示信息块。支持多种样式、内容插槽、交互功能，适合用于仪表盘、列表项或其他内容展示场景。


## 预览

<preview path="../../demos/card/card.vue" title="基本使用" ></preview>

---

## 示例

```html
<se-card type="primary">
    <div>这是一个基础卡片</div>
</se-card>
```

---

## 参数说明

| 参数名  | 类型     | 默认值      | 描述                               |
|---------|----------|-------------|------------------------------------|
| `type`  | `String` | 无          | 卡片的样式类型，可选值有 `primary`、`secondary`、`success`、`warning`、`danger` |
| `shadow`| `String` | `'always'`  | 卡片阴影显示规则，可选值：`'always'`（始终显示）、`'hover'`（悬浮时显示）、`'never'`（不显示） |
| `header`| `String` | 无          | 卡片头部内容                       |
| `footer`| `String` | 无          | 卡片底部内容                       |

---

## 插槽说明

| 插槽名  | 描述                         |
|---------|------------------------------|
| `default` | 卡片的主要内容区域            |
| `header`  | 自定义卡片的头部区域          |
| `footer`  | 自定义卡片的底部区域          |

---

## 使用说明

1. **基础使用**  
   直接使用 `se-card` 标签即可。

   ```html
   <se-card>
       <p>这是卡片内容</p>
   </se-card>
   ```

2. **设置样式类型**  
   通过 `type` 属性设置卡片样式。

   ```html
   <se-card type="primary">
       <p>这是主样式卡片</p>
   </se-card>
   ```

3. **使用插槽**  
   自定义头部和底部内容。

   ```html
   <se-card>
       <template #header>
           <h3>卡片头部</h3>
       </template>
       <p>卡片内容</p>
       <template #footer>
           <p>卡片底部</p>
       </template>
   </se-card>
   ```

4. **设置阴影效果**  
   使用 `shadow` 属性控制阴影显示。

   ```html
   <se-card shadow="hover">
       <p>悬浮时显示阴影的卡片</p>
   </se-card>
   ```

---

## 样式说明

1. **全局样式变量**  
   可通过修改 Less 变量自定义样式。
   ```less
   @card-padding: 16px;
   @card-border-color: #e0e0e0;
   @card-shadow-color: rgba(0, 0, 0, 0.1);
   ```

2. **自定义主题**  
   覆盖默认样式类，定义符合需求的卡片主题。

---

**Card 组件为内容展示提供了多种样式和功能支持，可结合场景需求灵活应用。**
