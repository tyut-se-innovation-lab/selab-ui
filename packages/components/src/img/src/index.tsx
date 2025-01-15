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
        // 懒加载交叉监控器
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const img = entry.target as HTMLImageElement;
                        img.src = img.dataset.src as string;
                        img.removeAttribute('data-src');
                        observer.unobserve(img);
                    }
                });
            },
            { threshold: 0.01 }
        );

        const _src = computed(() => {
            if (props.lazy) {
                return lazyImg;
            } else return props.src;
        });
        function errorHandle(e: Event) {
            isLoadSuccess.value = false;
            isLoading.value = false;
            mask?.value?.remove();
            props.onError?.(e);
        }
        function loadHandle(e: Event) {
            if (props.lazy && seImg.value.dataset.src) {
                // 若是懒加载, 且当前加载的图片是懒加载的占位图, 则不触发onLoad事件
                return;
            }
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
                    false,
                    mask.value as HTMLDivElement
                ) as Instance;
                if (preview.isAlbum) {
                    index = preview.albumList.indexOf(props.src);
                } else {
                    index = instance.mask.indexOf(mask.value as HTMLDivElement);
                }
                if (index === -1) index = 0;
            }
            if (props.lazy) {
                seImg.value.setAttribute('data-src', props.src);
                observer.observe(seImg.value);
            }
            if (!props.contextmenu) {
                seImg.value.addEventListener('contextmenu', (e: Event) => {
                    e.preventDefault();
                });
                mask.value?.addEventListener('contextmenu', (e: Event) => {
                    e.preventDefault();
                });
            }
        });
        onDeactivated(() => {
            if (preview)
                unregisterPreviewImage(preview, mask.value as HTMLDivElement);
            if (props.lazy) observer.unobserve(seImg.value);
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
