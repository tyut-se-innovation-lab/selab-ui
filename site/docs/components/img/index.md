# Img(componentNameZh)

这是 `Img` (图像)组件的文档。

contextmenu只搞了边框

下载按钮没做完

设计方案

```txt
img
通过fit确定图片如何适应到容器框，同原生 object-fit

预览
加载失败的占位符 默认icon VNode
渐进加载? placeholder 属性传一个，当加载好后显示加载好的
图片分组，组内切换。无限循环预览
相册，一个图片点开后有多个切换 和分组冲突 无限循环预览
自定义预览 preview 属性或插槽为预览内容，不一定是图片
暴露方法控制预览打开
预览工具栏 下载 上下镜像 旋转 缩放
预览 操作 拖动 滚轮缩放 ctrl-s下载
img映射? 设置映射源和映射位置
loading 图片和预览加载动画
预览懒加载
esc 关闭预览
显示总图片数量和当前图片位置
不加遮罩时将不会禁用滚动
base64存储图片
getBoundingClientRect 获取图片位置和宽高，用于预览打开关闭动画
图片分组预览的配置将以第一个为准
是相册时必须打开预览

插槽
error 加载失败容错 默认icon VNode
placeholder 加载占位，不传时使用默认加载动画 VNode

属性
fit ['fill', 'contain', 'cover', 'none', 'scale-down']
rootClassName 通用
alt 图像描述
height 图像高度
width 图像宽度
contextmenu 菜单配置
preview 预览参数，为 false 时禁用预览 false | PreviewType
src 图片地址
onError 加载错误回调
close-on-click-modal 是否可以通过点击遮罩层关闭
close-on-press-escape 是否可以通过按下 ESC 关闭

PreviewType
visible 是否显示 用于外部控制
src 自定义预览 src  默认同 img src
groupName 图片组名，会显示，当不是相册时，将会进行图片分组，当是相册是，是相册名，且是相册的命名必须唯一，分组和相册不能重名，主动报错
group? 是否相册
groupSrcs 相册图片群
infinite 是否可以无限循环预览
switchStyle 图片切换动画样式
modal 是否开启遮罩 true
contextmenu 菜单配置
movable 是否可移动，默认 true
mask	缩略图遮罩 VNode
maskClassName 缩略图遮罩类名
rootClassName 预览图的根 DOM 类名
scaleStep 1 + scaleStep 为缩放放大的每步倍数 默认 0.5
minScale 最小缩放倍数 默认 1
maxScale 最大放大倍数 默认 50
closeIcon 自定义关闭 Icon 默认 close icon
toolbarRender 自定义工具栏  默认 上下镜像 旋转 缩放 无下载
imageRender 自定义预览内容 VNode（不是插槽）
onError 预览图加载错误回调
onTransform 预览图 transform 变化的回调
onSwitch 切换预览图的回调
onShow 打开预览的回调 拦截?
onClose 点击遮罩和关闭按钮或esc关闭预览的回调 拦截?
```

## 预览

<preview path="../../demos/img/img.vue" title="基本使用" description=" "></preview>

#### 示例

```html
<se-img>测试</se-img>
```

### Img的基础配置

### Img 参数

| 参数名 | 类型 | 默认值 | 描述 | 跳转 Demo |
| :----- | :--- | :----- | :--- | :-------- |

### 其他说明
