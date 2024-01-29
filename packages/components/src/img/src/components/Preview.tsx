import {
    VNode,
    defineComponent,
    onMounted,
    ref,
    createVNode,
    render,
    withDirectives
} from 'vue';
import '../../../less/components/imgPreview/index.less';
import { imgPreviewProps } from '../image';
import { unPreviewImage } from '../method';
import SePreviewToolbar from './Toolbar';
import seMiniMeg from '../../../miniMsg/src/index';
import contextmenu from '../../../contextmenu/src/method';
import { pupOpsMount } from '@selab-ui/utils';
import leftCur from '../../../../../assets/mouseImg/left.ico';
import rightIco from '../../../../../assets/mouseImg/right.ico';
import closeIco from '../../../../../assets/mouseImg/close.ico';

export default defineComponent({
    name: 'se-img-preview',
    props: imgPreviewProps,
    setup(props, { expose }): () => VNode {
        // 获取点击图片的位置
        let rect: DOMRect;
        let fit: string;
        if ('mask' in props.instance) {
            let index = props.index;
            if (!props.instance!.mask[index]) index = 0;
            rect = props.instance!.mask[index].getBoundingClientRect();
            fit = (
                props.instance!.mask[index].parentNode
                    ?.childNodes[0] as HTMLImageElement
            ).classList[1]
                .split('-')
                .pop() as string;
        } else {
            rect = {
                width: props.instance!.location.width,
                height: props.instance!.location.height,
                left: props.instance!.location.x,
                top: props.instance!.location.y
            } as DOMRect;
            fit = 'fill';
        }
        const _option = {
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
        const onOpenIndex = _option.index;
        const nowIndex = ref(_option.index);
        const maskRef = ref();
        const imagesRef = ref();
        const toolbarRef = ref();
        const msgRootRef = ref();
        // 记录预览是否关闭, 关闭后将禁止全部操作
        let isClose = false;
        // 关闭预览的函数
        function closePreview() {
            if (isClose) return;
            isClose = true;
            // 获取当前图片
            const imgItem = img.el!;
            // 关闭预览
            if (
                _option.modal &&
                'mask' in props.instance &&
                onOpenIndex === _option.index
            ) {
                imgItem.style.left = rect.left + 'px';
                imgItem.style.top = rect.top + 'px';
                imgItem.style.width = rect.width + 'px';
                imgItem.style.height = rect.height + 'px';
                imgItem.style.transform = `translate(0, 0) scale(1) rotate(0deg) rotateY(0deg) rotateZ(0deg)`;
            } else {
                const { clientWidth, clientHeight } = document.documentElement;
                imgItem.style.top = clientHeight / 2 + 'px';
                imgItem.style.left = clientWidth / 2 + 'px';
                imgItem.style.transform =
                    'translate(-50%, -50%) scale(0.2) rotate(0deg) rotateY(0deg) rotateZ(0deg)';
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
            if (props.toolbar.show !== false || !_option.modal) {
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
        let img: VNode;
        onMounted(() => {
            render(img, imagesRef.value);
            // 计算图片的真实宽高比
            const imgReal = new Image();
            imgReal.src = _option.imgList[_option.index];
            let imgRealWidth = 0,
                imgRealHeight = 0;
            // 记录原始显示的图片的宽高
            let imgWidthOriginal = 0;
            let imgHeightOriginal = 0;
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
                const imgItem = img.el!;
                imgItem.style['object-fit'] = fit;
                imgItem.style.width = imgRealWidth * scale + 'px';
                imgItem.style.height = imgRealHeight * scale + 'px';
                imgItem.style.left = '50vw';
                imgItem.style.top = '50vh';
                imgItem.style.transform =
                    'translate(-50%, -50%) scale(1) rotate(0deg) rotateY(0deg) rotateZ(0deg)';
                // location存在说明本次预览不是通过点击图片,而是直接调用方法, 所以需要动画
                if ('location' in props.instance) {
                    imgItem.classList.add('se-img-preview-img-only-preview');
                }
                // 记录原始显示的图片的宽高
                imgWidthOriginal = imgRealWidth * scale;
                imgHeightOriginal = imgRealHeight * scale;
                // 监听滚轮事件
                imgItem.addEventListener('wheel', (e: WheelEvent) => {
                    if (isClose) return;
                    const toLeftBorder =
                        e.clientX - imgItem.getBoundingClientRect().left;
                    const toTopBorder =
                        e.clientY - imgItem.getBoundingClientRect().top;
                    scaleImg(e.deltaY > 0 ? 'out' : 'in', [
                        toLeftBorder,
                        toTopBorder
                    ]);
                });
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
                                    clientWidth / 2 - imgWidthOriginal / 2
                                    // _option.index !== 0
                                ) {
                                    userChangeImg('prev', e);
                                    return;
                                }
                                // 当用户点击遮罩右侧时, 切换到下一张图片
                                if (
                                    e.clientX >
                                    clientWidth / 2 + imgWidthOriginal / 2
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
                    // 鼠标进入图片时禁用默认滚动
                    imgItem.addEventListener('mousemove', () => {
                        document.body.style.overflow = 'hidden';
                    });
                    // 鼠标离开图片时恢复默认滚动
                    imgItem.addEventListener('mouseleave', () => {
                        document.body.style.overflow = '';
                    });
                }
                // esc键关闭预览
                if (props.closeOnPressEscape) {
                    document.addEventListener('keydown', closeEsc);
                }
            };
            // 检测鼠标在遮罩上的位置, 更改鼠标样式
            const changeMouse = (e: MouseEvent) => {
                if (isClose) return;
                if (e.clientX < clientWidth / 2 - imgWidthOriginal / 2) {
                    if (_option.index !== 0 || _option.loop)
                        maskRef.value!.style.cursor = `url(${leftCur}), auto`;
                    else {
                        maskRef.value!.style.cursor = 'not-allowed';
                    }
                } else if (e.clientX > clientWidth / 2 + imgWidthOriginal / 2) {
                    if (
                        _option.index !== _option.imgList.length - 1 ||
                        _option.loop
                    )
                        maskRef.value!.style.cursor = `url(${rightIco}), auto`;
                    else {
                        maskRef.value!.style.cursor = 'not-allowed';
                    }
                } else if (props.closeOnClickModal) {
                    maskRef.value!.style.cursor = `url(${closeIco}), auto`;
                } else {
                    maskRef.value!.style.cursor = 'default';
                }
            };
            // 检测图片是否离开视口, 若离开则移动到视口内可见位置
            function checkImg() {
                if (isClose) return;
                const imgItem = img.el! as HTMLImageElement;
                const imgNow = getComputedStyle(imgItem);
                const imgLeft = parseFloat(imgNow.left);
                const imgTop = parseFloat(imgNow.top);
                const imgWidth = parseFloat(imgNow.width);
                const imgHeight = parseFloat(imgNow.height);
                // x轴方向, 若图片中点超出视口边界, 且图片的一半小于视口, 则图片中点移动到视口边界
                if (imgLeft < 0 && imgWidth / 2 < clientWidth) {
                    imgItem.style.left = '0px';
                }
                if (imgLeft > clientWidth && imgWidth / 2 < clientWidth) {
                    imgItem.style.left = clientWidth + 'px';
                }
                // x轴方向, 若图片边界超出视口中点, 且图片的一半大于视口, 则图片边界移动到视口中点
                if (
                    imgLeft + imgWidth / 2 < clientWidth / 2 &&
                    imgWidth / 2 > clientWidth
                ) {
                    imgItem.style.left = clientWidth / 2 - imgWidth / 2 + 'px';
                }
                if (
                    imgLeft - imgWidth / 2 > clientWidth / 2 &&
                    imgWidth / 2 > clientWidth
                ) {
                    imgItem.style.left = clientWidth / 2 + imgWidth / 2 + 'px';
                }
                // y轴方向, 若图片中点超出视口边界, 且图片的一半小于视口, 则图片中点移动到视口边界
                if (imgTop < 0 && imgHeight / 2 < clientHeight) {
                    imgItem.style.top = '0px';
                }
                if (imgTop > clientHeight && imgHeight / 2 < clientHeight) {
                    imgItem.style.top = clientHeight + 'px';
                }
                // y轴方向, 若图片边界超出视口中点, 且图片的一半大于视口, 则图片边界移动到视口中点
                if (
                    imgTop + imgHeight / 2 < clientHeight / 2 &&
                    imgHeight / 2 > clientHeight
                ) {
                    imgItem.style.top = clientHeight / 2 - imgHeight / 2 + 'px';
                }
                if (
                    imgTop - imgHeight / 2 > clientHeight / 2 &&
                    imgHeight / 2 > clientHeight
                ) {
                    imgItem.style.top = clientHeight / 2 + imgHeight / 2 + 'px';
                }
            }
            // 控制拖动
            // 记录鼠标按下时的位置
            const mouseDownPosition = [0, 0];
            // 点击事件
            function mouseDown(e: MouseEvent) {
                if (isClose) return;
                const imgItem = img.el!;
                mouseDownPosition[0] = e.clientX;
                mouseDownPosition[1] = e.clientY;
                // 添加移动事件
                imgItem.addEventListener('mousemove', mouseMove);
                // 添加松开事件
                imgItem.addEventListener('mouseup', mouseUpLeave);
                // 添加离开事件
                imgItem.addEventListener('mouseleave', mouseUpLeave);
                // 移除过渡
                imgItem.style.transition = 'none';
                // 鼠标样式改为抓取
                imgItem.style.cursor = 'grabbing';
            }
            let toolbarWidth: number;
            // 移动事件
            function mouseMove(e: MouseEvent) {
                if (isClose) return;
                // 计算移动距离
                const moveX = e.clientX - mouseDownPosition[0];
                const moveY = e.clientY - mouseDownPosition[1];
                // 获取当前图片的位置
                const imgItem = img.el! as HTMLImageElement;
                const imgNow = getComputedStyle(imgItem);
                const imgLeft = parseFloat(imgNow.left);
                const imgTop = parseFloat(imgNow.top);
                // const imgWidth = parseFloat(imgNow.width);
                // const imgHeight = parseFloat(imgNow.height);
                // 移动图片
                imgItem.style.left = imgLeft + moveX + 'px';
                imgItem.style.top = imgTop + moveY + 'px';
                // 如果不显示遮罩, 则工具栏跟随移动
                if (!_option.modal) {
                    if (
                        imgLeft > toolbarWidth / 2 + 10 &&
                        imgLeft < clientWidth - toolbarWidth / 2 - 10
                    ) {
                        toolbarRef.value.style.left = imgLeft + moveX + 'px';
                    }
                }
                // 保存当前鼠标位置
                mouseDownPosition[0] = e.clientX;
                mouseDownPosition[1] = e.clientY;
            }
            // 松开事件和离开事件
            function mouseUpLeave() {
                if (isClose) return;
                const imgItem = img.el!;
                // 移除移动事件
                imgItem.removeEventListener('mousemove', mouseMove);
                // 移除松开事件
                imgItem.removeEventListener('mouseup', mouseUpLeave);
                // 恢复过渡
                imgItem.style.transition = '';
                toolbarRef.value.style.transition = '';
                // 鼠标样式改为抓取
                imgItem.style.cursor = 'grab';
                checkImg();
            }
            // 是否正在缩放
            let isScaling = false;
            // 控制缩放的函数
            function scaleImg(type: 'out' | 'in', origin?: [number, number]) {
                if (isClose) return;
                if (isScaling) return;
                const lastScale = setTimeout(() => {
                    isScaling = false;
                }, 200);
                // 获取当前图片
                const imgItem = img.el! as HTMLImageElement;
                const imgNowStyle = getComputedStyle(imgItem);
                // 获取当前图片的显示宽高
                const imgWidth = parseFloat(imgNowStyle.width);
                const imgHeight = parseFloat(imgNowStyle.height);
                // 计算缩放前比例
                const oldScale = imgWidth / imgWidthOriginal;
                // 若当前缩放比例等于最小缩放比例或最大缩放比例, 则不缩放
                if (
                    (type === 'out' &&
                        Math.abs(oldScale - _option.minScale) < 0.001) ||
                    (type === 'in' &&
                        Math.abs(oldScale - _option.maxScale) < 0.001)
                ) {
                    lastScale && clearTimeout(lastScale);
                    return;
                }
                isScaling = true;
                // 获取当前图片的位置
                const imgLeft = parseFloat(imgNowStyle.left);
                const imgTop = parseFloat(imgNowStyle.top);
                // 计算缩放后的宽高
                let newWidth =
                    type === 'in'
                        ? imgWidth * _option.scaleStep
                        : imgWidth / _option.scaleStep;
                let newHeight =
                    type === 'in'
                        ? imgHeight * _option.scaleStep
                        : imgHeight / _option.scaleStep;
                // 计算缩放后比例
                const scale = newWidth / imgWidthOriginal;
                // 若当前缩放比例小于最小缩放比例, 则宽高改为最小缩放比例
                if (type === 'out' && scale < _option.minScale) {
                    newWidth = imgWidthOriginal * _option.minScale;
                    newHeight = imgHeightOriginal * _option.minScale;
                }
                // 若当前缩放比例大于最大缩放比例, 则宽高改为最大缩放比例
                if (type === 'in' && scale > _option.maxScale) {
                    newWidth = imgWidthOriginal * _option.maxScale;
                    newHeight = imgHeightOriginal * _option.maxScale;
                }
                // 确认缩放点
                const _origin = origin ? origin : [imgWidth / 2, imgHeight / 2];
                // 获取实际缩放比例
                const realScale =
                    type === 'out' ? imgWidth / newWidth : newWidth / imgWidth;
                // 计算缩放后的位置
                const leftChange =
                    type === 'out'
                        ? (_origin[0] - imgWidth / 2) / 1 -
                          (_origin[0] - imgWidth / 2) / realScale
                        : (_origin[0] - imgWidth / 2) * (1 - realScale);
                const newLeft = imgLeft + leftChange;
                const topChange =
                    type === 'out'
                        ? (_origin[1] - imgHeight / 2) / 1 -
                          (_origin[1] - imgHeight / 2) / realScale
                        : (_origin[1] - imgHeight / 2) * (1 - realScale);
                const newTop = imgTop + topChange;
                // 缩放
                imgItem.style.width = newWidth + 'px';
                imgItem.style.height = newHeight + 'px';
                imgItem.style.left = newLeft + 'px';
                imgItem.style.top = newTop + 'px';
                setTimeout(() => {
                    checkImg();
                }, 300);
            }
            // 控制旋转的函数
            function rotateImg(type: 'forward' | 'reverse') {
                if (isClose) return;
                // 获取当前图片
                const imgNowItem = img.el!;
                // 获取之前的旋转角度
                const imgOldRotate = parseInt(
                    imgNowItem.style.transform
                        .split('rotate(')[1]
                        .split('deg)')[0]
                );
                const imgRotateY = parseInt(
                    imgNowItem.style.transform
                        .split('rotateY(')[1]
                        .split('deg)')[0]
                );
                const imgRotateZ = parseInt(
                    imgNowItem.style.transform
                        .split('rotateZ(')[1]
                        .split('deg)')[0]
                );
                const _newRotate =
                    type === 'reverse' ? imgOldRotate + 90 : imgOldRotate - 90;
                imgNowItem.style.transform = `translate(-50%, -50%) scale(1) rotate(${_newRotate}deg) rotateY(${imgRotateY}deg) rotateZ(${imgRotateZ}deg)`;
                setTimeout(() => {
                    if (_newRotate === 360 || _newRotate === -360) {
                        imgNowItem.style.transition = 'none';
                        imgNowItem.style.transform = `translate(-50%, -50%) scale(1) rotate(0deg) rotateY(${imgRotateY}deg) rotateZ(${imgRotateZ}deg)`;
                    }
                    requestAnimationFrame(() => {
                        imgNowItem.style.transition = '';
                    });
                }, 300);
            }
            // 控制镜像反转的函数
            function flipImg(type: 'horizontal' | 'vertical') {
                if (isClose) return;
                // 获取当前图片
                const imgItem = img.el!;
                // 获取之前的旋转角度
                const imgRotate = parseInt(
                    imgItem.style.transform.split('rotate(')[1].split('deg)')[0]
                );
                const imgRotateY = parseInt(
                    imgItem.style.transform
                        .split('rotateY(')[1]
                        .split('deg)')[0]
                );
                const imgRotateZ = parseInt(
                    imgItem.style.transform
                        .split('rotateZ(')[1]
                        .split('deg)')[0]
                );
                if (type === 'horizontal') {
                    imgItem.style.transform = `translate(-50%, -50%) scale(1) rotate(${imgRotate}deg) rotateY(${
                        imgRotateY === 180 ? 0 : 180
                    }deg) rotateZ(${imgRotateZ}deg)`;
                } else {
                    imgItem.style.transform = `translate(-50%, -50%) scale(1) rotate(${imgRotate}deg) rotateY(${
                        imgRotateY === 180 ? 0 : 180
                    }deg) rotateZ(${imgRotateZ === 180 ? 0 : 180}deg)`;
                }
                // 用canvas实现了镜像反转, 但是处理较慢, 然后想起css transform可以实现, 所以就不用canvas了
                // 我是若子
                // 折叠
                // 使用canvas的方式
                // 获取当前图片
                // const imgItem = img.el!;
                // // 创建canvas
                // const canvas = document.createElement('canvas');
                // // 创建上下文
                // const ctx = canvas.getContext('2d');
                // // 创建图片
                // const _img = new Image();
                // _img.src = imgItem.src;
                // // 监听图片加载完成事件
                // _img.onload = () => {
                //     // 设置canvas的宽高
                //     canvas.width = _img.width;
                //     canvas.height = _img.height;
                //     // 绘制图片
                //     ctx!.drawImage(_img, 0, 0);
                //     // 获取图片的像素信息
                //     const imgData = ctx!.getImageData(
                //         0,
                //         0,
                //         canvas.width,
                //         canvas.height
                //     );
                //     // 创建新的像素信息
                //     const newImgData = ctx!.createImageData(
                //         canvas.width,
                //         canvas.height
                //     );
                //     // 镜像反转
                //     if (type === 'horizontal') {
                //         for (let i = 0; i < imgData.height; i++) {
                //             for (let j = 0; j < imgData.width; j++) {
                //                 newImgData.data[i * imgData.width * 4 + j * 4] =
                //                     imgData.data[
                //                         i * imgData.width * 4 +
                //                             (imgData.width - j - 1) * 4
                //                     ];
                //                 newImgData.data[
                //                     i * imgData.width * 4 + j * 4 + 1
                //                 ] =
                //                     imgData.data[
                //                         i * imgData.width * 4 +
                //                             (imgData.width - j - 1) * 4 +
                //                             1
                //                     ];
                //                 newImgData.data[
                //                     i * imgData.width * 4 + j * 4 + 2
                //                 ] =
                //                     imgData.data[
                //                         i * imgData.width * 4 +
                //                             (imgData.width - j - 1) * 4 +
                //                             2
                //                     ];
                //                 newImgData.data[
                //                     i * imgData.width * 4 + j * 4 + 3
                //                 ] =
                //                     imgData.data[
                //                         i * imgData.width * 4 +
                //                             (imgData.width - j - 1) * 4 +
                //                             3
                //                     ];
                //             }
                //         }
                //     } else {
                //         for (let i = 0; i < imgData.height; i++) {
                //             for (let j = 0; j < imgData.width; j++) {
                //                 newImgData.data[i * imgData.width * 4 + j * 4] =
                //                     imgData.data[
                //                         (imgData.height - i - 1) *
                //                             imgData.width *
                //                             4 +
                //                             j * 4
                //                     ];
                //                 newImgData.data[
                //                     i * imgData.width * 4 + j * 4 + 1
                //                 ] =
                //                     imgData.data[
                //                         (imgData.height - i - 1) *
                //                             imgData.width *
                //                             4 +
                //                             j * 4 +
                //                             1
                //                     ];
                //                 newImgData.data[
                //                     i * imgData.width * 4 + j * 4 + 2
                //                 ] =
                //                     imgData.data[
                //                         (imgData.height - i - 1) *
                //                             imgData.width *
                //                             4 +
                //                             j * 4 +
                //                             2
                //                     ];
                //                 newImgData.data[
                //                     i * imgData.width * 4 + j * 4 + 3
                //                 ] =
                //                     imgData.data[
                //                         (imgData.height - i - 1) *
                //                             imgData.width *
                //                             4 +
                //                             j * 4 +
                //                             3
                //                     ];
                //             }
                //         }
                //     }
                //     // 将新的像素信息绘制到canvas上
                //     ctx!.putImageData(newImgData, 0, 0);
                //     // 将canvas转为图片
                //     imgItem.src = canvas.toDataURL();
                // };
            }
            // 还原图片的函数
            function resetImg() {
                if (isClose) return;
                const imgItem = img.el!;
                imgItem.style.transform =
                    'translate(-50%, -50%) scale(1) rotate(0deg) rotateY(0deg) rotateZ(0deg)';
                imgItem.style.left = '50vw';
                imgItem.style.top = '50vh';
                imgItem.style.width = imgWidthOriginal + 'px';
                imgItem.style.height = imgHeightOriginal + 'px';
            }
            // 切换图片的函数
            function changeImg(
                type: 'prev' | 'next',
                nextIndex: number | false,
                e: MouseEvent
            ) {
                if (isClose) return;
                if (nextIndex === false) {
                    let x: number | '50vw';
                    let y: number | '50vh';
                    if (_option.modal) {
                        x = e.clientX;
                        y = e.clientY;
                    } else {
                        x = '50vw';
                        y = '50vh';
                    }
                    seMiniMeg({
                        message: '已经到头了',
                        type: 'warning',
                        location: { x, y },
                        duration: 1000
                    });
                    return;
                }
                const imgItem = img.el!;
                // 获取当前图片的下标
                const index = _option.index;

                // 将切换前的图片节点挂载到dom上
                if (_option.animation !== 'none') {
                    // 获取当前图片的样式
                    const oldLeft = imgItem.style.left;
                    const oldTop = imgItem.style.top;
                    const oldWidth = imgItem.style.width;
                    const oldHeight = imgItem.style.height;
                    const oldTransform = imgItem.style.transform;
                    // 生成一个切换前的图片节点覆盖到当前图片上
                    const oldImg = createVNode('img', {
                        src: _option.imgList[index],
                        fit: fit,
                        style: {
                            position: 'absolute',
                            transition: 'all 0.3s ease-in-out',
                            width: oldWidth,
                            height: oldHeight,
                            left: oldLeft,
                            top: oldTop,
                            transform: oldTransform
                        },
                        class: 'se-img-preview-img-item',
                        id: 'se-oldImg-preview-item'
                    });
                    const oldImgDom = document.createElement('div');
                    oldImgDom.style.position = 'fixed';
                    oldImgDom.style.transition = 'all 0.3s ease-in-out';
                    oldImgDom.style.left = '0px';
                    oldImgDom.style.top = '0px';
                    oldImgDom.style.zIndex = '999';
                    render(oldImg, oldImgDom);
                    const mountLocation = pupOpsMount();
                    const unmount = mountLocation.mountDiv(oldImgDom);
                    requestAnimationFrame(() => {
                        // 恢复初始化
                        const oldImgItem = oldImgDom
                            .childNodes[0] as HTMLImageElement;
                        oldImgItem.style.left = '50vw';
                        oldImgItem.style.top = '50vh';
                        oldImgItem.style.width = imgWidthOriginal + 'px';
                        oldImgItem.style.height = imgHeightOriginal + 'px';
                        oldImgItem.style.transform =
                            'translate(-50%, -50%) scale(1) rotate(0deg) rotateY(0deg) rotateZ(0deg)';
                        // 如果有遮罩, 则修改鼠标样式
                        if (_option.modal) {
                            changeMouse(e);
                        }
                        setTimeout(() => {
                            if (_option.animation === 'fade') {
                                oldImgDom.style.opacity = '0';
                            } else if (_option.animation === 'slide') {
                                oldImgDom.style.left =
                                    type === 'prev' ? '150vw' : '-150vw';
                            }
                        });
                        setTimeout(() => {
                            unmount();
                        }, 300);
                    });
                }
                //计算图片的真实宽高比
                const imgReal = new Image();
                imgReal.src = _option.imgList[nextIndex];
                let imgRealWidth = 0,
                    imgRealHeight = 0;
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
                    const imgItem = img.el!;
                    imgItem.style.width = imgRealWidth * scale + 'px';
                    imgItem.style.height = imgRealHeight * scale + 'px';
                    imgItem.style.left = '50vw';
                    imgItem.style.top = '50vh';
                    imgItem.style.transform =
                        'translate(-50%, -50%) scale(1) rotate(0deg) rotateY(0deg) rotateZ(0deg)';
                    if (_option.animation !== 'none') {
                        imgItem.style.transition = 'none';
                        if (_option.animation === 'fade') {
                            imgItem.style.opacity = '0';
                        } else if (_option.animation === 'slide') {
                            imgItem.style.left =
                                type === 'prev' ? '-150vw' : '150vw';
                        }
                        requestAnimationFrame(() => {
                            imgItem.style.transition = '';
                            if (_option.animation === 'fade') {
                                imgItem.style.opacity = '';
                            } else if (_option.animation === 'slide') {
                                imgItem.style.left = '50vw';
                            }
                        });
                    }
                    imgItem.src = _option.imgList[nextIndex];
                    // 记录原始显示的图片的宽高
                    imgWidthOriginal = imgRealWidth * scale;
                    imgHeightOriginal = imgRealHeight * scale;
                    // 修改当前下标
                    _option.index = nextIndex;
                    nowIndex.value = nextIndex;
                    // 0.3s后将切换前的图片节点移除
                    setTimeout(() => {
                        document
                            .getElementById('se-oldImg-preview-item')
                            ?.remove();
                    }, 300);
                };
            }
            // 用户点击下载的函数
            function userDownload() {
                if (isClose) return;
                if (typeof props.toolbar.download === 'function') {
                    props.toolbar.download({
                        index: _option.index,
                        src: _option.imgList[_option.index],
                        srcList: _option.imgList,
                        name: props.name
                    });
                }
                if (props.toolbar.download === false) {
                    seMiniMeg({
                        message: '未开放下载',
                        type: 'info',
                        location: { x: clientWidth / 2, y: clientHeight - 100 },
                        duration: 1000
                    });
                }
            }
            // 是否正在切换
            let isChanging = false;
            // 用户切换图片的函数
            function userChangeImg(type: 'prev' | 'next', e: MouseEvent) {
                if (isClose) return;
                if (isChanging) return;
                const lastChanging = setTimeout(() => {
                    isChanging = false;
                }, 300);
                isChanging = true;
                // 获取当前图片的下标
                const index = _option.index;
                // 获取图片的总数
                const total = _option.imgList.length;
                // 记录下一张图片的下标
                let nextIndex: number | false = 0;
                if (_option.loop) {
                    if (type === 'prev') {
                        nextIndex = index === 0 ? total - 1 : index - 1;
                    } else {
                        nextIndex = index === total - 1 ? 0 : index + 1;
                    }
                } else {
                    if (type === 'prev' && index !== 0) {
                        nextIndex = index - 1;
                    } else if (type === 'next' && index !== total - 1) {
                        nextIndex = index + 1;
                    } else {
                        nextIndex = false;
                    }
                }
                if (nextIndex === false) {
                    lastChanging && clearTimeout(lastChanging);
                    isChanging = false;
                }
                const _changeImg = () => {
                    changeImg(type, nextIndex, e);
                };
                if (typeof props.onChange === 'function') {
                    props.onChange(_changeImg, nextIndex);
                } else {
                    throw new TypeError('onChange is not a function');
                }
            }
            // 更新工具栏位置到图片中心
            function initToolbarLocation() {
                if (isClose) return;
                if (!_option.modal) {
                    // 获取图片的位置
                    const imgItem = img.el! as HTMLImageElement;
                    const imgNow = getComputedStyle(imgItem);
                    const imgLeft =
                        parseFloat(imgNow.left) || parseFloat(imgNow.left);
                    if (
                        imgLeft > toolbarWidth / 2 + 10 &&
                        imgLeft < clientWidth - toolbarWidth / 2 - 10
                    ) {
                        toolbarRef.value.style.left = imgLeft + 'px';
                    }
                }
            }
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
                    onChange: userChangeImg,
                    onDownload: userDownload,
                    onClose: userClosePreview,
                    onExportToolbarWidth: (width: number) => {
                        toolbarWidth = width;
                    },
                    onInitToolbarLocation: initToolbarLocation,
                    class: !_option.modal
                        ? 'se-img-preview-toolbar-noModal'
                        : ''
                });
                render(_toolbar, toolbarRef.value);
            } else if (
                props.toolbar.show === false &&
                !props.modal &&
                _option.imgList.length > 1
            ) {
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
                    onChange: userChangeImg,
                    onDownload: userDownload,
                    onClose: userClosePreview,
                    onExportToolbarWidth: (width: number) => {
                        toolbarWidth = width;
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
            // 因为 withDirectives 只能在render函数中使用, 所以在这里创建图片实例, 再赋值给img变量, 就能在外面用了
            // 创建图片实例, 并且挂载到dom上, 初始位置为点击的图片位置, 以及图片的宽高, 以及图片的fit, 在0.3s后移动到中心位置
            const _img = withDirectives(
                createVNode('img', {
                    src: _option.imgList[_option.index],
                    fit: fit,
                    style: {
                        position: 'absolute',
                        width: rect.width + 'px',
                        height: rect.height + 'px',
                        left: rect.left + 'px',
                        top: rect.top + 'px'
                    },
                    class: 'se-img-preview-img-item',
                    onError: props.onError
                }),
                [[contextmenu, props.contextmenu]]
            );
            img = _img;
            return (
                <div class="se-img-preview">
                    {props.modal && (
                        <div class="se-img-preview-mask" ref={maskRef}></div>
                    )}
                    <div class="se-img-preview-img" ref={imagesRef}></div>
                    <div class="se-img-preview-toolbar" ref={toolbarRef}></div>
                    {props.modal && (
                        <div
                            class="se-img-preview-close"
                            onClick={userClosePreview}
                        >
                            {props.closeIcon}
                        </div>
                    )}
                    <div class="se-img-preview-msg" ref={msgRootRef}></div>
                </div>
            );
        };
    }
});
