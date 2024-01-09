import { shallowReactive, shallowRef, createVNode, render } from 'vue';
import { ImgPropsType, PreviewType, Instance, ToolBar } from './image.d';
import { previewDefault } from './image';
import SePreview from './components/Preview';
import { getPupOpsMountedLocation } from '@selab-ui/utils';

// 全部预览实例
const instances = shallowReactive<Array<Instance>>([]);

const previewInstance = shallowRef<Instance | null>(null);

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
        if (
            props.preview.album &&
            (!props.preview.albumList || props.preview.albumList.length === 0)
        ) {
            // 当开启相册预览时, 但是相册列表为空时, 报错
            throw new Error('AlbumList is empty but it is must for album.');
        } else if (!props.preview.album) {
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
    mask: HTMLElement,
    isTemporary = false
): Instance {
    if (isTemporary) {
        const instance: Instance = {
            preview: {
                ...option,
                toolbar: { ...option.toolbar }
            },
            mask: [mask],
            root: getPupOpsMountedLocation(),
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
        mask.addEventListener('click', instance.clickMask);
        return instance;
    }
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
        root: getPupOpsMountedLocation(),
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
    console.log('unregisterPreviewImage', option, mask);

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
function previewImage(instance: Instance, index = 0) {
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
    instance.root.appendChild(domRood);
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
        render(null, instance.root);
        instance.vNode = null;
        instance.root.remove();
        instance.root = getPupOpsMountedLocation();
    }, 300);
}

// 注册相册，返回注销和启动预览和关闭预览的方法
function registerAlbum({
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
    open: () => void;
    close: () => void;
    unReg: () => void;
} {
    // 创建临时dom, 用于挂载预览触发的点击事件
    const dom = document.createElement('div');
    // 将dom挂载到body上
    const root = getPupOpsMountedLocation();
    dom.style.position = 'fixed';
    dom.style.top = '50vw';
    dom.style.left = '50vw';
    dom.style.width = '0';
    dom.style.height = '0';
    dom.style.zIndex = '-1';
    dom.className = 'se-img-none se-img-fit-cover';
    root.appendChild(dom);
    const instance = registerPreviewImage(
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
        dom
    );
    let isOpen = false;
    const open = () => {
        dom.click();
        isOpen = true;
    };
    const close = () => {
        unPreviewImage();
        isOpen = false;
    };
    const unReg = () => {
        if (isOpen) close();
        instance.mask[0].removeEventListener('click', instance.clickMask);
        dom.remove();
    };
    return { open, close, unReg };
}

export {
    observer,
    previewCheck,
    registerPreviewImage,
    unregisterPreviewImage,
    previewImage,
    unPreviewImage
};

export default registerAlbum;
