import { Ref, ref } from 'vue';
import { ImgPreviewPropsType } from '../image.d';
import leftCur from '../../../../../assets/mouseImg/left.ico';
import rightIco from '../../../../../assets/mouseImg/right.ico';
import closeIco from '../../../../../assets/mouseImg/close.ico';
import { SetImgStyle } from './useImgStyleValue';

export default function useOperate(
    props: ImgPreviewPropsType,
    _option: {
        index: number;
        imgList: string[];
        loop: boolean;
        minScale: number;
        maxScale: number;
        scaleStep: number;
        modal: boolean;
    },
    imgItem: HTMLImageElement,
    isClose: Ref<boolean>,
    maskRef: Ref<HTMLDivElement | undefined>,
    {
        imgWidthOriginal,
        imgHeightOriginal
    }: { imgWidthOriginal: Ref<number>; imgHeightOriginal: Ref<number> },
    toolbarRef: Ref<HTMLDivElement>,
    setImgStyle: SetImgStyle
) {
    const { clientWidth, clientHeight } = document.documentElement;
    /** 检测鼠标在遮罩上的位置, 更改鼠标样式 */
    const changeMouse = (e: MouseEvent) => {
        if (isClose.value) return;
        if (e.clientX < clientWidth / 2 - imgWidthOriginal.value / 2) {
            if (_option.index !== 0 || _option.loop)
                maskRef.value!.style.cursor = `url(${leftCur}), auto`;
            else {
                maskRef.value!.style.cursor = 'not-allowed';
            }
        } else if (e.clientX > clientWidth / 2 + imgWidthOriginal.value / 2) {
            if (_option.index !== _option.imgList.length - 1 || _option.loop)
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

    /** 检测图片是否离开视口, 若离开则移动到视口内可见位置 */
    function checkImg() {
        if (isClose.value) return;
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

    // 是否正在缩放
    let isScaling = false;
    /** 控制缩放的函数 */
    function scaleImg(type: 'out' | 'in', origin?: [number, number]) {
        if (isClose.value) return;
        if (isScaling) return;
        const lastScale = setTimeout(() => {
            isScaling = false;
        }, 200);
        // 获取当前图片
        const imgNowStyle = getComputedStyle(imgItem);
        // 获取当前图片的显示宽高
        const imgWidth = parseFloat(imgNowStyle.width);
        const imgHeight = parseFloat(imgNowStyle.height);
        // 计算缩放前比例
        const oldScale = imgWidth / imgWidthOriginal.value;
        // 若当前缩放比例等于最小缩放比例或最大缩放比例, 则不缩放
        if (
            (type === 'out' && Math.abs(oldScale - _option.minScale) < 0.001) ||
            (type === 'in' && Math.abs(oldScale - _option.maxScale) < 0.001)
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
        const scale = newWidth / imgWidthOriginal.value;
        // 若当前缩放比例小于最小缩放比例, 则宽高改为最小缩放比例
        if (type === 'out' && scale < _option.minScale) {
            newWidth = imgWidthOriginal.value * _option.minScale;
            newHeight = imgHeightOriginal.value * _option.minScale;
        }
        // 若当前缩放比例大于最大缩放比例, 则宽高改为最大缩放比例
        if (type === 'in' && scale > _option.maxScale) {
            newWidth = imgWidthOriginal.value * _option.maxScale;
            newHeight = imgHeightOriginal.value * _option.maxScale;
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
        setImgStyle.setImgStyleValues({
            // transform: `translate(-50%, -50%) scale(${realScale}) rotate(0deg) rotateY(0deg) rotateX(0deg)`,
            left: newLeft + 'px',
            top: newTop + 'px',
            width: newWidth + 'px',
            height: newHeight + 'px',
            minWidth: newWidth + 'px'
        });
        setTimeout(() => {
            checkImg();
        }, 300);
    }

    // 控制拖动
    // 记录鼠标按下时的位置
    const mouseDownPosition = [0, 0];
    /** 点击事件 */
    function mouseDown(e: MouseEvent) {
        if (isClose.value) return;
        mouseDownPosition[0] = e.clientX;
        mouseDownPosition[1] = e.clientY;
        // 添加移动事件
        window.addEventListener('mousemove', mouseMove);
        // 添加松开事件
        window.addEventListener('mouseup', mouseUpLeave);
        // 移除过渡
        setImgStyle.setImgStyleValue(
            'transition',
            'all .3s ease-in-out, left 0s, top 0s'
        );
        // 鼠标样式改为抓取
        setImgStyle.setImgStyleValue('cursor', 'grabbing');
    }
    /** 移动事件 */
    function mouseMove(e: MouseEvent) {
        if (isClose.value) return;
        // 计算移动距离
        const moveX = e.clientX - mouseDownPosition[0];
        const moveY = e.clientY - mouseDownPosition[1];
        // 获取当前图片的位置
        const imgNow = getComputedStyle(imgItem);
        const imgLeft = parseFloat(imgNow.left);
        const imgTop = parseFloat(imgNow.top);
        // 移动图片
        setImgStyle.setImgStyleValues({
            left: imgLeft + moveX + 'px',
            top: imgTop + moveY + 'px'
        });
        // 保存当前鼠标位置
        mouseDownPosition[0] = e.clientX;
        mouseDownPosition[1] = e.clientY;
    }
    /** 松开事件 */
    function mouseUpLeave() {
        if (isClose.value) return;
        // 移除移动事件
        window.removeEventListener('mousemove', mouseMove);
        // 移除松开事件
        window.removeEventListener('mouseup', mouseUpLeave);
        // 恢复过渡
        setImgStyle.setImgStyleValue('transition', '');
        // imgItem.style.transition = '';
        toolbarRef.value.style.transition = '';
        // 鼠标样式改为抓取
        setImgStyle.setImgStyleValue('cursor', 'grab');
        // imgItem.style.cursor = 'grab';
        checkImg();
        // 如果不显示遮罩, 则工具栏跟随移动
        if (!_option.modal) {
            initToolbarLocation();
        }
    }

    const toolbarWidth = ref(0);
    /* 更新工具栏位置到图片中心 */
    function initToolbarLocation() {
        if (isClose.value) return;
        if (!_option.modal) {
            // 获取图片的位置
            const imgNow = getComputedStyle(imgItem);
            const imgLeft = parseFloat(imgNow.left) || parseFloat(imgNow.left);
            if (
                imgLeft > toolbarWidth.value / 2 + 10 &&
                imgLeft < clientWidth - toolbarWidth.value / 2 - 10
            ) {
                toolbarRef.value.style.left = imgLeft + 'px';
            } else if (imgLeft <= toolbarWidth.value / 2 + 10) {
                toolbarRef.value.style.left =
                    toolbarWidth.value / 2 + 10 + 'px';
            } else if (imgLeft >= clientWidth - toolbarWidth.value / 2 - 10) {
                toolbarRef.value.style.left =
                    clientWidth - toolbarWidth.value / 2 - 10 + 'px';
            }
        }
    }

    /* 控制旋转的函数 */
    function rotateImg(type: 'forward' | 'reverse') {
        if (isClose.value) return;
        // 获取之前的旋转角度
        const imgOldRotate = parseInt(
            imgItem.style.transform.split('rotate(')[1].split('deg)')[0]
        );
        const imgRotateY = parseInt(
            imgItem.style.transform.split('rotateY(')[1].split('deg)')[0]
        );
        const imgRotateX = parseInt(
            imgItem.style.transform.split('rotateX(')[1].split('deg)')[0]
        );
        const _newRotate =
            type === 'reverse' ? imgOldRotate + 90 : imgOldRotate - 90;
        setImgStyle.setImgStyleValue(
            'transform',
            `translate(-50%, -50%) scale(1) rotate(${_newRotate}deg) rotateY(${imgRotateY}deg) rotateX(${imgRotateX}deg)`
        );
        // imgItem.style.transform = `translate(-50%, -50%) scale(1) rotate(${_newRotate}deg) rotateY(${imgRotateY}deg) rotateX(${imgRotateX}deg)`;
        setTimeout(() => {
            if (_newRotate === 360 || _newRotate === -360) {
                setImgStyle.setImgStyleValue(
                    'transform',
                    `translate(-50%, -50%) scale(1) rotate(0deg) rotateY(${imgRotateY}deg) rotateX(${imgRotateX}deg)`
                );
                setImgStyle.setImgStyleValue('transition', 'none');
            }
            requestAnimationFrame(() => {
                imgItem.style.transition = '';
                setImgStyle.setImgStyleValue('transition', '');
            });
        }, 300);
    }

    /* 控制镜像反转的函数 */
    function flipImg(type: 'horizontal' | 'vertical') {
        if (isClose.value) return;
        // 获取之前的旋转角度
        const imgRotate = parseInt(
            imgItem.style.transform.split('rotate(')[1].split('deg)')[0]
        );
        const imgRotateY = parseInt(
            imgItem.style.transform.split('rotateY(')[1].split('deg)')[0]
        );
        const imgRotateX = parseInt(
            imgItem.style.transform.split('rotateX(')[1].split('deg)')[0]
        );

        setImgStyle.setImgStyleValues(
            (() => {
                if (type === 'horizontal') {
                    return {
                        transform: `translate(-50%, -50%) scale(1) rotate(${imgRotate}deg) rotateY(${
                            imgRotateY === 180 ? 0 : 180
                        }deg) rotateX(${imgRotateX}deg)`,
                        left: '50vw',
                        top: '50vh',
                        width: imgWidthOriginal.value + 'px',
                        height: imgHeightOriginal.value + 'px',
                        minWidth: imgWidthOriginal.value + 'px'
                    };
                } else {
                    return {
                        transform: `translate(-50%, -50%) scale(1) rotate(${imgRotate}deg) rotateY(${imgRotateY}deg) rotateX(${
                            imgRotateX === 180 ? 0 : 180
                        }deg)`,
                        left: '50vw',
                        top: '50vh',
                        width: imgWidthOriginal.value + 'px',
                        height: imgHeightOriginal.value + 'px',
                        minWidth: imgWidthOriginal.value + 'px'
                    };
                }
            })()
        );

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

    /* 还原图片的函数 */
    function resetImg() {
        if (isClose.value) return;
        setImgStyle.setImgStyleValues({
            transform:
                'translate(-50%, -50%) scale(1) rotate(0deg) rotateY(0deg) rotateX(0deg)',
            left: '50vw',
            top: '50vh',
            width: imgWidthOriginal.value + 'px',
            height: imgHeightOriginal.value + 'px',
            minWidth: imgWidthOriginal.value + 'px'
        });
    }

    return {
        changeMouse,
        checkImg,
        scaleImg,
        mouseDown,
        mouseMove,
        mouseUpLeave,
        toolbarWidth,
        initToolbarLocation,
        rotateImg,
        flipImg,
        resetImg
    };
}
