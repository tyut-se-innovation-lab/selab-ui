import { shallowReactive, shallowRef, createVNode, render } from 'vue';
import {
    ImgPropsType,
    PreviewType,
    Instance,
    ToolBar,
    TemporaryInstance
} from './image.d';
import { previewDefault } from './image';
import { LocationType } from './image.d';
import SePreview from './components/Preview';
import { pupOpsMount } from '@selab-ui/utils';
import { ContextmenuType } from '../../contextmenu/src/contextmenu.d';

// 全部预览实例
const instances = shallowReactive<Array<Instance>>([]);

const previewInstance = shallowRef<Instance | TemporaryInstance | null>(null);

// 懒加载交叉监控器
const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const img = entry.target as HTMLImageElement;
                img.src = img.dataset.src as string;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    },
    { threshold: 0.01 }
);

// 判断配置合法性
function checkPreview(option: PreviewType): boolean {
    if (option.album) {
        if (!option.albumList || option.albumList.length === 0) {
            console.error(
                'Image Preview > AlbumList is empty but it is must for album.'
            );
            return false;
        }
    }

    if (option.scaleStep <= 0) {
        console.error('Image Preview > ScaleStep must be greater than 0.');
        return false;
    }

    if (option.minScale <= 0) {
        console.error('Image Preview > MinScale must be greater than 0.');
        return false;
    }

    if (option.maxScale < 1) {
        console.error('Image Preview > MaxScale must be greater than 1.');
        return false;
    }

    if (option.minScale >= option.maxScale) {
        console.error('Image Preview > MinScale must be less than MaxScale.');
        return false;
    }

    return true;
}

// 通过img设置的preview配置检测
function previewCheck(props: Readonly<ImgPropsType>): PreviewType | false {
    if (typeof props.preview === 'boolean') {
        if (props.preview) {
            // 开启预览时, 返回默认预览配置
            return {
                ...previewDefault,
                albumList: [props.src],
                src: props.src,
                name: Math.floor(Math.random() * 999999999999999).toString(36),
                toolbar: { ...previewDefault.toolbar }
            };
        } else {
            // 不开启预览时, 直接返回 false
            return false;
        }
    } else {
        // 在这里添加判断配置合法性的函数
        // 当 preview 为对象时, 判断是否有相同的命名
        const instance =
            instances.length !== 0 &&
            props.preview.name !== '' &&
            instances.find((item) => {
                if (item.preview.name === (props.preview as PreviewType).name) {
                    // 若已有相同的相册名, 则报错
                    if (item.preview.album) {
                        throw console.error(
                            `Image Preview > Img album name can't repeat, but name "${item.preview.name}" is repeat.`
                        );
                    }
                    // 否则添加到照片群组
                    item.preview.albumList.push(
                        (props.preview as PreviewType).src || props.src
                    );
                }
            });
        // instance 不为 undefined 时, 说明该命名的相册群组存在, 直接返回
        if (instance) return instance.preview;
        // 否则返回新的预览配置
        const name =
            props.preview.name ||
            Math.floor(Math.random() * 999999999999999).toString(36);

        if (!props.preview.album) {
            // 当不是相册预览时, 直接使用 img 的 src
            props.preview.albumList = [];
            props.preview.albumList.push(props.preview.src || props.src);
        }
        const _preview = { ...previewDefault, ...props.preview, name };
        return _preview;
    }
}

// 注册预览图片
function registerPreviewImage<
    T extends boolean,
    K extends T extends true ? LocationType : HTMLElement
