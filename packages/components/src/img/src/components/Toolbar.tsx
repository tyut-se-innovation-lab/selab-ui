import { Ref, VNode, defineComponent, onMounted, ref } from 'vue';
import { previewToolbarProps } from '../image';
import { PreviewToolbarProps } from '../image.d';
import SeIcon from '../../../icon/template/icon.vue';
// import SeTooltip from '../../../tooltip/template/tooltip';
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
                        setTimeout(() => emit('initToolbarLocation'), 300);
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
                                    {/* 使用[color="#"]来规避SeIcon的默认颜色 */}
                                    <SeIcon
                                        name="zoom_out"
                                        iconSize="16px"
                                        color="#"
                                    />
                                </button>
                                <button onClick={() => emit('zoom', 'in')}>
                                    <SeIcon
                                        name="zoom_in"
                                        iconSize="16px"
                                        color="#"
                                    />
                                </button>
                            </li>
                        )}
                        {content.rotate && (
                            <li>
                                <button
                                    onClick={() => emit('rotate', 'forward')}
                                >
                                    <SeIcon
                                        name="rotate_left"
                                        iconSize="16px"
                                        color="#"
                                    />
                                </button>
                                <button
                                    onClick={() => emit('rotate', 'reverse')}
                                >
                                    <SeIcon
                                        name="rotate_right"
                                        iconSize="16px"
                                        color="#"
                                    />
                                </button>
                            </li>
                        )}
                        {content.flip && (
                            <li>
                                <button
                                    onClick={() => emit('flip', 'horizontal')}
                                >
                                    <SeIcon
                                        name="flip_horizontally_card"
                                        iconSize="16px"
                                        color="#"
                                    />
                                </button>
                                <button
                                    onClick={() => emit('flip', 'vertical')}
                                >
                                    <SeIcon
                                        name="flip_vertically_card"
                                        iconSize="16px"
                                        color="#"
                                    />
                                </button>
                            </li>
                        )}
                        {content.reset && (
                            <li>
                                <button onClick={() => emit('reset')}>
                                    <SeIcon
                                        name="sync"
                                        iconSize="16px"
                                        color="#"
                                    />
                                </button>
                            </li>
                        )}
                        {content.download && (
                            <li>
                                <button onClick={() => emit('download')}>
                                    <SeIcon
                                        name="down"
                                        iconSize="16px"
                                        color="#"
                                    />
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
                                    <SeIcon
                                        name="back"
                                        iconSize="16px"
                                        color="#"
                                    />
                                </button>
                                <button
                                    onClick={(e: MouseEvent) =>
                                        emit('change', 'next', e)
                                    }
                                >
                                    <SeIcon
                                        name="right"
                                        iconSize="16px"
                                        color="#"
                                    />
                                </button>
                            </li>
                        )}
                        {isNoModal.value && (
                            <li>
                                <button onClick={() => emit('close')}>
                                    <SeIcon
                                        name="close"
                                        iconSize="16px"
                                        color="#"
                                    />
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
