import { shallowReactive, shallowRef, createVNode, render } from 'vue';
import { ImgPropsType, PreviewType, Instance } from './image.d';
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
    mask: HTMLElement
): Instance {
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
            instance.mask.find((item, index) => {
                if (item === e.target) {
                    previewImage(instance, index);
                }
            });
        },
        vNode: null
    };
    instances.push(instance);

    console.log('instances', instances);

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
    unPreviewImage();
    console.log('previewImage', instance, index);
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
    if (instance.preview.modal) document.body.style.overflow = '';
    previewInstance.value = null;
    instance.vNode!.component!.exposed?._close();
    setTimeout(() => {
        render(null, instance.root);
        instance.vNode = null;
        instance.root.remove();
        instance.root = getPupOpsMountedLocation();
    }, 300);
}

export {
    observer,
    previewCheck,
    registerPreviewImage,
    unregisterPreviewImage,
    previewImage,
    unPreviewImage
};