>(
    option: PreviewType,
    isTemporary: T,
    location: K
): Instance | TemporaryInstance {
    // 检测配置合法性
    if (!checkPreview(option))
        throw console.error('Image Preview > Preview config is error.');
    // 如果是临时的, 则直接创建实例, 并添加事件监听器
    if (isTemporary && !(location instanceof HTMLElement)) {
        const instance: TemporaryInstance = {
            preview: {
                ...option,
                toolbar: { ...option.toolbar }
            },
            root: pupOpsMount(),
            toolbar: { ...option.toolbar },
            open: (page: number) => {
                if (
                    page >= instance.preview.albumList.length + 1 ||
                    page <= 0
                ) {
                    console.error('Image Preview > Index out of range.');
                    return;
                }
                previewImage(instance, page - 1);
            },
            vNode: null,
            location
        };
        return instance;
    } else if (isTemporary && location instanceof HTMLElement) {
        // 临时预览不能挂载到 HTMLElement 上, 必须提供位置信息
        throw console.error(
            'Image Preview > Temporary preview must provide location.'
        );
    }
    if (!isTemporary && !(location instanceof HTMLElement)) {
        // 非临时预览必须提供 HTMLElement, 用于添加启动预览的事件监听器
        throw console.error('Image Preview > Mask HTMLElement is null.');
    } else if (!isTemporary && location instanceof HTMLElement) {
        // 通过option创建用于实例化Preview.tsx的配置, 并添加到instances, 同时创建事件监听器
        const _instance = instances.find((item) => {
            if (item.preview.name === option.name) {
                item.mask.push(location);
                return item;
            }
        });
        if (_instance) {
            location.addEventListener('click', _instance.clickMask);
            return _instance;
        }

        const instance: Instance = {
            preview: {
                ...option,
                toolbar: { ...option.toolbar }
            },
            mask: [location],
            root: pupOpsMount(),
            toolbar: { ...option.toolbar },
            clickMask: (e) => {
                const _openPreview = (index: number) => {
                    previewImage(instance, index);
                };
                if (!option.album) {
                    instance.mask.find((item, index) => {
                        if (item.contains(e.target as Node)) {
                            instance.preview.onOpen(() => _openPreview(index));
                        }
                    });
                    return;
                }
                const clickImg = (
                    (e.target as HTMLDivElement).parentNode
                        ?.childNodes[0] as HTMLImageElement
                ).src;
                const index = option.albumList.findIndex((item) => {
                    const img2 = createVNode('img', {
                        src: item
                    });
                    const dom = document.createElement('div');
                    render(img2, dom);
                    const isFind = clickImg === img2.el!.src;
                    render(null, dom);
                    dom.remove();
                    return isFind;
                });
                if (index === -1) {
                    instance.preview.onOpen(() => _openPreview(0));
                } else {
                    instance.preview.onOpen(() => _openPreview(index));
                }
                // instance.preview.onOpen(() => _openPreview(5));
            },
            vNode: null
        };
        instances.push(instance);

        location.addEventListener('click', instance.clickMask);
        return instance;
    }
    throw console.error('Image Preview > Unknown error.');
}

// 注销预览图片
function unregisterPreviewImage(option: PreviewType, mask: HTMLElement) {
    instances.find((item) => {
        // 找到对应的预览实例, 并移除事件监听器
        if (item.preview.name === option.name) {
            item.mask.find((it, index) => {
                if (it === mask) {
                    it.removeEventListener('click', item.clickMask);
                    // 从mask数组中移除
                    item.mask.splice(index, 1);
                    // 若不是相册预览, 则移除对应图片
                    if (!item.preview.album) {
                        item.preview.albumList.splice(index, 1);
                    }
                    // 若mask数组为空或是相册, 则移除实例
                    if (item.mask.length === 0 || item.preview.album) {
                        instances.splice(
                            instances.findIndex((i) => i === item),
                            1
                        );
                    }
                }
            });
        }
    });
}

// 记录之前body overflow的值
let bodyOverflow = '';

