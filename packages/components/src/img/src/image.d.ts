import { VNode, Slot } from "vue";
import { CreateProps } from '@selab-ui/utils/type';
import { ContextmenuType, PartialContextmenuType } from "../../contextmenu/src/contextmenu.d";

declare module "*.png" {
  const value: any;
  export default value;
}

type DownloadEvent = {
    // 下载的图片地址
    src: string;
    // 下载的图片名称
    name: string;
    // 全部图片的地址
    srcList: string[];
    // 当前图片的索引
    index: number;
};

type ToolBar = {
    // 是否显示工具栏, 默认 true
    show: boolean;
    // 是否显示缩放按钮, 默认 true
    zoom: boolean;
    // 是否显示旋转按钮, 默认 true
    rotate: boolean;
    // 是否显示翻转按钮, 默认 true
    flip: boolean;
    // 是否显示还原按钮, 默认 true
    reset: boolean;
    // 下载按钮事件, 默认 false
    download: false | ((event: DownloadEvent) => void);
    // 是否显示页码, 默认 true
    pagination: boolean;
};

export type Pagination = {
    index: Ref<number>;
    total: number;
};

export type PreviewToolbarPropsType = ToolBar & Pagination;

export type PreviewToolbarProps = CreateProps<PreviewToolbarPropsType>;

export type PreviewType = {
    // 预览的图片地址, 默认与 img 组件的 src 一致
    src: string;
    // 是否开启遮罩, 默认 true
    modal: boolean;
    // 缩放每步的倍数, 实际值为 1 + scaleStep, 默认 0.5
    scaleStep: number;
    // 最小缩放倍数, 默认 1
    minScale: number;
    // 最大缩放倍数, 默认 50
    maxScale: number;
    // 自定义关闭按钮的Icon, 默认为 CloseIcon
    closeIcon: string | VNode<any, any, any>;
    // 工具栏配置
    toolbar: ToolBar;
    // 命名, 当不是相册时, 用于区分不同组的预览, 当是相册时, 是相册名, 默认为随机字符
    name: string;
    // 是否是相册, 默认 false
    album: boolean;
    // 相册图片列表, 当 album 为 true 时, 必填
    albumList: string[];
    // 是否无限循环, 默认 false
    loop: boolean;
    // 图片切换样式, 默认 slide
    animation: 'none' | 'slide' | 'fade';
    // 上下文菜单, 默认 false, 当为 true 时, 会使用默认的上下文菜单, 当为 false 时, 不会显示上下文菜单, 当为PartialContextmenuType时, 会使用自定义的上下文菜单
    contextmenu: boolean | PartialContextmenuType;
    // 是否可以通过点击遮罩关闭预览, 默认 true
    closeOnClickModal: boolean;
    // 是否可以通过Esc关闭预览, 默认 true
    closeOnPressEscape: boolean;
    // 图片加载失败的回调
    onError: (e: Event) => void;
    // 图片切换的回调
    onChange: (change: () => void, index: number | false) => void;
    // 打开预览的回调, 当用户点击图片打开时拦截
    onOpen: (open: () => void) => void;
    // 关闭预览的回调, 当用户点击关闭按钮、遮罩或Esc关闭时拦截
    onClose: (close: () => void) => void;
};

export type ImgPropsType = {
    // 确定图片如何适应到容器框, 同原生 object-fit
    fit: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down';
    // 图像描述, 同原生 alt
    alt: string;
    // 图片高度, 同原生 height
    height: string | number;
    // 图片宽度, 同原生 width
    width: string | number;
    // 图片地址, 同原生 src
    src: string;
    // 图片懒加载, 同原生 lazy
    lazy: boolean;
    // 图片的根类名
    rootClassName: string;
    // 右键菜单, 只能禁止右键菜单, 不能自定义右键菜单
    contextmenu: boolean;
    // 图片加载失败的回调
    onError: (e: Event) => void;
    // 图片加载完成的回调
    onLoad: (e: Event) => void;
    // 预览的配置
    preview: boolean | Partial<Omit<PreviewType, 'toolbar'> & { toolbar: Partial<Toolbar> }>;
};

export type ImgProps = CreateProps<ImgPropsType>;

export type ImgSlots = {
    // 加载失败时的占位
    error: Slot;
    // 加载中的占位
    loading: Slot;
    // 缩略图遮罩, 当 preview.visible 为 true 时, 会显示遮罩
    mask: Slot;
};

export type Instance = {
    // 预览的配置
    preview: PreviewType;
    // 遮罩元素
    mask: Array<HTMLElement>;
    // 预览的组件实例的根元素
    root: HTMLElement | {
        mountDiv: (childDom: HTMLElement) => void;
    };
    // 工具栏配置
    toolbar: Partial<ToolBar>;
    // 点击遮罩的事件
    clickMask: (e: Event) => void;
    // vNode
    vNode: VNode | null;
};

export type TemporaryInstance = {
    // 预览的配置
    preview: PreviewType;
    // 预览的组件实例的根元素
    root: HTMLElement | {
        mountDiv: (childDom: HTMLElement) => void;
    };
    // 工具栏配置
    toolbar: Partial<ToolBar>;
    // 启动预览
    open: (page: number) => void;
    // vNode
    vNode: VNode | null;
    // 位置
    location: { x: number; y: number; width: number; height: number; };
};

export type ImgPreviewPropsType = PreviewType & { index: number } & { instance: Instance | TemporaryInstance };

export type ImgPreviewProps = CreateProps<ImgPreviewPropsType>;

export type LocationType = {
  x: number;
  y: number;
  width: number;
  height: number;
};
