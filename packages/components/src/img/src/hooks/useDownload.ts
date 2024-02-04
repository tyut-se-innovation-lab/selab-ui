import { Ref } from 'vue';
import { ImgPreviewPropsType } from '../image.d';
import seMiniMeg from '../../../miniMsg/src/index';

export default function useDownload(
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
    isClose: Ref<boolean>
) {
    const { clientWidth, clientHeight } = document.documentElement;
    /* 用户点击下载的函数 */
    function userDownload() {
        if (isClose.value) return;
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

    return {
        userDownload
    };
}
