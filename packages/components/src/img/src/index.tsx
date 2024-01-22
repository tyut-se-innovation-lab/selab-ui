import {
    ref,
    computed,
    defineComponent,
    VNode,
    onMounted,
    onDeactivated,
    Ref
} from 'vue';
import '../../less/components/img/index.less';
import { imgProps } from './image';
import {
    observer,
    registerPreviewImage,
    unregisterPreviewImage,
    previewImage,
    unPreviewImage,
    previewCheck
} from './method';
import { ImgPropsType, Instance, PreviewType } from './image.d';
import lazyImg from './assets/lazy.png';
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
            if (props.lazy) {
                return lazyImg;
            } else return props.src;
        });
        function errorHandle(e: Event) {
            isLoadSuccess.value = false;
            isLoading.value = false;
            props.onError?.(e);
        }
        function loadHandle(e: Event) {
            if (props.lazy && seImg.value.dataset.src) {
                // 若是懒加载, 且当前加载的图片是懒加载的占位图, 则不触发onLoad事件
                return;
            }
            console.log('loadHandle', e);
            isLoadSuccess.value = true;
            isLoading.value = false;
            props.onLoad?.(e);
        }
        const isLoadSuccess = ref(false);
        const isLoading = ref(true);
        let preview: PreviewType | false;
        const seImg = ref();
        let mask: Ref<HTMLDivElement | undefined>;
        let instance: Instance;
        let index: number;
        if (props.preview) {
            mask = ref();
        }
        onMounted(() => {
            preview = previewCheck(props as ImgPropsType);
            if (preview) {
                instance = registerPreviewImage(
                    preview,
                    mask.value as HTMLDivElement
                ) as Instance;
                index = instance.mask.indexOf(mask.value as HTMLDivElement);
            }
            if (props.lazy) {
                seImg.value.setAttribute('data-src', props.src);
                observer.observe(seImg.value);
            }
        });
        onDeactivated(() => {
            if (preview)
                unregisterPreviewImage(preview, mask.value as HTMLDivElement);
            if (props.lazy) observer.unobserve(seImg.value);
        });
        if (props.preview) {
            expose({
                openPreview: () => {
                    previewImage(instance, index);
                },
                closePreview: () => {
                    unPreviewImage();
                }
            });
        }
        return () => (
            <div
                class={`se-img-root ${props.rootClassName}`}
                style={`width:${props.width}px;height:${props.height}px`}
            >
                <img
                    ref={seImg}
                    class={imgClassName.value}
                    src={_src.value}
                    alt={props.alt}
                    height={props.height}
                    width={props.width}
                    onError={errorHandle}
                    onLoad={loadHandle}
                    {...attrs}
                />
                {isLoading.value && (
                    <div class="se-img-loading">
                        {slots.loading ? (
                            slots.loading()
                        ) : (
                            <span class="se-img-loading-content">加载中</span>
                        )}
                    </div>
                )}
                {!isLoading.value && !isLoadSuccess.value && (
                    <div class="se-img-error">
                        {slots.error ? (
                            slots.error()
                        ) : (
                            <span class="se-img-error-content">加载失败</span>
                        )}
                    </div>
                )}
                {props.preview && !isLoading.value && isLoadSuccess.value && (
                    <div class="se-img-mask" ref={mask}>
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
