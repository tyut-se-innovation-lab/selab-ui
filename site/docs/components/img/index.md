# Img(图片)

## 基础用法

### 相册

`src` 指定的图片作为外部预览，`albumList` 指定的图片为相册内容。

<preview path="../../demos/img/ImgBase.vue" title="相册" description="创建相册" client-only></preview>

::: tip
`src` 指定的图片并非必须被包含在相册图片中
:::

### 图片组

`preview.name`的值相同的图片，在展开时可以直接相互切换。

<preview path="../../demos/img/ImgGroup.vue" title="图片组" description="创建图片组" client-only></preview>

### 没有预览图的相册

通过 `SeCreateAlbum` 函数，创建没有预览图的相册，通过相册控制器控制。

这里通过设置 `modal` 为 `false` 关闭了遮罩，这样在相册展开时就可以使用关闭相册按钮来关闭。

<preview path="../../demos/img/ImgNoMiniPreview.vue" title="相册" description="创建没有预览图的相册" client-only></preview>

## 类型声明

### props

```ts
export type ImgPropsType = {
    /** 确定图片如何适应到容器框, 同原生 object-fit */
    fit?: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down';
    /** 图像描述, 同原生 alt */
    alt?: string;
    /** 图片高度, 同原生 height */
    height?: string | number;
    /** 图片宽度, 同原生 width */
    width?: string | number;
    /** 图片地址, 同原生 src */
    src: string;
    /** 图片懒加载, 使用原生 loading="lazy" */
    lazy?: boolean;
    /** 向展开的图片的根附加的类名 */
    rootClassName?: string;
    /** 图片加载失败的回调 */
    onError?: (e: Event) => void;
    /** 图片加载完成的回调 */
    onLoad?: (e: Event) => void;
    /** 预览的配置，true 时为默认配置，false 时为关闭 */
    preview?: boolean | PreviewType;
};

export type PreviewType = {
    /** 预览的图片地址, 默认与 img 组件的 src 一致 */
    src?: string;
    /** 是否开启遮罩, 默认 true */
    modal?: boolean;
    /** 缩放每步的倍数, 实际值为 1 + scaleStep, 默认 0.5 */
    scaleStep?: number;
    /** 最小缩放倍数, 默认 1 */
    minScale?: number;
    /** 最大缩放倍数, 默认 50 */
    maxScale?: number;
    /** 自定义关闭按钮的Icon, 默认为 mdi:close */
    closeIcon?: string | VNode<any, any, any>;
    /** 工具栏配置 */
    toolbar?: ToolBar;
    /** 命名, 当不是相册时, 用于区分不同组的预览, 当是相册时, 是相册名, 默认为随机字符 */
    name?: string;
    /** 是否是相册, 默认 false */
    isAlbum?: boolean;
    /** 相册图片列表, 当 album 为 true 时, 必填 */
    albumList?: string[];
    /** 是否无限循环, 默认 false */
    loop?: boolean;
    /** 图片切换样式, 默认 slide */
    animation?: 'none' | 'slide' | 'fade';
    /** 是否可以通过点击遮罩关闭预览, 默认 true */
    closeOnClickModal?: boolean;
    /** 是否可以通过Esc关闭预览, 默认 true */
    closeOnPressEscape?: boolean;
    /** 图片加载失败的回调 */
    onError?: (e: Event) => void;
    /** 图片切换的回调, 当用户切换图片时拦截 */
    onSwitch?: (
        done: () => void,
        index: number | 'isFirst' | 'isLast' | 'itIs' | false
    ) => void;
    /** 打开预览的回调, 当用户点击图片打开时拦截 */
    onOpen?: (done: () => void) => void;
    /** 关闭预览的回调, 当用户点击关闭按钮、遮罩或Esc关闭时拦截 */
    onClose?: (done: () => void) => void;
};

type ToolBar = {
    /** 是否显示工具栏, 默认 true */
    show?: boolean;
    /** 是否显示缩放按钮, 默认 true */
    zoom?: boolean;
    /** 是否显示旋转按钮, 默认 true */
    rotate?: boolean;
    /** 是否显示翻转按钮, 默认 true */
    flip?: boolean;
    /** 是否显示还原按钮, 默认 true */
    reset?: boolean;
    /** 是否显示页码, 默认 true */
    pagination?: boolean;
};
```

### SeCreateAlbum

```ts
type CreateAlbum = {
    /** 相册图片列表 */
    albumList: string[];
    /** 是否开启遮罩, 默认 true */
    modal?: boolean;
    /** 缩放每步的倍数, 实际值为 1 + scaleStep, 默认 0.5 */
    scaleStep?: number;
    /** 最小缩放倍数, 默认 1 */
    minScale?: number;
    /** 最大缩放倍数, 默认 50 */
    maxScale?: number;
    /** 自定义关闭按钮的Icon, 默认为 mdi:close */
    closeIcon?: string;
    /** 工具栏配置 */
    toolbar?: ToolBar;
    /** 是否无限循环, 默认 false */
    loop?: boolean;
    /** 图片切换样式, 默认 slide */
    animation?: 'none' | 'slide' | 'fade';
    /** 图片出现位置、尺寸 */
    location?: {
        x?: number;
        y?: number;
        width?: number;
        height?: number;
    };
    /** 是否可以通过点击遮罩关闭预览, 默认 true */
    closeOnClickModal?: boolean;
    /** 是否可以通过Esc关闭预览, 默认 true */
    closeOnPressEscape?: boolean;
    /** 图片加载失败的回调 */
    onError?: (e: Event) => void;
    /** 图片切换的回调, 当用户切换图片时拦截 */
    onSwitch?: (
        done: () => void,
        index: number | false | 'isFirst' | 'isLast' | 'itIs'
    ) => void;
    /** 关闭预览的回调, 当用户点击关闭按钮、遮罩或Esc关闭时拦截 */
    onClose?: (close: () => void) => void;
};
```

### Img 参数

| 参数名 | 类型 | 默认值 | 描述 | 跳转 Demo |
| :----- | :--- | :----- | :--- | :-------- |

### 其他说明
