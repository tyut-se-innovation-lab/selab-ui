import { VNode, defineComponent, onMounted, ref, createVNode, render } from 'vue';
import '../../../less/components/imgPreview/index.less';
import { imgPreviewProps } from '../image';

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
            scaleStep: props.scaleStep,
            minScale: props.minScale,
            maxScale: props.maxScale,
            closeIcon: props.closeIcon,
            'close-on-click-modal': props.closeOnClickModal,
            'close-on-press-escape': props.closeOnPressEscape
        };
        const maskRef = ref();
        const imagesRef = ref();
        const toolbarRef = ref();
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
                class: 'se-img-preview-img-item se-img-preview-img-item-0'
            });
            // 计算图片的真实宽高比
            const imgReal = new Image();
            imgReal.src = _option.imgList[_option.index];
            let imgRealWidth = 0, imgRealHeight = 0, imgRealRatio = 0;
            imgReal.onload = () => {
                imgRealWidth = imgReal.width;
                imgRealHeight = imgReal.height;
                imgRealRatio = imgRealWidth / imgRealHeight;
            };
            render(img, imagesRef.value);
            setTimeout(() => {
                imagesRef.value.childNodes[0].style.width = imgRealWidth + 'px';
                imagesRef.value.childNodes[0].style.height =
                    imgRealHeight + 'px';
                imagesRef.value.childNodes[0].style.left = '50%';
                imagesRef.value.childNodes[0].style.top = '50%';
                imagesRef.value.childNodes[0].style.transform =
                    'translate(-50%, -50%)';
            }, 200);
        });
        expose({
            _close: () => {
                maskRef.value && (maskRef.value.style.opacity = '0');
            }
        });
        return () => (
            <div class="se-img-preview">
                <div class="se-img-preview-mask" ref={maskRef}></div>
                <div class="se-img-preview-img" ref={imagesRef}></div>
                <div class="se-img-preview-toolbar" ref={toolbarRef}></div>
            </div>
        );
    }
});
