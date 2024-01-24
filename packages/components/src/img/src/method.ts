import { shallowReactive, shallowRef, createVNode, render } from 'vue';
import {
    ImgPropsType,
    PreviewType,
    Instance,
    ToolBar,
    TemporaryInstance
} from './image.d';
import { previewDefault } from './image';
import SePreview from './components/Preview';
import { pupOpsMount } from '@selab-ui/utils';

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
    console.log(option);
    if (option.album) {
        if (!option.albumList || option.albumList.length === 0) {
            throw new Error('AlbumList is empty but it is must for album.');
        }
    }

    if (option.scaleStep <= 0) {
        throw new Error('ScaleStep must be greater than 0.');
    }

    if (option.minScale <= 0) {
        throw new Error('MinScale must be greater than 0.');
    }

    if (option.maxScale < 1) {
        throw new Error('MaxScale must be greater than 1.');
    }

    if (option.minScale >= option.maxScale) {
        throw new Error('MinScale must be less than MaxScale.');
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
                    if (item.preview.album)
                        throw new Error(
                            `Img album name can't repeat, but name "${item.preview.name}" is repeat.`
                        );
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
        // if (
        //     props.preview.album &&
        //     (!props.preview.albumList || props.preview.albumList.length === 0)
        // ) {
        //     // 当开启相册预览时, 但是相册列表为空时, 报错
        //     throw new Error('AlbumList is empty but it is must for album.');
        // } else

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
function registerPreviewImage(
    option: PreviewType,
    mask: HTMLElement | null,
    isTemporary = false
): Instance | TemporaryInstance {
    // 检测配置合法性
    if (!checkPreview(option)) throw new Error('Preview config is error.');
    // 如果是临时的, 则直接创建实例, 并添加事件监听器
    if (isTemporary) {
        const instance: TemporaryInstance = {
            preview: {
                ...option,
                toolbar: { ...option.toolbar }
            },
            root: pupOpsMount(),
            toolbar: { ...option.toolbar },
            open: function (option: {
                x: number;
                y: number;
                width: number;
                height: number;
            }) {
                instance.location = option;
                previewImage(instance, 0);
            },
            vNode: null,
            location: {
                x: 0,
                y: 0,
                width: 0,
                height: 0
            }
        };
        return instance;
    }
    if (!mask) throw new Error('Mask is null.');
    // 通过option创建用于实例化Preview.tsx的配置, 并添加到instances, 同时创建事件监听器
    const _instance = instances.find((item) => {
        if (item.preview.name === option.name) {
            item.mask.push(mask);
            return item;
        }
    });
    if (_instance) {
        mask.addEventListener('click', _instance.clickMask);
        return _instance;
    }

    const instance: Instance = {
        preview: {
            ...option,
            toolbar: { ...option.toolbar }
        },
        mask: [mask],
        root: pupOpsMount(),
        toolbar: { ...option.toolbar },
        clickMask: function (e) {
            const _openPreview = (index: number) => {
                previewImage(instance, index);
            };
            instance.mask.find((item, index) => {
                if (item.contains(e.target as Node)) {
                    instance.preview.onOpen(() => _openPreview(index));
                }
            });
        },
        vNode: null
    };
    instances.push(instance);

    mask.addEventListener('click', instance.clickMask);
    return instance;
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

// 启动预览
function previewImage(instance: Instance | TemporaryInstance, index = 0) {
    // 如果该预览已经存在, 则直接返回
    if (previewInstance.value === instance) return;
    // 如果下标超出范围, 则重置为报错
    if (index >= instance.preview.albumList.length) {
        throw new Error(
            `Index out of range, index: ${index}, albumList: ${instance.preview.albumList.length}`
        );
    }
    unPreviewImage();
    // 创建Preview组件实例, 挂载到instance.root上
    instance.vNode = createVNode(SePreview, {
        ...instance.preview,
        index,
        instance
    });
    if (instance.preview.modal) document.body.style.overflow = 'hidden';
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
            document.body.style.overflow = '';
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
    closeOnClickModal?: boolean;
    closeOnPressEscape?: boolean;
    onError?: (e: Event) => void;
    onChange?: (change: () => void, index: number | false) => void;
    onOpen?: (open: () => void) => void;
    onClose?: (close: () => void) => void;
}): {
    open: (option: {
        x: number;
        y: number;
        width: number;
        height: number;
    }) => void;
    close: () => void;
} {
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
            closeOnClickModal,
            closeOnPressEscape,
            onError,
            onChange,
            onOpen,
            onClose,
            src: ''
        },
        null,
        true
    ) as TemporaryInstance;
    const open = (
        option:
            | {
                  x?: number | undefined;
                  y?: number | undefined;
                  width?: number | undefined;
                  height?: number | undefined;
              }
            | undefined
    ) => {
        const _option = {
            x: 0,
            y: 0,
            width: 0,
            height: 0,
            ...option
        };
        instance.open(_option);
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
