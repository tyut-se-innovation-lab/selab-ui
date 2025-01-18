import {
    ref,
    computed,
    defineComponent,
    VNode,
    onMounted,
    onDeactivated,
    watch,
    onBeforeUnmount
} from 'vue';
import '../../less/components/img/index.less';
import { imgProps } from './image';
import {
    registerPreviewImage,
    unregisterPreviewImage,
    previewImage,
    unPreviewImage,
    previewCheck
} from './method';
import { ImgPropsType, Instance, PreviewType } from './image.d';
export default defineComponent({
    name: 'se-img',
    props: imgProps,
    setup(props, { slots, attrs, expose }): () => VNode {
        const imgClassName = computed(() => {
            const { fit } = props;
            return {
                'se-img': true,
                [`se-img-fit-${fit}`]: true
            };
        });

        const _src = computed(() => {
            return props.src;
        });
        function errorHandle(e: Event) {
            isLoadSuccess.value = false;
            isLoading.value = false;
            mask?.value?.remove();
            props.onError?.(e);
        }
        function loadHandle(e: Event) {
            isLoadSuccess.value = true;
            isLoading.value = false;
            props.onLoad?.(e);
        }
        const isLoadSuccess = ref(false);
        const isLoading = ref(true);
        let preview: PreviewType | false;
        const seImg = ref();
        const mask = ref<HTMLDivElement>();
        let instance: Instance;
        let index: number;
        onMounted(() => {
            preview = previewCheck(props as ImgPropsType);
            if (preview) {
                const ins = registerPreviewImage(
                    preview,
                    false,
                    mask.value as HTMLDivElement
                );
                if (!ins) return;
                instance = ins as Instance;
                if (preview.isAlbum) {
                    index = preview.albumList.indexOf(props.src);
                } else {
                    index = instance.mask.indexOf(mask.value as HTMLDivElement);
                }
                if (index === -1) index = 0;
            }
        });
        let maskEle: HTMLDivElement;
        watch(mask, (v) => {
            if (v) maskEle = v as HTMLDivElement;
        });
        onDeactivated(() => {
            if (preview)
                unregisterPreviewImage(preview, maskEle as HTMLDivElement);
        });
        onBeforeUnmount(() => {
            if (preview)
                unregisterPreviewImage(preview, maskEle as HTMLDivElement);
        });

        expose(
            (() => {
                const openPreview = (() => {
                    if (props.preview) {
                        return () => {
                            previewImage(instance, index);
                        };
                    } else {
                        return () => {
                            console.warn(
                                `Img Preview > ${props.src} 未开启预览功能`
                            );
                        };
                    }
                })();
                const closePreview = () => {
                    unPreviewImage();
                };
                return {
                    openPreview,
                    closePreview
                };
            })()
        );
        return () => (
            <div
                class={`se-img-root ${props.rootClassName}`}
                style={`width:${props.width}px;height:${props.height}px`}
            >
                <img
                    ref={seImg}
                    class={imgClassName.value}
                    style={`width:${props.width}px;height:${props.height}px`}
                    src={_src.value}
                    alt={props.alt}
                    onError={errorHandle}
                    onLoad={loadHandle}
                    loading={props.lazy ? 'lazy' : 'eager'}
                    {...attrs}
                />
                {isLoading.value && (
                    <div
                        class="se-img-loading"
                        style={`width:${props.width}px;height:${props.height}px`}
                    >
                        {slots.loading ? (
                            slots.loading()
                        ) : (
                            <span class="se-img-loading-content">加载中</span>
                        )}
                    </div>
                )}
                {!isLoading.value && !isLoadSuccess.value && (
                    <div
                        class="se-img-error"
                        style={`width:${props.width}px;height:${props.height}px`}
                    >
                        {slots.error ? (
                            slots.error()
                        ) : (
                            <span class="se-img-error-content">加载失败</span>
                        )}
                    </div>
                )}
                {props.preview && (
                    <div
                        class="se-img-mask"
                        style={`width:${props.width}px;height:${props.height}px`}
                        ref={mask}
                    >
                        {slots.mask ? (
                            slots.mask()
                        ) : (
                            <span class="se-img-mask-content">预览</span>
                        )}
                    </div>
                )}
            </div>
        );
    }
});
