import {
    VNode,
    defineComponent,
    onMounted,
    ref,
    createVNode,
    render
} from 'vue';
import '../../../less/components/imgPreview/index.less';
import { imgPreviewProps } from '../image';
import { unPreviewImage } from '../method';
import SePreviewToolbar from './Toolbar';
import { previewMsg } from './previewMsg/index';

export default defineComponent({
    name: 'se-img-preview',
    props: imgPreviewProps,
    setup(props, { expose }): () => VNode {
        console.log('props', props);
        // 获取点击图片的位置
        const rect = props.instance!.mask[props.index].getBoundingClientRect();
        const fit = (
            props.instance!.mask[props.index].parentNode
                ?.childNodes[0] as HTMLImageElement
        ).classList[1]
            .split('-')
            .pop();
        const _option = {
            index: props.index,
            imgList: props.albumList,
            loop: props.loop,
            animation: props.animation,
            modal: props.modal,
            movable: props.movable,
            scaleStep: props.scaleStep + 1,
            minScale: props.minScale,
            maxScale: props.maxScale,
            closeIcon: props.closeIcon,
            'close-on-click-modal': props.closeOnClickModal,
            'close-on-press-escape': props.closeOnPressEscape
        };
        const nowIndex = ref(_option.index);
        const maskRef = ref();
        const imagesRef = ref();
        const toolbarRef = ref();
        // 关闭预览的函数
        function closePreview() {
            // 获取当前图片
            const imgItem = imagesRef.value.childNodes[0];
            // 关闭预览
            imgItem.style.opacity = '0';
            imgItem.style.transform =
                'translate(-50%, -50%) scale(0.2) rotate(0deg) rotateY(0deg) rotateZ(0deg)';
            // 若存在, 关闭遮罩
            if (props.modal) {
                maskRef.value!.style.opacity = '0';
            }
            // 若存在, 关闭工具栏
            if (props.toolbar.show) {
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
        onMounted(() => {
            // 创建图片实例, 并且挂载到dom上, 初始位置为点击的图片位置, 以及图片的宽高, 以及图片的fit, 在0.2s后移动到中心位置
            const img = createVNode('img', {
                src: _option.imgList[_option.index],
                fit: fit,
                style: {
                    width: rect.width + 'px',
                    height: rect.height + 'px',
                    left: rect.left + 'px',
                    top: rect.top + 'px'
                },
                class: 'se-img-preview-img-item',
                onError: props.onError
            });
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
                const imgItem = imagesRef.value.childNodes[0];
                imgItem.style['object-fit'] = fit;
                imgItem.style.width = imgRealWidth * scale + 'px';
                imgItem.style.height = imgRealHeight * scale + 'px';
                imgItem.style.left = '50vw';
                imgItem.style.top = '50vh';
                imgItem.style.transform =
                    'translate(-50%, -50%) scale(1) rotate(0deg) rotateY(0deg) rotateZ(0deg)';
                // 记录原始显示的图片的宽高
                imgWidthOriginal = imgRealWidth * scale;
                imgHeightOriginal = imgRealHeight * scale;
                // 监听滚轮事件
                imgItem.addEventListener('wheel', (e: WheelEvent) => {
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
                        maskRef.value.addEventListener('click', () => {
                            userClosePreview();
                        });
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
            // 检测图片是否离开视口, 若离开则移动到视口内可见位置
            function checkImg() {
                const imgItem = imagesRef.value.childNodes[0];
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
                const imgItem = imagesRef.value.childNodes[0];
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
            // 移动事件
            function mouseMove(e: MouseEvent) {
                // 计算移动距离
                const moveX = e.clientX - mouseDownPosition[0];
                const moveY = e.clientY - mouseDownPosition[1];
                // 获取当前图片的位置
                const imgItem = imagesRef.value.childNodes[0];
                const imgNow = getComputedStyle(imgItem);
                const imgLeft = parseFloat(imgNow.left);
                const imgTop = parseFloat(imgNow.top);
                // 移动图片
                imgItem.style.left = imgLeft + moveX + 'px';
                imgItem.style.top = imgTop + moveY + 'px';
                // 保存当前鼠标位置
                mouseDownPosition[0] = e.clientX;
                mouseDownPosition[1] = e.clientY;
            }
            // 松开事件和离开事件
            function mouseUpLeave() {
                const imgItem = imagesRef.value.childNodes[0];
                // 移除移动事件
                imgItem.removeEventListener('mousemove', mouseMove);
                // 移除松开事件
                imgItem.removeEventListener('mouseup', mouseUpLeave);
                // 恢复过渡
                imgItem.style.transition = '';
                // 鼠标样式改为抓取
                imgItem.style.cursor = 'grab';
                checkImg();
            }
            // 控制缩放的函数
            function scaleImg(type: 'out' | 'in', origin?: [number, number]) {
                // 获取当前图片
                const imgItem = imagesRef.value.childNodes[0];
                const imgNow = getComputedStyle(imgItem);
                // 获取当前图片的显示宽高
                const imgWidth = parseFloat(imgNow.width);
                const imgHeight = parseFloat(imgNow.height);
                // 计算当前缩放比例
                const scale = Math.floor(imgWidth / imgWidthOriginal);
                // 若当前缩放比例小于最小缩放比例, 则不允许继续缩小
                if (type === 'out' && scale < _option.minScale) return;
                // 若当前缩放比例大于最大缩放比例, 则不允许继续放大
                if (type === 'in' && scale > _option.maxScale) return;
                // 获取当前图片的位置
                const imgLeft = parseFloat(imgNow.left);
                const imgTop = parseFloat(imgNow.top);
                // 计算缩放后的宽高
                const newWidth =
                    type === 'in'
                        ? imgWidth * _option.scaleStep
                        : imgWidth / _option.scaleStep;
                const newHeight =
                    type === 'in'
                        ? imgHeight * _option.scaleStep
                        : imgHeight / _option.scaleStep;
                // 确认缩放点
                const _origin = origin ? origin : [imgWidth / 2, imgHeight / 2];
                // 计算缩放后的位置
                const leftChange =
                    type === 'out'
                        ? (_origin[0] - imgWidth / 2) / 1 -
                          (_origin[0] - imgWidth / 2) / _option.scaleStep
                        : (_origin[0] - imgWidth / 2) * (1 - _option.scaleStep);
                const newLeft = imgLeft + leftChange;
                const topChange =
                    type === 'out'
                        ? (_origin[1] - imgHeight / 2) / 1 -
                          (_origin[1] - imgHeight / 2) / _option.scaleStep
                        : (_origin[1] - imgHeight / 2) *
                          (1 - _option.scaleStep);
                const newTop = imgTop + topChange;
                // 缩放
                imgItem.style.width = newWidth + 'px';
                imgItem.style.height = newHeight + 'px';
                imgItem.style.left = newLeft + 'px';
                imgItem.style.top = newTop + 'px';
            }
            // 控制旋转的函数
            function rotateImg(type: 'forward' | 'reverse') {
                // 获取当前图片
                const imgItem = imagesRef.value.childNodes[0];
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
                imgItem.style.transform = `translate(-50%, -50%) scale(1) rotate(${
                    type === 'reverse' ? imgRotate + 90 : imgRotate - 90
                }deg) rotateY(${imgRotateY}deg) rotateZ(${imgRotateZ}deg)`;
            }
            // 控制镜像反转的函数
            function flipImg(type: 'horizontal' | 'vertical') {
                // 获取当前图片
                const imgItem = imagesRef.value.childNodes[0];
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
                        imgRotateY + 180
                    }deg) rotateZ(${imgRotateZ}deg)`;
                } else {
                    imgItem.style.transform = `translate(-50%, -50%) scale(1) rotate(${imgRotate}deg) rotateY(${
                        imgRotateY + 180
                    }deg) rotateZ(${imgRotateZ + 180}deg)`;
                }
                // 用canvas实现了镜像反转, 但是处理较慢, 然后想起css transform可以实现, 所以就不用canvas了
                // 我是若子
                // 折叠
                // 使用canvas的方式
                // 获取当前图片
                // const imgItem = imagesRef.value.childNodes[0];
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
                const imgItem = imagesRef.value.childNodes[0];
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
                nextIndex: number | false
            ) {
                if (nextIndex === false) {
                    previewMsg('已经到头了');
                    return;
                }
                const imgItem = imagesRef.value.childNodes[0];
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
                            transition: 'all 0.2s',
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
                    oldImgDom.style.transition = 'all 0.2s';
                    oldImgDom.style.left = '0px';
                    oldImgDom.style.top = '0px';
                    render(oldImg, oldImgDom);
                    document.body.appendChild(oldImgDom);
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
                        setTimeout(() => {
                            if (_option.animation === 'fade') {
                                oldImgDom.style.opacity = '0';
                            } else if (_option.animation === 'slide') {
                                oldImgDom.style.left =
                                    type === 'prev' ? '125vw' : '-125vw';
                            }
                        });
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
                    const imgItem = imagesRef.value.childNodes[0];
                    imgItem.style['object-fit'] = 'fill';
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
                                type === 'prev' ? '-125vw' : '125vw';
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
                    // 0.2s后将切换前的图片节点移除
                    setTimeout(() => {
                        document
                            .getElementById('se-oldImg-preview-item')
                            ?.remove();
                    }, 200);
                };
            }
            // 用户切换图片的函数
            function userChangeImg(type: 'prev' | 'next') {
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
                const _changeImg = () => {
                    changeImg(type, nextIndex);
                };
                if (typeof props.onChange === 'function') {
                    props.onChange(_changeImg, nextIndex);
                } else {
                    throw new TypeError('onChange is not a function');
                }
            }
            // 创建工具栏
            if (props.toolbar.show) {
                const _toolbar = createVNode(SePreviewToolbar, {
                    class: 'se-img-preview-toolbar-item',
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
                    onChange: userChangeImg
                });
                render(_toolbar, toolbarRef.value);
            }
        });
        expose({
            _close: () => {
                closePreview();
            }
        });
        return () => (
            <div class="se-img-preview">
                {props.modal && (
                    <div class="se-img-preview-mask" ref={maskRef}></div>
                )}
                <div class="se-img-preview-img" ref={imagesRef}></div>
                <div class="se-img-preview-toolbar" ref={toolbarRef}></div>
                <div class="se-img-preview-close" onClick={userClosePreview}>
                    {props.closeIcon}
                </div>
            </div>
        );
    }
});
