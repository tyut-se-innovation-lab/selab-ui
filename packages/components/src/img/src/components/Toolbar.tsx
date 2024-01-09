import { Ref, VNode, defineComponent, onMounted, ref } from 'vue';
import { previewToolbarProps } from '../image';
import { PreviewToolbarProps } from '../image.d';
import '../../../less/components/imgPreviewToolbar/index.less';

export default defineComponent({
    name: 'se-img',
    props: previewToolbarProps,
    setup(props, { emit }): () => VNode {
        const root = ref() as Ref<HTMLDivElement>;
        // 显示的内容
        const content: { [key: string]: boolean } = {};
        ['zoom', 'rotate', 'reset', 'flip', 'download', 'pagination'].forEach(
            (item) => {
                content[item] = props[item as keyof PreviewToolbarProps]
                    ? true
                    : false;
            }
        );
        const isNoModal = ref(false);
        onMounted(() => {
            emit(
                'exportToolbarWidth',
                parseFloat(getComputedStyle(root.value).width) + 60
            );
            isNoModal.value = root.value.classList.contains(
                'se-img-preview-toolbar-noModal'
            );
            setTimeout(() => {
                if (isNoModal.value) {
                    const ulWidth = parseFloat(
                        getComputedStyle(
                            root.value.childNodes[0] as HTMLUListElement
                        ).width
                    );
                    (root.value.childNodes[0] as HTMLUListElement).style.width =
                        '32px';
                    root.value.onmouseenter = () => {
                        (
                            root.value.childNodes[0] as HTMLUListElement
                        ).style.width = ulWidth - 40 + 'px';
                        (
                            root.value.childNodes[0] as HTMLUListElement
                        ).style.left = -40 + 'px';
                        (
                            root.value.childNodes[0]
                                .childNodes[0] as HTMLLIElement
                        ).style.cssText = 'transition: all .3s; opacity: 0;';
                    };
                    root.value.onmouseleave = () => {
                        (
                            root.value.childNodes[0] as HTMLUListElement
                        ).style.width = '32px';
                        (
                            root.value.childNodes[0] as HTMLUListElement
                        ).style.left = 0 + 'px';
                        (
                            root.value.childNodes[0]
                                .childNodes[0] as HTMLLIElement
                        ).style.cssText = 'transition: all .3s; opacity: 1;';
                        emit('initToolbarLocation');
                    };
                }
            });
        });
        return () => {
            return (
                <div class="se-img-preview-toolbar-root" ref={root}>
                    <ul>
                        {isNoModal.value && (
                            <li>
                                <nav>more</nav>
                            </li>
                        )}
                        {content.zoom && (
                            <li>
                                <button onClick={() => emit('zoom', 'out')}>
                                    小
                                </button>
                                <button onClick={() => emit('zoom', 'in')}>
                                    大
                                </button>
                            </li>
                        )}
                        {content.rotate && (
                            <li>
                                <button
                                    onClick={() => emit('rotate', 'forward')}
                                >
                                    左旋
                                </button>
                                <button
                                    onClick={() => emit('rotate', 'reverse')}
                                >
                                    右旋
                                </button>
                            </li>
                        )}
                        {content.flip && (
                            <li>
                                <button
                                    onClick={() => emit('flip', 'horizontal')}
                                >
                                    水平翻转
                                </button>
                                <button
                                    onClick={() => emit('flip', 'vertical')}
                                >
                                    垂直翻转
                                </button>
                            </li>
                        )}
                        {content.reset && (
                            <li>
                                <button onClick={() => emit('reset')}>
                                    重置
                                </button>
                            </li>
                        )}
                        {content.download && (
                            <li>
                                <button onClick={() => emit('download')}>
                                    下载
                                </button>
                            </li>
                        )}
                        {props.total > 1 && (
                            <li>
                                <button
                                    onClick={(e: MouseEvent) =>
                                        emit('change', 'prev', e)
                                    }
                                >
                                    上一张
                                </button>
                                <button
                                    onClick={(e: MouseEvent) =>
                                        emit('change', 'next', e)
                                    }
                                >
                                    下一张
                                </button>
                            </li>
                        )}
                        {isNoModal.value && (
                            <li>
                                <button onClick={() => emit('close')}>
                                    关闭
                                </button>
                            </li>
                        )}
                        {content.pagination && props.total > 1 && (
                            <li>
                                <span>
                                    {props.index.value + 1} / {props.total}
                                </span>
                            </li>
                        )}
                    </ul>
                </div>
            );
        };
    }
});
