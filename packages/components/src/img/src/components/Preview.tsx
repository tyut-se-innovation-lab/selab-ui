import {
    computed,
    createVNode,
    CSSProperties,
    defineComponent,
    isVNode,
    onDeactivated,
    onMounted,
    Ref,
    ref,
    render,
    VNode
} from 'vue';
import '../../../less/components/imgPreview/index.less';
import { imgPreviewProps } from '../image';
import { ImgPreviewPropsType } from '../image.d';
import { unPreviewImage } from '../method';
import { docEvent } from '@selab-ui/utils';
import SePreviewToolbar from './Toolbar';
import useGetPreviewStartLocation from '../hooks/useGetPreviewStartLocation';
import useOperate from '../hooks/useOperate';
import useChangeImg from '../hooks/useChangeImg';
import useStyleValue from '../hooks/useStyleValue';
import SeIcon from '../../../icon/template/icon.vue';

export default defineComponent({
    name: 'se-img-preview',
    props: imgPreviewProps,
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
        // 当前图片的索引
        const nowIndex = ref(_option.index);
        // 遮罩的组件
        const maskRef = ref();
        // 图片的容器
        const imagesRef = ref();
        // 工具栏的组件
        const toolbarRef = ref();
        // 记录原始显示的图片的宽高
        const imgWidthOriginal = ref(0);
        const imgHeightOriginal = ref(0);
        // 貌似没什么用,先保留意见
        // const msgRootRef = ref();
        // 关闭按钮的组件
        const closeIconComp = computed(() => {
            if (isVNode(_option.closeIcon)) return _option.closeIcon;
            return createVNode(SeIcon, {
                icon: _option.closeIcon,
                color: '#fff',
                size: 16
            });
        });
        const previewAlt = computed(() => {
            let _alt = '';
            if (props.isAlbum) {
                _alt += `这是相册中的第${nowIndex.value + 1}张图片`;
            } else {
                _alt += `这是图片组中的第${nowIndex.value + 1}张图片`;
            }
            return _alt;
        });

        const imgStyle = useStyleValue();
        const { styleValue: imgStyleValue, setStyleValues: setImgStyleValues } =
            imgStyle;
        setImgStyleValues({
            'object-fit': fit.value,
            width: `${rect.value.width}px`,
            height: `${rect.value.height}px`,
            /* 这里是minWidth测试位置 */
            minWidth: `${rect.value.width}px`,
            left: `${rect.value.left}px`,
            top: `${rect.value.top}px`,
            transform: `translate(0, 0) scale(1) rotate(0deg) rotateY(0deg) rotateX(0deg)`
        } as CSSProperties);
        let tabToInput: (e: KeyboardEvent) => void;
        // 记录预览是否关闭, 关闭后将禁止全部操作
        const isClose = ref(false);
        // 关闭预览的函数
        function closePreview() {
            if (isClose.value) return;
            isClose.value = true;
            // 获取当前图片
            // const imgItem = img.value;
            // 关闭预览
            if (
                _option.modal &&
                'mask' in props.instance &&
                (!props.isAlbum ||
                    (props.isAlbum && _option.openIndex === _option.index))
            ) {
                getPreviewStartLocation(_option.index);
                setImgStyleValues({
                    'object-fit': fit.value,
                    width: `${rect.value.width}px`,
                    height: `${rect.value.height}px`,
                    /* 这里是minWidth测试位置 */
                    minWidth: `${rect.value.width}px`,
                    left: `${rect.value.left}px`,
                    top: `${rect.value.top}px`,
                    transform: `translate(0, 0) scale(1) rotate(0deg) rotateY(0deg) rotateX(0deg)`
                } as CSSProperties);
            } else {
                const { clientWidth, clientHeight } = document.documentElement;
                setImgStyleValues({
                    'object-fit': fit.value,
                    width: `${imgWidthOriginal.value}px`,
                    height: `${imgHeightOriginal.value}px`,
                    /* 这里是minWidth测试位置 */
                    minWidth: `${imgWidthOriginal.value}px`,
                    left: `${clientWidth / 2}px`,
                    top: `${clientHeight / 2}px`,
                    transform: `translate(-50%, -50%) scale(0.2) rotate(0deg) rotateY(0deg) rotateX(0deg)`,
                    opacity: '0'
                } as CSSProperties);
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
                setImgStyleValues({
                    'object-fit': fit.value,
                    width: `${imgRealWidth * scale}px`,
                    height: `${imgRealHeight * scale}px`,
                    /* 这里是minWidth测试位置 */
                    minWidth: `${imgRealWidth * scale}px`,
                    left: '50vw',
                    top: '50vh',
                    transform: `translate(-50%, -50%) scale(1) rotate(0deg) rotateY(0deg) rotateX(0deg)`
                } as CSSProperties);

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

            const _toolbarRef: Ref<VNode | null> = ref(null);

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
                toolbarRef,
                imgStyle
            );

            const { userChangeImg, isChanging } = useChangeImg(
                props as ImgPreviewPropsType,
                _option,
                img.value as HTMLImageElement,
                isClose,
                nowIndex,
                _toolbarRef,
                {
                    imgWidthOriginal,
                    imgHeightOriginal
                },
                changeMouse,
                imgStyle
            );

            // 创建工具栏
            if (props.toolbar.show) {
                _toolbarRef.value = createVNode(SePreviewToolbar, {
                    ...props.toolbar,
                    index: nowIndex,
                    total: _option.imgList.length,
                    pagination:
                        _option.imgList.length > 1
                            ? props.toolbar.pagination
                            : false,
                    onZoom: scaleImg,
                    onRotate: rotateImg,
                    onFlip: flipImg,
                    onReset: resetImg,
                    onSwitch: userChangeImg,
                    onClose: userClosePreview,
                    onExportToolbarWidth: (width: number) => {
                        toolbarWidth.value = width;
                    },
                    onInitToolbarLocation: initToolbarLocation,
                    class: !_option.modal
                        ? 'se-img-preview-toolbar-noModal'
                        : ''
                });
                render(_toolbarRef.value, toolbarRef.value);
            } else if (!props.toolbar.show && !props.modal) {
                // 若工具栏不显示, 且遮罩不存在, 则显示工具栏且只显示切换按钮
                _toolbarRef.value = createVNode(SePreviewToolbar, {
                    index: nowIndex,
                    total: _option.imgList.length,
                    zoom: false,
                    rotate: false,
                    flip: false,
                    reset: false,
                    pagination: false,
                    onZoom: scaleImg,
                    onRotate: rotateImg,
                    onFlip: flipImg,
                    onReset: resetImg,
                    onSwitch: userChangeImg,

                    onClose: userClosePreview,
                    onExportToolbarWidth: (width: number) => {
                        toolbarWidth.value = width;
                    },
                    onInitToolbarLocation: initToolbarLocation,
                    class: !_option.modal
                        ? 'se-img-preview-toolbar-noModal'
                        : ''
                });
                render(_toolbarRef.value, toolbarRef.value);
            }
            tabToInput = (e: KeyboardEvent) => {
                if (e.key === 'Tab' && !isChanging.value) {
                    e.preventDefault();
                    _toolbarRef.value &&
                        _toolbarRef.value?.component!.exposed!._changeInput();
                }
            };
            docEvent.on('keydown', tabToInput);
        });
        onDeactivated(() => {
            docEvent.off('keydown', tabToInput);
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
                            style={imgStyleValue.value}
                            class={`se-img-preview-img-item ${
                                props.modal
                                    ? 'se-img-preview-img-item-modal'
                                    : 'se-img-preview-img-item-noModal'
                            }`}
                            onError={props.onError}
                            onLoad={() => {}}
                            ref={img}
                            alt={previewAlt.value}
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
                    {/* 貌似没什么用,先保留意见 {<div class="se-img-preview-msg" ref={msgRootRef}></div>} */}
                </div>
            );
        };
    }
});