// 启动预览
function previewImage(instance: Instance | TemporaryInstance, index = 0) {
    // 如果该预览已经存在, 则直接返回
    if (previewInstance.value === instance) return;
    // 如果下标超出范围, 则重置为报错
    if (index >= instance.preview.albumList.length) {
        throw console.error(
            `Image Preview > Index out of range, index: ${index}, page: ${
                index + 1
            }, albumList: ${instance.preview.albumList.length}`
        );
    }
    unPreviewImage();
    // 创建Preview组件实例, 挂载到instance.root上
    instance.vNode = createVNode(SePreview, {
        ...instance.preview,
        index,
        instance
    });
    if (instance.preview.modal && document.body.style.overflow !== 'hidden') {
        bodyOverflow = document.body.style.overflow || '';
        document.body.style.overflow = 'hidden';
        console.log('previewImage => hidden');
    }
    const domRood = document.createElement('div');
    domRood.className = 'se-img-preview-direct-root';
    (
        instance.root as {
            mountDiv: (childDom: HTMLDivElement) => void;
        }
    ).mountDiv(domRood);
    render(instance.vNode, domRood);
    previewInstance.value = instance;
    instance.root = domRood;
}

// 关闭当前的预览
function unPreviewImage() {
    if (!previewInstance.value) return;
    const instance = previewInstance.value;
    if (instance.preview.modal)
        setTimeout(() => {
            // 若在300ms内再次打开预览, 且新预览有遮罩, 且, 则不恢复body overflow
            if (previewInstance.value && previewInstance.value.preview.modal) {
                return;
            }
            document.body.style.overflow = bodyOverflow;
            console.log('previewImage => ""');
        }, 300);
    previewInstance.value = null;
    instance.vNode!.component!.exposed?._close();
    setTimeout(() => {
        render(null, instance.root as HTMLElement);
        instance.vNode = null;
        (instance.root as HTMLElement).remove();
        instance.root = pupOpsMount();
    }, 300);
}

// 注册相册，返回启动预览和关闭预览的方法
function createAlbum({
    albumList,
    modal = true,
    scaleStep = 0.5,
    minScale = 1,
    maxScale = 50,
    closeIcon = 'close',
    toolbar = {
        zoom: true,
        rotate: true,
        flip: true,
        reset: true,
        download: false,
        pagination: true,
        show: true
    },
    loop = true,
    animation = 'slide',
    contextmenu = false,
    location,
    closeOnClickModal = true,
    closeOnPressEscape = true,
    onError = () => {},
    onChange = (change: () => void) => change(),
    onOpen = (open: () => void) => open(),
    onClose = (close: () => void) => close()
}: {
    albumList: string[];
    modal?: boolean;
    scaleStep?: number;
    minScale?: number;
    maxScale?: number;
    closeIcon?: string;
    toolbar?: Partial<ToolBar>;
    loop?: boolean;
    animation?: 'none' | 'slide' | 'fade';
    contextmenu?: boolean | ContextmenuType;
    location?: {
        x?: number;
        y?: number;
        width?: number;
        height?: number;
    };
    closeOnClickModal?: boolean;
    closeOnPressEscape?: boolean;
    onError?: (e: Event) => void;
    onChange?: (change: () => void, index: number | false) => void;
    onOpen?: (open: () => void) => void;
    onClose?: (close: () => void) => void;
}): {
    open: (page: number) => void;
    close: () => void;
} {
    const _location = {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        ...location
    };
    const instance: TemporaryInstance = registerPreviewImage(
        {
            album: true,
            albumList,
            name: Math.floor(Math.random() * 999999999999999).toString(36),
            modal,
            scaleStep,
            minScale,
            maxScale,
            closeIcon,
            toolbar: { ...toolbar } as ToolBar,
            loop,
            animation,
            contextmenu,
            closeOnClickModal,
            closeOnPressEscape,
            onError,
            onChange,
            onOpen,
            onClose,
            src: ''
        },
        true,
        _location
    ) as TemporaryInstance;
    const open = (page = 1) => {
        instance.open(page);
    };
    const close = () => {
        if (previewInstance.value === instance) unPreviewImage();
    };
    return { open, close };
}

export {
    observer,
    previewCheck,
    registerPreviewImage,
    unregisterPreviewImage,
    previewImage,
    unPreviewImage
};

export default createAlbum;
