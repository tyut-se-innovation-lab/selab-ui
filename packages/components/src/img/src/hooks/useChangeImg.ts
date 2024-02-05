import { Ref, createVNode, render } from 'vue';
import { ImgPreviewPropsType } from '../image.d';
import { pupOpsMount } from '@selab-ui/utils';
import seMiniMeg from '../../../miniMsg/src/index';

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
        animation: 'none' | 'fade' | 'slide';
    },
    imgItem: HTMLImageElement,
    isClose: Ref<boolean>,
    nowIndex: Ref<number>,
    {
        imgWidthOriginal,
        imgHeightOriginal
    }: { imgWidthOriginal: Ref<number>; imgHeightOriginal: Ref<number> },
    changeMouse: (e: MouseEvent) => void
) {
    const { clientWidth, clientHeight } = document.documentElement;
    /* 切换图片的函数 */
    function changeImg(
        type: 'prev' | 'next',
        nextIndex: number | false,
        e: MouseEvent
    ) {
        if (isClose.value) return;
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
        // 获取当前图片的下标
        const index = _option.index;

        let changeOldImg: (() => void) | null = null;

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
                style: {
                    position: 'absolute',
                    transition: 'all 0.3s ease-in-out',
                    width: oldWidth,
                    height: oldHeight,
                    minWidth: oldWidth,
                    minHeight: oldHeight,
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
                const oldImgItem = oldImgDom.childNodes[0] as HTMLImageElement;
                function locationInit() {
                    oldImgItem.style.left = '50vw';
                    oldImgItem.style.top = '50vh';
                    oldImgItem.style.width = imgWidthOriginal.value + 'px';
                    oldImgItem.style.height = imgHeightOriginal.value + 'px';
                    oldImgItem.style.minWidth = imgWidthOriginal.value + 'px';
                    oldImgItem.style.minHeight = imgHeightOriginal.value + 'px';
                    oldImgItem.style.transform = oldTransform;
                    oldImgItem.style.transform =
                        'translate(-50%, -50%) scale(1) rotate(0deg) rotateY(0deg) rotateX(0deg)';
                }
                // 如果有遮罩, 则修改鼠标样式
                if (_option.modal) {
                    changeMouse(e);
                }
                changeOldImg = (() => {
                    if (_option.animation === 'fade') {
                        return () => {
                            locationInit();
                            oldImgDom.style.opacity = '0';
                            setTimeout(unmount, 300);
                        };
                    } else if (_option.animation === 'slide') {
                        return () => {
                            locationInit();
                            oldImgDom.style.left =
                                type === 'prev' ? '150vw' : '-150vw';
                            setTimeout(unmount, 300);
                        };
                    } else {
                        return locationInit;
                    }
                })();
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
            imgItem.style.width = imgRealWidth * scale + 'px';
            imgItem.style.height = imgRealHeight * scale + 'px';
            imgItem.style.minWidth = imgRealWidth * scale + 'px';
            imgItem.style.minHeight = imgRealHeight * scale + 'px';
            imgItem.style.left = '50vw';
            imgItem.style.top = '50vh';
            imgItem.style.transform =
                'translate(-50%, -50%) scale(1) rotate(0deg) rotateY(0deg) rotateX(0deg)';
            if (_option.animation !== 'none') {
                imgItem.style.transition = 'none';
                if (_option.animation === 'fade') {
                    imgItem.style.opacity = '0';
                } else if (_option.animation === 'slide') {
                    imgItem.style.left = type === 'prev' ? '-150vw' : '150vw';
                }
                requestAnimationFrame(() => {
                    imgItem.style.transition = '';
                    if (_option.animation === 'fade') {
                        imgItem.style.opacity = '';
                    } else if (_option.animation === 'slide') {
                        imgItem.style.left = '50vw';
                    }
                    changeOldImg && changeOldImg();
                    changeOldImg = null;
                });
            }
            imgItem.src = _option.imgList[nextIndex];
            // 记录原始显示的图片的宽高
            imgWidthOriginal.value = imgRealWidth * scale;
            imgHeightOriginal.value = imgRealHeight * scale;
            // 修改当前下标
            _option.index = nextIndex;
            nowIndex.value = nextIndex;
            // 0.3s后将切换前的图片节点移除
            setTimeout(() => {
                document.getElementById('se-oldImg-preview-item')?.remove();
            }, 300);
        };
    }

    // 是否正在切换
    let isChanging = false;
    /* 用户切换图片的函数 */
    function userChangeImg(type: 'prev' | 'next', e: MouseEvent) {
        if (isClose.value) return;
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

    return {
        changeImg,
        userChangeImg
    };
}
