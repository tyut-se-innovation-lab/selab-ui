import {
    computed,
    createVNode,
    defineComponent,
    isVNode,
    onMounted,
    ref,
    render,
    VNode
} from 'vue';
import '../../../less/components/imgPreview/index.less';
import { imgPreviewProps } from '../image';
import { ImgPreviewPropsType } from '../image.d';
import { unPreviewImage } from '../method';
import SePreviewToolbar from './Toolbar';
import contextmenu from '../../../contextmenu/src/directive';
import useGetPreviewStartLocation from '../hooks/useGetPreviewStartLocation';
import useOperate from '../hooks/useOperate';
import useChangeImg from '../hooks/useChangeImg';
import useDownload from '../hooks/useDownload';
import SeIcon from '../../../icon/template/icon.vue';

export default defineComponent({
    name: 'se-img-preview',
    props: imgPreviewProps,
    directives: {
        contextmenu
    },
    setup(props, { expose }): () => VNode {
        const _option = {
            openIndex: props.index,
            index: props.index,
            imgList: props.albumList,
            loop: props.loop,
            animation: props.animation,
            modal: props.modal,
            scaleStep: props.scaleStep + 1,
            minScale: props.minScale,
            maxScale: props.maxScale,
            closeIcon: props.closeIcon,
            'close-on-click-modal': props.closeOnClickModal,
            'close-on-press-escape': props.closeOnPressEscape
        };
        const { rect, fit, getPreviewStartLocation } =
            useGetPreviewStartLocation(props as ImgPreviewPropsType);
        const nowIndex = ref(_option.index);
        const maskRef = ref();
        const imagesRef = ref();
        const toolbarRef = ref();
        const msgRootRef = ref();
        const closeIconComp = computed(() => {
            if (isVNode(_option.closeIcon)) return _option.closeIcon;
            return createVNode(SeIcon, {
                name: _option.closeIcon,
                color: '#fff',
                iconSize: '16px'
            });
        });
        // 记录预览是否关闭, 关闭后将禁止全部操作
        const isClose = ref(false);
        // 关闭预览的函数
        function closePreview() {
            if (isClose.value) return;
            isClose.value = true;
            // 获取当前图片
            const imgItem = img.value;
            // 关闭预览
            if (_option.modal && 'mask' in props.instance) {
                getPreviewStartLocation(_option.index);
                imgItem.style.left = rect.value.left + 'px';
                imgItem.style.top = rect.value.top + 'px';
                imgItem.style.width = rect.value.width + 'px';
                imgItem.style.height = rect.value.height + 'px';
                imgItem.style.minWidth = rect.value.width + 'px';
                imgItem.style.minHeight = rect.value.height + 'px';
                imgItem.style.transform = `translate(0, 0) scale(1) rotate(0deg) rotateY(0deg) rotateX(0deg)`;
            } else {
                const { clientWidth, clientHeight } = document.documentElement;
                imgItem.style.top = clientHeight / 2 + 'px';
                imgItem.style.left = clientWidth / 2 + 'px';
                imgItem.style.transform =
                    'translate(-50%, -50%) scale(0.2) rotate(0deg) rotateY(0deg) rotateX(0deg)';
                imgItem.style.opacity = '0';
            }
            // 若存在, 关闭遮罩
            if (props.modal) {
                maskRef.value!.style.opacity = '0';
            }
            // 关闭关闭按钮
            const closeBtn = document.querySelector(
                '.se-img-preview-close'
            ) as HTMLDivElement;
            closeBtn && (closeBtn.style.opacity = '0');
            // 若存在, 关闭工具栏
            if (props.toolbar.show || !_option.modal) {
                toolbarRef.value.style.transform =
                    'translateX(-50%) translateY(50%)';
                toolbarRef.value.style.opacity = '0';
            }
            // 移除事件
            document.removeEventListener('keydown', closeEsc);
        }
        // esc键关闭预览
        const closeEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                userClosePreview();
            }
        };
        // 用户关闭预览的函数
        function userClosePreview() {
            const _closePreview = () => {
                unPreviewImage();
            };
            if (typeof props.onClose === 'function') {
                props.onClose(_closePreview);
            } else {
                throw new TypeError('onClose is not a function');
            }
        }
        // 用于保存在render函数里创建的带有指令的图片实例
        const img = ref<HTMLImageElement>({} as HTMLImageElement);
        onMounted(() => {
            // 计算图片的真实宽高比
            const imgReal = new Image();
            imgReal.src = _option.imgList[_option.index];
            let imgRealWidth = 0,
                imgRealHeight = 0;
            // 记录原始显示的图片的宽高
            const imgWidthOriginal = ref(0);
            const imgHeightOriginal = ref(0);
            // 获取浏览器视口宽高
            const { clientWidth, clientHeight } = document.documentElement;
            imgReal.onload = () => {
                imgRealWidth = imgReal.width;
                imgRealHeight = imgReal.height;
                // 计算图片的原始缩放, 以图片的宽高比为基准, 以及视口的宽高比为基准, 取最小值
                const scale =
                    Math.min(
                        clientWidth / imgRealWidth,
                        clientHeight / imgRealHeight
                    ) / 1.4;
                // 保存打开预览时的图片
                const imgItem = img.value;
                console.log(imgItem, 'imgItem');
                imgItem.style.objectFit = fit.value;
                imgItem.style.width = imgRealWidth * scale + 'px';
                imgItem.style.height = imgRealHeight * scale + 'px';
                imgItem.style.minWidth = imgRealWidth * scale + 'px';
                imgItem.style.minHeight = imgRealHeight * scale + 'px';
                imgItem.style.left = '50vw';
                imgItem.style.top = '50vh';
                imgItem.style.transform =
                    'translate(-50%, -50%) scale(1) rotate(0deg) rotateY(0deg) rotateX(0deg)';
                // location存在说明本次预览不是通过点击图片,而是直接调用方法, 所以需要动画
                if ('location' in props.instance) {
                    imgItem.classList.add('se-img-preview-img-only-preview');
                }
                // 记录原始显示的图片的宽高
                imgWidthOriginal.value = imgRealWidth * scale;
                imgHeightOriginal.value = imgRealHeight * scale;
                // 监听滚轮事件
                imgItem.addEventListener(
                    'wheel',
                    (e: WheelEvent) => {
                        if (isClose.value) return;
                        const toLeftBorder =
                            e.clientX - imgItem.getBoundingClientRect().left;
                        const toTopBorder =
                            e.clientY - imgItem.getBoundingClientRect().top;
                        scaleImg(e.deltaY > 0 ? 'out' : 'in', [
                            toLeftBorder,
                            toTopBorder
                        ]);
                    },
                    { passive: true }
                );
                imgItem.addEventListener('mousedown', mouseDown);
                imgItem.addEventListener('dragstart', (e: DragEvent) => {
                    e.preventDefault();
                });
                // 遮罩存在且点击遮罩关闭预览
                if (props.modal) {
                    maskRef.value &&
                        maskRef.value.addEventListener(
                            'click',
                            (e: MouseEvent) => {
                                // 当用户点击遮罩左侧时, 切换到上一张图片
                                if (
                                    e.clientX <
                                    clientWidth / 2 - imgWidthOriginal.value / 2
                                    // _option.index !== 0
                                ) {
                                    userChangeImg('prev', e);
                                    return;
                                }
                                // 当用户点击遮罩右侧时, 切换到下一张图片
                                if (
                                    e.clientX >
                                    clientWidth / 2 + imgWidthOriginal.value / 2
                                    // _option.index !== _option.imgList.length - 1
                                ) {
                                    userChangeImg('next', e);
                                    return;
                                }
                                // 否则关闭预览
                                if (props.closeOnClickModal) {
                                    userClosePreview();
                                }
                            }
                        );
                    // 当鼠标在遮罩同位置移动时, 显示不同的鼠标样式
                    maskRef.value.addEventListener('mousemove', changeMouse);
                } else {
                    // 记录之前body overflow的值
                    let bodyOverflow = '';
                    // 鼠标进入图片时禁用默认滚动
                    imgItem.addEventListener('mousemove', () => {
                        if (document.body.style.overflow === 'hidden') return;
                        if (isClose.value) resetBodyOverflow(null);
                        bodyOverflow = document.body.style.overflow || '';
                        document.body.style.overflow = 'hidden';
                    });
                    // 恢复滚动的函数
                    const resetBodyOverflow = (
                        e: KeyboardEvent | MouseEvent | null
                    ) => {
                        if (e && 'key' in e && e.key !== 'Escape') {
                            return;
                        }
                        setTimeout(() => {
                            document.body.style.overflow = bodyOverflow;
                        });
                        document.removeEventListener(
                            'keydown',
                            resetBodyOverflow
                        );
                    };
                    // 鼠标离开图片时恢复默认滚动
                    imgItem.addEventListener('mouseleave', resetBodyOverflow);
                    document.addEventListener('keydown', resetBodyOverflow);
                }
                // esc键关闭预览
                if (props.closeOnPressEscape) {
                    document.addEventListener('keydown', closeEsc);
                }
            };

            const {
                changeMouse,
                scaleImg,
                mouseDown,
                toolbarWidth,
                initToolbarLocation,
                rotateImg,
                flipImg,
                resetImg
            } = useOperate(
                props as ImgPreviewPropsType,
                _option,
                img.value as HTMLImageElement,
                isClose,
                maskRef,
                { imgWidthOriginal, imgHeightOriginal },
                toolbarRef
            );

            const { userDownload } = useDownload(
                props as ImgPreviewPropsType,
                _option,
                isClose
            );

            const { userChangeImg } = useChangeImg(
                props as ImgPreviewPropsType,
                _option,
                img.value as HTMLImageElement,
                isClose,
                nowIndex,
                toolbarRef,
                {
                    imgWidthOriginal,
                    imgHeightOriginal
                },
                changeMouse
            );

            // 创建工具栏
            if (props.toolbar.show !== false) {
                const _toolbar = createVNode(SePreviewToolbar, {
                    ...props.toolbar,
                    index: nowIndex,
                    total: _option.imgList.length,
                    pagination:
                        _option.imgList.length > 1
                            ? props.toolbar.pagination
                            : false,
                    download: props.toolbar.download ? true : false,
                    onZoom: scaleImg,
                    onRotate: rotateImg,
                    onFlip: flipImg,
                    onReset: resetImg,
                    onSwitch: userChangeImg,
                    onDownload: userDownload,
                    onClose: userClosePreview,
                    onExportToolbarWidth: (width: number) => {
                        toolbarWidth.value = width;
                    },
                    onInitToolbarLocation: initToolbarLocation,
                    class: !_option.modal
                        ? 'se-img-preview-toolbar-noModal'
                        : ''
                });
                render(_toolbar, toolbarRef.value);
            } else if (!props.toolbar.show && !props.modal) {
                // 若工具栏不显示, 且遮罩不存在, 则显示工具栏且只显示切换按钮
                const _toolbar = createVNode(SePreviewToolbar, {
                    index: nowIndex,
                    total: _option.imgList.length,
                    zoom: false,
                    rotate: false,
                    flip: false,
                    reset: false,
                    pagination: false,
                    download: false,
                    onZoom: scaleImg,
                    onRotate: rotateImg,
                    onFlip: flipImg,
                    onReset: resetImg,
                    onSwitch: userChangeImg,
                    onDownload: userDownload,
                    onClose: userClosePreview,
                    onExportToolbarWidth: (width: number) => {
                        toolbarWidth.value = width;
                    },
                    onInitToolbarLocation: initToolbarLocation,
                    class: !_option.modal
                        ? 'se-img-preview-toolbar-noModal'
                        : ''
                });
                render(_toolbar, toolbarRef.value);
            }
        });
        expose({
            _close: () => {
                closePreview();
            }
        });
        return () => {
            return (
                <div class="se-img-preview">
                    {props.modal && (
                        <div class="se-img-preview-mask" ref={maskRef}></div>
                    )}
                    <div class="se-img-preview-img" ref={imagesRef}>
                        <img
                            src={_option.imgList[_option.index]}
                            style={{
                                position: 'absolute',
                                width: rect.value.width + 'px',
                                height: rect.value.height + 'px',
                                minWidth: rect.value.width + 'px',
                                minHeight: rect.value.height + 'px',
                                left: rect.value.left + 'px',
                                top: rect.value.top + 'px'
                            }}
                            class={`se-img-preview-img-item ${
                                props.modal
                                    ? 'se-img-preview-img-item-modal'
                                    : 'se-img-preview-img-item-noModal'
                            }`}
                            onError={props.onError}
                            onLoad={() => {}}
                            ref={img}
                            alt={undefined}
                            v-contextmenu={props.contextmenu}
                        />
                    </div>
                    <div class="se-img-preview-toolbar" ref={toolbarRef}></div>
                    {props.modal && (
                        <div
                            class="se-img-preview-close"
                            onClick={userClosePreview}
                        >
                            {closeIconComp.value}
                        </div>
                    )}
                    <div class="se-img-preview-msg" ref={msgRootRef}></div>
                </div>
            );
        };
    }
});
